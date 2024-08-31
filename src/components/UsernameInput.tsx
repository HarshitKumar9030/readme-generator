'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUser } from 'react-icons/hi'; 

type UsernameInputProps = {
  setUsername: (username: string) => void;
};

const UsernameInput: React.FC<UsernameInputProps> = ({ setUsername }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedUsername = localStorage.getItem('githubUsername');
    if (savedUsername) {
      setInputValue(savedUsername); 
      setUsername(savedUsername); 
    }
  }, [setUsername]);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      const trimmedUsername = inputValue.trim();
      setUsername(trimmedUsername);
      localStorage.setItem('githubUsername', trimmedUsername); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 p-6">
      <motion.h1
        className="text-3xl font-extrabold mb-6 text-neutral-800 dark:text-neutral-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Enter Your GitHub Username
      </motion.h1>

      <motion.div
        className="flex items-center w-72 border border-neutral-300 dark:border-neutral-600 rounded-lg mb-4 bg-neutral-200 dark:bg-neutral-700"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <HiOutlineUser className="text-neutral-500 dark:text-neutral-400 ml-3" size={20} />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p-3 w-full bg-transparent focus:outline-none dark:text-neutral-100"
          placeholder="GitHub Username"
        />
      </motion.div>

      <motion.button
        onClick={handleSubmit}
        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Submit
      </motion.button>
    </div>
  );
};

export default UsernameInput;
