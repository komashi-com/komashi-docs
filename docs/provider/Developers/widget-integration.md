---
sidebar_position: 3
title: Widget Integration
tags: []
question: "How do I embed the Komashi Widget?"
---

## Widget Integration

The Komashi Widget is a ready-made UI component you can embed in any web application. It lets end users browse providers, view services, and interact with the platform — without you building a frontend from scratch.
---

## Configuration Options

| Option | Required | Description |
|--------|----------|-------------|
| `data-key` | ✅ Yes | Your API key |
| `data-mode` | ✅ Yes | Display mode: `marketplace`, `provider`, or `service` |
| `data-provider-id` | No | Pre-filter to a specific provider |
| `data-theme` | No | `light` or `dark` (default: `light`) |
| `data-lang` | No | Language code, e.g. `en`, `hu` (default: `en`) |

---

## What the Widget Handles for You

You do not need to build or maintain any of the following:

- **Service listing UI** — automatically rendered from provider data
- **Subscription flows** — handled within the widget
- **Responsive layout** — works on desktop and mobile out of the box
- **API communication** — the widget talks to Komashi directly

---

## Requirements

- A valid Komashi API key
- A webpage that can load external scripts
- No backend changes required

For advanced customization, event hooks, and iframe embedding, see the Widget documentation in the developer portal.