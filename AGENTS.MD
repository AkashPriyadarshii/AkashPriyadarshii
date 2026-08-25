# AGENTS.md

This file provides repository-level instructions for AI coding assistants (Cursor, Copilot, Claude, Gemini, etc.) working on this repository.

## 1. Project Overview
This repository (`AkashPriyadarshii/AkashPriyadarshii`) is a GitHub Profile README repository. It contains the main `README.md` for the profile and a Python script (`gen_stats.py`) used to generate GitHub statistics SVG banners (`stats.svg`). 

## 2. Tech Stack & Environment
- **Python**: Used for the stats generation script (`gen_stats.py`). Standard library only (no `pip install` required for `requests`).
- **Markdown**: Used for `README.md`.
- **SVG**: Used for outputting the badges/stats.

## 3. Essential Commands
- **Generate Stats**: Run `python gen_stats.py`. Note: This script requires a `GITHUB_TOKEN` environment variable to fetch data via the GitHub API without rate-limiting.

## 4. Coding Conventions & Style
- **Python Code**: Maintain the zero-dependency approach in `gen_stats.py`. Stick to `urllib.request` instead of external libraries like `requests` or `aiohttp`.
- **Markdown**: Use GitHub Flavored Markdown (GFM). Keep the profile clean, token-efficient, and visually aligned using center tags and SVG images.
- **Agent Output**: When generating code or writing files, use structured formats (JSON/Markdown) as preferred by Akash's ecosystem.

## 5. Boundaries ("Guardrails")
- **Always do**: Test `gen_stats.py` locally before committing to ensure `stats.svg` renders correctly.
- **Never do**: Do not add bloated third-party Python dependencies (like `pandas` or `requests`) to `gen_stats.py`.
- **Never do**: Do not hardcode any GitHub tokens or secrets in the codebase.
- **Ask first**: Before modifying the layout or aesthetic of `README.md`, confirm the design changes with the user.
