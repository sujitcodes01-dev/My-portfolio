import React from 'react'
import { ArrowUp } from 'lucide-react'
import { PERSONAL_INFO } from '../data/portfolioData'

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-12 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08] text-xs font-mono text-[#9da0a8]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Identity & Positioning */}
        <div className="space-y-1">
          <div className="font-display font-bold text-sm text-[#f4f3ef] tracking-tight">
            SUJIT GORAI
          </div>
          <div className="text-[11px] text-[#5e6068]">
            AI / ML <span className="text-[#e65c24]">·</span> SOFTWARE <span className="text-[#e65c24]">·</span> DATA
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-6">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f4f3ef] transition-colors uppercase"
          >
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f4f3ef] transition-colors uppercase"
          >
            LinkedIn
          </a>
        </div>

        {/* Copyright & Scroll to Top */}
        <div className="flex items-center justify-between w-full md:w-auto gap-6">
          <span className="text-[11px] text-[#5e6068]">
            &copy; 2026 SUJIT GORAI
          </span>
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 border border-white/10 hover:border-[#e65c24] text-[#f4f3ef] hover:text-[#e65c24] transition-colors"
            title="Back to top"
            aria-label="Back to top"
            data-cursor="TOP"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
