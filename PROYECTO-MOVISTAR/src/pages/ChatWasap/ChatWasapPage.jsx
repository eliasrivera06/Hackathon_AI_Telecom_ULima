import React from 'react';
import ChatSwitcher from '../ChatSwitcher/ChatSwitcher';

export default function ChatWasapPage() {
  // TODO: Conectar con webhook de n8n usando import.meta.env.VITE_N8N_WEBHOOK_URL_WASAP
  return (
    <div className="h-full w-full bg-[#E5DDD5] flex flex-col items-center justify-center font-sans relative">
      <ChatSwitcher />
      {/* Contenedor vacío por ahora */}
    </div>
  );
}
