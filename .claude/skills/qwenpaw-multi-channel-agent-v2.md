# QwenPaw v2.0 — Multi-Channel Agent Skill

**Version:** 2.0  
**Foundation:** [Qwen-Agent](https://github.com/Qwen/Qwen-Agent)  
**Channels:** Lark, Slack, Discord, Telegram, WeChat Work, DingTalk, QQ, iMessage  
**Installation:** `pip install qwen-agent` or Docker deployment

---

## Overview

QwenPaw is a multi-channel AI agent built on Qwen-Agent framework, designed to handle communications across major platforms in China, Russia, and Western markets. Supports Chinese, Russian, and English with intelligent routing.

---

## Channel Integrations

### Lark (Feishu) — Primary China/Russia Channel

```yaml
lark:
  enabled: true
  connection_type: "websocket"
  base_url: "https://open.feishu.cn"
  
credentials:
  app_id: "${LARK_APP_ID}"
  app_secret: "${LARK_APP_SECRET}"
  
capabilities:
  message_types:
    - text
    - image
    - file
    - audio
    - post (rich text)
    - interactive (cards)
    
language_support:
  - chinese_simplified
  - chinese_traditional
  - russian
  - english
  
features:
  - message_mentions
  - thread_replies
  - group_management
  - channel_creation
  - webhook_events
```

**Setup:**
1. Create app at https://open.feishu.cn/open-apis/bot/v3
2. Enable WebSocket long connection mode
3. Configure message permissions
4. Set up event subscriptions

### Slack — Western Market

```yaml
slack:
  enabled: true
  connection_type: "socket_mode"
  
credentials:
  bot_token: "xoxb-..."
  app_token: "xapp-..."
  workspace_url: "${SLACK_WORKSPACE_URL}"
  
intents:
  - GUILD_MESSAGES
  - DIRECT_MESSAGES
  - MESSAGE_CONTENT
  
features:
  - slash_commands
  - modal_dialogs
  - workflow_steps
  - scheduled_messages
```

**Setup:**
1. Create Slack App at api.slack.com
2. Enable Socket Mode
3. Subscribe to events
4. Configure OAuth scopes

### Discord — Community & Dev

```yaml
discord:
  enabled: true
  connection_type: "gateway"
  
credentials:
  bot_token: "${DISCORD_BOT_TOKEN}"
  
intents:
  - GUILD_MESSAGES
  - DIRECT_MESSAGES
  - GUILD_MEMBERS
  
features:
  - slash_commands
  - button_interactions
  - select_menus
  - thread_management
```

### Telegram — Mobile-First

```yaml
telegram:
  enabled: true
  connection_type: "long_polling"
  
credentials:
  bot_token: "${TELEGRAM_BOT_TOKEN}"
  
features:
  - commands
  - inline_queries
  - callback_queries
  - group_management
```

### WeChat Work — Enterprise China

```yaml
wechat_work:
  enabled: true
  connection_type: "webhook"
  
credentials:
  corp_id: "${WECOM_CORP_ID}"
  corp_secret: "${WECOM_CORP_SECRET}"
  agent_id: "${WECOM_AGENT_ID}"
  
features:
  - text_messages
  - markdown
  - media_upload
  - menu_buttons
```

### DingTalk — Alibaba Ecosystem

```yaml
dingtalk:
  enabled: true
  connection_type: "stream"
  
credentials:
  app_key: "${DINGTALK_APP_KEY}"
  app_secret: "${DINGTALK_APP_SECRET}"
  
features:
  - text
  - markdown
  - cards
  - voice
```

### QQ — Consumer China

```yaml
qq:
  enabled: true
  connection_type: "onebot_v11"
  
credentials:
  adapter: "正向WS"
  ws_url: "ws://localhost:3001"
  
features:
  - private_messages
  - group_messages
  - cq_code_support
```

### iMessage — Apple Ecosystem

```yaml
imessage:
  enabled: true
  connection_type: "icloud_webhook"
  
credentials:
  apple_id: "${APPLE_ID}"
  icloud_token: "${ICLOUD_TOKEN}"
  
features:
  - text_messages
  - attachments
  - apple_pay_integration
```

---

## Agent Routing Architecture

```
Incoming Message
       ↓
Language Detection
  ├── Chinese (zh) → Qwen-Agent-CN model
  ├── Russian (ru) → Qwen-Agent-RU model
  └── English (en) → Qwen-Agent-EN model
       ↓
Channel Routing
  ├── Lark → LarkHandler (native SDK)
  ├── Slack → SlackHandler (RTM/Socket Mode)
  ├── Discord → DiscordHandler (Gateway)
  ├── Telegram → TelegramHandler (Long Polling)
  ├── WeChat → WeChatHandler (Webhook)
  ├── DingTalk → DingTalkHandler (Stream)
  ├── QQ → QQHandler (OneBot)
  └── iMessage → iMessageHandler (iCloud)
       ↓
Skill Matching
  ├── research → ResearchSkill
  ├── translate → TranslationSkill
  ├── summarize → SummarySkill
  └── draft_response → DraftSkill
       ↓
Response Generation
       ↓
Channel-Specific Formatting
       ↓
Delivery
```

### Language Detection Rules

```python
detection_rules:
  chinese_threshold: 0.3  # % of Chinese characters
  russian_threshold: 0.3  # % of Cyrillic characters
  default: "english"
  
model_mapping:
  chinese: "Qwen/Qwen2-72B-Chat"
  russian: "Qwen/Qwen2-72B-Chat-Ru"
  english: "Qwen/Qwen2-72B-Chat"
```

---

## Skills Matrix

| Skill | Lark | Slack | Discord | Telegram | WeChat | DingTalk | QQ | iMessage |
|-------|------|-------|---------|----------|--------|----------|-----|----------|
| research | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| translate | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| summarize | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| draft_response | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| image_analysis | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| file_processing | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Storage — Obsidian Vault Compatible

### Brain File Structure

```json
{
  "brain_version": "2.0",
  "agent_id": "qwenpaw_main",
  "last_updated": "2026-07-05T21:00:00Z",
  "vault_path": "/obsidian/qwenpaw-brain",
  
  "persona": {
    "name": "QwenPaw",
    "role": "Multi-Channel AI Assistant",
    "languages": ["zh", "ru", "en"],
    "personality": "helpful, multilingual, culturally aware"
  },
  
  "context": {
    "active_conversations": [...],
    "pending_tasks": [...],
    "recent_interactions": [...]
  },
  
  "skills": {
    "research": { "enabled": true, "last_used": "..." },
    "translate": { "enabled": true, "last_used": "..." },
    "summarize": { "enabled": true, "last_used": "..." },
    "draft_response": { "enabled": true, "last_used": "..." }
  },
  
  "channel_states": {
    "lark": { "connected": true, "last_sync": "..." },
    "slack": { "connected": true, "last_sync": "..." },
    "discord": { "connected": true, "last_sync": "..." }
  }
}
```

### Vault Sync

```yaml
obsidian_sync:
  enabled: true
  vault_path: "/obsidian/qwenpaw-brain"
  sync_interval: 300  # seconds
  
auto_backup:
  enabled: true
  backup_path: "/obsidian/backups/qwenpaw"
  retention_days: 30
```

---

## Deployment Options

### Option 1: Docker on Orgo VM

```dockerfile
FROM python:3.11-slim

WORKDIR /app

RUN pip install qwen-agent cashclaw-connector

COPY qwenpaw/ ./qwenpaw/
COPY config.yaml ./

CMD ["python", "-m", "qwenpaw.main"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  qwenpaw:
    build: .
    ports:
      - "8000:8000"
    environment:
      - LARK_APP_ID=${LARK_APP_ID}
      - LARK_APP_SECRET=${LARK_APP_SECRET}
      - DISCORD_BOT_TOKEN=${DISCORD_BOT_TOKEN}
      - SLACK_BOT_TOKEN=${SLACK_BOT_TOKEN}
    volumes:
      - ./brain:/app/brain
    restart: unless-stopped
```

### Option 2: Railway Deployment

```yaml
# railway.json
{
  "build": {
    "builder": "DOCKERFILE"
  },
  "deploy": {
    "numReplicas": 2,
    "healthCheckPath": "/health"
  }
}
```

### Option 3: pip install

```bash
pip install qwen-agent
pip install cashclaw-connector

# Configure
qwenpaw init --config /path/to/config.yaml
qwenpaw start --channels lark,discord,slack
```

---

## Configuration File

```yaml
# config.yaml
qwenpaw:
  version: "2.0"
  log_level: "INFO"
  
agent:
  model: "Qwen/Qwen2-72B-Chat"
  temperature: 0.7
  max_tokens: 4096
  
channels:
  lark:
    enabled: true
    app_id: "${LARK_APP_ID}"
    app_secret: "${LARK_APP_SECRET}"
    websocket: true
    
  slack:
    enabled: true
    bot_token: "${SLACK_BOT_TOKEN}"
    socket_mode: true
    
  discord:
    enabled: true
    bot_token: "${DISCORD_BOT_TOKEN}"
    
  telegram:
    enabled: false
    bot_token: "${TELEGRAM_BOT_TOKEN}"
    
  wechat_work:
    enabled: false
    corp_id: "${WECOM_CORP_ID}"
    
  dingtalk:
    enabled: false
    app_key: "${DINGTALK_APP_KEY}"
    
  qq:
    enabled: false
    ws_url: "ws://localhost:3001"
    
  imessage:
    enabled: false

brain:
  storage_type: "obsidian"
  vault_path: "/obsidian/qwenpaw-brain"
  auto_sync: true
  
skills:
  research:
    enabled: true
    search_api: "serpapi"
    
  translate:
    enabled: true
    default_target: "en"
    
  summarize:
    enabled: true
    max_length: 500
    
  draft_response:
    enabled: true
    tone: "professional"
```

---

## Quick Start

```bash
# Install
pip install qwen-agent cashclaw-connector

# Initialize
qwenpaw init --name "QwenPaw Main" --channels lark,discord,slack

# Configure credentials
qwenpaw config set lark.app_id YOUR_APP_ID
qwenpaw config set lark.app_secret YOUR_APP_SECRET

# Start agent
qwenpaw start --detach

# Test
qwenpaw test --channel lark --message "你好"
qwenpaw test --channel discord --message "Hello"
```

---

## Monitoring

### Health Checks

```bash
# Check status
qwenpaw status

# View logs
qwenpaw logs --follow

# Channel health
qwenpaw health --all
```

### Metrics

- Message throughput per channel
- Response latency
- Token usage
- Error rates
- Skill usage distribution

---

**QwenPaw v2.0 — Multi-Channel Intelligence**  
*Powered by Qwen-Agent • Studex Valley OS*
