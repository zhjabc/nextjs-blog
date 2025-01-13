'use client'

import Link from 'next/link'
import PageLayout from './PageLayout'
import { useTheme } from '../contexts/ThemeContext'

interface PostLayoutProps {
  children: React.ReactNode
  title: string
  date: string
  category: string
  description: string
  stats: {
    wordCount: number
    readingTime: number
  }
}

export default function PostLayout({ 
  children, 
  title, 
  date, 
  category,
  description,
  stats 
}: PostLayoutProps) {
  const { theme } = useTheme()

  // 格式化日期
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  return (
    <PageLayout>
      <article className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          {/* 文章头部 */}
          <header className="mb-16">
            <div className="flex items-center gap-2 text-sm post-meta mb-4">
              <Link 
                href="/blog" 
                className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
              >
                <svg 
                  className="w-4 h-4 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
                返回文章列表
              </Link>
              <span>•</span>
              <span className="category-tag px-3 py-1 rounded-full">
                {category}
              </span>
              <span>•</span>
              <time>{formatDate(date)}</time>
              <span>•</span>
              <span>{stats.wordCount} 字</span>
              <span>•</span>
              <span>预计阅读 {stats.readingTime} 分钟</span>
            </div>
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-lg text-gray-400">
              {description}
            </p>
          </header>

          {/* 文章内容 */}
          <div className={`prose prose-lg max-w-none ${
            theme === 'dark' ? 'prose-invert' : ''
          } 
            prose-headings:scroll-mt-24
            prose-headings:font-semibold
            prose-h2:text-3xl
            prose-h3:text-2xl
            prose-p:text-base
            prose-p:leading-7
            prose-a:text-blue-400
            prose-a:no-underline
            prose-a:hover:text-blue-300
            prose-strong:text-blue-400
            prose-strong:font-semibold
            prose-code:text-blue-400
            prose-code:before:content-none
            prose-code:after:content-none
            prose-pre:bg-gray-900
            prose-pre:border
            prose-pre:border-white/10
            prose-img:rounded-lg
            prose-img:shadow-lg
            prose-blockquote:border-l-blue-400
            prose-blockquote:bg-white/5
            prose-blockquote:px-6
            prose-blockquote:py-4
            prose-blockquote:rounded-r-lg
            prose-ul:list-disc
            prose-ul:pl-6
            prose-ul:my-6
            prose-ol:list-decimal
            prose-ol:pl-6
            prose-ol:my-6
            prose-li:mb-2
            ${theme === 'light' ? `
              prose-p:text-gray-600
              prose-li:text-gray-600
              prose-blockquote:bg-gray-50
              prose-pre:bg-gray-50
              prose-pre:border-gray-200
            ` : ''}
          `}>
            {children}
          </div>
        </div>
      </article>
    </PageLayout>
  )
} 