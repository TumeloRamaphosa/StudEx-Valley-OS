'use client';

import { useState, useEffect } from 'react';

interface MemoryEntry {
  id: string;
  content: string;
  timestamp: string;
  layer: 'short' | 'medium' | 'long';
  relevance: number;
  pinned: boolean;
  category: string;
}

const MEMORY_ENTRIES: MemoryEntry[] = [
  // Short-term (today)
  { id: '1', content: 'Yuri confirmed Moscow pharma tour September 15-22. St. Petersburg extension pending venue confirmation.', timestamp: '2026-07-06 09:45', layer: 'short', relevance: 0.95, pinned: false, category: 'Russia' },
  { id: '2', content: 'Amara reported Lagos distributor ready for 3-year exclusive agreement. MoU draft expected Friday.', timestamp: '2026-07-06 10:20', layer: 'short', relevance: 0.92, pinned: false, category: 'Africa' },
  { id: '3', content: 'Wei Chen shared Shenzhen AI lab due diligence: 12 patents, strong B2B channels. Recommendation: proceed.', timestamp: '2026-07-06 11:35', layer: 'short', relevance: 0.89, pinned: false, category: 'China' },
  { id: '4', content: 'Lin Mei flagged concerns with Beijing Tech Corp technology transfer clauses. Call scheduled Thursday 14:00 SAST.', timestamp: '2026-07-06 11:40', layer: 'short', relevance: 0.87, pinned: false, category: 'China' },
  { id: '5', content: 'JHB Pharma Expo in 6 weeks. Thabo requested booth designs and promo materials by next Tuesday.', timestamp: '2026-07-06 10:25', layer: 'short', relevance: 0.85, pinned: false, category: 'Africa' },
  
  // Medium-term (this week)
  { id: '6', content: 'Russia VM team completed 3 partner briefings. Pharmstandard inquiry in progress.', timestamp: '2026-07-05', layer: 'medium', relevance: 0.88, pinned: false, category: 'Russia' },
  { id: '7', content: 'Africa expansion team established contact with 5 new distributors across Nigeria and South Africa.', timestamp: '2026-07-04', layer: 'medium', relevance: 0.82, pinned: false, category: 'Africa' },
  { id: '8', content: 'China liaison team completed preliminary evaluation of 3 AI companies in Guangdong region.', timestamp: '2026-07-03', layer: 'medium', relevance: 0.78, pinned: false, category: 'China' },
  { id: '9', content: 'Weekly newsletter scheduled for Monday 07:30. Content ready for review.', timestamp: '2026-07-05', layer: 'medium', relevance: 0.75, pinned: false, category: 'Operations' },
  
  // Long-term (persistent)
  { id: '10', content: 'Core brand: Neon pink #FF2EC4 + Gold #D97706 on dark slate #0F172A (Studex Valley OS).', timestamp: 'PERSISTENT', layer: 'long', relevance: 0.99, pinned: true, category: 'Brand' },
  { id: '11', content: 'Source-of-truth knowledge corpus: Obsidian vault "2nd Brain" with semantic indexing.', timestamp: 'PERSISTENT', layer: 'long', relevance: 0.96, pinned: true, category: 'Infrastructure' },
  { id: '12', content: 'Primary communication: Telegram for approvals, Slack for team updates, Discord for China relations.', timestamp: 'PERSISTENT', layer: 'long', relevance: 0.91, pinned: true, category: 'Comms' },
  { id: '13', content: 'Preferred agent: Viktor Petrov for Russia pharma. Amara Diallo for Africa expansion. Wei Chen for China AI.', timestamp: 'PERSISTENT', layer: 'long', relevance: 0.88, pinned: true, category: 'Team' },
  { id: '14', content: 'Weekly exchange newsletter ships Mondays 07:30 via Ops cron.', timestamp: 'PERSISTENT', layer: 'long', relevance: 0.85, pinned: false, category: 'Operations' },
];

const LAYER_CONFIG = {
  short: { name: 'Short-Term', subtitle: "Today's Conversations", color: '#ff2ec4', icon: '⚡' },
  medium: { name: 'Medium-Term', subtitle: "This Week's Activities", color: '#D97706', icon: '📅' },
  long: { name: 'Long-Term', subtitle: 'Persistent Memory', color: '#5bf4a6', icon: '🧠' },
};

