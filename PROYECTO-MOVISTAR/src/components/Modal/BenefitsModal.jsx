import React from 'react';
import Modal from './Modal';
import { planBenefits } from '../../data/mockData';
import { Sparkles, Tag, Zap, Tv, ChevronRight } from 'lucide-react';

export default function BenefitsModal({ isOpen, onClose }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Tag': return <Tag className="w-5 h-5 text-movistar-green" />;
      case 'Zap': return <Zap className="w-5 h-5" style={{ color: '#019df4' }} />;
      case 'Tv': return <Tv className="w-5 h-5" style={{ color: '#e13c80' }} />;
      default: return <Sparkles className="w-5 h-5 text-movistar-green" />;
    }
  };

  // Alternate button colors: green, blue, pink
  const btnStyles = [
    { background: '#00A859', boxShadow: '0 0 12px rgba(0,168,89,0.28)' },
    { background: '#019df4', boxShadow: '0 0 12px rgba(1,157,244,0.28)' },
    { background: '#e13c80', boxShadow: '0 0 12px rgba(225,60,128,0.28)' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Beneficios Exclusivos Recomendados por Lucía">
      <div className="space-y-4">
        <p className="text-xs text-slate-500 leading-relaxed">
          Lucía ha seleccionado estas ofertas personalizadas para estabilizar tu facturación con Movistar Fibra:
        </p>

        {planBenefits.map((benefit, idx) => (
          <div
            key={benefit.id}
            className="p-4 rounded-2xl bg-gradient-to-r from-white to-movistar-gray border border-slate-200 hover:border-slate-300 shadow-movistar-sm transition-all hover:shadow-movistar-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-movistar-gray flex items-center justify-center shrink-0">
                {getIcon(benefit.icon)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-800 text-sm">{benefit.title}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                    style={{ background: btnStyles[idx]?.background }}>
                    {benefit.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{benefit.desc}</p>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`¡Excelente! Has seleccionado: ${benefit.title}. Un asesor se contactará para activarlo.`);
                onClose();
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-xl text-white font-bold text-xs transition-all shrink-0 flex items-center justify-center gap-1 hover:opacity-90"
              style={btnStyles[idx]}
            >
              <span>{benefit.actionText}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
}
