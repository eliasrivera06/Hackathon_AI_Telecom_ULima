import React from 'react';
import Modal from './Modal';
import { receiptComparison } from '../../data/mockData';
import { FileText, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';

export default function DetailModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Desglose Itemizado de Recibo - Julio 2024">
      <div className="space-y-5 text-sm">
        
        {/* Recibo Summary Box */}
        <div className="p-4 rounded-2xl bg-movistar-gray border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs text-slate-400 font-semibold block uppercase">N° de Recibo</span>
            <span className="text-base font-bold text-movistar-blue">REC-2024-07-88392</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block uppercase">Ciclo de Facturación</span>
            <span className="text-xs font-bold text-slate-700">15 Jun 2024 - 14 Jul 2024</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block uppercase">Monto Total</span>
            <span className="text-xl font-extrabold text-movistar-blue">{receiptComparison.currentAmount}</span>
          </div>
        </div>

        {/* Detailed Item Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-movistar-blue text-white text-xs font-semibold">
                <th className="p-3">Concepto / Rubro</th>
                <th className="p-3 text-right">Junio 2024</th>
                <th className="p-3 text-right">Julio 2024</th>
                <th className="p-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {receiptComparison.itemizedBreakdown.map((item, idx) => (
                <tr key={idx} className={item.juneAmount !== item.julyAmount ? 'bg-amber-50/60 font-semibold' : 'hover:bg-slate-50'}>
                  <td className="p-3">
                    <p className="font-bold text-slate-800">{item.concept}</p>
                    <span className="text-[11px] text-slate-400 font-normal">{item.note}</span>
                  </td>
                  <td className="p-3 text-right text-slate-600">
                    S/ {item.juneAmount.toFixed(2)}
                  </td>
                  <td className="p-3 text-right font-bold text-slate-800">
                    S/ {item.julyAmount.toFixed(2)}
                  </td>
                  <td className="p-3">
                    {item.juneAmount !== item.julyAmount ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                        {item.status}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                        {item.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note footer */}
        <div className="p-3.5 rounded-xl bg-movistar-blue-soft text-movistar-blue text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-movistar-blue-light mt-0.5" />
          <p>
            El impuesto IGV (18%) se encuentra incluido en todos los rubros facturados según norma regulatoria.
          </p>
        </div>

      </div>
    </Modal>
  );
}
