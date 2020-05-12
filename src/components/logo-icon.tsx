import { IconType } from 'react-icons/lib/cjs';
import React from 'react';

const LogoIcon: IconType = ({ size = 182, color = 'currentColor' }) => (
  <svg
    width={size}
    height={parseFloat(size.toString()) / (182 / 71)}
    viewBox="0 0 182 71"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M90.0948 12.4162C88.6535 12.4162 87.4307 11.9139 86.4262 10.9094C85.4217 9.90495 84.9194 8.68209 84.9194 7.24085C84.9194 5.79962 85.4217 4.57676 86.4262 3.57226C87.4307 2.52409 88.6535 2 90.0948 2C91.536 2 92.7589 2.52409 93.7634 3.57226C94.8115 4.57676 95.3356 5.79962 95.3356 7.24085C95.3356 8.68209 94.8115 9.90495 93.7634 10.9094C92.7589 11.9139 91.536 12.4162 90.0948 12.4162ZM13.8227 55.6397C11.0713 55.6397 8.6474 55.1593 6.55106 54.1985C4.45472 53.2377 2.83879 51.9056 1.70328 50.2023C0.567759 48.4554 0 46.4464 0 44.1754C0 42.2537 0.393064 40.5068 1.17919 38.9345C2.00899 37.3623 3.10084 36.1176 4.45472 35.2004C5.85228 34.2833 7.38087 33.8247 9.04047 33.8247C10.569 33.8247 11.8574 34.2177 12.9056 35.0039C13.9538 35.7463 14.6089 36.7945 14.8709 38.1484C12.5999 38.1484 10.7874 38.7598 9.43353 39.9827C8.07965 41.1619 7.4027 42.7778 7.4027 44.8305C7.4027 46.7084 7.97046 48.2152 9.10598 49.3507C10.2415 50.4862 11.7482 51.054 13.6262 51.054C15.9409 51.054 17.8407 50.2897 19.3256 48.7611C20.8542 47.1889 21.6185 45.2235 21.6185 42.8652C21.6185 40.8125 21.0508 38.869 19.9152 37.0347C18.7797 35.2004 17.0764 32.973 14.8054 30.3526C12.447 27.6448 10.6564 25.3301 9.43353 23.4085C8.25434 21.4432 7.66475 19.3032 7.66475 16.9884C7.66475 14.7174 8.29801 12.6866 9.56455 10.896C10.8311 9.06166 12.578 7.62043 14.8054 6.57226C17.0328 5.52409 19.544 5 22.3391 5C25.8767 5 28.6937 5.8298 30.79 7.48941C32.93 9.14901 34 11.3764 34 14.1715C34 16.0058 33.5414 17.4907 32.6243 18.6262C31.7072 19.7617 30.5061 20.3295 29.0212 20.3295C27.3616 20.3295 26.0296 19.6525 25.0251 18.2987C25.8549 17.6872 26.51 16.8793 26.9904 15.8748C27.4708 14.8703 27.711 13.8221 27.711 12.7303C27.711 11.3327 27.2961 10.219 26.4663 9.38922C25.6365 8.55942 24.501 8.14451 23.0597 8.14451C21.3128 8.14451 19.8716 8.77778 18.736 10.0443C17.6442 11.2672 17.0983 12.8394 17.0983 14.7611C17.0983 16.508 17.6005 18.1458 18.605 19.6744C19.6095 21.1593 21.1818 23.0809 23.3218 25.4393C25.0687 27.3173 26.4663 28.9332 27.5145 30.2871C28.6063 31.641 29.5235 33.2132 30.2659 35.0039C31.052 36.7508 31.4451 38.6506 31.4451 40.7033C31.4451 43.4984 30.659 46.0315 29.0867 48.3025C27.5581 50.5736 25.44 52.3642 22.7322 53.6744C20.0681 54.9846 17.0983 55.6397 13.8227 55.6397ZM72.3442 54.8536C69.6801 54.8536 67.7148 54.1548 66.4483 52.7573C65.2254 51.316 64.614 49.5472 64.614 47.4509C64.614 46.5338 64.7231 45.5074 64.9415 44.3719C65.1599 43.1927 65.3783 42.0572 65.5966 40.9653C65.8587 39.8735 66.0334 39.1747 66.1207 38.869C66.4701 37.3404 66.7976 35.8337 67.1034 34.3488C67.4091 32.8639 67.5619 31.6628 67.5619 30.7457C67.5619 28.5183 66.7758 27.4046 65.2036 27.4046C64.068 27.4046 63.0635 27.9724 62.1901 29.1079C61.3166 30.1998 60.6178 31.641 60.0937 33.4316L56.414 50.8019C55.9622 52.9348 54.0794 54.4605 51.8992 54.4605C48.9659 54.4605 46.7769 51.7599 47.3841 48.8901L50.9877 31.8594C51.1188 31.3353 51.1843 30.7894 51.1843 30.2216C51.1843 28.3 50.5292 27.3391 49.219 27.3391C47.9961 27.3391 46.9261 27.9069 46.0089 29.0424C45.1355 30.1343 44.4367 31.5973 43.9126 33.4316L40.2327 50.8028C39.781 52.9352 37.8987 54.4605 35.719 54.4605C32.7857 54.4605 30.597 51.7593 31.2054 48.8897L36.2963 24.8757C36.6882 23.0273 38.3199 21.7052 40.2094 21.7052H42.9201C44.7139 21.7052 46.0526 23.3568 45.6814 25.1118C47.9087 22.6224 50.5728 21.3777 53.6737 21.3777C57.517 21.3777 59.7662 23.2556 60.4213 27.0116C62.8233 23.2993 65.8587 21.4432 69.5273 21.4432C71.7546 21.4432 73.5234 22.0546 74.8336 23.2775C76.1438 24.5003 76.7989 26.3565 76.7989 28.8459C76.7989 30.1124 76.6461 31.5318 76.3404 33.1041C76.0347 34.6326 75.5979 36.5106 75.0302 38.738C74.6808 40.0919 74.3532 41.4239 74.0475 42.7341C73.7855 44.0007 73.6544 45.0052 73.6544 45.7476C73.6544 46.6211 73.851 47.298 74.244 47.7785C74.6371 48.2589 75.314 48.4991 76.2749 48.4991C77.1972 48.4991 77.9897 48.2718 78.6523 47.8173C78.6375 47.5499 78.6302 47.2749 78.6302 46.9923C78.6302 45.9005 78.8049 44.4811 79.1543 42.7341L82.9372 24.8763C83.3288 23.0276 84.9607 21.7052 86.8504 21.7052H88.1067C90.6494 21.7052 92.5467 24.0464 92.02 26.5339L88.3257 43.9788C88.151 44.6339 88.0637 45.3327 88.0637 46.0752C88.0637 46.9487 88.2602 47.5819 88.6533 47.975C89.09 48.3244 89.7888 48.4991 90.7496 48.4991C91.7124 48.4991 92.6246 48.1963 93.4864 47.5906C93.4788 47.3951 93.475 47.1957 93.475 46.9923C93.475 45.9005 93.6497 44.4811 93.9991 42.7341L99.9802 14.7288C100.597 11.84 102.961 9.64946 105.888 9.25388L106.481 9.17386C108.538 8.89584 110.249 10.7412 109.817 12.7717L103.171 43.9788C102.996 44.6339 102.909 45.3327 102.909 46.0752C102.909 46.9487 103.105 47.5819 103.498 47.975C103.935 48.3244 104.634 48.4991 105.594 48.4991C106.536 48.4991 107.43 48.2092 108.276 47.6293C108.087 46.6644 107.992 45.6004 107.992 44.4374C107.992 41.4239 108.582 38.1047 109.761 34.4798C110.94 30.8549 112.862 27.7322 115.526 25.1118C118.19 22.4477 121.575 21.1156 125.68 21.1156C130.484 21.1156 132.886 23.212 132.886 27.4046C132.886 29.8504 132.188 32.0996 130.79 34.1522C129.392 36.2049 127.536 37.8645 125.222 39.131C122.907 40.3539 120.439 41.0527 117.819 41.2274C117.731 42.5376 117.688 43.4111 117.688 43.8478C117.688 45.9878 118.059 47.4509 118.801 48.237C119.544 48.9795 120.745 49.3507 122.405 49.3507C124.763 49.3507 126.772 48.8048 128.432 47.7129C129.22 47.2073 130.042 46.5798 130.896 45.8306C130.973 44.9484 131.129 43.9163 131.366 42.7341L135.149 24.8763C135.54 23.0276 137.172 21.7052 139.062 21.7052H140.318C142.861 21.7052 144.758 24.0464 144.231 26.5339L140.537 43.9788C140.406 44.5029 140.341 45.0488 140.341 45.6166C140.341 47.5382 140.996 48.4991 142.306 48.4991C143.442 48.4991 144.446 48.0187 145.32 47.0578C146.193 46.0533 146.892 44.7431 147.416 43.1272L151.325 24.8679C151.719 23.0232 153.349 21.7052 155.236 21.7052H156.492C159.037 21.7052 160.935 24.0508 160.404 26.5399L154.95 52.1022C156.588 51.5562 158.219 50.9678 159.266 49.9364C158.761 48.8119 158.509 47.6558 158.509 46.4682C158.509 45.027 158.858 43.7823 159.557 42.7341C160.212 41.6423 161.02 40.8562 161.981 40.3757C163.684 37.3186 165.169 34.2396 166.435 31.1388C167.702 27.9942 168.903 24.6095 170.038 20.9846L177.554 19.969C178.723 19.811 179.773 20.694 179.827 21.8725C180.051 26.8413 180.392 32.1574 180.848 37.8208C181.066 40.4413 181.175 42.3411 181.175 43.5203C181.175 46.1844 180.498 48.368 179.144 50.0713C177.791 51.7746 176.109 52.9975 174.1 53.7399C172.135 54.4824 170.126 54.8536 168.073 54.8536C165.977 54.8536 164.208 54.4605 162.767 53.6744C161.9 53.1753 161.167 52.5972 160.569 51.9401C158.853 53.5502 156.618 54.4007 154.36 54.9846L153.377 59.7014C152.504 63.9377 150.997 66.842 148.857 68.4143C146.717 70.0302 144.293 70.8382 141.585 70.8382C139.489 70.8382 137.742 70.2923 136.345 69.2004C134.947 68.1086 134.248 66.5363 134.248 64.4837C134.248 61.9943 135.253 59.9853 137.262 58.4567C139.271 56.9718 141.826 55.7271 144.926 54.7226L145.713 51.185C144.446 52.5826 143.158 53.5434 141.847 54.0675C140.537 54.5916 139.205 54.8536 137.851 54.8536C135.755 54.8536 134.052 54.1985 132.741 52.8883C131.9 52.0175 131.338 50.8574 131.055 49.4079C127.294 53.0384 123.013 54.8536 118.212 54.8536C114.98 54.8536 112.469 54.0238 110.678 52.3642C110.27 51.9758 109.908 51.5385 109.593 51.0524C109.089 51.5597 108.564 51.997 108.018 52.3642C105.485 54.0238 102.974 54.8536 100.485 54.8536C98.3883 54.8536 96.685 54.1985 95.3748 52.8883C94.9699 52.4694 94.6297 51.9836 94.3543 51.4308C93.9724 51.7805 93.5788 52.0917 93.1735 52.3642C90.6404 54.0238 88.1292 54.8536 85.6398 54.8536C83.5435 54.8536 81.8402 54.1985 80.53 52.8883C80.2031 52.5502 79.9185 52.1684 79.676 51.7431C79.4197 51.9959 79.1595 52.2248 78.8953 52.4297C76.799 54.0456 74.6152 54.8536 72.3442 54.8536ZM162.674 48.2571C162.739 48.3599 162.814 48.4627 162.898 48.5646C163.553 49.307 164.579 49.6783 165.977 49.6783C167.593 49.6783 168.947 49.1979 170.038 48.237C171.13 47.2762 171.676 45.7258 171.676 43.5858C171.676 42.2756 171.545 40.4413 171.283 38.0829C170.846 33.1041 170.563 29.763 170.432 28.0597C169.383 31.51 167.615 35.6371 165.125 40.4413C166.13 40.9653 166.632 41.7296 166.632 42.7341C166.632 43.5639 166.348 44.3064 165.78 44.9615C165.256 45.6166 164.579 45.9442 163.749 45.9442C163.59 45.9442 163.444 45.959 163.31 45.9871C163.105 46.7882 162.898 47.5535 162.674 48.2571ZM122.929 36.3796C121.487 37.4278 119.959 37.9955 118.343 38.0829C118.998 34.589 120.068 31.4663 121.553 28.7149C123.082 25.9634 124.632 24.5877 126.204 24.5877C127.296 24.5877 127.842 25.483 127.842 27.2736C127.842 29.0642 127.383 30.7675 126.466 32.3835C125.593 33.9994 124.414 35.3314 122.929 36.3796ZM140.079 65.7284C140.821 65.7284 141.542 65.2261 142.24 64.2216C142.939 63.2171 143.485 61.7759 143.878 59.8979L144.271 57.9981C139.991 59.5704 137.851 61.4265 137.851 63.5665C137.851 64.1343 138.048 64.6365 138.441 65.0733C138.834 65.51 139.38 65.7284 140.079 65.7284ZM103.983 69.0908C111.382 70.3351 118.559 68.0435 123.785 63.4464C123.836 63.302 123.876 63.1512 123.902 62.9949C124.111 61.7549 123.425 60.5711 122.315 60.1023C117.088 63.4111 110.427 64.8757 103.543 63.718C99.6753 63.0676 96.1449 61.6581 93.1095 59.6901L90.7704 62.1582C94.2009 65.6964 98.75 68.2109 103.983 69.0908ZM120.5 8.49991C120 9.49991 120 10.4999 120.5 10.9999C121 11.4999 121.911 11.3922 122.5 10.9999C124 9.99997 129.5 6.99992 132.5 6.49992C135.5 5.99992 140.5 5.99992 142 6.49992C143.5 6.99992 143.5 6.49992 143.5 5.49992C143.5 5.0845 143.5 4.84165 143.392 4.66385C143.241 4.41364 142.877 4.29221 142 3.99992C141.893 3.96421 141.781 3.92505 141.662 3.88354C140.644 3.52778 139.134 2.99994 136 3H135.999C132.5 3.00007 131 3.0001 127.5 4C125.75 4.50002 124 5.49991 122.5 6.49991C121 7.49991 120.597 8.30557 120.5 8.49991Z"
      fill={color}
    />
  </svg>
);

export default LogoIcon;