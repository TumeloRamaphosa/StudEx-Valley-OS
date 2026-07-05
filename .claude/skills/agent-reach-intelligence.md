---
name: agent-reach-intelligence
description: Zero-API-fee agent internet for Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, LinkedIn — free intelligence gathering
triggers: ["social media scraping", "twitter api free", "reddit intelligence", "github data", "chinese social media", "bilibili", "xiaohongshu", "linkedin outreach", "youtube research"]
source: share.google/IIYm7sTnN29j1z8LA
stars: 50.4k ⭐
language: Python / TypeScript
status: active
---

# Agent-Reach — Zero-API-Fee Agent Internet

## What It Is
Agent-Reach connects AI agents to the internet without API fees. It uses browser automation + unofficial APIs to access major platforms. 50k+ stars — most starred agent scraping tool.

## Supported Platforms
- **Twitter/X** — trends, mentions, followers, content
- **Reddit** — subreddit monitoring, sentiment
- **YouTube** — video data, comments, trends
- **GitHub** — repo data, commits, issues, stars
- **Bilibili** — Chinese video platform (huge for China AI intel)
- **XiaoHongShu** — Chinese lifestyle/community platform
- **LinkedIn** — professional outreach, company data

## Why It Matters for StudEx
- **China AI intel** → Bilibili + XiaoHongShu (where Chinese devs actually share)
- **Partner research** → LinkedIn for Tencent/ByteDance/MiniMax exec contacts
- **Market intelligence** → Twitter + Reddit for Africa pharma trends
- **Russia intel** → Telegram + Reddit Russian communities
- **GitHub** → track open-source agent projects
- **ZERO API COSTS** — critical for budget-constrained ops

## Deployment
```bash
git clone https://github.com/Asabeneh/Agent-Reach.git
cd Agent-Reach
pip install -r requirements.txt

# Configure platform credentials in .env
python agent_reach.py --platform twitter --query "Africa pharma AI"
```

## Bilibili Intelligence Script
```python
# Track China AI agent trends
from agent_reach import BilibiliScraper

scraper = BilibiliScraper()
trends = scraper.get_trending("AI agent", limit=20)
for t in trends:
    print(f"{t['title']} — {t['views']} views")
```

## StudEx Integration
- Research Agent uses Agent-Reach for China AI monitoring
- China AI agents page in /research-hub populated from Bilibili data
- Partner outreach uses LinkedIn scraping for exec discovery
- Russia trade intel from Reddit Russian communities

## Status
✅ Active — loaded into Valley OS skills inventory
🔍 Free tier available
💰 Cost: $0 API fees (browser automation only)
