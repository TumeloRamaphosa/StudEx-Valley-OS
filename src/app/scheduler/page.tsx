'use client';

import { useState, useEffect } from 'react';

interface ScheduledTask {
  id: string;
  name: string;
  description: string;
  cron: string;
  english: string;
  agent: string;
  region: 'russia' | 'africa' | 'china' | 'global';
  enabled: boolean;
  lastRun?: string;
  nextRun: string;
  status: 'success' | 'running' | 'failed' | 'pending';
}

const TASKS: ScheduledTask[] = [
  {
    id: 'task-001',
    name: 'Russia Tour Prep',
    description: 'Compile and distribute Moscow pharma tour briefing materials, partner profiles, and itinerary updates',
    cron: '0 7 * * 1-5',
    english: 'Every weekday at 07:00 SAST',
    agent: 'Viktor Petrov',
    region: 'russia',
    enabled: true,
    lastRun: '2026-07-06 07:00',
    nextRun: '2026-07-07 07:00',
    status: 'success'
  },
  {
    id: 'task-002',
    name: 'Africa Partner Digest',
    description: 'Generate weekly summary of distributor activities, leads, and follow-up reminders for Africa team',
    cron: '0 8 * * 1',
    english: 'Every Monday at 08:00 SAST',
    agent: 'Amara Diallo',
    region: 'africa',
    enabled: true,
    lastRun: '2026-06-30 08:00',
    nextRun: '2026-07-07 08:00',
    status: 'success'
  },
  {
    id: 'task-003',
    name: 'China AI Sync',
    description: 'Automated status check with Shenzhen and Beijing AI partner systems, fetch project updates',
    cron: '0 9 * * *',
    english: 'Daily at 09:00 SAST',
    agent: 'Wei Chen',
    region: 'china',
    enabled: true,
    lastRun: '2026-07-06 09:00',
    nextRun: '2026-07-07 09:00',
    status: 'running'
  },
  {
    id: 'task-004',
    name: 'Newsletter Dispatch',
    description: 'Send weekly exchange newsletter to all subscribers via Telegram and email',
    cron: '0 7 * * 1',
    english: 'Every Monday at 07:30 SAST',
    agent: 'Elena Sokolova',
    region: 'global',
    enabled: true,
    lastRun: '2026-06-30 07:30',
    nextRun: '2026-07-07 07:30',
    status: 'success'
  },
  {
    id: 'task-005',
    name: 'JHB Expo Countdown',
    description: 'Generate and send JHB Pharma Expo promotional content and reminder updates',
    cron: '0 10 * * 3,6',
    english: 'Wednesdays & Saturdays at 10:00 SAST',
    agent: 'Thabo Mokoena',
    region: 'africa',
    enabled: true,
    lastRun: '2026-07-04 10:00',
    nextRun: '2026-07-08 10:00',
    status: 'success'
  },
  {
    id: 'task-006',
    name: 'Memory Reindex',
    description: 'Re-embed and update semantic search index for Obsidian vault and conversation history',
    cron: '0 2 * * *',
    english: 'Every night at 02:00 SAST',
    agent: 'System',
    region: 'global',
    enabled: true,
    lastRun: '2026-07-06 02:00',
    nextRun: '2026-07-07 02:00',
    status: 'success'
  },
  {
    id: 'task-007',
    name: 'Beijing Contract Review',
    description: 'Automated contract clause analysis and flagging for Beijing Tech Corp partnership',
    cron: '0 11 * * 2,4',
    english: 'Tuesdays & Thursdays at 11:00 SAST',
    agent: 'Lin Mei',
    region: 'china',
    enabled: false,
    nextRun: 'Paused',
    status: 'pending'
  },
  {
    id: 'task-008',
    name: 'St. Pete Extension Prep',
    description: 'Prepare Hermitage Business Center venue details and logistics for St. Petersburg extension',
    cron: '0 8 * * 5',
    english: 'Every Friday at 08:00 SAST',
    agent: 'Dmitri Volkov',
    region: 'russia',
    enabled: true,
    lastRun: '2026-07-03 08:00',
    nextRun: '2026-07-10 08:00',
    status: 'success'
  },
];

const REGION_COLORS = {
  russia: '#ff2ec4',
  africa: '#5bf4a6',
  china: '#D97706',
  global: '#818CF8',
};

const TIMEZONES = [
  { id: 'SAST', label: 'South Africa Standard Time (SAST)', offset: '+02:00' },
  { id: 'MSK', label: 'Moscow Standard Time (MSK)', offset: '+03:00' },
  { id: 'CST', label: 'China Standard Time (CST)', offset: '+08:00' },
  { id: 'UTC', label: 'Coordinated Universal Time (UTC)', offset: '+00:00' },
];

