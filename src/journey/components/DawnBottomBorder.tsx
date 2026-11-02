import React from 'react'

export function DawnBottomBorder({ className = '' }: { className?: string }) {
  return (
    <div
      className={`w-full overflow-hidden select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1920 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-5 sm:h-6 md:h-7 block"
      >
        <defs>
          {/* Subtle multi-chromatic ambient line above the block ribbon */}
          <linearGradient
            id="dawn-border-top-glow"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#7F300E" />
            <stop offset="6.25%" stopColor="#7F4613" />
            <stop offset="12.5%" stopColor="#7D5710" />
            <stop offset="18.75%" stopColor="#4E5712" />
            <stop offset="25%" stopColor="#395116" />
            <stop offset="31.25%" stopColor="#2E4C24" />
            <stop offset="37.5%" stopColor="#295046" />
            <stop offset="43.75%" stopColor="#295363" />
            <stop offset="50%" stopColor="#273F5A" />
            <stop offset="56.25%" stopColor="#282552" />
            <stop offset="62.5%" stopColor="#261154" />
            <stop offset="68.75%" stopColor="#411453" />
            <stop offset="75%" stopColor="#6D1659" />
            <stop offset="81.25%" stopColor="#7F154D" />
            <stop offset="87.5%" stopColor="#7A173A" />
            <stop offset="93.75%" stopColor="#7C141A" />
            <stop offset="100%" stopColor="#7C141A" />
          </linearGradient>
        </defs>

        {/* 1. Top luminous hairline */}
        <rect x="0" y="0" width="1920" height="3" fill="url(#dawn-border-top-glow)" />

        {/* 2. Eight distinct architectural color panels across the 1920 grid */}
        {/* Panel 0: Deep Ember / Wine (0 to 240) */}
        <rect x="0" y="3" width="240" height="29" fill="#26070A" />

        {/* Panel 1: Terracotta Red to Marine Teal Angled Slice (240 to 480) */}
        <polygon points="240,3 350,3 324,32 240,32" fill="#801008" />
        <polygon points="350,3 480,3 480,32 324,32" fill="#265863" />

        {/* Panel 2: Deep Berry Magenta / Kiln Heat (480 to 720) */}
        <rect x="480" y="3" width="240" height="29" fill="#7F1563" />

        {/* Panel 3: Royal Indigo / Midnight Navy (720 to 960) */}
        <rect x="720" y="3" width="240" height="29" fill="#260C63" />

        {/* Panel 4: Solar Gold / Raw Ochre (960 to 1200) */}
        <rect x="960" y="3" width="240" height="29" fill="#7F5B0A" />

        {/* Panel 5: Forest Olive Green / Plant Ecology (1200 to 1440) */}
        <rect x="1200" y="3" width="240" height="29" fill="#26520A" />

        {/* Panel 6: Rich Red to Marine Teal Angled Slice (1440 to 1680) */}
        <polygon points="1440,3 1582,3 1556,32 1440,32" fill="#801008" />
        <polygon points="1582,3 1680,3 1680,32 1556,32" fill="#265863" />

        {/* Panel 7: Muted Slate / Ash Mauve (1680 to 1920) */}
        <rect x="1680" y="3" width="240" height="29" fill="#7F6063" />
      </svg>
    </div>
  )
}
