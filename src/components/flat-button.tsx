import React from 'react';

type FlatButtonProps = React.ComponentProps<'button'>;

const FlatButton: React.FC<FlatButtonProps> = ({ className, children, ...props }) => (
  <button
    className={`block px-6 py-2 mx-auto text-gray-700 transition-colors duration-150 bg-white border border-gray-400 rounded-sm hover:text-black hover:border-black ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default FlatButton;
