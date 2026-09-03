# Portfolio

A modern developer portfolio built with React, Vite, Tailwind CSS, and Motion.

This is my personal portfolio website — a place to showcase the projects I've built, technologies I work with, and the things I'm currently learning.
The site focuses on a clean, modern interface with subtle animations, responsive layouts, and a developer-oriented visual style.

## Features

- **Responsive Design** — Optimized for desktop, tablet, and mobile.
- **Modern UI** — Clean interface with a developer-focused aesthetic.
- **Animated Interactions** — Smooth transitions and micro-interactions powered by Motion.
- **Project Showcase** — Highlights selected projects with their technologies and links.
- **Skills & Technologies** — Overview of the tools and technologies I work with.
- **Terminal Demo** — Interactive developer-style terminal section.
- **Contact Form** — Email-based contact functionality using EmailJS.
- **Reusable Components** — Structured React components for maintainability.
- **Responsive Navigation** — Navigation designed for both desktop and mobile.
- **Scroll-to-Top** — Improved navigation experience when moving between sections.

## Tech Stack

### Frontend

- **React 19**
- **Vite**
- **JavaScript**
- **Tailwind CSS**

### UI & Animation

- **Motion**
- **Lucide React**
- **Simple Icons**

### Utilities

- **EmailJS** — Contact form integration
- **clsx** — Conditional class handling
- **tailwind-merge** — Tailwind class merging

## Project Structure

```text
Portfolio/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── NavBar.jsx
│   │   ├── Projects.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── TerminalDemo.jsx
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

The project is organized around reusable components, with content separated into dedicated data files where appropriate.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/SamimNaser/Portfolio.git
```

Navigate into the project:

```bash
cd Portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local URL provided by Vite.

## Available Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start the development server     |
| `npm run build`   | Build the project for production |
| `npm run preview` | Preview the production build     |
| `npm run lint`    | Run ESLint                       |

## Design Philosophy

The portfolio is intentionally designed around a minimal and modern aesthetic rather than relying on excessive visual effects.

The goal is to keep the interface:

- Clean
- Responsive
- Interactive
- Easy to navigate
- Focused on the actual work

Animations and visual elements are used to improve the experience without getting in the way of the content.

## Project Status

**Active**

The portfolio is continuously updated as I build new projects, learn new technologies, and improve the overall design and experience.

## License

This project is intended to serve as my personal portfolio.

---
