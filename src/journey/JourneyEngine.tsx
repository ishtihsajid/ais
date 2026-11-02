'use client'

import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Prelude } from './components/Prelude'
import { ProgressRail } from './components/ProgressRail'
import { Chapter1Dawn } from './scenes/Chapter1Dawn'
import { Chapter2Ground } from './scenes/Chapter2Ground'
import { Chapter3Fire } from './scenes/Chapter3Fire'
import { Chapter4Surface } from './scenes/Chapter4Surface'
import { Chapter5Lighter } from './scenes/Chapter5Lighter'
import { Chapter6Reach } from './scenes/Chapter6Reach'
import { Chapter7Hands } from './scenes/Chapter7Hands'
import { Chapter8Home } from './scenes/Chapter8Home'
import { Chapter9Beyond } from './scenes/Chapter9Beyond'
import { Chapter10Horizon } from './scenes/Chapter10Horizon'

gsap.registerPlugin(ScrollTrigger)

const CHAPTERS = [
  { slug: 'dawn', title: 'A Fresh Start', number: 1, theme: 'dark' as const },
  { slug: 'ground', title: 'Responsible before beautiful', number: 2, theme: 'light' as const },
  { slug: 'fire', title: 'Heat gives form, care gives worth', number: 3, theme: 'dark' as const },
  { slug: 'surface', title: 'Surfaces for every kind of life', number: 4, theme: 'light' as const },
  { slug: 'lighter', title: 'Lighter and cooler', number: 5, theme: 'light' as const },
  { slug: 'reach', title: 'Within your reach', number: 6, theme: 'dark' as const },
  { slug: 'hands', title: 'Finished by hand', number: 7, theme: 'dark' as const },
  { slug: 'home', title: 'A fresh start, room by room', number: 8, theme: 'light' as const },
  { slug: 'beyond', title: 'What we owe beyond the tile', number: 9, theme: 'light' as const },
  { slug: 'horizon', title: 'Dawn again', number: 10, theme: 'dark' as const },
]

// Smooth scroll duration in ms (controls how fast the mould snap animates)
const SCROLL_DURATION = 600

interface JourneyEngineProps {
  locale?: string
}

// Get absolute Y position of an element in the document (works regardless of offsetParent chain)
function absTop(el: HTMLElement): number {
  return el.getBoundingClientRect().top + window.scrollY
}