export default function MemoriesPage() {
  const [activeLayer, setActiveLayer] = useState<'short' | 'medium' | 'long'>('short');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  
  const filteredMemories = MEMORY_ENTRIES.filter(m => 
    m.layer === activeLayer && 
    (searchQuery === '' || m.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const layerStats = {
    short: MEMORY_ENTRIES.filter(m => m.layer === 'short').length,
    medium: MEMORY_ENTRIES.filter(m => m.layer === 'medium').length,
    long: MEMORY_ENTRIES.filter(m => m.layer === 'long').length,
    pinned: MEMORY_ENTRIES.filter(m => m.pinned).length,
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
            color: '#5bf4a6',
            margin: 0,
            textShadow: '0 0 20px rgba(91, 244, 166, 0.5)'
          }}>
            MEMORY ARCHIVE
          </h1>
          <span style={{ 
            background: '#5bf4a6',
            color: '#0F172A',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600
          }}>
            3-LAYER HYBRID
          </span>
        </div>
        <p style={{ 
          color: '#94A3B8', 
          fontSize: '14px',
          margin: 0
        }}>
          Three-layer recall system: FTS5 keyword + Embeddings + Salience boosting
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
        <StatCard label="Short-Term" value={layerStats.short.toString()} color="#ff2ec4" icon="⚡" />
        <StatCard label="Medium-Term" value={layerStats.medium.toString()} color="#D97706" icon="📅" />
        <StatCard label="Long-Term" value={layerStats.long.toString()} color="#5bf4a6" icon="🧠" />
        <StatCard label="Pinned" value={layerStats.pinned.toString()} color="#E2E8F0" icon="📌" />
      </div>

      {/* Brain Visualization */}
      <div style={{ 
        marginBottom: '32px',
        position: 'relative',
        zIndex: 1
      }}>
        <BrainVisualization 
          activeLayer={activeLayer}
          onLayerHover={setHoveredRegion}
        />
      </div>

      {/* Layer Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginBottom: '24px',
        position: 'relative',
        zIndex: 1
      }}>
        {(Object.keys(LAYER_CONFIG) as Array<keyof typeof LAYER_CONFIG>).map((layer) => {
          const config = LAYER_CONFIG[layer];
          return (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              style={{
                padding: '14px 24px',
                background: activeLayer === layer ? config.color : 'transparent',
                border: `1px solid ${activeLayer === layer ? config.color : '#334155'}`,
                borderRadius: '12px',
                color: activeLayer === layer ? '#0F172A' : '#94A3B8',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: '"DM Sans", sans-serif',
                transition: 'all 0.2s',
                fontSize: '14px'
              }}
            >
              <span style={{ marginRight: '8px' }}>{config.icon}</span>
              {config.name}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div style={{ 
        marginBottom: '24px',
        position: 'relative',
        zIndex: 1
      }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search memories..."
          style={{
            width: '100%',
            maxWidth: '400px',
            background: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '14px 18px',
            color: '#F1F5F9',
            fontSize: '14px',
            fontFamily: '"DM Sans", sans-serif',
            outline: 'none'
          }}
        />
      </div>

      {/* Memory Entries */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px',
        position: 'relative',
        zIndex: 1
      }}>
        {filteredMemories.map((memory) => (
          <MemoryCard key={memory.id} memory={memory} />
        ))}
      </div>

      <style>{`
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 8px currentColor); }
          50% { filter: drop-shadow(0 0 16px currentColor); }
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

function BrainVisualization({ 
  activeLayer, 
  onLayerHover 
}: { 
  activeLayer: 'short' | 'medium' | 'long';
  onLayerHover: (layer: string | null) => void;
}) {
  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.8)',
      border: '1px solid #334155',
      borderRadius: '16px',
      padding: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      gap: '24px'
    }}>
      {/* Brain Layers SVG */}
      <svg width="200" height="200" viewBox="0 0 200 200">
        {/* Outer Layer - Long Term */}
        <ellipse 
          cx="100" 
          cy="100" 
          rx="90" 
          ry="80"
          fill="none"
          stroke="#5bf4a6"
          strokeWidth={activeLayer === 'long' ? '4' : '2'}
          opacity={activeLayer === 'long' || activeLayer === 'medium' || activeLayer === 'short' ? 1 : 0.3}
          style={{ 
            transition: 'all 0.3s',
            filter: activeLayer === 'long' ? 'drop-shadow(0 0 10px #5bf4a6)' : 'none'
          }}
        />
        
        {/* Middle Layer - Medium Term */}
        <ellipse 
          cx="100" 
          cy="100" 
          rx="65" 
          ry="55"
          fill="none"
          stroke="#D97706"
          strokeWidth={activeLayer === 'medium' ? '4' : '2'}
          opacity={activeLayer === 'medium' || activeLayer === 'short' ? 1 : 0.3}
          style={{ 
            transition: 'all 0.3s',
            filter: activeLayer === 'medium' ? 'drop-shadow(0 0 10px #D97706)' : 'none'
          }}
        />
        
        {/* Inner Layer - Short Term */}
        <ellipse 
          cx="100" 
          cy="100" 
          rx="35" 
          ry="30"
          fill="rgba(255, 46, 196, 0.2)"
          stroke="#ff2ec4"
          strokeWidth={activeLayer === 'short' ? '4' : '2'}
          style={{ 
            transition: 'all 0.3s',
            filter: activeLayer === 'short' ? 'drop-shadow(0 0 15px #ff2ec4)' : 'none'
          }}
        />
        
        {/* Core */}
        <circle 
          cx="100" 
          cy="100" 
          r="12"
          fill="#ff2ec4"
          style={{ filter: 'drop-shadow(0 0 8px #ff2ec4)' }}
        />
        
        {/* Connection Lines */}
        <line x1="100" y1="88" x2="100" y2="50" stroke="#ff2ec4" strokeWidth="1" opacity="0.5" />
        <line x1="112" y1="100" x2="140" y2="100" stroke="#D97706" strokeWidth="1" opacity="0.5" />
        <line x1="88" y1="100" x2="20" y2="100" stroke="#5bf4a6" strokeWidth="1" opacity="0.5" />
      </svg>

      {/* Layer Labels */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <LayerLabel 
          label="Short-Term" 
          desc="Active conversations, immediate context"
          color="#ff2ec4"
          active={activeLayer === 'short'}
          onHover={() => onLayerHover('short')}
        />
        <LayerLabel 
          label="Medium-Term" 
          desc="Weekly activities, recent decisions"
          color="#D97706"
          active={activeLayer === 'medium'}
          onHover={() => onLayerHover('medium')}
        />
        <LayerLabel 
          label="Long-Term" 
          desc="Pinned facts, brand, team knowledge"
          color="#5bf4a6"
          active={activeLayer === 'long'}
          onHover={() => onLayerHover('long')}
        />
      </div>
    </div>
  );
}

function LayerLabel({ 
  label, 
  desc, 
  color, 
  active,
  onHover 
}: { 
  label: string; 
  desc: string; 
  color: string;
  active: boolean;
  onHover: () => void;
}) {
  return (
    <div 
      onMouseEnter={onHover}
      onMouseLeave={() => onHover()}
      style={{
        padding: '12px 16px',
        background: active ? `${color}15` : 'transparent',
        border: `1px solid ${active ? color : 'transparent'}`,
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
    >
      <div style={{ 
        fontSize: '14px', 
        fontWeight: 600, 
        color: active ? color : '#94A3B8',
        marginBottom: '4px'
      }}>
        {label}
      </div>
      <div style={{ fontSize: '12px', color: '#64748B' }}>
        {desc}
      </div>
    </div>
  );
}

function MemoryCard({ memory }: { memory: MemoryEntry }) {
  const config = LAYER_CONFIG[memory.layer];
  
  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.6)',
      border: `1px solid ${memory.pinned ? config.color : '#334155'}`,
      borderRadius: '12px',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {memory.pinned && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          fontSize: '16px'
        }}>
          📌
        </div>
      )}
      
      {/* Category Tag */}
      <div style={{
        display: 'inline-block',
        padding: '4px 10px',
        background: `${config.color}20`,
        border: `1px solid ${config.color}40`,
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: 600,
        color: config.color,
        marginBottom: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {memory.category}
      </div>

      {/* Content */}
      <p style={{
        fontSize: '14px',
        color: '#F1F5F9',
        lineHeight: 1.6,
        margin: '0 0 12px 0'
      }}>
        {memory.content}
      </p>

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
        color: '#64748B'
      }}>
        <span>{memory.timestamp}</span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span>Relevance:</span>
          <div style={{
            width: '60px',
            height: '4px',
            background: '#1E293B',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${memory.relevance * 100}%`,
              height: '100%',
              background: config.color,
              borderRadius: '2px'
            }} />
          </div>
          <span style={{ color: config.color, fontWeight: 600 }}>
            {(memory.relevance * 100).toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
}

function MatrixRainBackground() {
  useEffect(() => {
    const canvas = document.getElementById('memories-matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'MEMORYRECALLKNOWLEDGE🧠';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#5bf4a6';
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
      id="memories-matrix-canvas"
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
