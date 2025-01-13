import Link from 'next/link'
import PageTransition from './PageTransition'
import ThemeToggle from './ThemeToggle'

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      {/* 背景效果 */}
      <div className="fixed inset-0 -z-10">
        {/* 渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-[var(--gradient-opacity)]">
          {/* 动态网格 */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_95%)]" />
          </div>
          {/* 动态光斑 */}
          <div className="absolute inset-0">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </div>

      <main className="relative z-10">
        {/* 导航栏 */}
        <nav className="fixed top-0 left-0 right-0 nav-blur z-50">
          <div className="max-w-5xl mx-auto px-8 py-4 flex justify-between items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              ZHJ
            </span>
            <div className="flex items-center space-x-6">
              <Link href="/" className="hover:text-blue-400 transition-colors">首页</Link>
              <Link href="/blog" className="hover:text-blue-400 transition-colors">博客</Link>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {/* 内容部分 */}
        <div className="min-h-screen pt-24">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </main>
    </div>
  )
} 