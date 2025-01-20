import PageLayout from '@/app/components/PageLayout'
import Image from 'next/image'
import { getGithubProfile, getGithubRepos } from '@/lib/github'

export default async function Home() {
  let profile;
  let repos;

  try {
    [profile, repos] = await Promise.all([
      getGithubProfile(),
      getGithubRepos()
    ]);
  } catch (error) {
    console.error('Failed to fetch GitHub data:', error);
    // 提供默认值
    profile = {
      name: process.env.GITHUB_USERNAME || 'Developer',
      bio: '',
      avatar_url: '',
      html_url: '',
      public_repos: 0,
      followers: 0,
      following: 0,
      location: '',
      blog: ''
    };
    repos = [];
  }

  const languageColors: { [key: string]: string } = {
    TypeScript: 'bg-blue-500',
    JavaScript: 'bg-yellow-500',
    Python: 'bg-green-500',
    Java: 'bg-red-500',
  }

  return (
    <PageLayout>
      <div className="flex flex-col min-h-[calc(100vh-6rem)]">
        {/* 个人介绍部分 */}
        <section className="py-16 px-8">
          <div className="max-w-5xl mx-auto">
            <div className="glass-effect p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
              
              {/* 头像 */}
              <div className="w-48 h-48 relative rounded-full overflow-hidden z-10">
                {profile.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500" />
                )}
              </div>

              {/* 个人信息 */}
              <div className="flex-1 z-10">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 mb-4">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                  Available for hire
                </div>
                <h1 className="text-4xl font-bold mb-4">
                  你好, 我是 <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {profile.name}
                  </span>
                </h1>
                <p className="text-gray-300 mb-6 text-lg">
                  {profile.bio || '全栈开发工程师，热爱技术，喜欢分享'}
                </p>
                
                {/* GitHub 统计 */}
                <div className="flex gap-6 mb-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.904 9.596L10 7.327l4.096 2.269-.783 2.411H6.687l-.783-2.411z" clipRule="evenodd" />
                    </svg>
                    <span>{profile.public_repos} repositories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 10a3 3 0 116 0 3 3 0 01-6 0z" clipRule="evenodd" />
                    </svg>
                    <span>{profile.followers} followers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.172 10l4.242-4.242L13.656 10l-4.242 4.242L5.172 10z" clipRule="evenodd" />
                    </svg>
                    <span>{profile.following} following</span>
                  </div>
                </div>

                {/* 社交链接 */}
                <div className="flex gap-4">
                  <a 
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-effect px-6 py-3 hover:bg-white/10 transition-all hover:scale-105"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      GitHub
                    </span>
                  </a>
                  {profile.blog && (
                    <a 
                      href={profile.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-effect px-6 py-3 hover:bg-white/10 transition-all hover:scale-105"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                        </svg>
                        Website
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 项目展示部分 */}
        <section className="py-16 px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              最近的项目
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {repos.map((repo) => (
                <div 
                  key={repo.id}
                  className="glass-effect p-6 transition-all hover:translate-y-[-4px] hover:shadow-xl"
                >
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    {repo.name}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {repo.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.topics?.map((topic) => (
                      <span 
                        key={topic}
                        className="px-2 py-1 text-sm rounded-full bg-white/10"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    {repo.language && (
                      <div className="flex items-center gap-1">
                        <span className={`w-3 h-3 rounded-full ${languageColors[repo.language] || 'bg-gray-400'}`}></span>
                        {repo.language}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      {repo.stargazers_count}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      {repo.forks_count}
                    </div>
                  </div>
                  <a 
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    查看项目
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
