/**
 * Chat Service Layer for Movistar Lucía AI
 * Centralizes HTTP communication with Make / n8n AI Agent Webhook.
 */

const SESSION_STORAGE_KEY = 'movistar_chat_session_id';
const USER_PHONE_KEY = 'movistar_user_phone';
const SUBSCRIBER_KEY = 'movistar_subscriber_key';
const CHAT_MESSAGES_KEY = 'movistar_chat_messages';

/**
 * Get or set the verified user phone number
 */
export const getUserPhone = () => {
  return localStorage.getItem(USER_PHONE_KEY) || '';
};

export const setUserPhone = (phone) => {
  if (phone) {
    localStorage.setItem(USER_PHONE_KEY, phone);
  } else {
    localStorage.removeItem(USER_PHONE_KEY);
  }
};

export const getSubscriberKey = () => {
  return localStorage.getItem(SUBSCRIBER_KEY) || getUserPhone() || getSessionId();
};

export const setSubscriberKey = (key) => {
  if (key) {
    localStorage.setItem(SUBSCRIBER_KEY, key);
  } else {
    localStorage.removeItem(SUBSCRIBER_KEY);
  }
};

/**
 * Generate a unique session ID if not already stored in localStorage.
 * Reuses the same sessionId across the conversation.
 */
export const getSessionId = () => {
  let sessionId = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!sessionId) {
    const userPhone = getUserPhone();
    sessionId = userPhone ? `user_${userPhone}` : `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  }
  return sessionId;
};

/**
 * Reset/regenerate session ID for a new conversation.
 */
export const resetSessionId = () => {
  const userPhone = getUserPhone();
  const newSessionId = userPhone ? `user_${userPhone}_${Date.now()}` : `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  localStorage.setItem(SESSION_STORAGE_KEY, newSessionId);
  localStorage.removeItem(CHAT_MESSAGES_KEY);
  return newSessionId;
};

/**
 * Save & Load persistent chat messages in localStorage for frontend continuity
 */
export const getSavedMessages = (defaultInitialMessages = []) => {
  try {
    const saved = localStorage.getItem(CHAT_MESSAGES_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.id !== 'msg-1') {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[chatService] Error cargando mensajes guardados:', err);
  }
  return defaultInitialMessages;
};

export const saveMessages = (messages) => {
  try {
    localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(messages));
  } catch (err) {
    console.warn('[chatService] Error guardando mensajes:', err);
  }
};

/**
 * Verify phone number against Make Database Webhook
 */
export const verifyLoginWithDatabase = async (phoneNumber, deliveryMethod = 'sms') => {
  const loginWebhookUrl = (import.meta.env.VITE_MAKE_WEBHOOK_URL_LOGIN || import.meta.env.VITE_N8N_WEBHOOK_URL_LOGIN);

  console.log('[chatService] Verificando login en Make BD para:', phoneNumber);

  if (!loginWebhookUrl) {
    console.warn('[chatService] VITE_MAKE_WEBHOOK_URL_LOGIN no definida.');
    return { success: false, error: 'URL de webhook de login no configurada en .env' };
  }

  try {
    const response = await fetch(loginWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        telefono: phoneNumber,
        phoneNumber: phoneNumber,
        deliveryMethod: deliveryMethod,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { success: false, error: `El número ${phoneNumber} no existe en la base de datos de Movistar.` };
      }
      return { success: false, error: `Error del servidor (${response.status}) al verificar el número.` };
    }

    const contentType = response.headers.get('content-type') || '';
    let data = null;

    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = { raw: text };
      }
    }

    console.log('[chatService] Respuesta de Login Make:', data);

    // Si Make responde explícitamente que no se encontró
    if (data && (data.success === false || data.found === false || data.exists === false || data.status === 'not_found')) {
      return {
        success: false,
        error: data.message || data.error || `El número ${phoneNumber} no está registrado en la base de datos.`,
      };
    }

    // Guardar usuario y subscriber_key verificados
    setUserPhone(phoneNumber);
    if (data && (data.subscriber_key || data.subscriberKey)) {
      setSubscriberKey(data.subscriber_key || data.subscriberKey);
    } else {
      setSubscriberKey(phoneNumber);
    }
    localStorage.setItem(SESSION_STORAGE_KEY, `user_${phoneNumber}`);

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error('[chatService] Error de red en verificación de login:', error);
    return {
      success: false,
      error: 'No se pudo conectar con el servidor de base de datos. Verifica tu conexión.',
    };
  }
};

