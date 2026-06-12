# IMGOrg — 智能收据 / 截图管理系统

A personal document organizer powered by Claude. Snap a screenshot, receipt, or PDF — Claude reads it, tags it, extracts the summary/date/amount, tells you what's missing for reimbursement, checks HCFSA eligibility via web search, tracks gift card balances, and schedules reminders.

上传截图/收据/PDF → Claude 自动识别、打标签、提取摘要和日期、告诉你报销还缺什么、安排提醒、礼品卡实时记账。

## 📱 Use as an Android / iOS app (PWA)

The app is hosted at **https://papain.github.io/IMGOrg/** — works anywhere, no Claude Code needed.

1. Open the URL in Chrome (Android) or Safari (iOS).
2. Menu → **"安装应用 / Add to Home Screen"** — it becomes a full-screen app.
3. In ⚙️设置, paste your Claude API key (create one at [platform.claude.com](https://platform.claude.com)). The key and all data stay on your device (localStorage) — calls go directly to the Anthropic API, no middleman server.
4. 📥处理 tab → take a photo / pick a screenshot / paste an image → Claude tags it, extracts everything, creates to-dos, checks FSA rules online, and tracks gift cards.

Features: to-dos sorted nearest-due-first (overdue in red), DCFSA service-date logic with reminders, HCFSA eligibility lookup (✅/⚠️ LMN/❌), gift card auto-depletion + archiving, AI tag management suggestions, JSON export/import for backup.

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

`inbox/` and `archive/` contents are **git-ignored** — your receipts and health records never leave your machine. The repo ships with demo data in `data/data.js`. If you want your real data to sync across machines, make sure your fork is **private**, then commit `data/data.js` updates as you go.

## Using it on multiple machines

Clone the repo on each machine and open it in Claude Code. Code, rules, and skills sync via git. For data sync, keep the repo private and commit `data/data.js` (and optionally the `archive/` folder — remove those lines from `.gitignore`).
