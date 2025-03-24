import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { AppDispatch, RootState } from '../store';
import { fetchTrendingMemes } from '../store/memesSlice';
import MemeCard from '../components/MemeCard';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: memes, status } = useSelector((state: RootState) => state.memes);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTrendingMemes());
    }
  }, [dispatch, status]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to MemeExplorer
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Discover and share the best memes on the internet
        </p>
      </motion.div>

      {status === 'loading' && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
    </div>
  );
};

export default Home;