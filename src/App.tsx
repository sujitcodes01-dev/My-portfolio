import { useState, useEffect } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { IntroLoader } from './components/IntroLoader'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { AboutStatement } from './components/AboutStatement'
import { SkillsMatrix } from './components/SkillsMatrix'
import { EvolutionTimeline } from './components/EvolutionTimeline'
import { FeaturedProjects } from './components/featured/FeaturedProjects'
import { EducationCertifications } from './components/EducationCertifications'
import { TerminalFootprint } from './components/TerminalFootprint'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'

export function App() {
  const [isIntroOpen, setIsIntroOpen] = useState(true)

  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useSmoothScroll()

  // Detect upward scroll when at the top of the main page to bring back the first page
  useEffect(() => {
    if (isIntroOpen) return

    let lastTriggerTime = 0
    let accumulatedUpDelta = 0
    let resetTimer: ReturnType<typeof setTimeout>

    const handleWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY || (window as unknown as { __lenis?: { scroll: number } }).__lenis?.scroll || 0
      if (scrollY <= 6 && e.deltaY < 0) {
        if (Date.now() - lastTriggerTime < 1000) return
        accumulatedUpDelta += Math.abs(e.deltaY)
        clearTimeout(resetTimer)
        resetTimer = setTimeout(() => {
          accumulatedUpDelta = 0
        }, 350)

        // Deliberate upward scroll gesture triggers intro cover slide-down
        if (accumulatedUpDelta > 30 || e.deltaY < -30) {
          e.preventDefault()
          accumulatedUpDelta = 0
          lastTriggerTime = Date.now()
          setIsIntroOpen(true)
        }
      } else {
        accumulatedUpDelta = 0
      }
    }

    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const scrollY = window.scrollY || 0
      if (scrollY <= 4) {
        const diff = e.touches[0].clientY - touchStartY
        if (diff > 40) {
          e.preventDefault()
          setIsIntroOpen(true)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      clearTimeout(resetTimer)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isIntroOpen])

  return (
    <div className="relative min-h-screen bg-[#0c0d0e] text-[#f4f3ef] selection:bg-[#e65c24] selection:text-white">
      {/* Subtle Analog Film Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Persistent Recallable 3D Intro Cover */}
      <IntroLoader isOpen={isIntroOpen} onClose={() => setIsIntroOpen(false)} />

      {/* Navigation Header */}
      <Navbar onOpenIntro={() => setIsIntroOpen(true)} />

      {/* Continuous Immersive Storyline */}
      <main>
        {/* 01 // Hero Stage */}
        <Hero />

        {/* 02 // Editorial Philosophy & Academic Grounding */}
        <AboutStatement />

        {/* 03 // Typographic Capability Matrix */}
        <SkillsMatrix />

        {/* 04 // Project Evolution Trajectory */}
        <EvolutionTimeline />

        {/* 05 // Selected Systems Exhibition (SmartStock, CodeDrop) */}
        <FeaturedProjects />

        {/* 06 // Secondary Verified Projects Archive */}

        {/* 07 // University Education & Verified Certifications */}
        <EducationCertifications />

        {/* 08 // Live Coding Footprint, GitHub & Profiles Console */}
        <TerminalFootprint />

        {/* 09 // Conclusion & Direct Contact */}
        <ContactSection />
      </main>

      {/* 10 // Refined Editorial Footer */}
      <Footer />
    </div>
  )
}

export default App
