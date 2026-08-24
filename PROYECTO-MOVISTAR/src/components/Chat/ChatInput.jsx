import React, { useState } from 'react';
import { Send, Paperclip, Globe } from 'lucide-react';

const LANGUAGE_OPTIONS = [
  { code: 'auto', label: 'Auto', flag: '🔍' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'qu', label: 'Quechua', flag: '🏔️' },
  { code: 'ay', label: 'Aymara', flag: '🌄' },
];

export default function ChatInput({ onSendMessage, isLoading }) {
  const [text, setText] = useState('');
  const [selectedLang, setSelectedLang] = useState('auto');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const currentLangOption = LANGUAGE_OPTIONS.find(l => l.code === selectedLang) || LANGUAGE_OPTIONS[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    // Pass the language override (null if 'auto' so detection kicks in)
    const langOverride = selectedLang === 'auto' ? null : selectedLang;
    onSendMessage(text.trim(), langOverride);
    setText('');
  };

  return (
    <div className="p-2.5 sm:p-3 bg-white border-t border-slate-200/80 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] w-full">
      <form onSubmit={handleSubmit} className="relative flex items-center w-full gap-1.5">
        
        {/* Attach file button */}
        <button
          type="button"
          className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 sm:p-2 shrink-0"
          title="Adjuntar archivo"
        >
          <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Language Selector */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1 px-2 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer hover:shadow-sm"
            style={{
              background: selectedLang === 'auto' 
                ? 'rgba(1,157,244,0.06)' 
                : 'linear-gradient(135deg, rgba(1,157,244,0.12), rgba(225,60,128,0.08))',
              borderColor: selectedLang === 'auto' ? 'rgba(1,157,244,0.20)' : '#019df4',
              color: '#013d5e',
            }}
            title="Seleccionar idioma"
          >
            <span className="text-sm">{currentLangOption.flag}</span>
            <span className="hidden sm:inline text-[10px]">{currentLangOption.label}</span>
            <Globe className="w-3 h-3 text-slate-400 sm:hidden" />
          </button>

          {/* Dropdown */}
          {showLangMenu && (
            <div 
              className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50 min-w-[140px] animate-in fade-in slide-in-from-bottom-2"
              style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
            >
              {LANGUAGE_OPTIONS.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setSelectedLang(lang.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                    selectedLang === lang.code 
                      ? 'bg-[#019df4]/10 text-[#013d5e]' 
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <span className="text-sm">{lang.flag}</span>
                  <span>{lang.label}</span>
                  {selectedLang === lang.code && (
                    <span className="ml-auto text-[#019df4] text-[10px] font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Text Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setShowLangMenu(false)}
          placeholder="Escribe tu consulta sobre tu recibo a Lucía..."
          disabled={isLoading}
          className="flex-1 min-w-0 px-3 sm:px-4 py-3 sm:py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition-all font-sans focus:border-[#019df4] focus:bg-white focus:ring-2 focus:ring-[#019df4]/15"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          aria-label="Enviar mensaje"
          className="p-2 sm:p-2.5 rounded-xl text-white transition-all disabled:opacity-40 hover:scale-105 active:scale-95 cursor-pointer shadow-sm disabled:hover:scale-100 disabled:cursor-not-allowed shrink-0"
          style={{ 
            background: 'linear-gradient(135deg, #00A859, #019df4)',
            boxShadow: '0 2px 8px rgba(1,157,244,0.30)'
          }}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Click-away overlay to close language menu */}
      {showLangMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowLangMenu(false)} 
        />
      )}
    </div>
  );
}