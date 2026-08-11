# justindsims.com

Portfolio site for Justin D. Sims — motion graphics, video editing, storytelling.

Built with [Astro](https://docs.astro.build). Content lives in Markdown files in
the repo. Pushing to `main` publishes automatically through Netlify.

---

## Signing in to the editor

Go to **[justindsims.com/admin/](https://justindsims.com/admin/)**. You don't
need to install anything — it's a web page, and it works on a tablet.

Until the OAuth proxy is set up, use **Sign In Using Access Token**. To make a
token, once:

1. **github.com → Settings → Developer settings → Personal access tokens →
   Fine-grained tokens → Generate new token**
2. **Name:** `justindsims.com CMS` · **Expiration:** 1 year
3. **Resource owner:** `justin013-cloud` · **Repository access:** *Only select
   repositories* → `personalsite`
4. **Repository permissions →** set **Contents** to **Read and write**
   (Metadata: Read-only is added automatically)
5. Generate, copy it, and paste it into the sign-in screen

Treat that token like a password — never paste it into email or chat. It's
stored in that browser on that device, so you'll do this once per device.

**It expires.** When it does the editor stops working with an unhelpful auth
error rather than "your token expired," so put a reminder in your calendar.

## What you can edit

| Section | What's in it |
| --- | --- |
| **Work** | One entry per video. Add, edit, reorder, delete. |
| **Pages → Homepage** | The text above the reel. |
| **Pages → About** | Bio, job history, awards, skills, education. |
| **Settings → Site & contact** | Showreel URL, email, LinkedIn, Vimeo. |

Click **Work → New Project** to add a video, fill in the fields, hit publish.
The site rebuilds itself in about a minute.

**Adding a job to your résumé:** Pages → About → **Jobs** → *Add Job*. Dates are
free text, so write them however you like — `2024 – 2026`, `2019 – Present`.
Drag jobs to reorder them.

The only field that has to be exact is **Vimeo URL** — copy the link straight
from your browser's address bar, like `https://vimeo.com/816579985`. Everything
else is free text.

A few notes:

- **Orientation** — set this to `vertical` for 9:16 social cuts. It changes how
  the video is framed on the page so it doesn't get letterboxed.
- **Poster frame** — optional. Leave it empty and the site pulls the thumbnail
  from Vimeo automatically. Upload one if you want to pick the exact frame.
- **Show on homepage** — controls whether it appears on the front page. Every
  project shows on `/work` regardless.
- **Draft** — hides it from the live site without deleting it.

## Adding a project (the file version)

If you'd rather edit files directly, each project is one Markdown file in
`src/content/work/`. Copy an existing one and change the values:

```yaml
---
title: 'CSG Encompass Explainer'
vimeo: 'https://vimeo.com/1208913080'
orientation: 'horizontal' # or 'vertical'
client: 'CSG Systems'
role: 'Senior Video Production Specialist'
date: 2026-07-10
brief: 'One or two sentences about the brief.'
award: 'Gold Winner · Aster Awards 2024' # optional
featured: true
order: 1
---

The long "what I did" writeup goes here, in plain Markdown.
```

The filename becomes the URL: `csg-encompass-explainer.md` → `/work/csg-encompass-explainer/`.

If you get a field wrong, the build fails with a message telling you which file
and which field. It won't publish something broken.

## Other things you might want to change

| What | Where |
| --- | --- |
| Showreel, email, LinkedIn, Vimeo | `src/data/site.json` |
| Homepage hero text | `src/data/home.json` |
| Bio, job history, awards, tools | `src/data/about.json` |
| Colours and type sizes | `src/styles/global.css` |

The first three are the same files the CMS writes to, so editing either way
works and neither overwrites the other.

---

## For developers

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
```

**Stack:** Astro 7, static output, zero client JS except a small script that
swaps in the Vimeo player on click. Fonts (Science Gothic, Roboto) are
self-hosted at build time via Astro's font provider — no runtime request to
Google.

**Content model:** the `work` collection in `src/content.config.ts`, plus three
JSON files in `src/data/` validated by matching Zod schemas in `src/lib/`
(`about.ts`, `home.ts`, `site.ts`). Every one of them is mirrored by a
collection in `public/admin/config.yml`. **Change a schema and you must change
the CMS config to match**, or the editor will write data the build rejects.

Page *content* lives in `src/data/`; page *layout* stays in `.astro`. That line
is deliberate — Justin edits what the page says, not how it's built.

**Video embeds** use a facade — poster image plus a play button, with the iframe
injected on click. Five live Vimeo iframes on one page is several megabytes, and
most visitors play one at most. Poster resolution falls back in three tiers:
uploaded image → Vimeo thumbnail (fetched at build) → plain title card. A Vimeo
outage degrades the poster; it never fails the build.

**Colour:** the site is dark by design. `#4686c6` on white is 3.83:1, which
fails WCAG AA for body text; on `#161616` it's 4.73:1 and passes. That's why the
brand blue can be used exactly as specified — see the notes at the top of
`src/styles/global.css`.

**Deployment:** push to `main` → Netlify builds with `npm run build` and
publishes `dist`. Config is in `netlify.toml`.
