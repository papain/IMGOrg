---
name: giftcard
description: 礼品卡记账：记录消费、查询余额、列出所有卡。用户说"XX卡花了$N"、"礼品卡还剩多少"、上传礼品卡消费截图，或 "/giftcard" 时使用。
---

# Gift Card 记账

数据在 `data\data.js` 的 `giftcards[]`。

- **记消费**：找到对应卡（按名称模糊匹配），transactions 加 `{date, amount, note}`，balance 扣减。如果是截图，先 Read 识别商家、金额、日期。
- **余额 ≤ 0**：status 改 `depleted`，关联 item（如有）改 `archived`，回复「🎁 XX 卡已用完，已自动归档」。
- **新卡**：用户上传卡或说"新到一张$X的XX卡" → 建档 `{name, initialBalance, balance, transactions:[], status:"active"}`。
- **查询**：列出所有 active 卡的余额和最近一笔消费；depleted 的折叠成一行。
- 找不到匹配的卡时列出现有卡名让用户选，不要猜。
