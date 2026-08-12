import React from 'react';
import { Sparkles, History, RefreshCw } from 'lucide-react';
import { billingOverview, currentPlan } from '../../data/mockData';

export default function ChatHeader({ onToggleHistory, onResetChat }) {
  return (
    <div className="px-4 py-3 bg-white border-b border-movistar-gray-border flex items-center justify-between shadow-movistar-sm">

      {/* Left: History Toggle (mobile) + Lucía Identity */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleHistory}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-movistar-gray transition-colors"
          style={{ ':hover': { color: '#019df4' } }}
          title="Ver historial"
        >
          <History className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          {/* Lucía Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl text-white flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00A859 0%, #019df4 100%)', boxShadow: '0 0 14px rgba(1,157,244,0.35)' }}>
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white"
              style={{ background: '#00A859' }}></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-sm sm:text-base font-sans tracking-wide" style={{ color: '#013d5e' }}>
                Lucía
              </h2>
              <span className="px-2 py-0.5 rounded-full font-bold text-[10px] border text-white"
                style={{ background: 'linear-gradient(90deg, #019df4, #e13c80)', borderColor: 'transparent' }}>
                IA de Facturación
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Explicador de Recibos y Soluciones Comerciales
            </p>
          </div>
        </div>
      </div>

      {/* Right: Context + Reset */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex flex-col items-end text-right px-3 py-1 rounded-xl border"
          style={{ background: 'rgba(1,157,244,0.06)', borderColor: 'rgba(1,157,244,0.20)' }}>
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#019df4' }}>
            Contexto Activo
          </span>
          <span className="text-xs font-bold" style={{ color: '#013d5e' }}>
            {currentPlan.name} &bull; S/ {billingOverview.nextBillAmount}
          </span>
        </div>

        <button
          onClick={onResetChat}
          className="p-2 rounded-xl text-slate-400 hover:bg-movistar-gray transition-colors"
          title="Reiniciar conversación"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
