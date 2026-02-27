# Golla Raghavendra Yadav - Developer Portfolio

Welcome to the source code for my personal portfolio website! This project is a modern, responsive, and highly interactive web application built to showcase my skills as a Full Stack Web Developer, Designer, Author, and Illustrator.

## 🚀 Live Demo

You can view the live website here: [https://www.gollaraghavendrayadav.com](https://www.gollaraghavendrayadav.com)

## ✨ Features

- **Modern & Interactive UI:** Built using custom Animated Backgrounds and responsive Grid layouts that work seamlessly across desktop and mobile devices.
- **Smooth Animations:** Integrated with `framer-motion` to provide fluid page transitions, scroll interactions, and micro-animations.
- **Dynamic Content Management:** Deeply woven with **Sanity.io CMS** to manage Articles (Blog) and Book Summaries without touching the frontend code.
- **Performance Optimized (Next.js 15):** 
  - Utilizing `next/image` to dynamically resize, compress, and serve assets.
  - Employing **Incremental Static Regeneration (ISR)** to lazily revalidate Sanity CMS content in the background, minimizing build times while maintaining blistering fast TTFB (Time to First Byte).
- **Interactive Comments & Reactions:** An integrated API voting and commenting architecture running securely via Next.js App Router API endpoints (`app/api`).

## 🛠️ Technology Stack

| Category | Technologies |
| --- | --- |
| **Frontend Framework** | Next.js 15.3 (Pages & App Router Hybrid), React 19 |
| **Styling** | Tailwind CSS 3.3, Vanilla CSS, Styled-Components |
| **Headless CMS** | Sanity.io (mounted directly at `/studio`) |
| **Animation Engine** | Framer Motion |
| **Icons & Assets** | React Icons, Heroicons |
| **Typing & Tooling** | TypeScript, ESLint, Prettier |
| **Deployment** | Vercel |

## 📁 Project Structure

This project uses a mix of Next.js architectural patterns:

- `src/pages/`: Contains the primary public-facing pages (Home, About, Blog, Book Summaries, Projects).
- `src/app/api/`: Contains Serverless API Handlers for interactive comment upvoting and SSE (Server-Sent Events) capabilities.
- `src/app/studio/`: Hosts the embedded Sanity Studio v3 environment built directly into the same deployed domain.
- `src/components/`: Reusable UI modules, such as `Hero`, `Projects`, `Certificates`, and `AnimatedBackground`.
- `src/sanity/`: Contains schemas and configuration files connecting the application deeply to Sanity.io.

## 💻 Running the Project Locally

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed on your machine.
You will also need a **Sanity.io** account and project setup.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/my-portfolio.git
cd my-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Setup

Create a `.env.local` file at the root of your directory with the following variables retrieved from your Sanity Dashboard:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
# Add any API Write Tokens required for comments/votes
# SANITY_API_TOKEN="your_write_token"
```

### 4. Run the Development Server

```bash
npm run dev
```

Your application will be accessible at [http://localhost:3000](http://localhost:3000).
Your Sanity Studio will be accessible at [http://localhost:3000/studio](http://localhost:3000/studio).

## 🚀 Deployment

The site is optimized for one-click deployment via **Vercel**. 

Before deploying to production:
1. Ensure all environment variables are securely added to your hosting platform's dashboard.
2. In your Sanity Studio management panel (sanity.io/manage), make sure you whitelist your production URL in the **CORS Origins** settings.
3. Build the application locally to verify zero type-errors: `npm run build`.

## 📄 License

This project is open-source and available under the MIT License. Feel free to use architectural patterns from this repository for your own applications!