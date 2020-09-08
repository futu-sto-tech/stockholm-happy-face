import React from 'react';

interface Props {
  user: {
    name: string;
    image?: string;
  };
  image: {
    webp?: string;
    url: string;
  };
}

const GifPost: React.FC<Props> = ({ user, image }) => {
  return (
    <div>
      <header className="flex items-center px-3 py-2 space-x-4 bg-black rounded-t-lg">
        <img className="h-10 rounded-full" src={user.image} alt={user.name} />
        <p className="text-lg font-bold text-white">{user.name}</p>
      </header>
      <picture>
        <source srcSet={image.webp} type="image/webp" />
        <source srcSet={image.url} type="image/gif" />
        <img src={image.url} loading="lazy" className="w-full rounded-b-lg" />
      </picture>
    </div>
  );
};

export default GifPost;
