import React from 'react'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import type { Project } from '../../data/portfolioData'

export const ProjectChapter: React.FC<{ project: Project }> = ({ project }) => (
  <article className="py-20 border-b border-white/[0.08] relative">
    <div className="flex items-center justify-between font-mono text-xs text-[#9da0a8] mb-8 pb-4 border-b border-white/[0.06] uppercase tracking-widest">
      <span className="flex items-center gap-2">
        <span className="text-[#e65c24]">PROJECT {project.number}</span>
        <span>// {project.tag}</span>
      </span>
      <span className="text-[#e65c24] font-semibold">{project.year}</span>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-baseline">
      <div className="lg:col-span-8">
        <h3 className="font-display text-4xl sm:text-7xl md:text-8xl font-black tracking-tighter text-[#f4f3ef] uppercase break-words">
          {project.title}
        </h3>
        <p className="font-mono text-sm sm:text-base text-[#e65c24] mt-2 tracking-wider uppercase">
          {project.subtitle}
        </p>
      </div>
      <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end font-mono text-xs">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#f4f3ef] text-[#0c0d0e] px-4 py-2.5 font-medium hover:bg-[#e65c24] hover:text-white transition-colors"
            data-cursor="LIVE"
          >
            LIVE DEMO <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/20 text-[#f4f3ef] px-4 py-2.5 font-medium hover:border-[#e65c24] transition-colors"
            data-cursor="CODE"
          >
            SOURCE <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>

    <p className="font-sans text-lg sm:text-xl text-[#eceae5] font-light leading-snug max-w-3xl mb-12">
      {project.summary}
    </p>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-7">
        <div className="font-mono text-xs text-[#9da0a8] uppercase tracking-widest mb-4">
          <span className="text-[#e65c24]">//</span> HOW IT&apos;S BUILT
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {project.architectureNodes.map((node, i) => (
            <div
              key={node.label}
              className="p-4 rounded-xl border border-white/[0.08] bg-[#111215]/60 hover:border-[#e65c24]/40 transition-colors"
            >
              <div className="font-mono text-[10px] text-[#e65c24] tracking-widest mb-1">
                {String(i + 1).padStart(2, '0')} · {node.label}
              </div>
              <p className="font-sans text-sm text-[#9da0a8] leading-relaxed">{node.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="font-mono text-xs text-[#9da0a8] uppercase tracking-widest mb-4">
          <span className="text-[#e65c24]">//</span> HIGHLIGHTS
        </div>
        <ul className="space-y-3 mb-8">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 font-sans text-sm text-[#eceae5] leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-[#e65c24] shrink-0 mt-0.5" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] font-mono text-[11px] text-[#9da0a8]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  </article>
)
