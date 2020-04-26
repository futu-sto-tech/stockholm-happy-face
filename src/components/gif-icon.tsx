import { IconType } from 'react-icons/lib/cjs';
import React from 'react';

const GifIcon: IconType = ({ size = 40, color = 'currentColor' }) => (
  <svg
    width={size}
    height={parseFloat(size.toString()) / 1.818181818}
    viewBox="0 0 40 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 0H37V1.375H39V2.75H40V19.25H39V20.625H37V22H3V20.625H1V19.25H0V2.75H1V1.375H3V0ZM8.5 15.75V14.5H7.25V13.25H6V9.5H7.25V8.25H8.5V7H14.75V8.25H9.75V9.5H8.5V13.25H9.75V14.5H12.25V12H11V10.75H14.75V15.75H8.5ZM17.25 15.75V14.5H19.75V8.25H17.25V7H24.75V8.25H22.25V14.5H24.75V15.75H17.25ZM26 7V15.75H28.5V12H33.5V10.75H28.5V8.25H34.75V7H26Z"
      fill={color}
    />
  </svg>
);

export default GifIcon;
