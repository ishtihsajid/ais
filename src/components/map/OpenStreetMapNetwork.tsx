'use client'

import React, { useEffect, useRef, useState } from 'react'
import rawShowrooms from '@/data/showrooms.json'

interface Showroom {
  id: string | number
  name: string
  tier: string
  division: string
  district: string
  thana?: string
  address: string
  phone: string
  hours: string
  latitude: number
  longitude: number
  mapLink?: string | null
}

interface OpenStreetMapNetworkProps {
  selectedDivision?: string
  activeShowroom?: any
  onSelectShowroom?: (showroom: any) => void
  locale?: string
  className?: string
}

// Divisional center coordinates and optimal zoom levels for OpenStreetMap
const DIVISION_COORDS: Record<string, { lat: number; lng: number; zoom: number }> = {
  all: { lat: 23.8103, lng: 90.4125, zoom: 7 },
  dhaka: { lat: 23.8103, lng: 90.4125, zoom: 9 },
  chattogram: { lat: 22.3569, lng: 91.7832, zoom: 8 },
  sylhet: { lat: 24.8949, lng: 91.8687, zoom: 9 },
  rajshahi: { lat: 24.3636, lng: 88.6241, zoom: 9 },
  khulna: { lat: 22.8456, lng: 89.5403, zoom: 9 },
  barishal: { lat: 22.7010, lng: 90.3535, zoom: 9 },
  rangpur: { lat: 25.7439, lng: 89.2752, zoom: 9 },
  mymensingh: { lat: 24.7471, lng: 90.4203, zoom: 9 },
}

// Meghnaghat Mother Plant Origin
const PLANT_ORIGIN = {
  id: 'meghnaghat-plant',
  name: 'Fresh Ceramics Meghnaghat Mother Plant',
  nameBn: 'ফ্রেশ সিরামিকস মেঘনাঘাট মাদার প্ল্যান্ট',
  tier: 'mother_plant',
  division: 'Dhaka',
  district: 'Narayanganj',
  thana: 'Sonargaon',
  address: 'Sonargaon, Narayanganj — 100% Surface Water & Zero Black Smoke Facility',
  addressBn: 'সোনারগাঁ, নারায়ণগঞ্জ — শতভাগ সারফেস ওয়াটার ও ধোঁয়াহীন গ্রিন কারখানা',
  phone: '16595',
  hours: 'Sat - Thu: 8:00 AM - 6:00 PM',
  latitude: 23.60,
  longitude: 90.60,
  mapLink: 'https://maps.google.com/?q=Fresh+Ceramics+Plant+Meghnaghat',
}

