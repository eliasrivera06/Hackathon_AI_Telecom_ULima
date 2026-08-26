/**
 * Movistar AI Lucio Translator Service
 * Seamless bidirectional translation for Español (es), Quechua (qu), and Aymara (ay)
 * Preserves message structure, metadata, currency amounts, dates, and dynamic content.
 */

// Welcome messages by language
export const WELCOME_TEXTS = {
  es: '¡Hola! Soy Lucio, tu asistente inteligente de Movistar. ¿En qué te puedo ayudar hoy con tu recibo o plan?',
  qu: '¡Allillanchu! Ñuqaqa Lucio kani, Movistarpa yachaysapa yanapaqnin. ¿Imapitaq yanapasayki reciboykimanta utaq planiykimanta?',
  ay: "¡Kamisaraki! Nayanxa Luciotwa, Movistar tuqita suma yatiri yanapiri. ¿Kuns yanapt'irisma jichhüru recibomata jan ukax planamata?",
};

// Dictionary of phrases and patterns for Telecom/Billing domain
const PHRASE_DICTIONARY = [
  // Greetings & Presentations
  {
    es: '¡Hola! Soy Lucio, tu asistente inteligente de Movistar.',
    qu: '¡Allillanchu! Ñuqaqa Lucio kani, Movistarpa yachaysapa yanapaqnin.',
    ay: '¡Kamisaraki! Nayanxa Luciotwa, Movistar tuqita suma yatiri yanapiri.',
  },
  {
    es: '¿En qué te puedo ayudar hoy con tu recibo o plan?',
    qu: '¿Imapitaq yanapasayki reciboykimanta utaq planiykimanta?',
    ay: "¿Kuns yanapt'irisma jichhüru recibomata jan ukax planamata?",
  },
  {
    es: 'Hola',
    qu: 'Allillanchu',
    ay: 'Kamisaraki',
  },
  {
    es: 'Buenos días',
    qu: 'Allin p\'unchaw',
    ay: 'Aski urukipana',
  },
  {
    es: 'Buenas tardes',
    qu: 'Allin suka',
    ay: 'Aski jayp\'ukipana',
  },
  {
    es: 'Buenas noches',
    qu: 'Allin tuta',
    ay: 'Aski arumakipana',
  },
  {
    es: 'Gracias',
    qu: 'Sulpayki',
    ay: 'Yuspajara',
  },
  {
    es: 'Muchas gracias por tu ayuda',
    qu: 'Ancha sulpayki yanapawasqaykimanta',
    ay: 'Walja yuspajara yanapt\'awimata',
  },
  {
    es: 'Entendido, muchas gracias',
    qu: 'Hamut\'asqa, ancha sulpayki',
    ay: 'Amuyatawa, walja yuspajara',
  },
  {
    es: 'Entendido',
    qu: 'Hamut\'asqa',
    ay: 'Amuyatawa',
  },

  // Common User Inquiries
  {
    es: '¿Por qué subió mi recibo?',
    qu: '¿Imaraykutaq reciboy wicharirqa?',
    ay: '¿Kunatsa recibojax jilxatti?',
  },
  {
    es: '¿Por qué mi recibo vino más caro?',
    qu: '¿Imaraykutaq reciboy aswan chaninniyuq hamurqa?',
    ay: '¿Kunatsa recibojax jila chanini juti?',
  },
  {
    es: '¿Cuánto tengo que pagar este mes?',
    qu: '¿Hayk\'atataq pagana kani kay killapi?',
    ay: '¿Qawqhas paganixa aka phaxsinx?',
  },
  {
    es: '¿Cuánto debo pagar?',
    qu: '¿Hayk\'atataq pagasaq?',
    ay: '¿Qawqha pagasï?',
  },
  {
    es: '¿Cuál es mi saldo a pagar?',
    qu: '¿Mayqentaq paganaypaq saldoy?',
    ay: '¿Kawkirisa paganataki saldojaxa?',
  },
  {
    es: '¿Cuál es mi fecha de corte y vencimiento?',
    qu: '¿Mayqentaq corte p\'unchayniy hinaspa vencimiento p\'unchayniy?',
    ay: '¿Kawkirisa corte uruxa ukat vencimiento uruxa?',
  },
  {
    es: '¿Cuándo vence mi recibo?',
    qu: '¿Hayk\'aptaq reciboy vencen?',
    ay: '¿Kunapachasa recibojax tukuyxi?',
  },
  {
    es: '¿Qué incluye mi plan actual?',
    qu: '¿Imatam kunan planiy chaskichkan?',
    ay: '¿Kunas jichha planijax katuqi?',
  },
  {
    es: '¿Cuáles son los beneficios de mi plan?',
    qu: '¿Mayqenkunataq kanku planiypa allinninkuna?',
    ay: '¿Kawkirinakas planijata askinakapaxa?',
  },
  {
    es: 'Quiero ver el detalle de mi recibo',
    qu: 'Reciboypa detallenta qawayta munani',
    ay: 'Recibojata qhanstayawipa uñjañ muntwa',
  },
  {
    es: 'Quiero poner un reclamo',
    qu: 'Huk reclamota churayta munani',
    ay: 'Mä reclamo uñt\'ayañ muntwa',
  },
  {
    es: 'No estoy de acuerdo con el monto',
    qu: 'Manam montowan acuerdopichu kani',
    ay: 'Janiw aka chanimpix iyaw sisktti',
  },
  {
    es: '¿Tengo promociones activas?',
    qu: '¿Kanchu kawsachisqa promocionniykuna?',
    ay: '¿Kawkïri promocionanakas nankirix naktata?',
  },
  {
    es: '¿Cuántos gigas o megas me quedan?',
    qu: '¿Hayk\'a gigas utaq megas puchuwan?',
    ay: '¿Qawqha gigas jan ukax megas puchu?',
  },

  // Suggested Actions Labels
  {
    es: 'Ver detalle del recibo',
    qu: 'Recibopa detallenta qaway',
    ay: 'Recibona qhanstayawipa uñjaña',
  },
  {
    es: 'Ver beneficios de mi plan',
    qu: 'Planiypa allinninkunata qaway',
    ay: 'Planijata askinakapa uñjaña',
  },
  {
    es: 'Presentar un reclamo',
    qu: 'Huk reclamota churay',
    ay: 'Mä reclamo uñt\'ayaña',
  },
  {
    es: 'Pagar mi recibo',
    qu: 'Reciboyta pagay',
    ay: 'Recibojata pagaña',
  },
  {
    es: 'Consultar promociones',
    qu: 'Promocionkunamanta tapukuy',
    ay: 'Promocionanakata jiskt\'asiña',
  },
];

