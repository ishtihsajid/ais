'use client'

import React, { useEffect, useRef, useState } from 'react'

interface DeepZoomViewerProps {
  tileSource?: string
  fallbackSrc?: string
  alt?: string
  className?: string
}

export function DeepZoomViewer({
  tileSource,
  fallbackSrc,
  alt = 'Tile surface deep zoom inspection',
  className = '',
}: DeepZoomViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null)
  const [osdInstance, setOsdInstance] = useState<any>(null)
  const [loadError, setLoadError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let viewer: any = null
    let isMounted = true

    async function initOsd() {
      if (!viewerRef.current || !tileSource) {
        setIsLoading(false)
        return
      }

      try {
        const OpenSeadragon = (await import('openseadragon')).default

        if (!isMounted || !viewerRef.current) return

        viewer = OpenSeadragon({
          element: viewerRef.current,
          tileSources: tileSource,
          prefixUrl: '/images/openseadragon/',
          showNavigationControl: true,
          showZoomControl: true,
          showHomeControl: true,
          showFullPageControl: true,
          animationTime: 0.5,
          blendTime: 0.1,
          constrainDuringPan: true,
          maxZoomPixelRatio: 2.5,
          minZoomImageRatio: 0.8,
          visibilityRatio: 1,
          zoomInButton: 'osd-zoom-in',
          zoomOutButton: 'osd-zoom-out',
          homeButton: 'osd-home',
          fullPageButton: 'osd-full-page',
          gestureSettingsMouse: {
            scrollToZoom: true,
            clickToZoom: true,
            dblClickToZoom: true,
          },
        })

        viewer.addHandler('open', () => {
          if (isMounted) {
            setIsLoading(false)
            setLoadError(false)
          }
        })

        viewer.addHandler('open-failed', () => {
          if (isMounted) {
            setIsLoading(false)
            setLoadError(true)
          }
        })

        setOsdInstance(viewer)
      } catch (err) {
        console.error('OpenSeadragon initialization failed:', err)
        if (isMounted) {
          setIsLoading(false)
          setLoadError(true)
        }
      }
    }

    initOsd()

    return () => {
      isMounted = false
      if (viewer) {
        try {
          viewer.destroy()
        } catch (_) {}
      }
    }
  }, [tileSource])

  if (!tileSource || loadError) {
    return (
      <div className={`relative bg-mist flex items-center justify-center overflow-hidden ${className}`}>
        {fallbackSrc ? (
          <img
            src={fallbackSrc}
            alt={alt}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-stone font-display text-sm tracking-widest uppercase p-8 text-center">
            Surface zoom unavailable
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`relative bg-stone overflow-hidden group select-none ${className}`}>
      {/* OpenSeadragon container */}
      <div ref={viewerRef} className="w-full h-full min-h-[420px]" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-stone/80 flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-3 text-paper">
            <div className="w-8 h-8 border-2 border-fresh-red border-t-transparent animate-spin" />
            <span className="font-display text-xs tracking-widest uppercase">
              Loading Micro-Surface...
            </span>
          </div>
        </div>
      )}

      {/* Custom Minimalist Architectural Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1 bg-ember/90 p-1 border border-stone">
        <button
          id="osd-zoom-in"
          type="button"
          title="Zoom In"
          aria-label="Zoom in"
          className="w-8 h-8 flex items-center justify-center text-paper hover:bg-fresh-red transition-colors text-lg font-bold"
        >
          +
        </button>
        <button
          id="osd-zoom-out"
          type="button"
          title="Zoom Out"
          aria-label="Zoom out"
          className="w-8 h-8 flex items-center justify-center text-paper hover:bg-fresh-red transition-colors text-lg font-bold"
        >
          −
        </button>
        <button
          id="osd-home"
          type="button"
          title="Reset View"
          aria-label="Reset view"
          className="w-8 h-8 flex items-center justify-center text-paper hover:bg-fresh-red transition-colors text-xs font-semibold uppercase"
        >
          1:1
        </button>
        <button
          id="osd-full-page"
          type="button"
          title="Full Page"
          aria-label="Full screen"
          className="w-8 h-8 flex items-center justify-center text-paper hover:bg-fresh-red transition-colors text-xs font-semibold"
        >
          ⛶
        </button>
      </div>

      {/* Tactile Surface Micro-Inspection Watermark / Guide */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <span className="px-2.5 py-1 text-[11px] font-semibold tracking-widest uppercase bg-ember/80 text-paper border border-stone/50">
          Macro Surface Inspection
        </span>
      </div>
    </div>
  )
}
