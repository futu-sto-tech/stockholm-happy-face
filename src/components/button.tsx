import React from 'react';
import { motion } from 'framer-motion';

const Button: React.FC<{
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'reset' | 'submit';
}> = ({ className, ...props }) => (
  <motion.button
    className={`inline-block p-3 text-gray-700 bg-gray-300 rounded-full hover:bg-gray-200 ${className}`}
    whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05 }}
    {...props}
  />
);

export default Button;