export function OpenStreetMapNetwork({
  selectedDivision = 'all',
  activeShowroom,
  onSelectShowroom,
  locale = 'en',
  className = '',
}: OpenStreetMapNetworkProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<Map<string | number, any>>(new Map())
  const [mapLoaded, setMapLoaded] = useState(false)

  const isBn = locale === 'bn'

  useEffect(() => {
    let isMounted = true

    const loadLeafletMap = async () => {
      if (!mapContainerRef.current) return

      try {
        const L = (await import('leaflet')).default
        if (!isMounted || !mapContainerRef.current) return

        // If map already exists, remove it before reinitializing
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove()
          mapInstanceRef.current = null
        }

        // Initialize Leaflet Map over Bangladesh
        const map = L.map(mapContainerRef.current, {
          center: [23.8103, 90.4125],
          zoom: 7,
          minZoom: 6,
          maxZoom: 18,
          zoomControl: false,
          scrollWheelZoom: false, // Prevents scroll-wheel trap when scrolling document
          attributionControl: true,
        })

        // Add standard OpenStreetMap tiles
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
        }).addTo(map)

        // Add top-right zoom controls
        L.control.zoom({ position: 'topright' }).addTo(map)

        // Custom pointer icon creators
        const createFlagshipPin = (name: string) =>
          L.divIcon({
            className: 'osm-flagship-pointer',
            html: `
              <div style="position:relative;display:flex;align-items:center;justify-content:center;width:34px;height:34px;cursor:pointer;">
                <div style="position:absolute;width:34px;height:34px;border-radius:50%;background:#E30613;opacity:0.35;animation:ping 2s cubic-bezier(0,0,0.2,1) infinite;"></div>
                <div style="width:22px;height:22px;border-radius:50%;background:#E30613;border:2.5px solid #FFFFFF;box-shadow:0 3px 10px rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-weight:bold;font-size:11px;">
                  ★
                </div>
              </div>
            `,
            iconSize: [34, 34],
            iconAnchor: [17, 17],
            popupAnchor: [0, -17],
          })

        const createShowroomPin = (isSelected: boolean) =>
          L.divIcon({
            className: 'osm-showroom-pointer',
            html: `
              <div style="width:${isSelected ? '18px' : '13px'};height:${isSelected ? '18px' : '13px'};border-radius:50%;background:${isSelected ? '#FFFFFF' : '#E30613'};border:${isSelected ? '3px solid #E30613' : '2px solid #FFFFFF'};box-shadow:0 2px 6px rgba(0,0,0,0.45);cursor:pointer;transition:transform 0.2s;"></div>
            `,
            iconSize: [isSelected ? 18 : 13, isSelected ? 18 : 13],
            iconAnchor: [isSelected ? 9 : 6.5, isSelected ? 9 : 6.5],
            popupAnchor: [0, isSelected ? -9 : -6.5],
          })

        const createPlantPin = () =>
          L.divIcon({
            className: 'osm-plant-pointer',
            html: `
              <div style="position:relative;display:flex;align-items:center;justify-content:center;width:38px;height:38px;cursor:pointer;">
                <div style="position:absolute;width:38px;height:38px;border-radius:50%;background:#1E3A8A;opacity:0.4;animation:pulse 1.8s infinite;"></div>
                <div style="width:24px;height:24px;border-radius:50%;background:#1E3A8A;border:2.5px solid #60A5FA;box-shadow:0 3px 10px rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-size:12px;">
                  🏭
                </div>
              </div>
            `,
            iconSize: [38, 38],
            iconAnchor: [19, 19],
            popupAnchor: [0, -19],
          })

        const markers = new Map<string | number, any>()

        // 1. Add Meghnaghat Mother Plant Pointer
        const plantMarker = L.marker([PLANT_ORIGIN.latitude, PLANT_ORIGIN.longitude], {
          icon: createPlantPin(),
          title: PLANT_ORIGIN.name,
        }).addTo(map)

        plantMarker.bindPopup(`
          <div style="font-family:sans-serif;min-width:210px;padding:4px;">
            <span style="display:inline-block;padding:2px 6px;background:#1E3A8A;color:#FFFFFF;font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">
              ${isBn ? 'মাদার প্ল্যান্ট' : 'Mother Plant Origin'}
            </span>
            <h4 style="font-size:13px;font-weight:bold;margin:0 0 4px 0;color:#18181B;">
              ${isBn ? PLANT_ORIGIN.nameBn : PLANT_ORIGIN.name}
            </h4>
            <p style="font-size:11px;color:#52525B;margin:0 0 8px 0;line-height:1.4;">
              ${isBn ? PLANT_ORIGIN.addressBn : PLANT_ORIGIN.address}
            </p>
            <a href="${PLANT_ORIGIN.mapLink}" target="_blank" rel="noopener noreferrer" style="display:inline-block;color:#E30613;font-size:11px;font-weight:bold;text-decoration:none;">
              ${isBn ? 'গুগল ম্যাপে দিকনির্দেশনা দেখুন →' : 'Get Directions on Google Maps →'}
            </a>
          </div>
        `)

        plantMarker.on('click', () => {
          if (onSelectShowroom) {
            onSelectShowroom(PLANT_ORIGIN)
          }
        })
        markers.set(PLANT_ORIGIN.id, plantMarker)

        // 2. Add all Showrooms Pointers
        const showrooms = rawShowrooms as Showroom[]
        showrooms.forEach((sh) => {
          if (!sh.latitude || !sh.longitude) return

          const isFlagship = sh.tier === 'flagship'
          const icon = isFlagship ? createFlagshipPin(sh.name) : createShowroomPin(false)

          const marker = L.marker([sh.latitude, sh.longitude], {
            icon,
            title: sh.name,
          }).addTo(map)

          const tierLabel = isFlagship
            ? (isBn ? 'ফ্ল্যাগশিপ সেন্টার' : 'Flagship Display Centre')
            : (isBn ? 'এক্সক্লুসিভ শোরুম' : 'Exclusive Showroom')

          marker.bindPopup(`
            <div style="font-family:sans-serif;min-width:220px;padding:4px;">
              <span style="display:inline-block;padding:2px 6px;background:${isFlagship ? '#E30613' : '#454548'};color:#FFFFFF;font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">
                ${tierLabel}
              </span>
              <h4 style="font-size:13px;font-weight:bold;margin:0 0 4px 0;color:#18181B;">
                ${sh.name}
              </h4>
              <p style="font-size:11px;color:#52525B;margin:0 0 6px 0;line-height:1.4;">
                ${sh.address}
              </p>
              <div style="font-size:11px;color:#71717A;margin-bottom:8px;">
                📞 <a href="tel:${sh.phone}" style="color:#18181B;font-weight:bold;text-decoration:none;">${sh.phone}</a> | 🕒 ${sh.hours}
              </div>
              <div style="display:flex;gap:12px;font-size:11px;">
                <a href="${sh.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sh.name + ' ' + sh.address)}`}" target="_blank" rel="noopener noreferrer" style="color:#E30613;font-weight:bold;text-decoration:none;">
                  ${isBn ? 'দিকনির্দেশনা →' : 'Directions →'}
                </a>
                <a href="https://wa.me/8801700112233?text=${encodeURIComponent(`Inquiring about Fresh Ceramics stock at ${sh.name}`)}" target="_blank" rel="noopener noreferrer" style="color:#16A34A;font-weight:bold;text-decoration:none;">
                  WhatsApp
                </a>
              </div>
            </div>
          `)

          marker.on('click', () => {
            if (onSelectShowroom) {
              onSelectShowroom(sh)
            }
          })

          markers.set(sh.id, marker)
        })

        mapInstanceRef.current = map
        markersRef.current = markers
        setMapLoaded(true)
      } catch (err) {
        console.error('Failed to load OpenStreetMap Leaflet:', err)
      }
    }

    loadLeafletMap()

    return () => {
      isMounted = false
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [isBn])

  // Handle Division Camera Pan / Zoom
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || !mapLoaded) return

    const target = DIVISION_COORDS[selectedDivision?.toLowerCase()] || DIVISION_COORDS.all
    map.flyTo([target.lat, target.lng], target.zoom, {
      duration: 1.2,
      easeLinearity: 0.25,
    })
  }, [selectedDivision, mapLoaded])

  // Handle Active Showroom Focus & Popup
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || !mapLoaded || !activeShowroom) return

    const lat = activeShowroom.latitude || activeShowroom.lat
    const lng = activeShowroom.longitude || activeShowroom.lng
    if (!lat || !lng) return

    map.flyTo([lat, lng], 13, {
      duration: 1.0,
      easeLinearity: 0.25,
    })

    const marker = markersRef.current.get(activeShowroom.id)
    if (marker) {
      marker.openPopup()
    }
  }, [activeShowroom, mapLoaded])

  const handleResetView = () => {
    const map = mapInstanceRef.current
    if (!map) return
    map.flyTo([23.8103, 90.4125], 7, { duration: 1.0 })
  }

  const handleFocusPlant = () => {
    const map = mapInstanceRef.current
    if (!map) return
    map.flyTo([PLANT_ORIGIN.latitude, PLANT_ORIGIN.longitude], 12, { duration: 1.0 })
    const marker = markersRef.current.get(PLANT_ORIGIN.id)
    if (marker) marker.openPopup()
    if (onSelectShowroom) onSelectShowroom(PLANT_ORIGIN)
  }

  return (
    <div className={`relative w-full h-full bg-[#E5E3DF] overflow-hidden ${className}`}>
      {/* Real OpenStreetMap Leaflet DOM mount */}
      <div ref={mapContainerRef} className="w-full h-full z-0 select-none" />

      {/* Luxury Map Overlay Controls Bar */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2">
        <button
          onClick={handleResetView}
          className="px-2.5 py-1.5 bg-black/80 hover:bg-black text-white text-[10px] font-mono uppercase tracking-wider shadow-md backdrop-blur-sm border border-white/20 transition-colors"
          title="Reset to full Bangladesh view"
        >
          {isBn ? 'সমগ্র বাংলাদেশ' : 'Whole BD'}
        </button>
        <button
          onClick={handleFocusPlant}
          className="px-2.5 py-1.5 bg-fresh-red hover:bg-ember text-white text-[10px] font-mono uppercase tracking-wider shadow-md backdrop-blur-sm border border-white/20 transition-colors flex items-center gap-1.5"
          title="Fly camera to Meghnaghat Mother Plant"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>{isBn ? 'মেঘনাঘাট প্ল্যান্ট' : 'Plant Origin'}</span>
        </button>
      </div>

      {/* Map Legend Footer */}
      <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-2.5 text-[9px] font-mono bg-black/85 text-paper px-2.5 py-1 border border-white/20 shadow-md backdrop-blur-sm">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-fresh-red border border-white" /> Flagship (2)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#E30613]" /> Exclusive (79)
        </span>
        <span className="flex items-center gap-1 text-blue-300">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" /> Meghnaghat Plant
        </span>
      </div>

      {/* Direct OpenStreetMap Link */}
      <div className="absolute bottom-2.5 right-14 z-10 text-[9px] font-mono bg-white/90 text-stone px-2 py-0.5 border border-stone/20 shadow-sm backdrop-blur-sm">
        <a
          href="https://www.openstreetmap.org/#map=7/23.81/90.41"
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone hover:text-fresh-red font-semibold"
        >
          OpenStreetMap View ↗
        </a>
      </div>
    </div>
  )
}
