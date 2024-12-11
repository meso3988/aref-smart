import React from 'react';
import { LucideIcon } from 'lucide-react';
import MixCloudPlayer from '../MixCloudPlayer';

interface SoundItem {
  title: string;
  duration: string;
  icon: string;
  feedUrl: string;
  image: string;
}

interface SoundSectionProps {
  title: string;
  description: string;
  items: SoundItem[];
  Icon: LucideIcon;
  bgColor: string;
  buttonColor: string;
}

const SoundSection: React.FC<SoundSectionProps> = ({
  title,
  description,
  items,
  Icon,
  bgColor,
  buttonColor
}) => {
  return (
    <div className={`${bgColor} rounded-xl p-6`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-16 h-16 ${buttonColor} rounded-full flex items-center justify-center`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.title} className="bg-white rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <span className="text-sm text-gray-500">{item.duration}</span>
                </div>
              </div>
              <MixCloudPlayer title={item.title} feedUrl={item.feedUrl} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoundSection;