'use client';

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { CardOptions } from '../types';

type CustomizationModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (options: CardOptions) => void;
  type: string;
};

const CustomizationModal: React.FC<CustomizationModalProps> = ({ open, onClose, onSave, type }) => {
  const [textStyle, setTextStyle] = useState({ size: '16px', weight: 'normal' });
  const [imageUrl, setImageUrl] = useState('');
  const [color, setColor] = useState('#000000');
  const [shadow, setShadow] = useState('shadow-md');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [icon, setIcon] = useState('');

  const handleSave = () => {
    const options: CardOptions = { textStyle, imageUrl, color, shadow, linkUrl, linkText, icon };
    onSave(options);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center p-4">
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300" />

      <div className="relative bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-2xl w-full max-w-md transition-all transform">
        <Dialog.Title className="text-2xl font-semibold mb-4 text-center text-neutral-900 dark:text-neutral-100">
          Customize {type.charAt(0).toUpperCase() + type.slice(1)}
        </Dialog.Title>
        
        {/* Customization Form Content */}
        <div className="space-y-4 mb-6">
          {/* Text Style Options */}
          {type === 'text' && (
            <>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Text Size</label>
                <input
                  type="number"
                  value={parseInt(textStyle.size)}
                  onChange={(e) => setTextStyle({ ...textStyle, size: `${e.target.value}px` })}
                  className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Text Weight</label>
                <select
                  value={textStyle.weight}
                  onChange={(e) => setTextStyle({ ...textStyle, weight: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                  <option value="lighter">Lighter</option>
                </select>
              </div>
            </>
          )}

          {/* Image URL Option */}
          {type === 'image' && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600"
              />
            </div>
          )}

          {/* Color Picker Option */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600"
            />
          </div>

          {/* Shadow Option */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Shadow</label>
            <select
              value={shadow}
              onChange={(e) => setShadow(e.target.value)}
              className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600"
            >
              <option value="shadow-none">None</option>
              <option value="shadow-sm">Small</option>
              <option value="shadow-md">Medium</option>
              <option value="shadow-lg">Large</option>
              <option value="shadow-xl">Extra Large</option>
            </select>
          </div>

          {/* Link Options */}
          {type === 'link' && (
            <>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Link URL</label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Link Text</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600"
                />
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
            Save
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition duration-200">
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default CustomizationModal;
