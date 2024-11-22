import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export const ThemeButton: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-800/50 text-gray-200 hover:bg-gray-700/50 transition-colors duration-200 backdrop-blur-sm z-50"
      aria-label="Toggle theme"
    >
      {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
};
