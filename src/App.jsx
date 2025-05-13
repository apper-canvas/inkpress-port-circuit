import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from './utils/iconUtils';

// Import pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CustomizeShirt from './pages/CustomizeShirt';

// Icon declarations
const SunIcon = getIcon('Sun');
const MoonIcon = getIcon('Moon');

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-surface-900/80 backdrop-blur-sm border-b border-surface-200 dark:border-surface-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-primary text-xl font-bold">InkPress</div>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 focus:outline-none"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={darkMode ? 'dark' : 'light'}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </header>
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/customize" element={<CustomizeShirt />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <footer className="py-6 bg-surface-100 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 text-center text-sm text-surface-600 dark:text-surface-400">
          &copy; {new Date().getFullYear()} InkPress. All rights reserved.
        </div>
      </footer>
      
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default App;