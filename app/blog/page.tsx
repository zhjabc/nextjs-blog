'use client'

import Link from 'next/link'
import PageLayout from '@/app/components/PageLayout'
import { useState, useEffect } from 'react'
import type { PostMetadata } from '@/lib/posts'

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [posts, setPosts] = useState<PostMetadata[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = selectedCategory
          ? `/api/posts?category=${encodeURIComponent(selectedCategory)}`
          : '/api/posts'
        const response = await fetch(url)
        const data = await response.json()
        
        // 使用 setTimeout 来平滑过渡
        setTimeout(() => {
          setPosts(data.posts)
          setCategories(data.categories)
          setLoading(false)
        }, 300)
      } catch (error) {
        console.error('Error fetching posts:', error)
        setLoading(false)
      }
    }

    setLoading(true)
    fetchData()
  }, [selectedCategory])

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
      <div className="min-h-screen">
        <div className="py-16 px-8">
          <div className="max-w-5xl mx-auto">
            {/* 头部区域 - 使用相对定位和背景模糊 */}
            <div className="relative z-10 mb-12">
              <div className="absolute inset-0 bg-gradient-to-b from-background-start via-background-start to-transparent -z-10" />
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                  博客文章
                </h1>
                <p className="blog-description max-w-2xl mx-auto">
                  分享 Web 开发、软件架构和技术创新的见解与经验
                </p>
              </div>

              {/* 分类选择器 */}
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    selectedCategory === null
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'glass-effect hover:bg-opacity-80'
                  }`}
                >
                  全部文章
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'glass-effect hover:bg-opacity-80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 文章列表区域 */}
            <div className="transition-opacity duration-300 ease-in-out">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                      <article 
                        key={post.slug} 
                        className="group glass-effect overflow-hidden transition-all duration-300 ease-out hover:translate-y-[-4px] hover:shadow-xl"
                      >
                        <Link href={`/posts/${post.slug}`} className="block p-6">
                          <div className="aspect-[2/1] relative mb-6 overflow-hidden rounded-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-80 group-hover:opacity-70 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg 
                                className="w-12 h-12 text-white/80"
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={1.5} 
                                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="flex items-center gap-2 text-sm post-meta mb-2">
                              <span className="category-tag px-3 py-1 rounded-full">
                                {post.category}
                              </span>
                              <span>•</span>
                              <time>{formatDate(post.date)}</time>
                            </div>
                            <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                              {post.title}
                            </h2>
                            <p className="text-gray-400 line-clamp-2">
                              {post.description}
                            </p>
                          </div>
                          <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                            阅读全文
                            <svg 
                              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 5l7 7-7 7" 
                              />
                            </svg>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>

                  {posts.length === 0 && (
                    <div className="glass-effect p-12 text-center">
                      <svg 
                        className="w-16 h-16 mx-auto mb-4 text-gray-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01" 
                        />
                      </svg>
                      <div className="text-gray-400 mb-4">
                        暂无相关文章
                      </div>
                      <button
                        onClick={() => setSelectedCategory(null)}
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
                        返回全部文章
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
} 