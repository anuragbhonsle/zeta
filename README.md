<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=40&duration=3000&pause=2000&color=10B981&width=700&height=60&lines=Zeta" />
</a>

An AI-native trading research assistant that turns a natural-language market question into a structured, testable experiment and knows when it doesn't have enough information to do that responsibly. Built with **React**, **TypeScript**, and **Vite** on the frontend, a **Node.js + Express** backend, **Google Gemini** for query structuring, and **MongoDB** for persistence.

## ***Live Site:*** [zetaa.vercel.app](https://zetaa.vercel.app/)

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-8E75B2?style=flat-square&logo=googlegemini&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

---

## The Problem

Traders think in questions — *"Does buying NIFTY after a 1% fall work better during high-volatility periods?"* — but backtesting engines need precise, unambiguous rules. Someone has to sit in between and translate loose intuition into a testable specification: what instrument, what timeframe, what counts as "high volatility," what "works better" even means.

Zetaa is a small, functional slice of a much larger AI-native research platform. It automates that translation step:

```
Understand the question  →  Structure it as an experiment  →  Ask if unclear  →  Present it clearly
```

It deliberately stops there — no backtesting, no predictions, no trading advice. Turning a vague idea into a precise, falsifiable hypothesis is the hard problem worth solving first; backtesting a badly-specified strategy is worse than not backtesting at all.

---

## Features

- **Natural Language Understanding** — Extracts instrument, timeframe, entry/exit conditions, holding period, and filters from a plain-English question
- **Structured, Schema-Enforced Output** — Gemini's `responseSchema` guarantees the model returns a fixed JSON shape, never free-form text
- **Smart Clarification** — Recognizes when essential information (like exit rules) is missing and asks 1–2 targeted questions instead of guessing or interrogating the user
- **Inline Clarification Flow** — Answers are collected in a lightweight form, each with a concrete example, and re-submitted alongside the original question
- **Clean Experiment Card** — The finished experiment renders as a structured, readable breakdown rather than a wall of JSON
- **Persistent Research Log** — Completed experiments are saved to MongoDB, so only well-formed, finished questions are remembered
- **Polished, Responsive UI** — Smooth state transitions (loading → clarification → result) with Framer Motion, built on Tailwind CSS

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling / UI** | Tailwind CSS v4, Framer Motion, Lucide / Tabler / React Icons |
| **State** | Context API (`ExperimentContext`) |
| **Backend** | Node.js, Express, TypeScript |
| **AI / LLM** | Google Gemini (`gemini-3.1-flash-lite`) via `@google/genai`, constrained with a JSON schema |
| **Database** | MongoDB via Mongoose |
| **Tooling** | ESLint, Axios |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## Architecture

Every question flows through the same three-step pipeline. The first call may come back `needs_clarification`, in which case only step 1–2 repeat with the user's answers attached before persistence happens.

```
 ┌───────────────┐   1. POST /api/experiments    ┌───────────────┐   2. generateContent()   ┌───────────────┐
 │               │   { prompt, clarifications }  │               │   + JSON responseSchema  │               │
 │    Frontend   │ ─────────────────────────────>│    Backend    │ ────────────────────────>│    Gemini     │
 │  React + Vite │                               │  Express + TS │                          │  (structuring │
 │               │<───────────────────────────── │               │<──────────────────────── │    engine)    │
 └───────────────┘   { data: Experiment }        └───────┬───────┘   structured JSON        └───────────────┘
                                                         │
                                                         │ 3. only if status === "complete"
                                                         ▼
                                                 ┌───────────────┐
                                                 │    MongoDB    │
                                                 │  (Mongoose)   │
                                                 └───────────────┘
```

