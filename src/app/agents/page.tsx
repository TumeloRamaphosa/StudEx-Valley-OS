'use client';

import { useState, useEffect } from 'react';

interface Agent {
  id: string;
  name: string;
  alias: string;
  region: 'russia' | 'africa' | 'china';
  vm: string;
  status: 'active' | 'idle' | 'offline';
  skills: string[];
  lastActivity: string;
  tasksCompleted: number;
  currentTask?: string;
}

const AGENTS: Agent[] = [
  {
    id: 'agent-rus-001',
    name: 'Viktor Petrov',
    alias: 'RHP-01',
    region: 'russia',
    vm: 'vm-pharma-moscow-01',
    status: 'active',
    skills: ['Pharma Compliance', 'Regulatory Filing', 'Partner Negotiation', 'Market Analysis'],
    lastActivity: '2 minutes ago',
    tasksCompleted: 847,
    currentTask: 'Processing Pharmstandard inquiry'
  },
  {
    id: 'agent-rus-002',
    name: 'Elena Sokolova',
    alias: 'RHP-02',
    region: 'russia',
    vm: 'vm-pharma-moscow-02',
    status: 'active',
    skills: ['Clinical Trials', 'Documentation', 'Translation', 'Stakeholder Commms'],
    lastActivity: '5 minutes ago',
    tasksCompleted: 623,
    currentTask: 'Preparing tour briefing deck'
  },
  {
    id: 'agent-rus-003',
    name: 'Dmitri Volkov',
    alias: 'RHP-03',
    region: 'russia',
    vm: 'vm-pharma-moscow-03',
    status: 'idle',
    skills: ['Logistics', 'Import/Export', 'Supply Chain', 'Customs Documentation'],
    lastActivity: '18 minutes ago',
    tasksCompleted: 412,
  },
  {
    id: 'agent-afr-001',
    name: 'Amara Diallo',
    alias: 'AFR-01',
    region: 'africa',
    vm: 'vm-africa-expansion-01',
    status: 'active',
    skills: ['Distribution Networks', 'Local Compliance', 'Partnership Development', 'Market Entry'],
    lastActivity: '1 minute ago',
    tasksCompleted: 534,
    currentTask: 'Coordinating Lagos distributor meeting'
  },
  {
    id: 'agent-afr-002',
    name: 'Thabo Mokoena',
    alias: 'AFR-02',
    region: 'africa',
    vm: 'vm-africa-expansion-02',
    status: 'active',
    skills: ['Event Planning', 'Trade Shows', 'Media Relations', 'Regional Partnerships'],
    lastActivity: '4 minutes ago',
    tasksCompleted: 298,
    currentTask: 'JHB Pharma Expo follow-ups'
  },
  {
    id: 'agent-afr-003',
    name: 'Fatima Al-Hassan',
    alias: 'AFR-03',
    region: 'africa',
    vm: 'vm-africa-expansion-03',
    status: 'idle',
    skills: ['Regulatory Affairs', 'FDA Equivalent Filing', 'Quality Assurance', 'Lab Coordination'],
    lastActivity: '32 minutes ago',
    tasksCompleted: 267,
  },
  {
    id: 'agent-chn-001',
    name: 'Wei Chen',
    alias: 'CHN-01',
    region: 'china',
    vm: 'vm-china-liaison-01',
    status: 'active',
    skills: ['AI Partnerships', 'Tech Transfer', 'Cross-border Tech', 'Negotiation'],
    lastActivity: '3 minutes ago',
    tasksCompleted: 445,
    currentTask: 'Syncing with Shenzhen AI lab'
  },
  {
    id: 'agent-chn-002',
    name: 'Lin Mei',
    alias: 'CHN-02',
    region: 'china',
    vm: 'vm-china-liaison-02',
    status: 'idle',
    skills: ['IP Management', 'Contract Review', 'Due Diligence', 'Market Intelligence'],
    lastActivity: '45 minutes ago',
    tasksCompleted: 189,
  },
  {
    id: 'agent-chn-003',
    name: 'Jian Wei',
    alias: 'CHN-03',
    region: 'china',
    vm: 'vm-china-liaison-03',
    status: 'offline',
    skills: ['Manufacturing Liaison', 'Quality Control', 'Factory Audits', 'Sourcing'],
    lastActivity: '2 hours ago',
    tasksCompleted: 156,
  },
];

