'use client'

import { useTheme } from '../contexts/ThemeContext'
import Navbar from './Navbar'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <div className="relative min-h-screen">
      {/* 背景网格 */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(to right, ${theme === 'dark' ? 'rgb(255 255 255 / 0.05)' : 'rgb(0 0 0 / 0.05)'} 1px, transparent 1px), 
            linear-gradient(to bottom, ${theme === 'dark' ? 'rgb(255 255 255 / 0.05)' : 'rgb(0 0 0 / 0.05)'} 1px, transparent 1px)` 
        }} 
      />

      {/* 导航栏 */}
      <Navbar />

      {/* 主要内容 */}
      <main className="relative pt-24">
        {children}
      </main>
    </div>
  )
} 