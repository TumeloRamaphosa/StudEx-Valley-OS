'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  channel: 'lark' | 'slack' | 'discord';
  sender: string;
  senderColor: string;
  content: string;
  timestamp: string;
  isOwn?: boolean;
}

const MOCK_MESSAGES: Record<string, Message[]> = {
  lark: [
    { id: '1', channel: 'lark', sender: 'Yuri Kozlov', senderColor: '#ff2ec4', content: 'Gentlemen, the Moscow pharma tour dates are confirmed for September 15-22. We need the full briefing deck by August 30.', timestamp: '09:42' },
    { id: '2', channel: 'lark', sender: 'You', senderColor: '#5bf4a6', content: 'Acknowledged. Viktor is already preparing the preliminary materials. What about the St. Petersburg extension?', timestamp: '09:45', isOwn: true },
    { id: '3', channel: 'lark', sender: 'Natalia Fleming', senderColor: '#D97706', content: 'St. Petersburg is tentatively scheduled for Sept 23-25. Waiting on final venue confirmation from the Hermitage Business Center.', timestamp: '09:48' },
    { id: '4', channel: 'lark', sender: 'Yuri Kozlov', senderColor: '#ff2ec4', content: 'Excellent. Elena, please add St. Pete to the itinerary and coordinate with our partners at Pharmacia Norte.', timestamp: '09:50' },
    { id: '5', channel: 'lark', sender: 'Elena Sokolova', senderColor: '#ff2ec4', content: 'On it. I will sync with the team and have an updated draft by EOD.', timestamp: '09:52' },
  ],
  slack: [
    { id: '1', channel: 'slack', sender: 'Amara Diallo', senderColor: '#5bf4a6', content: 'The Lagos distributor meeting went exceptionally well. They are ready to commit to a 3-year exclusive distribution agreement.', timestamp: '10:15' },
    { id: '2', channel: 'slack', sender: 'You', senderColor: '#ff2ec4', content: 'Fantastic news! What are the next steps for contract review?', timestamp: '10:18', isOwn: true },
    { id: '3', channel: 'slack', sender: 'Amara Diallo', senderColor: '#5bf4a6', content: 'Their legal team will send the draft MoU by Friday. Fatima is already preparing our compliance checklist for NAFDAC registration.', timestamp: '10:20' },
    { id: '4', channel: 'slack', sender: 'Thabo Mokoena', senderColor: '#5bf4a6', content: 'Reminder: Johannesburg Pharma Expo is in 6 weeks. We need booth designs and promotional materials approved by next Tuesday.', timestamp: '10:25' },
    { id: '5', channel: 'slack', sender: 'You', senderColor: '#ff2ec4', content: 'Can we get a preliminary budget estimate for the expo by Wednesday?', timestamp: '10:27', isOwn: true },
  ],
  discord: [
    { id: '1', channel: 'discord', sender: 'Wei Chen', senderColor: '#D97706', content: 'The Shenzhen AI lab has completed their due diligence report. Ready for your review.', timestamp: '11:30' },
    { id: '2', channel: 'discord', sender: 'You', senderColor: '#ff2ec4', content: 'Great timing. Can you summarize the key findings for the executive team?', timestamp: '11:32', isOwn: true },
    { id: '3', channel: 'discord', sender: 'Wei Chen', senderColor: '#D97706', content: 'Summary: Strong IP portfolio, 12 active patents, established B2B channels. Recommendation: Proceed with partnership discussions.', timestamp: '11:35' },
    { id: '4', channel: 'discord', sender: 'Lin Mei', senderColor: '#D97706', content: 'I have reviewed the contract terms from Beijing Tech Corp. There are some concerns about the technology transfer clauses. We should schedule a call.', timestamp: '11:40' },
    { id: '5', channel: 'discord', sender: 'Wei Chen', senderColor: '#D97706', content: 'I will set up a video call for Thursday 14:00 SAST. The Beijing team is available.', timestamp: '11:42' },
  ],
};

const CHANNEL_CONFIG = {
  lark: { name: 'Lark', icon: '📱', color: '#ff2ec4', bgColor: 'rgba(255, 46, 196, 0.1)' },
  slack: { name: 'Slack', icon: '💬', color: '#5bf4a6', bgColor: 'rgba(91, 244, 166, 0.1)' },
  discord: { name: 'Discord', icon: '🎮', color: '#D97706', bgColor: 'rgba(217, 119, 6, 0.1)' },
};

