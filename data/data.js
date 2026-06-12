window.APP_DATA = {
  "items": [
    { "id": "demo-1", "file": "archive/DCFSA/2026-06-30_sunshine-daycare-june.png", "tags": ["DCFSA"], "summary": "【示例】Sunshine Daycare 六月托儿费收据 $1,200", "date": "2026-06-30", "amount": 1200, "status": "active", "nextSteps": "服务6/30结束后才能报 Via Benefits，已安排7/1提醒", "createdAt": "2026-06-12" },
    { "id": "demo-2", "file": "archive/HCFSA/2026-06-05_cvs-receipt.png", "tags": ["HCFSA"], "summary": "【示例】CVS 购买退烧药和创可贴 $34.50", "date": "2026-06-05", "amount": 34.5, "status": "active", "nextSteps": "OTC 药品可直接报销，需 itemized receipt", "createdAt": "2026-06-12" },
    { "id": "demo-3", "file": "archive/食谱/2026-06-01_红烧排骨.png", "tags": ["食谱"], "summary": "【示例】红烧排骨做法：排骨、冰糖、生抽、八角，炖40分钟", "date": "2026-06-01", "amount": null, "status": "archived", "nextSteps": "", "createdAt": "2026-06-12" }
  ],
  "todos": [
    { "id": "todo-1", "itemId": "demo-2", "title": "【示例】上传 CVS 收据到 HCFSA 报销", "dueDate": "2026-06-15", "status": "pending", "note": "OTC 药品 eligible，无需处方" },
    { "id": "todo-2", "itemId": "demo-1", "title": "【示例】Via Benefits 上传六月 daycare 收据报 DCFSA", "dueDate": "2026-07-01", "status": "pending", "note": "服务期结束后才可报销，已设7/1提醒" }
  ],
  "giftcards": [
    { "id": "gc-1", "name": "【示例】Amazon Gift Card", "initialBalance": 100, "balance": 36.5, "transactions": [
      { "date": "2026-05-20", "amount": 42.0, "note": "厨房用品" },
      { "date": "2026-06-08", "amount": 21.5, "note": "书" }
    ], "status": "active" },
    { "id": "gc-2", "name": "【示例】Starbucks Card", "initialBalance": 25, "balance": 0, "transactions": [
      { "date": "2026-04-11", "amount": 25, "note": "咖啡若干" }
    ], "status": "depleted" }
  ],
  "tags": [
    { "name": "DCFSA", "count": 0, "keywords": ["dependent care", "daycare", "day care", "preschool", "after school", "summer camp", "childcare", "托儿", "幼儿园", "夏令营"], "lastUsed": null },
    { "name": "HCFSA", "count": 0, "keywords": ["pharmacy", "CVS", "Walgreens", "copay", "co-pay", "clinic", "medical", "dental", "vision", "prescription", "Rx", "药房", "诊所", "牙医", "眼科", "处方"], "lastUsed": null },
    { "name": "Work travel", "count": 0, "keywords": ["flight", "airline", "hotel", "boarding pass", "Uber", "Lyft", "rental car", "per diem", "出差", "机票", "酒店", "登机牌"], "lastUsed": null },
    { "name": "食谱", "count": 0, "keywords": ["recipe", "ingredients", "食谱", "做法", "菜谱", "克", "勺", "腌制", "烤箱", "炒"], "lastUsed": null },
    { "name": "爸妈健康", "count": 0, "keywords": ["体检", "血压", "血糖", "化验", "复查", "医院", "门诊", "心电图", "B超", "CT", "用药"], "lastUsed": null },
    { "name": "北卡出租房", "count": 0, "keywords": ["NC", "North Carolina", "tenant", "lease", "rent payment", "HOA", "property management", "维修", "租客", "出租"], "lastUsed": null },
    { "name": "湾区租房", "count": 0, "keywords": ["Bay Area", "landlord", "rent due", "lease renewal", "PG&E", "utility", "押金", "房东", "续租", "湾区"], "lastUsed": null },
    { "name": "Gift card", "count": 0, "keywords": ["gift card", "e-gift", "card balance", "redeem", "礼品卡", "礼卡", "余额"], "lastUsed": null },
    { "name": "书", "count": 0, "keywords": ["book", "author", "ISBN", "chapter", "书单", "作者", "出版社", "读书笔记"], "lastUsed": null },
    { "name": "生活常识", "count": 0, "keywords": ["tips", "how to", "妙招", "常识", "技巧", "保养", "清洁", "攻略"], "lastUsed": null }
  ]
};
