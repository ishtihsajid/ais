import fs from 'fs'
import path from 'path'
import * as d3Geo from 'd3-geo'

const raw = JSON.parse(fs.readFileSync('src/data/bangladesh_divisions.json', 'utf8'))
const showrooms = JSON.parse(fs.readFileSync('src/data/showrooms.json', 'utf8'))

const width = 600
const height = 750
const projection = d3Geo.geoMercator().fitExtent([[25, 25], [width - 25, height - 25]], raw)
const pathGen = d3Geo.geoPath().projection(projection)

function simplifyCoords(ring, tolerance = 0.006) {
  if (ring.length <= 4) return ring
  const res = [ring[0]]
  let prev = ring[0]
  for (let i = 1; i < ring.length - 1; i++) {
    const pt = ring[i]
    const dx = pt[0] - prev[0]
    const dy = pt[1] - prev[1]
    if (Math.hypot(dx, dy) >= tolerance) {
      res.push(pt)
      prev = pt
    }
  }
  res.push(ring[ring.length - 1])
  return res
}

const divisionNamesBn = {
  'Barisal': 'বরিশাল',
  'Chittagong': 'চট্টগ্রাম',
  'Dhaka': 'ঢাকা',
  'Khulna': 'খুলনা',
  'Mymensingh': 'ময়মনসিংহ',
  'Rajshahi': 'রাজশাহী',
  'Rangpur': 'রংপুর',
  'Sylhet': 'সিলেট'
}

const divisionSlugs = {
  'Barisal': 'barishal',
  'Chittagong': 'chattogram',
  'Dhaka': 'dhaka',
  'Khulna': 'khulna',
  'Mymensingh': 'mymensingh',
  'Rajshahi': 'rajshahi',
  'Rangpur': 'rangpur',
  'Sylhet': 'sylhet'
}

const divisions = raw.features.map(f => {
  const geom = f.geometry
  let newCoords
  if (geom.type === 'Polygon') {
    newCoords = geom.coordinates.map(r => simplifyCoords(r, 0.006))
  } else if (geom.type === 'MultiPolygon') {
    newCoords = geom.coordinates.map(poly => poly.map(r => simplifyCoords(r, 0.006)))
  }

  const simplifiedFeature = { ...f, geometry: { ...geom, coordinates: newCoords } }
  const name = f.properties.ADM1_EN
  const d = pathGen(simplifiedFeature).replace(/(\.\d{1})\d+/g, '$1')
  
  // Calculate centroid
  let centroid = pathGen.centroid(simplifiedFeature)
  if (!centroid || isNaN(centroid[0]) || isNaN(centroid[1])) {
    // fallback if centroid is NaN (e.g. Dhaka)
    centroid = [295, 360]
  }

  return {
    name,
    nameBn: divisionNamesBn[name] || name,
    slug: divisionSlugs[name] || name.toLowerCase(),
    pcode: f.properties.ADM1_PCODE,
    d,
    centroid: [Math.round(centroid[0]), Math.round(centroid[1])]
  }
})

// Specific manual centroid tweaks for perfect label placement
const labelOffsets = {
  'Barisal': [295, 520],
  'Chittagong': [450, 470],
  'Dhaka': [300, 360],
  'Khulna': [185, 465],
  'Mymensingh': [305, 230],
  'Rajshahi': [155, 270],
  'Rangpur': [160, 115],
  'Sylhet': [445, 245]
}

divisions.forEach(d => {
  if (labelOffsets[d.name]) {
    d.centroid = labelOffsets[d.name]
  }
})

// Project Showrooms
const projectedShowrooms = showrooms.map(s => {
  const [x, y] = projection([s.longitude, s.latitude])
  return {
    ...s,
    x: Math.round(x * 10) / 10,
    y: Math.round(y * 10) / 10,
    isFlagship: s.tier === 'flagship'
  }
})

// Project Meghnaghat Plant Origin
const [plantX, plantY] = projection([90.60, 23.60])
const plantOrigin = {
  id: 'meghnaghat-plant',
  name: 'Meghnaghat Mother Plant',
  nameBn: 'মেঘনাঘাট মাদার প্ল্যান্ট',
  tier: 'mother_plant',
  division: 'Dhaka',
  district: 'Narayanganj',
  address: 'Sonargaon, Narayanganj — 100% Surface Water & Zero Black Smoke',
  addressBn: 'সোনারগাঁ, নারায়ণগঞ্জ — শতভাগ সারফেস ওয়াটার ও ধোঁয়াহীন কারখানা',
  phone: '16595',
  latitude: 23.60,
  longitude: 90.60,
  x: Math.round(plantX * 10) / 10,
  y: Math.round(plantY * 10) / 10
}

const output = {
  viewBox: `0 0 ${width} ${height}`,
  width,
  height,
  divisions,
  showrooms: projectedShowrooms,
  plantOrigin
}

fs.writeFileSync('src/data/bangladesh_svg_map.json', JSON.stringify(output, null, 2))
console.log('Successfully generated src/data/bangladesh_svg_map.json!')
