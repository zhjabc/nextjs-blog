const GITHUB_API = 'https://api.github.com'

export interface GithubProfile {
  name: string
  bio: string
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  location: string
  blog: string
}

export interface GithubRepo {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
  created_at: string
  updated_at: string
  fork: boolean
}

export async function getGithubProfile(): Promise<GithubProfile> {
  const username = process.env.GITHUB_USERNAME
  const token = process.env.GITHUB_TOKEN

  if (!username || !token) {
    throw new Error('GitHub configuration missing. Please set GITHUB_USERNAME and GITHUB_TOKEN in Vercel environment variables.')
  }

  try {
    const res = await fetch(`${GITHUB_API}/users/${username}`, {
      headers: {
        Authorization: `token ${token}`,
      },
      next: { revalidate: 3600 }
    })
    
    if (!res.ok) {
      throw new Error(`GitHub API responded with status ${res.status}`)
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching GitHub profile:', error)
    throw new Error('Failed to fetch GitHub profile')
  }
}

export async function getGithubRepos(): Promise<GithubRepo[]> {
  const username = process.env.GITHUB_USERNAME
  const token = process.env.GITHUB_TOKEN

  if (!username || !token) {
    throw new Error('GitHub configuration missing. Please set GITHUB_USERNAME and GITHUB_TOKEN in Vercel environment variables.')
  }

  try {
    const res = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=30`, 
      {
        headers: {
          Authorization: `token ${token}`,
        },
        next: { revalidate: 3600 }
      }
    )

    if (!res.ok) {
      throw new Error(`GitHub API responded with status ${res.status}`)
    }

    const repos = await res.json()
    return repos.filter((repo: GithubRepo) => !repo.fork).slice(0, 6)
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    throw new Error('Failed to fetch GitHub repositories')
  }
}