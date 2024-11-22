// src/pages/MainPage.tsx
import React, { useEffect, useState } from 'react';
import { FaGithub, FaEnvelope, FaMedium, FaLinkedin, FaGitAlt } from 'react-icons/fa';
import { DiRedis } from 'react-icons/di';
import { BsSun, BsMoon } from 'react-icons/bs';
import { 
  SiReact, 
  SiTauri, 
  SiFlutter, 
  SiGo, 
  SiKubernetes, 
  SiTypescript, 
  SiRust,
  SiPostgresql,
  SiApachekafka,
  SiDocker,
  SiMeilisearch
} from 'react-icons/si';
import GitHubService, { GitHubProfile } from '../services/github';
import { ProfileHeader } from '../components/ProfileHeader';
import { TechStack } from '../components/TechStack';
import { ProjectCard } from '../components/ProjectCard';
import { SocialLinks } from '../components/SocialLinks';
import { AboutMe } from '../components/AboutMe';
import { useTheme } from '../contexts/ThemeContext';
import { GITHUB_USERNAME } from '../config/constants';

const MainPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [githubProfile, setGithubProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubProfile = async () => {
      try {
        const githubService = new GitHubService(GITHUB_USERNAME);
        const profile = await githubService.getProfile();
        setGithubProfile(profile);
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
    { name: 'React', icon: <SiReact />, color: 'text-cyan-400' },
    { name: 'TypeScript', icon: <SiTypescript />, color: 'text-blue-500' },
    { name: 'Flutter', icon: <SiFlutter />, color: 'text-blue-400' },
    
    // Systems & Languages
    { name: 'Rust', icon: <SiRust />, color: 'text-orange-600' },
    { name: 'Golang', icon: <SiGo />, color: 'text-blue-500' },
    { name: 'Tauri', icon: <SiTauri />, color: 'text-yellow-500' },
    
    // Databases & Search
    { name: 'PostgreSQL', icon: <SiPostgresql />, color: 'text-blue-400' },
    { name: 'Redis', icon: <DiRedis />, color: 'text-red-500' },
    { name: 'Meilisearch', icon: <SiMeilisearch />, color: 'text-yellow-500' },
    
    // Infrastructure & Message Queue
    { name: 'Docker', icon: <SiDocker />, color: 'text-blue-500' },
    { name: 'Kubernetes', icon: <SiKubernetes />, color: 'text-blue-600' },
    { name: 'Kafka', icon: <SiApachekafka />, color: theme === 'dark' ? 'text-slate-200' : 'text-slate-700' },
    { name: 'Git', icon: <FaGitAlt />, color: 'text-orange-500' },
  ];

  const socialLinks = [
    { icon: <FaGithub size={getIconSize()} />, href: `https://github.com/${GITHUB_USERNAME}`, label: 'GitHub' },
    { icon: <FaEnvelope size={getIconSize()} />, href: 'mailto:yunzaixi@proton.me', label: 'Email' },
    { icon: <FaMedium size={getIconSize()} />, href: 'https://medium.zaixi.dev', label: 'Medium' },
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

          {/* 技术栈 */}
          <TechStack items={techStack} />

          {/* 项目展示 */}
          <section className="flex flex-col items-center">
            <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-center
              ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Featured Projects
            </h2>
            {loading ? (
              <div className="grid sm:grid-cols-2 gap-4 w-full max-w-5xl">
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
              <div className="grid sm:grid-cols-2 gap-6 w-full max-w-5xl">
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
        </main>

        {/* 页脚 */}
        <footer className={`w-full text-center py-8 mt-16
          ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} zaixi.dev - Crafted with ❤️ using React & Tailwind
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MainPage;