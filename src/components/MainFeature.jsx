import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

// Icon declarations
const PlusIcon = getIcon('Plus');
const MinusIcon = getIcon('Minus');
const RefreshCwIcon = getIcon('RefreshCw');
const SaveIcon = getIcon('Save');
const UploadIcon = getIcon('Upload');
const TextIcon = getIcon('Type');
const ImageIcon = getIcon('Image');
const PaletteIcon = getIcon('Palette');
const RotateCwIcon = getIcon('RotateCw');
const TrashIcon = getIcon('Trash');

const SHIRT_COLORS = [
  { name: 'White', value: '#ffffff', textColor: '#000000' },
  { name: 'Black', value: '#000000', textColor: '#ffffff' },
  { name: 'Navy', value: '#172554', textColor: '#ffffff' },
  { name: 'Red', value: '#dc2626', textColor: '#ffffff' },
  { name: 'Royal Blue', value: '#2563eb', textColor: '#ffffff' },
  { name: 'Forest Green', value: '#166534', textColor: '#ffffff' },
  { name: 'Heather Gray', value: '#9ca3af', textColor: '#000000' },
];

const SHIRT_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

export default function MainFeature({ onSaveDesign }) {
  // State for shirt options
  const [shirtColor, setShirtColor] = useState(SHIRT_COLORS[0]);
  const [shirtSize, setShirtSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  
  // State for text design
  const [designMode, setDesignMode] = useState('text'); // 'text', 'image', or 'color'
  const [textInput, setTextInput] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [textSize, setTextSize] = useState(32);
  const [textRotation, setTextRotation] = useState(0);
  
  // State for image design
  const [imagePreview, setImagePreview] = useState(null);
  const [imageScale, setImageScale] = useState(100);
  const [imageRotation, setImageRotation] = useState(0);
  
  // Preview canvas state
  const [designElements, setDesignElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [price, setPrice] = useState(19.99);
  
  // Reset the rotation when switching between text and image
  useEffect(() => {
    if (designMode === 'text') {
      setTextRotation(0);
    } else if (designMode === 'image') {
      setImageRotation(0);
    }
  }, [designMode]);
  
  // Calculate price based on quantity
  useEffect(() => {
    setPrice((19.99 * quantity).toFixed(2));
  }, [quantity]);
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const addTextElement = () => {
    if (!textInput.trim()) {
      toast.error('Please enter some text');
      return;
    }
    
    const newElement = {
      id: Date.now(),
      type: 'text',
      content: textInput,
      color: textColor,
      size: textSize,
      rotation: textRotation,
    };
    
    setDesignElements([...designElements, newElement]);
    setTextInput('');
    setTextRotation(0);
    toast.success('Text added to design');
  };
  
  const addImageElement = () => {
    if (!imagePreview) {
      toast.error('Please upload an image');
      return;
    }
    
    const newElement = {
      id: Date.now(),
      type: 'image',
      src: imagePreview,
      scale: imageScale,
      rotation: imageRotation,
    };
    
    setDesignElements([...designElements, newElement]);
    setImagePreview(null);
    setImageScale(100);
    setImageRotation(0);
    toast.success('Image added to design');
  };
  
  const removeElement = (id) => {
    setDesignElements(designElements.filter(element => element.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
    toast.info('Element removed from design');
  };
  
  const clearDesign = () => {
    if (designElements.length === 0) return;
    
    if (confirm('Are you sure you want to clear your design?')) {
      setDesignElements([]);
      setSelectedElement(null);
      toast.info('Design cleared');
    }
  };
  
  const handleSaveDesign = () => {
    if (designElements.length === 0) {
      toast.error('Please add elements to your design first');
      return;
    }
    
    // In a real app, this would save to a database or local storage
    // For this MVP, we'll just trigger the callback
    if (onSaveDesign) {
      onSaveDesign();
    }
  };
  
  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 100) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="card max-w-5xl mx-auto overflow-hidden">
      <div className="p-6 border-b border-surface-200 dark:border-surface-700">
        <h3 className="text-xl font-semibold">Design Studio</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Preview Panel */}
        <div className="order-2 lg:order-1">
          <div className="aspect-[3/4] rounded-lg overflow-hidden relative bg-surface-100 dark:bg-surface-700 flex items-center justify-center mb-4 shadow-inner">
            {/* Shirt Canvas */}
            <div 
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: shirtColor.value }}
            >
              {/* T-Shirt Outline SVG */}
              <svg 
                className="absolute inset-0 w-full h-full" 
                viewBox="0 0 300 400" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M100,50 L60,80 L40,150 L60,170 L60,350 L240,350 L240,170 L260,150 L240,80 L200,50 L180,20 C180,20 150,40 150,40 C150,40 120,20 120,20 L100,50 Z" 
                  stroke={shirtColor.textColor} 
                  strokeWidth="2" 
                  fill="none" 
                />
              </svg>
              
              {/* Printable Area */}
              <div className="absolute w-[60%] h-[40%] top-[20%] border-2 border-dashed border-opacity-50" style={{ borderColor: shirtColor.textColor }}>
                {/* Design Elements */}
                {designElements.map((element) => (
                  <motion.div 
                    key={element.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 cursor-pointer ${selectedElement === element.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSelectedElement(element.id)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      rotate: element.rotation || 0
                    }}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      maxWidth: '90%',
                      maxHeight: '90%',
                    }}
                  >
                    {element.type === 'text' && (
                      <div 
                        style={{ 
                          color: element.color,
                          fontSize: `${element.size}px`,
                        }}
                        className="text-center whitespace-nowrap"
                      >
                        {element.content}
                      </div>
                    )}
                    
                    {element.type === 'image' && (
                      <img 
                        src={element.src} 
                        alt="Custom design" 
                        style={{
                          maxWidth: '100%',
                          transform: `scale(${element.scale / 100})`,
                        }}
                        className="pointer-events-none"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
              
              {/* Size indicator */}
              <div 
                className="absolute bottom-4 right-4 rounded-full px-2 py-1 text-xs font-semibold"
                style={{ 
                  backgroundColor: shirtColor.textColor, 
                  color: shirtColor.value 
                }}
              >
                {shirtSize}
              </div>
            </div>
          </div>
          
          {/* Controls for selected element */}
          <AnimatePresence>
            {selectedElement && (
              <motion.div 
                className="bg-surface-100 dark:bg-surface-700 rounded-lg p-4 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Selected Element</h4>
                  <button 
                    onClick={() => removeElement(selectedElement)} 
                    className="text-red-500 hover:text-red-600"
                    aria-label="Remove element"
                  >
                    <TrashIcon size={18} />
                  </button>
                </div>
                
                {designElements.find(el => el.id === selectedElement)?.type === 'text' && (
                  <div className="space-y-2">
                    <label className="label">Rotation</label>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={designElements.find(el => el.id === selectedElement)?.rotation || 0}
                      onChange={(e) => {
                        setDesignElements(designElements.map(el => 
                          el.id === selectedElement 
                            ? { ...el, rotation: parseInt(e.target.value) } 
                            : el
                        ));
                      }}
                      className="w-full"
                    />
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDesignElements(designElements.map(el => 
                          el.id === selectedElement 
                            ? { ...el, size: el.size - 2 } 
                            : el
                        ))}
                        className="btn-outline p-1"
                        aria-label="Decrease size"
                      >
                        <MinusIcon size={16} />
                      </button>
                      
                      <span className="text-sm">Size</span>
                      
                      <button
                        onClick={() => setDesignElements(designElements.map(el => 
                          el.id === selectedElement 
                            ? { ...el, size: el.size + 2 } 
                            : el
                        ))}
                        className="btn-outline p-1"
                        aria-label="Increase size"
                      >
                        <PlusIcon size={16} />
                      </button>
                    </div>
                    
                    <label className="label">Color</label>
                    <input
                      type="color"
                      value={designElements.find(el => el.id === selectedElement)?.color || '#000000'}
                      onChange={(e) => {
                        setDesignElements(designElements.map(el => 
                          el.id === selectedElement 
                            ? { ...el, color: e.target.value } 
                            : el
                        ));
                      }}
                      className="w-8 h-8 overflow-hidden"
                    />
                  </div>
                )}
                
                {designElements.find(el => el.id === selectedElement)?.type === 'image' && (
                  <div className="space-y-2">
                    <label className="label">Rotation</label>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={designElements.find(el => el.id === selectedElement)?.rotation || 0}
                      onChange={(e) => {
                        setDesignElements(designElements.map(el => 
                          el.id === selectedElement 
                            ? { ...el, rotation: parseInt(e.target.value) } 
                            : el
                        ));
                      }}
                      className="w-full"
                    />
                    
                    <label className="label">Scale</label>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      value={designElements.find(el => el.id === selectedElement)?.scale || 100}
                      onChange={(e) => {
                        setDesignElements(designElements.map(el => 
                          el.id === selectedElement 
                            ? { ...el, scale: parseInt(e.target.value) } 
                            : el
                        ));
                      }}
                      className="w-full"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Product Details */}
          <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-sm">
            <h4 className="font-medium mb-2">Product Details</h4>
            
            <div className="space-y-4">
              <div>
                <label className="label">Size</label>
                <div className="flex flex-wrap gap-2">
                  {SHIRT_SIZES.map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1.5 rounded text-sm font-medium ${
                        shirtSize === size 
                          ? 'bg-primary text-white' 
                          : 'bg-surface-100 dark:bg-surface-700 text-surface-800 dark:text-surface-200'
                      }`}
                      onClick={() => setShirtSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="label">Quantity</label>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="btn-outline p-1"
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <MinusIcon size={16} />
                  </button>
                  
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value >= 1 && value <= 100) {
                        setQuantity(value);
                      }
                    }}
                    className="input mx-2 w-16 text-center"
                  />
                  
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="btn-outline p-1"
                    disabled={quantity >= 100}
                    aria-label="Increase quantity"
                  >
                    <PlusIcon size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-surface-200 dark:border-surface-700">
                <div>
                  <span className="block text-sm text-surface-500 dark:text-surface-400">Total Price:</span>
                  <span className="text-xl font-bold">${price}</span>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={clearDesign}
                    className="btn-outline"
                    disabled={designElements.length === 0}
                  >
                    <RefreshCwIcon size={18} className="mr-1" />
                    Clear
                  </button>
                  
                  <button 
                    onClick={handleSaveDesign} 
                    className="btn-primary"
                  >
                    <SaveIcon size={18} className="mr-1" />
                    Save Design
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Design Controls */}
        <div className="order-1 lg:order-2">
          <div className="tabs flex space-x-1 mb-4 border-b border-surface-200 dark:border-surface-700">
            <button
              className={`py-2 px-4 font-medium text-sm ${
                designMode === 'text'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-surface-600 dark:text-surface-400'
              }`}
              onClick={() => setDesignMode('text')}
            >
              <TextIcon size={16} className="inline mr-1" />
              Add Text
            </button>
            
            <button
              className={`py-2 px-4 font-medium text-sm ${
                designMode === 'image'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-surface-600 dark:text-surface-400'
              }`}
              onClick={() => setDesignMode('image')}
            >
              <ImageIcon size={16} className="inline mr-1" />
              Add Image
            </button>
            
            <button
              className={`py-2 px-4 font-medium text-sm ${
                designMode === 'color'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-surface-600 dark:text-surface-400'
              }`}
              onClick={() => setDesignMode('color')}
            >
              <PaletteIcon size={16} className="inline mr-1" />
              Shirt Color
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            {/* Text Controls */}
            {designMode === 'text' && (
              <motion.div
                key="text-controls"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="text-input" className="label">Your Text</label>
                  <textarea
                    id="text-input"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter your text here..."
                    className="input min-h-24 resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="text-color" className="label">Text Color</label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        id="text-color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-10 h-10 rounded overflow-hidden cursor-pointer"
                      />
                      <span className="ml-2 text-sm font-mono">{textColor}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="text-size" className="label">Text Size ({textSize}px)</label>
                    <input
                      type="range"
                      id="text-size"
                      min="12"
                      max="64"
                      value={textSize}
                      onChange={(e) => setTextSize(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="text-rotation" className="label">Rotation ({textRotation}°)</label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      id="text-rotation"
                      min="-180"
                      max="180"
                      value={textRotation}
                      onChange={(e) => setTextRotation(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <button
                      onClick={() => setTextRotation(0)}
                      className="ml-2 p-1 text-surface-600 hover:text-primary"
                      aria-label="Reset rotation"
                    >
                      <RotateCwIcon size={20} />
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={addTextElement}
                  disabled={!textInput.trim()}
                  className="btn-primary w-full"
                >
                  Add Text to Design
                </button>
              </motion.div>
            )}
            
            {/* Image Controls */}
            {designMode === 'image' && (
              <motion.div
                key="image-controls"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="image-upload" className="label">Upload Image</label>
                  <div className="flex items-center">
                    <label className="btn-outline flex items-center cursor-pointer">
                      <UploadIcon size={18} className="mr-1" />
                      <span>Choose File</span>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="ml-2 text-sm text-surface-500 dark:text-surface-400">
                      {imagePreview ? 'Image selected' : 'No image selected'}
                    </span>
                  </div>
                </div>
                
                {imagePreview && (
                  <>
                    <div className="bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg p-4 flex justify-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-36 object-contain"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="image-scale" className="label">Image Scale ({imageScale}%)</label>
                      <input
                        type="range"
                        id="image-scale"
                        min="10"
                        max="200"
                        value={imageScale}
                        onChange={(e) => setImageScale(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="image-rotation" className="label">Rotation ({imageRotation}°)</label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          id="image-rotation"
                          min="-180"
                          max="180"
                          value={imageRotation}
                          onChange={(e) => setImageRotation(parseInt(e.target.value))}
                          className="w-full"
                        />
                        <button
                          onClick={() => setImageRotation(0)}
                          className="ml-2 p-1 text-surface-600 hover:text-primary"
                          aria-label="Reset rotation"
                        >
                          <RotateCwIcon size={20} />
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={addImageElement}
                      className="btn-primary w-full"
                    >
                      Add Image to Design
                    </button>
                  </>
                )}
              </motion.div>
            )}
            
            {/* Color Selection */}
            {designMode === 'color' && (
              <motion.div
                key="color-controls"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div>
                  <label className="label">Shirt Color</label>
                  <div className="grid grid-cols-4 gap-3">
                    {SHIRT_COLORS.map((color) => (
                      <button
                        key={color.name}
                        className={`w-full aspect-square rounded-lg border-2 transition-all ${
                          shirtColor.name === color.name
                            ? 'border-primary scale-105 shadow-md'
                            : 'border-surface-300 dark:border-surface-600'
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => setShirtColor(color)}
                        aria-label={`Select ${color.name}`}
                      />
                    ))}
                  </div>
                  <div className="mt-2 text-center text-sm font-medium">
                    {shirtColor.name}
                  </div>
                </div>
                
                <div className="p-4 bg-surface-100 dark:bg-surface-700 rounded-lg">
                  <h4 className="font-medium mb-2">Color Preview</h4>
                  <div 
                    className="aspect-video rounded overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: shirtColor.value }}
                  >
                    <div style={{ color: shirtColor.textColor }} className="text-center">
                      <div className="font-bold text-xl">Sample Text</div>
                      <div>This is how text will appear on this shirt color</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Design Elements List */}
          <div className="mt-6">
            <h4 className="font-medium mb-2">Design Elements ({designElements.length})</h4>
            {designElements.length > 0 ? (
              <div className="bg-surface-100 dark:bg-surface-700 rounded-lg p-2 max-h-48 overflow-y-auto">
                {designElements.map((element, index) => (
                  <div 
                    key={element.id}
                    className={`p-2 mb-1 rounded flex items-center justify-between cursor-pointer ${
                      selectedElement === element.id
                        ? 'bg-primary/20'
                        : 'hover:bg-surface-200 dark:hover:bg-surface-600'
                    }`}
                    onClick={() => setSelectedElement(element.id)}
                  >
                    <div className="flex items-center">
                      <span className="w-5 h-5 rounded-full bg-surface-300 dark:bg-surface-500 flex items-center justify-center text-xs">
                        {index + 1}
                      </span>
                      <span className="ml-2 text-sm truncate max-w-[150px]">
                        {element.type === 'text' 
                          ? (element.content || 'Text').substring(0, 20) + (element.content.length > 20 ? '...' : '') 
                          : 'Image'}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeElement(element.id);
                      }}
                      className="text-surface-500 hover:text-red-500"
                      aria-label="Remove element"
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-surface-100 dark:bg-surface-700 rounded-lg p-4 text-center text-sm text-surface-500">
                No elements added yet. Use the controls above to add text or images.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}