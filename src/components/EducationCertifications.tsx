import React from 'react'
import { CheckCircle, Award, GraduationCap, BookOpen } from 'lucide-react'
import { CERTIFICATIONS, PERSONAL_INFO } from '../data/portfolioData'

export const EducationCertifications: React.FC = () => {
  return (
    <section
      id="education"
      className="py-24 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      {/* Chapter Marker */}
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#9da0a8] mb-16 uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <span className="text-[#e65c24]">06</span>
          <span>// EDUCATION &amp; CERTIFICATIONS</span>
        </span>
        <span>WHERE I&apos;M LEARNING</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Undergraduate Degree Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 sm:p-8 rounded-2xl bg-[#111215]/80 border border-white/[0.08] relative overflow-hidden backdrop-blur-sm space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#e65c24]/10 border border-[#e65c24]/30 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#e65c24]" />
              </div>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold uppercase">
                UNDERGRADUATE
              </span>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[11px] text-[#e65c24] tracking-wider uppercase block">
                UNIVERSITY
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-[#f4f3ef] break-words">
                {PERSONAL_INFO.university}
              </h3>
              <p className="font-mono text-xs text-[#9da0a8]">
                {PERSONAL_INFO.location}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#18191c] border border-white/[0.06] space-y-2">
              <div className="text-[10px] font-mono text-[#5e6068] uppercase">DEGREE</div>
              <div className="font-display text-base font-bold text-[#f4f3ef]">
                {PERSONAL_INFO.degree}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#18191c] border border-white/[0.06]">
                <span className="text-[#5e6068] block text-[10px] font-mono uppercase mb-1">CGPA</span>
                <span className="text-2xl sm:text-3xl font-display font-black text-[#e65c24]">
                  8.3
                </span>
                <span className="text-[10px] font-mono text-[#5e6068] block mt-0.5">/ 10</span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-[#18191c] border border-white/[0.06]">
                <span className="text-[#5e6068] block text-[9px] sm:text-[10px] font-mono uppercase mb-1 leading-tight">GRADUATION</span>
                <span className="text-2xl sm:text-3xl font-display font-black text-[#f4f3ef]">
                  {PERSONAL_INFO.graduationYear}
                </span>
                <span className="text-[10px] font-mono text-[#5e6068] block mt-0.5">B.Tech CSE</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/[0.06]">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#5e6068]">
                <BookOpen className="w-3.5 h-3.5 text-[#e65c24]" />
                <span>RELEVANT COURSEWORK</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Data Structures & Algorithms', 'DBMS', 'OOP', 'Backend Development', 'REST APIs'].map((m) => (
                  <span key={m} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-[#9da0a8] border border-white/[0.05]">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Verified Certifications */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#e65c24] uppercase tracking-widest block">
                // ACHIEVEMENTS &amp; COURSES
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f4f3ef]">
                Achievements &amp; Certifications
              </h3>
            </div>
            <Award className="w-6 h-6 text-[#e65c24]" />
          </div>

          <div className="grid grid-cols-1 gap-3">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.title}
                className="cert-row-item p-4 sm:p-5 rounded-xl border border-white/[0.08] bg-[#111215]/60 hover:border-[#e65c24]/40 hover:bg-[#141519] transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1">
                  <h4 className="font-display text-base font-bold text-[#f4f3ef] group-hover:text-[#e65c24] transition-colors">
                    {cert.title}
                  </h4>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#9da0a8]">
                    <span className="text-[#eceae5]">{cert.issuer}</span>
                    <span className="text-[#5e6068]">·</span>
                    <span className="capitalize text-[#5e6068]">{cert.type}</span>
                  </div>
                </div>

                <div className="shrink-0 font-mono text-xs">
                  {cert.status === 'In Progress' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] text-[#e65c24] bg-[#e65c24]/10 border border-[#e65c24]/40 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e65c24] animate-pulse" />
                      IN PROGRESS
                    </span>
                  ) : cert.type === 'achievement' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] text-[#e65c24] bg-[#e65c24]/10 border border-[#e65c24]/40 font-semibold">
                      <Award className="w-3.5 h-3.5" />
                      {cert.status}
                    </span>
                    ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-semibold">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      COMPLETED
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-white/[0.06] bg-[#111215]/40 text-xs font-mono text-[#5e6068] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e65c24]" />
            <span>Continuously learning new concepts through coursework, certifications, and hands-on projects.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
