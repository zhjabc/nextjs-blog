import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostMetadata {
  title: string
  date: string
  category: string
  description: string
  slug: string
}

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  console.log('Found files:', fileNames)

  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      
      console.log('Processing file:', fileName)
      
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug,
        ...(data as Omit<PostMetadata, 'slug'>),
      }
    })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1
    return -1
  })
}

export function getAllCategories() {
  const posts = getAllPosts()
  const categories = new Set(posts.map(post => post.category))
  return Array.from(categories)
}

export function getPostsByCategory(category: string | null) {
  const posts = getAllPosts()
  if (!category) return posts
  return posts.filter(post => post.category === category)
}

export function getPostStats(content: string) {
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // 假设阅读速度为每分钟200字
  
  return {
    wordCount,
    readingTime
  };
}

export function getPostBySlug(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'posts', `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    
    return {
      data: {
        ...data,
        slug,
      },
      content,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
} 