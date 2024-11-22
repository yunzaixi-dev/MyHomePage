import axios from 'axios';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const githubAxios = axios.create({
  baseURL: 'https://api.github.com',
  headers: GITHUB_TOKEN ? {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  } : {
    Accept: 'application/vnd.github.v3+json',
  }
});

export interface Repository {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  isTemplate: boolean;
}

export interface GitHubProfile {
  name: string;
  bio: string;
  avatarUrl: string;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  repositories: Repository[];
}

class GitHubService {
  private username: string;

  constructor(username: string) {
    this.username = username;
  }

  async getProfile(): Promise<GitHubProfile> {
    try {
      const [userResponse, reposResponse] = await Promise.all([
        githubAxios.get(`/users/${this.username}`),
        githubAxios.get(`/users/${this.username}/repos?sort=updated&per_page=10`)
      ]);

      const { 
        name, 
        bio, 
        avatar_url, 
        company,
        blog,
        location,
        email,
        public_repos, 
        followers, 
        following 
      } = userResponse.data;

      const repositories: Repository[] = reposResponse.data.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        topics: repo.topics || [],
        isTemplate: repo.is_template
      }));

      return {
        name,
        bio,
        avatarUrl: avatar_url,
        company,
        blog,
        location,
        email,
        publicRepos: public_repos,
        followers,
        following,
        repositories
      };
    } catch (error) {
      console.error('Error fetching GitHub profile:', error);
      throw error;
    }
  }
}

export default GitHubService;
