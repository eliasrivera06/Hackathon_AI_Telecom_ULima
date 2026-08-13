/**
 * Chat Service Layer for Movistar Lucía AI
 * Centralizes HTTP communication with n8n AI Agent Webhook.
 */

const SESSION_STORAGE_KEY = 'movistar_chat_session_id';

/**
 * Generate a unique session ID if not already stored in localStorage.
 * Reuses the same sessionId across the conversation.
 */
export const getSessionId = () => {
  let sessionId = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  }
  return sessionId;
};

/**
 * Reset/regenerate session ID for a new conversation.
 */
export const resetSessionId = () => {
  const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  localStorage.setItem(SESSION_STORAGE_KEY, newSessionId);
  return newSessionId;
};

/**
 * Helper to parse text response from various n8n return structures
 */
const extractN8nResponseText = (data) => {
  if (!data) return null;
  
  // If array format [{ response: "..." }]
  if (Array.isArray(data) && data.length > 0) {
    return extractN8nResponseText(data[0]);
  }
  
  if (typeof data === 'object') {
    return data.response || data.output || data.message || data.text || JSON.stringify(data);
  }

  if (typeof data === 'string') {
    return data;
  }

  return null;
};

/**
 * Fallback response builder if n8n webhook is offline or unconfigured
 */
const buildFallbackResponse = (userPrompt) => {
  const lowerPrompt = userPrompt.toLowerCase();
  
  let text = `Hola, Carlos. He analizado tu consulta sobre *"${userPrompt}"*. Lucía está lista para asistirte en la gestión de tu recibo, estado del servicio o aplicación de nuevos beneficios comerciales.`;
  let hasVisualComparison = false;
  let showModal = null;

  if (lowerPrompt.includes('aumentó') || lowerPrompt.includes('recibo') || lowerPrompt.includes('por qué')) {
    text = "Hola Carlos, he analizado en detalle tu facturación de **Julio 2024** (Recibo `REC-2024-07-88392`).\n\nTu recibo aumentó **S/ 20.00** respecto al mes anterior porque el **15 de julio finalizó la Promoción de Bienvenida** (-S/ 20/mes) que tuviste activa durante los últimos 6 meses. Tu plan ha retornado a su tarifa base regular contratada.";
    hasVisualComparison = true;
  } else if (lowerPrompt.includes('desglose') || lowerPrompt.includes('detalle') || lowerPrompt.includes('factura')) {
    text = "Con gusto. Aquí tienes el desglose exacto de los rubros de tu factura de **Julio 2024**:";
    showModal = 'detail';
  } else if (lowerPrompt.includes('beneficio') || lowerPrompt.includes('descuento') || lowerPrompt.includes('promocion')) {
    text = "Excelente. He encontrado **3 oportunidades activas** para ajustar la tarifa de tu Plan Hogar Fibra 600 Mbps:";
    showModal = 'benefits';
  }

  return {
    sender: 'assistant',
    agentName: 'Lucía',
    agentRole: 'Asistente Inteligente de Recibos Movistar',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    text,
    hasVisualComparison,
    showModal,
    suggestedActions: [
      { id: "action-detail", label: "Ver desglose completo", icon: "FileText", primary: true },
      { id: "action-benefits", label: "Revisar beneficios recomendados", icon: "Sparkles", primary: false },
      { id: "action-claim", label: "Registrar consulta oficial", icon: "HelpCircle", primary: false }
    ]
  };
};

/**
 * Send user message to n8n Webhook
 * 
 * Payload sent to n8n:
 * {
 *   "sessionId": "user-session-id",
 *   "message": "¿Por qué aumentó mi recibo?"
 * }
 * 
 * Expected response from n8n:
 * {
 *   "response": "Tu recibo aumentó porque..."
 * }
 */
export const sendMessage = async (userPrompt) => {
  const sessionId = getSessionId();
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

  console.log(`[chatService] Sending message to n8n. SessionID: ${sessionId}`);

  if (!webhookUrl) {
    console.warn('[chatService] VITE_N8N_WEBHOOK_URL is not defined. Using fallback response.');
    return buildFallbackResponse(userPrompt);
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        message: userPrompt,
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n Webhook returned status ${response.status}`);
    }

    const data = await response.json();
    console.log('[chatService] Received response from n8n:', data);

    const textResponse = extractN8nResponseText(data);

    if (!textResponse) {
      throw new Error('Could not extract text response from n8n payload');
    }

    const lowerPrompt = userPrompt.toLowerCase();
    const lowerResponse = textResponse.toLowerCase();

    return {
      sender: 'assistant',
      agentName: 'Lucía',
      agentRole: 'Asistente Inteligente de Recibos Movistar',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textResponse,
      hasVisualComparison: lowerPrompt.includes('aumentó') || lowerPrompt.includes('recibo') || lowerResponse.includes('julio 2024') || lowerResponse.includes('variación'),
      showModal: data.showModal || null,
      suggestedActions: [
        { id: "action-detail", label: "Ver desglose completo", icon: "FileText", primary: true },
        { id: "action-benefits", label: "Revisar beneficios recomendados", icon: "Sparkles", primary: false },
        { id: "action-claim", label: "Registrar consulta oficial", icon: "HelpCircle", primary: false }
      ]
    };

  } catch (error) {
    console.error('[chatService] Error communicating with n8n Webhook:', error.message);
    // Graceful fallback on network error or offline n8n server
    return buildFallbackResponse(userPrompt);
  }
};
