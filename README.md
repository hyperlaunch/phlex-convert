# Phlex Convert

Phlex Convert is a tool for converting HTML into [Phlex](https://phlex.fun) components. It supports clean, reusable, Rails-compatible components and handles features like slots and `<template>` tags.

## Context

Phlex Convert uses AI (powered by [Anthropic Claude Haiku](https://www.anthropic.com/index/claude)) to quickly transform HTML, such as output from tools like [v0.dev](https://v0.dev), into usable Phlex components. This makes it ideal for developers building Ruby-based, object-oriented UI components.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Converts HTML to Phlex components using AI.
- Supports Rails-compatible `snake_case` filenames.
- Handles Phlex slots for coupled components.
- Uses `template_tag` for `<template>` elements.
- Configured with [Biome](https://biomejs.dev) for linting and formatting.

## Links

- [Phlex](https://phlex.fun)

## Deployment

Deploy via [Vercel](https://vercel.com). See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
