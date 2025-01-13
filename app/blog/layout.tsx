import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '博客文章 | ZHJ的个人博客',
  description: '分享Web开发、软件架构和技术创新的见解与经验',
  openGraph: {
    title: '博客文章 | ZHJ的个人博客',
    description: '分享Web开发、软件架构和技术创新的见解与经验',
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 