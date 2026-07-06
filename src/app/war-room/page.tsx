'use client';

import { useState } from 'react';

interface StandupCard {
  team: 'russia' | 'africa' | 'china';
  teamName: string;
  agent: string;
  role: string;
  yesterday: string[];
  today: string[];
  blockers: string[];
  priority: 'high' | 'medium' | 'low';
}

interface Decision {
  id: string;
  timestamp: string;
  team: string;
  decision: string;
  rationale: string;
}

const STANDUP_DATA: StandupCard[] = [
  {
    team: 'russia',
    teamName: 'Russia VM Team',
    agent: 'Viktor Petrov',
    role: 'Team Lead',
    yesterday: [
      'Completed Pharmstandard partnership review',
      'Prepared Moscow tour preliminary itinerary',
      'Coordinated with Elena on St. Petersburg venue research'
    ],
    today: [
      'Finalize tour briefing deck for September 15-22',
      'Schedule follow-up call with Pharmacia Norte',
      'Review Dmitri\'s logistics proposal'
    ],
    blockers: [
      'Waiting on Hermitage Business Center confirmation for St. Pete extension'
    ],
    priority: 'high'
  },
  {
    team: 'russia',
    teamName: 'Russia VM Team',
    agent: 'Elena Sokolova',
    role: 'Content & Documentation',
    yesterday: [
      'Drafted Moscow pharma tour briefing template',
      'Translated partner profile documents',
      'Compiled regulatory checklist for Russian market'
    ],
    today: [
      'Complete tour deck with partner slides',
      'Prepare meeting agenda for Yuri Kozlov sync',
      'Finalize St. Petersburg itinerary draft'
    ],
    blockers: [],
    priority: 'medium'
  },
  {
    team: 'africa',
    teamName: 'Africa Expansion',
    agent: 'Amara Diallo',
    role: 'Team Lead',
    yesterday: [
      'Closed Lagos distributor partnership meeting',
      'Shared draft MoU with legal team',
      'Coordinated with Fatima on NAFDAC requirements'
    ],
    today: [
      'Review MoU feedback from Lagos legal',
      'Schedule calls with Nairobi Pharma Hub contacts',
      'Update expansion timeline with new partner data'
    ],
    blockers: [],
    priority: 'high'
  },
  {
    team: 'africa',
    teamName: 'Africa Expansion',
    agent: 'Thabo Mokoena',
    role: 'Events & Partnerships',
    yesterday: [
      'Finalized JHB Pharma Expo booth dimensions',
      'Submitted promotional material designs for review',
      'Contacted 3 additional exhibitors for partnership'
    ],
    today: [
      'Get final approval on expo materials',
      'Confirm exhibitor list for JHB event',
      'Draft social media calendar for expo countdown'
    ],
    blockers: [
      'Awaiting brand approval on expo booth design mockups'
    ],
    priority: 'medium'
  },
  {
    team: 'china',
    teamName: 'China Liaison',
    agent: 'Wei Chen',
    role: 'Team Lead',
    yesterday: [
      'Completed Shenzhen AI lab due diligence review',
      'Prepared partnership recommendation summary',
      'Coordinated tech transfer discussion points with Lin Mei'
    ],
    today: [
      'Present DD findings to executive team',
      'Schedule video call with Beijing Tech Corp',
      'Follow up on Shanghai manufacturing hub inquiries'
    ],
    blockers: [],
    priority: 'high'
  },
  {
    team: 'china',
    teamName: 'China Liaison',
    agent: 'Lin Mei',
    role: 'Contracts & IP',
    yesterday: [
      'Identified 5 concerns in Beijing Tech Corp contract',
      'Prepared comparison analysis with standard IP terms',
      'Drafted preliminary response to technology transfer clauses'
    ],
    today: [
      'Prepare detailed contract redline for review',
      'Coordinate Thursday call with Beijing legal team',
      'Update IP management framework documentation'
    ],
    blockers: [
      'Need additional context on acceptable tech transfer boundaries'
    ],
    priority: 'high'
  }
];

const DECISIONS: Decision[] = [
  { id: 'd-001', timestamp: '2026-07-06 09:15', team: 'Russia VM', decision: 'Proceed with September 15-22 Moscow tour dates', rationale: 'Yuri confirmed partner availability and venue bookings' },
  { id: 'd-002', timestamp: '2026-07-06 10:30', team: 'Africa', decision: 'Approve exclusive 3-year agreement with Lagos distributor', rationale: 'MoU terms favorable; distributor has proven track record' },
  { id: 'd-003', timestamp: '2026-07-06 11:00', team: 'China', decision: 'Schedule Thursday call for Beijing Tech contract renegotiation', rationale: 'Lin Mei flagged clauses requiring immediate attention' },
  { id: 'd-004', timestamp: '2026-07-05 14:00', team: 'Global', decision: 'Prioritize JHB Pharma Expo booth design over social content', rationale: 'Expo in 6 weeks; limited time for physical materials' },
  { id: 'd-005', timestamp: '2026-07-05 11:30', team: 'Russia VM', decision: 'Include St. Petersburg as optional extension (Sept 23-25)', rationale: 'Pending venue confirmation; keep as backup plan' },
];

