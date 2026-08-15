import React, { useState, useRef, useEffect } from 'react';
import { initialMessages } from '../../data/mockData';
import { sendMessage, resetSessionId, getSavedMessages, saveMessages } from '../../services/chatService';
import MessageBubble from '../../components/MessageBubble/MessageBubble';
import ChatInput from '../../components/Chat/ChatInput';
import DetailModal from '../../components/Modal/DetailModal';
import BenefitsModal from '../../components/Modal/BenefitsModal';
import ClaimModal from '../../components/Modal/ClaimModal';
import { Sparkles, Loader2, RotateCcw } from 'lucide-react';

export default function ChatMobileComponent({ webhookUrl }) {
  // Cargar historial persistido de localStorage para mantener la memoria
  const [messages, setMessages] = useState(() => getSavedMessages(initialMessages));
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    saveMessages(messages);
  }, [messages, isLoading]);

  const handleSendMessage = async (text) => {
    const userMsg = {
      id: msg-user- + Date.now(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
    };
    
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await sendMessage(text, webhookUrl);
      const withAiResponse = [...updatedMessages, { ...response, id: msg-ai- + Date.now() }];
      setMessages(withAiResponse);
      saveMessages(withAiResponse);
      if (response.showModal) setActiveModal(response.showModal);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    resetSessionId();
    const freshWelcome = [{
      id: msg-welcome- + Date.now(),
      sender: 'assistant',
      agentName: 'Lucía',
      agentRole: 'Asistente Inteligente de Recibos Movistar',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: '¡Hola! Soy Lucía. He iniciado una nueva sesión. ¿En qué puedo ayudarte hoy con tu facturación?',
      suggestedActions: [
        { id: 'action-detail', label: 'Ver desglose de factura', icon: 'FileText', primary: true },
        { id: 'action-benefits', label: 'Explorar promociones', icon: 'Sparkles', primary: false },
      ],
    }];
    setMessages(freshWelcome);
    saveMessages(freshWelcome);
  };

  const handleActionClick = (actionId) => {
    if (actionId === 'action-detail') setActiveModal('detail');
    else if (actionId === 'action-benefits') setActiveModal('benefits');
    else if (actionId === 'action-claim') setActiveModal('claim');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
      
      {/* Header Info */}
      <div className="px-4 py-2 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#019df4] to-[#00A859] flex items-center justify-center text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 leading-none">Lucía AI</p>
            <span className="text-[9px] text-green-600 font-semibold">Memoria Activa</span>
          </div>
        </div>
        <button
          onClick={handleResetChat}
          title="Reiniciar chat y memoria"
          className="p-1.5 text-gray-400 hover:text-slate-600 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1 text-[11px]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Nueva Sesión</span>
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Context Banner */}
        <div className="p-3 rounded-2xl border text-xs flex flex-col font-sans mb-3"
          style={{ background: 'linear-gradient(90deg, rgba(1,157,244,0.07), rgba(225,60,128,0.07))', borderColor: 'rgba(1,157,244,0.20)' }}>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full text-white flex items-center justify-center font-bold shrink-0"
              style={{ background: 'linear-gradient(135deg, #00A859, #019df4)' }}>
              <Sparkles className="w-3 h-3" />
            </div>
            <p style={{ color: '#013d5e' }} className="leading-tight text-[11px]">
              <strong>Lucía AI:</strong> Analizando recibo de <strong>Julio 2024 (S/ 120.00)</strong>
            </p>
          </div>
        </div>

        {/* Messages */}
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onActionClick={handleActionClick}
            onOpenDetailModal={() => setActiveModal('detail')}
          />
        ))}

        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-movistar-gray-border w-[85%] shadow-movistar-sm animate-pulse">
            <div className="w-7 h-7 rounded-xl text-white flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #019df4, #e13c80)' }}>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-bold block leading-tight" style={{ color: '#013d5e' }}>Lucía está respondiendo...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* Input Area */}
      <div className="w-full shrink-0 border-t border-gray-100 bg-white">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>

      {/* Modals */}
      <DetailModal isOpen={activeModal === 'detail'} onClose={() => setActiveModal(null)} />
      <BenefitsModal isOpen={activeModal === 'benefits'} onClose={() => setActiveModal(null)} />
      <ClaimModal isOpen={activeModal === 'claim'} onClose={() => setActiveModal(null)} />
    </div>
  );
}
