# ⚡ SumUp-AI — Resilient Serverless Document Summarization SaaS

### 🔗 Live Demo: **[sumup-ai-main.vercel.app](https://sumup-ai-main.vercel.app)**

SumUp-AI is a high-performance, production-ready SaaS application that processes, extracts, and summarizes complex PDF files under 3 seconds using advanced AI pipelines.

---

## 🚀 Key Features

*   **Resilient AI Orchestration:** Automatically falls back from OpenAI (GPT-3.5-Turbo) to Google Gemini (Gemini-2.5-Flash) if rate-limiting or quota errors occur, ensuring 100% uptime.
*   **Serverless Ingestion:** Uses **LangChain PDFLoader** to download and parse PDFs directly in-memory from cloud storage.
*   **Dual Payments:** Fully wired for global and local billing using **Stripe** and **Razorpay** webhooks.
*   **Seamless Developer DX:** Implements smart middleware bypasses so you can test and build locally without mandatory Auth blockers.

---

## 🛠️ Tech Stack

*   **Frontend & Backend:** Next.js 15 (App Router & Server Actions) + React 19
*   **Styling:** TailwindCSS v4 + Radix UI
*   **Authentication:** Clerk Auth
*   **Database:** Neon Serverless PostgreSQL
*   **Orchestration:** LangChain Core
*   **Storage:** UploadThing (S3 API)
*   **Payments:** Stripe + Razorpay

---

## 💻 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file with the following keys:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
DATABASE_URL=...
OPENAI_API_KEY=...
GEMINI_API_KEY=...
UPLOADTHING_TOKEN=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
```

### 3. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)**.
