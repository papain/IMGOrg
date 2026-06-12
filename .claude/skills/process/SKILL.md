---
name: process
description: 处理上传的截图/PDF/图片，或扫描 inbox 文件夹：识别内容、自动打标签、提取摘要和日期、归档、生成下一步待办和提醒。用户上传文件、粘贴截图、说"处理一下"或"/process"时使用。
---

# 处理文档

按 CLAUDE.md「处理流程」执行。要点：

1. 对象：用户本条消息附带的图片/文件；若没有附件，扫描 `inbox\` 下所有文件逐个处理。
2. 用 Read 读取内容（图片直接读，PDF 按页读）。
3. 按 `data\data.js` 的 tags.keywords + 语义理解打标签；命中不了就提议新标签并问用户。
4. 提取 summary（中文一句话）、date（事件日期）、amount。
5. 执行 CLAUDE.md 中该标签的「分类专属规则」：
   - DCFSA：判断服务日期是否已过 → 建 Via Benefits 报销待办；未来日期用 scheduled-tasks 建一次性提醒。
   - HCFSA：WebSearch 查 FSA eligibility（IRS Pub 502 / fsastore.com），回答 可报 / 需LMN / 不可报。
   - Gift card：新卡建档或记录消费、更新余额，余额≤0 标记 depleted 并归档。
   - 其他类按 CLAUDE.md。
6. 文件移入 `archive\<主标签>\YYYY-MM-DD_简述.ext`，更新 `data\data.js`（items/todos/giftcards/tags 的 count 和 lastUsed）。
7. 每处理满 10 个文件，按 CLAUDE.md「标签自动管理」给出标签整理建议。
8. 回复格式：🏷️标签 | 📝摘要 | 📅日期 | 💰金额 | ⏭️下一步（缺什么材料、何时能报、已建什么提醒）。
