/**
 * Chat Service Layer for Movistar Lucio AI
 * Centralizes HTTP communication with Make AI Agent Webhook.
 * 100% User Account Chat Isolation & Memory Persistence.
 */

const SESSION_STORAGE_KEY = 'movistar_chat_session_id';
const USER_PHONE_KEY = 'movistar_user_phone';
const SUBSCRIBER_KEY = 'movistar_subscriber_key';
const BILLING_STORAGE_PREFIX = 'movistar_billing_info_';

export const WELCOME_MESSAGES_BY_LANG = {
  es: '¡Hola! Soy Lucio, tu asistente inteligente de Movistar. ¿En qué te puedo ayudar hoy con tu recibo o plan?',
  auto: '¡Hola! Soy Lucio, tu asistente inteligente de Movistar. ¿En qué te puedo ayudar hoy con tu recibo o plan?',
  qu: "¡Allillanchu! Ñuqaqa Lucio kani, Movistarpa yachaysapa yanapaqnin. ¿Imapitaq yanapasayki reciboykimanta utaq planiykimanta?",
  ay: "¡Kamisaraki! Nayanxa Luciotwa, Movistar tuqita suma yatiri yanapiri. ¿Kuns yanapt'irisma jichhüru recibomata jan ukax planamata?",
};

export const getCleanWelcomeMessage = (lang = 'es') => [
  {
    id: 'msg-welcome-' + Date.now(),
    sender: 'assistant',
    agentName: 'Lucio',
    agentRole: 'Asistente de Recibos Movistar',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    text: WELCOME_MESSAGES_BY_LANG[lang] || WELCOME_MESSAGES_BY_LANG.es,
    suggestedActions: [],
  }
];

/**
 * Storage helpers for customer billing data
 */
export const getStoredBillingInfo = (phone = null) => {
  const target = phone || getUserPhone();
  if (!target) return null;
  try {
    const saved = localStorage.getItem(`${BILLING_STORAGE_PREFIX}${target}`);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.warn('[chatService] Error cargando datos de facturación guardados:', err);
  }
  return null;
};

export const saveStoredBillingInfo = (phone, data) => {
  if (!phone || !data) return;
  try {
    localStorage.setItem(`${BILLING_STORAGE_PREFIX}${phone}`, JSON.stringify(data));
  } catch (err) {
    console.warn('[chatService] Error guardando datos de facturación:', err);
  }
};

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
        return parsed.map((m) => {
          if (m.id && String(m.id).includes('welcome')) {
            return { ...m, suggestedActions: [] };
          }
          return m;
        });
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
    const resolvedSubscriberKey = (data && (data.subscriber_key || data.subscriberKey)) ? (data.subscriber_key || data.subscriberKey) : phoneNumber;
    setSubscriberKey(resolvedSubscriberKey);
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
 * Consulta la base de datos a través de Make para obtener los datos de facturación en tiempo real
 */
