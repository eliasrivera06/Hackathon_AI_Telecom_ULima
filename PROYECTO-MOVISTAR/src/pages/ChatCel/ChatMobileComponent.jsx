import React, { useState, useRef, useEffect } from 'react';
import { initialMessages } from '../../data/mockData';
import { sendMessage, resetSessionId } from '../../services/chatService';
import MessageBubble from '../../components/MessageBubble/MessageBubble';
import ChatInput from '../../components/Chat/ChatInput';
import DetailModal from '../../components/Modal/DetailModal';
import BenefitsModal from '../../components/Modal/BenefitsModal';
import ClaimModal from '../../components/Modal/ClaimModal';
import { Sparkles, Loader2 } from 'lucide-react';

export default function ChatMobileComponent({ webhookUrl }) {
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (text) => {
    const userMsg = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    try {
      const response = await sendMessage(text, webhookUrl);
      setMessages((prev) => [...prev, { ...response, id: `msg-ai-${Date.now()}` }]);
      if (response.showModal) setActiveModal(response.showModal);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (actionId) => {
    if (actionId === 'action-detail') setActiveModal('detail');
    else if (actionId === 'action-benefits') setActiveModal('benefits');
    else if (actionId === 'action-claim') setActiveModal('claim');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
      
      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Context Banner */}
        <div className="p-3.5 rounded-2xl border text-xs flex flex-col font-sans mb-4"
          style={{ background: 'linear-gradient(90deg, rgba(1,157,244,0.07), rgba(225,60,128,0.07))', borderColor: 'rgba(1,157,244,0.20)' }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full text-white flex items-center justify-center font-bold shrink-0"
              style={{ background: 'linear-gradient(135deg, #00A859, #019df4)' }}>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <p style={{ color: '#013d5e' }} className="leading-tight">
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
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-movistar-gray-border w-[85%] shadow-movistar-sm animate-pulse">
            <div className="w-8 h-8 rounded-xl text-white flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #019df4, #e13c80)' }}>
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold block leading-tight" style={{ color: '#013d5e' }}>Lucía está procesando...</span>
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
