import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ChatSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determinar la vista activa basándose en la URL
  let activeView = 'web';
  if (location.pathname.includes('/chat-cel')) activeView = 'cel';
  if (location.pathname.includes('/chat-wasap')) activeView = 'wasap';

  // TODO: Asegurarse de que estas 3 URLs estén configuradas en el archivo .env
  // VITE_N8N_WEBHOOK_URL_WEB, VITE_N8N_WEBHOOK_URL_CEL, VITE_N8N_WEBHOOK_URL_WASAP

  return (
    <div className="absolute top-2 right-2 z-[999] flex bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <button
        onClick={() => navigate('/chat-web')}
        className={`px-4 py-1.5 text-sm font-semibold transition-colors ${activeView === 'web' ? 'bg-[#019df4] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        Web
      </button>
      <button
        onClick={() => navigate('/chat-cel')}
        className={`px-4 py-1.5 text-sm font-semibold border-l border-r border-gray-200 transition-colors ${activeView === 'cel' ? 'bg-[#019df4] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        Cel
      </button>
      <button
        onClick={() => navigate('/chat-wasap')}
        className={`px-4 py-1.5 text-sm font-semibold transition-colors ${activeView === 'wasap' ? 'bg-[#019df4] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        Wasap
      </button>
    </div>
  );
}
