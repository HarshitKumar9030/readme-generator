'use client';

import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { ProfileCard, GitHubStatsCard, CustomTextCard, MarkdownCard, ImageCard } from './Cards';
import CustomizationModal from './CustomizationModal';
import { CardType, CardOptions } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

const DragAndDropContainer: React.FC<{ username: string }> = ({ username }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [modalType, setModalType] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [alignment, setAlignment] = useState('justify-center');

  // Setup drop area for react-dnd
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['text', 'image', 'profile', 'link', 'template'],
    drop: (item: { type: string }) => addElement(item.type),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // Function to add a new card
  const addElement = (type: string) => {
    const newCard: CardType = { id: cards.length + 1, type, content: getCardContent(type) };
    setCards((prevCards) => [...prevCards, newCard]); 
  };

  // Function to get card content based on its type
  const getCardContent = (type: string, options: CardOptions = {}) => {
    switch (type) {
      case 'profile':
        return <ProfileCard username={username} {...options} />;
      case 'stats':
        return <GitHubStatsCard username={username} {...options} />;
      case 'text':
        return <CustomTextCard text={options.text || ''} textStyle={options.textStyle} color={options.color} />;
      case 'markdown':
        return <MarkdownCard markdown={options.markdown || ''} color={options.color} />;
      case 'image':
        return <ImageCard imageUrl={options.imageUrl || ''} caption={options.caption} />;
      default:
        console.error(`Unsupported card type: ${type}`);
        return null;
    }
  };

  // Function to handle opening customization modal
  const handleCustomization = (card: CardType) => {
    setSelectedCard(card);
    setModalType(card.type);
  };

  // Function to handle saving customizations
  const handleSaveCustomization = (options: CardOptions) => {
    if (!selectedCard) return;
    const updatedCards = cards.map((card) =>
      card.id === selectedCard.id ? { ...card, options, content: getCardContent(card.type, options) } : card
    );
    setCards(updatedCards);
    setModalType(null);
    setSelectedCard(null);
  };

  return (
    <div
      ref={drop}
      className={`p-6 bg-neutral-100 dark:bg-neutral-900 min-h-screen w-full flex flex-col items-center transition-all duration-300 ${
        isOver ? 'border-2 border-dashed border-purple-500 dark:border-purple-300' : ''
      }`}
    >
      <motion.h1
        className="text-3xl font-extrabold text-center mb-6 text-neutral-900 dark:text-neutral-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        README ✨
      </motion.h1>

      {/* Alignment Controls */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setAlignment('justify-start')}
          className="px-3 py-1 bg-purple-500 text-white rounded flex items-center focus:outline-none focus:ring-2 focus:ring-purple-300"
          aria-label="Align Left"
        >
          <AlignLeft size={16} className="mr-1" />
        </button>
        <button
          onClick={() => setAlignment('justify-center')}
          className="px-3 py-1 bg-purple-500 text-white rounded flex items-center focus:outline-none focus:ring-2 focus:ring-purple-300"
          aria-label="Align Center"
        >
          <AlignCenter size={16} className="mr-1" />
        </button>
        <button
          onClick={() => setAlignment('justify-end')}
          className="px-3 py-1 bg-purple-500 text-white rounded flex items-center focus:outline-none focus:ring-2 focus:ring-purple-300"
          aria-label="Align Right"
        >
          <AlignRight size={16} className="mr-1" />
        </button>
        <button
          onClick={() => setAlignment('justify-between')}
          className="px-3 py-1 bg-purple-500 text-white rounded flex items-center focus:outline-none focus:ring-2 focus:ring-purple-300"
          aria-label="Align Evenly"
        >
          <AlignJustify size={16} className="mr-1" />
        </button>
      </div>

      {/* Card Display Area */}
      <div className={`flex ${alignment} flex-wrap w-full`}>
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="m-2 w-full max-w-xs cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleCustomization(card)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              layout
            >
              {card.content}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Customization Modal */}
      {modalType && (
        <CustomizationModal
          open={!!modalType}
          onClose={() => setModalType(null)}
          onSave={handleSaveCustomization}
          type={modalType}
        />
      )}
    </div>
  );
};

export default DragAndDropContainer;
