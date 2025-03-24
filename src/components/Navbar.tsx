import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Moon, Sun, Smile } from 'lucide-react';
import { toggleTheme } from '../store/themeSlice';
import type { RootState } from '../store';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <nav className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-lg`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Smile className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold">MemeExplorer</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/explore" className="hover:text-purple-500 transition-colors">
              Explore
            </Link>
            <Link to="/upload" className="hover:text-purple-500 transition-colors">
              Upload
            </Link>
            <Link to="/leaderboard" className="hover:text-purple-500 transition-colors">
              Leaderboard
            </Link>
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;