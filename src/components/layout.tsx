import FlowsIcon from './flows-icon';
import GifIcon from './gif-icon';
import { IconType } from 'react-icons/lib/cjs';
import Link from 'next/link';
import ProfileIcon from './profile-icon';
import React from 'react';
import { useRouter } from 'next/router';

interface LinkButtonProps {
  IconComponent: IconType;
  title: string;
  active: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({ IconComponent, title, active, ...props }) => (
  <a className={`block p-2 ${active && 'bg-black'}`} {...props}>
    <div
      className={`flex flex-col items-center justify-center h-20 rounded-lg space-y-1 ${
        active ? 'text-white' : 'text-black hover:bg-gray-300'
      }`}
    >
      <IconComponent className="mx-auto" />
      <p className="text-sm font-semibold text-current">{title}</p>
    </div>
  </a>
);

const Layout: React.FC<{ showNav?: boolean }> = ({ children, showNav = true }) => {
  const router = useRouter();

  return (
    <div className="flex flex-row">
      <nav className={`w-24 ${showNav ? 'block' : 'hidden'}`}>
        <Link href="/profile" passHref>
          <LinkButton
            IconComponent={GifIcon}
            title="Your GIFs"
            active={router.pathname === '/profile'}
          />
        </Link>
        <Link href="/teams" passHref>
          <LinkButton
            IconComponent={FlowsIcon}
            title="Flows"
            active={router.pathname === '/teams'}
          />
        </Link>
        <Link href="/settings" passHref>
          <LinkButton
            IconComponent={ProfileIcon}
            title="Profile"
            active={router.pathname === '/settings'}
          />
        </Link>
      </nav>
      <main className="relative flex-1 h-screen overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;