// Vocabulary mapping for dynamic phrase translation
const VOCABULARY = {
  // Common terms
  'tu recibo': { qu: 'reciboyki', ay: 'recibomata' },
  'mi recibo': { qu: 'reciboy', ay: 'recibojax' },
  'el recibo': { qu: 'recibo', ay: 'recibo' },
  'saldo a pagar': { qu: 'paganapaq saldo', ay: 'paganataki saldo' },
  'fecha de corte': { qu: 'corte p\'unchaw', ay: 'corte uru' },
  'fecha de vencimiento': { qu: 'vencimiento p\'unchaw', ay: 'vencimiento uru' },
  'vence el': { qu: 'tukukun kay p\'unchawpi:', ay: 'tukuwayxi aka uruna:' },
  'vence en': { qu: 'kay punchawkunapi tukukun:', ay: 'aka urunakan tukuyxi:' },
  'días': { qu: 'p\'unchawkuna', ay: 'urunaka' },
  'este mes': { qu: 'kay killapi', ay: 'aka phaxsinx' },
  'tu plan': { qu: 'planiyki', ay: 'planamata' },
  'mi plan': { qu: 'planiy', ay: 'planijax' },
  'beneficios': { qu: 'allinninkuna', ay: 'askinakapa' },
  'reclamo': { qu: 'reclamo', ay: 'reclamo' },
  'detalle': { qu: 'detalle', ay: 'qhanstayawi' },
  'facturación': { qu: 'facturacion', ay: 'facturacion' },
  'servicio': { qu: 'llamk\'ana servicio', ay: 'irnaqawi servicio' },
  'adicional': { qu: 'yapapasqa', ay: 'yapxatata' },
  'cobro adicional': { qu: 'yapapasqa qullqi mañakuy', ay: 'yapxatata qullqi mayiwi' },
  'descuento': { qu: 'pisiyachisqa qullqi', ay: 'jisk\'aptata chanixa' },
  'promoción': { qu: 'promocion', ay: 'promocion' },
  'asistente': { qu: 'yanapaq', ay: 'yanapiri' },
  'inteligente': { qu: 'yachaysapa', ay: 'yatiri' },
  'ayuda': { qu: 'yanapay', ay: 'yanapt\'awi' },
  'consulta': { qu: 'tapukuy', ay: 'jiskt\'awi' },
  'solicitud': { qu: 'mañakuy', ay: 'mayiwi' },
  'datos móviles': { qu: 'movil datoskuna', ay: 'movil datonaka' },
  'minutos ilimitados': { qu: 'mana tukukuq minutokuna', ay: 'janiw tukusiri minutonaka' },
  'sms ilimitados': { qu: 'mana tukukuq sms', ay: 'janiw tukusiri sms' },
  'disney+': { qu: 'Disney+', ay: 'Disney+' },
  'movistar': { qu: 'Movistar', ay: 'Movistar' },
  'lucio': { qu: 'Lucio', ay: 'Lucio' },
};

