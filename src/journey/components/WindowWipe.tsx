'use client'

import React from 'react'

interface WindowWipeProps {
  id: string
  progress: number // 0 to 1
  children: React.ReactNode
}

/**
 * WindowWipe reveals the contained scene through a rotated square mask (-12 degrees)
 * that scales up from 0% to 150%+ to reveal the full viewport seamlessly.
 */
export function WindowWipe({ id, progress, children }: WindowWipeProps) {
  // Clamped scale from 0 to ~2.8 (which fully reveals 100vw x 100vh when rotated 12deg)
  const scale = Math.max(0, Math.min(progress * 2.8, 3.2))

  return (
    <div className="relative w-full h-full overflow-hidden">
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id={`window-wipe-${id}`} clipPathUnits="objectBoundingBox">
            <g transform={`translate(0.5, 0.5) scale(${scale}) rotate(-12) translate(-0.5, -0.5)`}>
              <rect x="0.15" y="0.15" width="0.7" height="0.7" />
            </g>
          </clipPath>
        </defs>
      </svg>

      <div
        style={{
          clipPath: progress >= 1 ? 'none' : `url(#window-wipe-${id})`,
          WebkitClipPath: progress >= 1 ? 'none' : `url(#window-wipe-${id})`,
        }}
        className="w-full h-full"
      >
        {children}
      </div>
    </div>
  )
}