/**
 * Helper to parse text response from various Make/n8n return structures
 */
const extractResponseText = (data) => {
  if (!data) return null;
  
  if (Array.isArray(data) && data.length > 0) {
    return extractResponseText(data[0]);
  }
  
  if (typeof data === 'object') {
    return data.response || data.output || data.message || data.text || data.result || data.reply || (typeof data === 'object' ? JSON.stringify(data) : data);
  }

  if (typeof data === 'string') {
    return data;
  }

  return null;
};

/**
 * Fallback response builder if webhook is offline or unconfigured
 */
const buildFallbackResponse = (userPrompt) => {
  const lowerPrompt = userPrompt.toLowerCase();
  
  let text = `Hola, Carlos. He analizado tu consulta sobre *"${userPrompt}"*. Lucía está lista para asistirte en la gestión de tu recibo, estado del servicio o aplicación de nuevos beneficios comerciales.`;
  let hasVisualComparison = false;
  let showModal = null;

  if (lowerPrompt.includes('aumentó') || lowerPrompt.includes('aumento') || lowerPrompt.includes('recibo') || lowerPrompt.includes('por qué') || lowerPrompt.includes('por que')) {
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
 * Send user message to Webhook
 */
export const sendMessage = async (userPrompt, customWebhookUrl = null) => {
  const sessionId = getSessionId();
  const userPhone = getUserPhone();
  const subscriberKey = getSubscriberKey();
  const webhookUrl = customWebhookUrl || import.meta.env.VITE_MAKE_WEBHOOK_URL || import.meta.env.VITE_N8N_WEBHOOK_URL;

  console.log(`[chatService] Enviando mensaje con memoria. SubscriberKey: ${subscriberKey} | SessionID: ${sessionId}`);

  if (!webhookUrl) {
    console.warn('[chatService] Webhook URL no configurada. Usando respuesta local.');
    return buildFallbackResponse(userPrompt);
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: sessionId,
        subscriber_key: subscriberKey,
        telefono: userPhone,
        message: userPrompt,
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook retornó status ${response.status}`);
    }

    let textResponse = null;
    let data = null;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await response.json();
      textResponse = extractResponseText(data);
    } else {
      const rawText = await response.text();
      try {
        data = JSON.parse(rawText);
        textResponse = extractResponseText(data);
      } catch {
        textResponse = rawText;
      }
    }

    console.log('[chatService] Respuesta recibida del Webhook:', textResponse);

    if (!textResponse) {
      throw new Error('No se pudo extraer texto de respuesta del payload');
    }

    const lowerPrompt = userPrompt.toLowerCase();
    const lowerResponse = textResponse.toLowerCase();

    return {
      sender: 'assistant',
      agentName: 'Lucía',
      agentRole: 'Asistente Inteligente de Recibos Movistar',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textResponse,
      hasVisualComparison: lowerPrompt.includes('aumentó') || lowerPrompt.includes('aumento') || lowerPrompt.includes('recibo') || lowerResponse.includes('julio 2024') || lowerResponse.includes('variación') || lowerResponse.includes('variacion'),
      showModal: data?.showModal || null,
      suggestedActions: [
        { id: "action-detail", label: "Ver desglose completo", icon: "FileText", primary: true },
        { id: "action-benefits", label: "Revisar beneficios recomendados", icon: "Sparkles", primary: false },
        { id: "action-claim", label: "Registrar consulta oficial", icon: "HelpCircle", primary: false }
      ]
    };

  } catch (error) {
    console.error('[chatService] Error comunicando con Webhook:', error.message);
    return buildFallbackResponse(userPrompt);
  }
};