# IMGOrg — 智能收据 / 截图管理系统

A personal document organizer powered by Claude. Snap a screenshot, receipt, or PDF — Claude reads it, tags it, extracts the summary/date/amount, tells you what's missing for reimbursement, checks HCFSA eligibility via web search, tracks gift card balances, and schedules reminders.

上传截图/收据/PDF → Claude 自动识别、打标签、提取摘要和日期、告诉你报销还缺什么、安排提醒、礼品卡实时记账。

## 📱 Use as an Android / iOS app (PWA)

The app is hosted at **https://papain.github.io/IMGOrg/** — works anywhere, no Claude Code needed.

1. Open the URL in Chrome (Android) or Safari (iOS).
2. Menu → **"安装应用 / Add to Home Screen"** — it becomes a full-screen app.
3. **注册账号**（用户名 + 密码）。All data is encrypted with AES-256 using a key derived from your password (PBKDF2). Without logging in, nothing can be decrypted; multiple accounts on one device are isolated from each other. ⚠️ Passwords cannot be recovered — losing it means losing the data.
4. 📥处理 tab → take a photo / pick a screenshot / paste an image → the app recognizes it **fully offline** and tags it, extracts amount/date, checks FSA eligibility, creates to-dos, and tracks gift cards.

The PWA is **100% offline / no API key required** — recognition runs on-device (Tesseract.js OCR + a built-in rule engine). Nothing is sent to any server.

### Offline recognition engine

On-device OCR (Tesseract.js, Chinese + English) reads the text, then a built-in rule engine tags it, extracts amount/date, and classifies **HCFSA eligibility** against a baked-in rule set (IRS Pub 502 + CARES Act 2020 — OTC meds ✅, menstrual care ✅, sunscreen SPF15+ ✅, vitamins ⚠️ LMN, toothpaste/gym ❌, etc.). Zero API cost, works on a plane. First run downloads ~15MB language packs, then cached for offline use.

Features: to-dos sorted nearest-due-first (overdue in red), DCFSA reminders, built-in HCFSA eligibility (✅/⚠️ LMN/❌) viewable in Settings, gift card auto-depletion + archiving, JSON export/import for backup.

## 💻 Use with Claude Code (desktop power mode)

1. Clone this repo anywhere:
   ```
   git clone https://github.com/papain/IMGOrg.git
   cd IMGOrg
   ```
2. Open the folder in [Claude Code](https://claude.com/claude-code) (CLI, desktop app, or claude.ai/code).
3. Paste a screenshot into the chat, or drop files into `inbox\` and say **"处理 inbox"** / use `/process`.
4. Open `dashboard.html` in any browser (double-click works, no server needed).

## How it works

- **`CLAUDE.md`** is the brain — Claude reads it automatically every session. It defines the processing pipeline and per-category rules (DCFSA service-date logic, HCFSA eligibility lookup, gift card balance tracking, etc.).
- **`data/data.js`** is the single data store (`window.APP_DATA`), read directly by the dashboard. Refresh the page after Claude updates it.
- **`.claude/skills/`** — slash commands: `/process` (organize files), `/done` (mark a task complete), `/giftcard` (track balances).
- **`archive/`** — processed files, organized by tag, renamed `YYYY-MM-DD_description.ext`.

## Built-in categories

DCFSA · HCFSA · Work travel · 食谱 · 爸妈健康 · 北卡出租房 · 湾区租房 · Gift card · 书 · 生活常识 — plus automatic tag management that adapts keywords and suggests merges based on your usage.

## Privacy

This repo is **public** and contains only the app itself — no personal data, ever:

- `inbox/` and `archive/` contents are git-ignored — receipts and health records never leave your machine.
- `data/data.js` (your real to-dos, balances) is git-ignored and local-only; the repo ships `data/data.example.js` with demo data. Fresh clones: `copy data\data.example.js data\data.js`.
- The PWA stores everything (API key included) in your phone's localStorage and calls the Anthropic API directly — nothing passes through any other server.

To sync PWA data across devices, use ⚙️设置 → 导出/导入 JSON.