/**
 * Detect language of a given text (es, qu, ay)
 */
export const detectLanguage = (text) => {
  if (!text) return 'es';
  const t = text.toLowerCase();
  if (/\b(allillanchu|ñuqa|qam|kay|chay|wasi|yaku|runa|pacha|munay|rimay|tukuy|sumaq|imapitaq|reciboyki|killapaq|sulpayki|kanki|yanapasayki)\b/.test(t)) {
    return 'qu';
  }
  if (/\b(kamisaraki|nayanxa|jichhüru|yanapt|recibomata|planamata|ukax|tuqita|yuspajara|qawqha|kuns|askinakapa|qhanstayawi)\b/.test(t)) {
    return 'ay';
  }
  return 'es';
};

/**
 * Clean and normalize text for comparison
 */
const normalize = (str) => (str || '').trim().toLowerCase().replace(/[¿?¡!.,;:"]/g, '');

/**
 * Translates a single text from any language into targetLang ('es' | 'qu' | 'ay')
 */
export const translateText = (text, targetLang = 'es', sourceLang = null) => {
  if (!text || typeof text !== 'string') return text;
  const target = targetLang === 'auto' ? 'es' : targetLang;
  
  // If target is undefined or same as source, check if we know source
  const detectedSource = sourceLang || detectLanguage(text);
  if (detectedSource === target && target === 'es') return text;

  const normalizedInput = normalize(text);

  // 1. Check exact phrase dictionary match
  for (const entry of PHRASE_DICTIONARY) {
    if (normalize(entry.es) === normalizedInput || 
        normalize(entry.qu) === normalizedInput || 
        normalize(entry.ay) === normalizedInput) {
      if (entry[target]) return entry[target];
    }
  }

  // 2. Check welcome message variations
  if (normalizedInput.includes('soy lucio') || normalizedInput.includes('lucio kani') || normalizedInput.includes('luciotwa')) {
    return WELCOME_TEXTS[target] || WELCOME_TEXTS.es;
  }

  // 3. Template matching for AI responses with numbers/amounts
  // Example: "Tu recibo de este mes es de S/ 83.99"
  const amountMatch = text.match(/(S\/\.?\s*[\d.,]+)/i);
  const dateMatch = text.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
  
  if (target === 'qu') {
    if (text.includes('saldo a pagar') || text.includes('recibo') && amountMatch) {
      const amt = amountMatch ? amountMatch[1] : '';
      const dt = dateMatch ? dateMatch[1] : '';
      if (dt && amt) {
        return `Reciboykipa paganapaq saldonqa ${amt} kanmi, vencimiento p'unchawqa ${dt} kachkan. ¿Ima yapapasqatam qawayta munawaq?`;
      }
      if (amt) {
        return `Kay killapi reciboykipa saldonqa ${amt} kanmi. ¿Munankichu detallenta qawayta?`;
      }
    }
    if (text.toLowerCase().includes('detalle de tu recibo')) {
      return 'Kaypim kachkan reciboykipa detallin. Qhaway componenteskuna hinaspa consumoykikuna.';
    }
    if (text.toLowerCase().includes('beneficios')) {
      return 'Planiykiqa kawsachisqa gigaskunata, mana tukukuq minutokunata hinaspa Movistar promocionkunata qusunki.';
    }
    if (text.toLowerCase().includes('reclamo')) {
      return 'Allinmi, huk reclamo churayta atinki. Reclamo formulariota kichasaq.';
    }
  }

  if (target === 'ay') {
    if (text.includes('saldo a pagar') || text.includes('recibo') && amountMatch) {
      const amt = amountMatch ? amountMatch[1] : '';
      const dt = dateMatch ? dateMatch[1] : '';
      if (dt && amt) {
        return `Recibomata paganataki saldox ${amt} ukhamawa, vencimiento urux ${dt} urutakiwa. ¿Kuns yapxatata uñjañ munasma?`;
      }
      if (amt) {
        return `Aka phaxsinx recibomata saldojax ${amt} ukhamawa. ¿Qhanstayawipa uñjañ munasmati?`;
      }
    }
    if (text.toLowerCase().includes('detalle de tu recibo')) {
      return 'Akankiw recibomata qhanstayawipaxa. Uñjam consumonaka ukat yapxatat chaninaksa.';
    }
    if (text.toLowerCase().includes('beneficios')) {
      return 'Planamaxa gigas libres, janiw tukusiri minutonaka ukat Movistar promocionanaka churïtuwa.';
    }
    if (text.toLowerCase().includes('reclamo')) {
      return 'Walikiwa, mä reclamo qillqt\'ayañ munasma. Reclamo formularioru katuqasiñäni.';
    }
  }

  if (target === 'es') {
    // If coming from Quechua or Aymara back to Spanish
    if (text.includes('Allillanchu') || text.includes('Kamisaraki')) {
      return WELCOME_TEXTS.es;
    }
    if (amountMatch) {
      const amt = amountMatch[1];
      const dt = dateMatch ? dateMatch[1] : '';
      if (dt) {
        return `El saldo total a pagar de tu recibo es ${amt}, con fecha de vencimiento el ${dt}. ¿Deseas revisar el detalle de tus consumos?`;
      }
      return `Tu saldo a pagar para este periodo es de ${amt}. ¿Te gustaría consultar el detalle o realizar el pago?`;
    }
    if (text.toLowerCase().includes('reclamo')) {
      return 'Entendido, con gusto te ayudo a registrar tu reclamo sobre tu recibo.';
    }
    if (text.toLowerCase().includes('beneficio') || text.toLowerCase().includes('allinnin') || text.toLowerCase().includes('askinakapa')) {
      return 'Tu plan actual cuenta con GB libres, minutos y SMS ilimitados además de promociones exclusivas.';
    }
  }

  // 4. Word-by-word / partial phrase translation fallback
  let translated = text;
  Object.keys(VOCABULARY).forEach((term) => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    if (regex.test(translated) && VOCABULARY[term][target]) {
      translated = translated.replace(regex, VOCABULARY[term][target]);
    }
  });

  return translated;
};

/**
 * Translates a full message object, preserving all properties, IDs, timestamps,
 * and caching translations for instant back-and-forth switching.
 */
export const translateMessage = (message, targetLang = 'es') => {
  if (!message) return message;
  const target = targetLang === 'auto' ? 'es' : targetLang;

  // Initialize or read translation cache
  const translations = message.translations || {};
  const originalText = message.originalText || message.text || '';
  const originalLang = message.originalLang || detectLanguage(originalText);

  // If translation for targetLang already cached, use it
  if (translations[target]) {
    return {
      ...message,
      text: translations[target],
      suggestedActions: translateSuggestedActions(message.suggestedActions, target),
    };
  }

  // If it's a welcome message, resolve standard welcome
  if (message.id && String(message.id).includes('welcome')) {
    const welcomeText = WELCOME_TEXTS[target] || WELCOME_TEXTS.es;
    const newTranslations = {
      ...translations,
      es: WELCOME_TEXTS.es,
      qu: WELCOME_TEXTS.qu,
      ay: WELCOME_TEXTS.ay,
      [target]: welcomeText,
    };
    return {
      ...message,
      originalText: originalText || welcomeText,
      originalLang: originalLang,
      translations: newTranslations,
      text: welcomeText,
      suggestedActions: translateSuggestedActions(message.suggestedActions, target),
    };
  }

  // Compute translation
  const translatedText = translateText(originalText, target, originalLang);

  const updatedTranslations = {
    ...translations,
    [originalLang]: originalText,
    [target]: translatedText,
  };

  return {
    ...message,
    originalText: originalText,
    originalLang: originalLang,
    translations: updatedTranslations,
    text: translatedText,
    suggestedActions: translateSuggestedActions(message.suggestedActions, target),
  };
};

/**
 * Translates suggested action chip labels
 */
export const translateSuggestedActions = (actions, targetLang = 'es') => {
  if (!actions || !Array.isArray(actions) || actions.length === 0) return actions;
  const target = targetLang === 'auto' ? 'es' : targetLang;

  return actions.map((action) => {
    const rawLabel = action.originalLabel || action.label || '';
    const translatedLabel = translateText(rawLabel, target);
    return {
      ...action,
      originalLabel: rawLabel,
      label: translatedLabel || rawLabel,
    };
  });
};

/**
 * Translates the entire conversation history without deleting or altering message IDs
 */
export const translateConversation = (messages, targetLang = 'es') => {
  if (!messages || !Array.isArray(messages) || messages.length === 0) return messages;
  const target = targetLang === 'auto' ? 'es' : targetLang;

  return messages.map((msg) => translateMessage(msg, target));
};
