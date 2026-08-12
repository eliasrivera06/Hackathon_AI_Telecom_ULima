import React, { useState } from 'react';
import { Plus, Search, Sparkles, X, ChevronRight } from 'lucide-react';
import { chatHistory } from '../../data/mockData';

export default function ChatHistorySidebar({
  currentChatId,
  onSelectChat,
  onNewChat,
  isOpenMobile,
  onCloseMobile
}) {
  const [filter, setFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Todos', 'Recibos', 'Beneficios', 'Servicio'];

  const filteredHistory = chatHistory.filter((item) => {
    const matchesFilter = filter === 'Todos' || item.category === filter;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(1,61,94,0.60)', backdropFilter: 'blur(4px)' }}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-40 lg:z-0 w-80 bg-white border-r border-movistar-gray-border flex flex-col justify-between transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-4 flex-1 overflow-hidden flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #019df4, #e13c80)' }}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-sm" style={{ color: '#013d5e' }}>Historial de Consultas</h3>
            </div>
            <button onClick={onCloseMobile} className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* New Chat Button — verde */}
          <button
            onClick={() => { onNewChat(); if (onCloseMobile) onCloseMobile(); }}
            className="w-full py-2.5 px-3.5 rounded-xl text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
            style={{ background: '#00A859', boxShadow: '0 0 14px rgba(0,168,89,0.28)' }}
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Análisis con Lucía</span>
          </button>

          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en historial..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-movistar-gray text-xs text-slate-700 outline-none border border-transparent transition-all"
              onFocus={e => e.target.style.borderColor = '#019df4'}
              onBlur={e => e.target.style.borderColor = 'transparent'}
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors"
                style={
                  filter === cat
                    ? { background: 'linear-gradient(90deg, #019df4, #e13c80)', color: 'white' }
                    : { background: '#f1f5f9', color: '#64748b' }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* History Items */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
              Conversaciones Anteriores
            </p>

            {filteredHistory.map((item) => {
              const isSelected = item.id === currentChatId;
              return (
                <button
                  key={item.id}
                  onClick={() => { onSelectChat(item.id); if (onCloseMobile) onCloseMobile(); }}
                  className="w-full text-left p-3 rounded-xl transition-all border"
                  style={isSelected
                    ? { background: 'rgba(1,157,244,0.08)', borderColor: 'rgba(1,157,244,0.30)', color: '#013d5e' }
                    : { background: 'white', borderColor: 'transparent', color: '#374151' }
                  }
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs truncate max-w-[170px]">{item.title}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">{item.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mb-1.5">{item.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[9px] px-2 py-0.5 rounded-md font-bold"
                      style={
                        item.tag === 'Importante'
                          ? { background: 'rgba(225,60,128,0.12)', color: '#c0306b' }
                          : { background: '#f1f5f9', color: '#6b7280' }
                      }
                    >
                      {item.tag}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-movistar-gray border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Lucía Engine v2.4</span>
          <span className="font-bold flex items-center gap-1" style={{ color: '#00A859' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00A859' }}></span>
            Online
          </span>
        </div>
      </div>
    </>
  );
}
