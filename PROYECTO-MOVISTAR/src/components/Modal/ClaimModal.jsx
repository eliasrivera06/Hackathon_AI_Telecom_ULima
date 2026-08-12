import React, { useState } from 'react';
import Modal from './Modal';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { userProfile } from '../../data/mockData';

export default function ClaimModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setNote('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="Registrar Consulta Oficial sobre Recibo">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">

          {/* Info Banner — azul */}
          <div className="p-3.5 rounded-xl flex items-center gap-2"
            style={{ background: 'rgba(1,157,244,0.08)', border: '1px solid rgba(1,157,244,0.20)' }}>
            <ShieldCheck className="w-5 h-5 shrink-0" style={{ color: '#019df4' }} />
            <p className="text-slate-700">
              Lucía derivará este resumen a un especialista de atención al cliente Movistar para seguimiento personalizado.
            </p>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Cliente Afectado</label>
            <input
              type="text"
              disabled
              value={`${userProfile.name} (${userProfile.clientCode})`}
              className="w-full p-2.5 rounded-xl bg-slate-100 border border-slate-200 font-semibold text-slate-600"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Asunto de la Consulta</label>
            <input
              type="text"
              disabled
              value="Revisión de tarifa y variación +S/20 en Recibo Julio 2024"
              className="w-full p-2.5 rounded-xl bg-slate-100 border border-slate-200 font-semibold text-slate-600"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Comentarios adicionales (opcional)</label>
            <textarea
              rows="3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Escribe algún detalle adicional..."
              className="w-full p-3 rounded-xl border border-slate-300 outline-none transition-all text-xs"
              onFocus={e => e.target.style.borderColor = '#e13c80'}
              onBlur={e => e.target.style.borderColor = '#cbd5e1'}
            ></textarea>
          </div>

          {/* Submit — rosa */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl text-white font-bold text-sm transition-colors hover:opacity-90"
            style={{ background: 'linear-gradient(90deg, #019df4, #e13c80)', boxShadow: '0 0 16px rgba(225,60,128,0.25)' }}
          >
            Generar Ticket de Consulta
          </button>
        </form>
      ) : (
        <div className="py-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #019df4, #e13c80)', boxShadow: '0 0 20px rgba(225,60,128,0.30)' }}>
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h4 className="text-base font-bold" style={{ color: '#013d5e' }}>¡Consulta Registrada Exitosamente!</h4>
            <p className="text-xs text-slate-500 mt-1">
              Código: <strong className="text-slate-800">TK-MOV-2024-9912</strong>
            </p>
          </div>
          <div className="p-3.5 rounded-xl text-xs text-slate-600 text-left border border-slate-200 bg-slate-50">
            Un especialista revisará tu requerimiento y te enviará confirmación a <strong>{userProfile.email}</strong> en máx. 24 horas.
          </div>
          <button
            onClick={handleReset}
            className="w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs hover:opacity-90 transition-opacity"
            style={{ background: '#00A859', boxShadow: '0 0 14px rgba(0,168,89,0.28)' }}
          >
            Aceptar y Volver al Chat
          </button>
        </div>
      )}
    </Modal>
  );
}
