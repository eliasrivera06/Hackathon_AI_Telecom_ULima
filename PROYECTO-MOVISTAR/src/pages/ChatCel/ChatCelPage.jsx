import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatMobileComponent from './ChatMobileComponent';
import ChatSwitcher from '../ChatSwitcher/ChatSwitcher';
import { RefreshCw, Search, Phone, User, MessageCircle, MoreHorizontal } from 'lucide-react';

export default function ChatCelPage() {
  const navigate = useNavigate();
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL_CEL;
  
  // Flujo de la App Móvil: 'login' -> 'home' -> 'chat'
  const [activeTab, setActiveTab] = useState('login');
  
  // Form State para Login
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('sms'); // 'sms' | 'whatsapp'
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingLogin(true);

    const loginWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL_LOGIN || import.meta.env.VITE_N8N_WEBHOOK_URL_CEL;

    if (loginWebhookUrl) {
      try {
        console.log('[Login] Enviando credenciales a n8n:', { phoneNumber, deliveryMethod });
        await fetch(loginWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phoneNumber,
            deliveryMethod,
            timestamp: new Date().toISOString()
          })
        });
      } catch (err) {
        console.warn('[Login] n8n Webhook offline o no disponible, continuando en modo demostración local.', err);
      }
    }

    setIsSubmittingLogin(false);
    setActiveTab('home');
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-slate-200 p-4 relative font-sans">
      <ChatSwitcher />
      
      {/* Mobile Frame Container */}
      <div className="w-full max-w-[400px] h-[820px] max-h-[92vh] bg-white rounded-[44px] shadow-2xl overflow-hidden flex flex-col relative border-[10px] border-slate-900">
        
        {/* Mobile Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-5 bg-slate-900 rounded-b-xl z-50 flex justify-center items-center">
          <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
        </div>

        {activeTab === 'login' ? (
          /* PANTALLA LOGIN MÓVIL (DISEÑO MODO WEB CONVERTIDO A CELULAR) */
          <div className="flex-1 flex flex-col justify-between p-6 bg-white z-10 pt-10 overflow-y-auto">
            
            <div className="space-y-5">
              {/* 1. Flecha Volver a Inicio */}
              <div className="flex items-center justify-start pt-1">
                <button
                  onClick={() => navigate('/')}
                  type="button"
                  className="p-1 -ml-2 text-slate-800 hover:text-[#019df4] transition-colors focus:outline-none"
                  aria-label="Volver a Inicio"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#222222" 
                    strokeWidth="2.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-7 h-7"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
              </div>

              {/* 2. Ilustración Line-Art (Avión de papel + Celular) */}
              <div className="flex justify-center pt-1 pb-1">
                <svg 
                  viewBox="0 0 160 70" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-[140px] h-[60px]"
                >
                  <path 
                    d="M15 46 C 25 22, 48 20, 64 32" 
                    stroke="#50A7E2" 
                    strokeWidth="2" 
                    strokeDasharray="3.5 3.5" 
                    strokeLinecap="round" 
                  />
                  <g transform="translate(68, 16) rotate(-8)">
                    <path 
                      d="M0 16 L32 0 L18 30 L13 18 Z" 
                      fill="none" 
                      stroke="#50A7E2" 
                      strokeWidth="2" 
                      strokeLinejoin="round" 
                      strokeLinecap="round" 
                    />
                    <path 
                      d="M13 18 L32 0" 
                      stroke="#50A7E2" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                    />
                  </g>
                  <rect 
                    x="115" 
                    y="10" 
                    width="30" 
                    height="50" 
                    rx="6" 
                    fill="none" 
                    stroke="#50A7E2" 
                    strokeWidth="2.2" 
                  />
                  <line 
                    x1="126" 
                    y1="15" 
                    x2="134" 
                    y2="15" 
                    stroke="#50A7E2" 
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                  />
                  <circle cx="130" cy="53" r="1.8" fill="#50A7E2" />
                </svg>
              </div>

              {/* 3. Título y Descripción */}
              <div className="text-center space-y-2">
                <h1 className="text-xl font-bold text-[#222222] tracking-tight leading-snug">
                  Ingresa tu número Movistar
                </h1>
                
                <div className="text-xs sm:text-sm leading-relaxed text-[#4A4A4A]">
                  <p className="font-normal">Te enviaremos un código de seguridad</p>
                  <p className="font-semibold text-[#222222]">para verificar tu identidad</p>
                </div>
              </div>

              {/* 4. Campo de Texto del Número */}
              <form onSubmit={handleLoginSubmit} id="mobile-login-form" className="pt-2">
                <div className="relative flex items-center">
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Número de celular Movistar"
                    className="w-full h-[52px] pl-5 pr-10 rounded-lg bg-white border-[1.5px] border-[#767676] text-[#222222] placeholder-[#757575] text-sm outline-none transition-colors focus:border-[#50A7E2]"
                  />
                  <div className="absolute right-3.5 pointer-events-none text-[#757575]">
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.8" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-5 h-5"
                    >
                      <rect x="6" y="2" width="12" height="20" rx="3" />
                      <line x1="10" y1="18" x2="14" y2="18" />
                    </svg>
                  </div>
                </div>
              </form>

              {/* 5. Selección de Método de Envío (SMS / WhatsApp) */}
              <div className="pt-2 space-y-2">
                <p className="text-xs sm:text-sm text-[#2B2B2B] font-medium text-left">
                  ¿Cómo prefieres recibir el código?
                </p>

                <div className="w-full bg-white border-[1.5px] border-[#E0E0E0] rounded-xl p-4 space-y-3">
                  {/* SMS */}
                  <label 
                    onClick={() => setDeliveryMethod('sms')}
                    className="flex items-center gap-3 cursor-pointer group select-none"
                  >
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="mobileDeliveryMethod"
                        value="sms"
                        checked={deliveryMethod === 'sms'}
                        onChange={() => setDeliveryMethod('sms')}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 transition-colors flex items-center justify-center ${
                        deliveryMethod === 'sms' 
                          ? 'border-[#50A7E2]' 
                          : 'border-gray-400 group-hover:border-gray-500'
                      }`}>
                        {deliveryMethod === 'sms' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#50A7E2]" />
                        )}
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-[#374151] font-medium">
                      Por SMS
                    </span>
                  </label>

                  {/* WhatsApp */}
                  <label 
                    onClick={() => setDeliveryMethod('whatsapp')}
                    className="flex items-center gap-3 cursor-pointer group select-none"
                  >
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="mobileDeliveryMethod"
                        value="whatsapp"
                        checked={deliveryMethod === 'whatsapp'}
                        onChange={() => setDeliveryMethod('whatsapp')}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 transition-colors flex items-center justify-center ${
                        deliveryMethod === 'whatsapp' 
                          ? 'border-[#50A7E2]' 
                          : 'border-gray-400 group-hover:border-gray-500'
                      }`}>
                        {deliveryMethod === 'whatsapp' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#50A7E2]" />
                        )}
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-[#374151] font-medium">
                      Por WhatsApp
                    </span>
                  </label>
                </div>
              </div>

            </div>

            {/* Bottom Button Siguiente */}
            <div className="pt-4 pb-2">
              <button
                form="mobile-login-form"
                type="submit"
                disabled={isSubmittingLogin}
                className="w-full h-12 rounded-full bg-[#019df4] hover:bg-[#0086d1] active:bg-[#0074b8] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center cursor-pointer disabled:opacity-70"
              >
                {isSubmittingLogin ? 'Verificando...' : 'Siguiente'}
              </button>
            </div>

          </div>
        ) : (
          /* PANTALLAS HOME O CHAT DE LA APP MÓVIL */
          <>
            {/* Blue Header */}
            <div className="bg-[#019df4] text-white pt-9 pb-5 px-5 rounded-b-[28px] flex items-center justify-between z-10 shrink-0 shadow-sm relative">
              <div className="flex items-center gap-3 mt-1">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 relative">
                  <div className="w-full h-full bg-[#019df4] rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold opacity-90">Línea activa</p>
                  <p className="text-base font-bold tracking-tight">
                    {phoneNumber || '987 654 321'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('login')}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors mt-1 text-xs font-semibold"
                title="Cerrar Sesión"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            {/* Body Container */}
            <div className="flex-1 w-full bg-slate-50 relative -mt-5 pt-7 pb-20 overflow-y-auto">
              {activeTab === 'home' && (
                /* INICIO APP (VISUAL MOCK DE GESTIÓN MÓVIL) */
                <div className="p-5 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Plan Info Card */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Tu plan es Movistar Plus 4Gb</p>
                    <div className="flex justify-between border-t border-b border-gray-100 py-2.5 my-2.5">
                      <div>
                        <p className="text-[10px] text-gray-400">Fecha de corte:</p>
                        <p className="text-xs font-bold text-gray-700">24/06/2026</p>
                      </div>
                      <div className="border-l border-gray-200" />
                      <div>
                        <p className="text-[10px] text-gray-400">Cuenta</p>
                        <p className="text-xs font-bold text-gray-700">P009841203</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-left pt-1">
                      <div>
                        <p className="text-sm text-gray-600">Saldo a pagar</p>
                        <p className="text-xl font-extrabold text-slate-800">S/ 79.90</p>
                      </div>
                      <button 
                        onClick={() => {}}
                        className="px-4 py-1.5 bg-[#019df4] text-white font-bold rounded-full text-xs shadow-sm cursor-default"
                      >
                        Pagar Recibo
                      </button>
                    </div>
                    <p className="text-left text-[11px] text-amber-600 mt-2 font-semibold flex items-center gap-1">
                      <span>•</span> Vence en 4 días
                    </p>
                  </div>

                  {/* Consumo Megas & Minutos Card */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="relative w-20 h-20 rounded-full border-[6px] border-[#019df4] flex flex-col items-center justify-center">
                       <span className="text-base font-extrabold text-slate-800">3.5</span>
                       <span className="text-[9px] text-gray-500 font-bold">GB Libres</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5">
                         <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                           <MessageCircle className="w-4 h-4"/>
                         </div>
                         <div>
                           <p className="text-sm font-bold text-slate-800">Ilimitados</p>
                           <p className="text-[10px] text-gray-500 font-bold -mt-0.5">SMS</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                         <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#019df4]">
                           <Phone className="w-4 h-4"/>
                         </div>
                         <div>
                           <p className="text-sm font-bold text-slate-800">Ilimitados</p>
                           <p className="text-[10px] text-gray-500 font-bold -mt-0.5">Minutos</p>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Botón directo al asistente AI */}
                  <button 
                    onClick={() => setActiveTab('chat')}
                    className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#019df4] to-[#005C9E] text-white flex items-center justify-between shadow-md hover:opacity-95 transition-opacity cursor-pointer"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Lucía AI - Asistente</p>
                        <p className="text-xs text-blue-100">Entiende tu recibo y resuelve dudas</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-white text-[#019df4] px-2.5 py-1 rounded-full">
                      Chat
                    </span>
                  </button>

                </div>
              )}

              {activeTab === 'chat' && (
                /* CHAT FUNCIONAL LUCÍA AI */
                <div className="absolute inset-0 pt-0 pb-16 flex flex-col">
                  <ChatMobileComponent webhookUrl={webhookUrl} />
                </div>
              )}
            </div>

            {/* Bottom Navigation Bar */}
            <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 flex items-center justify-around py-2 px-2 rounded-b-[34px] pb-5 shrink-0 z-10 shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
              <button 
                onClick={() => setActiveTab('home')} 
                className={`flex flex-col items-center gap-0.5 ${activeTab === 'home' ? 'text-[#019df4]' : 'text-gray-400'}`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${activeTab === 'home' ? 'bg-blue-50' : 'bg-transparent'}`}>
                  <User className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold">Mi Perfil</span>
              </button>
              
              <button 
                onClick={() => {}} 
                className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-gray-500 cursor-default"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-transparent">
                  <Search className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold">Recibos</span>
              </button>
              
              {/* Chat Icon */}
              <button 
                onClick={() => setActiveTab('chat')} 
                className={`flex flex-col items-center gap-0.5 ${activeTab === 'chat' ? 'text-[#019df4]' : 'text-gray-400'}`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center relative ${activeTab === 'chat' ? 'bg-blue-50' : 'bg-transparent'}`}>
                  <MessageCircle className="w-5 h-5" />
                  <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                    1
                  </div>
                </div>
                <span className="text-[10px] font-semibold">Lucía AI</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('home')} 
                className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-gray-600"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-transparent">
                  <MoreHorizontal className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold">Más</span>
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
