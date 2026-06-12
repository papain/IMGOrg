# 智能收据 / 截图管理系统（Smart Doc Organizer）

这个项目是一个由 Claude Code 驱动的个人文档管理应用。用户上传 PDF / 图片 / 截屏（直接粘贴到对话，或放进 `inbox\` 文件夹），Claude 负责识别、打标签、提取摘要和日期、给出下一步行动建议、安排提醒，并维护 dashboard。

## 数据存储（唯一数据源）

所有数据存在 `data\data.js`，格式为 `window.APP_DATA = {...}`，内部是标准 JSON。
**每次处理完文件后必须更新此文件**，dashboard.html 直接读取它。

⚠️ **本仓库是 public**：`data\data.js` 在 .gitignore 里，只存在本地，绝不提交。新机器克隆后若没有 `data\data.js`，先从 `data\data.example.js` 复制一份再开始。`inbox\` 和 `archive\` 的内容同样不上传。

数据结构：
- `items[]` — 每个文档一条：id, file（归档后路径）, tags[], summary, date（事件发生日期 YYYY-MM-DD）, amount（金额，可选）, status（`active` | `done` | `archived`）, nextSteps（下一步建议文字）, createdAt
- `todos[]` — 待办：id, itemId, title, dueDate, status（`pending` | `done`）, note
- `giftcards[]` — 礼品卡：id, name, initialBalance, balance, transactions[]（date, amount, note）, status（`active` | `depleted`）
- `tags[]` — 标签：name, count（使用次数）, keywords[]（识别关键词）, lastUsed

## 处理流程（用户上传文件或说"处理 inbox"时执行）

1. **识别**：用 Read 工具读取图片/PDF，提取全部文字内容。
2. **打标签**：根据 `data.js` 里 `tags` 的 keywords 匹配 + 内容理解，选 1-2 个标签。匹配不到任何标签时，提议一个新标签并询问用户确认。
3. **提取**：summary（一句话中文摘要）、date（内容里的事件/交易日期，不是上传日期）、amount（如有金额）。
4. **归档**：把文件从 inbox 移到 `archive\<主标签>\`，文件名规范化为 `YYYY-MM-DD_简述.扩展名`。
5. **分类专属动作**（见下节）。
6. **更新** `data\data.js`：新增 item、todo，更新 tag count 和 lastUsed。
7. **回复用户**：标签、摘要、日期、下一步还缺什么、已安排的提醒。

## 分类专属规则

### DCFSA（Dependent Care FSA）
- 报销渠道：Via Benefits（https://my.viabenefits.com）。
- 关键规则：**只能在服务发生之后报销**。如果收据上的服务日期在未来（比如预付的 daycare/summer camp），不能立即报。
- 动作：若服务结束日期在未来 → 用 scheduled-tasks（create_scheduled_task）建一个服务结束次日的一次性提醒「可以上传 Via Benefits 报账了」，同时在 todos 里加一条 dueDate = 服务结束次日的待办；若服务已发生 → 待办 dueDate = 今天，提示现在就可以报。
- 检查收据是否齐全：需包含 provider 名称、服务日期范围、金额、被照顾人姓名。缺哪项告诉用户。

### HCFSA（Health Care FSA）
- 动作：用 WebSearch 搜索该商品/服务是否 FSA eligible（参考 IRS Publication 502 和 fsastore.com 的 eligibility list）。
- 结果分三类告诉用户：✅ 可直接报 / ⚠️ 需要医生开 Letter of Medical Necessity (LMN) / ❌ 不可报。
- 需要 LMN 的，在 todos 加「找医生开 LMN」；可报的加「上传报销」待办。
- 检查收据要素：日期、商家、商品/服务明细、金额（信用卡小票不带明细的不合格，要 itemized receipt）。

### Work travel
- 提取：行程日期、商家、金额、类别（机票/酒店/餐饮/交通）。
- 待办：「提交 expense report」，dueDate = 行程结束后 7 天内。

### Gift card
- 新卡：在 `giftcards[]` 建档（名称、面额、余额=面额）。
- 消费记录（用户上传消费截图或口头说"XX卡花了$N"）：在对应卡的 transactions 加一条，扣减 balance。
- **balance ≤ 0 时**：status 改为 `depleted`，对应 item 改 `archived`，告诉用户「此卡已用完，已归档」。

### 食谱 / 书 / 生活常识
- 纯收藏类：打标签 + 摘要即可，不生成待办。食谱额外提取菜名和关键食材；书提取书名/作者。

### 爸妈健康
- 提取：日期、医院/医生、检查项目或诊断、关键指标数值。
- 如内容含复查/随访日期 → 自动建提醒和待办。

### 北卡出租房 / 湾区租房
- 提取：日期、金额、事项（租金/维修/账单/合同）。
- 含截止日期的（如续约、账单 due date）→ 建待办和提醒。

## 完成与闭环

- 用户说「XX 报完了 / 完成了」→ 找到对应 todo 标 `done`，对应 item 的 status 改 `done`，回复确认。
- 全部 todo 完成且无后续动作的 item → status 改 `archived`。

## 标签自动管理

每处理 10 个文件（或用户要求时），做一次标签整理：
- 某标签 count 长期为 0 → 建议删除。
- 经常需要手动新建同类标签 → 建议正式收编为固定标签并补充 keywords。
- 同一文件经常命中两个标签 → 建议合并或建立父子关系。
- 把高频标签的常见词补进 keywords，提高之后的命中率。
调整前先列出建议，用户确认后再改 `tags[]`。

## Dashboard

`dashboard.html` 用浏览器直接打开（file:// 即可）。To-do 按 dueDate **从最近到最远**排序，过期的标红。还显示礼品卡余额、最近归档、标签统计。
修改数据后无需重建，刷新页面即可。

## 提醒（Scheduling）

用 scheduled-tasks MCP 工具（create_scheduled_task / list_scheduled_tasks / update_scheduled_task）创建一次性提醒。提醒文案格式：「【标签】事项 — 现在可以做什么」。创建后把任务说明记入对应 todo 的 note。
