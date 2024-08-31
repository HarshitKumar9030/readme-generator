'use client';

import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { HiSearch } from 'react-icons/hi';

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (type: string) => void;
};

const availableCards = [
  { type: 'text', label: 'Text' },
  { type: 'image', label: 'Image' },
  { type: 'link', label: 'Links' },
  { type: 'profile', label: 'Profile Card' },
  { type: 'template', label: 'Templates' },
  // Add more card types as needed
];

const SearchModal: React.FC<SearchModalProps> = ({ open, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCards = availableCards.filter((card) =>
    card.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white dark:bg-neutral-800 p-6 text-left align-middle shadow-2xl transition-all">
              <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-neutral-900 dark:text-neutral-100">
                Select a Card Type
              </Dialog.Title>
              
              <div className="mt-4 relative flex items-center">
                <HiSearch className="absolute left-3 transform mt-1 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for a card..."
                  className="w-full pl-10 p-3 mb-4 border border-neutral-300 dark:border-neutral-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search for card types"
                />
              </div>
              
              <ul className="max-h-60 overflow-y-auto custom-scrollbar">
                {filteredCards.length > 0 ? (
                  filteredCards.map((card) => (
                    <li key={card.type}>
                      <button
                        onClick={() => {
                          onSelect(card.type);
                          onClose();
                        }}
                        className="w-full text-left px-4 py-2 mb-1 rounded-lg text-neutral-800 dark:text-neutral-200 hover:bg-purple-100 dark:hover:bg-neutral-700 transition-colors duration-300"
                      >
                        {card.label}
                      </button>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">No matching cards found.</p>
                )}
              </ul>
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={onClose}
                  className="w-1/2 bg-purple-500 font-semibold text-white py-2 rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SearchModal;
