# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A **multi-page** personal portfolio site for Akmal Zaki, deployed via **GitHub Pages** (repo `akriii/akmalzaki.github.io`). No build step, package manager, or test suite — plain static HTML/CSS with vanilla JS. No framework: Bootstrap and jQuery were removed; layout is hand-rolled CSS grid/flex.

## Development

- **Preview:** open any `.html` file directly in a browser, or serve the folder. The project lives under Laragon's `www/`, so the Laragon-assigned host also works.
- **Deploy:** pushing to `main` publishes the site via GitHub Pages. No separate build/deploy command.
- Only external deps are Google Fonts (Space Grotesk, Inter, JetBrains Mono) loaded via CDN in each page `<head>`.

## Structure

- **Pages** (one file each): `index.html` (Home/landing), `projects.html`, `achievements.html`, `skills.html`, `resume.html`.
- `style.css` — the entire design system, shared by every page.
- `main.js` — shared behaviour for every page: mobile nav toggle, **active-link detection** (matches `location.pathname` filename against nav hrefs), scroll-reveal IntersectionObserver, pointer-following card glow, and footer year injection.
- `images/` — photos, icons, project screenshots. `files/` — resume PDF + certificate PDFs.

## Conventions

- **Every page is self-contained** and duplicates the same `<nav class="nav">` markup and `<footer>` verbatim — there is no HTML include mechanism. When changing the nav or footer, edit all five pages. The `.active` nav state is set by `main.js` at runtime, so nav markup stays identical across pages (do NOT hardcode `.active`).
- **Theming** is driven by CSS custom properties in `:root` (`--bg`, `--accent` violet, `--accent-2` indigo, `--grad`, etc.). Reuse these tokens; don't hardcode colors. Background is intentionally near-black (`--bg: #0a0a0a`) with an ambient radial glow + grid drawn via `body::before/::after`.
- **Layout** uses `.container` (max-width wrapper) + `.grid.grid-2/3/4` helpers. Cards are `.card`; responsive breakpoints collapse grids at 900/720/560px.
- **Scroll reveal:** add class `reveal` (optionally `d1`/`d2`/`d3` for stagger delay) to any element; `main.js` adds `.is-visible` when it enters the viewport (once). Skill bars animate their fill from `--w` when their card becomes visible.
- **Skill bars:** each `.skill-row` has a `.skill-label` (name + a `.level` span classed `basic`/`intermediate`/`experienced`) and a `.bar > i` whose `--w` inline custom property sets the fill width. Keep the level class and `--w` consistent.
- **Project cards** use `.card.project-card` → `.project-thumb > img` + `.project-body`; tech tags are `.tag.a` (violet) / `.tag.b` (blue).
