import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GraduationCap } from 'lucide-react'
import { PERSONAL_INFO } from '../data/portfolioData'
import { StackSpread } from './ui/stack-spread'

gsap.registerPlugin(ScrollTrigger)

export const AboutStatement: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)
  const photoCardRef = useRef<HTMLDivElement>(null)
  const photoImgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Photo subtle reveal and continuous parallax drift
      if (photoCardRef.current && photoImgRef.current) {
        gsap.fromTo(
          photoCardRef.current,
          { opacity: 0.5, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: photoCardRef.current,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 1,
            },
          }
        )

        gsap.fromTo(
          photoImgRef.current,
          { scale: 1.08, yPercent: -4 },
          {
            scale: 1,
            yPercent: 4,
            scrollTrigger: {
              trigger: photoCardRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )
      }

      // Pillars progressive reveal
      if (pillarsRef.current) {
        const pillarItems = pillarsRef.current.querySelectorAll('.pillar-item')
        gsap.fromTo(
          pillarItems,
          { opacity: 0.2, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const pillars = [
    { title: 'BACKEND', desc: 'Spring Boot services, REST APIs, and reliable server-side logic.' },
    { title: 'DATABASES', desc: 'Relational schemas with PostgreSQL and MySQL, accessed through JPA and Hibernate.' },
    { title: 'FULL-STACK', desc: 'Connecting Java backends to React and JavaScript frontends.' },
    { title: 'PRODUCTS', desc: 'Building complete projects from idea to working implementation.' },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full border-t border-white/[0.08] scroll-mt-20"
    >
      {/* Editorial Chapter Header */}
      <div className="pt-8 md:pt-12 pb-2 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-xs text-[#9da0a8] uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <span className="text-[#e65c24]">01</span>
          <span>// PHILOSOPHY</span>
        </span>
        <span>ASANSOL ENGINEERING COLLEGE · CSE (AI & ML) · 2027</span>
      </div>

      {/* Kinetic Card Scatter & Central Manifesto Stage */}
      <div className="w-full overflow-visible">
        <StackSpread
          scrollLength={175}
          bgColor="transparent"
          textColor="#f4f3ef"
          cardRadius={8}
          stackScale={0.82}
          headline={
            <>
              <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#e65c24] mb-3">
                01 // PHILOSOPHY
              </div>
              <h2 className="w-full max-w-5xl font-display text-[3.8vw] font-black leading-[1.06] tracking-tight text-[#f4f3ef] max-md:text-[7.8vw]">
                I like turning <span className="text-[#e65c24]">ideas</span> into things people can{" "}
                <span className="text-[#e65c24]">actually use</span>.
              </h2>
              <p className="mt-3 font-mono text-xs sm:text-sm text-[#9da0a8] tracking-wider">
                Still learning. Still building. Always curious.
              </p>
            </>
          }
          subtitle="Building backends, APIs, and full-stack applications with Java."
        />
      </div>

      {/* Chapter Continuity: Pillars & Personal Storytelling */}
      <div className="pt-4 md:pt-6 pb-20 md:pb-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        {/* Four Core Pillars — Editorial Row */}
        <div
          ref={pillarsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 py-6 sm:py-8 md:py-10 my-4 border-y border-white/[0.08]"
        >
          {pillars.map((p) => (
            <div key={p.title} className="pillar-item space-y-2">
              <span className="font-display text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#f4f3ef] block tracking-tight break-words">
                {p.title}
                <span className="text-[#e65c24]">.</span>
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#9da0a8] leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Editorial 2-Column Storytelling */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-8">
        {/* Left Column: Authentic Landscape Visual & Personal Context */}
        <div className="lg:col-span-6 space-y-6">
          <div className="font-mono text-xs text-[#e65c24] tracking-widest uppercase">
            // PHILOSOPHY
          </div>

          {/* Wide Editorial Landscape Frame (FIG. 02) */}
          <div
            ref={photoCardRef}
            className="relative will-change-transform group select-none my-4"
          >
            {/* Fine architectural corner accents */}
            <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 border-t border-l border-[#e65c24]/70 z-20" />
            <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 border-t border-r border-[#e65c24]/70 z-20" />
            <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 border-b border-l border-[#e65c24]/70 z-20" />
            <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 border-b border-r border-[#e65c24]/70 z-20" />

            <div className="relative overflow-hidden border border-white/15 bg-[#141517] shadow-2xl transition-all duration-300 group-hover:border-white/25">
              {/* Header */}
              <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#0c0d0e]/95 border-b border-white/10 font-mono text-[10px] text-[#9da0a8]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e65c24]" />
                  <span className="text-[#f4f3ef] font-medium tracking-wider">FIG. 02</span>
                </span>
                <span className="tracking-widest">A LITTLE BIT OF ME</span>
              </div>

              {/* Wide Picture Frame with Parallax */}
              <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-[#141517]">
                <picture>
                  <source srcSet="/images/sujit-about-editorial.webp" type="image/webp" />
                  <img
                    ref={photoImgRef}
                    src="/images/sujit-about-editorial.jpg"
                    alt="Portrait of Sujit Gorai"
                    className="w-full h-full object-cover object-center will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>

                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0c0d0e]/80 via-[#0c0d0e]/20 to-transparent pointer-events-none" />
              </div>

              {/* Caption */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 bg-[#0c0d0e]/95 border-t border-white/10 font-mono text-[10px] text-[#9da0a8]">
                <span className="text-[#eceae5]">SUJIT GORAI</span>
                <span className="text-[#e65c24]">PORTRAIT</span>
              </div>
            </div>
          </div>

          <p className="story-reveal-item font-sans text-xl sm:text-2xl text-[#f4f3ef] font-normal leading-relaxed">
            I'm a Full Stack Java Developer who enjoys building real-world, problem-solving applications. I work mainly with Spring Boot and JavaScript, design REST APIs, and use relational databases to build reliable, scalable backend systems.
          </p>

          <p className="story-reveal-item font-sans text-sm sm:text-base text-[#9da0a8] leading-relaxed">
            Most of what you'll find here started as an idea, turned into a project, and became another opportunity to learn.
          </p>

          {/* Academic Milestone Line */}
          <div className="story-reveal-item pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-[#9da0a8]">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-4 h-4 text-[#e65c24]" />
              <span className="text-[#f4f3ef] font-semibold">{PERSONAL_INFO.degree}</span>
            </div>
            <div className="flex items-center gap-4 text-[#9da0a8]">
              <span>{PERSONAL_INFO.university}</span>
              <span className="text-[#e65c24] font-medium">CGPA: {PERSONAL_INFO.cgpa}</span>
            </div>
          </div>
        </div>

        {/* Right Column: How I Approach Projects */}
        <div className="lg:col-span-6 space-y-8 lg:pl-8 lg:border-l lg:border-white/[0.06]">
          <div className="font-mono text-xs text-[#e65c24] tracking-widest uppercase">
            // HOW I APPROACH PROJECTS
          </div>

          <div className="space-y-8">
            <div className="story-reveal-item">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-[#e65c24]">01</span>
                <h3 className="font-display text-lg font-bold text-[#f4f3ef]">
                  START WITH THE PROBLEM
                </h3>
              </div>
              <p className="mt-2 text-sm text-[#9da0a8] leading-relaxed pl-6">
                Understand what needs to be solved before worrying about the technology.
              </p>
            </div>

            <div className="story-reveal-item">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-[#e65c24]">02</span>
                <h3 className="font-display text-lg font-bold text-[#f4f3ef]">
                  BUILD &amp; EXPERIMENT
                </h3>
              </div>
              <p className="mt-2 text-sm text-[#9da0a8] leading-relaxed pl-6">
                Try things, learn from what doesn&apos;t work, and keep improving.
              </p>
            </div>

            <div className="story-reveal-item">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-[#e65c24]">03</span>
                <h3 className="font-display text-lg font-bold text-[#f4f3ef]">
                  MAKE IT USEFUL
                </h3>
              </div>
              <p className="mt-2 text-sm text-[#9da0a8] leading-relaxed pl-6">
                Focus on building something people can actually use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)
}
