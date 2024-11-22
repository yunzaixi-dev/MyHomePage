import React from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt, FaJava, FaJs } from 'react-icons/fa';
import { SiDart, SiKotlin, SiVite, SiC, SiCplusplus } from 'react-icons/si';
import { Repository } from '../services/github';
import { useTheme } from '../contexts/ThemeContext';

interface ProjectCardProps {
  repo: Repository;
}

interface TechIcon {
  [key: string]: {
    icon: React.ComponentType<{ size?: number }>;
    priority: number;
  };
}

const techIcons: TechIcon = {
  javascript: { icon: FaJs, priority: 3 },
  js: { icon: FaJs, priority: 3 },
  java: { icon: FaJava, priority: 4 },
  dart: { icon: SiDart, priority: 5 },
  kotlin: { icon: SiKotlin, priority: 6 },
  vite: { icon: SiVite, priority: 7 },
  c: { icon: SiC, priority: 1 },
  cpp: { icon: SiCplusplus, priority: 2 },
  'c++': { icon: SiCplusplus, priority: 2 }
};

const sortTechnologies = (a: string, b: string): number => {
  const priorityA = techIcons[a.toLowerCase()]?.priority || 999;
  const priorityB = techIcons[b.toLowerCase()]?.priority || 999;
  return priorityA - priorityB;
};

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
        {/* Technologies Section */}
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.language && (
            <span
              className={`px-3 py-1 text-xs rounded-full flex items-center gap-1
              ${theme === 'dark'
                ? 'bg-gradient-to-r from-sky-500/20 to-blue-500/20 text-sky-200 border border-sky-500/20'
                : 'bg-gradient-to-r from-sky-100 to-blue-100 text-sky-700 border border-sky-200'
              }`}
            >
              {techIcons[repo.language.toLowerCase()]?.icon && 
                React.createElement(techIcons[repo.language.toLowerCase()].icon, { size: 12 })}
              {repo.language}
            </span>
          )}
          {[...repo.topics]
            .sort(sortTechnologies)
            .slice(0, 4)
            .map((topic) => (
              <span
                key={topic}
                className={`px-3 py-1 text-xs rounded-full flex items-center gap-1
                ${theme === 'dark'
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-200 border border-purple-500/20'
                  : 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200'
                }`}
              >
                {techIcons[topic.toLowerCase()]?.icon && 
                  React.createElement(techIcons[topic.toLowerCase()].icon, { size: 12 })}
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
