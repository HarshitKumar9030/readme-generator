'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed top-5 right-5 p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-yellow-300 dark:to-yellow-500 text-white shadow-md focus:outline-none"
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.95, rotate: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {theme === 'dark' ? (
        <SunIcon size={22} className="text-yellow-300 dark:text-yellow-600" />
      ) : (
        <MoonIcon size={22} className="text-blue-100 dark:text-white" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
