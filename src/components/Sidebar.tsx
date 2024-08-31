'use client';

import React, { useState, useEffect } from 'react';
import { HiOutlineLink, HiOutlineUser, HiOutlineTemplate } from 'react-icons/hi';
import { XIcon, MenuIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchGitHubUser } from '@/helpers/github';
import { GitHubUser } from '@/types';
import SearchModal from './SearchModal';
import { useDrag } from 'react-dnd';


const SidebarItem: React.FC<{ type: string; label: string; icon: React.ReactNode; onClick: () => void }> = ({ type, label, icon, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag as any} 
      onClick={onClick}
      className={`p-3 mb-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-md cursor-pointer flex items-center space-x-3 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300`}
      whileHover={{ scale: 1.05, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
    >
      {icon}
      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{label}</span>
    </motion.div>
  );
};

const Sidebar: React.FC<{ openModal: (type: string) => void; addElement: (type: string) => void }> = ({ openModal, addElement }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [userInfo, setUserInfo] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const username = localStorage.getItem('githubUsername');
      if (username) {
        const userData = await fetchGitHubUser(username);
        setUserInfo(userData);
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  const handleSelectCard = (type: string) => {
    addElement(type);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 left-5 p-3 rounded-full bg-purple-500 text-white shadow-lg z-50 focus:outline-none"
        whileHover={{ scale: 1.1, rotate: 20 }}
        whileTap={{ scale: 0.9, rotate: -20 }}
        transition={{ type: 'spring', stiffness: 300 }}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
      </motion.button>

      <motion.div
        initial={{ x: isOpen ? 0 : '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed top-0 left-0 w-72 p-5 bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 min-h-screen border-r border-neutral-300 dark:border-neutral-700 shadow-2xl z-40 overflow-hidden"
      >
        <h2 className="text-xl font-semibold mb-6 text-neutral-900 dark:text-neutral-100">Elements</h2>

        {loading ? (
          <div className="flex items-center justify-center mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-transparent border-blue-500"></div>
            <p className="ml-3 text-sm text-neutral-600 dark:text-neutral-400">Loading user info...</p>
          </div>
        ) : userInfo ? (
          <div className="mb-6 p-4 bg-white dark:bg-neutral-900 rounded-xl shadow-md">
            <div className="flex items-center mb-3">
              <img src={userInfo.avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full mr-3 border-2 border-blue-500 dark:border-yellow-300" />
              <div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{userInfo.name}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{userInfo.bio}</p>
              </div>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Followers: {userInfo.followers}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Following: {userInfo.following}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Public Repos: {userInfo.publicRepos}</p>
          </div>
        ) : (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">No user info available</p>
        )}

        <SidebarItem
          type="Cards"
          label="Cards"
          icon={<HiOutlineUser size={20} />}
          onClick={() => setSearchModalOpen(true)}
        />
      </motion.div>

      <SearchModal
        open={isSearchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelect={handleSelectCard}
      />
    </>
  );
};

export default Sidebar;
