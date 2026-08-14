import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ChatSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determinar la vista activa basándose en la URL
  let activeView = 'web';
  if (location.pathname.includes('/chat-cel') || location.pathname === '/login') {
    activeView = 'cel';
  } else if (location.pathname.includes('/chat-wasap')) {
    activeView = 'wasap';
  } else {
    activeView = 'web';
  }

  return (
    <div className="fixed top-3 right-4 z-[9999] flex bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-slate-200 overflow-hidden">
      <button
        onClick={() => navigate('/')}
        className={`px-4 py-1.5 text-sm font-semibold transition-colors cursor-pointer ${
          activeView === 'web' ? 'bg-[#019df4] text-white' : 'text-slate-600 hover:bg-slate-100'
        }`}
      >
        Web
      </button>
      <button
        onClick={() => navigate('/login')}
        className={`px-4 py-1.5 text-sm font-semibold border-l border-r border-slate-200 transition-colors cursor-pointer ${
          activeView === 'cel' ? 'bg-[#019df4] text-white' : 'text-slate-600 hover:bg-slate-100'
        }`}
      >
        Cel
      </button>
      <button
        onClick={() => navigate('/chat-wasap')}
        className={`px-4 py-1.5 text-sm font-semibold transition-colors cursor-pointer ${
          activeView === 'wasap' ? 'bg-[#019df4] text-white' : 'text-slate-600 hover:bg-slate-100'
        }`}
      >
        Wasap
      </button>
    </div>
  );
}
