import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Volume2, VolumeX, ArrowDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface IntroLoaderProps {
  isOpen: boolean
  onClose: () => void
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textGroupRef = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)
  const isExiting = useRef(false)

  // Interactive states
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [scrollPull, setScrollPull] = useState(0)

  const openCooldownRef = useRef(0)

  // Synthesized Web Audio SFX
  const playSfx = useCallback((type: 'ping' | 'click' | 'enter') => {
    if (!soundEnabled) return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      if (ctx.state === 'suspended') ctx.resume()

      if (type === 'click') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(587.33, ctx.currentTime) // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1) // A5
        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.22)
      } else if (type === 'ping') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(659.25, ctx.currentTime) // E5
        osc.frequency.exponentialRampToValueAtTime(987.77, ctx.currentTime + 0.14) // B5
        gain.gain.setValueAtTime(0.06, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.25)
      } else if (type === 'enter') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(329.63, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(164.81, ctx.currentTime + 0.45)
        gain.gain.setValueAtTime(0.09, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.5)
      }
    } catch {
      // Audio context blocked or unsupported
    }
  }, [soundEnabled])

  const isFirstRender = useRef(true)

  // Handle open/close transitions dynamically
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void; scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }).__lenis

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (!isOpen) {
      // Animate UP to hide intro cover
      isExiting.current = true
      playSfx('enter')

      if (lenis) {
        lenis.stop()
        lenis.scrollTo(0, { immediate: true })
      }
      window.scrollTo(0, 0)

      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 0.75,
        ease: 'power4.inOut',
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.pointerEvents = 'none'
            containerRef.current.style.visibility = 'hidden'
          }
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
          if (lenis) {
            lenis.scrollTo(0, { immediate: true })
            lenis.start()
          }
          ScrollTrigger.refresh()
          isExiting.current = false
          requestAnimationFrame(() => {
            window.scrollTo(0, 0)
            if (lenis) lenis.scrollTo(0, { immediate: true })
            ScrollTrigger.refresh()
          })
        },
      })
    } else {
      // Animate DOWN to reveal intro cover
      isExiting.current = true
      openCooldownRef.current = Date.now() + 850
      if (lenis) {
        lenis.stop()
        lenis.scrollTo(0, { immediate: true })
      }
      window.scrollTo(0, 0)

      if (containerRef.current) {
        containerRef.current.style.visibility = 'visible'
        containerRef.current.style.pointerEvents = 'auto'
      }

      gsap.fromTo(
        containerRef.current,
        { yPercent: -100 },
        {
          yPercent: 0,
          duration: 0.75,
          ease: 'power4.out',
          onComplete: () => {
            window.scrollTo(0, 0)
            if (lenis) lenis.scrollTo(0, { immediate: true })
            playSfx('click')
            isExiting.current = false
            setScrollPull(0)
          },
        }
      )
    }
  }, [isOpen, playSfx])

  const triggerExit = useCallback(() => {
    if (isExiting.current || !isOpen || Date.now() < openCooldownRef.current) return
    onClose()
  }, [onClose, isOpen])

  // Lifecycle & Global Scroll Interception (only active while intro is visible)
  useEffect(() => {
    // Disable browser automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      onClose()
      return
    }

    if (!isOpen) return

    // Freeze Lenis during intro
    const lenis = (window as unknown as { __lenis?: { stop: () => void; scrollTo: (t: number, o?: { immediate?: boolean }) => void } }).__lenis
    if (lenis) {
      lenis.stop()
      lenis.scrollTo(0, { immediate: true })
    }

    // Entrance timeline on initial load
    const tl = gsap.timeline()
    if (isFirstRender.current) {
      tl.fromTo(
        textGroupRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      tl.fromTo(
        bottomBarRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
    }

    // Global scroll & wheel event interception while intro is open
    let accumulatedDelta = 0
    let decayTimer: ReturnType<typeof setTimeout>

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault() // ALWAYS prevent default while intro is active!
      if (isExiting.current || !isOpen || Date.now() < openCooldownRef.current) return

      // Strict directionality: Only DOWNWARD scroll (e.deltaY > 0) can exit the intro
      if (e.deltaY <= 0) {
        accumulatedDelta = 0
        setScrollPull(0)
        return
      }

      accumulatedDelta += e.deltaY
      clearTimeout(decayTimer)
      decayTimer = setTimeout(() => {
        accumulatedDelta = 0
        setScrollPull(0)
      }, 350)

      const progress = Math.min(100, Math.round((accumulatedDelta / 150) * 100))
      setScrollPull(progress)

      if (accumulatedDelta >= 150) {
        clearTimeout(decayTimer)
        accumulatedDelta = 0
        setScrollPull(100)
        triggerExit()
      }
    }

    let touchStartY = 0
    let touchStartX = 0

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY
        touchStartX = e.touches[0].clientX
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isExiting.current || !isOpen || Date.now() < openCooldownRef.current) return

      const touchCurrentY = e.touches[0].clientY
      const touchCurrentX = e.touches[0].clientX
      const diffY = touchStartY - touchCurrentY
      const diffX = Math.abs(touchStartX - touchCurrentX)

      // Only prevent default if it's primarily an upward pull to dismiss
      if (diffY > 10 && diffY > diffX) {
        e.preventDefault()
      }

      if (diffY <= 0) {
        setScrollPull(0)
        return
      }

      const progress = Math.min(100, Math.round((diffY / 80) * 100))
      setScrollPull(progress)

      if (diffY > 80) {
        setScrollPull(100)
        triggerExit()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isExiting.current || !isOpen || Date.now() < openCooldownRef.current) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        triggerExit()
      }
    }

    // Attach listeners strictly to window while intro is open
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      tl.kill()
      clearTimeout(decayTimer)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, triggerExit])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0c0d0e] p-4 sm:p-10 md:p-14 select-none border-b border-[#f4f3ef]/10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Background Architectural Grid Lines */}
      {/* Subtle Background Radial Atmosphere */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full bg-[#e65c24]/[0.07] blur-[120px] pointer-events-none" />
      </div>

      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex justify-between">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden sm:block" />
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden lg:block" />
      </div>

      {/* Top Editorial Telemetry Bar */}
      <div className="flex justify-between items-center text-xs font-mono text-[#9da0a8] tracking-widest uppercase z-20">
        {/* Profile Pill Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm shadow-sm">
          <span className="text-xs font-mono font-medium text-[#f4f3ef] tracking-normal">Sujit G.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
        </div>

        {/* Right Controls: SFX + Academic Badge */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              const next = !soundEnabled
              setSoundEnabled(next)
              if (next) playSfx('ping')
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-mono transition-colors text-[#9da0a8] hover:text-[#f4f3ef] cursor-pointer"
            title="Toggle interactive audio feedback"
            aria-label="Toggle interactive audio feedback"
            data-cursor="AUDIO"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#e65c24]" /> : <VolumeX className="w-3.5 h-3.5 text-[#5e6068]" />}
            <span className="hidden sm:inline">{soundEnabled ? 'SFX ON' : 'SFX MUTED'}</span>
          </button>

          <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-[#5e6068]">
            AEC // ASANSOL
          </span>
        </div>
      </div>

      {/* Center Stage: Calibrated "WELCOME LET'S EXPLORE" Typography + Volumetric 3D Head */}
      <div className="relative flex flex-col items-center justify-center my-auto w-full max-w-7xl mx-auto py-8 sm:py-12 select-none z-10">
        {/* Background Massive Editorial Typography (Properly Fitted across all Viewports) */}
        <div
          ref={textGroupRef}
          className="relative flex flex-col items-center justify-center text-center select-none pointer-events-none w-full leading-[0.88] px-4"
        >
          <h1 className="font-display font-black text-[clamp(1.75rem,10.5vw,6rem)] tracking-tight text-[#f4f3ef] drop-shadow-sm select-none break-words">
            WELCOME
          </h1>
          <h2 className="font-display font-black text-[clamp(1.35rem,8vw,4.5rem)] tracking-tight text-[#e65c24] select-none -mt-1 sm:-mt-2 md:-mt-3 break-words">
            LET'S EXPLORE
          </h2>
        </div>
      </div>

      {/* Bottom Editorial Details & Interactive Launch Action */}
      <div
        ref={bottomBarRef}
        className="flex flex-col sm:flex-row justify-between items-center gap-6 text-xs font-mono text-[#5e6068] z-20"
      >
        {/* Bottom Left Statement */}
        <div className="max-w-xs sm:max-w-sm text-center sm:text-left space-y-1">
          <p className="text-xs sm:text-sm font-medium text-[#f4f3ef] leading-snug">
            Hey, glad you're here. Take a look around.
          </p>
          <p className="text-[11px] font-mono text-[#5e6068]">
            Sujit Gorai // Portfolio 2026
          </p>
        </div>

        {/* Central / Right Scroll & Click Entrance Trigger */}
        <button
          type="button"
          onClick={triggerExit}
          className="group relative flex flex-col items-center sm:items-end gap-2 text-[#9da0a8] hover:text-[#f4f3ef] transition-colors cursor-pointer py-1 px-4"
          data-cursor="ENTER"
        >
          {/* Scroll Pull Progress Readout */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#f4f3ef] uppercase">
            <span>{scrollPull > 0 ? `ENTERING [${scrollPull}%]` : 'SCROLL TO EXPLORE'}</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#e65c24] group-hover:translate-y-1 transition-transform duration-200" />
          </div>

          {/* Futuristic Scroll Capsule Track */}
          <div className="relative w-6 h-10 rounded-full border border-white/20 group-hover:border-[#e65c24] transition-colors flex justify-center p-1 overflow-hidden">
            <div
              className="absolute bottom-0 left-0 right-0 bg-[#e65c24]/35 transition-all duration-150 pointer-events-none"
              style={{ height: `${Math.max(scrollPull, 12)}%` }}
            />
            <div className="w-1.5 h-2.5 rounded-full bg-[#e65c24] animate-bounce z-10" />
          </div>

          <span className="text-[10px] text-[#5e6068] tracking-widest uppercase group-hover:text-[#9da0a8] transition-colors">
            CLICK OR SCROLL DOWN
          </span>
        </button>
      </div>
    </div>
  )
}
