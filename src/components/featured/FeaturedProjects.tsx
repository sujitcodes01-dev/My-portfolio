import React from 'react'
import { FEATURED_PROJECTS } from '../../data/portfolioData'
import { ProjectChapter } from './ProjectChapter'

export const FeaturedProjects: React.FC = () => {
  return (
    <section
      id="featured-projects"
      className="py-24 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#e65c24] uppercase tracking-widest mb-3">
            <span>04 // SELECTED WORK</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#f4f3ef]">
            Featured Projects
          </h2>
        </div>
        <p className="font-mono text-xs text-[#9da0a8] max-w-md leading-relaxed">
          Two full-stack projects built with Java and Spring Boot: inventory management and code sharing.
        </p>
      </div>

      <div className="space-y-6">
        {FEATURED_PROJECTS.map((project) => (
          <div key={project.id} id={`project-${project.id}`} className="featured-project-card scroll-mt-24">
            <ProjectChapter project={project} />
          </div>
        ))}
      </div>
    </section>
  )
}