| Step | What happens |
|---|---|
| 1 | Frontend sends the raw question (and, on a second pass, the user's clarification answers) |
| 2 | Backend prompts Gemini with a strict system instruction — *extract, never advise* — and a fixed `responseSchema`, so the reply is always valid JSON in the expected shape |
| 3 | Only experiments that come back `"status": "complete"` are written to MongoDB — incomplete drafts are shown to the user but never persisted |

---

## Project Structure

```
zeta/
├── backend/
│   └── src/
│       ├── controllers/
│       │   ├── experiment.controller.ts   # Core logic: system prompt, Gemini call, schema enforcement
│       │   ├── contact.controllers.ts     # Validates + saves a contact form submission
│       │   ├── newsletter.controller.ts   # Validates + saves a newsletter signup email
│       │   └── health.controllers.ts      # Liveness check: status, uptime, memory usage
│       ├── models/
│       │   ├── Experement.ts              # Mongoose schema — persists completed experiments only
│       │   ├── Contact.ts                 # Mongoose schema for contact form submissions
│       │   └── Newsletter.ts              # Mongoose schema for newsletter signups
│       ├── routes/
│       │   ├── experiment.routes.ts       # POST /api/experiments
│       │   ├── contact.routes.ts          # POST /api/contact
│       │   ├── newsletter.routes.ts       # POST /api/newsletter
│       │   └── health.routes.ts           # GET  /api/health
│       ├── db.ts                          # MongoDB connection
│       ├── app.ts                         # Express app + route mounting
│       └── server.ts                      # Entry point
├── src/
│   ├── context/
│   │   └── ExperimentContext.tsx          # Prompt, experiment state, clarification answers
│   ├── components/
│   │   ├── Hero.tsx                       # Input + state machine (loading/clarify/result) — core UX
│   │   ├── ClarificationForm.tsx          # Renders only the missing, essential questions
│   │   ├── ExperimentResult.tsx           # Structured experiment breakdown
│   │   ├── About.tsx                      # Marketing section: what the product does, why it matters
│   │   ├── Contact.tsx                    # Contact form + newsletter signup, posts to the backend
│   │   ├── Navbar.tsx                     # Site navigation header
│   │   ├── Footer.tsx                     # Site footer with links
│   │   └── ui/                            # Shared UI primitives (input, background effects)
│   └── main.tsx
├── public/
├── index.html
├── vite.config.ts
└── vercel.json
```

---

## Example

**Input:**
> "Does buying NIFTY after a 1% fall work better during high-volatility periods?"

**Experiment Schema** — the backend enforces this shape via Gemini's structured output (`@google/genai`'s `Type` definitions), so the model's reply is always valid JSON in this exact form, never free text:

```ts
// Enforce strict output schema via GoogleGenAI Type definitions
const experimentSchema = {
  type: Type.OBJECT,
  properties: {
    instrument: { type: Type.STRING, nullable: true },
    timeframe: { type: Type.STRING, nullable: true },
    entryCondition: { type: Type.STRING, nullable: true },
    exitCondition: { type: Type.STRING, nullable: true },
    holdingPeriod: { type: Type.STRING, nullable: true },
    filters: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    objective: { type: Type.STRING },
    missingInformation: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    status: {
      type: Type.STRING,
      enum: ["complete", "needs_clarification"],
    },
  },
  required: ["filters", "objective", "missingInformation", "status"],
};
```

**First pass — incomplete:**
```json
{
  "instrument": "NIFTY",
  "timeframe": "Daily",
  "entryCondition": "NIFTY closes down 1% or more from the previous close",
  "exitCondition": null,
  "holdingPeriod": null,
  "filters": ["High volatility regime"],
  "objective": "Determine whether buying NIFTY after a 1% decline has a statistical edge, and whether that edge is more pronounced in high-volatility conditions.",
  "missingInformation": [
    "How long should the position be held, or what should trigger an exit?"
  ],
  "status": "needs_clarification"
}
```

**After the user answers "hold for 5 trading days":**
```json
{
  "instrument": "NIFTY",
  "timeframe": "Daily",
  "entryCondition": "NIFTY closes down 1% or more from the previous close",
  "exitCondition": "Not specified",
  "holdingPeriod": "5 trading days",
  "filters": ["High volatility regime"],
  "objective": "Determine whether buying NIFTY after a 1% decline has a statistical edge, and whether that edge is more pronounced in high-volatility conditions.",
  "missingInformation": [],
  "status": "complete"
}
```

### When the exit condition is already given

If the original question specifies an exit rule up front, the model extracts it directly and skips clarification entirely — the pipeline only asks for what's actually missing.

**Input:**
> "Buy NIFTY futures after a 2% intraday drop. Exit at 3% profit or after 3 trading days, whichever comes first."

**Output — complete on the first pass:**
```json
{
  "instrument": "NIFTY Futures",
  "timeframe": "Intraday / Daily",
  "entryCondition": "NIFTY drops 2% or more intraday",
  "exitCondition": "Exit at 3% profit target, or after 3 trading days — whichever comes first",
  "holdingPeriod": "Up to 3 trading days",
  "filters": [],
  "objective": "Determine whether buying NIFTY futures after a 2% intraday drop, with a defined profit target and time-based exit, produces a positive edge.",
  "missingInformation": [],
  "status": "complete"
}
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A MongoDB connection string (local or [Atlas](https://www.mongodb.com/atlas))
- A [Gemini API key](https://ai.google.dev/)

### Installation

Clone the repository:

```bash
git clone https://github.com/anuragbhonsle/zeta.git
cd zeta
```

Install the frontend dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root for frontend environment variables:

```env
VITE_API_URL=your_backend_url
```

Create a `.env` file inside the `backend/` directory for backend environment variables:

```env
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string
```

> Never commit `.env` files or expose sensitive credentials.

### Run the Backend

```bash
cd backend
npm install
npx tsx src/server.ts
```

The backend will run on:

```
http://localhost:8000
```

### Run the Frontend

Open a separate terminal from the project root:

```bash
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## API Reference

### `POST /api/experiments`

Structures a natural-language question into an experiment. Called twice in the full flow: once with just the prompt, and again with clarifications once the user has answered.

