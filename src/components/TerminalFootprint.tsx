import React, { useState } from 'react'
import { ArrowUpRight, GitBranch, Cpu, Code } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { PERSONAL_INFO } from '../data/portfolioData'

export const TerminalFootprint: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'github' | 'focus' | 'tools'>('github')

  const gitRepositories = [
    { name: 'SmartStock', lang: 'Spring Boot / PostgreSQL', branch: 'main', tag: 'Inventory System' },
    { name: 'CodeDrop', lang: 'Spring Boot / React', branch: 'main', tag: 'Snippet Sharing' },
  ]

  return (
    <section
      id="footprint"
      className="py-24 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      {/* Chapter Marker */}
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#9da0a8] mb-12 uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <span className="text-[#e65c24]">07</span>
          <span>// FIND ME ONLINE</span>
        </span>
        <span>GITHUB · LINKEDIN</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#f4f3ef] break-words">
            FIND MY WORK &amp; PROFILES<span className="text-[#e65c24]">.</span>
          </h2>
          <p className="font-sans text-base text-[#9da0a8] leading-relaxed max-w-lg">
            Writing code, building projects, and shipping them. Here&apos;s where to find my repositories and online activity.
          </p>
        </div>

        {/* Action Direct Links */}
        <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111215] border border-white/10 hover:border-[#e65c24] text-[#f4f3ef] font-mono text-xs transition-all shadow-lg"
            data-cursor="GITHUB"
          >
            <GithubIcon className="w-4 h-4 text-[#e65c24]" />
            <span>GITHUB</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#5e6068]" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111215] border border-white/10 hover:border-[#e65c24] text-[#f4f3ef] font-mono text-xs transition-all shadow-lg"
            data-cursor="LINKEDIN"
          >
            <LinkedinIcon className="w-4 h-4 text-[#e65c24]" />
            <span>LINKEDIN</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#5e6068]" />
          </a>
        </div>
      </div>

      {/* Developer Terminal Window with Interactive Tabs */}
      <div className="rounded-2xl bg-[#0c0d0e] border border-white/[0.08] font-mono text-xs overflow-hidden shadow-2xl">
        {/* Terminal Header & Tabs */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 bg-[#111215] border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-[#5e6068] text-[11px]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-2 font-mono text-xs text-[#9da0a8]">CODE &amp; PROFILES</span>
          </div>

          {/* Tab Switcher */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'github', label: 'MY WORK', icon: <GitBranch className="w-3 h-3" /> },
              { id: 'focus', label: 'MY FOCUS', icon: <Code className="w-3 h-3" /> },
              { id: 'tools', label: 'MY TOOLS', icon: <Cpu className="w-3 h-3" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as 'github' | 'focus' | 'tools')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#e65c24] text-white font-semibold'
                    : 'bg-[#18191c] text-[#9da0a8] hover:text-[#f4f3ef]'
                }`}
                data-cursor="TAB"
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 md:p-8">
          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="text-[#9da0a8] flex items-center gap-2 font-mono text-xs">
                <span className="text-[#e65c24]">//</span>
                <span>FEATURED REPOSITORIES</span>
              </div>

              <div className="border border-white/[0.06] rounded-xl overflow-hidden divide-y divide-white/[0.04]">
                {gitRepositories.map((repo) => (
                  <div
                    key={repo.name}
                    className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#141518] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[#e65c24]">›</span>
                      <span className="text-[#f4f3ef] font-medium break-all sm:break-normal">{repo.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-[#9da0a8]">
                      <span>{repo.lang}</span>
                      <span className="text-[#5e6068]">·</span>
                      <span className="text-[#e65c24]">{repo.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'focus' && (
            <div className="space-y-6">
              <div className="text-[#9da0a8] flex items-center gap-2 font-mono text-xs">
                <span className="text-[#e65c24]">//</span>
                <span>BACKEND FOCUS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#111215] border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-[#5e6068] block mb-1">BACKEND</span>
                  <div className="text-xl font-display font-bold text-[#f4f3ef]">Spring Boot</div>
                  <p className="font-sans text-xs text-[#9da0a8] mt-1">REST APIs, JPA / Hibernate, and layered architecture.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#111215] border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-[#5e6068] block mb-1">LANGUAGES I USE</span>
                  <div className="text-xl font-display font-bold text-[#e65c24]">Java &amp; JavaScript</div>
                  <p className="font-sans text-xs text-[#9da0a8] mt-1">Java for backend services and JavaScript for the frontend.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#111215] border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-[#5e6068] block mb-1">DEPLOYMENT</span>
                  <div className="text-xl font-display font-bold text-emerald-400">Render &amp; Neon</div>
                  <p className="font-sans text-xs text-[#9da0a8] mt-1">Shipping apps to production with managed PostgreSQL.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="text-[#9da0a8] flex items-center gap-2 font-mono text-xs">
                <span className="text-[#e65c24]">//</span>
                <span>CORE TOOLS &amp; TECHNOLOGIES</span>
              </div>

              <div className="p-5 rounded-xl bg-[#111215] border border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#9da0a8]">
                <div><span className="text-[#f4f3ef]">Languages:</span> Java, Python, SQL, HTML, CSS, JavaScript</div>
                <div><span className="text-[#f4f3ef]">Frameworks:</span> Spring Boot, Spring Data JPA, ModelMapper</div>
                <div><span className="text-[#f4f3ef]">AI Tools:</span> ChatGPT, Claude, Gemini</div>
                <div><span className="text-[#f4f3ef]">Databases:</span> MySQL, PostgreSQL, Neon</div>
                <div><span className="text-[#f4f3ef]">Tools:</span> Git, GitHub, IntelliJ IDEA, Postman</div>
                <div><span className="text-[#f4f3ef]">Deployment:</span> Render</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
