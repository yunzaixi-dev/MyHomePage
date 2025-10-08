// src/pages/MainPage.tsx
import React, { useEffect, useState } from 'react';
import { FaGithub, FaEnvelope, FaDatabase, FaPython, FaChartLine, FaDocker, FaBook } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import {
  SiSvelte,
  SiGo,
  SiKubernetes,
  SiTypescript,
  SiPostgresql,
  SiMeilisearch,
  SiDocker,
  SiAnsible
} from 'react-icons/si';
import GitHubService, { GitHubProfile } from '../services/github';
import { ProfileHeader } from '../components/ProfileHeader';
import { TechStack } from '../components/TechStack';
import { ProjectCard } from '../components/ProjectCard';
import { SocialLinks } from '../components/SocialLinks';
import { AboutMe } from '../components/AboutMe';
import { useTheme } from '../contexts/ThemeContext';
import { GITHUB_USERNAME } from '../config/constants';
import { updateFaviconFromGithub } from '../utils/favicon';

const MainPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [githubProfile, setGithubProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchGitHubProfile = async () => {
      try {
        const githubService = new GitHubService(GITHUB_USERNAME);
        const profile = await githubService.getProfile();
        setGithubProfile(profile);
        // 使用 GitHub 头像更新网站图标
        await updateFaviconFromGithub(profile.avatarUrl);
      } catch (error) {
        console.error('Failed to fetch GitHub profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubProfile();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getIconSize = () => {
    if (windowWidth < 640) return 20;
    if (windowWidth < 1024) return 24;
    return 28;
  };

  const techStack = [
    // Frontend
    { name: 'Svelte', icon: <SiSvelte />, color: theme === 'dark' ? 'text-blue-400' : 'text-blue-500' },
    { name: 'TypeScript', icon: <SiTypescript />, color: theme === 'dark' ? 'text-blue-400' : 'text-blue-500' },

    // Backend
    { name: 'Golang', icon: <SiGo />, color: theme === 'dark' ? 'text-blue-400' : 'text-blue-500' },
    { name: 'Python', icon: <FaPython />, color: theme === 'dark' ? 'text-blue-400' : 'text-blue-500' },

    // Infrastructure
    { name: 'Docker', icon: <SiDocker />, color: theme === 'dark' ? 'text-blue-400' : 'text-blue-500' },
    { name: 'K3s', icon: <SiKubernetes />, color: theme === 'dark' ? 'text-blue-400' : 'text-blue-500' },
    { name: 'Ansible', icon: <SiAnsible />, color: theme === 'dark' ? 'text-blue-400' : 'text-blue-500' },

    // Databases & Search
    { name: 'PostgreSQL', icon: <SiPostgresql />, color: theme === 'dark' ? 'text-blue-400' : 'text-blue-500' },
    { name: 'Meilisearch', icon: <SiMeilisearch />, color: theme === 'dark' ? 'text-blue-400' : 'text-blue-500' },
    { name: 'Dragonfly', icon: <FaDatabase />, color: theme === 'dark' ? 'text-blue-400' : 'text-blue-500' },
  ];

  const socialLinks = [
    { icon: <FaGithub size={getIconSize()} />, href: `https://github.com/${GITHUB_USERNAME}`, label: 'GitHub' },
    { icon: <FaEnvelope size={getIconSize()} />, href: 'mailto:yunzaixi@proton.me', label: 'Email' },
    { icon: <FaBook size={getIconSize()} />, href: 'https://blog.zaixi.dev', label: 'Blog' },
  ];

  return (
    <div className={`min-h-screen w-screen overflow-x-hidden transition-colors duration-300
      ${theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-50 text-gray-900'
      }`}>
      {/* 背景装饰 */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-300
        ${theme === 'dark'
          ? 'bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.1),rgba(59,130,246,0.05),rgba(0,0,0,0))]'
          : 'bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.15),rgba(56,189,248,0.1),rgba(255,255,255,0))]'
        }`} />
      
      {/* 菜单按钮 */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`fixed z-50 top-4 left-4 p-2 rounded-full transition-all duration-300 shadow-lg
          ${theme === 'dark'
            ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white'
            : 'bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800'
          }`}
        aria-label="Toggle contact menu"
      >
        <FaEnvelope size={20} />
      </button>

      {/* 滑出式选单 */}
      <div className={`fixed z-40 top-0 left-0 h-full w-64 transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        ${theme === 'dark'
          ? 'bg-gray-800/95 backdrop-blur-sm text-white'
          : 'bg-white/95 backdrop-blur-sm text-gray-900'
        }`}>
        <div className="pt-20 px-4">
          <h3 className={`text-lg font-semibold mb-6 px-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            Contact Me
          </h3>
          <nav className="space-y-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 py-2 px-4 rounded-lg transition-colors duration-200
                  ${theme === 'dark'
                    ? 'hover:bg-white/10'
                    : 'hover:bg-gray-100'
                  }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* 点击外部关闭菜单 */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* 暗色模式切换按钮 */}
      <button
        onClick={toggleTheme}
        className={`fixed z-50 top-4 right-4 p-2 rounded-full transition-all duration-300 shadow-lg
          ${theme === 'dark'
            ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400 hover:text-yellow-300'
            : 'bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800'
          }`}
        aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === 'dark' ? <BsSun size={20} /> : <BsMoon size={20} />}
      </button>
      
      {/* 内容区域 */}
      <div className={`relative flex flex-col items-center w-full
        ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
        {/* 头部区域 */}
        <header className="w-full text-center py-12">
          <ProfileHeader profile={githubProfile} loading={loading} />
        </header>

        <main className="w-full max-w-7xl px-4 space-y-16">
          {/* 关于我 */}
          <AboutMe profile={githubProfile} loading={loading} />

          {/* 服务链接 */}
          <section className="flex flex-wrap justify-center gap-4 mb-8">
            <a
              href="https://monitor.zaixi.dev"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1
                ${theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-900/50 hover:shadow-xl hover:shadow-blue-800/50'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-600/40'
                }`}
            >
              <FaChartLine size={18} />
              <span>Monitor</span>
            </a>
            <a
              href="https://blog.zaixi.dev"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1
                ${theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-900/50 hover:shadow-xl hover:shadow-blue-800/50'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-600/40'
                }`}
            >
              <FaBook size={18} />
              <span>Blog</span>
            </a>
            <a
              href="https://harbor.zaixi.dev"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1
                ${theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-900/50 hover:shadow-xl hover:shadow-blue-800/50'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-600/40'
                }`}
            >
              <FaDocker size={18} />
              <span>Harbor</span>
            </a>
          </section>

          {/* 技术栈 */}
          <TechStack items={techStack} />

          {/* 项目展示 */}
          <section className="mb-12">
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className={`relative text-xl sm:text-2xl lg:text-3xl font-bold group
                ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {/* 文字内容 */}
                <span className="relative px-4 py-2">
                  Latest Commits
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
            {loading ? (
              <div className="grid sm:grid-cols-2 gap-4 w-full max-w-5xl mx-auto">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`rounded-lg p-6 animate-pulse
                    ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div className={`h-6 rounded w-3/4 mb-4
                      ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <div className={`h-4 rounded w-full mb-2
                      ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <div className={`h-4 rounded w-2/3
                      ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  </div>
                ))}
              </div>
            ) : githubProfile ? (
              <div className="grid sm:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
                {githubProfile.repositories
                  .filter(repo => !repo.isTemplate)
                  .map((repo) => (
                    <ProjectCard key={repo.name} repo={repo} />
                  ))}
              </div>
            ) : (
              <div className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Failed to load projects
              </div>
            )}
          </section>

          {/* 联系方式 */}
          <SocialLinks items={socialLinks} />

          {/* 页脚 */}
          <footer className={`w-full text-center py-8 mt-16
            ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} zaixi.dev - Crafted with ❤️ using React & Tailwind
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default MainPage;