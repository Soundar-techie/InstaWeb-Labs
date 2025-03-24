import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import type { Meme } from '../types';

interface MemeCardProps {
  meme: Meme;
}

const MemeCard: React.FC<MemeCardProps> = ({ meme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      <img
        src={meme.url}
        alt={meme.title}
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold dark:text-white mb-2">{meme.title}</h3>
        <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
          <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
            <span>{meme.likes}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>{meme.comments}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MemeCard;