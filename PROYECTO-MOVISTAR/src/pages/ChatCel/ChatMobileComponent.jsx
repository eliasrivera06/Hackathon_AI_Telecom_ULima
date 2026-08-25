import React, { useState, useRef, useEffect } from 'react';
import { sendMessage, resetSessionId, getSavedMessages, saveMessages, getUserPhone, getCleanWelcomeMessage } from '../../services/chatService';
import MessageBubble from '../../components/MessageBubble/MessageBubble';
import ChatInput from '../../components/Chat/ChatInput';
import DetailModal from '../../components/Modal/DetailModal';
import BenefitsModal from '../../components/Modal/BenefitsModal';
import ClaimModal from '../../components/Modal/ClaimModal';
import { Sparkles, Loader2, RotateCcw, ArrowLeft } from 'lucide-react';

export default function ChatMobileComponent({ webhookUrl, userPhone: propPhone, onBack }) {
  const currentPhone = propPhone || getUserPhone();
  const [selectedLang, setSelectedLang] = useState('auto');
  const [messages, setMessages] = useState(() => getSavedMessages(currentPhone, getCleanWelcomeMessage('es')));
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const messagesEndRef = useRef(null);

  // Sincronizar y cargar el historial específico del usuario cuando cambia la cuenta / teléfono
  useEffect(() => {
    const activeUserPhone = propPhone || getUserPhone();
    const isolatedMessages = getSavedMessages(activeUserPhone, getCleanWelcomeMessage(selectedLang === 'auto' ? 'es' : selectedLang));
    setMessages(isolatedMessages);
  }, [propPhone]);

  // Guardar mensajes aislados para este número de teléfono
  useEffect(() => {
    const activeUserPhone = propPhone || getUserPhone();
    saveMessages(activeUserPhone, messages);

    if (!messages || messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];

    if (lastMessage && lastMessage.sender === 'assistant' && !lastMessage.id.includes('welcome')) {
      setTimeout(() => {
        const el = document.getElementById(lastMessage.id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, propPhone]);

  const handleSendMessage = async (text, languageOverride = null) => {
    const userMsg = {
      id: 'msg-user-' + Date.now(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text,
    };
    
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    const activeUserPhone = propPhone || getUserPhone();
    saveMessages(activeUserPhone, updatedMessages);
    setIsLoading(true);

    try {
      const response = await sendMessage(text, webhookUrl, languageOverride);
      const withAiResponse = [...updatedMessages, { ...response, id: 'msg-ai-' + Date.now() }];
      setMessages(withAiResponse);
      saveMessages(activeUserPhone, withAiResponse);
      if (response && response.showModal) setActiveModal(response.showModal);
    } catch (err) {
      console.error('[ChatMobileComponent] Error enviando mensaje:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (langCode) => {
    setSelectedLang(langCode);
    if (messages.length === 1 && messages[0].id.includes('welcome')) {
      const activeUserPhone = propPhone || getUserPhone();
      const freshWelcome = getCleanWelcomeMessage(langCode === 'auto' ? 'es' : langCode);
      setMessages(freshWelcome);
      saveMessages(activeUserPhone, freshWelcome);
    }
  };

  const handleResetChat = () => {
    const activeUserPhone = propPhone || getUserPhone();
    resetSessionId(activeUserPhone);
    const freshWelcome = getCleanWelcomeMessage(selectedLang === 'auto' ? 'es' : selectedLang);
    setMessages(freshWelcome);
    saveMessages(activeUserPhone, freshWelcome);
  };

  const handleActionClick = (actionId) => {
    if (actionId === 'action-detail') setActiveModal('detail');
    else if (actionId === 'action-benefits') setActiveModal('benefits');
    else if (actionId === 'action-claim') setActiveModal('claim');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden w-full">
      
      {/* Header Info */}
      <div className="px-3 py-2.5 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              type="button"
              className="p-1 -ml-1 text-slate-700 hover:text-[#019df4] transition-colors rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Volver a Mi Perfil"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#019df4] to-[#00A859] flex items-center justify-center text-white shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-800 leading-none truncate">Lucio AI</p>
            <span className="text-[9px] text-green-600 font-semibold truncate block">
              {currentPhone ? `Línea: ${currentPhone}` : 'En Línea'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleResetChat}
            title="Reiniciar conversación de esta línea"
            className="p-1.5 text-gray-500 hover:text-slate-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nueva Sesión</span>
          </button>
          
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4 w-full">
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
              <span className="text-xs font-bold block leading-tight text-[#013d5e]">Lucio está respondiendo...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* Input Area */}
      <div className="w-full shrink-0 border-t border-gray-100 bg-white">
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          selectedLang={selectedLang}
          onLanguageChange={handleLanguageChange}
        />
      </div>

      {/* Modals */}
      <DetailModal isOpen={activeModal === 'detail'} onClose={() => setActiveModal(null)} />
      <BenefitsModal isOpen={activeModal === 'benefits'} onClose={() => setActiveModal(null)} />
      <ClaimModal isOpen={activeModal === 'claim'} onClose={() => setActiveModal(null)} />
    </div>
  );
}