export const fetchClientBillingInfo = async (phoneNumber, subscriberKey = null) => {
  const phone = phoneNumber || getUserPhone();
  const subKey = subscriberKey || getSubscriberKey() || phone;
  const webhookUrl = (import.meta.env.VITE_MAKE_WEBHOOK_URL_CEL || import.meta.env.VITE_N8N_WEBHOOK_URL_CEL || import.meta.env.VITE_MAKE_WEBHOOK_URL);

  const defaultInfo = {
    fechaCorte: '17/07/2026',
    fechaVencimiento: '05/07/2026',
    saldoAPagar: 'S/ 83.99',
    venceTexto: 'Vence el 05/07/2026',
    planName: 'Movistar Plus 4Gb',
    gbLibres: '3.5'
  };

  const stored = getStoredBillingInfo(phone);

  if (!webhookUrl || !phone) {
    return stored || defaultInfo;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: `billing_sync_${phone}`,
        subscriber_key: subKey,
        telefono: phone,
        message: '¿Cuál es mi fecha de corte, fecha de vencimiento y saldo a pagar de mi último recibo?',
        language: 'es',
      }),
    });

    if (!response.ok) {
      return stored || defaultInfo;
    }

    let text = '';
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const resData = await response.json();
      text = extractResponseText(resData) || '';
    } else {
      text = await response.text();
    }

    // Parsear Saldo a pagar
    let saldo = '83.99';
    const saldoMatch = text.match(/saldo\s+(?:a\s+pagar\s+)?(?:total\s+)?(?:de\s+)?(?:S\/\.?\s*)?([\d.,]+)/i) ||
      text.match(/([\d.,]+)\s*soles/i) ||
      text.match(/S\/\.?\s*([\d.,]+)/i);
    if (saldoMatch) {
      saldo = saldoMatch[1].replace(',', '.');
    }

    // Parsear Ciclo / Fecha de Corte
    let fechaCorte = stored?.fechaCorte || '17/07/2026';
    const cicloMatch = text.match(/ciclo\s+(?:más\s+reciente\s+)?(?:es\s+)?(\d{4})(\d{2})(\d{2})/i) ||
      text.match(/corte[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i);
    if (cicloMatch && cicloMatch[1] && cicloMatch[2] && cicloMatch[3]) {
      fechaCorte = `${cicloMatch[3]}/${cicloMatch[2]}/${cicloMatch[1]}`;
    }

    // Parsear Fecha de Vencimiento
    let fechaVencimiento = stored?.fechaVencimiento || '05/07/2026';
    const vencMatch = text.match(/vencimiento\s+(?:el\s+)?(\d{4})(\d{2})(\d{2})/i);
    if (vencMatch) {
      fechaVencimiento = `${vencMatch[3]}/${vencMatch[2]}/${vencMatch[1]}`;
    } else {
      const vencTextMatch = text.match(/vencimiento\s+(?:el\s+)?(\d{1,2})\s+de\s+([a-zA-Záéíóú]+)(?:\s+de\s+(\d{4}))?/i);
      if (vencTextMatch) {
        const meses = { enero: '01', febrero: '02', marzo: '03', abril: '04', mayo: '05', junio: '06', julio: '07', agosto: '08', setiembre: '09', septiembre: '09', octubre: '10', noviembre: '11', diciembre: '12' };
        const day = vencTextMatch[1].padStart(2, '0');
        const month = meses[vencTextMatch[2].toLowerCase()] || '07';
        const year = vencTextMatch[3] || '2026';
        fechaVencimiento = `${day}/${month}/${year}`;
      }
    }

    // Calcular días restantes de vencimiento
    let venceTexto = `Vence el ${fechaVencimiento}`;
    try {
      const [vDay, vMonth, vYear] = fechaVencimiento.split('/').map(Number);
      const dueDate = new Date(vYear, vMonth - 1, vDay);
      const now = new Date();
      const diffTime = dueDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 1) {
        venceTexto = `Vence en ${diffDays} días (${fechaVencimiento})`;
      } else if (diffDays === 1) {
        venceTexto = `Vence mañana (${fechaVencimiento})`;
      } else if (diffDays === 0) {
        venceTexto = `Vence hoy (${fechaVencimiento})`;
      } else {
        venceTexto = `Vence el ${fechaVencimiento}`;
      }
    } catch {
      venceTexto = `Vence el ${fechaVencimiento}`;
    }

    const billingResult = {
      fechaCorte,
      fechaVencimiento,
      saldoAPagar: `S/ ${parseFloat(saldo).toFixed(2)}`,
      venceTexto,
      planName: stored?.planName || 'Movistar Plus 4Gb',
      gbLibres: stored?.gbLibres || '3.5'
    };

    saveStoredBillingInfo(phone, billingResult);
    return billingResult;
  } catch (err) {
    console.error('[chatService] Error obteniendo datos de facturación de BD:', err);
    return stored || defaultInfo;
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
    agentName: 'Lucio',
    agentRole: 'Asistente de Facturación Movistar',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    text: errorMessage || 'Lo sentimos, hubo un problema de comunicación con el servicio de Lucio AI. Por favor intenta enviar tu consulta nuevamente.',
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
  const detectedOrOverride = languageOverride || detectLanguage(userPrompt);
  let makeLanguage = 'ES';
  const normLang = String(detectedOrOverride || '').trim().toLowerCase();
  if (normLang === 'qu' || normLang === 'quechua') {
    makeLanguage = 'QU';
  } else if (normLang === 'ay' || normLang === 'aymara') {
    makeLanguage = 'AY';
  } else {
    makeLanguage = 'ES';
  }

  // Payload ESTRICTO de 3 campos para Make.com (con language en mayúsculas requerido por los routers de Make)
  const payload = {
    subscriber_key: subscriberKey,
    message: userPrompt,
    language: makeLanguage,
  };

  // Auditoría: imprimir el payload EXACTO que se envía al webhook
  console.log('[chatService] ══════════════════════════════════════');
  console.log('[chatService] PAYLOAD EXACTO enviado a Make webhook:');
  console.log(JSON.stringify(payload, null, 2));
  console.log('[chatService] Webhook URL:', webhookUrl);
  console.log('[chatService] Idioma detectado:', detectLanguage(userPrompt), '| Idioma override:', languageOverride, '| Idioma final Make:', makeLanguage);
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

    // Make a veces devuelve "Accepted" como ACK mientras procesa en segundo plano.
    // En ese caso no mostramos nada al usuario: lanzamos un error controlado.
    const trimmed = (textResponse || '').trim();
    if (!trimmed || /^accepted$/i.test(trimmed) || /^ok$/i.test(trimmed)) {
      throw new Error('El agente de Lucio está procesando tu solicitud. Por favor intenta de nuevo en unos segundos.');
    }

    // Asegurar que el texto del chatbot no use negritas, decodifique entidades HTML como &#39; en apóstrofes y que siempre diga Lucio
    const sanitizedText = String(textResponse)
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&#x27;/gi, "'")
      .replace(/&quot;/g, '"')
      .replace(/&#34;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/Luc[ií]a/gi, (match) => {
        if (match === match.toUpperCase()) return 'LUCIO';
        if (match[0] === 'L') return 'Lucio';
        return 'lucio';
      })
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/<\/?(b|strong)>/gi, '');

    const comparisonData = (data && (data.comparison || data.receiptComparison)) || null;
    const hasVisualComparison = Boolean(comparisonData || (data && data.hasVisualComparison));
    const suggestedActions = (data && (data.suggestedActions || data.actions)) || [];

    return {
      sender: 'assistant',
      agentName: 'Lucio',
      agentRole: 'Asistente de Facturación Movistar',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: sanitizedText,
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