'use client'

import { useState, useEffect } from 'react'
import { slugify } from '@/lib/utils'

interface Heading {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3'))
    const headingElements = elements.map(element => {
      const text = element.textContent || ''
      const id = slugify(text)
      if (!element.id) {
        element.id = id
      }
      return {
        id,
        text,
        level: Number(element.tagName.charAt(1))
      }
    })
    setHeadings(headingElements)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -80% 0px' }
    )

    elements.forEach((elem) => observer.observe(elem))
    return () => observer.disconnect()
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const navHeight = 96
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      history.pushState(null, '', `#${id}`)
    }
  }

  if (headings.length === 0) return null

  return (
    <nav className="hidden lg:block fixed right-[max(2rem,calc((100vw-80rem)/2+2rem))] top-24 w-64">
      <div className="glass-effect p-6">
        <h2 className="text-lg font-semibold mb-4">目录</h2>
        <ul className="space-y-3 max-h-[calc(100vh-12rem)] overflow-y-auto">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`${
                heading.level === 3 ? 'ml-4' : ''
              }`}
            >
              <a
                href={`#${heading.id}`}
                className={`${
                  activeId === heading.id
                    ? 'text-blue-400'
                    : 'text-gray-400 hover:text-gray-300'
                } transition-colors block py-1 text-sm`}
                onClick={(e) => handleClick(e, heading.id)}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
} 