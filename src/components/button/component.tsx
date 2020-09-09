import React from 'react';
import styles from './styles.module.css';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button {...props} className={styles.primary}>
    {children}
  </button>
);

export const ButtonSecondary: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button {...props} className={styles.secondary}>
    {children}
  </button>
);

export default Button;
