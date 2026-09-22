import React, { useState } from 'react'
import { Code2, Cpu, Database, Sparkles, Terminal, Layers, Monitor } from 'lucide-react'
import { SKILL_CATEGORIES } from '../data/portfolioData'

export const SkillsMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  // Contextual project provenance mapping
  const skillProvenance: Record<string, { tier: string; project: string; note: string }> = {
    Java: { tier: 'FOCUS', project: 'SmartStock / CodeDrop', note: 'Backend services, object-oriented design, and layered application architecture.' },
    Python: { tier: 'USED FOR', project: 'Scripting & Practice', note: 'Scripting, automation, and problem solving.' },
    SQL: { tier: 'USED FOR', project: 'SmartStock', note: 'Queries, joins, aggregation, and relational schema design.' },
    HTML: { tier: 'USED FOR', project: 'SmartStock', note: 'Semantic markup for the SmartStock frontend.' },
    CSS: { tier: 'USED FOR', project: 'SmartStock', note: 'Responsive layouts and clean interface styling.' },
    JavaScript: { tier: 'USED FOR', project: 'SmartStock / CodeDrop', note: 'Frontend logic that talks to the Spring Boot REST APIs.' },
    React: { tier: 'USED FOR', project: 'CodeDrop', note: 'Frontend interface built with React and the Monaco editor.' },
    'Spring Boot': { tier: 'FOCUS', project: 'All Projects', note: 'Controllers, services, repositories, validation, and configuration.' },
    'REST APIs': { tier: 'FOCUS', project: 'All Projects', note: 'Designing and building RESTful endpoints with DTOs and clean error handling.' },
    'Spring Data JPA': { tier: 'USED FOR', project: 'SmartStock', note: 'Entities, repositories, and Hibernate-backed persistence.' },
    'Backend Development': { tier: 'FOCUS', project: 'All Projects', note: 'Building reliable, scalable server-side systems.' },
    MySQL: { tier: 'USED FOR', project: 'Coursework / Practice', note: 'Relational storage and query practice.' },
    PostgreSQL: { tier: 'USED FOR', project: 'SmartStock / CodeDrop', note: 'Primary database for inventory data and code snippets.' },
    Neon: { tier: 'USED FOR', project: 'SmartStock', note: 'Managed serverless PostgreSQL hosting.' },
    'Object-Oriented Programming': { tier: 'FOCUS', project: 'All Projects', note: 'Encapsulation, inheritance, polymorphism, and abstraction.' },
    'Data Structures & Algorithms': { tier: 'FOCUS', project: 'Coursework', note: 'Core data structures, sorting, searching, and algorithm design.' },
    'Database Management Systems': { tier: 'FOCUS', project: 'Coursework / Projects', note: 'Normalization, transactions, and indexing.' },
    Git: { tier: 'USED FOR', project: 'Everyday Workflow', note: 'Branching, committing, and version management.' },
    GitHub: { tier: 'USED FOR', project: '@sujitcodes01-dev', note: 'Hosting repositories and tracking project history.' },
    Postman: { tier: 'USED FOR', project: 'API Testing', note: 'Testing and documenting REST API requests.' },
    'IntelliJ IDEA': { tier: 'USED FOR', project: 'Java Development', note: 'Primary IDE for Spring Boot projects.' },
    DBeaver: { tier: 'USED FOR', project: 'Database Work', note: 'Inspecting and querying databases.' },
    Render: { tier: 'USED FOR', project: 'SmartStock / CodeDrop', note: 'Deploying backend applications to production.' },
    'Prompt Engineering': { tier: 'USED FOR', project: 'Daily Workflow', note: 'Writing clear prompts to get useful output from AI tools.' },
    ChatGPT: { tier: 'USED FOR', project: 'Daily Workflow', note: 'Brainstorming, explanations, and debugging help.' },
    Claude: { tier: 'USED FOR', project: 'Daily Workflow', note: 'Coding assistance, reviews, and documentation.' },
    Gemini: { tier: 'USED FOR', project: 'Daily Workflow', note: 'Research and quick answers.' },
  }

  const categoryIcons: Record<string, React.ReactNode> = {
    LANGUAGES: <Code2 className="w-4 h-4 text-[#e65c24]" />,
    BACKEND: <Layers className="w-4 h-4 text-[#e65c24]" />,
    FRONTEND: <Monitor className="w-4 h-4 text-[#e65c24]" />,
    DATABASES: <Database className="w-4 h-4 text-[#e65c24]" />,
    'CORE COMPUTER SCIENCE': <Cpu className="w-4 h-4 text-[#e65c24]" />,
    'TOOLS & DEPLOYMENT': <Terminal className="w-4 h-4 text-[#e65c24]" />,
    'AI & PROMPT ENGINEERING': <Sparkles className="w-4 h-4 text-[#e65c24]" />,
  }

  const displayedCategories =
    activeCategory === 'ALL'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.name === activeCategory)

  return (
    <section
      id="skills"
      className="py-24 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      {/* Chapter Marker & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#e65c24] uppercase tracking-widest mb-3">
            <span>02 // WHAT I WORK WITH</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f4f3ef]">
            Skills &amp; Technologies
          </h2>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveCategory('ALL')}
            className={`px-3.5 py-1.5 transition-all border rounded-full ${
              activeCategory === 'ALL'
                ? 'border-[#e65c24] text-[#e65c24] bg-[#e65c24]/10 shadow-[0_0_15px_rgba(230,92,36,0.2)]'
                : 'border-white/10 text-[#9da0a8] hover:text-[#f4f3ef] hover:border-white/25 bg-[#111215]/60'
            }`}
            data-cursor="FILTER"
          >
            ALL
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => setActiveCategory(cat.name)}
              className={`px-3.5 py-1.5 transition-all border rounded-full ${
                activeCategory === cat.name
                  ? 'border-[#e65c24] text-[#e65c24] bg-[#e65c24]/10 shadow-[0_0_15px_rgba(230,92,36,0.2)]'
                  : 'border-white/10 text-[#9da0a8] hover:text-[#f4f3ef] hover:border-white/25 bg-[#111215]/60'
              }`}
              data-cursor="FILTER"
            >
              {cat.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Elevated Capability Cards Grid */}
      <div className="grid grid-cols-1 gap-8 mb-16">
        {displayedCategories.map((category, idx) => (
          <div
            key={category.name}
            className="skill-category-block p-5 sm:p-8 md:p-10 rounded-2xl bg-[#111215]/70 border border-white/[0.08] hover:border-white/20 transition-all duration-300 relative overflow-hidden backdrop-blur-sm"
          >
            {/* Subtle category accent watermarking */}
            <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-5 pointer-events-none font-display font-black text-6xl sm:text-8xl text-white">
              0{idx + 1}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              {/* Category Info Header */}
              <div className="category-info-header lg:col-span-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#e65c24]/10 border border-[#e65c24]/30 flex items-center justify-center">
                    {categoryIcons[category.name] || <Sparkles className="w-4 h-4 text-[#e65c24]" />}
                  </div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#f4f3ef]">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <p className="font-sans text-xs text-[#9da0a8] leading-relaxed max-w-sm pt-2">
                  {category.tagline}
                </p>
              </div>

              {/* Enhanced Interactive Skill Chips Grid */}
              <div className="lg:col-span-8 flex flex-wrap gap-3 items-center">
                {category.skills.map((skill) => {
                  const meta = skillProvenance[skill]
                  const isHovered = hoveredSkill === skill
                  return (
                    <div
                      key={skill}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`skill-chip group relative p-3 sm:px-4 sm:py-3 rounded-xl border transition-all duration-200 cursor-default hover:scale-[1.02] ${
                        isHovered
                          ? 'border-[#e65c24] bg-[#18191c] shadow-[0_0_20px_rgba(230,92,36,0.15)] -translate-y-0.5'
                          : 'border-white/[0.08] bg-[#0c0d0e]/80 hover:border-white/25 hover:bg-[#141518]'
                      }`}
                      data-cursor="TECH"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm sm:text-base font-semibold text-[#f4f3ef] tracking-tight group-hover:text-[#e65c24] transition-colors">
                          {skill}
                        </span>
                        {meta && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-[#9da0a8] border border-white/[0.05]">
                            {meta.project.split(' ')[0]}
                          </span>
                        )}
                      </div>

                      {/* Micro tier tag on hover */}
                      {meta && isHovered && (
                        <div className="mt-1 text-[10px] font-mono text-[#e65c24] tracking-wider uppercase">
                          {meta.tier}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Contextual Usage Strip */}
      <div className="p-4 sm:p-5 rounded-xl border border-white/[0.08] bg-[#111215]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#e65c24] animate-ping" />
          <span className="text-[#5e6068] uppercase">// WHERE I USE IT:</span>
          <span className="text-[#f4f3ef] font-semibold">
            {hoveredSkill ? hoveredSkill : 'HOVER OVER ANY SKILL TO SEE DETAILS'}
          </span>
        </div>
        <div className="text-[#9da0a8]">
          {hoveredSkill && skillProvenance[hoveredSkill] ? (
            <span className="text-[#e65c24] font-medium">{skillProvenance[hoveredSkill].note}</span>
          ) : (
            <span>Technologies I&apos;ve used across my projects and coursework.</span>
          )}
        </div>
      </div>
    </section>
  )
}
