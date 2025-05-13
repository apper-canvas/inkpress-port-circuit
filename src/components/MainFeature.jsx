import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

const ShirtIcon = getIcon('Shirt');
const ImageIcon = getIcon('Image');
const TextIcon = getIcon('Type');
const PanelTopIcon = getIcon('PanelTop');

export default function MainFeature({ onSaveDesign }) {
  const [selectedTab, setSelectedTab] = useState('templates');

  const tabs = [
    { id: 'templates', label: 'Templates', icon: <PanelTopIcon size={18} /> },
    { id: 'text', label: 'Add Text', icon: <TextIcon size={18} /> },
    { id: 'image', label: 'Add Image', icon: <ImageIcon size={18} /> },
  ];

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col md:flex-row h-full">
        {/* Preview Area */}
        <div className="w-full md:w-3/5 bg-surface-100 dark:bg-surface-800 p-6 flex items-center justify-center">
          <div className="relative w-64 h-80 bg-white rounded-md shadow-md flex items-center justify-center">
            <ShirtIcon size={120} className="text-primary-light opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-surface-400 text-sm text-center px-4">
                Use the design tools to<br />customize your shirt
              </p>
            </div>
          </div>
        </div>
        
        {/* Design Tools */}
        <div className="w-full md:w-2/5 p-6 bg-white dark:bg-surface-900">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Design Tools</h3>
            <p className="text-surface-600 dark:text-surface-400 text-sm mb-4">
              Select tools to customize your shirt design
            </p>
            
            {/* Tabs */}
            <div className="flex border-b border-surface-200 dark:border-surface-700 mb-4">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px ${
                    selectedTab === tab.id
                      ? 'border-primary text-primary dark:border-primary-light dark:text-primary-light'
                      : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Placeholder content for demonstration */}
            <div className="h-48 flex items-center justify-center border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-lg">
              <p className="text-surface-500 dark:text-surface-400 text-center px-4">
                Design tools preview.<br/>For full experience, go to the customization page.
              </p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="mt-6 flex gap-4">
            <button onClick={onSaveDesign} className="btn-outline flex-1">Save Design</button>
            <Link to="/customize" className="btn-primary flex-1">
              Full Customizer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );