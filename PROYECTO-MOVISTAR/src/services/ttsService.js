/**
 * Movistar AI Lucio Text-To-Speech (TTS) Service
 * Voz masculina priorizada para español, Quechua y Aymara.
 * Maneja playback state: Play, Pause, Resume, Stop.
 */

// Mapping of TTS language codes
export const TTS_LANG_CODES = {
  es: 'es-PE',
  qu: 'es-PE', // Quechua usa fonética española peruana como fallback
  ay: 'es-PE', // Aymara usa fonética española peruana como fallback
};

// Global active utterance reference to prevent garbage collection issues in Chrome
let activeUtterance = null;
let currentPlayingMessageId = null;

// Male voice indicator patterns
const MALE_VOICE_REGEX =
  /(male|hombre|raul|raúl|pablo|jorge|diego|carlos|david|guy|eric|george|stefan|antonio|alvaro|álvaro|manuel|miguel|rodrigo|enrique|pedro|gonzalo|tomas|tomás|hector|héctor|juan|luis|alberto|mateo|martin|martín|federico|alonso|daniel|alejandro|fernando|francisco|gabriel|sebastian|sebastián|andres|andrés|jose|josé|marcos|oscar|óscar|ricardo|sergio|victor|víctor)/i;

// Female voice indicator patterns
const FEMALE_VOICE_REGEX =
  /(female|mujer|helena|sabina|zira|laura|monica|mónica|maria|maría|lucia|lucía|sofia|sofía|victoria|carmen|rosa|elena|paula|hannah|hazel|susan|catherine|clara|paloma|ines|inés|mia|mía|eva|camila|ana|beatriz|isabel|patricia|silvia|teresa|gabriela|valeria|daniela|carolina|natalia|alejandra)/i;

/**
 * Returns available voices from SpeechSynthesis API
 */
export const getAvailableVoices = () => {
  if (
    typeof window === 'undefined' ||
    !('speechSynthesis' in window)
  ) {
    return [];
  }

  return window.speechSynthesis.getVoices() || [];
};

/**
 * Wait until browser loads SpeechSynthesis voices.
 *
 * Some browsers, especially Chrome/Edge, initially return []
 * from speechSynthesis.getVoices().
 */
export const waitForVoices = () => {
  return new Promise((resolve) => {
    if (
      typeof window === 'undefined' ||
      !('speechSynthesis' in window)
    ) {
      resolve([]);
      return;
    }

    const speechSynthesis = window.speechSynthesis;

    // Check immediately
    const voices = speechSynthesis.getVoices();

    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    let resolved = false;

    const handleVoicesChanged = () => {
      const loadedVoices = speechSynthesis.getVoices();

      if (loadedVoices.length > 0 && !resolved) {
        resolved = true;

        speechSynthesis.removeEventListener(
          'voiceschanged',
          handleVoicesChanged
        );

        resolve(loadedVoices);
      }
    };

    speechSynthesis.addEventListener(
      'voiceschanged',
      handleVoicesChanged
    );

    // Fallback in case browser does not fire voiceschanged
    setTimeout(() => {
      if (!resolved) {
        resolved = true;

        speechSynthesis.removeEventListener(
          'voiceschanged',
          handleVoicesChanged
        );

        resolve(speechSynthesis.getVoices() || []);
      }
    }, 3000);
  });
};

/**
 * Finds the best male voice for a given language code.
 */
export const findMaleVoice = () => {
  const voices = getAvailableVoices();

  if (!voices || voices.length === 0) {
    console.warn('[TTS] No hay voces disponibles.');
    return null;
  }

  // Buscar directamente Microsoft Pablo
  const pabloVoice = voices.find(
    (voice) =>
      voice.name === 'Microsoft Pablo - Spanish (Spain)'
  );

  if (pabloVoice) {
    console.log(
      '[TTS] Voz seleccionada directamente:',
      pabloVoice.name,
      pabloVoice.lang
    );

    return pabloVoice;
  }

  console.warn(
    '[TTS] No se encontró Microsoft Pablo.'
  );

  return null;
};


/**
 * Clean text for audio synthesis
 */
export const prepareTtsText = (rawText) => {
  if (!rawText) return '';

  return rawText
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#34;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/Luc[ií]a/gi, 'Lucio')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/https?:\/\/\S+/gi, '')
    .trim();
};

/**
 * Play text using male speech synthesis
 */
