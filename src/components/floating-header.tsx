import { motion, useTransform, useViewportScroll } from 'framer-motion';

import React from 'react';

const FloatingHeader: React.FC = ({ children }) => {
  const { scrollY } = useViewportScroll();
  const opacity = useTransform(scrollY, [0, 25], [0, 0.1]);
  const boxShadow = useTransform(
    opacity,
    (x: number) => `0 20px 25px -5px rgba(0, 0, 0, ${x}), 0 10px 10px -5px rgba(0, 0, 0, ${x / 2})`,
  );

  return (
    <motion.div className="sticky top-0 z-50 border-b shadow-xl" style={{ boxShadow }}>
      {children}
    </motion.div>
  );
};

export default FloatingHeader;
