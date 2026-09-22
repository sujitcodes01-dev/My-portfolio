import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { PERSONAL_INFO } from '../data/portfolioData'

interface NavbarProps {
  onOpenIntro?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenIntro }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)

      const winHeight = document.documentElement.scrollHeight - window.innerHeight
      if (winHeight > 0) {
        setScrollProgress((scrollY / winHeight) * 100)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'PHILOSOPHY', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'JOURNEY', href: '#journey' },
    { label: 'WORK', href: '#featured-projects' },
    { label: 'CONTACT', href: '#contact' },
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (href === '#hero' && window.scrollY < 40 && onOpenIntro) {
      onOpenIntro()
      return
    }
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0c0d0e]/85 backdrop-blur-md py-4 border-b border-white/[0.06]'
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        {/* Monogram / Identity */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="group flex items-center gap-3 cursor-pointer"
          data-cursor="TOP"
        >
          <div className="w-2 h-2 rounded-full bg-[#e65c24] transition-transform duration-300 group-hover:scale-150" />
          <span className="font-display font-bold tracking-tight text-[#f4f3ef] text-sm md:text-base">
            SUJIT <span className="text-[#9da0a8] font-mono font-normal">GORAI</span>
          </span>
        </a>

        {/* Location & Status (Desktop only) */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-[#5e6068]">
          <span>DHANBAD, INDIA</span>
          <span className="text-[#24262d]">/</span>
          <span className="text-emerald-400/90 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            OPEN TO OPPORTUNITIES
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-[#9da0a8]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="relative py-1 transition-colors duration-200 hover:text-[#f4f3ef] group"
              data-cursor="GOTO"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#e65c24] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#e65c24] hover:text-[#ff682b] transition-colors"
            data-cursor="EXT"
          >
            <span>GITHUB</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#f4f3ef] hover:text-[#e65c24] transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Subtle Scroll Progress Hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.04]">
        <div
          className="h-full bg-[#e65c24] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] h-[calc(100dvh-65px)] overflow-y-auto bg-[#0c0d0e]/95 backdrop-blur-xl border-t border-white/[0.08] px-6 sm:px-8 py-8 flex flex-col justify-between z-50 animate-in fade-in duration-200">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-display text-2xl font-bold tracking-tight text-[#f4f3ef] hover:text-[#e65c24] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-8 border-t border-white/[0.08] flex flex-col gap-4 font-mono text-xs text-[#9da0a8]">
            <div className="flex justify-between items-center">
              <span>GITHUB</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e65c24]"
              >
                {PERSONAL_INFO.githubHandle}
              </a>
            </div>
            <div className="flex justify-between items-center">
              <span>LINKEDIN</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e65c24]"
              >
                Connect
              </a>
            </div>
            <div className="text-[11px] text-[#5e6068] mt-2">
              {PERSONAL_INFO.university} · B.Tech CSE (2027)
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
