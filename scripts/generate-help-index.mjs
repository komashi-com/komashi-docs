import fg from "fast-glob";
import fs from "node:fs";
import path from "node:path";
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

// NOTE: Docusaurus URL-ok: tipikusan /docs/<docId>,
// de a legegyszerűbb: a fájl relatív útvonala alapján képezzük.
// Ha nálad custom routeBasePath van, itt kell igazítani.
function toDocUrl(relPath) {
    const withoutExt = relPath.replace(/\.(md|mdx)$/i, "");
    return `/${withoutExt}`;
}

const files = await fg(["**/*.md", "**/*.mdx"], { cwd: DOCS_DIR });

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
    const url = toDocUrl(rel);

    for (const tag of tags) {
        const t = String(tag);
        index[t] ??= [];
        index[t].push({ q: String(question), a: answer, url });
    }
}

// opcionális: rendezés kérdés szerint
for (const t of Object.keys(index)) {
    index[t].sort((a, b) => a.q.localeCompare(b.q));
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(index, null, 2), "utf8");

console.log(`Generated ${OUT_FILE}`);