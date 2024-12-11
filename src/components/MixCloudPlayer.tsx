import React from 'react';

interface MixCloudPlayerProps {
  title: string;
  feedUrl: string;
}

const MixCloudPlayer: React.FC<MixCloudPlayerProps> = ({ title, feedUrl }) => {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-sm">
      <iframe
        title={title}
        width="100%"
        height="60"
        src={`https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=${encodeURIComponent(feedUrl)}`}
        frameBorder="0"
        className="border-0"
      />
    </div>
  );
};

export default MixCloudPlayer;