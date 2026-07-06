'use client';

import { useState, useEffect, useRef } from 'react';

interface Node {
  id: string;
  label: string;
  type: 'agent' | 'vm' | 'partner' | 'country';
  region?: 'russia' | 'africa' | 'china' | 'global';
  x: number;
  y: number;
  connections: string[];
}

interface Edge {
  from: string;
  to: string;
  label?: string;
  strength: number;
}

const NODES: Node[] = [
  // Central Node
  { id: 'studex-os', label: 'StudEx Valley OS', type: 'agent', region: 'global', x: 50, y: 50, connections: ['main-agent', 'ops-vm'] },
  
  // Russia Cluster
  { id: 'main-agent', label: 'Orchestrator', type: 'agent', region: 'global', x: 35, y: 35, connections: ['viktor', 'elena', 'dmitri'] },
  { id: 'vm-pharma-moscow', label: 'VM: Moscow Pharma', type: 'vm', region: 'russia', x: 20, y: 20, connections: ['viktor', 'pharmstandard'] },
  { id: 'viktor', label: 'Viktor Petrov', type: 'agent', region: 'russia', x: 15, y: 35, connections: ['pharmstandard', 'pharmacia-norte'] },
  { id: 'elena', label: 'Elena Sokolova', type: 'agent', region: 'russia', x: 25, y: 50, connections: ['st-petersburg', 'tour-brief'] },
  { id: 'dmitri', label: 'Dmitri Volkov', type: 'agent', region: 'russia', x: 30, y: 65, connections: ['vm-pharma-moscow', 'logistics-hub'] },
  { id: 'pharmstandard', label: 'Pharmstandard', type: 'partner', region: 'russia', x: 5, y: 30, connections: [] },
  { id: 'pharmacia-norte', label: 'Pharmacia Norte', type: 'partner', region: 'russia', x: 10, y: 50, connections: [] },
  { id: 'st-petersburg', label: 'St. Petersburg Hub', type: 'partner', region: 'russia', x: 20, y: 70, connections: [] },
  { id: 'moscow-city', label: 'Moscow, Russia', type: 'country', region: 'russia', x: 5, y: 15, connections: [] },
  
  // Africa Cluster
  { id: 'ops-vm', label: 'Ops VM', type: 'vm', region: 'global', x: 65, y: 35, connections: ['amara', 'thabo', 'fatima'] },
  { id: 'amara', label: 'Amara Diallo', type: 'agent', region: 'africa', x: 75, y: 25, connections: ['lagos-dist', 'nairobi-hub'] },
  { id: 'thabo', label: 'Thabo Mokoena', type: 'agent', region: 'africa', x: 85, y: 35, connections: ['jhb-expo', 'vm-africa'] },
  { id: 'fatima', label: 'Fatima Al-Hassan', type: 'agent', region: 'africa', x: 70, y: 50, connections: ['vm-africa', 'nafdac'] },
  { id: 'vm-africa', label: 'VM: Africa Exp.', type: 'vm', region: 'africa', x: 80, y: 55, connections: ['lagos-dist', 'jhb-expo'] },
  { id: 'lagos-dist', label: 'Lagos Distributor', type: 'partner', region: 'africa', x: 95, y: 20, connections: [] },
  { id: 'nairobi-hub', label: 'Nairobi Pharma Hub', type: 'partner', region: 'africa', x: 95, y: 40, connections: [] },
  { id: 'jhb-expo', label: 'JHB Pharma Expo', type: 'partner', region: 'africa', x: 90, y: 60, connections: [] },
  { id: 'nafdac', label: 'NAFDAC', type: 'partner', region: 'africa', x: 85, y: 75, connections: [] },
  { id: 'johannesburg', label: 'Johannesburg, SA', type: 'country', region: 'africa', x: 95, y: 80, connections: [] },
  
  // China Cluster
  { id: 'research-vm', label: 'Research VM', type: 'vm', region: 'global', x: 50, y: 75, connections: ['wei-chen', 'lin-mei'] },
  { id: 'wei-chen', label: 'Wei Chen', type: 'agent', region: 'china', x: 35, y: 85, connections: ['shenzhen-ai', 'beijing-tech'] },
  { id: 'lin-mei', label: 'Lin Mei', type: 'agent', region: 'china', x: 50, y: 90, connections: ['vm-china', 'ip-corp'] },
  { id: 'jian-wei', label: 'Jian Wei', type: 'agent', region: 'china', x: 65, y: 85, connections: ['vm-china', 'factory-hub'] },
  { id: 'vm-china', label: 'VM: China Liaison', type: 'vm', region: 'china', x: 55, y: 70, connections: ['shanghai-mfg'] },
  { id: 'shenzhen-ai', label: 'Shenzhen AI Lab', type: 'partner', region: 'china', x: 20, y: 95, connections: [] },
  { id: 'beijing-tech', label: 'Beijing Tech Corp', type: 'partner', region: 'china', x: 40, y: 100, connections: [] },
  { id: 'ip-corp', label: 'IP Management Corp', type: 'partner', region: 'china', x: 50, y: 100, connections: [] },
  { id: 'factory-hub', label: 'Guangzhou Factory', type: 'partner', region: 'china', x: 70, y: 95, connections: [] },
  { id: 'shanghai-mfg', label: 'Shanghai Mfg Hub', type: 'partner', region: 'china', x: 75, y: 75, connections: [] },
  { id: 'shenzhen-city', label: 'Shenzhen, China', type: 'country', region: 'china', x: 25, y: 100, connections: [] },
];

