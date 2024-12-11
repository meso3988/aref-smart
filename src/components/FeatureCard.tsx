import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  path: string;
  imageUrl: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  path,
  imageUrl 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateX: 10 }}
      initial={{ rotateX: -10 }}
      className="relative group h-full"
    >
      {/* Main Card */}
      <div
        onClick={handleClick}
        className="relative bg-white rounded-[2rem] shadow-lg overflow-hidden cursor-pointer transition-all duration-300 transform-gpu perspective-1000 h-full flex flex-col"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Image Container with 3D Effect */}
        <div className="relative h-64 transform-gpu" style={{ transform: 'translateZ(30px)' }}>
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div 
            className={`${color} absolute top-4 right-4 w-14 h-14 rounded-full flex items-center justify-center transform-gpu shadow-xl`}
            style={{ transform: 'translateZ(40px)' }}
          >
            <Icon className="h-7 w-7 text-white" />
          </div>
        </div>

        {/* Content with 3D Effect */}
        <div 
          className="p-6 bg-white/90 backdrop-blur-sm transform-gpu flex-1 flex flex-col justify-between"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
          <div className="mt-4">
            <span className={`inline-block px-4 py-2 rounded-full ${color} bg-opacity-10 text-sm font-medium`}>
              اضغط للمزيد
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;