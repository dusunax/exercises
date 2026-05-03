# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

A personal collection of standalone mini-projects, numbered sequentially (`000/`, `001/`, … `033/`). The primary format is **vanilla HTML/CSS/JS** (open in browser, no build step) or **single Python scripts** — no React, no bundlers. The repo is deployed to GitHub Pages at `https://dusunax.github.io/exercises/`.

When suggesting new projects, default to vanilla JS + HTML or a plain Python script. Do not introduce framework dependencies unless the user explicitly asks.

## Running projects

**Vanilla HTML/CSS/JS (most exercises):** open `index.html` directly in a browser — no install, no build step.

**Python scripts (033 — handwritten digit recognition):**
```bash
# Install deps once (python3.14 from Homebrew required on macOS)
pip3 install numpy pillow scikit-learn

python3.14 033/digit_recognition.py
# Or double-click: 033/Digit Recognition.app
```

**Node.js exceptions (021, 022 — Socket.IO/WebRTC):**
```bash
cd 021   # or 022
npm install
npm run dev
```

## Exercise structure conventions

Recent exercises (≥ 031) follow a module pattern:

```
NNN/
  index.html       # entry point
  style.css
  script.js        # thin bootstrap — imports from modules/
  modules/
    app.js         # initialisation & wiring
    state.js       # shared mutable state
    dom.js         # DOM queries / element refs
    api.js         # external API calls
    builder.js     # data → DOM construction
    view.js        # render / update helpers
    graphics.js    # Canvas 2D drawing (when used)
    config.js      # constants
    utils.js       # pure helpers
  source/          # static assets (images, sprites)
  README.md
```

Older exercises are single-file or flat `index.html + style.css + script.js`.

## Key technologies per exercise

| Range | Stack |
|---|---|
| 000–020 | Vanilla HTML/CSS/JS, Canvas 2D |
| 021–022 | Node.js, Express, Socket.IO, Pug, WebRTC |
| 023–025 | Vanilla JS + external APIs (OpenAI GPT-3.5) |
| 031 | Web Speech API (STT/TTS), state machine, Canvas 2D |
| 032 | Canvas 2D image generation, GitHub REST API |
| 033 | Python, tkinter, scikit-learn (MNIST digit recognition) |

## Adding a new exercise

1. Create `NNN/` (next sequential number).
2. Add a row to the table in `README.md`.
3. For exercises with a live demo, add a link under "주요 페이지" in `README.md`.

## GitHub configuration

- Issues: two templates under `.github/ISSUE_TEMPLATE/` — `DOCUMENT_ISSUE.yaml` (documentation) and `feelings.yaml` (team mood check-in).
- PRs: template at `.github/PULL_REQUEST_TEMPLATE`.
- Deployments: GitHub Pages serves the repo root; all `index.html` files are reachable directly by path.
