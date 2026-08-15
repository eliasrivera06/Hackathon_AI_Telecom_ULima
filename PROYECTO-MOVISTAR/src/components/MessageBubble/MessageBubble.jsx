import React from 'react';
import { Sparkles, FileText, Gift, HelpCircle } from 'lucide-react';
import ReceiptComparisonCard from '../Receipts/ReceiptComparisonCard';

export default function MessageBubble({ message, onActionClick, onOpenDetailModal }) {
  const isUser = message.sender === 'user';

  const formatText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*|\`.*?\`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold" style={{ color: '#013d5e' }}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="px-1.5 py-0.5 rounded font-mono text-xs border border-slate-200"
          style={{ background: 'rgba(1,157,244,0.08)', color: '#019df4' }}>{part.slice(1, -1)}</code>;
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
      case 'FileText': return <FileText className="w-4 h-4" />;
      case 'Sparkles': return <Gift className="w-4 h-4" />;
      case 'HelpCircle': return <HelpCircle className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  // User message bubble
  if (isUser) {
    return (
      <div className="flex justify-end mb-6 animate-slide-up">
        <div className="flex items-end gap-2.5 max-w-[85%] sm:max-w-[70%]">
          <div className="text-white p-4 rounded-2xl rounded-tr-none shadow-movistar-md text-sm font-medium leading-relaxed"
            style={{ background: 'linear-gradient(135deg, #013d5e, #019df4)' }}>
            {message.text}
            <div className="text-[10px] text-white/50 text-right mt-1 font-sans">{message.timestamp}</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold shrink-0 text-xs shadow-sm">
            CR
          </div>
        </div>
      </div>
    );
  }

  // Lucía AI message bubble
  return (
    <div className="flex justify-start mb-6 animate-slide-up">
      <div className="flex items-start gap-3 max-w-[95%] sm:max-w-[85%] lg:max-w-[78%]">

        {/* Lucía Avatar - gradiente verde -> azul */}
        <div className="w-10 h-10 rounded-2xl text-white flex items-center justify-center font-bold shrink-0 mt-1 ring-2 ring-white"
          style={{ background: 'linear-gradient(135deg, #00A859, #019df4)', boxShadow: '0 0 14px rgba(1,157,244,0.35)' }}>
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
        </div>

        <div className="flex-1 space-y-3">

          {/* Agent Tag */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm" style={{ color: '#013d5e' }}>{message.agentName || 'Lucía'}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold border flex items-center gap-1"
              style={{ background: 'linear-gradient(90deg, rgba(0,168,89,0.12), rgba(1,157,244,0.12))', color: '#019df4', borderColor: 'rgba(1,157,244,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00A859' }}></span>
              {message.agentRole || 'Asistente de Recibos Movistar'}
            </span>
            <span className="text-[10px] text-slate-400 font-medium ml-auto">{message.timestamp}</span>
          </div>

          {/* Message Card */}
          <div className="bg-white p-5 rounded-2xl rounded-tl-none border border-movistar-gray-border text-slate-700 text-sm leading-relaxed chat-bubble-shadow whitespace-pre-line">
            {formatText(message.text)}

            {/* Visual Comparison Card embedded */}
            {message.hasVisualComparison && (
              <ReceiptComparisonCard onOpenDetails={onOpenDetailModal} />
            )}

            {/* Action Chips */}
            {message.suggestedActions && message.suggestedActions.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Acciones sugeridas por Lucía:
                </span>
                <div className="flex flex-wrap gap-2">
                  {message.suggestedActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => onActionClick && onActionClick(action.id)}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                      style={getActionStyles(action)}
                    >
                      {getActionIcon(action.icon)}
                      <span>{action.label}</span>
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