import React from 'react';
import { Sparkles, FileText, Gift, HelpCircle, Volume2 } from 'lucide-react';
import ReceiptComparisonCard from '../Receipts/ReceiptComparisonCard';

export default function MessageBubble({ message, onActionClick, onOpenDetailModal }) {
  const isUser = message.sender === 'user';

  const decodeHtmlEntities = (str) => {
    if (!str) return '';
    return str
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&#x27;/gi, "'")
      .replace(/&quot;/g, '"')
      .replace(/&#34;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  };

  // Detecta el idioma del mensaje para traducir labels
  const detectMsgLang = (text) => {
    if (!text) return 'es';
    const t = text.toLowerCase();
    // Patrones básicos Quechua
    if (/\b(ñuqa|qam|kay|chay|wasi|yaku|runa|pacha|munay|rimay|tukuy|sumaq|allillanchu|imapitaq|reciboyki|killapaq)\b/.test(t)) return 'qu';
    // Patrones básicos Aymara
    if (/\b(nayanxa|jichhüru|kamisaraki|yanapt|recibomata|planamata|ukax|tuqita)\b/.test(t)) return 'ay';
    return 'es';
  };

  const LISTEN_LABELS = {
    es: 'Escuchar mensaje',
    qu: 'Uyariy willakuyta',
    ay: 'Uyañjam parlañaru',
  };

  const TTS_LANGS = {
    es: 'es-PE',
    qu: 'es-PE', // Quechua no tiene voz nativa, usar español peruano como fallback
    ay: 'es-PE',
  };

  const msgLang = isUser ? 'es' : detectMsgLang(message.text || '');

  const handleSpeak = (text) => {
    if (!text) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = decodeHtmlEntities(text)
        .replace(/Luc[ií]a/gi, 'Lucio')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = TTS_LANGS[msgLang] || 'es-PE';
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Web Speech API is not supported in this browser.');
    }
  };

  const formatText = (text) => {
    if (!text) return null;
    const decoded = decodeHtmlEntities(text);
    const cleanText = decoded.replace(/Luc[ií]a/gi, (match) => {
      if (match === match.toUpperCase()) return 'LUCIO';
      if (match[0] === 'L') return 'Lucio';
      return 'lucio';
    });
    const parts = cleanText.split(/(\*\*.*?\*\*|\`.*?\`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <span key={i} className="font-normal break-words">{part.slice(2, -2)}</span>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code 
            key={i} 
            className="px-1.5 py-0.5 rounded font-mono text-xs border border-slate-200 break-all inline-block"
            style={{ background: 'rgba(1,157,244,0.08)', color: '#019df4' }}
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  const getActionStyles = (action) => {
    if (action.primary) {
      return {
        background: 'linear-gradient(90deg, #00A859, #019df4)',
        color: 'white',
        boxShadow: '0 0 14px rgba(1,157,244,0.28)',
        border: 'none',
      };
    }
    // Secondary - rosa
    return {
      background: 'rgba(225,60,128,0.08)',
      color: '#c0306b',
      border: '1px solid rgba(225,60,128,0.30)',
    };
  };

  const getActionIcon = (iconName) => {
    switch (iconName) {
      case 'FileText': return <FileText className="w-4 h-4 shrink-0" />;
      case 'Sparkles': return <Gift className="w-4 h-4 shrink-0" />;
      case 'HelpCircle': return <HelpCircle className="w-4 h-4 shrink-0" />;
      default: return <Sparkles className="w-4 h-4 shrink-0" />;
    }
  };

  // User message bubble
  if (isUser) {
    return (
      <div id={message.id} className="flex justify-end mb-6 animate-slide-up w-full">
        <div className="flex items-end gap-2.5 max-w-[90%] sm:max-w-[75%] min-w-0">
          <div 
            className="text-white p-3.5 sm:p-4 rounded-2xl rounded-tr-none shadow-movistar-md text-sm font-medium leading-relaxed break-words [overflow-wrap:anywhere] min-w-0"
            style={{ background: 'linear-gradient(135deg, #013d5e, #019df4)' }}
          >
            <div className="whitespace-pre-wrap">{message.text}</div>
            <div className="text-[10px] text-white/60 text-right mt-1 font-sans">{message.timestamp}</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold shrink-0 text-xs shadow-sm">
            CR
          </div>
        </div>
      </div>
    );
  }

  // Lucio AI message bubble (100% Real from Make)
  return (
    <div id={message.id} className="flex justify-start mb-6 animate-slide-up w-full">
      <div className="flex items-start gap-2.5 sm:gap-3 w-full max-w-[98%] sm:max-w-[88%] lg:max-w-[82%] min-w-0">

        {/* Lucio Avatar */}
        <div 
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl text-white flex items-center justify-center font-bold shrink-0 mt-0.5 ring-2 ring-white"
          style={{ background: 'linear-gradient(135deg, #00A859, #019df4)', boxShadow: '0 0 14px rgba(1,157,244,0.35)' }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
        </div>

        <div className="flex-1 min-w-0 space-y-2.5 sm:space-y-3">

          {/* Agent Tag */}
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="font-bold text-sm" style={{ color: '#013d5e' }}>{message.agentName || 'Lucio'}</span>
            <span 
              className="text-[10px] px-2 py-0.5 rounded-full font-bold border flex items-center gap-1 shrink-0"
              style={{ background: 'linear-gradient(90deg, rgba(0,168,89,0.12), rgba(1,157,244,0.12))', color: '#019df4', borderColor: 'rgba(1,157,244,0.25)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00A859' }}></span>
              {message.agentRole || 'Asistente de Recibos Movistar'}
            </span>
            <span className="text-[10px] text-slate-400 font-medium ml-auto">{message.timestamp}</span>
          </div>

          {/* Message Card */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl rounded-tl-none border border-movistar-gray-border text-slate-700 text-sm leading-relaxed chat-bubble-shadow whitespace-pre-wrap break-words [overflow-wrap:anywhere] min-w-0 overflow-hidden">
            <div className="space-y-1">
              {formatText(message.text)}
            </div>

            <div className="mt-3 flex justify-end">
              <button 
                onClick={() => handleSpeak(message.text)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#019df4] transition-colors py-1 px-2 rounded-lg hover:bg-blue-50/50"
                title={LISTEN_LABELS[msgLang] || LISTEN_LABELS.es}
              >
                <Volume2 className="w-4 h-4" />
                {LISTEN_LABELS[msgLang] || LISTEN_LABELS.es}
              </button>
            </div>

            {/* Visual Comparison Card - Only if explicitly passed from Make */}
            {message.hasVisualComparison && message.comparisonData && (
              <div className="mt-3 w-full min-w-0 overflow-hidden">
                <ReceiptComparisonCard data={message.comparisonData} onOpenDetails={onOpenDetailModal} />
              </div>
            )}

            {/* Action Chips - Only if passed from Make */}
            {message.suggestedActions && message.suggestedActions.length > 0 && (
              <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Acciones sugeridas:
                </span>
                <div className="flex flex-wrap gap-2">
                  {message.suggestedActions.map((action) => (
                    <button
                      key={action.id || action.label}
                      onClick={() => onActionClick && onActionClick(action.id || action.action)}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-left"
                      style={getActionStyles(action)}
                    >
                      {getActionIcon(action.icon)}
                      <span className="leading-tight">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}