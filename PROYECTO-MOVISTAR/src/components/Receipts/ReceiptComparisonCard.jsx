import React from 'react';
import { TrendingUp, AlertTriangle, Calendar, Info } from 'lucide-react';
import { receiptComparison, billingOverview } from '../../data/mockData';

export default function ReceiptComparisonCard({ onOpenDetails }) {
  return (
    <div className="my-4 p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50/80 border border-movistar-gray-border shadow-movistar-md font-sans">

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(1,157,244,0.12)' }}>
            <TrendingUp className="w-4 h-4" style={{ color: '#019df4' }} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Análisis Visual de Variación</h4>
            <p className="text-sm font-bold" style={{ color: '#013d5e' }}>Recibo Julio vs. Junio 2024</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border"
          style={{ background: 'rgba(225,60,128,0.08)', color: '#e13c80', borderColor: 'rgba(225,60,128,0.25)' }}>
          <AlertTriangle className="w-3.5 h-3.5" style={{ color: '#e13c80' }} />
          {billingOverview.variationPercentage}
        </span>
      </div>

      {/* Visual Flow */}
      <div className="py-5 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">

        {/* Junio */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center flex flex-col items-center">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {receiptComparison.previousMonth}
          </span>
          <span className="text-2xl font-extrabold text-slate-700 font-sans">{receiptComparison.previousAmount}</span>
          <span className="text-[10px] font-medium mt-1 bg-movistar-green/10 text-movistar-green px-2 py-0.5 rounded-md">
            Descuento Activo (-S/20)
          </span>
        </div>

        {/* Arrow + Delta */}
        <div className="flex sm:flex-col items-center justify-center gap-2 py-1">
          <div className="h-0.5 sm:h-8 w-12 sm:w-0.5"
            style={{ background: 'linear-gradient(to right, #019df4, #e13c80)' }}></div>
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center shadow-md font-extrabold text-xs"
            style={{ background: 'linear-gradient(135deg, #019df4, #e13c80)', boxShadow: '0 0 16px rgba(225,60,128,0.30)' }}>
            +S/20
          </div>
          <div className="h-0.5 sm:h-8 w-12 sm:w-0.5"
            style={{ background: 'linear-gradient(to right, #e13c80, #019df4)' }}></div>
        </div>

        {/* Julio */}
        <div className="p-4 rounded-xl text-center flex flex-col items-center ring-2"
          style={{ background: 'rgba(1,157,244,0.07)', border: '1px solid rgba(1,157,244,0.25)', ringColor: 'rgba(1,157,244,0.20)' }}>
          <span className="text-xs font-semibold flex items-center gap-1 mb-1" style={{ color: '#019df4' }}>
            <Calendar className="w-3.5 h-3.5" style={{ color: '#5bc4f8' }} />
            {receiptComparison.currentMonth}
          </span>
          <span className="text-2xl font-extrabold font-sans" style={{ color: '#013d5e' }}>{receiptComparison.currentAmount}</span>
          <span className="text-[10px] font-bold mt-1 px-2 py-0.5 rounded-md"
            style={{ background: 'rgba(1,157,244,0.12)', color: '#019df4' }}>
            Tarifa Base Regular
          </span>
        </div>

      </div>

      {/* Root Cause */}
      <div className="p-3.5 rounded-xl flex items-start gap-3 text-xs leading-relaxed"
        style={{ background: 'rgba(225,60,128,0.07)', border: '1px solid rgba(225,60,128,0.20)' }}>
        <Info className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#e13c80' }} />
        <div className="flex-1 text-slate-700">
          <span className="font-bold block mb-0.5" style={{ color: '#c0306b' }}>Motivo Principal del Incremento:</span>
          {receiptComparison.reason}.
          <span className="block text-slate-500 mt-1 font-medium">
            Fecha de expiración: <strong className="text-slate-700">{receiptComparison.effectiveDate}</strong>
          </span>
        </div>
      </div>

      {onOpenDetails && (
        <div className="mt-3 text-right">
          <button
            onClick={onOpenDetails}
            className="text-xs font-bold transition-colors inline-flex items-center gap-1 hover:opacity-80"
            style={{ color: '#019df4' }}
          >
            <span>Ver desglose de ítems completo</span>
            <span>&rarr;</span>
          </button>
        </div>
      )}
    </div>
  );
}
