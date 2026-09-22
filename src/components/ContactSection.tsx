import React, { useState, useEffect } from 'react'
import { ArrowUpRight, Copy, Check, Mail, Phone, Clock, Send, HelpCircle, ChevronDown, MessageSquare } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from './BrandIcons'
import { PERSONAL_INFO } from '../data/portfolioData'

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false)
  const [localTime, setLocalTime] = useState<string>('')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [queryName, setQueryName] = useState('')
  const [queryEmail, setQueryEmail] = useState('')
  const [queryText, setQueryText] = useState('')
  const [queryCopied, setQueryCopied] = useState(false)

  const faqs = [
    {
      q: 'What opportunities or roles are you actively looking for?',
      a: "I'm looking for software engineering internships and entry-level roles, especially Java and Spring Boot backend or full-stack work. I'm pursuing my B.Tech in Computer Science & Engineering (AI & ML), graduating in 2027.",
    },
    {
      q: 'What is your location preference and availability?',
      a: 'Based in Dhanbad, Jharkhand, India (IST, UTC+5:30). Open to remote roles, relocation, and flexible arrangements.',
    },
    {
      q: 'What are your primary technical strengths?',
      a: 'Core stack: Java, Spring Boot, REST APIs, JavaScript, SQL, and PostgreSQL/MySQL. I build full-stack applications and deploy them on Render.',
    },
    {
      q: 'Are you available for open-source or project collaborations?',
      a: 'Yes! I enjoy building side projects, collaborating on open-source tools, and experimenting with new tech. Feel free to shoot me an email or connect on LinkedIn.',
    },
  ]

  // Real-time Local Digital Clock (IST, UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      const dateStr = now.toLocaleDateString('en-US', {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
      setLocalTime(`${timeStr} IST · ${dateStr}`)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])



  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleCopyQuery = () => {
    const text = `Hi Sujit,\n\nName: ${queryName || '[Name]'}\nEmail: ${queryEmail || '[Email]'}\n\nMessage:\n${queryText || 'I wanted to reach out regarding an opportunity / project.'}\n\nBest,\n${queryName || 'Visitor'}`
    navigator.clipboard.writeText(text)
    setQueryCopied(true)
    setTimeout(() => setQueryCopied(false), 2500)
  }

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`[Portfolio Message] From ${queryName || 'Visitor'}`)
    const body = encodeURIComponent(`Hi Sujit,\n\n${queryText || 'I wanted to reach out regarding an opportunity / project.'}\n\nName: ${queryName || 'Not specified'}\nEmail: ${queryEmail || 'Not specified'}`)
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`
  }

  return (
    <section
      id="contact"
      className="py-24 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      {/* Chapter Marker */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#9da0a8] mb-12 uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <span className="text-[#e65c24]">08</span>
          <span>// GET IN TOUCH</span>
        </span>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#e65c24]" />
          <span className="text-[#eceae5]">{localTime || 'DHANBAD, INDIA'}</span>
        </div>
      </div>

      {/* Main Editorial Headline */}
      <div className="max-w-4xl space-y-6 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] sm:text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="break-words">OPEN TO INTERNSHIPS, COLLABORATIONS &amp; OPPORTUNITIES</span>
        </div>

        <div className="overflow-hidden">
          <h2 className="font-display text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-[#f4f3ef] leading-[0.95] break-words">
            Let&apos;s build <br />
            <span className="text-[#e65c24]">something</span> meaningful.
          </h2>
        </div>
        <p className="contact-statement font-sans text-base sm:text-lg md:text-xl text-[#9da0a8] leading-relaxed max-w-2xl font-light pt-2">
          I&apos;m always happy to talk about opportunities, collaborations, projects, or technology. Or just say hi.
        </p>
      </div>

      {/* Direct Contact Cards & Quick Inquiry Terminal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: Direct Connection Channels */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email Card */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#111215]/80 border border-white/[0.08] hover:border-[#e65c24]/40 transition-all duration-200 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-[#5e6068]">
              <span className="flex items-center gap-2 uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5 text-[#e65c24]" />
                EMAIL
              </span>
              <span className="text-emerald-400">EMAIL ME</span>
            </div>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="font-display text-base sm:text-xl font-bold text-[#f4f3ef] hover:text-[#e65c24] transition-colors block break-all"
            >
              {PERSONAL_INFO.email}
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 font-mono text-xs text-[#9da0a8] hover:text-[#f4f3ef] transition-colors cursor-pointer pt-1"
              data-cursor="COPY"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#e65c24]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY EMAIL'}</span>
            </button>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#111215]/80 border border-white/[0.08] hover:border-[#e65c24]/40 hover:bg-[#141519] transition-all duration-200 flex flex-col justify-between space-y-3 group"
              data-cursor="LINKEDIN"
            >
              <div className="flex items-center justify-between">
                <LinkedinIcon className="w-5 h-5 text-[#e65c24]" />
                <ArrowUpRight className="w-4 h-4 text-[#5e6068] group-hover:text-[#e65c24] transition-colors" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#5e6068] block">CONNECT</span>
                <span className="font-display text-base font-bold text-[#f4f3ef] group-hover:text-[#e65c24] transition-colors">
                  LinkedIn
                </span>
              </div>
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#111215]/80 border border-white/[0.08] hover:border-[#e65c24]/40 hover:bg-[#141519] transition-all duration-200 flex flex-col justify-between space-y-3 group"
              data-cursor="GITHUB"
            >
              <div className="flex items-center justify-between">
                <GithubIcon className="w-5 h-5 text-[#e65c24]" />
                <ArrowUpRight className="w-4 h-4 text-[#5e6068] group-hover:text-[#e65c24] transition-colors" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#5e6068] block">REPOSITORIES</span>
                <span className="font-display text-base font-bold text-[#f4f3ef] group-hover:text-[#e65c24] transition-colors">
                  GitHub
                </span>
              </div>
            </a>
          </div>

          {/* Phone Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#111215]/80 border border-white/[0.08] flex flex-wrap items-center justify-between gap-2 sm:gap-4">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-[#5e6068] uppercase flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-[#e65c24]" />
                PHONE
              </span>
              <a
                href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                className="font-display text-sm sm:text-base font-bold text-[#f4f3ef] hover:text-[#e65c24] transition-colors block"
              >
                {PERSONAL_INFO.phone}
              </a>
            </div>
            <span className="font-mono text-[10px] sm:text-[11px] text-[#9da0a8] px-2.5 py-1 rounded bg-white/[0.04]">
              IST (UTC+5:30)
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Any Queries Section */}
        <div className="lg:col-span-7">
          <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-[#111215]/90 border border-white/[0.08] shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#f4f3ef]">
                <HelpCircle className="w-4 h-4 text-[#e65c24]" />
                <span className="font-bold tracking-wider uppercase">LET&apos;S TALK</span>
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] text-[#5e6068]">COMMON QUESTIONS &amp; MESSAGE</span>
            </div>

            {/* Accordion FAQs */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono text-[#9da0a8] uppercase tracking-wider">
                // COMMON QUESTIONS:
              </div>
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index
                return (
                  <div
                    key={faq.q}
                    className={`rounded-xl border transition-all overflow-hidden ${
                      isOpen
                        ? 'border-[#e65c24]/50 bg-[#16171b]'
                        : 'border-white/[0.06] bg-[#0c0d0e]/60 hover:border-white/20'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 flex items-center justify-between text-left gap-3 cursor-pointer"
                    >
                      <span className="font-display font-semibold text-sm text-[#f4f3ef]">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#e65c24] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 font-sans text-xs text-[#9da0a8] leading-relaxed border-t border-white/[0.04] pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Direct Custom Query Box */}
            <div className="pt-4 border-t border-white/[0.06] space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#f4f3ef]">
                <MessageSquare className="w-3.5 h-3.5 text-[#e65c24]" />
                <span className="uppercase tracking-wider">SEND A MESSAGE</span>
              </div>

              <form onSubmit={handleSendQuery} className="space-y-3 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[#9da0a8] block text-[10px]">YOUR NAME</label>
                    <input
                      type="text"
                      value={queryName}
                      onChange={(e) => setQueryName(e.target.value)}
                      placeholder="e.g. Alex Chen"
                      className="w-full bg-[#0c0d0e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#f4f3ef] placeholder-[#5e6068] focus:border-[#e65c24] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#9da0a8] block text-[10px]">YOUR EMAIL</label>
                    <input
                      type="text"
                      value={queryEmail}
                      onChange={(e) => setQueryEmail(e.target.value)}
                      placeholder="e.g. alex@example.com"
                      className="w-full bg-[#0c0d0e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#f4f3ef] placeholder-[#5e6068] focus:border-[#e65c24] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[#9da0a8] block text-[10px]">YOUR MESSAGE</label>
                  <textarea
                    rows={3}
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    placeholder="Type your message or question here..."
                    className="w-full bg-[#0c0d0e] border border-white/10 rounded-xl p-3.5 text-xs text-[#f4f3ef] placeholder-[#5e6068] focus:border-[#e65c24] outline-none resize-none font-sans"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyQuery}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-xs text-[#9da0a8] hover:text-[#f4f3ef] hover:border-white/25 transition-all"
                    data-cursor="COPY"
                  >
                    {queryCopied ? <Check className="w-3.5 h-3.5 text-[#e65c24]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{queryCopied ? 'COPIED' : 'COPY TEXT'}</span>
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#e65c24] hover:bg-[#ff6e35] text-white font-semibold text-xs transition-colors cursor-pointer shadow-[0_0_20px_rgba(230,92,36,0.3)]"
                    data-cursor="SEND"
                  >
                    <span>SEND MESSAGE</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
