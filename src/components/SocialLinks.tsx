import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface SocialLinkItem {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface SocialLinksProps {
  items: SocialLinkItem[];
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ items }) => {
  const { theme } = useTheme();

  return (
    <section className="text-center">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className={`h-[2px] w-12 sm:w-24 bg-gradient-to-r from-transparent ${theme === 'dark' ? 'to-white' : 'to-gray-900'}`}></div>
        <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold
          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Connect With Me
        </h2>
        <div className={`h-[2px] w-12 sm:w-24 bg-gradient-to-l from-transparent ${theme === 'dark' ? 'to-white' : 'to-gray-900'}`}></div>
      </div>
      <div className="flex justify-center gap-8">
        {items.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`transform hover:scale-110 transition-all duration-300
              ${theme === 'dark'
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
              }`}
            aria-label={social.label}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </section>
  );
};