export default function SchedulerPage() {
  const [selectedTimezone, setSelectedTimezone] = useState('SAST');
  const [filterRegion, setFilterRegion] = useState<'all' | 'russia' | 'africa' | 'china' | 'global'>('all');
  const [showCronHelp, setShowCronHelp] = useState(false);

  const filteredTasks = filterRegion === 'all' 
    ? TASKS 
    : TASKS.filter(t => t.region === filterRegion);

  const enabledCount = TASKS.filter(t => t.enabled).length;

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
            color: '#D97706',
            margin: 0,
            textShadow: '0 0 20px rgba(217, 119, 6, 0.5)'
          }}>
            CRON SCHEDULER
          </h1>
          <span style={{ 
            background: '#D97706',
            color: '#0F172A',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600
          }}>
            {enabledCount} ACTIVE
          </span>
        </div>
        <p style={{ 
          color: '#94A3B8', 
          fontSize: '14px',
          margin: 0
        }}>
          Automated task scheduling with timezone-aware execution
        </p>
      </div>

      {/* Timezone Selector */}
      <div style={{ 
        background: 'rgba(30, 41, 59, 0.6)',
        border: '1px solid #334155',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'rgba(217, 119, 6, 0.2)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            🌍
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#F1F5F9' }}>
              Timezone Configuration
            </div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>
              All scheduled times shown in selected timezone
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {TIMEZONES.map((tz) => (
            <button
              key={tz.id}
              onClick={() => setSelectedTimezone(tz.id)}
              style={{
                padding: '10px 16px',
                background: selectedTimezone === tz.id ? 'rgba(217, 119, 6, 0.2)' : 'transparent',
                border: `1px solid ${selectedTimezone === tz.id ? '#D97706' : '#334155'}`,
                borderRadius: '8px',
                color: selectedTimezone === tz.id ? '#D97706' : '#94A3B8',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '13px',
                transition: 'all 0.2s'
              }}
            >
              <div>{tz.id}</div>
              <div style={{ fontSize: '11px', opacity: 0.7, fontWeight: 400 }}>
                UTC{tz.offset}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '24px',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1
      }}>
        {(['all', 'russia', 'africa', 'china', 'global'] as const).map((region) => (
          <button
            key={region}
            onClick={() => setFilterRegion(region)}
            style={{
              padding: '10px 18px',
              background: filterRegion === region 
                ? REGION_COLORS[region === 'all' ? 'global' : region] 
                : 'transparent',
              border: `1px solid ${filterRegion === region ? REGION_COLORS[region === 'all' ? 'global' : region] : '#334155'}`,
              borderRadius: '8px',
              color: filterRegion === region ? '#0F172A' : '#94A3B8',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '13px',
              transition: 'all 0.2s'
            }}
          >
            {region === 'all' ? 'All Regions' : region.charAt(0).toUpperCase() + region.slice(1)}
          </button>
        ))}
      </div>

      {/* Cron Expression Help */}
      <div style={{ 
        marginBottom: '24px',
        position: 'relative',
        zIndex: 1
      }}>
        <button
          onClick={() => setShowCronHelp(!showCronHelp)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            background: 'rgba(129, 140, 248, 0.1)',
            border: '1px solid rgba(129, 140, 248, 0.3)',
            borderRadius: '8px',
            color: '#818CF8',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '13px'
          }}
        >
          <span>ℹ️</span>
          Cron Expression Reference
          <span style={{ marginLeft: 'auto' }}>{showCronHelp ? '▲' : '▼'}</span>
        </button>
        
        {showCronHelp && (
          <div style={{
            marginTop: '12px',
            padding: '20px',
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid #334155',
            borderRadius: '8px',
            fontSize: '13px'
          }}>
            <div style={{ marginBottom: '12px', color: '#94A3B8' }}>
              <strong style={{ color: '#F1F5F9' }}>Format:</strong> minute hour day month weekday
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px' }}>
              <span style={{ color: '#ff2ec4' }}>*</span>
              <span style={{ color: '#CBD5E1' }}>Any value</span>
              <span style={{ color: '#ff2ec4' }}>0</span>
              <span style={{ color: '#CBD5E1' }}>Zero (first)</span>
              <span style={{ color: '#ff2ec4' }}>1-5</span>
              <span style={{ color: '#CBD5E1' }}>Range (1 through 5)</span>
              <span style={{ color: '#ff2ec4' }}>*/2</span>
              <span style={{ color: '#CBD5E1' }}>Every 2 units</span>
              <span style={{ color: '#ff2ec4' }}>, </span>
              <span style={{ color: '#CBD5E1' }}>List separator (0,30)</span>
            </div>
          </div>
        )}
      </div>

      {/* Timeline View */}
      <div style={{ 
        marginBottom: '24px',
        position: 'relative',
        zIndex: 1
      }}>
        <h2 style={{ 
          fontSize: '16px', 
          fontWeight: 600, 
          color: '#F1F5F9',
          marginBottom: '16px'
        }}>
          Execution Timeline (Today)
        </h2>
        <TimelineView tasks={filteredTasks.filter(t => t.enabled)} />
      </div>

      {/* Task List */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px',
        position: 'relative',
        zIndex: 1
      }}>
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #1E293B; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
      `}</style>
    </div>
  );
}

function TimelineView({ tasks }: { tasks: ScheduledTask[] }) {
  const hours = Array.from({ length: 14 }, (_, i) => i + 6); // 6 AM to 8 PM
  
  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.4)',
      border: '1px solid #334155',
      borderRadius: '12px',
      padding: '16px',
      overflowX: 'auto'
    }}>
      <div style={{ 
        display: 'flex', 
        gap: '0',
        minWidth: '700px'
      }}>
        {hours.map((hour) => (
          <div key={hour} style={{ 
            flex: 1,
            textAlign: 'center',
            borderLeft: '1px solid #334155',
            padding: '8px 0'
          }}>
            <div style={{ 
              fontSize: '11px', 
              color: '#64748B',
              fontFamily: 'monospace'
            }}>
              {hour.toString().padStart(2, '0')}:00
            </div>
          </div>
        ))}
      </div>
      <div style={{ 
        display: 'flex', 
        gap: '0',
        minWidth: '700px',
        marginTop: '8px'
      }}>
        {hours.map((hour) => {
          const taskAtHour = tasks.find(t => {
            const nextRunHour = parseInt(t.nextRun.split(' ')[1]?.split(':')[0] || '0');
            return nextRunHour === hour;
          });
          
          return (
            <div key={hour} style={{ 
              flex: 1,
              height: '40px',
              borderLeft: '1px solid #1E293B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {taskAtHour && (
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: REGION_COLORS[taskAtHour.region],
                  boxShadow: `0 0 8px ${REGION_COLORS[taskAtHour.region]}`,
                  cursor: 'pointer'
                }} title={taskAtHour.name} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: ScheduledTask }) {
  const [enabled, setEnabled] = useState(task.enabled);
  
  const statusConfig = {
    success: { color: '#5bf4a6', label: 'Success', icon: '✓' },
    running: { color: '#D97706', label: 'Running', icon: '◐' },
    failed: { color: '#ef4444', label: 'Failed', icon: '✗' },
    pending: { color: '#64748B', label: 'Pending', icon: '○' },
  }[task.status];

  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.6)',
      border: `1px solid ${enabled ? REGION_COLORS[task.region] + '40' : '#334155'}`,
      borderRadius: '12px',
      padding: '20px',
      opacity: enabled ? 1 : 0.6,
      transition: 'all 0.2s'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: `${REGION_COLORS[task.region]}20`,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px'
          }}>
            {task.region === 'russia' ? '🇷🇺' : task.region === 'africa' ? '🌍' : task.region === 'china' ? '🇨🇳' : '🌐'}
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#F1F5F9' }}>
              {task.name}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>
              Assigned to {task.agent}
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            padding: '4px 10px',
            background: `${statusConfig.color}20`,
            border: `1px solid ${statusConfig.color}40`,
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 600,
            color: statusConfig.color
          }}>
            {statusConfig.icon} {statusConfig.label}
          </div>
          
          <button
            onClick={() => setEnabled(!enabled)}
            style={{
              width: '48px',
              height: '24px',
              background: enabled ? '#5bf4a6' : '#334155',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 0.2s'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              background: '#fff',
              borderRadius: '50%',
              position: 'absolute',
              top: '2px',
              left: enabled ? '26px' : '2px',
              transition: 'left 0.2s'
            }} />
          </button>
        </div>
      </div>
      
      <p style={{ 
        fontSize: '13px', 
        color: '#94A3B8',
        margin: '0 0 16px 0',
        lineHeight: 1.5
      }}>
        {task.description}
      </p>
      
      <div style={{ 
        display: 'flex', 
        gap: '24px',
        flexWrap: 'wrap',
        paddingTop: '12px',
        borderTop: '1px solid #1E293B',
        fontSize: '12px'
      }}>
        <div>
          <span style={{ color: '#64748B' }}>Schedule: </span>
          <code style={{ 
            background: 'rgba(255, 46, 196, 0.1)', 
            padding: '2px 6px', 
            borderRadius: '4px',
            color: '#ff2ec4',
            fontFamily: 'monospace'
          }}>
            {task.cron}
          </code>
          <span style={{ color: '#94A3B8', marginLeft: '8px' }}>
            ({task.english})
          </span>
        </div>
        {task.lastRun && (
          <div>
            <span style={{ color: '#64748B' }}>Last: </span>
            <span style={{ color: '#5bf4a6' }}>{task.lastRun}</span>
          </div>
        )}
        <div>
          <span style={{ color: '#64748B' }}>Next: </span>
          <span style={{ color: '#D97706' }}>{task.nextRun}</span>
        </div>
      </div>
    </div>
  );
}

function MatrixRainBackground() {
  useEffect(() => {
    const canvas = document.getElementById('scheduler-matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'CRONSCHEDULE🕐AUTOMATE';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#D97706';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
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
      id="scheduler-matrix-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.15
      }}
    />
  );
}
