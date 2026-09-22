import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, Code2, Terminal } from 'lucide-react'
import { PERSONAL_INFO } from '../data/portfolioData'
import { DancingLetters } from './ui/dancing-letters'

gsap.registerPlugin(ScrollTrigger)

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null)
  const nameWrapperRef = useRef<HTMLDivElement>(null)
  const firstNameRef = useRef<HTMLSpanElement>(null)
  const lastNameRef = useRef<HTMLSpanElement>(null)
  const photoWrapperRef = useRef<HTMLDivElement>(null)
  const photoImgRef = useRef<HTMLImageElement>(null)
  const statementRef = useRef<HTMLDivElement>(null)
  const metadataRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Controlled, elegant typographic & photographic composition timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      // Typography motion: subtle expansion and translation without clipping
      tl.to(
        firstNameRef.current,
        {
          xPercent: -3,
          scale: 0.97,
          ease: 'power1.out',
        },
        0
      )

      tl.to(
        lastNameRef.current,
        {
          xPercent: 5,
          yPercent: 16,
          scale: 0.97,
          ease: 'power1.out',
        },
        0
      )

      // Kinetic photograph transition:
      // Slowly scales, translates downward through the hero stage toward the About section,
      // while the inner image gently pans to focus on subject in the misty landscape
      tl.to(
        photoWrapperRef.current,
        {
          yPercent: 38,
          scale: 1.08,
          ease: 'power1.out',
        },
        0
      )

      tl.to(
        photoImgRef.current,
        {
          scale: 1.1,
          yPercent: 5,
          ease: 'none',
        },
        0
      )

      tl.to(
        nameWrapperRef.current,
        {
          opacity: 0.35,
          scale: 0.95,
          ease: 'none',
        },
        0.3
      )

      tl.to(
        statementRef.current,
        {
          y: -40,
          opacity: 0.25,
          ease: 'none',
        },
        0
      )

      tl.to(
        metadataRef.current,
        {
          y: -30,
          opacity: 0.2,
          ease: 'none',
        },
        0
      )

      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          ease: 'none',
        },
        0
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100vh] flex flex-col justify-between pt-24 md:pt-28 pb-12 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto select-none overflow-x-clip"
    >
      {/* Background Architectural Grid Lines (Restrained Texture) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex justify-between">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden sm:block" />
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden lg:block" />
      </div>

      {/* Top Editorial Telemetry Bar */}
      <div
        ref={metadataRef}
        className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pt-4 border-t border-white/[0.08] text-xs font-mono text-[#9da0a8]"
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-[#e65c24]" />
          <span className="text-[#f4f3ef] font-medium tracking-wider">PORTFOLIO / 2026</span>
          <span className="text-[#5e6068]">·</span>
          <span className="text-[#9da0a8]">B.TECH CSE ({PERSONAL_INFO.graduationYear})</span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="hidden sm:inline text-[#5e6068]">
            {PERSONAL_INFO.university.toUpperCase()}
          </span>
          <span className="text-[#e65c24] font-medium">CGPA: {PERSONAL_INFO.cgpa}</span>
        </div>
      </div>

      {/* Main Controlled Typographic Stage with Integrated Portrait Frame */}
      <div className="my-auto py-8 md:py-12 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center overflow-visible">
          {/* Left Column: Interactive Typographic Name & Core Identity */}
          <div ref={nameWrapperRef} className="lg:col-span-7 xl:col-span-8 flex flex-col overflow-visible">
            <div className="overflow-visible flex flex-wrap items-baseline gap-x-4 md:gap-x-8 gap-y-2">
              <h1
                className="font-display font-extrabold tracking-tight leading-[0.95] text-[#f4f3ef] uppercase overflow-visible flex flex-wrap items-baseline gap-x-4 md:gap-x-8 gap-y-2"
                data-cursor="DANCE"
              >
                <span
                  ref={firstNameRef}
                  className="inline-flex items-baseline pr-1 sm:pr-2 will-change-transform overflow-visible"
                >
                  <DancingLetters
                    text={PERSONAL_INFO.firstName}
                    className="inline-flex items-baseline justify-start overflow-visible"
                    letterClassName="font-display font-extrabold text-[clamp(1.75rem,7.5vw,3.25rem)] sm:text-[clamp(2.4rem,6.0vw,4.85rem)] md:text-[clamp(2.8rem,6.4vw,5.25rem)] lg:text-[clamp(3.2rem,6.6vw,5.75rem)] text-[#f4f3ef] tracking-tight leading-none overflow-visible hover:text-[#e65c24] transition-colors duration-200"
                    autoPlay={true}
                    autoPlayInterval={3200}
                    initialWaveDelay={450}
                  />
                </span>
                <span
                  ref={lastNameRef}
                  className="inline-flex items-baseline pl-1 sm:pl-2 will-change-transform overflow-visible text-[#f4f3ef]"
                >
                  <DancingLetters
                    text={PERSONAL_INFO.lastName}
                    className="inline-flex items-baseline justify-start overflow-visible"
                    letterClassName="font-display font-extrabold text-[clamp(1.75rem,7.5vw,3.25rem)] sm:text-[clamp(2.4rem,6.0vw,4.85rem)] md:text-[clamp(2.8rem,6.4vw,5.25rem)] lg:text-[clamp(3.2rem,6.6vw,5.75rem)] text-[#f4f3ef] tracking-tight leading-none overflow-visible hover:text-[#e65c24] transition-colors duration-200"
                    autoPlay={true}
                    autoPlayInterval={3600}
                    initialWaveDelay={950}
                  />
                  <span className="text-[#e65c24] ml-1 select-none font-display font-extrabold text-[clamp(1.75rem,7.5vw,3.25rem)] sm:text-[clamp(2.4rem,6.0vw,4.85rem)] md:text-[clamp(2.8rem,6.4vw,5.25rem)] lg:text-[clamp(3.2rem,6.6vw,5.75rem)] leading-none">
                    .
                  </span>
                </span>
              </h1>
            </div>

            {/* Welcoming Introduction */}
            <div className="mt-6 max-w-lg font-mono text-xs text-[#9da0a8] leading-relaxed space-y-2">
              <p className="font-sans text-base sm:text-lg text-[#f4f3ef] font-normal">
                Hey, glad you're here. Take a look around.
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#5e6068] pt-1 uppercase tracking-wider">
                <span>SCROLL TO EXPLORE · THERE'S MORE TO SEE</span>
                <span className="hidden sm:inline">·</span>
                <span className="text-[#9da0a8]">DHANBAD, INDIA</span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Personal Portrait in Foggy Landscape */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-start lg:justify-end overflow-visible">
            <div
              ref={photoWrapperRef}
              className="relative will-change-transform group select-none w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] mx-auto lg:mx-0"
            >
              {/* Architectural Corner Accents */}
              <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 border-t border-l border-[#e65c24]/70 z-20" />
              <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 border-t border-r border-[#e65c24]/70 z-20" />
              <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 border-b border-l border-[#e65c24]/70 z-20" />
              <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 border-b border-r border-[#e65c24]/70 z-20" />

              {/* Photo Frame Container */}
              <div className="relative overflow-hidden border border-white/15 bg-[#141517] shadow-2xl transition-all duration-300 group-hover:border-white/25">
                {/* Telemetry Bar */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#0c0d0e]/95 border-b border-white/10 font-mono text-[10px] text-[#9da0a8]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e65c24]" />
                    <span className="text-[#f4f3ef] font-medium tracking-wider">FIG. 01</span>
                  </span>
                  <span className="tracking-widest">A GLIMPSE</span>
                </div>

                {/* Portrait Crop (4:5) */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#141517]">
                  <picture>
                    <source srcSet="/images/sujit-hero-portrait.webp" type="image/webp" />
                    <img
                      ref={photoImgRef}
                      src="/images/sujit-hero-portrait.jpg"
                      alt="Portrait of Sujit Gorai"
                      className="w-full h-full object-cover object-center will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      loading="eager"
                      decoding="async"
                    />
                  </picture>

                  {/* Atmospheric Bottom Fog Gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0c0d0e]/75 via-[#0c0d0e]/25 to-transparent pointer-events-none" />
                </div>

                {/* Sub-frame Caption */}
                <div className="flex items-center justify-between px-3 py-2 bg-[#0c0d0e]/95 border-t border-white/10 font-mono text-[10px] text-[#9da0a8]">
                  <span className="text-[#f4f3ef] font-medium">SUJIT GORAI</span>
                  <span className="text-[#e65c24]">DHANBAD, INDIA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Narrative Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/[0.08] items-end">
        {/* Core Narrative */}
        <div ref={statementRef} className="md:col-span-2 space-y-4">
          <p className="font-sans text-lg sm:text-xl md:text-2xl text-[#eceae5] font-light leading-snug max-w-2xl">
            I like turning ideas into things people can actually use. Still learning, still building, and{' '}
            <span className="text-[#f4f3ef] font-normal border-b border-[#e65c24]/50 pb-0.5">
              always curious
            </span>{' '}
            about backend systems and the APIs behind real applications.
          </p>

          <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs">
            <a
              href="#featured-projects"
              className="group inline-flex items-center justify-center gap-2 bg-[#f4f3ef] text-[#0c0d0e] px-5 py-2.5 font-medium transition-all duration-200 hover:bg-[#e65c24] hover:text-white w-full min-[400px]:w-auto"
              data-cursor="WORK"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>EXPLORE WORK</span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-[#f4f3ef] px-5 py-2.5 font-medium transition-all duration-200 hover:border-[#e65c24] hover:text-[#e65c24] w-full min-[400px]:w-auto"
              data-cursor="PHILOSOPHY"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>PHILOSOPHY</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="flex justify-start md:justify-end items-center">
          <button
            type="button"
            onClick={handleScrollDown}
            className="group flex items-center gap-3 text-xs font-mono text-[#9da0a8] hover:text-[#f4f3ef] transition-colors cursor-pointer"
            aria-label="Scroll to explore"
            data-cursor="DOWN"
          >
            <span className="tracking-widest uppercase text-[11px]">SCROLL TO EXPLORE</span>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#e65c24] group-hover:text-[#e65c24] transition-all">
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
