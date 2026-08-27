/**
 * Movistar AI Lucio Text-To-Speech (TTS) Service
 * Ensures clear, friendly Male Voice across any language (Spanish, Quechua, Aymara).
 * Manages playback state: Play, Pause, Resume, Stop.
 */

// Mapping of TTS language codes
export const TTS_LANG_CODES = {
  es: 'es-PE',
  qu: 'es-PE', // Quechua uses Andean Peruvian Spanish phonetics fallback
  ay: 'es-PE', // Aymara uses Andean Peruvian Spanish phonetics fallback
};

// Global active utterance reference to prevent garbage collection issues in Chrome
let activeUtterance = null;
let currentPlayingMessageId = null;

// Male voice indicator patterns
const MALE_VOICE_REGEX = /(male|hombre|raul|pablo|jorge|diego|carlos|david|guy|eric|george|stefan|antonio|alvaro|manuel|miguel|rodrigo|enrique|pedro|gonzalo|tomas|hector|juan|luis|alberto|mateo|martin|federico|alonso)/i;
const FEMALE_VOICE_REGEX = /(female|mujer|helena|sabina|zira|laura|monica|maria|lucia|sofia|victoria|carmen|rosa|elena|paula|hannah|hazel|susan|catherine|clara|paloma|ines|mia|eva|camila)/i;

/**
 * Returns available voices from SpeechSynthesis API
 */
export const getAvailableVoices = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices() || [];
};

/**
 * Finds the best male voice for a given language code
 */
export const findMaleVoice = (langCode = 'es-PE') => {
  const voices = getAvailableVoices();
  if (!voices || voices.length === 0) return null;

  const prefix = (langCode || 'es').split('-')[0].toLowerCase();
  const langVoices = voices.filter((v) => v.lang.toLowerCase().startsWith(prefix));
  const pool = langVoices.length > 0 ? langVoices : voices;

  // 1. First priority: Explicit male voice in same language
  const maleInLang = langVoices.find((v) => MALE_VOICE_REGEX.test(v.name) && !FEMALE_VOICE_REGEX.test(v.name));
  if (maleInLang) return maleInLang;

  // 2. Second priority: Non-female voice in same language
  const notFemaleInLang = langVoices.find((v) => !FEMALE_VOICE_REGEX.test(v.name));
  if (notFemaleInLang) return notFemaleInLang;

  // 3. Third priority: Any male voice available in system
  const anyMale = voices.find((v) => MALE_VOICE_REGEX.test(v.name) && !FEMALE_VOICE_REGEX.test(v.name));
  if (anyMale) return anyMale;

  // 4. Fallback to first voice
  return pool[0] || voices[0] || null;
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
export const speakMessage = ({
  messageId,
  text,
  lang = 'es',
  onStart = () => {},
  onEnd = () => {},
  onError = () => {},
  onPause = () => {},
  onResume = () => {},
}) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('[ttsService] Web Speech API no está disponible en este navegador.');
    onError(new Error('SpeechSynthesis no soportado'));
    return;
  }

  // Cancel any ongoing speech
  stopAllSpeech();

  const cleanText = prepareTtsText(text);
  if (!cleanText) return;

  const targetTtsLang = TTS_LANG_CODES[lang] || 'es-PE';
  const utterance = new SpeechSynthesisUtterance(cleanText);

  // Set language & Male pitch parameters
  utterance.lang = targetTtsLang;
  utterance.pitch = 0.85; // Lower pitch characteristic of natural male voice
  utterance.rate = 1.0;  // Clear, natural speaking speed
  utterance.volume = 1.0;

  // Select Male Voice
  const maleVoice = findMaleVoice(targetTtsLang);
  if (maleVoice) {
    utterance.voice = maleVoice;
  }

  // Setup callbacks
  utterance.onstart = () => {
    currentPlayingMessageId = messageId;
    activeUtterance = utterance;
    onStart();
    window.dispatchEvent(new CustomEvent('lucio:tts-start', { detail: { messageId } }));
  };

  utterance.onend = () => {
    if (currentPlayingMessageId === messageId) {
      currentPlayingMessageId = null;
      activeUtterance = null;
    }
    onEnd();
    window.dispatchEvent(new CustomEvent('lucio:tts-end', { detail: { messageId } }));
  };

  utterance.onerror = (err) => {
    if (currentPlayingMessageId === messageId) {
      currentPlayingMessageId = null;
      activeUtterance = null;
    }
    onError(err);
    window.dispatchEvent(new CustomEvent('lucio:tts-end', { detail: { messageId } }));
  };

  utterance.onpause = () => {
    onPause();
    window.dispatchEvent(new CustomEvent('lucio:tts-pause', { detail: { messageId } }));
  };

  utterance.onresume = () => {
    onResume();
    window.dispatchEvent(new CustomEvent('lucio:tts-resume', { detail: { messageId } }));
  };

  activeUtterance = utterance;
  currentPlayingMessageId = messageId;

  // Start speaking
  window.speechSynthesis.speak(utterance);
};

/**
 * Pause current speech
 */
export const pauseSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.pause();
  }
};

/**
 * Resume current paused speech
 */
export const resumeSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.resume();
  }
};

/**
 * Stop all speech completely and reset audio state
 */
export const stopAllSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  const previousId = currentPlayingMessageId;
  currentPlayingMessageId = null;
  activeUtterance = null;
  if (previousId) {
    window.dispatchEvent(new CustomEvent('lucio:tts-end', { detail: { messageId: previousId } }));
  }
};

/**
 * Gets ID of currently playing message
 */
export const getCurrentPlayingMessageId = () => currentPlayingMessageId;