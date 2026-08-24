import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Wifi, Shield, ChevronRight, Zap, ArrowUpRight } from 'lucide-react';
import { userProfile, currentPlan, billingOverview } from '../../data/mockData';
import ReceiptCard from '../../components/Receipts/ReceiptCard';
import ChatSwitcher from '../ChatSwitcher/ChatSwitcher';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-10 relative">
      <ChatSwitcher />

      {/* Welcome Banner */}
      <div className="rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-movistar-lg"
        style={{ background: 'linear-gradient(135deg, #013d5e 0%, #019df4 70%, #e13c80 130%)' }}>
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(225, 60, 128, 0.20)' }} />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border border-white/20"
              style={{ background: 'rgba(1,157,244,0.20)', color: '#ffffff' }}>
              <span className="w-2 h-2 rounded-full animate-ping" style={{ background: '#00A859' }}></span>
              Mi Movistar &bull; Portal del Cliente
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-sans text-white tracking-tight">
              Hola, {userProfile.name}
            </h1>
            <p className="text-white/70 text-sm max-w-xl leading-relaxed">
              Bienvenido a tu resumen de servicios. Revisa tu consumo, estado de línea y la explicación de tu factura con <strong className="text-white">Lucio AI</strong>.
            </p>
          </div>

          {/* CTA → Chat */}
          <button
            onClick={() => navigate('/chat-web')}
            className="px-6 py-3.5 rounded-2xl text-white font-extrabold text-sm transition-all transform hover:-translate-y-0.5 shrink-0 flex items-center justify-center gap-2 border border-white/20"
            style={{ background: 'linear-gradient(90deg, #00A859, #e13c80)', boxShadow: '0 0 20px rgba(225,60,128,0.30)' }}
          >
            <Sparkles className="w-4 h-4 text-yellow-200" />
            <span>Consultar con Lucio AI</span>
          </button>
        </div>
      </div>

      {/* Main Billing Card */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-extrabold tracking-tight" style={{ color: '#019df4' }}>
            Resumen de Facturación Reciente
          </h2>
          <span className="text-xs font-bold px-3 py-1 rounded-full border"
            style={{ background: 'rgba(225,60,128,0.10)', color: '#e13c80', borderColor: 'rgba(225,60,128,0.30)' }}>
            Análisis de variación listo
          </span>
        </div>
        <ReceiptCard />
      </div>

      {/* Secondary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1: Internet */}
        <div className="p-6 rounded-3xl bg-white border border-movistar-gray-border shadow-movistar-sm space-y-4 hover:shadow-movistar-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(1,157,244,0.10)' }}>
            <Wifi className="w-6 h-6" style={{ color: '#019df4' }} />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Conexión Fibra</span>
            <h4 className="text-base font-bold text-slate-800">{currentPlan.speed}</h4>
            <p className="text-xs text-slate-500 mt-1">Módem {currentPlan.modem} en estado óptimo.</p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold"
            style={{ color: '#019df4' }}>
            <span>Test de Velocidad</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 2: Security */}
        <div className="p-6 rounded-3xl bg-white border border-movistar-gray-border shadow-movistar-sm space-y-4 hover:shadow-movistar-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(0,168,89,0.10)' }}>
            <Shield className="w-6 h-6 text-movistar-green" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Protección de Red</span>
            <h4 className="text-base font-bold text-slate-800">Smart WiFi Shield</h4>
            <p className="text-xs text-slate-500 mt-1">Bloqueo automático de amenazas activo.</p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-movistar-green">
            <span>Ver Dispositivos</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 3: Savings — rosa accent */}
        <div className="p-6 rounded-3xl bg-white border border-movistar-gray-border shadow-movistar-sm space-y-4 hover:shadow-movistar-md transition-shadow"
          style={{ borderLeft: '3px solid #e13c80' }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(225,60,128,0.10)' }}>
            <Zap className="w-6 h-6" style={{ color: '#e13c80' }} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: '#e13c80' }}>
              Oportunidades de Ahorro
            </span>
            <h4 className="text-base font-bold text-slate-800">3 Promociones Disponibles</h4>
            <p className="text-xs text-slate-500 mt-1">Descuentos de hasta S/ 15/mes por renovación.</p>
          </div>
          <button
            onClick={() => navigate('/chat-web')}
            className="w-full py-2 px-3 rounded-xl text-white font-bold text-xs transition-colors flex items-center justify-between"
            style={{ background: 'linear-gradient(90deg, #019df4, #e13c80)' }}
          >
            <span>Ver Beneficios con Lucio</span>
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>
    </div>
  );
}
