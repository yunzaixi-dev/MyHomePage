import React from 'react';
import { GitHubProfile } from '../services/github';
import { useTheme } from '../contexts/ThemeContext';

interface ProfileHeaderProps {
  profile: GitHubProfile | null;
  loading: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, loading }) => {
  const { theme } = useTheme();

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <div className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full animate-pulse mb-4
          ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        <div className={`h-6 w-48 animate-pulse rounded
          ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-500 flex items-center justify-center">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Y</span>
        </div>
        <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
          Failed to load profile
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <img
        src={profile.avatarUrl}
        alt={profile.name}
        className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full mb-4
          ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
        style={{
          padding: '4px',
          background: `linear-gradient(to right top, #f59e0b, #e879f9, #6366f1) padding-box,
                      linear-gradient(to right top, #f59e0b, #e879f9, #6366f1) border-box`,
          border: '4px solid transparent'
        }}
      />
      <div className="relative">
        {/* 名字容器 */}
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold relative px-8 py-2 group
          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {/* 背景效果 */}
          <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left bg-current opacity-5"></span>
          
          {/* 左侧装饰 */}
          <span className="absolute left-0 top-1/2 w-3 h-px transform -translate-y-1/2 origin-left
            transition-all duration-300 group-hover:w-4 bg-current opacity-70"></span>
          
          {/* 右侧装饰 */}
          <span className="absolute right-0 top-1/2 w-3 h-px transform -translate-y-1/2 origin-right
            transition-all duration-300 group-hover:w-4 bg-current opacity-70"></span>
          
          {/* 名字文本 */}
          {profile.name}
        </h1>
      </div>
      <div className={`flex items-center space-x-6
        ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        <div className="flex items-center">
          <span className="font-semibold mr-1">{profile.publicRepos}</span>
          <span className="text-sm">repos</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold mr-1">{profile.followers}</span>
          <span className="text-sm">followers</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold mr-1">{profile.following}</span>
          <span className="text-sm">following</span>
        </div>
      </div>
    </div>
  );
};
