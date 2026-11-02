'use client'

import React, { useState } from 'react'
import { Sun, Sparkles, Printer, FileText, Check, Copy, MessageCircle, Phone } from 'lucide-react'

interface PDPInteractiveControlsProps {
  productCode: string
  productName: string
  sizeName: string
  finishName: string
  category: 'floor' | 'wall'
  waterAbsorption?: string
  mor?: string
  sqftPerBox?: number
  isSlim?: boolean
  isHeatproof?: boolean
  locale?: string
}

export function PDPInteractiveControls({
  productCode,
  productName,
  sizeName,
  finishName,
  category,
  waterAbsorption = '< 0.5%',
  mor = '≥ 35 N/mm²',
  sqftPerBox = 15.5,
  isSlim = false,
  isHeatproof = false,
  locale = 'en',
}: PDPInteractiveControlsProps) {
  const isBn = locale === 'bn'
  const [lightMode, setLightMode] = useState<'studio' | 'raking'>('studio')
  const [showTdsModal, setShowTdsModal] = useState(false)
  const [copiedCsi, setCopiedCsi] = useState(false)

  const csiSpecification = `SECTION 09 30 00 - TILING / 09 30 13 CERAMIC TILING
MANUFACTURER: Fresh Ceramics (Meghnaghat, Sonargaon, Narayanganj, Bangladesh)
SERIES/SKU: ${productCode} - ${productName}
CATEGORY: ${category === 'floor' ? 'Floor Porcelain Tile' : 'Wall Ceramic Tile'}
NOMINAL SIZE: ${sizeName}
SURFACE FINISH: ${finishName}
MANUFACTURING STANDARD: ISO 13006 / BDS EN 14411 Annex G Group BIa
EDGE FINISH: Ultra Fine Squaring Technology (Calibrated zero-gap rectification)
WATER ABSORPTION: ${waterAbsorption} (ISO 10545-3)
BREAKING STRENGTH / MOR: ${mor} (ISO 10545-4)
SURFACE QUALITY: 98% Grade A Export Quality
CHEMICAL RESISTANCE: Resistant to household chemicals & swimming pool salts (ISO 10545-13)
THERMAL EXPANSION: Stable under tropical thermal cycling (-5°C to 65°C)`

  const copyCsiText = () => {
    navigator.clipboard.writeText(csiSpecification)
    setCopiedCsi(true)
    setTimeout(() => setCopiedCsi(false), 2000)
  }

  const printTds = () => {
    window.print()
  }

  return (
    <div className="space-y-4">
      {/* Tactile Lighting Controls Bar */}
      <div className="bg-white border border-stone/15 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-fresh-red" />
          <div>
            <span className="text-xs font-display font-bold uppercase tracking-wider text-stone block">
              {isBn ? 'আলোর দৃষ্টিকোণ পরিদর্শন' : 'Tactile Lighting Simulation'}
            </span>
            <span className="text-[10px] font-mono text-stone-dark/60">
              {lightMode === 'studio'
                ? 'Studio Light: Balanced 5500K diffuse illumination'
                : 'Raking Side-Light: 20° low grazing angle accentuating micro-relief punch'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-stone/5 p-1 border border-stone/10">
          <button
            type="button"
            onClick={() => setLightMode('studio')}
            className={`px-3 py-1.5 text-xs font-display font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              lightMode === 'studio'
                ? 'bg-white text-stone shadow-sm font-bold border border-stone/20'
                : 'text-stone-dark/70 hover:text-stone'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Studio</span>
          </button>
          <button
            type="button"
            onClick={() => setLightMode('raking')}
            className={`px-3 py-1.5 text-xs font-display font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              lightMode === 'raking'
                ? 'bg-stone text-paper shadow-sm font-bold border border-stone-dark'
                : 'text-stone-dark/70 hover:text-stone'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-fresh-red" />
            <span>Raking 20°</span>
          </button>
        </div>
      </div>

      {/* Surface Preview with Applied Light Filter */}
      <div
        className={`relative w-full aspect-[16/9] transition-all duration-500 overflow-hidden border border-stone/20 ${
          lightMode === 'raking'
            ? 'shadow-2xl brightness-105 contrast-125'
            : 'shadow-sm brightness-100 contrast-100'
        }`}
        style={{
          background:
            lightMode === 'raking'
              ? 'linear-gradient(115deg, #f4efe9 0%, #e2dad0 40%, #c4b8aa 75%, #a89d8f 100%)'
              : 'linear-gradient(135deg, #FAF8F5 0%, #EBE7E0 100%)',
        }}
      >
        {/* Procedural Micro-Texture Grid overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              lightMode === 'raking'
                ? 'repeating-linear-gradient(20deg, rgba(0,0,0,0.15) 0px, transparent 2px, transparent 16px)'
                : 'none',
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono uppercase bg-white/90 px-2 py-1 shadow-sm text-stone font-bold">
              {lightMode === 'raking' ? 'Raking Side-Light Active (20° Grazing)' : 'Studio Ambient 5500K'}
            </span>
            <span className="text-[10px] font-mono text-fresh-red font-bold bg-white/90 px-2 py-1 shadow-sm">
              Nano-Polished Mirror Matrix
            </span>
          </div>

          <div className="text-center">
            <h4 className="text-xl sm:text-2xl font-display font-light text-stone tracking-wide">
              {productName}
            </h4>
            <p className="text-xs font-mono text-stone-dark/70 mt-1">
              Micro-Relief & Specular Reflection Test
            </p>
          </div>

          <div className="flex justify-between items-end text-[10px] font-mono text-stone-dark/80">
            <span>Angle: {lightMode === 'raking' ? '20° Incident' : '90° Orthogonal'}</span>
            <span>Ultra Fine Squaring</span>
          </div>
        </div>
      </div>

      {/* Action Row: TDS Download / Print + VIP WhatsApp Concierge */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          onClick={() => setShowTdsModal(true)}
          className="py-3 px-4 bg-white border border-stone/20 hover:border-fresh-red text-stone text-xs font-display font-semibold uppercase tracking-wider text-center transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4 text-fresh-red" />
          <span>{isBn ? 'টিডিএস স্পেকশীট দেখুন' : 'View TDS Tearsheet'}</span>
        </button>

        <a
          href={`https://wa.me/8801700112233?text=${encodeURIComponent(
            `Hello Fresh Ceramics VIP Desk, I am inquiring about architectural tile ${productCode} (${productName}, ${sizeName}). Please provide showroom stock availability and sample dispatch.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-display font-semibold uppercase tracking-wider text-center transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span>VIP WhatsApp Concierge</span>
        </a>
      </div>

      {/* TDS Tearsheet Modal */}
      {showTdsModal && (
        <div className="fixed inset-0 z-50 bg-stone/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border-2 border-stone max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-fadeIn my-8">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-stone/20 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-fresh-red font-bold">
                  Technical Data Sheet (TDS)
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-stone mt-1">
                  {productName}
                </h3>
                <p className="text-xs font-mono text-stone-dark/70">
                  SKU: {productCode} • {sizeName} • {finishName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowTdsModal(false)}
                className="w-8 h-8 flex items-center justify-center border border-stone/20 text-stone hover:bg-stone hover:text-white transition-colors text-sm font-bold"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* TDS Specification Body */}
            <div className="mt-6 space-y-6 text-xs text-stone">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-mist/60 p-4 border border-stone/10">
                <div>
                  <span className="text-stone-dark/60 font-mono block text-[10px] uppercase">Water Absorption</span>
                  <span className="font-mono font-bold text-stone text-sm">{waterAbsorption}</span>
                  <span className="text-[9px] font-mono text-stone-dark/50 block">ISO 10545-3</span>
                </div>
                <div>
                  <span className="text-stone-dark/60 font-mono block text-[10px] uppercase">Modulus of Rupture</span>
                  <span className="font-mono font-bold text-stone text-sm">{mor}</span>
                  <span className="text-[9px] font-mono text-stone-dark/50 block">ISO 10545-4</span>
                </div>
                <div>
                  <span className="text-stone-dark/60 font-mono block text-[10px] uppercase">Squaring Calibre</span>
                  <span className="font-mono font-bold text-fresh-red text-sm">Ultra Fine</span>
                  <span className="text-[9px] font-mono text-stone-dark/50 block">Zero Corner Gap</span>
                </div>
                <div>
                  <span className="text-stone-dark/60 font-mono block text-[10px] uppercase">Surface Grade</span>
                  <span className="font-mono font-bold text-stone text-sm">98% Grade A</span>
                  <span className="text-[9px] font-mono text-stone-dark/50 block">Export Standard</span>
                </div>
                <div>
                  <span className="text-stone-dark/60 font-mono block text-[10px] uppercase">Slip Resistance</span>
                  <span className="font-mono font-bold text-stone text-sm">R10 / Class 2</span>
                  <span className="text-[9px] font-mono text-stone-dark/50 block">BS 7976 Pendulum</span>
                </div>
                <div>
                  <span className="text-stone-dark/60 font-mono block text-[10px] uppercase">Box Coverage</span>
                  <span className="font-mono font-bold text-stone text-sm">{sqftPerBox} sq ft</span>
                  <span className="text-[9px] font-mono text-stone-dark/50 block">~1.44 m² / Carton</span>
                </div>
              </div>

              {/* CSI MasterFormat Specifier Text Block */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[11px] font-display font-bold uppercase tracking-wider text-stone">
                    CSI MasterFormat 09 30 00 Architectural Specification
                  </span>
                  <button
                    type="button"
                    onClick={copyCsiText}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-fresh-red hover:underline font-semibold"
                  >
                    {copiedCsi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCsi ? 'Copied to Clipboard' : 'Copy CSI Clause'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-stone/5 border border-stone/15 text-[10px] font-mono text-stone-dark whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                  {csiSpecification}
                </pre>
              </div>

              {/* Plant & Assurance Note */}
              <div className="border-t border-stone/15 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-stone-dark/70 font-mono">
                <span>Origin: Meghnaghat Plant, Sonargaon, Narayanganj</span>
                <span className="text-fresh-red font-semibold">Hotline: 16595</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-stone/20 flex justify-end gap-3">
              <button
                type="button"
                onClick={printTds}
                className="px-5 py-2.5 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Tearsheet</span>
              </button>
              <button
                type="button"
                onClick={() => setShowTdsModal(false)}
                className="px-4 py-2.5 bg-stone/10 hover:bg-stone/20 text-stone text-xs font-display font-semibold uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
