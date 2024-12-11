import React, { useState } from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';

interface VideoPlayerProps {
  title: string;
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ title, videoUrl }) => {
  const [error, setError] = useState<string | null>(null);

  const getEmbedUrl = (url: string): string => {
    try {
      // Handle YouTube URLs
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId;
        if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('youtube.com/watch')) {
          const urlParams = new URLSearchParams(new URL(url).search);
          videoId = urlParams.get('v');
        }
        
        if (!videoId) throw new Error('رابط الفيديو غير صالح');
        return `https://www.youtube.com/embed/${videoId}`;
      }
      
      // Handle Google Drive URLs
      if (url.includes('drive.google.com')) {
        const fileId = url.match(/[-\w]{25,}/)?.[0];
        if (!fileId) throw new Error('رابط الفيديو غير صالح');
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }

      throw new Error('نوع الفيديو غير مدعوم');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل الفيديو');
      return '';
    }
  };

  const embedUrl = getEmbedUrl(videoUrl);

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3 text-red-600">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-black rounded-lg overflow-hidden aspect-video">
        <iframe
          title={title}
          src={embedUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          <span>فتح في نافذة جديدة</span>
        </a>
      </div>
    </div>
  );
};

export default VideoPlayer;