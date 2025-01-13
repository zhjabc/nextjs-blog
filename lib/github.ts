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
  const res = await fetch(`${GITHUB_API}/users/${process.env.GITHUB_USERNAME}`, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
    next: { revalidate: 3600 }
  })
  
  if (!res.ok) throw new Error('Failed to fetch GitHub profile')
  return res.json()
}

export async function getGithubRepos(): Promise<GithubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${process.env.GITHUB_USERNAME}/repos?sort=updated&per_page=30`, 
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      next: { revalidate: 3600 }
    }
  )
  
  if (!res.ok) throw new Error('Failed to fetch GitHub repos')
  const repos = await res.json()
  
  return repos
    .filter((repo: GithubRepo) => !repo.fork)
    .slice(0, 6)
} 