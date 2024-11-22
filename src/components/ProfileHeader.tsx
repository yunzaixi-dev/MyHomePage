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
        className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full mb-4 border-4 border-blue-500 shadow-lg"
      />
      <div className="flex items-center gap-4 mb-4">
        <div className={`h-[2px] w-12 sm:w-24 bg-gradient-to-r from-transparent ${theme === 'dark' ? 'to-blue-400' : 'to-blue-500'}`}></div>
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold
          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {profile.name}
        </h1>
        <div className={`h-[2px] w-12 sm:w-24 bg-gradient-to-l from-transparent ${theme === 'dark' ? 'to-blue-400' : 'to-blue-500'}`}></div>
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