const REGION_COLORS = {
  russia: '#ff2ec4',
  africa: '#5bf4a6',
  china: '#D97706',
  global: '#818CF8',
};

const TYPE_SIZES = {
  agent: 8,
  vm: 6,
  partner: 5,
  country: 7,
};

export default function StudExMindPage() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'russia' | 'africa' | 'china'>('all');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleNodes = selectedRegion === 'all' 
    ? NODES 
    : NODES.filter(n => n.region === selectedRegion || n.type === 'country' || n.type === 'vm');

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 3));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
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
        marginBottom: '24px',
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
            color: '#818CF8',
            margin: 0,
            textShadow: '0 0 20px rgba(129, 140, 248, 0.5)'
          }}>
            STUDEx MIND
          </h1>
          <span style={{ 
            background: '#818CF8',
            color: '#0F172A',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600
          }}>
            KNOWLEDGE GRAPH
          </span>
        </div>
        <p style={{ 
          color: '#94A3B8', 
          fontSize: '14px',
          margin: 0
        }}>
          Interactive network visualization of all agents, VMs, partners, and countries
        </p>
      </div>

      {/* Controls */}
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
        {/* Region Filter */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['all', 'russia', 'africa', 'china'] as const).map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              style={{
                padding: '10px 18px',
                background: selectedRegion === region 
                  ? (region === 'all' ? '#818CF8' : REGION_COLORS[region]) 
                  : 'transparent',
                border: `1px solid ${selectedRegion === region ? (region === 'all' ? '#818CF8' : REGION_COLORS[region]) : '#334155'}`,
                borderRadius: '8px',
                color: selectedRegion === region ? '#0F172A' : '#94A3B8',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '13px',
                transition: 'all 0.2s'
              }}
            >
              {region === 'all' ? 'All' : region.charAt(0).toUpperCase() + region.slice(1)}
            </button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => setZoom(prev => Math.min(prev * 1.2, 3))}
            style={{
              width: '36px',
              height: '36px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#F1F5F9',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            +
          </button>
          <span style={{ 
            fontSize: '13px', 
            color: '#94A3B8',
            minWidth: '50px',
            textAlign: 'center'
          }}>
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(prev => Math.max(prev * 0.8, 0.5))}
            style={{
              width: '36px',
              height: '36px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#F1F5F9',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            −
          </button>
          <button
            onClick={resetView}
            style={{
              padding: '8px 16px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#94A3B8',
              fontSize: '12px',
              cursor: 'pointer',
              fontFamily: '"DM Sans", sans-serif'
            }}
          >
            Reset View
          </button>
        </div>
      </div>

      {/* Legend */}
      <div style={{ 
        display: 'flex', 
        gap: '24px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 10
      }}>
        <LegendItem color="#ff2ec4" label="Russia" />
        <LegendItem color="#5bf4a6" label="Africa" />
        <LegendItem color="#D97706" label="China" />
        <LegendItem color="#818CF8" label="Global" />
        <div style={{ 
          width: '12px', 
          height: '12px', 
          borderRadius: '50%', 
          background: '#fff',
          border: '2px solid #818CF8'
        }} />
        <span style={{ fontSize: '12px', color: '#94A3B8' }}>StudEx OS</span>
      </div>

      {/* Graph Container */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid #334155',
          borderRadius: '16px',
          height: '600px',
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* SVG Graph */}
        <svg
          width="100%"
          height="100%"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transformOrigin: 'center',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E293B" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Edges */}
          {visibleNodes.map((node) =>
            node.connections
              .filter(connId => visibleNodes.find(n => n.id === connId))
              .map((connId) => (
                <EdgeLine 
                  key={`${node.id}-${connId}`}
                  from={node}
                  to={visibleNodes.find(n => n.id === connId)!}
                  isHighlighted={hoveredNode?.id === node.id || hoveredNode?.id === connId}
                />
              ))
          )}

          {/* Nodes */}
          {visibleNodes.map((node) => (
            <GraphNode 
              key={node.id}
              node={node}
              isHovered={hoveredNode?.id === node.id}
              onHover={setHoveredNode}
            />
          ))}
        </svg>

        {/* Hovered Node Info */}
        {hoveredNode && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            background: 'rgba(30, 41, 59, 0.95)',
            border: `1px solid ${REGION_COLORS[hoveredNode.region || 'global']}`,
            borderRadius: '12px',
            padding: '16px',
            minWidth: '200px',
            boxShadow: `0 0 30px ${REGION_COLORS[hoveredNode.region || 'global']}30`
          }}>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#F1F5F9', marginBottom: '8px' }}>
              {hoveredNode.label}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>
              Type: {hoveredNode.type}
            </div>
            <div style={{ fontSize: '12px', color: REGION_COLORS[hoveredNode.region || 'global'] }}>
              Region: {hoveredNode.region || 'Global'}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '8px' }}>
              Connections: {hoveredNode.connections.length}
            </div>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div style={{ 
        display: 'flex', 
        gap: '24px',
        marginTop: '24px',
        position: 'relative',
        zIndex: 10
      }}>
        <StatPill label="Total Nodes" value={NODES.length} />
        <StatPill label="Connections" value={NODES.reduce((acc, n) => acc + n.connections.length, 0) / 2} />
        <StatPill label="Regions" value={3} />
        <StatPill label="Partners" value={NODES.filter(n => n.type === 'partner').length} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 4px currentColor); }
          50% { filter: drop-shadow(0 0 8px currentColor); }
        }
      `}</style>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ 
        width: '12px', 
        height: '12px', 
        borderRadius: '50%', 
        background: color,
        boxShadow: `0 0 8px ${color}`
      }} />
      <span style={{ fontSize: '12px', color: '#94A3B8' }}>{label}</span>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: number }) {
  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.6)',
      border: '1px solid #334155',
      borderRadius: '20px',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <span style={{ fontSize: '14px', fontWeight: 600, color: '#818CF8' }}>{value}</span>
      <span style={{ fontSize: '12px', color: '#64748B' }}>{label}</span>
    </div>
  );
}

function GraphNode({ 
  node, 
  isHovered, 
  onHover 
}: { 
  node: Node; 
  isHovered: boolean;
  onHover: (node: Node | null) => void;
}) {
  const color = REGION_COLORS[node.region || 'global'];
  const size = TYPE_SIZES[node.type];
  const isCentral = node.id === 'studex-os';
  
  return (
    <g
      onMouseEnter={() => onHover(node)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'pointer' }}
    >
      {/* Outer Glow */}
      <circle
        cx={`${node.x}%`}
        cy={`${node.y}%`}
        r={size + 3}
        fill="none"
        stroke={color}
        strokeWidth={isHovered ? 2 : 1}
        opacity={isHovered ? 0.6 : 0.2}
        style={{ transition: 'all 0.2s' }}
      />
      
      {/* Main Circle */}
      <circle
        cx={`${node.x}%`}
        cy={`${node.y}%`}
        r={size}
        fill={isCentral ? '#fff' : color}
        fillOpacity={isCentral ? 1 : 0.8}
        stroke={isCentral ? '#818CF8' : color}
        strokeWidth={isCentral ? 3 : 1.5}
        style={{ 
          transition: 'all 0.2s',
          filter: isHovered ? `drop-shadow(0 0 8px ${color})` : 'none'
        }}
      />
      
      {/* Label */}
      <text
        x={`${node.x}%`}
        y={`${node.y + size + 4}%`}
        textAnchor="middle"
        fontSize="2.5"
        fill={color}
        fontFamily="monospace"
        opacity={isHovered ? 1 : 0.7}
        style={{ transition: 'opacity 0.2s' }}
      >
        {node.label.length > 15 ? node.label.slice(0, 15) + '...' : node.label}
      </text>
    </g>
  );
}

function EdgeLine({ 
  from, 
  to, 
  isHighlighted 
}: { 
  from: Node; 
  to: Node;
  isHighlighted: boolean;
}) {
  return (
    <line
      x1={`${from.x}%`}
      y1={`${from.y}%`}
      x2={`${to.x}%`}
      y2={`${to.y}%`}
      stroke={REGION_COLORS[from.region || 'global']}
      strokeWidth={isHighlighted ? 1.5 : 0.5}
      opacity={isHighlighted ? 0.8 : 0.2}
      style={{ transition: 'all 0.2s' }}
    />
  );
}

function MatrixRainBackground() {
  useEffect(() => {
    const canvas = document.getElementById('studexmind-matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'KNOWLEDGEGRAPH🧠NETWORK';
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#818CF8';
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
      id="studexmind-matrix-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.1
      }}
    />
  );
}