**Request body**
```json
{
  "prompt": "Does buying NIFTY after a 1% fall work better during high-volatility periods?",
  "clarifications": {
    "How long should the position be held?": "5 trading days"
  }
}
```
`clarifications` is optional — omitted on the first call.

**Response body**
```json
{
  "message": "Experiment created",
  "data": {
    "instrument": "NIFTY",
    "timeframe": "Daily",
    "entryCondition": "NIFTY closes down 1% or more from the previous close",
    "exitCondition": "Exit at 3% profit target, or after 3 trading days — whichever comes first",
    "holdingPeriod": "5 trading days",
    "filters": ["High volatility regime"],
    "objective": "...",
    "missingInformation": [],
    "status": "complete"
  }
}
```

### `GET /api/health`

Basic liveness check.

---

## Deployment

This project uses **Vercel** for the frontend and **Render** for the backend.

### Frontend — Vercel

1. Push the repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com/).
3. Set `VITE_API_URL` to the deployed backend URL.
4. Deploy.

### Backend — Render

1. Create a new Web Service on [Render](https://render.com/).
2. Connect the GitHub repository.
3. Set the **Root Directory** to `backend`.
4. Set the **Build Command** to `npm install`.
5. Set the **Start Command** to `npx tsx src/server.ts`.
6. Add `GEMINI_API_KEY` and `MONGODB_URI` as environment variables.
7. Deploy.

---

## Why This Approach

**Structured output over free-text chat.** A chat window that answers *"does this have an edge?"* would be actively misleading — an LLM guessing at market edge from priors is not research, it's hallucination with a nice tone. Instead, the model's only job is **extraction into a fixed schema**, enforced by Gemini's `responseSchema`. The output is always shaped like an experiment a backtester could consume next, never like an opinion.

**Ambiguity is a first-class state, not an edge case.** `status: "needs_clarification"` isn't an error path bolted on afterward — it's one of exactly two outcomes the schema allows, and the UI has a dedicated state for it. The system prompt is deliberately strict about *when* to ask: only when a detail is essential to make the experiment testable, never more than 1–2 questions, no interrogating the user about every optional parameter (stop-loss, slippage) they didn't mention. This mirrors how a good human research analyst behaves — fill in reasonable defaults, but don't silently guess at the parts that would change the meaning of the result.

**Conversational memory without a chat log.** Clarifications are collected as `{ question: answer }` pairs in React state and replayed to the model alongside the *original* prompt on the second call, rather than maintaining a full chat history. This keeps the backend stateless per request and keeps the "experiment" the single unit of truth, instead of a growing transcript the model has to re-interpret each turn.

**Persistence only on success.** Only completed, unambiguous experiments are written to MongoDB. This keeps the eventual "remember what it learned" store meaningful — a log of well-formed research questions — rather than a dump of half-finished, abandoned prompts.

---

## What's Deliberately Out of Scope

This is not a trading platform. Specifically **not** built:

- No actual backtesting engine or price data — the output is a *spec* for one, not a result
- No user accounts, saved experiment history in the UI, or experiment editing after the fact
- No support for comparing multiple experiments or iterating on a past one

## What I'd Improve With More Time

- **Show past experiments** — a "recent experiments" list backed by the existing MongoDB collection; the data is already persisted, just not surfaced in the UI
- **Editable structured fields** — let the user tweak a parsed field (e.g. change "5 trading days" to "10") directly in the result card, rather than only through the clarification flow
- **Confidence / reasoning trace** — surface *why* the model interpreted "high volatility" a certain way (e.g. which proxy it assumed — VIX vs. realized vol), so the user can catch a wrong assumption before running an experiment on it
- **Patch, don't restart** — a follow-up like "actually, use a 2% threshold instead" should update the existing experiment rather than starting over
- **Automated tests** around the controller's handling of malformed or empty model output, since the flow currently trusts Gemini's schema adherence with only a try/catch around JSON parsing

---

## AI Tools Disclosure

- **AI tools used:** Claude and Cursor (AI-assisted coding), Google Gemini (`gemini-3.1-flash-lite`) as the in-product LLM powering the extraction logic.
- **What they were used for:** scaffolding React components and Tailwind styling, iterating on the Gemini system prompt and JSON schema to reliably separate "complete" vs. "needs clarification" outcomes, and drafting/formatting this README.
- **What I personally designed:** the product decision to treat missing information as a first-class, minimal-friction clarification step rather than either silently assuming defaults or interrogating the user field-by-field; the constraint that the model must extract, never advise; the state machine driving the UI (idle → building → clarification → complete); and the decision to persist only completed experiments.
- **What I reviewed or modified:** the system prompt's clarification rules (tightened to cap at 1–2 questions and forbid asking about already-reasonable defaults like stop-loss), the JSON schema fields to match exactly what the assignment asked for (instrument, timeframe, entry, exit, holding period, filters, objective), and the API contract for how clarification answers get replayed to the model.

---

## Contact

***Live App***: [zetaa.vercel.app](https://zetaa.vercel.app/)
***GitHub***: [@anuragbhonsle](https://github.com/anuragbhonsle)