import React from 'react'
import { DeepZoomViewer } from '@/components/DeepZoomViewer'

export default function TestZoomPage() {
  return (
    <div className="min-h-screen bg-stone p-8 text-paper">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <span className="text-xs font-display tracking-widest uppercase text-fresh-red">
            Phase 2 Gate Verification
          </span>
          <h1 className="text-3xl font-display font-bold mt-1">
            OpenSeadragon Deep Zoom Surface Inspection
          </h1>
          <p className="text-sm text-grey mt-2">
            24 Megapixel architectural tile scan rendered via Deep Zoom image pyramid.
          </p>
        </div>

        <div className="border border-stone-dark shadow-2xl overflow-hidden">
          <DeepZoomViewer
            tileSource="/media/zoom/test_24mp.dzi"
            fallbackSrc="/media/sizes/test_24mp_source_800w.webp"
            className="w-full h-[600px]"
          />
        </div>
      </div>
    </div>
  )
}
