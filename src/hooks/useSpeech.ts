import { useRef, useState, useCallback, useEffect } from 'react';

export function useSpeech() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentChunkRef = useRef<number>(0);
  const chunksRef = useRef<string[]>([]);
  const resumePositionRef = useRef<number>(0);

  const getArabicVoice = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();
    
    return (
      voices.find(voice => 
        voice.name.includes('Microsoft') && 
        voice.lang.includes('ar-SA')
      ) ||
      voices.find(voice => 
        (voice.name.includes('Hassan') || 
         voice.name.includes('Ahmed') || 
         voice.name.includes('Arabic')) && 
        voice.lang.includes('ar')
      ) ||
      voices.find(voice => 
        voice.name.includes('Google') && 
        voice.lang.includes('ar')
      ) ||
      voices.find(voice => 
        voice.lang.includes('ar') || 
        voice.lang.includes('AR')
      )
    );
  }, []);

  // Function to clean text from punctuation marks before speech
  const cleanTextForSpeech = (text: string): string => {
    return text
      .replace(/[.!?؟،]/g, ' ') // Remove punctuation marks
      .replace(/\s+/g, ' ')     // Replace multiple spaces with single space
      .trim();
  };

  const speak = useCallback((text: string, startFromIndex = 0) => {
    try {
      setError(null);
      window.speechSynthesis.cancel();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        timeoutRef.current = setTimeout(() => speak(text, startFromIndex), 100);
        return;
      }

      const arabicVoice = getArabicVoice();
      if (!arabicVoice) {
        setError('لم يتم العثور على صوت عربي مناسب');
        setIsPlaying(false);
        return;
      }

      // Split text into chunks at punctuation marks, but keep the original text structure
      if (startFromIndex === 0) {
        chunksRef.current = text
          .split(/([.!?؟،]\s+)/)
          .filter(chunk => chunk.trim().length > 0)
          .map(chunk => chunk.trim());
      }

      currentChunkRef.current = startFromIndex;
      resumePositionRef.current = startFromIndex;

      const speakNextChunk = () => {
        if (currentChunkRef.current >= chunksRef.current.length) {
          setIsPlaying(false);
          currentChunkRef.current = 0;
          resumePositionRef.current = 0;
          return;
        }

        // Clean the text chunk before creating the utterance
        const cleanedText = cleanTextForSpeech(chunksRef.current[currentChunkRef.current]);
        const utterance = new SpeechSynthesisUtterance(cleanedText);
        
        utterance.voice = arabicVoice;
        utterance.lang = 'ar-SA';
        utterance.rate = 1.0; // Updated speech rate to 1.0
        utterance.pitch = 1.1;
        utterance.volume = 1.0;

        utterance.onend = () => {
          currentChunkRef.current++;
          resumePositionRef.current = currentChunkRef.current;
          timeoutRef.current = setTimeout(speakNextChunk, 300);
        };

        utterance.onerror = (event) => {
          if (event.error === 'interrupted') {
            return;
          }
          console.error('Speech synthesis error:', event);
          setError('حدث خطأ أثناء تشغيل الصوت');
          setIsPlaying(false);
        };

        speechRef.current = utterance;
        
        try {
          window.speechSynthesis.speak(utterance);
        } catch (err) {
          console.error('Speech synthesis speak error:', err);
          setError('حدث خطأ في نظام النطق');
          setIsPlaying(false);
        }
      };

      speakNextChunk();
      setIsPlaying(true);

    } catch (err) {
      console.error('Speech synthesis setup error:', err);
      setError('حدث خطأ في إعداد خاصية النطق');
      setIsPlaying(false);
    }
  }, [getArabicVoice]);

  const stop = useCallback(() => {
    try {
      window.speechSynthesis.cancel();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsPlaying(false);
      setError(null);
    } catch (err) {
      console.error('Error stopping speech:', err);
      setError('حدث خطأ أثناء إيقاف الصوت');
    }
  }, []);

  const togglePlayPause = useCallback((text: string) => {
    if (isPlaying) {
      stop();
    } else {
      speak(text, resumePositionRef.current);
    }
  }, [isPlaying, speak, stop]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) {
        stop();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying, stop]);

  return {
    isPlaying,
    error,
    togglePlayPause
  };
}