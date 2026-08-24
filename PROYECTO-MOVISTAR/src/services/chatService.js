/**
 * Chat Service Layer for Movistar Lucía AI
 * Centralizes HTTP communication with Make AI Agent Webhook.
 * 100% User Account Chat Isolation & Memory Persistence.
 */

const SESSION_STORAGE_KEY = 'movistar_chat_session_id';
const USER_PHONE_KEY = 'movistar_user_phone';
const SUBSCRIBER_KEY = 'movistar_subscriber_key';

/**
 * Genera la clave de almacenamiento única para cada número de teléfono
 */
export const getStorageKey = (phone = null) => {
  const target = phone || getUserPhone() || 'guest';
  return `movistar_chat_messages_${target}`;
};

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
 * Reset/regenerate session ID for a specific user phone conversation.
 */
export const resetSessionId = (phone = null) => {
  const targetPhone = phone || getUserPhone();
  const newSessionId = targetPhone ? `user_${targetPhone}_${Date.now()}` : `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  localStorage.setItem(SESSION_STORAGE_KEY, newSessionId);
  const key = getStorageKey(targetPhone);
  localStorage.removeItem(key);
  return newSessionId;
};

/**
 * Save & Load persistent chat messages isolated PER TELEPHONE NUMBER
 */
export const getSavedMessages = (phoneOrInitial = null, defaultInitial = []) => {
  let phone = null;
  let defaultInitialMessages = defaultInitial;

  if (typeof phoneOrInitial === 'string') {
    phone = phoneOrInitial;
  } else if (Array.isArray(phoneOrInitial)) {
    defaultInitialMessages = phoneOrInitial;
  }

  const key = getStorageKey(phone);
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Evitar cargar conversaciones residuales antiguas de pruebas globales
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.id !== 'msg-1') {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[chatService] Error cargando mensajes guardados para clave:', key, err);
  }
  return defaultInitialMessages;
};

export const saveMessages = (messagesOrPhone, messagesParam = null) => {
  let phone = null;
  let messages = [];

  if (typeof messagesOrPhone === 'string') {
    phone = messagesOrPhone;
    messages = messagesParam || [];
  } else {
    phone = getUserPhone();
    messages = messagesOrPhone || [];
  }

  const key = getStorageKey(phone);
  try {
    localStorage.setItem(key, JSON.stringify(messages));
  } catch (err) {
    console.warn('[chatService] Error guardando mensajes para clave:', key, err);
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
    return { success: false, error: 'URL de webhook de login no configurada en variables de entorno.' };
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

    // Guardar usuario y subscriber_key verificados para esta cuenta específica
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
 * Helper to parse text response from various Make return structures
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
 * Error fallback response if network connection fails
 */
const buildErrorFallbackResponse = (errorMessage) => {
  return {
    sender: 'assistant',
    agentName: 'Lucía',
    agentRole: 'Asistente de Facturación Movistar',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    text: errorMessage || 'Lo sentimos, hubo un problema de comunicación con el servicio de Lucía AI. Por favor intenta enviar tu consulta nuevamente.',
    hasVisualComparison: false,
    comparisonData: null,
    showModal: null,
    suggestedActions: []
  };
};

const detectLanguage = (text) => {
  const normalized = text.toLowerCase();

  const quechuaPatterns = [
    /\bimaynallan\b/, /\ballillanchu\b/, /\brimaykusun\b/, /\byachay\b/,
    /\bñuqa\b/, /\bqam\b/, /\bpay\b/, /\bkay\b/, /\bchay\b/,
    /\bwasi\b/, /\byaku\b/, /\bruna\b/, /\bpacha\b/, /\bñan\b/,
    /\bmunay\b/, /\brimay\b/, /\bmikuy\b/, /\btukuy\b/, /\bhatun\b/,
    /\bhuchuy\b/, /\bsumaq\b/, /\bkusiy\b/, /\bllank['']ay\b/,
    /\bwillakuy\b/, /\btapukuy\b/, /\byachachiy\b/, /\bmanam\b/,
    /\barí\b/, /\bimata\b/, /\bmaypi\b/, /\bhayk['']a\b/,
    /\bpitaq\b/, /\bimataq\b/, /\bñuqanchik\b/, /\bqamkuna\b/,
    /\bpaykuna\b/, /\ballillanmi\b/, /\bsulpayki\b/, /\bañay\b/,
    /\bpaqarin\b/, /\bkuska\b/, /\bawqa\b/, /\bllaqta\b/,
    /\bmasiy?\b/, /\bkamachiy\b/, /\brunasimi\b/
  ];

  const aymaraPatterns = [
    /\bkamisaki\b/, /\bwaliki\b/, /\bjaniw\b/, /\bjisa\b/,
    /\bjiwasa\b/, /\bnaya\b/, /\bjupa\b/, /\bjuma\b/,
    /\buta\b/, /\buma\b/, /\bjaqi\b/, /\buraq[ie]\b/,
    /\bthakhi\b/, /\bmunañ[ai]\b/, /\bsarañ[ai]\b/, /\bmanq['']añ[ai]\b/,
    /\bjach['']a\b/, /\bjisk['']a\b/, /\bsuma\b/, /\birnaqañ[ai]\b/,
    /\byatiqañ[ai]\b/, /\baruskipañ[ai]\b/, /\buñjañ[ai]\b/,
    /\bjaniwa\b/, /\bkunasa\b/, /\bkawkisa\b/, /\bqawqha\b/,
    /\bkhitisa\b/, /\bnanaka\b/, /\bjumanaka\b/, /\bnayra\b/,
    /\bqhipa\b/, /\bpachamama\b/, /\bmarkasa\b/, /\byuspagar[ai]\b/,
    /\bqharüru\b/, /\baymara\b/, /\btatitu\b/
  ];

  let quechuaScore = 0;
  for (const pattern of quechuaPatterns) {
    if (pattern.test(normalized)) quechuaScore++;
  }

  let aymaraScore = 0;
  for (const pattern of aymaraPatterns) {
    if (pattern.test(normalized)) aymaraScore++;
  }

  if (quechuaScore >= 2 || (quechuaScore === 1 && aymaraScore === 0)) return 'qu';
  if (aymaraScore >= 2 || (aymaraScore === 1 && quechuaScore === 0)) return 'ay';

  return 'es';
};

/**
 * Send user message to Make AI Agent Webhook
 */
export const sendMessage = async (userPrompt, customWebhookUrl = null, languageOverride = null) => {
  const sessionId = getSessionId();
  const userPhone = getUserPhone();
  const subscriberKey = getSubscriberKey();
  const webhookUrl = customWebhookUrl || import.meta.env.VITE_MAKE_WEBHOOK_URL || import.meta.env.VITE_N8N_WEBHOOK_URL;

  // Prioridad: idioma manual del usuario > detección automática
  const language = languageOverride || detectLanguage(userPrompt);

  // Payload ESTRICTO de 3 campos para Make.com
  const payload = {
    subscriber_key: subscriberKey,
    message: userPrompt,
    language: language,
  };

  // Auditoría: imprimir el payload EXACTO que se envía al webhook
  console.log('[chatService] ══════════════════════════════════════');
  console.log('[chatService] PAYLOAD EXACTO enviado a Make webhook:');
  console.log(JSON.stringify(payload, null, 2));
  console.log('[chatService] Webhook URL:', webhookUrl);
  console.log('[chatService] Idioma detectado:', detectLanguage(userPrompt), '| Idioma override:', languageOverride, '| Idioma final:', language);
  console.log('[chatService] ══════════════════════════════════════');

  if (!webhookUrl) {
    console.warn('[chatService] Webhook URL no configurada en VITE_MAKE_WEBHOOK_URL.');
    return buildErrorFallbackResponse('La URL del Webhook de Make no se encuentra configurada en el entorno.');
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`El Webhook respondió con status HTTP ${response.status}`);
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

    console.log('[chatService] Respuesta REAL recibida de Make:', textResponse, data);

    if (!textResponse) {
      throw new Error('El Webhook no devolvió un cuerpo de texto válido');
    }

    const comparisonData = (data && (data.comparison || data.receiptComparison)) || null;
    const hasVisualComparison = Boolean(comparisonData || (data && data.hasVisualComparison));
    const suggestedActions = (data && (data.suggestedActions || data.actions)) || [];

    return {
      sender: 'assistant',
      agentName: 'Lucía',
      agentRole: 'Asistente de Facturación Movistar',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textResponse,
      hasVisualComparison: hasVisualComparison,
      comparisonData: comparisonData,
      showModal: data?.showModal || null,
      suggestedActions: suggestedActions
    };

  } catch (error) {
    console.error('[chatService] Error comunicando con Webhook de Make:', error.message);
    return buildErrorFallbackResponse(`No se pudo conectar con el agente de Make (${error.message}). Por favor verifica tu conexión e intenta nuevamente.`);
  }
};