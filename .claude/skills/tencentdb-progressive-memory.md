# TencentDB Progressive Memory v1.0

**Version:** 1.0  
**Architecture:** 4-Tier Memory System  
**Token Reduction:** 61% via intelligent summarization  
**Integration:** Discord, Slack, Obsidian, QwenPaw

---

## Overview

The TencentDB Progressive Memory system implements a biologically-inspired memory hierarchy that reduces token usage by 61% while maintaining comprehensive context awareness across distributed AI agents.

---

## 4-Tier Architecture

### Tier 1: Working Memory (WM)

**Purpose:** Active conversation context, immediate recall  
**Duration:** Current session  
**Capacity:** 4,096 tokens  
**Implementation:** In-context buffer

```yaml
working_memory:
  max_tokens: 4096
  eviction_policy: "lru"
  priority_weights:
    recency: 0.4
    relevance: 0.3
    frequency: 0.3
    
api_call:
  endpoint: "/api/memory/working"
  method: "GET/POST"
  payload:
    agent_id: string
    operation: "read" | "write" | "evict"
    content: string
    priority: float
```

### Tier 2: Episodic Buffer (EB)

**Purpose:** Recent events, session summaries  
**Duration:** 7 days rolling window  
**Capacity:** 32,768 tokens  
**Implementation:** Summarized event stores

```yaml
episodic_buffer:
  max_tokens: 32768
  retention_days: 7
  summarization_trigger: 0.80  # 80% capacity triggers compression
  compression_ratio: 0.25
  
api_call:
  endpoint: "/api/memory/episodic"
  method: "GET/POST/DELETE"
  payload:
    agent_id: string
    episode_id: string
    events: Event[]
    summary: string
    expires_at: timestamp
    
event_structure:
  timestamp: ISO8601
  channel: string
  participants: string[]
  key_outcomes: string[]
  emotional_tone: string
```

### Tier 3: Semantic Memory (SM)

**Purpose:** Knowledge, facts, learned concepts  
**Duration:** Persistent until forgotten  
**Capacity:** Unlimited  
**Implementation:** Structured knowledge graph

```yaml
semantic_memory:
  storage_type: "knowledge_graph"
  vector_dimensions: 1536
  similarity_threshold: 0.85
  forget_schedule:
    weak_connections: 30  # days
    medium_connections: 90
    strong_connections: 365
    
api_call:
  endpoint: "/api/memory/semantic"
  method: "GET/POST/PUT/DELETE"
  payload:
    agent_id: string
    concept_id: string
    concept_data:
      name: string
      description: string
      relationships: Relationship[]
      confidence: float
    vector_embedding: float[]
    
query_types:
  - "retrieve_concepts"
  - "find_related"
  - "update_relationship"
  - "forget_concept"
```

### Tier 4: Procedural Memory (PM)

**Purpose:** Skills, workflows, behavioral patterns  
**Duration:** Persistent, learned over time  
**Capacity:** Unlimited  
**Implementation:** Skill libraries and workflow templates

```yaml
procedural_memory:
  storage_type: "structured_templates"
  skill_library_path: "/skills"
  workflow_path: "/workflows"
  
api_call:
  endpoint: "/api/memory/procedural"
  method: "GET/POST/PUT"
  payload:
    agent_id: string
    skill_id: string
    skill_data:
      name: string
      trigger_conditions: string[]
      steps: Step[]
      success_rate: float
      last_used: timestamp
      
skill_structure:
  name: string
  description: string
  trigger_keywords: string[]
  steps: Array<{
    action: string
    tool: string
    parameters: object
    expected_output: string
  }>
  fallback: string
```

---

## Token Reduction Strategy

### 61% Token Savings Breakdown

| Technique | Token Savings | Mechanism |
|-----------|---------------|-----------|
| Summarization | 35% | Episodic compression |
| Key Fact Extraction | 15% | Entity filtering |
| Forget Schedule | 8% | Weak memory pruning |
| Priority Caching | 3% | LRU with relevance |

### Implementation

```yaml
token_reduction:
  enabled: true
  target_savings: 0.61
  
  techniques:
    summarization:
      trigger_threshold: 0.80
      compression_ratio: 0.25
      preserve_entities: true
      preserve_sentiment: true
      
    fact_extraction:
      extract_types:
        - people
        - organizations
        - locations
        - dates
        - monetary_values
      discard_types:
        - filler_words
        - repeated_phrases
        - off_topic
        
    forget_schedule:
      enabled: true
      check_interval: 86400  # daily
      weak_threshold: 0.3
      forget_action: "archive"  # or "delete"
```

---

## Integration Points

### Discord Bot Brain

```yaml
discord_integration:
  enabled: true
  brain_file: "/brain/discord-brain.json"
  sync_mode: "realtime"
  
memory_usage:
  working_memory: "4MB"
  episodic_buffer: "16MB"
  semantic_memory: "128MB"
  procedural_memory: "64MB"
  
commands:
  - "brain status"
  - "brain recall <topic>"
  - "brain forget <topic>"
  - "brain learn <skill>"
```

### Slack Agent Memory

```yaml
slack_integration:
  enabled: true
  workspace_brain: "/brain/slack-brain.json"
  channel_memories:
    enabled: true
    per_channel_context: true
    
memory_sync:
  interval: 300  # 5 minutes
  on_mention: true
  on_direct_message: true
```

### Obsidian Sync

