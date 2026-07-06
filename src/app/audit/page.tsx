'use client';

import { useState, useEffect } from 'react';

interface AuditEntry {
  id: string;
  timestamp: string;
  correlationId: string;
  actor: string;
  actorType: 'agent' | 'system' | 'user';
  event: string;
  eventType: 'tool' | 'route' | 'safety' | 'cron' | 'memory' | 'comms' | 'decision';
  detail: string;
  region?: 'russia' | 'africa' | 'china' | 'global';
}

const AUDIT_DATA: AuditEntry[] = [
  { id: '1', timestamp: '2026-07-06 11:42:18', correlationId: 'c-a7f3b', actor: 'Wei Chen', actorType: 'agent', event: 'tool.execute', eventType: 'tool', detail: 'Submitted Shenzhen AI lab due diligence report to executive review queue', region: 'china' },
  { id: '2', timestamp: '2026-07-06 11:35:22', correlationId: 'c-a7f3b', actor: 'Wei Chen', actorType: 'agent', event: 'task.complete', eventType: 'tool', detail: 'Completed tech transfer discussion preparation for Beijing Tech Corp', region: 'china' },
  { id: '3', timestamp: '2026-07-06 11:30:00', correlationId: 'c-91bd2', actor: 'Lin Mei', actorType: 'agent', event: 'contract.analyze', eventType: 'tool', detail: 'Flagged 5 concerns in Beijing Tech Corp technology transfer clauses', region: 'china' },
  { id: '4', timestamp: '2026-07-06 11:00:15', correlationId: 'c-91bd2', actor: 'Lin Mei', actorType: 'agent', event: 'tool.execute', eventType: 'tool', detail: 'Generated contract comparison analysis against standard IP terms', region: 'china' },
  { id: '5', timestamp: '2026-07-06 10:30:45', correlationId: 'c-b4e12', actor: 'system', actorType: 'system', event: 'decision.log', eventType: 'decision', detail: 'DECISION: Schedule Thursday call for Beijing Tech contract renegotiation', region: 'global' },
  { id: '6', timestamp: '2026-07-06 10:25:33', correlationId: 'c-c2f88', actor: 'Thabo Mokoena', actorType: 'agent', event: 'tool.execute', eventType: 'tool', detail: 'Submitted JHB Pharma Expo booth design mockups for brand approval', region: 'africa' },
  { id: '7', timestamp: '2026-07-06 10:20:00', correlationId: 'c-d1a34', actor: 'Amara Diallo', actorType: 'agent', event: 'task.complete', eventType: 'tool', detail: 'Closed Lagos distributor partnership meeting with positive outcome', region: 'africa' },
  { id: '8', timestamp: '2026-07-06 10:15:12', correlationId: 'c-d1a34', actor: 'Amara Diallo', actorType: 'agent', event: 'comms.send', eventType: 'comms', detail: 'Shared draft MoU with Lagos distributor legal team via Slack', region: 'africa' },
  { id: '9', timestamp: '2026-07-06 10:00:00', correlationId: 'c-b4e12', actor: 'system', actorType: 'system', event: 'decision.log', eventType: 'decision', detail: 'DECISION: Approve exclusive 3-year agreement with Lagos distributor', region: 'africa' },
  { id: '10', timestamp: '2026-07-06 09:45:00', correlationId: 'c-e5c76', actor: 'Viktor Petrov', actorType: 'agent', event: 'tool.execute', eventType: 'tool', detail: 'Processed Pharmstandard inquiry - forwarded to review queue', region: 'russia' },
  { id: '11', timestamp: '2026-07-06 09:30:00', correlationId: 'c-f2d89', actor: 'Elena Sokolova', actorType: 'agent', event: 'task.start', eventType: 'tool', detail: 'Started Moscow pharma tour briefing deck preparation', region: 'russia' },
  { id: '12', timestamp: '2026-07-06 09:15:00', correlationId: 'c-f2d89', actor: 'system', actorType: 'system', event: 'decision.log', eventType: 'decision', detail: 'DECISION: Proceed with September 15-22 Moscow tour dates', region: 'russia' },
  { id: '13', timestamp: '2026-07-06 08:00:00', correlationId: 'c-g3h01', actor: 'system', actorType: 'system', event: 'cron.fire', eventType: 'cron', detail: 'Daily standup digest sent to all agents via internal comms', region: 'global' },
  { id: '14', timestamp: '2026-07-06 07:30:00', correlationId: 'c-h4i12', actor: 'system', actorType: 'system', event: 'cron.fire', eventType: 'cron', detail: 'Weekly exchange newsletter dispatched via Telegram', region: 'global' },
  { id: '15', timestamp: '2026-07-06 07:00:00', correlationId: 'c-j5k23', actor: 'Viktor Petrov', actorType: 'agent', event: 'cron.fire', eventType: 'cron', detail: 'Russia Tour Prep task executed - briefing materials compiled', region: 'russia' },
  { id: '16', timestamp: '2026-07-06 06:00:00', correlationId: 'c-l6m34', actor: 'system', actorType: 'system', event: 'memory.reindex', eventType: 'memory', detail: 'Nightly semantic re-index completed - 3,412 embeddings updated', region: 'global' },
  { id: '17', timestamp: '2026-07-06 02:00:00', correlationId: 'c-m7n45', actor: 'system', actorType: 'system', event: 'vault.sync', eventType: 'memory', detail: 'Obsidian vault synchronized - 127 new entries processed', region: 'global' },
  { id: '18', timestamp: '2026-07-05 17:00:00', correlationId: 'c-n8o56', actor: 'system', actorType: 'system', event: 'killswitch.check', eventType: 'safety', detail: 'Safety audit passed - all kill switches operational', region: 'global' },
  { id: '19', timestamp: '2026-07-05 15:30:00', correlationId: 'c-p9q67', actor: 'system', actorType: 'system', event: 'decision.log', eventType: 'decision', detail: 'DECISION: Prioritize JHB Pharma Expo booth design over social content', region: 'africa' },
  { id: '20', timestamp: '2026-07-05 14:00:00', correlationId: 'c-r0s78', actor: 'system', actorType: 'system', event: 'decision.log', eventType: 'decision', detail: 'DECISION: Include St. Petersburg as optional extension (Sept 23-25)', region: 'russia' },
];