export const speakMessage = async ({
  messageId,
  text,
  lang = 'es',
  onStart = () => {},
  onEnd = () => {},
  onError = () => {},
  onPause = () => {},
  onResume = () => {},
}) => {
  if (
    typeof window === 'undefined' ||
    !('speechSynthesis' in window)
  ) {
    console.warn(
      '[ttsService] Web Speech API no está disponible en este navegador.'
    );

    onError(new Error('SpeechSynthesis no soportado'));
    return;
  }

  // Cancel any ongoing speech
  stopAllSpeech();

  const cleanText = prepareTtsText(text);

  if (!cleanText) {
    return;
  }

  const targetTtsLang =
    TTS_LANG_CODES[lang] || 'es-PE';

  const utterance =
    new SpeechSynthesisUtterance(cleanText);

  // ------------------------------------------------------------
  // Language & voice parameters
  // ------------------------------------------------------------

  utterance.lang = targetTtsLang;

  // Lower pitch to make the voice sound deeper.
  // NOTE: This does NOT change a female voice into a male voice.
  utterance.pitch = 0.85;

  utterance.rate = 1.0;
  utterance.volume = 1.0;

  // ------------------------------------------------------------
  // IMPORTANT:
  // Wait for browser voices to load
  // ------------------------------------------------------------

  await waitForVoices();

  // ------------------------------------------------------------
  // DEBUG:
  // Show every available voice in browser console
  // ------------------------------------------------------------

  const availableVoices = getAvailableVoices();

  console.table(
    availableVoices.map((voice) => ({
      name: voice.name,
      lang: voice.lang,
      localService: voice.localService,
      default: voice.default,
    }))
  );

  // ------------------------------------------------------------
  // Select male voice
  // ------------------------------------------------------------

  const maleVoice = findMaleVoice(targetTtsLang);

  console.log('[TTS] =============================');
  console.log('[TTS] Idioma solicitado:', targetTtsLang);
  console.log('[TTS] Voz seleccionada:', maleVoice?.name);
  console.log('[TTS] Idioma de la voz:', maleVoice?.lang);
  console.log('[TTS] =============================');

  if (maleVoice) {
    utterance.voice = maleVoice;
  } else {
    console.warn(
      '[TTS] No fue posible seleccionar una voz específica.'
    );
  }

  // ------------------------------------------------------------
  // Setup callbacks
  // ------------------------------------------------------------

  utterance.onstart = () => {
    currentPlayingMessageId = messageId;
    activeUtterance = utterance;

    onStart();

    window.dispatchEvent(
      new CustomEvent('lucio:tts-start', {
        detail: { messageId },
      })
    );
  };

  utterance.onend = () => {
    if (currentPlayingMessageId === messageId) {
      currentPlayingMessageId = null;
      activeUtterance = null;
    }

    onEnd();

    window.dispatchEvent(
      new CustomEvent('lucio:tts-end', {
        detail: { messageId },
      })
    );
  };

  utterance.onerror = (err) => {
    if (currentPlayingMessageId === messageId) {
      currentPlayingMessageId = null;
      activeUtterance = null;
    }

    console.error('[TTS] Error:', err);

    onError(err);

    window.dispatchEvent(
      new CustomEvent('lucio:tts-end', {
        detail: { messageId },
      })
    );
  };

  utterance.onpause = () => {
    onPause();

    window.dispatchEvent(
      new CustomEvent('lucio:tts-pause', {
        detail: { messageId },
      })
    );
  };

  utterance.onresume = () => {
    onResume();

    window.dispatchEvent(
      new CustomEvent('lucio:tts-resume', {
        detail: { messageId },
      })
    );
  };

  // ------------------------------------------------------------
  // Keep references to prevent garbage collection
  // ------------------------------------------------------------

  activeUtterance = utterance;
  currentPlayingMessageId = messageId;

  // ------------------------------------------------------------
  // Start speaking
  // ------------------------------------------------------------

  window.speechSynthesis.speak(utterance);
};

/**
 * Pause current speech
 */
export const pauseSpeech = () => {
  if (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window
  ) {
    window.speechSynthesis.pause();
  }
};

/**
 * Resume current paused speech
 */
export const resumeSpeech = () => {
  if (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window
  ) {
    window.speechSynthesis.resume();
  }
};

/**
 * Stop all speech completely and reset audio state
 */
export const stopAllSpeech = () => {
  if (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window
  ) {
    window.speechSynthesis.cancel();
  }

  const previousId = currentPlayingMessageId;

  currentPlayingMessageId = null;
  activeUtterance = null;

  if (
    previousId &&
    typeof window !== 'undefined'
  ) {
    window.dispatchEvent(
      new CustomEvent('lucio:tts-end', {
        detail: {
          messageId: previousId,
        },
      })
    );
  }
};

/**
 * Gets ID of currently playing message
 */
export const getCurrentPlayingMessageId = () =>
  currentPlayingMessageId;
