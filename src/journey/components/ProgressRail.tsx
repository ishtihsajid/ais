'use client'

import React, { useEffect, useState } from 'react'

interface ProgressRailProps {
  chapters: { slug: string; title: string; number: number }[]
  activeSlug: string
  onSelectChapter: (slug: string) => void
  theme?: 'dark' | 'light'
}

export function ProgressRail({
  chapters,
  activeSlug,
  onSelectChapter,
  theme = 'dark',
}: ProgressRailProps) {
  return (
    <nav
      aria-label="Journey Chapters"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 select-none"
    >
      <div className="flex flex-col items-center gap-2">
        {chapters.map((ch) => {
          const isActive = ch.slug === activeSlug
          return (
            <button
              key={ch.slug}
              type="button"
              onClick={() => onSelectChapter(ch.slug)}
              title={`Chapter ${ch.number}: ${ch.title}`}
              aria-label={`Jump to Chapter ${ch.number}: ${ch.title}`}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none"
            >
              {/* Tooltip on hover */}
              <span className="absolute right-8 px-2 py-1 text-[11px] font-display font-semibold tracking-wider uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-stone text-paper border border-stone-dark">
                {String(ch.number).padStart(2, '0')}. {ch.title}
              </span>

              {/* Square Progress Marker */}
              <div
                className={`w-2.5 h-2.5 transition-all duration-300 ${
                  isActive
                    ? 'bg-fresh-red scale-125 ring-2 ring-fresh-red/40'
                    : theme === 'dark'
                    ? 'bg-grey/40 hover:bg-paper'
                    : 'bg-stone/40 hover:bg-stone'
                }`}
              />
            </button>
          )
        })}
      </div>
    </nav>
  )
}
