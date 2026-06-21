# WorkWin Campus

A career-readiness platform that helps students turn internships, class projects, campus jobs, volunteer work, and leadership experiences into resume bullets, interview stories, LinkedIn language, elevator pitches, career fair talking points, presentations, and reflections.

Built with **Next.js 14 (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**. No database, no API key — all generation is mocked and runs fully on the frontend.

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

## Swapping the mock AI for a real API later

All generation is isolated in `lib/generate.ts` behind one function:

```ts
generateStory(input: StudentInput): Promise<GeneratedStory>
```

It already returns a `Promise` and is `await`ed by the UI, so going live means only:

1. Add a backend route (e.g. `app/api/generate/route.ts`) that calls your model.
2. Replace the body of `generateStory` with a `fetch` to that route, returning a `GeneratedStory`-shaped object.

No component changes are required.

## Note on responsible use

WorkWin Campus is designed to help students communicate **real** experience, not invent accomplishments. Students should review, edit, and personalize every output before using it. Built for career readiness, not shortcutting.
