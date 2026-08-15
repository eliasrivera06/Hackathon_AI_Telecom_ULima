import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

export default function ChatInput({ onSendMessage, isLoading }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSendMessage(text.trim());
    setText('');
  };

  return (
    <div className="p-2.5 sm:p-3 bg-white border-t border-slate-200/80 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] w-full">
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        
        {/* Attach file button */}
        <button
          type="button"
          className="absolute left-3 text-slate-400 hover:text-slate-600 transition-colors p-1"
          title="Adjuntar archivo"
        >
          <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe tu consulta sobre tu recibo a Lucía..."
          disabled={isLoading}
          className="w-full pl-10 sm:pl-11 pr-12 sm:pr-14 py-3 sm:py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition-all font-sans focus:border-[#019df4] focus:bg-white focus:ring-2 focus:ring-[#019df4]/15"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          aria-label="Enviar mensaje"
          className="absolute right-1.5 sm:right-2 p-2 sm:p-2.5 rounded-xl text-white transition-all disabled:opacity-40 hover:scale-105 active:scale-95 cursor-pointer shadow-sm disabled:hover:scale-100 disabled:cursor-not-allowed"
          style={{ 
            background: 'linear-gradient(135deg, #00A859, #019df4)',
            boxShadow: '0 2px 8px rgba(1,157,244,0.30)'
          }}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}