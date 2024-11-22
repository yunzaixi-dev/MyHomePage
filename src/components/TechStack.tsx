import React from 'react';
import { IconType } from 'react-icons';
import { useTheme } from '../contexts/ThemeContext';

interface TechStackItemType {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface TechStackProps {
  items: TechStackItemType[];
}

export const TechStack: React.FC<TechStackProps> = ({ items }) => {
  const { theme } = useTheme();
  
  return (
    <section>
      <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-8 text-center
        ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Tech Stack
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {items.map((tech) => (
          <div
            key={tech.name}
            className={`relative backdrop-blur-sm rounded-xl p-6 
                     flex flex-col items-center justify-center
                     transform hover:scale-105 transition-all duration-300 
                     group min-h-[160px]
                     ${theme === 'dark' 
                       ? 'bg-gray-800/50 hover:shadow-lg hover:shadow-sky-500/20 border border-sky-900/30 hover:border-sky-500/30' 
                       : 'bg-white/50 hover:shadow-lg hover:shadow-sky-500/10 border border-gray-200 hover:border-sky-200'
                     }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
              ${theme === 'dark'
                ? 'from-sky-500/5 to-blue-500/5'
                : 'from-sky-100/50 to-blue-100/50'
              }`} />
            <div className="relative flex flex-col items-center justify-center space-y-3 w-full">
              <div className="flex items-center justify-center w-full">
                <div className={`text-3xl sm:text-4xl ${tech.color} group-hover:scale-110 transition-transform duration-300`}>
                  {tech.icon}
                </div>
              </div>
              <span className={`text-sm sm:text-base font-medium text-center transition-colors duration-300
                ${theme === 'dark'
                  ? 'text-gray-300 group-hover:text-white'
                  : 'text-gray-600 group-hover:text-gray-900'
                }`}>
                {tech.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
