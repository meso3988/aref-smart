import { useState, useEffect } from 'react';

export function useVoice() {
  const [hasVoice, setHasVoice] = useState(false);
  const [voiceQuality, setVoiceQuality] = useState<'high' | 'medium' | 'low' | 'none'>('none');

  useEffect(() => {
    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      
      // Check for Microsoft Arabic voice (highest quality)
      const microsoftArabicVoice = voices.find(voice => 
        voice.name.includes('Microsoft') && voice.lang.includes('ar')
      );
      
      // Check for Google Arabic voice (medium quality)
      const googleArabicVoice = voices.find(voice => 
        voice.name.includes('Google') && voice.lang.includes('ar')
      );
      
      // Check for any Arabic voice (basic support)
      const anyArabicVoice = voices.find(voice => 
        voice.lang.includes('ar') || voice.lang.includes('AR')
      );

      if (microsoftArabicVoice) {
        setVoiceQuality('high');
        setHasVoice(true);
      } else if (googleArabicVoice) {
        setVoiceQuality('medium');
        setHasVoice(true);
      } else if (anyArabicVoice) {
        setVoiceQuality('low');
        setHasVoice(true);
      } else {
        setVoiceQuality('none');
        setHasVoice(false);
      }
    };

    // Check immediately
    checkVoices();

    // Also check when voices are loaded asynchronously
    window.speechSynthesis.onvoiceschanged = checkVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  return { hasVoice, voiceQuality };
}