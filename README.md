# WorkWin Campus

A career-readiness platform that helps students turn internships, class projects, campus jobs, volunteer work, and leadership experiences into resume bullets, interview stories, LinkedIn language, elevator pitches, career fair talking points, presentations, and reflections.

Built with **Next.js 14 (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**. No database. Generation is powered by **Google Gemini** through a backend route, with a built-in mock fallback if no API key is configured.

## Run it locally

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

Other scripts:

```bash
npm run build   # production build
npm start       # serve the production build
```

## What's inside

The single-page app (`app/page.tsx`) is composed of focused components in `components/`:

| Component | Purpose |
| --- | --- |
| `Navbar`, `Hero`, `Footer` | Page chrome and hero CTA |
| `StudentTool` + `StoryOutput` | The main reflection tool: form, loading/empty states, and the 11 output cards |
| `OutputCard`, `CopyButton` | Reusable card with a copy-to-clipboard button on every output |
| `HowItWorks`, `WhoItHelps`, `UniversityPilot`, `WorkshopSection`, `InsightsSection`, `UniversityBuyerDemo`, `PricingSection`, `ContactSection` | Landing-page sections |
| `ModalProvider` + `RequestModal` | One shared, frontend-only request modal opened by every pilot/workshop/pricing button |

Logic lives in `lib/`:

- `lib/generate.ts` — **all mock generation logic** (see below)
- `lib/samples.ts` — pre-filled sample experiences
- `lib/options.ts` — dropdown option lists
- `lib/types.ts` — shared TypeScript types

## AI generation (Google Gemini)

Real generation is powered by **Google Gemini** (free tier) through a backend route:

- `app/api/generate/route.ts` — calls Gemini using `process.env.GEMINI_API_KEY`. The key lives **only on the server** and is never exposed to the browser.
- `lib/generate.ts` — `generateStory()` POSTs to that route. If no key is set or the model call fails, it falls back to a deterministic mock so the app always works.

### Add your free key

1. Get a free key at https://aistudio.google.com/apikey
2. **Local dev:** put it in `.env.local` (gitignored):
   ```
   GEMINI_API_KEY=your_key_here
   ```
   Then restart `npm run dev`.
3. **Production (Vercel):** Project → Settings → Environment Variables → add `GEMINI_API_KEY` with the same value, then redeploy.

Without a key the app still runs — it just uses the built-in mock generator.

## Note on responsible use

WorkWin Campus is designed to help students communicate **real** experience, not invent accomplishments. Students should review, edit, and personalize every output before using it. Built for career readiness, not shortcutting.
