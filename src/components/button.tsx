import React from 'react';
import { motion } from 'framer-motion';

const Button: React.FC<{
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'reset' | 'submit';
}> = ({ className, ...props }) => (
  <motion.button
    className={`p-3 text-gray-500 rounded-full hover:bg-gray-800 ${className}`}
    whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05 }}
    {...props}
  />
);

export default Button;
