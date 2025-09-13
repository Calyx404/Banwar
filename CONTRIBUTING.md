# Contributing Guide

Thank you for your interest in contributing to the Cordillera Atlas project!
This guide will walk you through our collaboration rules, commit conventions, and branching strategy.

---

## 🏗 Workflow Overview

1. **Branch** off from `develop`.
2. Make your changes in a dedicated branch (`feature/*` or `fix/*`).
3. Commit using our conventions (see below).
4. Open a Pull Request (PR) into `develop`.
5. Another member reviews your work.
6. Once tested, PRs from `develop` → `main` for release.

---

## 🌱 Branching Convention

- `main` → stable production branch.
- `develop` → integration branch where features/fixes are merged.
- `feature/*` → new features.
  - Example: `feature/add-search-function`
- `fix/*` → bug fixes.
  - Example: `fix/popup-display-bug`
- `docs/*` → documentation updates.
  - Example: `docs/update-readme`

---

## ✍️ Commit Message Convention

We follow a modified **Conventional Commits** style.
**Format:**

```
TYPE(scope): Short description
```

### Allowed **Types** (MUST be CAPITALIZED):

- **FEAT** → New feature (e.g., `FEAT(data): add Mankayan site`)
- **FIX** → Bug fix (e.g., `FIX(loader): correct marker popup display`)
- **DOCS** → Documentation changes (e.g., `DOCS: update DATA_MANUAL schema`)
- **STYLE** → Code style changes, no logic impact (e.g., `STYLE: format map init code`)
- **REFACTOR** → Code refactor without new features/bugs (e.g., `REFACTOR: simplify data validation`)
- **TEST** → Adding/updating tests (e.g., `TEST: add validation script tests`)
- **CHORE** → Maintenance tasks, configs, dependencies (e.g., `CHORE: update gitignore`)

### Scope (optional)

- Narrow context: `data`, `loader`, `docs`, etc.

### Examples

- `FEAT(data): add new site coordinates`
- `FIX(ui): resolve popup not showing`
- `DOCS: update contributing guide`

---

## 🔍 Code Review Rules

- At least **1 reviewer** approval required.
- Backend changes must be reviewed by **Validator or QA member**.
- Frontend changes must be tested in the browser.

---

## 🧑‍💻 Coding Standards

- **JavaScript**: Consistent formatting (indentation, semicolons).
- **Python (scripts)**: Follow [PEP8](https://peps.python.org/pep-0008/).
- Keep code simple and documented.

---

## ✅ How to Contribute

1. Fork and clone the repo.
2. Create a new branch:
   ```bash
   git checkout -b feature/add-new-data
   ```
3. Commit changes with proper type:
   ```bash
   git commit -m "FEAT(data): add Itogon mining site"
   ```
4. Push branch and open PR:
   ```bash
   git push origin feature/add-new-data
   ```
5. Wait for review and approval.
