import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface ExerciseCardProps {
  title: string;
  duration: string;
  description: string;
  index: number;
  image: string;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  title,
  duration,
  description,
  index,
  image
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-orange-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative h-48">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <span className="text-orange-600 text-sm font-medium">{duration}</span>
          </div>
          <button className="bg-orange-600 text-white p-3 rounded-full hover:bg-orange-700 transition-colors">
            <Play className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExerciseCard;