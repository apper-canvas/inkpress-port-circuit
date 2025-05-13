import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

// Icon declarations
const HomeIcon = getIcon('Home');
const AlertTriangleIcon = getIcon('AlertTriangle');

export default function NotFound() {
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1 
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div 
      className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div variants={itemVariants} className="text-secondary mb-6">
        <AlertTriangleIcon className="w-20 h-20 md:w-24 md:h-24" />
      </motion.div>
      
      <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4 text-center">
        404 - Page Not Found
      </motion.h1>
      
      <motion.p variants={itemVariants} className="text-lg text-surface-600 dark:text-surface-400 mb-8 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </motion.p>
      
      <motion.div variants={itemVariants}>
        <Link 
          to="/" 
          className="btn-primary inline-flex items-center gap-2"
        >
          <HomeIcon size={20} />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}