const TEAM_COLORS = {
  russia: '#ff2ec4',
  africa: '#5bf4a6',
  china: '#D97706',
};

export default function WarRoomPage() {
  const [activeTab, setActiveTab] = useState<'standup' | 'decisions'>('standup');
  const [filterTeam, setFilterTeam] = useState<'all' | 'russia' | 'africa' | 'china'>('all');

  const filteredCards = filterTeam === 'all' 
    ? STANDUP_DATA 
    : STANDUP_DATA.filter(card => card.team === filterTeam);

  const teamStats = {
    russia: STANDUP_DATA.filter(c => c.team === 'russia').length,
    africa: STANDUP_DATA.filter(c => c.team === 'africa').length,
    china: STANDUP_DATA.filter(c => c.team === 'china').length,
    blockers: STANDUP_DATA.filter(c => c.blockers.length > 0).length,
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
            color: '#ff2ec4',
            margin: 0,
            textShadow: '0 0 20px rgba(255, 46, 196, 0.5)'
          }}>
            WAR ROOM
          </h1>
          <span style={{ 
            background: '#ff2ec4',
            color: '#0F172A',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600
          }}>
            DAILY STANDUP
          </span>
        </div>
        <p style={{ 
          color: '#94A3B8', 
          fontSize: '14px',
          margin: 0
        }}>
          Team sync dashboard: blockers, priorities, and decisions log
        </p>
      </div>

      {/* Stats Row */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '16px',
        marginBottom: '32px',
        position: 'relative',
        zIndex: 10
      }}>
        <StatCard label="Russia VM" value={teamStats.russia.toString()} color="#ff2ec4" icon="🇷🇺" />
        <StatCard label="Africa Exp." value={teamStats.africa.toString()} color="#5bf4a6" icon="🌍" />
        <StatCard label="China Liaison" value={teamStats.china.toString()} color="#D97706" icon="🇨🇳" />
        <StatCard label="Blockers" value={teamStats.blockers.toString()} color="#ef4444" icon="⚠️" />
      </div>

      {/* Tab Switcher */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginBottom: '24px',
        position: 'relative',
        zIndex: 10
      }}>
        <button
          onClick={() => setActiveTab('standup')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'standup' ? '#ff2ec4' : 'transparent',
            border: `1px solid ${activeTab === 'standup' ? '#ff2ec4' : '#334155'}`,
            borderRadius: '12px',
            color: activeTab === 'standup' ? '#0F172A' : '#94A3B8',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '14px',
            transition: 'all 0.2s'
          }}
        >
          Daily Standup
        </button>
        <button
          onClick={() => setActiveTab('decisions')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'decisions' ? '#D97706' : 'transparent',
            border: `1px solid ${activeTab === 'decisions' ? '#D97706' : '#334155'}`,
            borderRadius: '12px',
            color: activeTab === 'decisions' ? '#0F172A' : '#94A3B8',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '14px',
            transition: 'all 0.2s'
          }}
        >
          Decisions Log
        </button>
      </div>

      {activeTab === 'standup' ? (
        <>
          {/* Team Filter */}
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            marginBottom: '24px',
            position: 'relative',
            zIndex: 10
          }}>
            {(['all', 'russia', 'africa', 'china'] as const).map((team) => (
              <button
                key={team}
                onClick={() => setFilterTeam(team)}
                style={{
                  padding: '10px 18px',
                  background: filterTeam === team 
                    ? (team === 'all' ? '#818CF8' : TEAM_COLORS[team]) 
                    : 'transparent',
                  border: `1px solid ${filterTeam === team ? (team === 'all' ? '#818CF8' : TEAM_COLORS[team]) : '#334155'}`,
                  borderRadius: '8px',
                  color: filterTeam === team ? '#0F172A' : '#94A3B8',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '13px',
                  transition: 'all 0.2s'
                }}
              >
                {team === 'all' ? 'All Teams' : team === 'russia' ? 'Russia VM' : team === 'africa' ? 'Africa' : 'China'}
              </button>
            ))}
          </div>

          {/* Standup Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
            gap: '20px',
            position: 'relative',
            zIndex: 10
          }}>
            {filteredCards.map((card) => (
              <StandupCard key={`${card.team}-${card.agent}`} card={card} />
            ))}
          </div>
        </>
      ) : (
        /* Decisions Log */
        <div style={{ 
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid #334155',
            borderRadius: '16px',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '20px' }}>📋</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#F1F5F9' }}>
                Decisions Log
              </span>
              <span style={{ 
                marginLeft: 'auto',
                fontSize: '12px', 
                color: '#64748B' 
              }}>
                {DECISIONS.length} total decisions
              </span>
            </div>

            {/* Decision Items */}
            {DECISIONS.map((decision, index) => (
              <div 
                key={decision.id}
                style={{
                  padding: '20px',
                  borderBottom: index < DECISIONS.length - 1 ? '1px solid #1E293B' : 'none',
                  display: 'flex',
                  gap: '16px'
                }}
              >
                {/* Timeline Dot */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '4px'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: TEAM_COLORS[decision.team.includes('Russia') ? 'russia' : decision.team.includes('Africa') ? 'africa' : 'china'],
                    boxShadow: `0 0 10px ${TEAM_COLORS[decision.team.includes('Russia') ? 'russia' : decision.team.includes('Africa') ? 'africa' : 'china']}`
                  }} />
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px'
                  }}>
                    <span style={{ 
                      fontSize: '12px', 
                      fontWeight: 600, 
                      color: TEAM_COLORS[decision.team.includes('Russia') ? 'russia' : decision.team.includes('Africa') ? 'africa' : 'china']
                    }}>
                      {decision.team}
                    </span>
                    <span style={{ 
                      fontSize: '11px', 
                      color: '#64748B',
                      fontFamily: 'monospace'
                    }}>
                      {decision.timestamp}
                    </span>
                  </div>
                  
                  <div style={{ 
                    fontSize: '14px', 
                    fontWeight: 600, 
                    color: '#F1F5F9',
                    marginBottom: '6px'
                  }}>
                    {decision.decision}
                  </div>
                  
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#94A3B8',
                    lineHeight: 1.5
                  }}>
                    <span style={{ color: '#64748B' }}>Rationale: </span>
                    {decision.rationale}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

