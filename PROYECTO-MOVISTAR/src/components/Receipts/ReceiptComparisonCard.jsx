import React from 'react';
import { TrendingUp, AlertTriangle, Calendar, Info, ArrowDown, ArrowRight } from 'lucide-react';

export default function ReceiptComparisonCard({ data, onOpenDetails }) {
  const comparison = data || {};
  const previousMonth = comparison.previousMonth || 'Mes Anterior';
  const previousAmount = comparison.previousAmount || 'S/ 0.00';
  const currentMonth = comparison.currentMonth || 'Mes Actual';
  const currentAmount = comparison.currentAmount || 'S/ 0.00';
  const variationPercentage = comparison.variationPercentage || comparison.variation || '+S/ 0.00';
  const reason = comparison.reason || 'Variación en la facturación del periodo.';
  const effectiveDate = comparison.effectiveDate || null;
  const previousTag = comparison.previousTag || 'Tarifa Anterior';
  const currentTag = comparison.currentTag || 'Tarifa Actual';

  return (
    <div className="my-3 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-movistar-gray-border shadow-sm font-sans w-full max-w-full overflow-hidden box-border">

      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-2 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <div 
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'rgba(1,157,244,0.12)' }}
          >
            <TrendingUp className="w-4 h-4" style={{ color: '#019df4' }} />
          </div>
          <div className="min-w-0">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
              Análisis Visual de Variación
            </h4>
            <p className="text-xs sm:text-sm font-bold truncate text-[#013d5e]">
              {previousMonth} vs. {currentMonth}
            </p>
          </div>
        </div>

        <span 
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold border shrink-0"
          style={{ background: 'rgba(225,60,128,0.08)', color: '#e13c80', borderColor: 'rgba(225,60,128,0.25)' }}
        >
          <AlertTriangle className="w-3 h-3 text-[#e13c80]" />
          {variationPercentage}
        </span>
      </div>

      {/* Visual Flow - Responsive Flex Layout (Stacks vertically on narrow mobile, horizontal on wider screens) */}
      <div className="py-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 w-full">

        {/* Box 1: Mes Anterior */}
        <div className="w-full sm:flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center flex flex-col items-center justify-center min-w-0 box-border">
          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 mb-0.5 truncate max-w-full">
            <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{previousMonth}</span>
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-slate-700 font-sans tracking-tight">
            {previousAmount}
          </span>
          <span className="text-[9px] font-medium mt-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md truncate max-w-full">
            {previousTag}
          </span>
        </div>

        {/* Arrow Connector + Badge */}
        <div className="flex sm:flex-col items-center justify-center gap-1 py-0.5 shrink-0">
          <div className="hidden sm:block h-3 w-0.5 bg-gradient-to-b from-[#019df4] to-[#e13c80]"></div>
          <div className="sm:hidden w-6 h-0.5 bg-gradient-to-r from-[#019df4] to-[#e13c80]"></div>
          
          <div 
            className="px-2.5 py-1 sm:px-2 sm:py-1 rounded-full text-white text-[11px] font-extrabold shadow-sm shrink-0 flex items-center gap-1"
            style={{ background: 'linear-gradient(135deg, #019df4, #e13c80)' }}
          >
            <span className="sm:hidden">&darr;</span>
            <span>{variationPercentage}</span>
          </div>

          <div className="hidden sm:block h-3 w-0.5 bg-gradient-to-b from-[#e13c80] to-[#019df4]"></div>
          <div className="sm:hidden w-6 h-0.5 bg-gradient-to-r from-[#e13c80] to-[#019df4]"></div>
        </div>

        {/* Box 2: Mes Actual */}
        <div 
          className="w-full sm:flex-1 p-3 rounded-xl text-center flex flex-col items-center justify-center min-w-0 box-border"
          style={{ background: 'rgba(1,157,244,0.06)', border: '1.5px solid rgba(1,157,244,0.30)' }}
        >
          <span className="text-[11px] font-semibold text-[#019df4] flex items-center gap-1 mb-0.5 truncate max-w-full">
            <Calendar className="w-3 h-3 text-[#019df4] shrink-0" />
            <span className="truncate">{currentMonth}</span>
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-[#013d5e] font-sans tracking-tight">
            {currentAmount}
          </span>
          <span 
            className="text-[9px] font-bold mt-1 px-2 py-0.5 rounded-md border truncate max-w-full"
            style={{ background: 'rgba(1,157,244,0.12)', color: '#019df4', borderColor: 'rgba(1,157,244,0.25)' }}
          >
            {currentTag}
          </span>
        </div>

      </div>

      {/* Root Cause / Motivo */}
      <div 
        className="p-3 rounded-xl flex items-start gap-2.5 text-xs leading-relaxed w-full box-border"
        style={{ background: 'rgba(225,60,128,0.06)', border: '1px solid rgba(225,60,128,0.20)' }}
      >
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#e13c80]" />
        <div className="flex-1 text-slate-700 min-w-0">
          <span className="font-bold block mb-0.5 text-[#c0306b]">Detalle de la Variación:</span>
          <p className="break-words [overflow-wrap:anywhere] leading-snug">{reason}</p>
          {effectiveDate && (
            <span className="block text-slate-500 mt-1 font-medium text-[11px]">
              Vigencia / Fecha: <strong className="text-slate-700">{effectiveDate}</strong>
            </span>
          )}
        </div>
      </div>

      {onOpenDetails && (
        <div className="mt-2.5 text-right">
          <button
            onClick={onOpenDetails}
            className="text-xs font-bold transition-colors inline-flex items-center gap-1 hover:opacity-80 cursor-pointer text-[#019df4]"
          >
            <span>Ver desglose de ítems completo</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}