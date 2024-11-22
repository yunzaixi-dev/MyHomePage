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
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className={`relative text-xl sm:text-2xl lg:text-3xl font-bold group
          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {/* 文字内容 */}
          <span className="relative px-4 py-2">
            Connect With Me
            {/* 悬停时显示的背景效果 */}
            <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left bg-current opacity-5"></span>
          </span>
          
          {/* 装饰线条 - 左 */}
          <span className="absolute left-0 top-1/2 w-2 h-px transform -translate-y-1/2 origin-left
            transition-all duration-300 group-hover:w-3 bg-current opacity-70"></span>
          
          {/* 装饰线条 - 右 */}
          <span className="absolute right-0 top-1/2 w-2 h-px transform -translate-y-1/2 origin-right
            transition-all duration-300 group-hover:w-3 bg-current opacity-70"></span>
          
          {/* 底部装饰 */}
          <span className="absolute bottom-0 left-1/2 w-12 h-0.5 -translate-x-1/2
            bg-gradient-to-r from-transparent via-current to-transparent opacity-0
            group-hover:opacity-30 transition-opacity duration-300"></span>
        </span>
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
