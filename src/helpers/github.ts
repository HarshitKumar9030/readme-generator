import { GitHubUser } from '@/types';

export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await response.json();
    return {
      name: userData.name || 'GitHub User',
      avatarUrl: userData.avatar_url,
      bio: userData.bio || 'No bio available',
      location: userData.location || 'Unknown',
      blog: userData.blog || '',
      followers: userData.followers || 0,
      following: userData.following || 0,
      publicRepos: userData.public_repos || 0,
    };
  } catch (error) {
    console.error('Error fetching GitHub user data:', error);
    return null;
  }
}
