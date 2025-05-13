import { useState } from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const ShirtIcon = getIcon('Shirt');
const TextIcon = getIcon('Type');
const ImageIcon = getIcon('Image');
const PaletteIcon = getIcon('Palette');
const SaveIcon = getIcon('Save');
const ShoppingCartIcon = getIcon('ShoppingCart');

export default function DesignControls({ design, onChange, onAddText, onAddImage, onSave, onAddToCart }) {
  const [activeTab, setActiveTab] = useState('product');
  const [textInput, setTextInput] = useState({
    content: 'Your Text Here',
    font: 'Arial',
    size: 24,
    color: '#000000'
  });
  const [imageUrl, setImageUrl] = useState('');

  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    setTextInput(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textInput.content.trim() === '') return;
    onAddText(textInput);
  };
  
  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (imageUrl.trim() === '') return;
    onAddImage(imageUrl);
    setImageUrl('');
  };

  const tabs = [
    { id: 'product', label: 'Product', icon: <ShirtIcon size={18} /> },
    { id: 'text', label: 'Text', icon: <TextIcon size={18} /> },
    { id: 'image', label: 'Image', icon: <ImageIcon size={18} /> },
    { id: 'color', label: 'Color', icon: <PaletteIcon size={18} /> },
  ];

  const shirtTypes = [
    { id: 't-shirt', name: 'T-Shirt' },
    { id: 'polo', name: 'Polo Shirt' },
    { id: 'hoodie', name: 'Hoodie' },
    { id: 'tank-top', name: 'Tank Top' }
  ];

  const shirtSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

  const colorOptions = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Green', value: '#10b981' },
    { name: 'Yellow', value: '#f59e0b' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Black', value: '#1f2937' },
    { name: 'White', value: '#f9fafb' }
  ];

  const fontOptions = [
    'Arial',
    'Verdana',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Georgia'
  ];

  return (
    <div className="card h-full overflow-hidden">
      <div className="flex border-b border-surface-200 dark:border-surface-700">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-primary text-primary dark:border-primary-light dark:text-primary-light'
                : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="p-6">
        {activeTab === 'product' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Product Options</h3>
            
            <div className="mb-4">
              <label className="label">Shirt Type</label>
              <select 
                className="select"
                value={design.productType}
                onChange={(e) => onChange({ productType: e.target.value })}
              >
                {shirtTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="label">Size</label>
              <div className="flex flex-wrap gap-2">
                {shirtSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => onChange({ size })}
                    className={`py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                      design.size === size 
                        ? 'bg-primary text-white' 
                        : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'text' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Add Text</h3>
            <form onSubmit={handleTextSubmit}>
              <div className="mb-4">
                <label className="label">Text Content</label>
                <input
                  type="text"
                  name="content"
                  value={textInput.content}
                  onChange={handleTextInputChange}
                  className="input"
                  placeholder="Enter your text here"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="label">Font</label>
                  <select 
                    name="font"
                    value={textInput.font}
                    onChange={handleTextInputChange}
                    className="select"
                  >
                    {fontOptions.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="label">Size</label>
                  <input
                    type="number"
                    name="size"
                    value={textInput.size}
                    onChange={handleTextInputChange}
                    className="input"
                    min="10"
                    max="72"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="label">Color</label>
                <input
                  type="color"
                  name="color"
                  value={textInput.color}
                  onChange={handleTextInputChange}
                  className="w-full h-10 rounded-md cursor-pointer"
                />
              </div>
              
              <button type="submit" className="btn-primary w-full">
                Add Text to Design
              </button>
            </form>
          </div>
        )}
        
        {activeTab === 'image' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Add Image</h3>
            <form onSubmit={handleImageSubmit}>
              <div className="mb-4">
                <label className="label">Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="input"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                  Enter a URL to an image or upload from your device
                </p>
              </div>
              
              <div className="mb-4">
                <label className="label">Or Upload Image</label>
                <div className="border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-md p-4 text-center">
                  <input type="file" className="hidden" id="image-upload" accept="image/*" />
                  <label htmlFor="image-upload" className="btn-outline block w-full cursor-pointer">
                    Choose File
                  </label>
                </div>
              </div>
              
              <button type="submit" className="btn-primary w-full" disabled={!imageUrl.trim()}>
                Add Image to Design
              </button>
            </form>
          </div>
        )}
        
        {activeTab === 'color' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Choose Color</h3>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {colorOptions.map(color => (
                <button
                  key={color.value}
                  onClick={() => onChange({ color: color.value })}
                  className={`w-full aspect-square rounded-md border-2 ${
                    design.color === color.value 
                      ? 'border-primary dark:border-primary-light' 
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
            
            <div className="mb-4">
              <label className="label">Custom Color</label>
              <input
                type="color"
                value={design.color}
                onChange={(e) => onChange({ color: e.target.value })}
                className="w-full h-12 rounded-md cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6 border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 mt-auto">
        <div className="flex gap-4">
          <button 
            onClick={onSave}
            className="btn-outline flex-1 flex items-center justify-center gap-2"
          >
            <SaveIcon size={18} />
            Save Design
          </button>
          <button 
            onClick={onAddToCart}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            <ShoppingCartIcon size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}