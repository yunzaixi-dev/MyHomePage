import React from 'react';
import { GitHubProfile } from '../services/github';
import { FaMapMarkerAlt, FaBuilding, FaGlobe, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

interface AboutMeProps {
  profile: GitHubProfile | null;
  loading: boolean;
}

export const AboutMe: React.FC<AboutMeProps> = ({ profile, loading }) => {
  const { theme } = useTheme();

  if (loading) {
    return (
      <section className="text-center animate-pulse">
        <div className={`h-8 w-48 mx-auto rounded mb-4
          ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        <div className={`h-4 w-3/4 mx-auto rounded mb-2
          ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        <div className={`h-4 w-2/3 mx-auto rounded
          ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
      </section>
    );
  }

  if (!profile) {
    return null;
  }

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: profile.location, show: !!profile.location },
    { icon: <FaBuilding />, text: profile.company, show: !!profile.company },
    { icon: <FaGlobe />, text: profile.blog, link: profile.blog, show: !!profile.blog },
    { icon: <FaEnvelope />, text: profile.email, link: `mailto:${profile.email}`, show: !!profile.email }
  ].filter(item => item.show);

  return (
    <section className="text-center">
      <div className="flex items-center justify-center gap-2 mb-8">
        <span className={`relative text-xl sm:text-2xl lg:text-3xl font-bold group
          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {/* 文字内容 */}
          <span className="relative px-4 py-2">
            About Me
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
      <p className={`text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-6
        ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        {profile.bio}
      </p>
      {contactInfo.length > 0 && (
        <div className={`flex flex-wrap justify-center gap-4
          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}>
                {item.icon}
              </span>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors
                    ${theme === 'dark'
                      ? 'hover:text-blue-400'
                      : 'hover:text-blue-500'}`}
                >
                  {item.text}
                </a>
              ) : (
                <span>{item.text}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
