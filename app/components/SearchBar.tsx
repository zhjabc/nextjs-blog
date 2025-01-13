'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { PostMetadata } from '@/lib/posts'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<PostMetadata[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (value: string) => {
    setQuery(value)
    if (value.length > 1) {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`)
        const data = await res.json()
        setResults(data)
      } catch (error) {
        console.error('Search error:', error)
      }
      setIsLoading(false)
    } else {
      setResults([])
    }
  }

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="搜索文章..."
          className="w-full px-4 py-2 pl-10 bg-white/5 rounded-lg focus:outline-none focus:ring-2 ring-blue-500/50"
        />
        <svg 
          className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
            isLoading ? 'animate-spin text-blue-400' : 'text-gray-400'
          }`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {isLoading ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          )}
        </svg>
      </div>
      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-gray-900/90 rounded-lg shadow-xl backdrop-blur-sm border border-white/10">
          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block p-4 hover:bg-white/5 first:rounded-t-lg last:rounded-b-lg"
              onClick={() => {
                setQuery('')
                setResults([])
              }}
            >
              <h3 className="font-medium text-white">{post.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{post.description}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <span className="px-2 py-1 rounded-full bg-white/5">
                  {post.category}
                </span>
                <span>•</span>
                <time>{new Date(post.date).toLocaleDateString()}</time>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 