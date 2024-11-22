import React from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt } from 'react-icons/fa';
import { Repository } from '../services/github';
import { useTheme } from '../contexts/ThemeContext';

interface ProjectCardProps {
  repo: Repository;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ repo }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`group relative backdrop-blur-sm rounded-xl p-6 
      shadow-lg transform hover:scale-[1.02]
      transition-all duration-300 ease-out
      ${theme === 'dark'
        ? 'bg-gray-800/50 border border-sky-900/30 hover:bg-gray-800/70 hover:border-sky-500/30 hover:shadow-sky-500/10'
        : 'bg-white/50 border border-gray-200 hover:bg-white/70 hover:border-sky-200 hover:shadow-sky-200/20'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300
        ${theme === 'dark'
          ? 'from-sky-500/10 to-blue-500/10'
          : 'from-sky-100/50 to-blue-100/50'
        }`} />
      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          <h3 className={`text-lg font-semibold transition-colors
            ${theme === 'dark'
              ? 'text-white group-hover:text-purple-300'
              : 'text-gray-900 group-hover:text-purple-600'
            }`}>
            {repo.name}
          </h3>
          <div className="flex space-x-3">
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors transform hover:scale-110
                ${theme === 'dark'
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <FaGithub size={20} />
            </a>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors transform hover:scale-110
                  ${theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <FaExternalLinkAlt size={18} />
              </a>
            )}
          </div>
        </div>
        <p className={`mb-4 line-clamp-2
          ${theme === 'dark'
            ? 'text-gray-300 group-hover:text-gray-200'
            : 'text-gray-600 group-hover:text-gray-900'
          }`}>
          {repo.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className={`px-3 py-1 text-xs rounded-full 
              ${theme === 'dark'
                ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-200 border border-purple-500/20'
                : 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200'
              }`}
            >
              {topic}
            </span>
          ))}
        </div>
        <div className={`flex items-center space-x-4 text-sm
          ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="flex items-center space-x-1">
            <FaStar />
            <span>{repo.stars}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaCodeBranch />
            <span>{repo.forks}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
