import { IconType } from 'react-icons/lib/cjs';
import React from 'react';

const FlowsIcon: IconType = ({ size = 28, color = 'currentColor' }) => (
  <svg
    width={size}
    height={parseFloat(size.toString()) / 1.272727273}
    viewBox="0 0 28 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H22V6H0V0ZM6 8H28V14H6V8ZM22 16H0V22H22V16Z"
      fill={color}
    />
  </svg>
);

export default FlowsIcon;
