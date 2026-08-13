import React, { useState } from 'react';
import ChatBotPage from '../ChatBot/ChatBotPage';
import ChatSwitcher from '../ChatSwitcher/ChatSwitcher';
import { RefreshCw, Search, Phone, User, MessageCircle, MoreHorizontal, LogIn } from 'lucide-react';

export default function ChatCelPage() {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL_CEL;
  
  // Flujo: 'login' -> 'home' -> 'chat'
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-200 p-4 relative">
      <ChatSwitcher />
      {/* Mobile Frame Container */}
      <div className="w-full max-w-[400px] h-[800px] max-h-full bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative border-[8px] border-black">
        
        {/* Fake Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-xl z-50" />

        {activeTab === 'login' ? (
          /* PANTALLA LOGIN MOCK MÓVIL */
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white z-10 space-y-8 mt-4">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                <LogIn className="w-10 h-10 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Mi Movistar</h2>
              <p className="text-sm text-gray-500">Ingresa para gestionar tu línea</p>
            </div>
            
            <div className="w-full space-y-4">
              <input 
                type="text" 
                placeholder="Número de celular" 
                className="w-full p-4 border rounded-xl bg-gray-50 outline-none" 
                disabled
              />
              <button 
                onClick={() => setActiveTab('home')}
                className="w-full py-4 bg-[#019df4] text-white font-bold rounded-xl active:scale-95 transition-transform"
              >
                Ingresar
              </button>
            </div>
          </div>
        ) : (
          /* PANTALLAS HOME O CHAT */
          <>
            {/* Blue Header */}
            <div className="bg-[#019df4] text-white pt-10 pb-6 px-6 rounded-b-[30px] flex items-center justify-between z-10 shrink-0 shadow-sm relative">
              <div className="flex items-center gap-3 mt-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 relative">
                  <div className="w-full h-full bg-[#019df4] rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold opacity-90">Línea activa</p>
                  <p className="text-xl font-bold">04240000000</p>
                </div>
              </div>
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors mt-2">
                <RefreshCw className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 w-full bg-slate-50 relative -mt-6 pt-8 pb-20 overflow-y-auto">
              {activeTab === 'home' && (
                /* INICIO APP (VISUAL MOCK) */
                <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <p className="text-sm font-semibold text-gray-500 mb-1">Tu plan es Movistar Plus 4Gb</p>
                    <div className="flex justify-between border-t border-b border-gray-100 py-3 my-3">
                      <div>
                        <p className="text-xs text-gray-400">Fecha de corte:</p>
                        <p className="text-sm font-bold text-gray-700">24/06/2024</p>
                      </div>
                      <div className="border-l border-gray-200" />
                      <div>
                        <p className="text-xs text-gray-400">Cuenta</p>
                        <p className="text-sm font-bold text-gray-700">P000000000</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-left">
                      <div>
                        <p className="text-lg text-gray-600">Saldo</p>
                        <p className="text-2xl font-extrabold text-gray-800">Bs. 115,01</p>
                      </div>
                      <button className="px-5 py-2 bg-[#019df4] text-white font-bold rounded-full text-sm">
                        Recargar
                      </button>
                    </div>
                    <p className="text-left text-xs text-red-500 mt-2 font-semibold">En 5 días vence</p>
                    <p className="text-left text-sm text-gray-700 font-bold">Monto a pagar Bs. 146,14</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="relative w-24 h-24 rounded-full border-[8px] border-blue-400 flex flex-col items-center justify-center">
                       <span className="text-lg font-bold text-gray-800">3492</span>
                       <span className="text-[10px] text-gray-500 font-bold">Megas</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-400"><MessageCircle className="w-5 h-5"/></div>
                         <div>
                           <p className="text-lg font-bold text-gray-800">400</p>
                           <p className="text-xs text-gray-500 font-bold -mt-1">Mensajes</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-400"><Phone className="w-5 h-5"/></div>
                         <div>
                           <p className="text-lg font-bold text-gray-800">191</p>
                           <p className="text-xs text-gray-500 font-bold -mt-1">Minutos</p>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'chat' && (
                /* CHAT FUNCIONAL */
                <div className="absolute inset-0 pt-8 pb-20">
                  <ChatBotPage webhookUrl={webhookUrl} />
                </div>
              )}
            </div>

            {/* Bottom Navigation Bar */}
            <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 flex items-center justify-around py-2 px-2 rounded-b-[32px] pb-6 shrink-0 z-10 shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
              <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeTab === 'home' ? 'bg-blue-50' : 'bg-transparent'}`}>
                  <User className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-semibold">Mi Perfil</span>
              </button>
              
              <button onClick={() => setActiveTab('home')} className="flex flex-col items-center gap-1 text-gray-400">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-transparent">
                  <Search className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-semibold">Recarga</span>
              </button>
              
              {/* Chat Icon Active */}
              <button onClick={() => setActiveTab('chat')} className={`flex flex-col items-center gap-1 ${activeTab === 'chat' ? 'text-blue-500' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center relative ${activeTab === 'chat' ? 'bg-blue-50' : 'bg-transparent'}`}>
                  <MessageCircle className="w-6 h-6" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">1</div>
                </div>
                <span className="text-[10px] font-semibold">Lucía AI</span>
              </button>
              
              <button onClick={() => setActiveTab('home')} className="flex flex-col items-center gap-1 text-gray-400">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-transparent">
                  <MoreHorizontal className="w-6 h-6" />
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