const EVENT_COLORS = {
  tool: '#818CF8',
  route: '#D97706',
  safety: '#ef4444',
  cron: '#5bf4a6',
  memory: '#06B6D4',
  comms: '#EC4899',
  decision: '#ff2ec4',
};

const ACTOR_COLORS = {
  agent: '#F1F5F9',
  system: '#94A3B8',
  user: '#5bf4a6',
};

export default function AuditPage() {
  const [filterType, setFilterType] = useState<'all' | EventType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState<'all' | 'today' | 'week'>('today');
  type EventType = 'tool' | 'route' | 'safety' | 'cron' | 'memory' | 'comms' | 'decision';
  
  const filteredEntries = AUDIT_DATA.filter(entry => {
    const matchesType = filterType === 'all' || entry.eventType === filterType;
    const matchesSearch = searchQuery === '' || 
      entry.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.event.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (timeRange === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return matchesType && matchesSearch && entry.timestamp.startsWith(today);
    }
    if (timeRange === 'week') {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      return matchesType && matchesSearch && entry.timestamp >= weekAgo;
    }
    return matchesType && matchesSearch;
  });

  const stats = {
    total: AUDIT_DATA.length,
    today: AUDIT_DATA.filter(e => e.timestamp.startsWith(new Date().toISOString().split('T')[0])).length,
    safety: AUDIT_DATA.filter(e => e.eventType === 'safety').length,
    decisions: AUDIT_DATA.filter(e => e.eventType === 'decision').length,
  };

  return (
    <div style={{ 
      fontFamily: '"DM Sans", sans-serif',
      background: '#0F172A',
      minHeight: '100vh',
      color: '#E2E8F0',
      padding: '24px',
      position: 'relative'
    }}>
      {/* Matrix Rain Background */}
      <MatrixRainBackground />

      {/* Header */}
      <div style={{ 
        marginBottom: '32px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px',
          marginBottom: '8px'
        }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 700, 
            color: '#5bf4a6',
            margin: 0,
            textShadow: '0 0 20px rgba(91, 244, 166, 0.5)'
          }}>
            AUDIT LOG
          </h1>
          <span style={{ 
            background: '#5bf4a6',
            color: '#0F172A',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600
          }}>
            APPEND-ONLY
          </span>
        </div>
        <p style={{ 
          color: '#94A3B8', 
          fontSize: '14px',
          margin: 0
        }}>
          Append-only activity trail. 90-day retention. Correlation IDs group one user turn.
        </p>
      </div>

      {/* Compliance Banner */}
      <div style={{ 
        background: 'rgba(91, 244, 166, 0.1)',
        border: '1px solid rgba(91, 244, 166, 0.3)',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        position: 'relative',
        zIndex: 10
      }}>
        <span style={{ fontSize: '24px' }}>🛡️</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#5bf4a6' }}>
            Compliance Status: OPERATIONAL
          </div>
          <div style={{ fontSize: '12px', color: '#94A3B8' }}>
            All actions are logged immutably. Safety audits passing. Kill switches verified.
          </div>
        </div>
        <div style={{
          padding: '6px 12px',
          background: 'rgba(91, 244, 166, 0.2)',
          borderRadius: '6px',
          fontSize: '11px',
          fontWeight: 600,
          color: '#5bf4a6'
        }}>
          Last audit: 2 hours ago
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '16px',
        marginBottom: '24px',
        position: 'relative',
        zIndex: 10
      }}>
        <StatCard label="Total Entries" value={stats.total.toString()} color="#818CF8" />
        <StatCard label="Today" value={stats.today.toString()} color="#5bf4a6" />
        <StatCard label="Safety Checks" value={stats.safety.toString()} color="#ef4444" />
        <StatCard label="Decisions" value={stats.decisions.toString()} color="#ff2ec4" />
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Time Range */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['today', 'week', 'all'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              style={{
                padding: '8px 16px',
                background: timeRange === range ? '#334155' : 'transparent',
                border: `1px solid ${timeRange === range ? '#5bf4a6' : '#334155'}`,
                borderRadius: '6px',
                color: timeRange === range ? '#5bf4a6' : '#94A3B8',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '12px',
                transition: 'all 0.2s'
              }}
            >
              {range === 'today' ? 'Today' : range === 'week' ? 'This Week' : 'All Time'}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search logs..."
          style={{
            background: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '8px',
            padding: '10px 16px',
            color: '#F1F5F9',
            fontSize: '13px',
            fontFamily: '"DM Sans", sans-serif',
            outline: 'none',
            width: '250px'
          }}
        />
      </div>

      {/* Event Type Filter */}
      <div style={{ 
        display: 'flex', 
        gap: '8px',
        flexWrap: 'wrap',
        marginBottom: '24px',
        position: 'relative',
        zIndex: 10
      }}>
        <button
          onClick={() => setFilterType('all')}
          style={{
            padding: '6px 14px',
            background: filterType === 'all' ? '#5bf4a6' : 'transparent',
            border: `1px solid ${filterType === 'all' ? '#5bf4a6' : '#334155'}`,
            borderRadius: '20px',
            color: filterType === 'all' ? '#0F172A' : '#94A3B8',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '11px',
            transition: 'all 0.2s'
          }}
        >
          All Events
        </button>
        {Object.entries(EVENT_COLORS).map(([type, color]) => (
          <button
            key={type}
            onClick={() => setFilterType(type as EventType)}
            style={{
              padding: '6px 14px',
              background: filterType === type ? color : 'transparent',
              border: `1px solid ${filterType === type ? color : '#334155'}`,
              borderRadius: '20px',
              color: filterType === type ? '#0F172A' : color,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '11px',
              transition: 'all 0.2s',
              textTransform: 'uppercase'
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Audit Table */}
      <div style={{ 
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid #334155',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '180px 100px 140px 150px 1fr',
            gap: '16px',
            padding: '14px 20px',
            background: 'rgba(15, 23, 42, 0.5)',
            borderBottom: '1px solid #334155',
            fontSize: '11px',
            fontWeight: 600,
            color: '#64748B',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            <div>Timestamp</div>
            <div>Correlation ID</div>
            <div>Actor</div>
            <div>Event</div>
            <div>Detail</div>
          </div>

          {/* Table Rows */}
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {filteredEntries.map((entry, index) => (
              <AuditRow key={entry.id} entry={entry} isLast={index === filteredEntries.length - 1} />
            ))}
          </div>
        </div>

        {/* Entry Count */}
        <div style={{ 
          marginTop: '12px',
          fontSize: '12px',
          color: '#64748B',
          textAlign: 'right'
        }}>
          Showing {filteredEntries.length} of {AUDIT_DATA.length} entries
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #1E293B; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
      `}</style>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.8)',
      border: `1px solid ${color}40`,
      borderRadius: '12px',
      padding: '16px 20px',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ 
        fontSize: '24px', 
        fontWeight: 700, 
        color,
        textShadow: `0 0 15px ${color}50`
      }}>
        {value}
      </div>
      <div style={{ 
        fontSize: '11px', 
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginTop: '4px'
      }}>
        {label}
      </div>
    </div>
  );
}

function AuditRow({ entry, isLast }: { entry: AuditEntry; isLast: boolean }) {
  const eventColor = EVENT_COLORS[entry.eventType];
  const actorColor = ACTOR_COLORS[entry.actorType];
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '180px 100px 140px 150px 1fr',
      gap: '16px',
      padding: '14px 20px',
      borderBottom: isLast ? 'none' : '1px solid #1E293B',
      fontSize: '12px',
      transition: 'background 0.15s'
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(51, 65, 85, 0.3)'}
    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
      {/* Timestamp */}
      <div style={{ 
        color: '#64748B',
        fontFamily: 'monospace',
        fontSize: '11px'
      }}>
        {entry.timestamp.split(' ')[1]}
        <div style={{ color: '#475569', fontSize: '10px' }}>
          {entry.timestamp.split(' ')[0]}
        </div>
      </div>

      {/* Correlation ID */}
      <div style={{ 
        color: '#94A3B8',
        fontFamily: 'monospace',
        fontSize: '11px'
      }}>
        {entry.correlationId}
      </div>

      {/* Actor */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: actorColor
        }} />
        <span style={{ color: actorColor, fontWeight: 500 }}>
          {entry.actor}
        </span>
      </div>

      {/* Event */}
      <div>
        <div style={{
          display: 'inline-block',
          padding: '3px 8px',
          background: `${eventColor}20`,
          border: `1px solid ${eventColor}40`,
          borderRadius: '4px',
          fontSize: '10px',
          fontWeight: 600,
          color: eventColor,
          fontFamily: 'monospace'
        }}>
          {entry.event}
        </div>
      </div>

      {/* Detail */}
      <div style={{ color: '#CBD5E1', lineHeight: 1.4 }}>
        {entry.detail}
      </div>
    </div>
  );
}

function MatrixRainBackground() {
  useEffect(() => {
    const canvas = document.getElementById('audit-matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'AUDITLOGIMMU T A BLE🔒';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#5bf4a6';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      id="audit-matrix-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.12
      }}
    />
  );
}
