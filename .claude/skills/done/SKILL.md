---
name: done
description: 用户说某件事"报完了/完成了/办好了"时使用，把对应待办标记完成并归档文档。例如 "/done DCFSA 7月daycare" 或 "那个CVS的报销提交了"。
---

# 标记完成

1. 在 `data\data.js` 的 todos 里按用户描述（标签、商家、日期、金额）模糊匹配待办；多个候选时列出让用户选。
2. 该 todo 的 status 改 `done`。
3. 对应 item：若它名下已无 pending 待办，status 改 `done`；纯收藏或流程彻底结束的改 `archived`。
4. 如该 todo 当初建过 scheduled-tasks 提醒（见 todo.note），用 update_scheduled_task 停用它。
5. 回复确认：完成了什么、item 现在的状态、还剩几个待办。
