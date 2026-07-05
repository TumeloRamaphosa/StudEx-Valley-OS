---
name: qwenpaw-multi-channel-agent
description: Multi-channel AI agent platform with native Lark, DingTalk, WeChat, Discord, Telegram, QQ, iMessage support — StudEx's China/Russia/Africa bridge
triggers: ["lark integration", "wechat", "dingtalk", "multi-channel messaging", "chinese platforms", "russia clients", "tencent dingtalk"]
source: share.google/dXr69MqQJab5dhMqX
stars: 20.5k ⭐
language: Python / TypeScript
status: active
---

# QwenPaw — Multi-Channel AI Agent

## What It Is
QwenPaw is an open-source multi-channel AI agent platform that bridges Chinese + Western messaging platforms. It's the core of StudEx's cross-border communication.

## Key Capabilities
- **Native Lark support** — built-in, not a hack
- **DingTalk integration** — Alibaba enterprise chat
- **WeChat Work (WeCom)** — Tencent business platform
- **Discord** — Western dev/community
- **Telegram** — Russian clients
- **QQ** — Chinese youth market
- **iMessage** — Apple ecosystem
- **Group + DM support** — agent-to-agent communication built-in
- **WebSocket mode** — no public URL needed (like Socket Mode)

## Why It Matters for StudEx
- Russia clients → Telegram/Lark
- China partners → WeChat/DingTalk/Lark
- Africa operations → Discord/Slack
- Agent-to-agent → cross-platform message relay
- WebSocket = works behind SA government firewalls

## Deployment Pattern
```bash
# On Orgo VM (agentsnestcloud)
git clone https://github.com/ertugrulakben/QwenPaw.git
cd QwenPaw
pip install -r requirements.txt

# Configure .env with Lark credentials
cp .env.example .env
# LARK_APP_ID=your_app_id
# LARK_APP_SECRET=your_app_secret
# OPENAI_API_KEY=your_key

# Run
python main.py
```

## Lark Setup
1. Create Lark app at open.larksuite.com/app
2. Enable bot + message permissions
3. Get App ID + App Secret
4. Add to QwenPaw .env
5. Install webhooks for events

## StudEx Integration Points
- `/partner-outreach` page uses Lark email via QwenPaw SMTP
- Research agent posts to Lark channels
- Trade Week coordination via Lark groups
- ADAM SMASHER bridges Lark ↔ Discord

## Status
✅ Active — integrated into Valley OS agent registry
📧 SMTP needs configuration to enable email send
🔗 Source: https://github.com/ertugrulakben/QwenPaw
