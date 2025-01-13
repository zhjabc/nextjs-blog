'use client'

import { useState, useEffect } from 'react'

export default function ReadingProgress() {
  const [completion, setCompletion] = useState(0)

  useEffect(() => {
    function updateScrollCompletion() {
      const currentProgress = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if(scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100)
      }
    }
    
    window.addEventListener('scroll', updateScrollCompletion)
    return () => window.removeEventListener('scroll', updateScrollCompletion)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/20 z-50">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-150"
        style={{ width: `${completion}%` }}
      />
    </div>
  )
} 