import React, { useState } from 'react';
import { Send, Sparkles, Paperclip } from 'lucide-react';

export default function ChatInput({ onSendMessage, isLoading }) {
  const [text, setText] = useState('');

  const quickPrompts = [
    "¿Por qué aumentó S/ 20 mi recibo?",
    "Ver desglose de mi factura de Julio",
    "¿Qué promociones puedo aplicar a mi plan?"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSendMessage(text.trim());
    setText('');
  };

  return (
    <div className="p-4 bg-white border-t border-movistar-gray-border space-y-3">

      {/* Quick Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3" style={{ color: '#019df4' }} />
          Sugeridos:
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => !isLoading && onSendMessage(prompt)}
            disabled={isLoading}
            className="px-3 py-1 rounded-full text-xs font-medium border transition-all shrink-0 disabled:opacity-50"
            style={{
              background: idx % 2 === 0 ? 'rgba(1,157,244,0.07)' : 'rgba(225,60,128,0.07)',
              borderColor: idx % 2 === 0 ? 'rgba(1,157,244,0.25)' : 'rgba(225,60,128,0.25)',
              color: idx % 2 === 0 ? '#019df4' : '#e13c80',
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Row */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <button
          type="button"
          className="absolute left-3.5 text-slate-400 hover:text-slate-600 transition-colors p-1"
          title="Adjuntar archivo"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Pregúntale a Lucía sobre tu recibo de Movistar..."
          disabled={isLoading}
          className="w-full pl-12 pr-14 py-3.5 rounded-2xl bg-movistar-gray border border-transparent text-sm text-slate-800 outline-none transition-all font-sans"
          onFocus={e => { e.target.style.borderColor = '#019df4'; e.target.style.background = 'white'; }}
          onBlur={e => { e.target.style.borderColor = 'transparent'; e.target.style.background = ''; }}
        />

        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="absolute right-2.5 p-2.5 rounded-xl text-white transition-all disabled:opacity-40"
          style={{ background: 'linear-gradient(90deg, #00A859, #019df4)', boxShadow: '0 0 12px rgba(1,157,244,0.30)' }}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      <p className="text-[10px] text-center text-slate-400 font-medium">
        Lucía AI analiza tus facturas oficiales de Movistar · MVP listo para Gemini, n8n y Supabase.
      </p>
    </div>
  );
}
