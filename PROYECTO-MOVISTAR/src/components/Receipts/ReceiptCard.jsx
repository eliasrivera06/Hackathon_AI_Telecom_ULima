import React from 'react';
import MovistarLogo from '../../assets/images/MovistarLogo.svg';
import { useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, Calendar, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { billingOverview, currentPlan } from '../../data/mockData';

export default function ReceiptCard() {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl bg-white border border-movistar-gray-border shadow-movistar-lg overflow-hidden transition-all hover:shadow-movistar-blue-glow">

      {/* Header Banner — gradiente azul */}
      <div className="p-6 text-white relative" style={{ background: 'linear-gradient(90deg, #013d5e 0%, #019df4 100%)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-12">
              <img src={MovistarLogo} alt="Logo Movistar" className="h-9 w-auto object-contain brightness-0 invert" />
            </div>
            <div>
              <span className="text-xs text-white/60 uppercase tracking-widest font-semibold block">Tu Servicio Contratado</span>
              <h3 className="text-lg font-bold text-white font-sans">{currentPlan.name}</h3>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-movistar-green/40 bg-movistar-green/20 text-white">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {currentPlan.status}
          </span>
        </div>
      </div>

      {/* Billing Metrics */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Próximo Recibo — azul */}
          <div className="p-4 rounded-2xl flex flex-col"
            style={{ background: 'rgba(1,157,244,0.07)', border: '1px solid rgba(1,157,244,0.20)' }}>
            <span className="text-xs font-bold uppercase tracking-wide mb-1 flex items-center gap-1"
              style={{ color: '#019df4' }}>
              <Calendar className="w-3.5 h-3.5" />
              Próximo Recibo
            </span>
            <span className="text-3xl font-extrabold font-sans" style={{ color: '#013d5e' }}>
              S/ {billingOverview.nextBillAmount}
            </span>
            <span className="text-[11px] text-slate-500 font-medium mt-1">Vence el {billingOverview.nextDueDate}</span>
          </div>

          {/* Último Recibo — gris neutro */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              Último Recibo
            </span>
            <span className="text-3xl font-extrabold text-slate-700 font-sans">S/ {billingOverview.lastBillAmount}</span>
            <span className="text-[11px] text-slate-500 font-medium mt-1">Emitido el {billingOverview.lastBillDate}</span>
          </div>

          {/* Variación — rosa */}
          <div className="p-4 rounded-2xl flex flex-col"
            style={{ background: 'rgba(225,60,128,0.07)', border: '1px solid rgba(225,60,128,0.20)' }}>
            <span className="text-xs font-bold uppercase tracking-wide mb-1 flex items-center gap-1"
              style={{ color: '#e13c80' }}>
              <TrendingUp className="w-3.5 h-3.5" />
              Variación Reciente
            </span>
            <span className="text-3xl font-extrabold font-sans" style={{ color: '#e13c80' }}>
              +{billingOverview.variation}
            </span>
            <span className="text-[11px] font-medium mt-1" style={{ color: '#e13c80' }}>Fin de promoción</span>
          </div>

        </div>

        {/* Callout */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 text-xs">
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(1,157,244,0.15)' }}>
            <Sparkles className="w-4 h-4" style={{ color: '#019df4' }} />
          </div>
          <div>
            <p className="font-bold text-slate-800">¿Quieres entender la diferencia de +S/20 en tu factura?</p>
            <p className="text-slate-500">Lucía AI ha preparado un análisis detallado y personalizado.</p>
          </div>
        </div>

        {/* Primary CTA — gradiente verde → azul → rosa */}
        <button
          onClick={() => navigate('/chat')}
          className="w-full py-4 px-6 rounded-2xl text-white font-extrabold text-base transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 group"
          style={{ background: 'linear-gradient(90deg, #00A859 0%, #019df4 50%, #e13c80 100%)', boxShadow: '0 0 24px rgba(1,157,244,0.30)' }}
        >
          <Sparkles className="w-5 h-5 text-yellow-200 group-hover:rotate-12 transition-transform" />
          <span>Explicar mi recibo con Lucía AI</span>
          <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>
    </div>
  );
}