```yaml
obsidian_integration:
  enabled: true
  vault_path: "/obsidian/studex-memory"
  auto_sync: true
  sync_interval: 600  # 10 minutes
  
file_structure:
  working_memory: "memory/01-working/daily/"
  episodic_buffer: "memory/02-episodic/"
  semantic_memory: "memory/03-semantic/knowledge/"
  procedural_memory: "memory/04-procedural/skills/"
  
auto_backup:
  enabled: true
  backup_path: "/obsidian/backups/memory"
  retention_days: 30
```

### QwenPaw Multi-Channel

```yaml
qwenpaw_integration:
  enabled: true
  shared_brain: true
  per_channel_memory: false
  
memory_routing:
  lark: "China/Russia context"
  slack: "Western market context"
  discord: "Community context"
  telegram: "Mobile context"
```

---

## Configuration

```yaml
# memory_config.yaml
tencentdb_memory:
  version: "1.0"
  
storage:
  provider: "tencentdb"  # or "local", "redis"
  connection_string: "${TENCENTDB_CONNECTION}"
  fallback: "local_json"
  
paths:
  memory_dir: "/brain"
  backup_dir: "/brain/backups"
  temp_dir: "/brain/tmp"
  
limits:
  max_tokens_per_context: 8192
  summarization_trigger: 0.80  # 80% capacity
  forget_days: 30
  max_episodes: 1000
  
tier_configs:
  working_memory:
    max_tokens: 4096
    eviction_policy: "lru"
    
  episodic_buffer:
    max_tokens: 32768
    retention_days: 7
    compression_ratio: 0.25
    
  semantic_memory:
    vector_dimensions: 1536
    similarity_threshold: 0.85
    forget_weak_connections_after_days: 30
    
  procedural_memory:
    max_skills: 500
    max_workflows: 200
    
optimization:
  token_reduction_target: 0.61
  auto_cleanup: true
  compress_old_episodes: true
```

---

## API Reference

### Working Memory API

```bash
# Write to working memory
POST /api/memory/working
{
  "agent_id": "adam_smasher",
  "content": "User asking about China trade partnership",
  "priority": 0.9,
  "ttl": 3600
}

# Read working memory
GET /api/memory/working?agent_id=adam_smasher

# Evict oldest
DELETE /api/memory/working?agent_id=adam_smasher&count=5
```

### Episodic Buffer API

```bash
# Store episode
POST /api/memory/episodic
{
  "agent_id": "qwenpaw",
  "episode": {
    "timestamp": "2026-07-05T21:00:00Z",
    "channel": "lark",
    "events": [...],
    "summary": "Discussed China market expansion...",
    "key_outcomes": ["Contract signed", "Follow-up scheduled"]
  }
}

# Query episodes
GET /api/memory/episodic?agent_id=qwenpaw&since=2026-07-01

# Trigger summarization
POST /api/memory/episodic/summarize
{
  "agent_id": "qwenpaw",
  "trigger": "capacity_threshold"
}
```

### Semantic Memory API

```bash
# Store concept
POST /api/memory/semantic
{
  "agent_id": "adam_smasher",
  "concept": {
    "name": "SA-Russia Trade Corridor",
    "description": "Bilateral trade framework...",
    "relationships": [...],
    "confidence": 0.95
  }
}

# Find related concepts
GET /api/memory/semantic/related?agent_id=adam_smasher&concept=trade

# Update relationship
PUT /api/memory/semantic/relationship
{
  "agent_id": "adam_smasher",
  "from_concept": "SA-Russia Trade",
  "to_concept": "BRICS Membership",
  "relationship_type": "related_to",
  "strength": 0.8
}
```

### Procedural Memory API

```bash
# Store skill
POST /api/memory/procedural/skill
{
  "agent_id": "qwenpaw",
  "skill": {
    "name": "Market Research Pipeline",
    "trigger_keywords": ["research", "market", "analyze"],
    "steps": [...],
    "success_rate": 0.92
  }
}

# List skills
GET /api/memory/procedural/skills?agent_id=qwenpaw&category=research

# Update skill usage
PUT /api/memory/procedural/skill/usage
{
  "agent_id": "qwenpaw",
  "skill_id": "market_research_001",
  "success": true
}
```

---

## Memory Sync Protocol

```yaml
sync_protocol:
  enabled: true
  interval_seconds: 300
  
  conflict_resolution: "latest_wins"
  compression: true
  
  sync_targets:
    - id: "discord-brain"
      type: "discord"
      priority: 1
      
    - id: "slack-brain"
      type: "slack"
      priority: 2
      
    - id: "obsidian-vault"
      type: "obsidian"
      priority: 3
```

---

## Monitoring & Metrics

```bash
# Memory status
memory-cli status --agent qwenpaw

# Output:
# Working Memory: 2.4MB / 4MB (60%)
# Episodic Buffer: 12MB / 32MB (37%)
# Semantic Memory: 89 concepts, 256 relationships
# Procedural Memory: 23 skills, 8 workflows
# Token Savings: 61.2%

# Force cleanup
memory-cli cleanup --agent qwenpaw --tier episodic

# View forgetting queue
memory-cli forget-queue --agent qwenpaw
```

---

## Quick Start

```bash
# Install
pip install tencentdb-memory

# Initialize
memory-cli init --agent qwenpaw --config memory_config.yaml

# Start memory service
memory-cli serve --port 8080

# Connect to Discord
memory-cli connect discord --token $DISCORD_BOT_TOKEN

# Connect to Slack
memory-cli connect slack --token $SLACK_BOT_TOKEN
```

---

**TencentDB Progressive Memory v1.0**  
*61% Token Reduction • 4-Tier Architecture • Studex Valley OS*
