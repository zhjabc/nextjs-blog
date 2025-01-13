import { getAllPosts, getAllCategories } from '@/lib/posts'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  
  const posts = getAllPosts()
  console.log('API posts:', posts)
  
  const categories = getAllCategories()
  
  const filteredPosts = category 
    ? posts.filter(post => post.category === category)
    : posts

  return NextResponse.json({
    posts: filteredPosts,
    categories
  })
} 