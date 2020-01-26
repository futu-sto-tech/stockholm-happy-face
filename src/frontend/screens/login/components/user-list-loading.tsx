import React from 'react';

const UserListLoading: React.FC = () => (
  <>
    {[1, 2, 3, 4, 5].map(item => (
      <div key={item} className="loading-item" />
    ))}
    <style jsx>{`
      @keyframes fade-in {
        0% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      .loading-item {
        height: 24px;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.05);
        animation: fade-in 1.5s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
      }
      .loading-item:first-child {
        margin-top: 24px;
      }
      .loading-item:not(:last-child) {
        margin-bottom: 48px;
      }
    `}</style>
  </>
);

export default UserListLoading;
