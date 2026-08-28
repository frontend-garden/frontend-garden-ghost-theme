# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working
with code in this repository.

## Project

Ghost theme (Handlebars templates + SCSS + vanilla JS) for **Frontend Garden**
(<https://frontend.garden>), a Czech frontend-dev online magazine. This theme is
purpose-built for that single publication — it is not designed to be a
general-purpose/portable Ghost theme.

## Commands

```bash
npm install          # install deps (Node >=22, npm >=10 — see .nvmrc)
npm run build         # compile CSS (lint, compile, prefix, minify) + lint JS
npm test              # gscan (Ghost theme validation) + markdown lint + css lint + js lint — this is CI's "Test" step
npm start / npm run watch   # watch SCSS and JS, rebuild on change
npm run css:lint      # stylelint only
npm run js:lint        # eslint only
npm run markdown:lint  # markdownlint only
npm run gscan          # Ghost theme structural validation (gscan .)
npm run dist            # zip a release package into dist/ (uses predist: test + build)
```

There is no JS/CSS unit test suite — "tests" means linting + gscan validation.
There is no single-file test runner; lint commands run across the whole
`assets/` tree.

To see the theme rendered, build it here, then run it inside the sibling
[`ghost-dev`](https://github.com/frontend-garden/ghost-dev) repo (private —
see CONTRIBUTING.md for a manual-install alternative if you don't have
access) — a Dockerized Ghost environment that bind-mounts this directory and
reloads template/SCSS/JS edits live. There's no standalone dev server in this
repo itself.

## Architecture

**Templates** (Handlebars `.hbs`, Ghost theme conventions):

- `default.hbs` — root layout (`<head>`, header, `{{{body}}}`, footer scripts).
  Child templates override the `styles`, `snippets`, and `scripts` blocks.
- `index.hbs`, `post.hbs`, `page.hbs`, `tag.hbs`, `author.hbs`, `glossary.hbs`,
  `custom-*.hbs` — route-level templates. Routing/collections are defined in
  `routes.yaml` (e.g. `/clanky/` → articles, `/slovnik/` → glossary,
  `/newsletter/` → newsletter posts), each mapped to a template + Ghost
  content filter.
- `partials/` — reusable includes (header, footer, post-card, pagination,
  byline, social links, member notifications, icons as inline SVG partials).
  `partials/snippets/` holds admin-configurable content blocks (ads, newsletter
  signup) instantiated via the `data-snippet`/`data-populate` JS mechanism
  documented at the bottom of `assets/js/main.js`.
- `members/` — Ghost Members flow templates (signup/signin/account), wired to
  routes `/registrace/`, `/prihlaseni/`, `/ucet/` in `routes.yaml`.
- `locales/cs.json` — theme string translations, used via Ghost's `{{t}}`
  helper (site is Czech).

**Styles** (`assets/scss/`, compiled to `assets/built/css/`):
Organized by **ITCSS** — layers load in strict specificity order, low → high.
Add new SCSS files to the matching layer and register them in
`assets/scss/main.scss` (an explicit `@forward` list; nothing is auto-globbed):

1. `settings/` — Sass variables only (colors, breakpoints, grid, typography,
   modular scale), no output.
2. `tools/` — mixins/functions, no output.
3. `styles/01-generic/` → `10-utilities/` — actual CSS, in this fixed order:
   generic resets → theme (light/dark mode) → bare elements → layout objects →
   helper classes → components → editor (user Koenig content) → `08-koenig`
   (overrides for Ghost's built-in Koenig card styles, order-sensitive since
   Ghost's own styles load after) → vendor overrides → utilities
   (single-purpose, highest specificity).

- Class naming follows **BEM**, enforced by stylelint's
  `selector-class-pattern`.
- `main.scss` → `main.css` → autoprefixed → `main.min.css` (the file actually
  linked in `default.hbs`). `codepen.scss` is a separate isolated bundle for
  embeddable CodePen demos.
- Dark mode is theme-driven (see `02-themes/`), not a separate stylesheet.

**JS** (`assets/js/`, no bundler — plain scripts loaded directly in
`default.hbs`, ES2020, linted with Airbnb base config): `main.js` (progressive
enhancements: non-breaking spaces, external link handling, heading anchors,
responsive tables, Koenig gallery sizing, GA event tracking, the
snippet/populate system), `members.js` (Members forms), `register-sw.js` /
`cache-page-assets.js` (service worker for asset caching, `sw.js` at root).

## Conventions

- Never edit generated output: `assets/built/`, `.cache/`, `dist/`.
- SCSS/JS edits always go through the source directories above, followed by
  `npm run build` (or `npm run watch` during active development).
- Respect the ITCSS layer boundaries and the explicit `@forward` list in
  `main.scss` — don't reintroduce cascade-order bugs by placing a component
  under the wrong numbered layer.
- `gscan` (`npm run gscan` / part of `npm test`) enforces Ghost's own theme
  compatibility rules — a change that breaks gscan will fail CI even if the
  page renders fine locally.
- Edit `routes.yaml`/`redirects.yaml` here, in git — never through Ghost
  Admin. In `ghost-dev` these files are bind-mounted read-only into the
  running instance specifically so an Admin-side edit fails loudly instead of
  silently diverging from what's committed.
- A major bump of `engines.ghost` in `package.json` is a paired change with
  `ghost-dev`, not something to land here alone: its pinned Ghost image tag
  has to move too, and its `smoke.yml` needs to pass against the new major
  before either side merges.

## Git workflow

- One branch and one PR per topic — don't bundle unrelated changes together.
  Never commit directly to `main`.
- Rebase, don't merge: keep branches up to date with `main` via rebase, and
  keep history linear. Avoid merge commits.
- Commit atomically — each commit should be one coherent, self-contained
  change. Write subject lines as an imperative instruction in English (e.g.
  "Fix pagination on tag pages", not "Fixed" or "Fixing"). If the change
  addresses a GitHub issue, append its number, e.g. `Fix pagination on tag
  pages (#123)`.
- After a change goes through code review, fold follow-up fixes into the
  relevant existing commit with `git commit --fixup` (and `git rebase -i
  --autosquash` before merging) rather than tacking on new standalone commits.
- Never add a "Co-authored-by: Claude" (or similar AI attribution) trailer to
  commit messages or PR descriptions.

## Release process

Fully automated via `release-drafter` + GitHub Actions once merged to `main`
(see `RELEASING.md` for the full flow): bump `version` in `package.json` +
`package-lock.json` in its own PR titled `Release <VERSION>`, merge — this
triggers publishing the release draft, tagging, and deployment to the
production Ghost instance. PR branch names/labels drive changelog grouping
and semver resolution; see `.github/workflows/`.
