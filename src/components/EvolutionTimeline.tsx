import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, CheckCircle2, Milestone, Layers, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export const EvolutionTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const [activeStage, setActiveStage] = useState(0)

  const progressionSteps = [
    {
      year: '2023',
      domain: 'STARTING OUT',
      title: 'Starting Out',
      badge: '2023 // GETTING STARTED',
      metrics: ['B.Tech CSE (AI & ML)', 'Core CS Fundamentals', 'National Hackathon'],
      description: 'Began my B.Tech in Computer Science & Engineering and started competing in hackathons.',
      milestones: [
        {
          name: 'B.Tech at Asansol Engineering College',
          period: '2023',
          tech: 'CSE · AI & ML',
          summary: 'Started Computer Science & Engineering with a specialization in AI & ML.',
          highlight: 'Core foundation in OOP, data structures, and databases.',
        },
        {
          name: 'Smart India Hackathon 2024',
          period: '2024',
          tech: 'Team Hackathon',
          summary: 'Competed in the national-level hackathon organized by the Government of India.',
          highlight: 'Finished in 4th place nationally.',
        },
      ],
      vector: 'FOUNDATIONS',
    },
    {
      year: '2025',
      domain: 'LEARNING JAVA BACKEND',
      title: 'Learning Java Backend',
      badge: '2025 // SPRING BOOT',
      metrics: ['Spring Boot', 'REST APIs', 'Full-Stack E-Commerce'],
      description: 'Going deep on Java and Spring Boot by building a full-stack e-commerce application.',
      milestones: [
        {
          name: 'Full Stack E-Commerce App with Spring Boot',
          period: 'May 2025',
          tech: 'Java · Spring Boot · Udemy',
          summary: 'Completed a Udemy course on building a full-stack e-commerce application with Spring Boot.',
          highlight: 'First end-to-end Java backend project.',
        },
      ],
      vector: 'BACKEND',
    },
    {
      year: '2026',
      domain: 'BUILDING FULL-STACK SYSTEMS',
      title: 'Building Full-Stack Systems',
      badge: '2026 // SHIPPING PROJECTS',
      metrics: ['2 Full-Stack Projects', 'PostgreSQL & Neon', 'Deployed on Render'],
      description: 'Designing REST APIs, working with relational databases, and shipping complete applications.',
      milestones: [
        {
          name: 'Progressive JavaScript Learning Path',
          period: 'May 2026',
          tech: 'JavaScript · Cursa',
          summary: 'Completed a learning path covering JavaScript from fundamentals to advanced topics.',
          highlight: 'Stronger frontend skills to pair with Java backends.',
        },
        {
          name: 'CodeDrop',
          period: '2026',
          tech: 'Spring Boot · React · PostgreSQL',
          summary: 'Immutable code snippets shared through unique access codes that expire automatically.',
          highlight: 'Deployed on Render and Vercel with a multi-stage Docker build.',
        },
        {
          name: 'SmartStock',
          period: '2026',
          tech: 'Spring Boot · JPA · PostgreSQL · Neon',
          summary: 'Inventory and warehouse management with stock-in and stock-out operations and a simple web frontend.',
          highlight: 'REST APIs with entity-to-DTO mapping, deployed on Render.',
        },
      ],
      vector: 'FULL-STACK',
    },
  ]

  const trajectoryPillars = [
    'FOUNDATIONS',
    'BACKEND',
    'DATABASES',
    'FULL-STACK',
    'DEPLOYMENT',
  ]

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 20%',
        end: 'bottom 80%',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          if (p < 0.35) {
            setActiveStage(0)
          } else if (p < 0.7) {
            setActiveStage(1)
          } else {
            setActiveStage(2)
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="py-24 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      {/* Chapter Marker & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#e65c24] uppercase tracking-widest mb-3">
            <span>03 // HOW I GOT HERE</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f4f3ef]">
            Evolution of Projects
          </h2>
        </div>
        <p className="font-mono text-xs text-[#9da0a8] max-w-md leading-relaxed">
          How my work has evolved over time — starting from core software foundations, then moving into Java backend development and full-stack systems.
        </p>
      </div>

      {/* Trajectory Continuum Flow Bar with Illuminated Glow */}
      <div className="mb-14 p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-[#111215]/80 backdrop-blur-sm flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#5e6068] uppercase">
          <Layers className="w-3.5 h-3.5 text-[#e65c24]" />
          <span>A FEW STEPS ALONG THE WAY</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
          {trajectoryPillars.map((pillar, idx) => {
            const isHighlighted =
              (activeStage === 0 && (pillar === 'FOUNDATIONS' || pillar === 'BACKEND')) ||
              (activeStage === 1 && (pillar === 'BACKEND' || pillar === 'DATABASES')) ||
              (activeStage === 2 && (pillar === 'FULL-STACK' || pillar === 'DEPLOYMENT'))

            return (
              <div key={pillar} className="inline-flex items-center gap-1.5 sm:gap-3">
                <span
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] transition-all duration-300 font-medium ${
                    isHighlighted
                      ? 'bg-[#e65c24]/15 text-[#e65c24] border border-[#e65c24]/40 shadow-[0_0_12px_rgba(230,92,36,0.2)]'
                      : 'text-[#5e6068] border border-transparent'
                  }`}
                >
                  {pillar}
                </span>
                {idx < trajectoryPillars.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-[#383b44]" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Interactive Stage with Illuminated Laser Spine */}
      <div ref={pinContainerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Illuminated Vertical Stage Selector with Laser Trace */}
        <div className="lg:col-span-4 relative">
          {/* Vertical Glowing Laser Guide */}
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#e65c24]/40 via-white/10 to-[#e65c24]/40 hidden sm:block" />

          <div className="flex flex-col gap-4 relative z-10">
            {progressionSteps.map((step, idx) => {
              const isActive = activeStage === idx

              return (
                <button
                  key={step.year + step.domain}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`text-left p-4 sm:p-6 rounded-2xl transition-all duration-300 border relative overflow-hidden ${
                    isActive
                      ? 'border-[#e65c24] bg-[#16171b] shadow-[0_0_30px_rgba(230,92,36,0.15)] text-[#f4f3ef]'
                      : 'border-white/[0.08] bg-[#0f1013]/60 hover:border-white/20 text-[#9da0a8]'
                  }`}
                  data-cursor="SELECT"
                >
                  <div className="flex items-center justify-between font-mono text-xs mb-2">
                    <span className="flex items-center gap-2">
                      <span className={`rounded-full transition-all duration-300 ${isActive ? 'w-2.5 h-2.5 bg-[#e65c24] animate-pulse ring-4 ring-[#e65c24]/25 shadow-[0_0_10px_rgba(230,92,36,0.8)]' : 'w-2 h-2 bg-[#5e6068]'}`} />
                      <span className={isActive ? 'text-[#e65c24] font-bold' : 'text-[#5e6068]'}>
                        {step.year}
                      </span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] text-[#9da0a8]">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold tracking-tight mb-2">
                    {step.domain}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {step.metrics.map((m) => (
                      <span key={m} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-[#7a7d86]">
                        {m}
                      </span>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Column: Selected Phase Deep Showcase */}
        <div className="lg:col-span-8 space-y-8 pl-0 lg:pl-4">
          <div className="p-5 sm:p-6 md:p-8 rounded-2xl bg-[#111215]/80 border border-white/[0.08] relative overflow-hidden backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#e65c24] tracking-wider uppercase font-semibold">
                {progressionSteps[activeStage].badge}
              </span>
              <span className="text-[#5e6068]">
                {progressionSteps[activeStage].year}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#f4f3ef] tracking-tight">
              {progressionSteps[activeStage].title}
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#9da0a8] leading-relaxed max-w-2xl">
              {progressionSteps[activeStage].description}
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              {progressionSteps[activeStage].metrics.map((metric) => (
                <div key={metric} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18191c] border border-white/10 text-xs font-mono text-[#f4f3ef]">
                  <CheckCircle2 className="w-3 h-3 text-[#e65c24]" />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestone Projects Grid for This Phase */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#5e6068] uppercase tracking-wider">
              <Milestone className="w-3.5 h-3.5 text-[#e65c24]" />
              <span>A FEW PROJECTS THAT MARKED THE JOURNEY</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {progressionSteps[activeStage].milestones.map((m) => (
                <div
                  key={m.name}
                  className="p-6 rounded-2xl border border-white/[0.08] bg-[#111215]/60 hover:border-[#e65c24]/40 hover:bg-[#15161a] transition-all duration-200 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-[#e65c24] font-semibold">{m.period}</span>
                      <span className="text-[#5e6068]">{m.tech}</span>
                    </div>
                    <h4 className="font-display text-lg sm:text-xl font-bold text-[#f4f3ef] group-hover:text-[#e65c24] transition-colors">
                      {m.name}
                    </h4>
                    <p className="font-sans text-xs text-[#9da0a8] leading-relaxed">
                      {m.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] font-mono text-[#e65c24]">
                    <Sparkles className="w-3 h-3 shrink-0" />
                    <span className="truncate">{m.highlight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
