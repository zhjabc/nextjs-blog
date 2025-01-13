import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import PageLayout from '@/app/components/PageLayout'
import { getPostStats } from '@/lib/posts'
import TableOfContents from '@/app/components/TableOfContents'
import { addIdsToHeadings } from '@/lib/utils'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const content = addIdsToHeadings(post.content)
  const stats = getPostStats(content)

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
      <div className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          {/* 文章头部 */}
          <header className="mb-16 text-center">
            <div className="flex items-center justify-center gap-2 text-sm post-meta mb-4">
              <span className="px-3 py-1 rounded-full glass-effect">
                {post.data.category}
              </span>
              <span>•</span>
              <time>{formatDate(post.data.date)}</time>
              <span>•</span>
              <span>{stats.wordCount} 字</span>
              <span>•</span>
              <span>预计阅读 {stats.readingTime} 分钟</span>
            </div>
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {post.data.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {post.data.description}
            </p>
          </header>

          {/* 文章内容 */}
          <div className="prose dark:prose-invert max-w-none
            prose-headings:scroll-mt-24
            prose-headings:font-semibold
            prose-headings:text-gray-800
            dark:prose-headings:text-gray-100
            prose-h2:text-3xl
            prose-h3:text-2xl
            prose-p:text-gray-600
            dark:prose-p:text-gray-300
            prose-p:leading-7
            prose-a:text-blue-500
            dark:prose-a:text-blue-400
            prose-a:no-underline
            prose-a:hover:text-blue-600
            dark:prose-a:hover:text-blue-300
            prose-strong:text-blue-500
            dark:prose-strong:text-blue-400
            prose-strong:font-semibold
            prose-code:text-blue-500
            dark:prose-code:text-blue-400
            prose-code:before:content-none
            prose-code:after:content-none
            prose-pre:bg-gray-50
            dark:prose-pre:bg-gray-900
            prose-pre:border
            prose-pre:border-gray-200
            dark:prose-pre:border-white/10
            prose-img:rounded-lg
            prose-img:shadow-lg
            prose-blockquote:border-l-blue-500
            dark:prose-blockquote:border-l-blue-400
            prose-blockquote:bg-gray-50
            dark:prose-blockquote:bg-white/5
            prose-blockquote:text-gray-600
            dark:prose-blockquote:text-gray-300
            prose-blockquote:px-6
            prose-blockquote:py-4
            prose-blockquote:rounded-r-lg
            prose-ul:list-disc
            prose-ul:pl-6
            prose-ul:my-6
            prose-ul:text-gray-600
            dark:prose-ul:text-gray-300
            prose-ol:list-decimal
            prose-ol:pl-6
            prose-ol:my-6
            prose-ol:text-gray-600
            dark:prose-ol:text-gray-300
            prose-li:mb-2
          ">
            <MDXRemote source={content} />
          </div>

          {/* 文章底部 */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-white/10">
            <div className="flex justify-between items-center">
              <a href="/blog" className="flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回文章列表
              </a>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 rounded-full glass-effect hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-300">
                  分享
                </button>
              </div>
            </div>
          </footer>
        </div>

        {/* 目录 */}
        <TableOfContents />
      </div>
    </PageLayout>
  )
} 