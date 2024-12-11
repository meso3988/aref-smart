import React from 'react';

interface SoundCloudPlayerProps {
  title: string;
  trackId: string;
  secretToken: string;
}

const SoundCloudPlayer: React.FC<SoundCloudPlayerProps> = ({ title, trackId, secretToken }) => {
  const embedUrl = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}${secretToken ? `%3Fsecret_token%3D${secretToken}` : ''}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-sm">
      <iframe
        title={title}
        width="100%"
        height="300"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={embedUrl}
        className="border-0"
      />
      <div className="text-xs text-gray-500 p-2 bg-white">
        <a 
          href={`https://soundcloud.com/mayasah-aldashash/tracks`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-700"
        >
          قصة تعافي محمد من الإدمان
        </a>
      </div>
    </div>
  );
};

export default SoundCloudPlayer;