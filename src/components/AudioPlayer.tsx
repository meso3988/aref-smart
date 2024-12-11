import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, AlertCircle, Loader } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ title, audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let mounted = true;
    const audio = new Audio();
    audioRef.current = audio;

    const setupAudio = () => {
      try {
        setIsLoading(true);
        setError(null);

        // Extract file ID from Google Drive URL
        const fileId = audioUrl.match(/[-\w]{25,}/)?.[0];
        if (!fileId) {
          throw new Error('رابط الملف غير صالح');
        }

        // Set direct streaming URL
        const streamUrl = `https://docs.google.com/uc?export=download&id=${fileId}`;
        audio.src = streamUrl;

        // Handle metadata loaded
        audio.onloadedmetadata = () => {
          if (!mounted) return;
          setDuration(audio.duration);
          setIsLoading(false);
        };

        // Handle loading error
        audio.onerror = () => {
          if (!mounted) return;
          setError('حدث خطأ في تحميل الملف الصوتي');
          setIsLoading(false);
        };

      } catch (err) {
        if (!mounted) return;
        console.error('Error initializing audio:', err);
        setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل الملف الصوتي');
        setIsLoading(false);
      }
    };

    const handleTimeUpdate = () => {
      if (!mounted) return;
      setCurrentTime(audio.currentTime);
      
      if (progressRef.current) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressRef.current.style.background = `linear-gradient(to right, #059669 ${progress}%, #e5e7eb ${progress}%)`;
      }
    };

    const handleEnded = () => {
      if (!mounted) return;
      setIsPlaying(false);
      setCurrentTime(0);
      if (progressRef.current) {
        progressRef.current.style.background = '#e5e7eb';
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    setupAudio();

    return () => {
      mounted = false;
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, [audioUrl]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || isLoading) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        setError(null);
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('Playback error:', err);
      setError('حدث خطأ أثناء تشغيل الملف الصوتي');
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = Number(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);

    const progress = (time / duration) * 100;
    e.target.style.background = `linear-gradient(to right, #059669 ${progress}%, #e5e7eb ${progress}%)`;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const reset = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setCurrentTime(0);
    if (progressRef.current) {
      progressRef.current.style.background = '#e5e7eb';
    }
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-800">{title}</h3>
        {error && (
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-emerald-600 hover:bg-emerald-700'
          } text-white transition-colors`}
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

        <div className="flex-1">
          <input
            ref={progressRef}
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            disabled={isLoading}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-600"
            style={{
              background: isLoading ? '#e5e7eb' : `linear-gradient(to right, #059669 ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%)`
            }}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <button
          onClick={reset}
          disabled={isLoading}
          className={`p-2 ${
            isLoading
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;