'use client';

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from '@/components/Sidebar';
import DragAndDropContainer from '@/components/DragDrop';
import { CardType, CardOptions } from '../types';
import { GitHubStatsCard, ProfileCard } from '@/components/Cards';
import ThemeToggle from '@/components/ThemeToggle';

interface DesignPageProps {
  username: string;
}

const DesignPage: React.FC<DesignPageProps> = ({ username }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [modalType, setModalType] = useState<string | null>(null);

  const addElement = (type: string) => {
    const newCard: CardType = { id: cards.length + 1, type, content: getCardContent(type) };
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const getCardContent = (type: string, options: CardOptions = {}) => {
    switch (type) {
      case 'profile':
        return <ProfileCard username={username} {...options} />;
      case 'stats':
        return <GitHubStatsCard username={username} {...options} />;
      default:
        return null;
    }
  };

  const handleCustomization = (card: CardType) => {
    setSelectedCard(card);
    setModalType(card.type);
  };

  const handleSaveCustomization = (options: CardOptions) => {
    if (!selectedCard) return;
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === selectedCard.id ? { ...card, options, content: getCardContent(card.type, options) } : card
      )
    );
    setModalType(null);
    setSelectedCard(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        <Sidebar openModal={() => {}} addElement={addElement} />
        <DragAndDropContainer
          username={username}
          cards={cards}
          addElement={addElement}
          handleCustomization={handleCustomization}
          handleSaveCustomization={handleSaveCustomization}
        />
        <ThemeToggle />
      </div>
    </DndProvider>
  );
};

export default DesignPage;
