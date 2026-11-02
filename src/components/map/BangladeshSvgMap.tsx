'use client'

import React, { useState } from 'react'
import mapData from '@/data/bangladesh_svg_map.json'

interface BangladeshSvgMapProps {
  selectedDivision?: string
  onSelectDivision?: (divisionSlug: string) => void
  activeShowroom?: any
  onSelectShowroom?: (showroom: any) => void
  locale?: string
  className?: string
}

export function BangladeshSvgMap({
  selectedDivision = 'all',
  onSelectDivision,
  activeShowroom,
  onSelectShowroom,
  locale = 'en',
  className = '',
}: BangladeshSvgMapProps) {
  const [hoveredDivision, setHoveredDivision] = useState<string | null>(null)
  const [hoveredPin, setHoveredPin] = useState<any | null>(null)

  const isBn = locale === 'bn'
  const { viewBox, divisions, showrooms, plantOrigin } = mapData as any

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox={viewBox}
        className="w-full h-full max-h-[100%] drop-shadow-2xl"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Radial gradient for mother plant pulse */}
          <radialGradient id="plantGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E30613" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#E30613" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#E30613" stopOpacity="0" />
          </radialGradient>
          {/* Filter for glow effect */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Division Polygons */}
        <g className="divisions">
          {divisions.map((div: any) => {
            const isSelected = selectedDivision === div.slug || selectedDivision === div.name.toLowerCase()
            const isHovered = hoveredDivision === div.slug
            const isFiltered = selectedDivision !== 'all' && !isSelected

            return (
              <path
                key={div.name}
                d={div.d}
                className="transition-all duration-300 cursor-pointer"
                fill={
                  isSelected
                    ? '#2F1216'
                    : isHovered
                    ? '#26262B'
                    : '#1C1C20'
                }
                stroke={isSelected ? '#E30613' : isHovered ? '#666670' : '#333338'}
                strokeWidth={isSelected ? '2' : '1'}
                strokeLinejoin="round"
                opacity={isFiltered ? 0.45 : 1}
                onMouseEnter={() => setHoveredDivision(div.slug)}
                onMouseLeave={() => setHoveredDivision(null)}
                onClick={() => onSelectDivision?.(isSelected ? 'all' : div.slug)}
              >
                <title>{`${isBn ? div.nameBn : div.name} Division`}</title>
              </path>
            )
          })}
        </g>

        {/* Division Labels */}
        <g className="division-labels pointer-events-none select-none">
          {divisions.map((div: any) => {
            const isSelected = selectedDivision === div.slug || selectedDivision === div.name.toLowerCase()
            const isFiltered = selectedDivision !== 'all' && !isSelected

            return (
              <text
                key={`label-${div.name}`}
                x={div.centroid[0]}
                y={div.centroid[1]}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[11px] font-mono uppercase tracking-widest font-semibold transition-opacity duration-300"
                fill={isSelected ? '#FFFFFF' : '#888890'}
                opacity={isFiltered ? 0.35 : 0.75}
              >
                {isBn ? div.nameBn : div.name}
              </text>
            )
          })}
        </g>

        {/* Meghnaghat Mother Plant radiating node */}
        <g
          className="mother-plant cursor-pointer group"
          transform={`translate(${plantOrigin.x}, ${plantOrigin.y})`}
          onClick={() => onSelectShowroom?.(plantOrigin)}
        >
          {/* Animated pulse rings */}
          <circle cx="0" cy="0" r="22" fill="url(#plantGlow)" className="animate-ping opacity-35" />
          <circle cx="0" cy="0" r="16" fill="none" stroke="#E30613" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="0" cy="0" r="7" fill="#E30613" stroke="#FFFFFF" strokeWidth="2" filter="url(#glow)" />
          <circle cx="0" cy="0" r="3" fill="#FFFFFF" />

          {/* Plant Label */}
          <g transform="translate(14, -8)" className="pointer-events-none">
            <rect x="0" y="-8" width="105" height="18" fill="#141416" stroke="#E30613" strokeWidth="1" rx="0" opacity="0.9" />
            <text x="6" y="4" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
              ★ Meghnaghat Plant
            </text>
          </g>
        </g>

        {/* 81 Real Showrooms Pins */}
        <g className="showrooms">
          {showrooms.map((s: any) => {
            const isFlagship = s.isFlagship
            const isActive = activeShowroom && activeShowroom.id === s.id
            const divisionSlug = s.division?.toLowerCase()
            const isVisible =
              selectedDivision === 'all' ||
              divisionSlug === selectedDivision ||
              (selectedDivision === 'barishal' && divisionSlug === 'barisal') ||
              (selectedDivision === 'chattogram' && divisionSlug === 'chittagong')

            if (!isVisible) return null

            return (
              <g
                key={s.id}
                transform={`translate(${s.x}, ${s.y})`}
                className="cursor-pointer group transition-transform duration-200"
                onClick={() => onSelectShowroom?.(s)}
                onMouseEnter={() => setHoveredPin(s)}
                onMouseLeave={() => setHoveredPin(null)}
              >
                {/* Active or Flagship Pulsing Beacon */}
                {isActive && (
                  <circle
                    cx="0"
                    cy="0"
                    r={isFlagship ? 16 : 12}
                    fill="none"
                    stroke="#E30613"
                    strokeWidth="1.5"
                    className="animate-pulse"
                  />
                )}

                {isFlagship && !isActive && (
                  <circle
                    cx="0"
                    cy="0"
                    r="10"
                    fill="none"
                    stroke="#E30613"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                )}

                {/* Main Pin Dot */}
                <circle
                  cx="0"
                  cy="0"
                  r={isFlagship ? 6.5 : isActive ? 5.5 : 3.8}
                  fill={
                    isActive
                      ? '#FFFFFF'
                      : isFlagship
                      ? '#E30613'
                      : '#E4E4E7'
                  }
                  stroke={
                    isActive
                      ? '#E30613'
                      : isFlagship
                      ? '#FFFFFF'
                      : '#18181B'
                  }
                  strokeWidth={isActive ? '2.5' : isFlagship ? '1.5' : '1'}
                  className="transition-colors duration-200"
                />

                {/* Center dot for Flagship */}
                {isFlagship && (
                  <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
                )}
              </g>
            )
          })}
        </g>
      </svg>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-2 left-2 flex flex-wrap items-center gap-3 sm:gap-4 px-3 py-1.5 bg-[#141416]/95 border border-white/10 text-[10px] font-mono text-grey shadow-lg z-10">
        <span className="flex items-center gap-1.5 text-white">
          <span className="w-2.5 h-2.5 bg-fresh-red rounded-none ring-1 ring-white" />
          <span>Flagship (02)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-neutral-200 rounded-none border border-neutral-700" />
          <span>Exclusive (79)</span>
        </span>
        <span className="flex items-center gap-1.5 text-amber-400">
          <span className="w-2 h-2 rounded-full bg-fresh-red ring-2 ring-white animate-pulse" />
          <span>Mother Plant</span>
        </span>
      </div>

      {/* Floating Tooltip when hovering pin */}
      {hoveredPin && (
        <div
          className="absolute z-30 pointer-events-none bg-[#18181B] border border-white/20 p-2 shadow-2xl text-left max-w-xs transition-opacity duration-150"
          style={{
            left: `${(hoveredPin.x / 600) * 100}%`,
            top: `${(hoveredPin.y / 750) * 100}%`,
            transform: 'translate(-50%, -125%)',
          }}
        >
          <div className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-fresh-red font-bold">
            <span>{hoveredPin.tier === 'flagship' ? '★ Flagship Centre' : 'Exclusive Showroom'}</span>
          </div>
          <div className="text-xs font-bold text-white leading-snug mt-0.5">
            {hoveredPin.name}
          </div>
          <div className="text-[10px] text-grey font-mono mt-0.5">
            {hoveredPin.district}, {hoveredPin.division}
          </div>
        </div>
      )}
    </div>
  )
}
