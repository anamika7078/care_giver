import { motion } from 'framer-motion';

const PageContainer = ({ children, className = '', padding = 'py-16' }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-16 ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default PageContainer;
