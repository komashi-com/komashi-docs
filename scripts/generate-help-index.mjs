import fg from "fast-glob";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import matter from "gray-matter";

const DOCS_DIR = path.join(process.cwd(), "docs");
const OUT_FILE = path.join(process.cwd(), "static", "help-index.json");

function stripMd(md) {
    // minimál stripper: elég excerpthez
    return md
        .replace(/```[\s\S]*?```/g, "")   // code blocks
        .replace(/`[^`]*`/g, "")         // inline code
        .replace(/!$begin:math:display$\[\^$end:math:display$]*]$begin:math:text$\[\^\)\]\+$end:math:text$/g, "") // images
        .replace(/$begin:math:display$\[\^$end:math:display$]*]$begin:math:text$\[\^\)\]\+$end:math:text$/g, "$1") // links -> text
        .replace(/[#>*_~]/g, "")         // markdown chars
        .replace(/\s+/g, " ")
        .trim();
}

function firstN(text, n = 250) {
    if (!text) return "";
    const t = text.trim();
    return t.length <= n ? t : t.slice(0, n).trimEnd() + "…";
}

function stripSlashes(s) {
    return String(s || "").replace(/^\/+|\/+$/g, "");
}

async function readDocusaurusRoutes() {
    const configPath = path.join(process.cwd(), "docusaurus.config.js");
    try {
        const mod = await import(pathToFileURL(configPath).href);
        const config = mod?.default ?? {};
        const baseUrl = config?.baseUrl ?? "/";
        let routeBasePath = "/docs";
        const presets = Array.isArray(config?.presets) ? config.presets : [];
        for (const preset of presets) {
            if (!Array.isArray(preset)) continue;
            if (preset[0] !== "classic") continue;
            routeBasePath = preset?.[1]?.docs?.routeBasePath ?? routeBasePath;
            break;
        }
        return { baseUrl, routeBasePath };
    } catch {
        return { baseUrl: "/", routeBasePath: "/docs" };
    }
}

// Docusaurus URL: baseUrl + routeBasePath + docId (a fájl relatív útvonala)
function toDocUrl(relPath, { baseUrl, routeBasePath }) {
    const withoutExt = relPath.replace(/\.(md|mdx)$/i, "");
    const normalizedRel = withoutExt.split(path.sep).join("/");
    const parsed = path.parse(normalizedRel);
    const parent = parsed.dir;
    const lastDir = parent.split("/").filter(Boolean).slice(-1)[0] || "";
    const docPath = parsed.name === lastDir ? parent : normalizedRel;
    const parts = [
        stripSlashes(baseUrl),
        stripSlashes(routeBasePath),
        stripSlashes(docPath),
    ].filter(Boolean);
    return `/${parts.join("/")}`;
}

const files = await fg(["**/*.md", "**/*.mdx"], { cwd: DOCS_DIR });
const routes = await readDocusaurusRoutes();

const index = {}; // tag -> array of {q,a,url}

for (const rel of files) {
    const abs = path.join(DOCS_DIR, rel);
    const raw = fs.readFileSync(abs, "utf8");
    const parsed = matter(raw);

    const tags = parsed.data?.tags;
    const question = parsed.data?.question;

    if (!question) continue;           // csak azok kerülnek be, amik "Q&A docok"
    if (!Array.isArray(tags) || tags.length === 0) continue;

    const text = stripMd(parsed.content);
    const answer = firstN(text, 250);
    const url = toDocUrl(rel, routes);

    for (const tag of tags) {
        const t = String(tag);
        index[t] ??= [];
        const key = `${String(question)}||${url}`;
        if (!index[t]._dedupe) index[t]._dedupe = new Set();
        if (index[t]._dedupe.has(key)) continue;
        index[t]._dedupe.add(key);
        index[t].push({ q: String(question), a: answer, url });
    }
}

// opcionális: rendezés kérdés szerint
for (const t of Object.keys(index)) {
    if (index[t]._dedupe) delete index[t]._dedupe;
    index[t].sort((a, b) => a.q.localeCompare(b.q));
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(index, null, 2), "utf8");

console.log(`Generated ${OUT_FILE}`);
