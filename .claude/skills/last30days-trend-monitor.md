---
name: last30days-trend-monitor
description: Social trend monitoring across 30 platforms — AI agents, Africa pharma, Russia trade, China tech intelligence
triggers: ["social monitoring", "trend tracking", "30 platforms", "ai agent trends", "africa pharma trends", "russia trade", "china tech", "sentiment analysis"]
source: Embedded in Valley OS
status: active
---

# last30days — Social Trend Monitor

## What It Is
A 30-platform social trend monitoring system that tracks AI agents, pharma, trade, and tech across Twitter, Reddit, YouTube, GitHub, Bilibili, Weibo, Zhihu, LinkedIn, and 20+ more platforms.

## StudEx Use Cases
- **AI Agent trends** → Track what Tencent/ByteDance/MiniMax are building
- **Africa pharma** → Monitor drug shortages, government tenders, trade shows
- **Russia trade** → SA-Russia trade week intelligence, sanctions updates
- **China tech** → Kimi AI releases, DeepSeek updates, ByteDance moves
- **Competitor intel** → Other African pharma distributors

## Monitored Platforms (30)
**West**: Twitter/X, Reddit, YouTube, GitHub, LinkedIn, TikTok, Instagram
**China**: Bilibili, XiaoHongShu, Weibo, Zhihu, Douyin, WeChat
**Russia**: Telegram, VK, Yandex
**Africa**: Nairaland (Nigeria), TechCabal, Business Daily Africa, Citizen
**Finance**: Bloomberg, Reuters, FT, Al Jazeera
**Academic**: arXiv, PubMed, SSRN

## Valley OS Integration
Cron job: every 6 hours → Research Agent runs last30days scan
- Outputs: trend report + sentiment score + top 10 stories
- Feeds into: /research-hub page + ADAM SMASHER daily brief

## StudEx Agent Memory
- Memory: `memory/supermemory/memory.ts` — already integrated
- Supermemory AI API: https://api.supermermory.ai/developers
- `MEMORY_API_KEY` env var required

## Status
✅ Active — embedded in Valley OS cron system
