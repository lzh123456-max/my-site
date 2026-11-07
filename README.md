# Learning HTML

A five-page classroom learning website made with semantic HTML, shared CSS and plain JavaScript. There are no third-party runtime dependencies, fonts or image services.

- Live website: https://learning-html-fieldnotes-1107.fine-rook-2145.chatgpt.site
- Public source repository: https://github.com/lzh123456-max/my-site

## Run locally

Install Node.js, open a terminal in this folder, and run:

```sh
node serve.mjs
```

Open `http://127.0.0.1:4173`. Stop the server with Ctrl+C. Use an HTTP server rather than double-clicking an HTML file: `nav.js` uses `fetch()` to load the shared navigation and footer. VS Code Live Server works as well.

## Files to read first

| File | Purpose |
| --- | --- |
| `index.html` | Hero image, introduction and links to all four other pages |
| `quotes.html`, `quotes.js`, `quotes.css` | 20 sourced quotations, random hero and combined search/author filters |
| `project.html` | Five project ideas, each audience, a four-page starting plan and ordered build steps |
| `machine.html`, `machine.js`, `machine.css` | Original Nothing Printer state machine and five-round closing-tag game |
| `about.html`, `about.js` | Project decisions, HTML table, sources and a labelled form demonstration |
| `nav.html`, `footer.html`, `nav.js` | Navigation and footer authored once, then loaded into every page |
| `style.css` | Shared layout, type, colours, responsive breakpoints and focus styles |
| `images/hero.svg` | Original browser illustration used as a real hero image |
| `images/og-image.jpg` | 1200 × 630 social cover, below 100 KB |
| `favicon-32.png`, `apple-touch-icon.png` | Required 32 × 32 and 180 × 180 PNG icons |

## Lesson 2 in the code

- Every page has HTML5 DOCTYPE, `lang="en"`, UTF-8, viewport, a descriptive title, one `h1` and one `main`.
- `header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `figcaption` and `footer` describe the content they contain.
- Quotations use `blockquote` and a `cite` containing the work's title, with source links.
- `ul`, `ol` and `dl` are used for distinct purposes on the ideas page.
- Internal paths are file-relative so the site also works in a GitHub Pages project subfolder.
- The about page contains a real data table with a caption and scoped headings. It is not used for page layout.
- Form controls have associated labels and names; browser validation and a local confirmation demonstrate input handling. No message is sent or stored.
- Buttons work with a keyboard. The mobile menu exposes expanded state and closes with Escape.
- Reduced-motion CSS preserves the printer's behaviour without sliding animations.

## Assignment checklist

| Item | Evidence / status |
| --- | --- |
| 1. Home with hero and overview | `index.html`, `images/hero.svg` |
| 2. At least 15 quotations | 20 static quotations in `quotes.html` |
| 3. DRY JavaScript navigation | `nav.html` + `nav.js`; shared footer too |
| 4. At least five project ideas | `project.html`: five named ideas and audiences |
| 5. Styled quotes and random hero | `quotes.css` + `quotes.js` |
| 6. Minimal useless machine | Original Nothing Printer |
| 7. Interactive game | Five-round closing-tag game with feedback, score and replay |
| 8. Styled, functional, responsive site | Five English pages; local browser checks documented in the handover |
| 9. AI code agent configured in VS Code | The student's own VS Code setup must be checked; using the Codex desktop app alone does not prove this item |
| 10. Git installed | Git 2.56.0.windows.4 verified during creation |
| 11. Local project initialised with Git | `.git` belongs inside this `my-site` folder, never its parent |
| 12. GitHub account | Connected account: `lzh123456-max` |
| 13. Public GitHub remote and pushed code | Source and original Git history pushed to `https://github.com/lzh123456-max/my-site.git`; `main` tracks `origin/main` |
| 14. Live URL | Public website: https://learning-html-fieldnotes-1107.fine-rook-2145.chatgpt.site |

This folder is the learning website only. Keep the personal project in a separate sibling folder with its own Git repository. The default ideas on `project.html` are complete brainstorming proposals; review them and choose the subject you actually want to build for your separate personal project.

## GitHub Pages

The root HTML files can be published directly. Once this folder has been pushed to its own public GitHub repository, select **Settings → Pages → Deploy from a branch → main → /(root)**. `.nojekyll` prevents Jekyll processing.

To update social preview URLs after choosing a different live address, run:

```sh
node prepare.mjs --origin https://YOUR-ACTUAL-SITE-ADDRESS/
```

Replace the command's address with your actual published address, including the repository subpath if applicable. This updates the five pages' Open Graph metadata and copies public assets into `dist/`. The generated `dist/` is ignored by Git; GitHub Pages branch deployment uses the root files.

Commit real changes as they happen. No dates or historical work should be fabricated. The generated initial source is a starting point, not evidence of previous weekly development.

## Sources and AI assistance

The course references and image credits are on `about.html#sources`. Every quotation links to its public-domain source text. AI assisted with initial implementation, wording, illustration and review; read and personalise the work so you can explain each decision in your own words.
