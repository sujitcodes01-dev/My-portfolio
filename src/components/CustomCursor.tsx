import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const [cursorText, setCursorText] = useState<string>('')
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return
    // Disable if reduced motion preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot = cursorDotRef.current
    const ring = cursorRingRef.current
    if (!dot || !ring) return

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const mouse = { x: pos.x, y: pos.y }

    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' })
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' })
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.25, ease: 'power3.out' })
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.25, ease: 'power3.out' })

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)
      mouse.x = e.clientX
      mouse.y = e.clientY

      setDotX(mouse.x)
      setDotY(mouse.y)
      setRingX(mouse.x)
      setRingY(mouse.y)

      // Context detection
      const target = e.target as HTMLElement | null
      if (!target) return

      const interactiveEl = target.closest('a, button, [data-cursor]') as HTMLElement | null

      if (interactiveEl) {
        setIsHovered(true)
        const customText = interactiveEl.getAttribute('data-cursor') || ''
        setCursorText(customText)
      } else {
        setIsHovered(false)
        setCursorText('')
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isVisible])

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Central precise dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#e65c24] pointer-events-none transition-transform duration-150 ${
          isHovered ? 'scale-0' : 'scale-100'
        }`}
      />

      {/* Trailing context ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 pointer-events-none flex items-center justify-center rounded-full border border-[#e65c24]/50 transition-all duration-300 ${
          isHovered
            ? cursorText
              ? '-ml-8 -mt-8 w-16 h-16 bg-[#e65c24] text-white border-transparent'
              : '-ml-5 -mt-5 w-10 h-10 bg-[#e65c24]/15 border-[#e65c24]'
            : '-ml-4 -mt-4 w-8 h-8 border-[#f4f3ef]/20'
        }`}
      >
        {cursorText && (
          <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-white select-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  )
}