export default function ChatPage() {
  const [activeChannel, setActiveChannel] = useState<'lark' | 'slack' | 'discord'>('lark');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES.lark);
  const [notifications, setNotifications] = useState<Record<string, number>>({ lark: 0, slack: 2, discord: 1 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages(MOCK_MESSAGES[activeChannel]);
    setNotifications(prev => ({ ...prev, [activeChannel]: 0 }));
  }, [activeChannel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      channel: activeChannel,
      sender: 'You',
      senderColor: '#ff2ec4',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      isOwn: true,
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ 
      fontFamily: '"DM Sans", sans-serif',
      background: '#0F172A',
      minHeight: '100vh',
      color: '#E2E8F0',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Matrix Rain Background */}
      <MatrixRainBackground />

      {/* Header */}
      <div style={{ 
        padding: '20px 24px',
        borderBottom: '1px solid #1E293B',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 700, 
            color: '#ff2ec4',
            margin: 0,
            textShadow: '0 0 20px rgba(255, 46, 196, 0.5)'
          }}>
            UNIFIED COMMUNICATIONS
          </h1>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: 'rgba(91, 244, 166, 0.1)',
            border: '1px solid rgba(91, 244, 166, 0.3)',
            borderRadius: '20px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#5bf4a6',
              boxShadow: '0 0 10px rgba(91, 244, 166, 0.6)',
              animation: 'pulse 2s infinite'
            }} />
            <span style={{ fontSize: '12px', color: '#5bf4a6', fontWeight: 500 }}>
              3 Channels Connected
            </span>
          </div>
        </div>
      </div>

      {/* Channel Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '8px',
        padding: '16px 24px',
        borderBottom: '1px solid #1E293B',
        position: 'relative',
        zIndex: 10
      }}>
        {(Object.keys(CHANNEL_CONFIG) as Array<keyof typeof CHANNEL_CONFIG>).map((channel) => {
          const config = CHANNEL_CONFIG[channel];
          const isActive = activeChannel === channel;
          const notifCount = notifications[channel];
          
          return (
            <button
              key={channel}
              onClick={() => setActiveChannel(channel)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 24px',
                background: isActive ? config.bgColor : 'transparent',
                border: `1px solid ${isActive ? config.color : '#334155'}`,
                borderRadius: '12px',
                color: isActive ? config.color : '#94A3B8',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '14px',
                transition: 'all 0.2s',
                position: 'relative'
              }}
            >
              <span style={{ fontSize: '18px' }}>{config.icon}</span>
              {config.name}
              {notifCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: '#ff2ec4',
                  color: '#0F172A',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700
                }}>
                  {notifCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Messages Area */}
      <div style={{ 
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Channel Indicator */}
        <div style={{
          padding: '12px 24px',
          background: CHANNEL_CONFIG[activeChannel].bgColor,
          borderBottom: '1px solid #1E293B',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '4px',
            height: '24px',
            background: CHANNEL_CONFIG[activeChannel].color,
            borderRadius: '2px'
          }} />
          <span style={{
            fontSize: '14px',
            fontWeight: 600,
            color: CHANNEL_CONFIG[activeChannel].color
          }}>
            {CHANNEL_CONFIG[activeChannel].icon} {CHANNEL_CONFIG[activeChannel].name}
          </span>
          <span style={{ color: '#64748B', fontSize: '13px' }}>
            {activeChannel === 'lark' && 'Moscow • St. Petersburg partners'}
            {activeChannel === 'slack' && 'Lagos • Johannesburg • Nairobi'}
            {activeChannel === 'discord' && 'Shenzhen • Beijing • Shanghai AI'}
          </span>
        </div>

        {/* Message List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #1E293B',
          background: 'rgba(15, 23, 42, 0.9)',
          display: 'flex',
          gap: '12px'
        }}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${CHANNEL_CONFIG[activeChannel].name}...`}
            style={{
              flex: 1,
              background: '#1E293B',
              border: `1px solid ${CHANNEL_CONFIG[activeChannel].color}40`,
              borderRadius: '12px',
              padding: '14px 18px',
              color: '#F1F5F9',
              fontSize: '14px',
              fontFamily: '"DM Sans", sans-serif',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = CHANNEL_CONFIG[activeChannel].color}
            onBlur={(e) => e.target.style.borderColor = `${CHANNEL_CONFIG[activeChannel].color}40`}
          />
          <button
            onClick={handleSend}
            style={{
              background: CHANNEL_CONFIG[activeChannel].color,
              border: 'none',
              borderRadius: '12px',
              padding: '14px 24px',
              color: '#0F172A',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: '"DM Sans", sans-serif',
              transition: 'transform 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Send
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Global CSS for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1E293B; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}</style>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: message.isOwn ? 'flex-end' : 'flex-start',
      maxWidth: '75%'
    }}>
      {/* Sender Info */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '6px'
      }}>
        {!message.isOwn && (
          <>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: message.senderColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700,
              color: '#0F172A'
            }}>
              {message.sender.split(' ').map(n => n[0]).join('')}
            </div>
            <span style={{
              fontSize: '13px',
              fontWeight: 600,
              color: message.senderColor
            }}>
              {message.sender}
            </span>
          </>
        )}
        <span style={{
          fontSize: '11px',
          color: '#64748B'
        }}>
          {message.timestamp}
        </span>
      </div>

      {/* Message Content */}
      <div style={{
        background: message.isOwn 
          ? 'rgba(255, 46, 196, 0.15)' 
          : 'rgba(30, 41, 59, 0.8)',
        border: `1px solid ${message.isOwn ? 'rgba(255, 46, 196, 0.3)' : '#334155'}`,
        borderRadius: message.isOwn ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        padding: '12px 16px',
        color: '#F1F5F9',
        fontSize: '14px',
        lineHeight: 1.5
      }}>
        {message.content}
      </div>
    </div>
  );
}

function MatrixRainBackground() {
  useEffect(() => {
    const canvas = document.getElementById('chat-matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 12;
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
      id="chat-matrix-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.2
      }}
    />
  );
}