export function JourneyEngine({ locale = 'en' }: JourneyEngineProps) {
  const [isTouch, setIsTouch] = useState(false)
  const [activeSlug, setActiveSlug] = useState('dawn')
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark')
  const [preludeDismissed, setPreludeDismissed] = useState(false)

  const isLockedRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const accumulatedDeltaRef = useRef(0)
  const wheelClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchStartYRef = useRef(0)
  const touchStartTimeRef = useRef(0)

  useEffect(() => {
    const touchQuery = window.matchMedia('(pointer: coarse)')
    setIsTouch(touchQuery.matches)

    // ─────────────────────────────────────────────────────────────────
    // SMOOTH SCROLL: RAF-based, fixed duration, releases lock on complete
    // ─────────────────────────────────────────────────────────────────
    const smoothScrollTo = (targetY: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      const startY = window.scrollY
      const diff = targetY - startY
      if (Math.abs(diff) < 2) {
        isLockedRef.current = false
        return
      }
      const startTime = performance.now()
      const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

      const tick = (now: number) => {
        const elapsed = Math.min(now - startTime, SCROLL_DURATION)
        window.scrollTo(0, Math.round(startY + diff * easeInOut(elapsed / SCROLL_DURATION)))
        if (elapsed < SCROLL_DURATION) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          window.scrollTo(0, targetY)
          rafRef.current = null
          setTimeout(() => {
            isLockedRef.current = false
            accumulatedDeltaRef.current = 0
          }, 150)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    // ─────────────────────────────────────────────────────────────────
    // MOULD MAP — all discrete resting positions across the Journey
    // Uses getBoundingClientRect for reliable absolute positions
    // ─────────────────────────────────────────────────────────────────
    const getMoulds = (): { name: string; y: number }[] => {
      const moulds: { name: string; y: number }[] = []
      const vh = window.innerHeight
      const touch = window.matchMedia('(pointer: coarse)').matches

      const addMould = (name: string, y: number) => {
        const rounded = Math.round(y)
        if (moulds.length === 0 || Math.abs(rounded - moulds[moulds.length - 1].y) > 20) {
          moulds.push({ name, y: rounded })
        }
      }

      // 1. Dawn — 4 beats matching animation keyframes
      const chDawn = document.getElementById('dawn')
      if (chDawn) {
        const top = absTop(chDawn)
        const dist = vh * (touch ? 1.2 : 1.8)
        addMould('dawn-start', top)                      // progress 0: opening slate
        addMould('dawn-title', top + dist * 0.35)        // progress 0.35: title revealed
        addMould('dawn-line', top + dist * 0.65)         // progress 0.65: subtitle line revealed
        addMould('dawn-stats', top + dist)               // progress 1.0: 3 stats figures fully revealed
      }

      // 2. Ground — 6 panels, each a full viewport width
      const chGround = document.getElementById('ground')
      if (chGround) {
        const top = absTop(chGround)
        const dist = vh * (touch ? 3.0 : 5.0)
        for (let i = 0; i < 6; i++) addMould(`ground-panel-${i + 1}`, top + dist * (i / 5))
      }

      // 3. Fire — 7 stations (evenly spaced)
      const chFire = document.getElementById('fire')
      if (chFire) {
        const top = absTop(chFire)
        const dist = vh * (touch ? 2.5 : 3.5)
        for (let i = 0; i < 7; i++) addMould(`fire-station-${i + 1}`, top + dist * (i / 6))
      }

      // 4. Surface — 3 beats: mosaic arrival, dc banner, door row
      const chSurface = document.getElementById('surface')
      if (chSurface) {
        const top = absTop(chSurface)
        const dist = vh * (touch ? 1.5 : 2.5)
        addMould('surface-mosaic', top)                  // progress 0: mosaic arrival
        addMould('surface-dc', top + dist * 0.50)        // progress 0.50: dc banner
        addMould('surface-doors', top + dist)            // progress 1.0: door row fully revealed
      }

      // 5. Lighter — 3 beats: panels arrive, calculator active, closing bar
      const chLighter = document.getElementById('lighter')
      if (chLighter) {
        const top = absTop(chLighter)
        const dist = vh * (touch ? 1.5 : 2.5)
        addMould('lighter-intro', top)                   // progress 0: arrival
        addMould('lighter-panels', top + dist * 0.50)    // progress 0.50: interactive panels & calculator
        addMould('lighter-calc', top + dist)             // progress 1.0: closing bar fully revealed
      }

      // 6. Reach — static chapter, one mould
      const chReach = document.getElementById('reach')
      if (chReach) addMould('reach', absTop(chReach))

      // 7. Hands — 2 beats: voices arrive, door row
      const chHands = document.getElementById('hands')
      if (chHands) {
        const top = absTop(chHands)
        const dist = vh * (touch ? 1.2 : 2.0)
        addMould('hands-voices', top)                    // progress 0: voices arrive
        addMould('hands-doors', top + dist)              // progress 1.0: door row fully revealed
      }

      // 8. Home — 5 interior spaces
      const chHome = document.getElementById('home')
      if (chHome) {
        const top = absTop(chHome)
        const dist = vh * (touch ? 2.5 : 4.0)
        for (let i = 0; i < 5; i++) addMould(`home-space-${i + 1}`, top + dist * (i / 4))
      }

      // 9. Beyond — 4 initiatives
      const chBeyond = document.getElementById('beyond')
      if (chBeyond) {
        const top = absTop(chBeyond)
        const dist = vh * (touch ? 1.5 : 2.4)
        for (let i = 0; i < 4; i++) addMould(`beyond-initiative-${i + 1}`, top + dist * (i / 3))
      }

      // 10. Horizon — 3 beats: vision, actions, end
      const chHorizon = document.getElementById('horizon')
      if (chHorizon) {
        const top = absTop(chHorizon)
        const dist = vh * (touch ? 1.2 : 1.8)
        addMould('horizon-vision', top)                  // progress 0: sunrise flare + vision title
        addMould('horizon-actions', top + dist * 0.50)   // progress 0.50: action doors preview
        addMould('horizon-end', top + dist)              // progress 1.0: action doors fully revealed
      }

      // 11. Footer
      const footer = document.querySelector('footer')
      if (footer) addMould('footer', absTop(footer))

      return moulds
    }

    // ─────────────────────────────────────────────────────────────────
    // MOULD NAVIGATION
    // ─────────────────────────────────────────────────────────────────
    const findCurrentMouldIndex = (): number => {
      const moulds = getMoulds()
      if (moulds.length === 0) return 0
      const currentY = window.scrollY
      let closestIdx = 0
      let minDist = Infinity
      for (let i = 0; i < moulds.length; i++) {
        const d = Math.abs(currentY - moulds[i].y)
        if (d < minDist) { minDist = d; closestIdx = i }
      }
      return closestIdx
    }

    const goToMouldIndex = (targetIndex: number) => {
      const moulds = getMoulds()
      if (moulds.length === 0) return
      const clamped = Math.max(0, Math.min(moulds.length - 1, targetIndex))
      const target = moulds[clamped]
      if (!target) return

      isLockedRef.current = true
      accumulatedDeltaRef.current = 0
      smoothScrollTo(target.y)
      // lock is released inside smoothScrollTo when RAF animation completes
    }

    // ─────────────────────────────────────────────────────────────────
    // ACTIVE CHAPTER TRACKER
    // ─────────────────────────────────────────────────────────────────
    const updateActiveChapter = () => {
      const scrollY = window.scrollY
      const chElements = CHAPTERS.map((ch) => ({
        slug: ch.slug,
        theme: ch.theme,
        element: document.getElementById(ch.slug),
      })).filter((item) => item.element !== null)

      for (let i = chElements.length - 1; i >= 0; i--) {
        const item = chElements[i]
        if (item.element) {
          if (scrollY >= absTop(item.element) - window.innerHeight * 0.4) {
            setActiveSlug(item.slug)
            setActiveTheme(item.theme)
            break
          }
        }
      }

      // Settle snapper: snap to nearest mould 250ms after scroll stops
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current)
      settleTimerRef.current = setTimeout(() => {
        if (isLockedRef.current) return
        const moulds = getMoulds()
        const currentY = window.scrollY
        const idx = findCurrentMouldIndex()
        const target = moulds[idx]
        if (target && Math.abs(currentY - target.y) > 20) {
          goToMouldIndex(idx)
        }
      }, 250)
    }

    window.addEventListener('scroll', updateActiveChapter, { passive: true })
    updateActiveChapter()

    // ─────────────────────────────────────────────────────────────────
    // WHEEL INTERCEPTOR
    // ─────────────────────────────────────────────────────────────────
    const WHEEL_THRESHOLD = 80

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('select, input[type="range"], [data-scroll-inner]')) return
      e.preventDefault()
      if (isLockedRef.current) return

      const normalised = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 150)
      accumulatedDeltaRef.current += normalised

      if (wheelClearTimerRef.current) clearTimeout(wheelClearTimerRef.current)
      wheelClearTimerRef.current = setTimeout(() => { accumulatedDeltaRef.current = 0 }, 180)

      if (Math.abs(accumulatedDeltaRef.current) >= WHEEL_THRESHOLD) {
        const direction = accumulatedDeltaRef.current > 0 ? 1 : -1
        accumulatedDeltaRef.current = 0
        goToMouldIndex(findCurrentMouldIndex() + direction)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    // ─────────────────────────────────────────────────────────────────
    // TOUCH SWIPE INTERCEPTOR
    // ─────────────────────────────────────────────────────────────────
    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY
      touchStartTimeRef.current = Date.now()
    }

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('[data-scroll-inner]')) return
      e.preventDefault()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isLockedRef.current) return
      const touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartYRef.current - touchEndY
      const duration = Date.now() - touchStartTimeRef.current
      if (Math.abs(deltaY) > 35 && duration < 800) {
        goToMouldIndex(findCurrentMouldIndex() + (deltaY > 0 ? 1 : -1))
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    // ─────────────────────────────────────────────────────────────────
    // KEYBOARD
    // ─────────────────────────────────────────────────────────────────
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault()
        if (!isLockedRef.current) goToMouldIndex(findCurrentMouldIndex() + 1)
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        if (!isLockedRef.current) goToMouldIndex(findCurrentMouldIndex() - 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    // ─────────────────────────────────────────────────────────────────
    // RESIZE
    // ─────────────────────────────────────────────────────────────────
    let resizeTimer: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => { ScrollTrigger.refresh() }, 250)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', updateActiveChapter)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      if (wheelClearTimerRef.current) clearTimeout(wheelClearTimerRef.current)
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current)
      clearTimeout(resizeTimer)
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  const handleSelectChapter = (slug: string) => {
    const el = document.getElementById(slug)
    if (el) {
      isLockedRef.current = true
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      const targetY = absTop(el)
      const startY = window.scrollY
      const diff = targetY - startY
      const duration = Math.min(1200, Math.abs(diff) / window.innerHeight * 800 + 400)
      const startTime = performance.now()
      const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      const tick = (now: number) => {
        const elapsed = Math.min(now - startTime, duration)
        window.scrollTo(0, Math.round(startY + diff * easeInOut(elapsed / duration)))
        if (elapsed < duration) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          window.scrollTo(0, targetY)
          rafRef.current = null
          setTimeout(() => {
            isLockedRef.current = false
            accumulatedDeltaRef.current = 0
          }, 150)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
  }

  const isBn = locale === 'bn'

  return (
    <div className="relative w-full bg-ember text-paper selection:bg-fresh-red selection:text-white">
      {/* Skip Link for accessibility */}
      <a
        href={isBn ? '/bn/tiles' : '/tiles'}
        className="sr-only focus:not-sr-only focus:fixed focus:top-20 focus:left-6 focus:z-50 focus:px-4 focus:py-2 focus:bg-fresh-red focus:text-white focus:outline-none text-xs font-display uppercase tracking-widest"
      >
        {isBn ? 'ক্যাটালগে চলে যান' : 'Skip to the catalogue'}
      </a>

      {/* Prelude Animation */}
      {!preludeDismissed && (
        <Prelude onComplete={() => setPreludeDismissed(true)} />
      )}

      {/* Persistent Vertical Progress Rail */}
      <ProgressRail
        chapters={CHAPTERS}
        activeSlug={activeSlug}
        onSelectChapter={handleSelectChapter}
        theme={activeTheme}
      />

      {/* Pinned Scroll Chapters */}
      <main className="relative w-full">
        <Chapter1Dawn locale={locale} isTouch={isTouch} />
        <Chapter2Ground locale={locale} isTouch={isTouch} />
        <Chapter3Fire locale={locale} isTouch={isTouch} />
        <Chapter4Surface locale={locale} isTouch={isTouch} />
        <Chapter5Lighter locale={locale} isTouch={isTouch} />
        <Chapter6Reach locale={locale} isTouch={isTouch} />
        <Chapter7Hands locale={locale} isTouch={isTouch} />
        <Chapter8Home locale={locale} isTouch={isTouch} />
        <Chapter9Beyond locale={locale} isTouch={isTouch} />
        <Chapter10Horizon locale={locale} isTouch={isTouch} />
      </main>
    </div>
  )
}
