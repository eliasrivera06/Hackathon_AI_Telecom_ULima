import { 
  userProfile, 
  currentPlan, 
  billingOverview, 
  receiptComparison, 
  planBenefits, 
  chatHistory, 
  initialMessages 
} from '../data/mockData';

/**
 * Movistar AI Billing Agent Service Layer
 * Clean interfaces ready for future Supabase / n8n / Gemini AI integration.
 */

// Simulated async delay helper
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const getUserProfile = async () => {
  await delay(200);
  return userProfile;
};

export const getCurrentPlan = async () => {
  await delay(200);
  return currentPlan;
};

export const getBillingOverview = async () => {
  await delay(300);
  return billingOverview;
};

export const getReceiptComparison = async () => {
  await delay(300);
  return receiptComparison;
};

export const getPlanBenefits = async () => {
  await delay(300);
  return planBenefits;
};

export const getChatHistory = async () => {
  await delay(200);
  return chatHistory;
};

export const getInitialMessages = async () => {
  await delay(300);
  return initialMessages;
};

/**
 * Send user prompt to Lucía AI (n8n / Gemini endpoint stub)
 */
export const sendMessageToLuciaAI = async (userPrompt) => {
  await delay(800);
  
  const lowerPrompt = userPrompt.toLowerCase();
  
  if (lowerPrompt.includes('desglose') || lowerPrompt.includes('detalle')) {
    return {
      sender: 'assistant',
      agentName: 'Lucía',
      agentRole: 'Asistente Inteligente de Recibos Movistar',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: "Con gusto. Aquí tienes el desglose exacto de los rubros de tu factura de **Julio 2024**:",
      hasVisualComparison: false,
      hasRootCauseCard: false,
      showModal: 'detail',
      suggestedActions: [
        { id: "action-benefits", label: "Ver beneficios recomendados", icon: "Sparkles", primary: true },
        { id: "action-claim", label: "Registrar consulta formal", icon: "HelpCircle", primary: false }
      ]
    };
  }

  if (lowerPrompt.includes('beneficio') || lowerPrompt.includes('descuento') || lowerPrompt.includes('promocion')) {
    return {
      sender: 'assistant',
      agentName: 'Lucía',
      agentRole: 'Asistente Inteligente de Recibos Movistar',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: "Excelente. He encontrado **3 oportunidades activas** para ajustar la tarifa de tu Plan Hogar Fibra 600 Mbps:",
      hasVisualComparison: false,
      hasRootCauseCard: false,
      showModal: 'benefits',
      suggestedActions: [
        { id: "action-detail", label: "Ver desglose de factura", icon: "FileText", primary: false },
        { id: "action-claim", label: "Solicitar asistencia directa", icon: "HelpCircle", primary: true }
      ]
    };
  }

  // Default response
  return {
    sender: 'assistant',
    agentName: 'Lucía',
    agentRole: 'Asistente Inteligente de Recibos Movistar',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    text: `Entendido, Carlos. He analizado tu consulta sobre *"${userPrompt}"*. Lucía está lista para asistirte en la gestión de tu recibo, estado del servicio o aplicación de nuevos beneficios comerciales.`,
    hasVisualComparison: false,
    hasRootCauseCard: false,
    suggestedActions: [
      { id: "action-detail", label: "Ver desglose completo", icon: "FileText", primary: true },
      { id: "action-benefits", label: "Revisar beneficios de plan", icon: "Sparkles", primary: false },
      { id: "action-claim", label: "Registrar consulta oficial", icon: "HelpCircle", primary: false }
    ]
  };
};
