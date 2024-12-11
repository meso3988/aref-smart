import React from 'react';
import { Volume2, PauseCircle, AlertCircle } from 'lucide-react';
import { useVoice } from '../hooks/useVoice';

interface StoryPlayerProps {
  story: string;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export function StoryPlayer({ story, isPlaying, onPlayPause }: StoryPlayerProps) {
  const { hasVoice } = useVoice();

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        {!hasVoice ? (
          <div className="flex items-center justify-center gap-2 text-red-500 bg-red-50 p-4 rounded-lg w-full">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">عذراً، لم يتم العثور على صوت عربي. يرجى تثبيت حزمة اللغة العربية.</p>
          </div>
        ) : (
          <button
            onClick={onPlayPause}
            className={`flex items-center gap-2 px-8 py-4 rounded-lg transition-colors text-lg ${
              isPlaying 
                ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <PauseCircle className="w-6 h-6" />
                <span>إيقاف الاستماع</span>
              </>
            ) : (
              <>
                <Volume2 className="w-6 h-6" />
                <span>استمع للقصة</span>
              </>
            )}
          </button>
        )}
      </div>
      
      <div className="story-container overflow-y-auto p-6 bg-emerald-50 rounded-lg text-right leading-relaxed">
        {story.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4 last:mb-0 text-gray-800">{paragraph}</p>
        ))}
      </div>
    </div>
  );
}