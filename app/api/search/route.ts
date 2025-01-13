import { getAllPosts } from '@/lib/posts'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''
  
  if (!query || query.length < 2) {
    return NextResponse.json([])
  }

  const posts = getAllPosts()
  
  const results = posts.filter(post => 
    post.title.toLowerCase().includes(query) ||
    post.description.toLowerCase().includes(query) ||
    post.category.toLowerCase().includes(query)
  )

  return NextResponse.json(results)
} 