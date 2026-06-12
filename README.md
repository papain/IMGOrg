# IMGOrg — 智能收据 / 截图管理系统

A personal document organizer powered by [Claude Code](https://claude.com/claude-code). Paste a screenshot, receipt, or PDF — Claude reads it, tags it, extracts the summary/date/amount, archives the file, tells you what's missing for reimbursement, and schedules reminders. A local HTML dashboard shows your to-dos (nearest due date first), gift card balances, and archive.

上传截图/收据/PDF → Claude 自动识别、打标签、提取摘要和日期、归档、告诉你报销还缺什么、安排提醒。本地 dashboard 显示待办（按时间从近到远）、礼品卡余额、归档记录。

## Quick start

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
