'use client'

import React, { useState, useEffect } from 'react'
import gsap from 'gsap'

interface PreludeProps {
  onComplete: () => void
}

export function Prelude({ onComplete }: PreludeProps) {
  const [dismissed, setDismissed] = useState(false)

  const handleDismiss = () => {
    if (!dismissed) {
      setDismissed(true)
      onComplete()
    }
  }

  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.location.search.includes('noprelude')
    ) {
      handleDismiss()
      return
    }

    // 1.5s automatic settling animation
    const tl = gsap.timeline({
      onComplete: handleDismiss,
    })

    tl.fromTo(
      '.prelude-square-grey',
      {
        rotation: (i) => (i % 2 === 0 ? 45 : -45),
        scale: 0.4,
        opacity: 0,
        x: (i) => (i < 2 ? -60 : 60),
        y: (i) => (i % 2 === 0 ? -60 : 60),
      },
      {
        rotation: 0,
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
      }
    )
      .fromTo(
        '.prelude-square-red',
        {
          scale: 0,
          opacity: 0,
          rotation: -12,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      )
      .to(
        '.prelude-container',
        {
          opacity: 0,
          duration: 0.35,
          delay: 0.4,
          ease: 'power2.inOut',
        }
      )

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        tl.kill()
        handleDismiss()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      tl.kill()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (dismissed) return null

  return (
    <div className="prelude-container fixed inset-0 z-50 bg-ember flex flex-col items-center justify-center select-none pointer-events-auto">
      {/* Centered Logo Tile Mark Animation */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Central Red Square */}
        <div className="prelude-square-red absolute w-8 h-8 bg-fresh-red shadow-lg z-10" />

        {/* 4 Surrounding Grey Squares */}
        <div className="prelude-square-grey absolute top-0 left-0 w-8 h-8 bg-grey/70" />
        <div className="prelude-square-grey absolute top-0 right-0 w-8 h-8 bg-deep-grey" />
        <div className="prelude-square-grey absolute bottom-0 left-0 w-8 h-8 bg-deep-grey" />
        <div className="prelude-square-grey absolute bottom-0 right-0 w-8 h-8 bg-grey/70" />
      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        <span className="text-xs font-display tracking-widest uppercase text-paper/80 font-medium">
          Fresh Ceramics
        </span>
        <button
          onClick={handleDismiss}
          className="text-[11px] font-display uppercase tracking-widest text-grey/60 hover:text-paper transition-colors py-1 px-3 border border-stone/60 hover:border-paper"
        >
          Skip Intro [Esc]
        </button>
      </div>
    </div>
  )
}