const REGION_COLORS = {
  russia: '#ff2ec4',
  africa: '#5bf4a6',
  china: '#D97706',
};

const REGION_LABELS = {
  russia: 'Russia Pharma',
  africa: 'Africa Expansion',
  china: 'China Liaison',
};

export default function AgentsPage() {
  const [filter, setFilter] = useState<'all' | 'russia' | 'africa' | 'china'>('all');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const filteredAgents = filter === 'all' 
    ? AGENTS 
    : AGENTS.filter(a => a.region === filter);

  const statusCounts = {
    active: AGENTS.filter(a => a.status === 'active').length,
    idle: AGENTS.filter(a => a.status === 'idle').length,
    offline: AGENTS.filter(a => a.status === 'offline').length,
  };

  return (
    <div style={{ 
      fontFamily: '"DM Sans", sans-serif',
      background: '#0F172A',
      minHeight: '100vh',
      color: '#E2E8F0',
      padding: '24px'
    }}>
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Header */}
      <div style={{ 
        marginBottom: '32px',
        position: 'relative',
        zIndex: 1
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
            color: '#ff2ec4',
            margin: 0,
            textShadow: '0 0 20px rgba(255, 46, 196, 0.5)'
          }}>
            AGENT CONTROL CENTER
          </h1>
          <span style={{ 
            background: '#ff2ec4',
            color: '#0F172A',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600
          }}>
            LIVE
          </span>
        </div>
        <p style={{ 
          color: '#94A3B8', 
          fontSize: '14px',
          margin: 0
        }}>
          Monitor all 9 agents across Russia, Africa, and China operations
        </p>
      </div>

      {/* Stats Row */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '16px',
        marginBottom: '32px',
        position: 'relative',
        zIndex: 1
      }}>
        <StatCard label="Total Agents" value="9" color="#ff2ec4" />
        <StatCard label="Active" value={statusCounts.active.toString()} color="#5bf4a6" />
        <StatCard label="Idle" value={statusCounts.idle.toString()} color="#D97706" />
        <StatCard label="Offline" value={statusCounts.offline.toString()} color="#64748B" />
      </div>

      {/* Filter Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginBottom: '24px',
        position: 'relative',
        zIndex: 1
      }}>
        {(['all', 'russia', 'africa', 'china'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '10px 20px',
              background: filter === f ? REGION_COLORS[f === 'all' ? 'russia' : f] : 'transparent',
              border: `1px solid ${filter === f ? REGION_COLORS[f === 'all' ? 'russia' : f] : '#334155'}`,
              borderRadius: '8px',
              color: filter === f ? '#0F172A' : '#94A3B8',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: '"DM Sans", sans-serif',
              transition: 'all 0.2s'
            }}
          >
            {f === 'all' ? 'All Regions' : REGION_LABELS[f]}
          </button>
        ))}
      </div>

      {/* Agent Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
        gap: '20px',
        position: 'relative',
        zIndex: 1
      }}>
        {filteredAgents.map((agent) => (
          <AgentCard 
            key={agent.id} 
            agent={agent} 
            onClick={() => setSelectedAgent(agent)}
          />
        ))}
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <AgentDetailModal 
          agent={selectedAgent} 
          onClose={() => setSelectedAgent(null)} 
        />
      )}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.8)',
      border: `1px solid ${color}40`,
      borderRadius: '12px',
      padding: '20px',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ 
        fontSize: '32px', 
        fontWeight: 700, 
        color,
        textShadow: `0 0 15px ${color}50`
      }}>
        {value}
      </div>
      <div style={{ 
        fontSize: '12px', 
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

function AgentCard({ agent, onClick }: { agent: Agent; onClick: () => void }) {
  const regionColor = REGION_COLORS[agent.region];
  
  return (
    <div 
      onClick={onClick}
      style={{
        background: 'rgba(15, 23, 42, 0.9)',
        border: `1px solid ${regionColor}40`,
        borderRadius: '16px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = regionColor;
        e.currentTarget.style.boxShadow = `0 0 30px ${regionColor}30`;
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${regionColor}40`;
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Region Indicator */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${regionColor}, transparent)`
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: 600, 
            color: '#F1F5F9',
            marginBottom: '4px'
          }}>
            {agent.name}
          </div>
          <div style={{ 
            fontSize: '12px', 
            color: regionColor,
            fontFamily: 'monospace'
          }}>
            [{agent.alias}]
          </div>
        </div>
        <StatusBadge status={agent.status} />
      </div>

      {/* Current Task */}
      {agent.currentTask && (
        <div style={{
          background: 'rgba(91, 244, 166, 0.1)',
          border: '1px solid rgba(91, 244, 166, 0.3)',
          borderRadius: '8px',
          padding: '10px 12px',
          marginBottom: '16px',
          fontSize: '13px',
          color: '#5bf4a6'
        }}>
          <span style={{ opacity: 0.7 }}>Current: </span>
          {agent.currentTask}
        </div>
      )}

      {/* Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
        {agent.skills.map((skill) => (
          <span 
            key={skill}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid #334155',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '11px',
              color: '#CBD5E1'
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        paddingTop: '12px',
        borderTop: '1px solid #1E293B',
        fontSize: '11px',
        color: '#64748B'
      }}>
        <div>
          <span style={{ color: '#94A3B8' }}>VM: </span>
          <span style={{ fontFamily: 'monospace' }}>{agent.vm}</span>
        </div>
        <div>
          <span style={{ color: '#94A3B8' }}>Last: </span>
          {agent.lastActivity}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: 'active' | 'idle' | 'offline' }) {
  const config = {
    active: { color: '#5bf4a6', label: 'ACTIVE', glow: 'rgba(91, 244, 166, 0.4)' },
    idle: { color: '#D97706', label: 'IDLE', glow: 'rgba(217, 119, 6, 0.4)' },
    offline: { color: '#64748B', label: 'OFFLINE', glow: 'transparent' },
  }[status];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }}>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: config.color,
        boxShadow: status !== 'offline' ? `0 0 10px ${config.glow}` : 'none',
        animation: status === 'active' ? 'pulse 2s infinite' : 'none'
      }} />
      <span style={{ 
        fontSize: '10px', 
        fontWeight: 600, 
        color: config.color,
        letterSpacing: '1px'
      }}>
        {config.label}
      </span>
    </div>
  );
}

function AgentDetailModal({ agent, onClose }: { agent: Agent; onClose: () => void }) {
  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#1E293B',
          border: `1px solid ${REGION_COLORS[agent.region]}`,
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '500px',
          width: '90%',
          boxShadow: `0 0 60px ${REGION_COLORS[agent.region]}30`
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 700, 
            color: REGION_COLORS[agent.region],
            margin: 0
          }}>
            {agent.name}
          </h2>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid #64748B',
              borderRadius: '8px',
              padding: '8px 16px',
              color: '#94A3B8',
              cursor: 'pointer',
              fontFamily: '"DM Sans", sans-serif'
            }}
          >
            Close
          </button>
        </div>

        <DetailRow label="Alias" value={agent.alias} />
        <DetailRow label="Region" value={REGION_LABELS[agent.region]} />
        <DetailRow label="VM" value={agent.vm} mono />
        <DetailRow label="Status" value={agent.status.toUpperCase()} />
        <DetailRow label="Tasks Completed" value={agent.tasksCompleted.toString()} />
        <DetailRow label="Last Activity" value={agent.lastActivity} />

        <div style={{ marginTop: '20px' }}>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase' }}>
            Skills
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {agent.skills.map((skill) => (
              <span key={skill} style={{
                background: 'rgba(255, 46, 196, 0.1)',
                border: '1px solid rgba(255, 46, 196, 0.3)',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '13px',
                color: '#ff2ec4'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: '1px solid #334155',
      fontSize: '14px'
    }}>
      <span style={{ color: '#94A3B8' }}>{label}</span>
      <span style={{ 
        color: '#F1F5F9',
        fontFamily: mono ? 'monospace' : '"DM Sans", sans-serif'
      }}>{value}</span>
    </div>
  );
}

function MatrixRain() {
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()studex';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ff2ec4';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
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
      id="matrix-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.3
      }}
    />
  );
}