function StatCard({ label, value, color, icon }: { label: string; value: string; color: string; icon: string }) {
  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.8)',
      border: `1px solid ${color}40`,
      borderRadius: '12px',
      padding: '20px',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }}>
      <span style={{ fontSize: '28px' }}>{icon}</span>
      <div>
        <div style={{ 
          fontSize: '28px', 
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
          marginTop: '2px'
        }}>
          {label}
        </div>
      </div>
    </div>
  );
}

function StandupCard({ card }: { card: StandupCard }) {
  const color = TEAM_COLORS[card.team];
  
  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.6)',
      border: `1px solid ${color}40`,
      borderRadius: '16px',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        background: `${color}10`,
        borderBottom: `1px solid ${color}30`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: `${color}20`,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px'
          }}>
            {card.team === 'russia' ? '🇷🇺' : card.team === 'africa' ? '🌍' : '🇨🇳'}
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#F1F5F9' }}>
              {card.agent}
            </div>
            <div style={{ fontSize: '11px', color: color }}>
              {card.role}
            </div>
          </div>
        </div>
        
        <div style={{
          padding: '4px 10px',
          background: card.priority === 'high' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(217, 119, 6, 0.2)',
          border: `1px solid ${card.priority === 'high' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(217, 119, 6, 0.4)'}`,
          borderRadius: '4px',
          fontSize: '10px',
          fontWeight: 600,
          color: card.priority === 'high' ? '#ef4444' : '#D97706',
          textTransform: 'uppercase'
        }}>
          {card.priority} priority
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        {/* Yesterday */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px'
          }}>
            <span style={{ fontSize: '14px' }}>✅</span>
            <span style={{ 
              fontSize: '12px', 
              fontWeight: 600, 
              color: '#5bf4a6',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Yesterday
            </span>
          </div>
          <ul style={{ 
            margin: 0, 
            paddingLeft: '28px',
            fontSize: '13px',
            color: '#CBD5E1',
            lineHeight: 1.6
          }}>
            {card.yesterday.map((item, i) => (
              <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Today */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px'
          }}>
            <span style={{ fontSize: '14px' }}>🎯</span>
            <span style={{ 
              fontSize: '12px', 
              fontWeight: 600, 
              color: '#D97706',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Today
            </span>
          </div>
          <ul style={{ 
            margin: 0, 
            paddingLeft: '28px',
            fontSize: '13px',
            color: '#CBD5E1',
            lineHeight: 1.6
          }}>
            {card.today.map((item, i) => (
              <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Blockers */}
        {card.blockers.length > 0 && (
          <div style={{
            padding: '12px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '14px' }}>⚠️</span>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: 600, 
                color: '#ef4444',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Blockers ({card.blockers.length})
              </span>
            </div>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '28px',
              fontSize: '12px',
              color: '#FCA5A5',
              lineHeight: 1.5
            }}>
              {card.blockers.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function MatrixRainBackground() {
  const canvasRef = { current: null as HTMLCanvasElement | null };
  
  // This would be implemented with useEffect in a real component
  // For now, just rendering a placeholder
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      opacity: 0.15,
      background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.8) 100%)'
    }} />
  );
}
