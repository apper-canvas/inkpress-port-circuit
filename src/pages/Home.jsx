import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

// Icon declarations
const TShirtIcon = getIcon('Shirt');
const PaletteIcon = getIcon('Palette');
const TruckIcon = getIcon('Truck');
const ArrowDownIcon = getIcon('ArrowDown');

export default function Home() {
  const [designCount, setDesignCount] = useState(0);
  
  const incrementDesignCount = () => {
    setDesignCount(prev => prev + 1);
    toast.success(`Design #${designCount + 1} saved successfully!`);
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
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="font-bold text-4xl md:text-5xl lg:text-6xl text-balance bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary dark:from-primary-light dark:to-secondary-light mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Design Your Custom Shirt. Wear Your Creativity.
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-surface-700 dark:text-surface-300 mb-8 max-w-2xl mx-auto"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Upload your designs or create something unique with our easy-to-use tools. 
              We'll print and ship your custom shirts on demand.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a href="#design-tool" className="btn-primary w-full sm:w-auto">
                Start Designing Now
              </a>
              <div className="text-sm text-surface-500 dark:text-surface-400">
                {designCount > 0 ? `${designCount} design${designCount > 1 ? 's' : ''} created today` : 'No designs created yet'}
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-surface-500 dark:text-surface-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <ArrowDownIcon size={24} />
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <TShirtIcon size={40} className="text-primary" />, 
                title: "Choose Your Product", 
                description: "Select from various styles, sizes, and colors for your custom apparel." 
              },
              { 
                icon: <PaletteIcon size={40} className="text-primary" />, 
                title: "Design & Customize", 
                description: "Upload your artwork or use our design tools to create something unique." 
              },
              { 
                icon: <TruckIcon size={40} className="text-primary" />, 
                title: "Print & Ship", 
                description: "We'll print your design and ship your custom apparel directly to you." 
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="card p-6 flex flex-col items-center text-center hover:shadow-soft"
                whileHover={{ y: -5 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="bg-primary/10 dark:bg-primary/20 rounded-full p-4 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-surface-600 dark:text-surface-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Feature Section with Design Tool */}
      <section id="design-tool" className="py-16 bg-surface-50 dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Design Your Custom Shirt
          </h2>
          
          <MainFeature onSaveDesign={incrementDesignCount} />
        </div>
      </section>
    </motion.div>
  );
}