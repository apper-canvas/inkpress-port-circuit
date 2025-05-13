import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ShirtPreview from '../components/ShirtPreview';
import DesignControls from '../components/DesignControls';
import getIcon from '../utils/iconUtils';

// Icon declarations
const ArrowLeftIcon = getIcon('ArrowLeft');
const SaveIcon = getIcon('Save');
const ShoppingCartIcon = getIcon('ShoppingCart');

export default function CustomizeShirt() {
  const [design, setDesign] = useState({
    productType: 't-shirt',
    color: '#3b82f6',
    size: 'M',
    text: [],
    images: []
  });

  const handleDesignChange = (changes) => {
    setDesign(prev => ({ ...prev, ...changes }));
  };
  
  const handleAddText = (text) => {
    setDesign(prev => ({
      ...prev,
      text: [...prev.text, {
        id: Date.now(),
        content: text.content,
        font: text.font,
        size: text.size,
        color: text.color,
        position: { x: 50, y: 50 }
      }]
    }));
    toast.success('Text added to design!');
  };
  
  const handleAddImage = (imageUrl) => {
    setDesign(prev => ({
      ...prev,
      images: [...prev.images, {
        id: Date.now(),
        url: imageUrl,
        width: 100,
        position: { x: 50, y: 50 }
      }]
    }));
    toast.success('Image added to design!');
  };
  
  const handleSaveDesign = () => {
    toast.success('Design saved successfully!');
  };
  
  const handleAddToCart = () => {
    toast.success('Product added to cart!');
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-surface-50 dark:bg-surface-900 py-8"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold">Customize Your Shirt</h1>
            <a href="/" className="btn-outline text-sm flex items-center gap-2">
              <ArrowLeftIcon size={16} /> Back to Home
            </a>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ShirtPreview design={design} />
            <DesignControls design={design} onChange={handleDesignChange} onAddText={handleAddText} onAddImage={handleAddImage} onSave={handleSaveDesign} onAddToCart={handleAddToCart} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}