import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 animate-fade-in"
        style={{ background: 'rgba(1,61,94,0.65)', backdropFilter: 'blur(8px)' }}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-movistar-gray-border overflow-hidden z-10 animate-slide-up my-8">

        {/* Header — gradiente azul */}
        <div className="px-6 py-4 text-white flex items-center justify-between"
          style={{ background: 'linear-gradient(90deg, #013d5e 0%, #019df4 100%)' }}>
          <h3 className="text-lg font-bold font-sans tracking-wide">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-white font-semibold text-sm transition-colors"
            style={{ background: 'linear-gradient(90deg, #019df4, #e13c80)' }}
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
