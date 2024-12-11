import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  audioUrl: string;
  icon: string;
  duration: string;
  image: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  audioUrl,
  icon,
  duration,
  image
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden flex group">
      <div className="w-24 h-24 flex-shrink-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h4 className="font-medium">{title}</h4>
            <span className="text-sm text-gray-500">{duration}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleMute}
            className="p-2 text-gray-500 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <button 
            onClick={togglePlay}
            className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:opacity-90 transition-opacity"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>
        </div>

        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          loop
        />
      </div>
    </div>
  );
};

export default AudioPlayer;