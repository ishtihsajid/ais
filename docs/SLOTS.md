# Fresh Ceramics: Video and Media Slot Manifest

This document specifies every media production slot across the immersive Journey scroll narrative for the corporate AV and architectural video shoot, as mandated by Section 10.4 of `docs/BUILD_PLAN.md`.

All final video assets must be self-hosted, encoded via the pipeline (`H.264`, `crf 26`, `-an`, `+faststart`), and adhere to the strict performance budgets defined in Section 11.

---

## Production Standards

| Attribute | Desktop Target | Mobile Target | Keyframe Scrub Scenes |
|---|---|---|---|
| Resolution | 1280 x 720 (16:9) | 854 x 480 or Portrait Crop (9:16) | 1280 x 720 |
| Max Duration | 6 - 8 seconds loop | 6 - 8 seconds loop | 5 - 6 seconds |
| Max File Size | <= 3.5 MB | <= 1.5 MB | <= 3.0 MB |
| Keyframe Interval | Standard GOP (~250 frames) | Standard GOP (~250 frames) | Keyframe on every frame (`-g 1`) |
| Audio | Muted / No audio track (`-an`) | Muted / No audio track (`-an`) | Muted (`-an`) |
| Color / Grading | Warm ember & stone lighting | High-contrast mobile legibility | Warm kiln glow / dawn light |

---

## Journey Media Slots (Chapters 1 - 10)

### Chapter 1: Dawn (`dawn`)
- **Theme**: Dark (`--ember` to `--stone`)
- **Role**: Hero arrival at first light over Meghnaghat
- **Desktop Specification**: 1280x720, 8s loop, <= 3.5 MB
- **Mobile Specification**: 854x480 or 720x1280 vertical crop, <= 1.5 MB
- **Scrub Required**: Yes (`-g 1` keyframed variant for scroll-scrubbed descent)
- **Suggested Shot**: Drone aerial descent over the Meghnaghat factory rooftop at dawn. Sunlight flares across the fully covered solar panel installation, gliding gently from scale 1.15 down to 1.0.

### Chapter 2: Ground (`ground`)
- **Theme**: Dark to light transition across 6 panels
- **Role**: The 6 responsible plant choices
- **Panels**:
  1. *Use of surface water*: Crisp cinematography of Meghnaghat river surface water intake and biological clarifier ponds.
  2. *No black smoke*: Low-angle shot of crystal-clear stack emissions against spotless morning sky.
  3. *Smart heat control*: Thermal camera view or shimmering clean heat exchangers capturing exhaust energy.
  4. *Dust free workplace*: Pristine, automated tile pressing floor with ambient negative pressure air scrubbing.
  5. *Use of solar energy*: Glint of sunbeams glancing across the massive rooftop solar photovoltaic arrays.
  6. *Natural light design*: Sunlit factory clerestory windows illuminating the clean packing lanes.

### Chapter 3: Fire (`fire`)
- **Theme**: Dark ember (`--ember` to `--stone`)
- **Role**: Craft, temperature and automated precision
- **Desktop Specification**: 1280x720, 6s loop, <= 3.0 MB
- **Scrub Required**: Yes (`-g 1` keyframed variant)
- **Suggested Shot**: Golden kiln glow, red hot radiant heat, macro view of digital printing heads depositing nano glaze, followed by country's largest polishing line and optical sorting scanners counting 14 global tests.

### Chapter 4: Surface (`surface`)
- **Theme**: Light (`--paper` and `--mist`)
- **Role**: Full-screen tile mosaic assembly and Double Charge showcase
- **Media**: Real high-resolution tile surface scans (60x120, 80x80, 60x60) rendered in an interactive CSS/WebGL mosaic, zooming smoothly into Double Charge stone strata.

### Chapter 5: Lighter and Cooler (`lighter`)
- **Theme**: Light
- **Role**: Sustainable tile innovations (Slim Tiles and Heatproof Tiles)
- **Media**: Split-screen technical animation and macro cross-section demonstration showing reduced dead load (Toyota Corolla equivalence) and thermal barrier heat rejection.

### Chapter 6: Reach (`reach`)
- **Theme**: Dark to light
- **Role**: Nationwide logistical reach
- **Media**: The iconic boat carrying cartons across water ("Crafting tales of aesthetics beyond the boundaries"), cut to modern logistics fleet, and animated SVG vector map of Bangladesh lighting up 79 exclusive showrooms.

### Chapter 7: Hands (`hands`)
- **Theme**: Dark
- **Role**: The tile fitters ("নান্দনিকতার কারিগর") and master installation
- **Desktop Specification**: 1280x720, 6s loop, <= 3.0 MB
- **Suggested Shot**: Macro extreme close-up of skilled hands buttering mortar, laying tiles with precision spacers, leveling with rubber mallets, showing zero corner lip or gap.

### Chapter 8: Home (`home`)
- **Theme**: Light
- **Role**: Living with Fresh tiles; a day in a home
- **Media**: Architectural interior cinematography panning across Living Room, Bathroom, Kitchen, Commercial Lobby, and Outdoor Terrace with interactive tile hotspots.

### Chapter 9: Beyond the Tile (`beyond`)
- **Theme**: Light
- **Role**: Community, fitter meets, knowledge series, CSR
- **Media**: Warm documentary photography and b-roll of nationwide fitter gatherings, training masterclasses, and community support initiatives.

### Chapter 10: Horizon (`horizon`)
- **Theme**: Dark to light
- **Role**: Dawn again, closing the aesthetic circle
- **Desktop Specification**: 1280x720, 6s loop, <= 3.0 MB
- **Suggested Shot**: First morning light washing over a polished tile living room floor in a finished home, echoing the factory sunrise from Chapter 1.
