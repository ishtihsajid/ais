# Fresh Ceramics Website: Master Build Plan

Audience: the coding agent that builds the site, and the owner who reviews it.
Place this file at `docs/BUILD_PLAN.md` in the repository. Place the companion `instructions.md` at the repository root.

Read the whole file before writing code. Where this plan and any earlier teardown or experience plan disagree, this plan wins.

---

## 0. How to work

1. Build in the phases of section 13, in order. Each phase ends with a gate. Do not start the next phase until the gate passes.
2. At the end of each phase, save desktop (1440x900) and phone (390x844) screenshots and a recorded scroll video of the Journey into `docs/checkpoints/phaseN/`, so the owner can review without running anything.
3. Never invent a fact. Every number, superlative and claim on the site must appear in section 3 or come from the CMS. If copy needs a fact that is missing, insert a visible marker such as `[OWNER TO SUPPLY: detail]` and list it in `docs/OPEN_ITEMS.md`.
4. Ask before installing anything outside the project folder. Packages through npm are allowed without asking.
5. The owner is not a developer and is prone to skipping steps. Every routine action (start, stop, backup, import) must be one double click or one short command, and every failure must print a plain sentence saying what to do next.

---

## 1. Mission

Build the website of Fresh Ceramics, a Bangladeshi tile brand. It has two faces that share one codebase and one admin panel.

**The Journey** is the home page. It is an immersive, scroll driven narrative in which all chapter holds within a full screen scene in motion while the story advances, one scene to the next scene without any change or breaks, the whole journey should feel like one, maybe compared to a person immersing or entering a cave going through the whole journey and then coming out on the other end finishing it. The whole narrative is built around one theme: a brand that stands for superior quality and strong sustainability values, and a tile that is made, carried, laid and lived with responsibly.

**The Catalogue** is everything else: products, spaces, showrooms, downloads, learning, enquiries. It is fast, conventional and complete. Every page type found on akijceramics.net exists here, in better form.

The two faces are always one tap apart through a persistent control in the header.

Tagline: "A Fresh Start to an Aesthetic Life". The Journey begins at dawn over the factory and ends at dawn in a home. The circle is the story.

---

## 2. Non negotiables

1. Custom code only. No theme, template or page builder.
2. No paid service and no new account. Everything runs on the owner's laptop and is backed up to a private GitHub repository.
3. Self hosted media only. No YouTube, Vimeo, external CDN, external font service or analytics at runtime. The single permitted external call is map tiles in the showroom locator (section 8).
4. The visualizer is out of scope now. Reserve its route, menu slot and data hooks (section 8).
5. Logo rules from the brand deck are binding (section 6.3).
6. No flat black UI backgrounds. RAK's colour is black and the brand deck forbids matching competitor colours (section 6.1).
7. Motion must degrade gracefully (section 11). Many visitors use mid range Android phones on mobile data.
8. Every editable thing is editable in the admin panel without code (section 9). Only the scroll choreography is fixed in code.
9. The site must run later on a server managed by the Group's IT team, so the build must be portable (section 12).

---

## 3. Facts register

Confirmed by the owner. These are the only factual claims the site may make. Wording is binding.

### 3.1 Company and factory

| Fact | Binding wording or value |
|---|---|
| Tile plant established | 2021 |
| Factory location | Meghnaghat, Sonargaon, Narayanganj, Bangladesh |
| Annual production | 18.6 million square metres of wall and floor tiles |
| Sales position | "Highest selling tiles brand in Bangladesh every year since 2023." Do not write "4 years" until 2026 has closed. Store as an editable claim with an as of date |
| Brand awards | Do not make "best brand" claims. A competitor holds national best brand awards. Sales leadership and brand awards are different claims |
| Hotline | 16595 (seen in brand creatives; the owner confirms at launch) |
| First | First manufacturer in Bangladesh to produce a full line or all three sizes of Double Charge tiles: 60x60, 80x80 and 60x120 cm |

### 3.2 Technology and quality (lab tested and verified by the owner)

Digital printed tile unit; cutting edge automated technology; the largest polishing line in the country; nano technology in mirror polished tiles; the biggest production line under a single shade in the country; fully covered solar power unit on the production shed roof; machinery from the USA, Germany, Italy and China; raw materials and colours from China, Malaysia, Thailand, Taiwan, India and Spain; a dedicated QC and sort packing team; Ultra Fine Squaring Technology so no corner gaps; 14 global standard tests in the factory; 98% A grade export quality; delivery within 4 days from authorised and exclusive dealer showrooms (upon stock availability); stable pricing; no shade variance.

Measurement standards named: length and width in cm, water absorption, modulus of rupture (MOR), resistance to chemicals.

### 3.3 Six responsible choices at the plant

1. Use of surface water
2. No black smoke
3. Smart heat control
4. Dust free workplace
5. Use of solar energy
6. Natural light design

Use exactly these six titles. Detail lines under them come from the factory team through the CMS. Until supplied, show `[OWNER TO SUPPLY: detail]` in development and nothing in production.

### 3.4 Slim Tiles and Heatproof Tiles

Slim Tiles, from showroom panels:

| Variant | Conventional weight | Slim weight | Reduction | 5,000 sq ft floor | 10 storey building | Car equivalence |
|---|---|---|---|---|---|---|
| A | 21.83 kg per sq m | 16.38 kg per sq m | 25% | 2,530 kg | 25 MT | 19 Toyota Corolla cars |
| B | 25.04 kg per sq m | 17.83 kg per sq m | 29% | 3,350 kg | 33.5 MT | 25 Toyota Corolla cars |

Other Slim claims: lighter tiles mean less gravitational force, less stress on walls, less load on beams, less risk of detachment (critical in earthquake zones), renovation over old tiles, less fatigue for workers, contribution to LEED credits and green certification, lower embodied carbon, reduced dead load.

Heatproof Tiles: up to 30% energy cost saving; year round thermal barrier (keeps heat out in summer, holds warmth in winter); high insulation property; less strain on air conditioning and heating systems; reduces carbon footprint; aligned with UN Sustainable Development Goal 11.

The owner confirms these are lab tested. No test reports are needed on the site.

### 3.5 Portfolio (the latest and true SKU matrix)

Floor tiles, 204 designs:

| Size cm | Double Charge | Mirror Polished | Matt | Zainamaj | Digital Porcelain | High Gloss | Total |
|---|---|---|---|---|---|---|---|
| 60x120 | 3 | 19 | 3 | 2 | | | 27 |
| 80x80 | 3 | 19 | | | | | 22 |
| 60x60 | 8 | 24 | 5 | 4 | | | 41 |
| 40x40 | | | | | 24 | 20 | 44 |
| 30x30 | | | | | 64 | | 64 |
| 20x120 | | | 6 | | | | 6 |

Wall tiles, 181 designs:

| Size cm | Mattestic | DewDrop | Glossy | Matt | Rustic | Candy | Glossy Punch | Total |
|---|---|---|---|---|---|---|---|---|
| 30x60 | 3 | 2 | 12 | 4 | 2 | | 20 | 43 |
| 30x50 | | | 9 | 6 | | 4 | 6 | 25 |
| 30x45 | | | 13 | | | | 8 | 21 |
| 25x40 | | | 9 | | | | 6 | 15 |
| 20x30 | | | 44 | 2 | 4 | | 27 | 77 |

Total 385 designs. Floor has six sizes, wall has five. Size convention in the trade: wall tiles are written height by width (30(H) x 60(W)), floor tiles width by height (60(W) x 120(H)). Store width and height as separate numeric fields and never parse a size string.

### 3.6 Network

79 exclusive showrooms. 2 own operated flagship display centres. More than 120 authorised dealers (figure from the brand deck; confirm at launch). Every number shown on the site comes from the `Stats` global in the CMS, never from code.

### 3.7 Audience (for tone, not for display)

Socio economic classes A and B, age 30 and above, urban and semi urban Bangladesh. Four personas: Upper Class, Upper Middle Class, Aspiring Upper Class, Semi Urban Dwellers. Influencers: architects, interior designers, fitters, engineers, family members, social media groups. Semi urban buyers rely on local retailers and fitters and are not an ideal social media audience, so the site must be light and fully usable in Bengali.

### 3.9 Bengali lines

| Use | Text | Status |
|---|---|---|
| Tagline | নান্দনিক জীবনের ফ্রেশ সূচনা | Seen on a brand creative. Owner to confirm |
| Sales line | বিক্রয়ে আজও দেশসেরা টাইলস ব্র্যান্ড | Seen on a brand creative. Owner to confirm. Reword to match the claim in 3.1 |
| Fitter community | নান্দনিকতার কারিগর | Seen on fitter meet creatives. English gloss "Craftsmen of Aesthetics" is a reading, owner to confirm |

### 3.10 Copy rules

1. No claim beyond this register. Poetic lines are allowed only when they assert nothing measurable.
2. English copy uses no em dashes, no hype adjectives and no rhyming or mirrored sentence pairs.
3. Every English string has an optional Bengali translation. When Bengali is missing, show English.
4. Superlatives are stored as claims in the CMS with an as of date, so they can be updated without code.

---

## 4. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router), React, TypeScript |
| CMS and admin | Payload CMS installed inside the same Next.js app, served at `/admin` |
| Database | SQLite through the official `@payloadcms/db-sqlite` adapter, one file at `data/fresh.db` |
| Media storage | Local disk at `media/`, served by the app |
| Styling | Tailwind CSS plus CSS variables for the tokens in section 6 |
| Scroll and motion | GSAP with ScrollTrigger and SplitText, Lenis for smooth scroll on desktop |
| Image zoom | OpenSeadragon with Deep Zoom tiles generated by `sharp` |
| Maps | Leaflet with OpenStreetMap tiles; `d3-geo` for the Journey's Bangladesh map |
| Search | MiniSearch built from published products at request time |
| Media processing | `sharp` for images, `ffmpeg-static` for video |
| Tests | Playwright for smoke tests and recordings, axe for accessibility, Lighthouse for performance |

Verified facts behind the choice:

* Payload ships an official SQLite adapter under the MIT licence, and installs directly into a Next.js app. Node and Next.js version requirements differ between Payload releases, so do not hand pin versions. Run `npx create-payload-app`, choose the SQLite option, accept the Next.js version it selects, read the installation page of the version installed, and check the Node version against it. If the installed Node is too old, stop and ask the owner to install the current Node LTS.
* GSAP and all its plugins, including ScrollTrigger and SplitText, are free for commercial use under the GreenSock standard no charge licence. Install from the public `gsap` package. Do not create an auth token file or use any private registry. The licence has a short list of restrictions, so read `gsap.com/standard-license` once and record the result in `docs/LICENCES.md`.
* SQLite is a single file, so it needs one server process and a persistent disk. That suits a brand site with a handful of editors. If the Group's IT team requires Postgres, Payload offers a Postgres adapter, so the move is a configuration change plus a data migration. Keep all queries inside Payload's API so that swap stays possible.

Fonts, all self hosted as subsetted WOFF2:

* Latin: Montserrat (listed in the brand deck, open licence), weights 300 to 700
* Bengali: Noto Sans Bengali (open licence). Hind Siliguri as the similar fallback. The owner also likes Ruposhi Bangla; use it only after its licence and web font availability are confirmed and recorded in `docs/LICENCES.md`
* The logo wordmark is artwork, never a font

---

## 5. Repository layout and scripts

```
Fresh Ceramics/
  instructions.md
  docs/                      BUILD_PLAN.md, OPEN_ITEMS.md, LICENCES.md, PLACEHOLDERS.md, DEPLOY.md, checkpoints/
  assets/
    brand/                   logo SVG and PNG files, brand PDF
    inbox/                   owner drops files here (products, interiors, catalogs, video)
  data/                      fresh.db (ignored by git)
  media/                     uploads and generated sizes (ignored by git)
  content-export/            JSON export of all text content (committed)
  scripts/                   placeholders, import, backup, export, check
  src/
    app/(site)/              public pages, with a [locale] segment (en, bn)
    app/(payload)/           Payload admin and API
    collections/  globals/  blocks/
    journey/                 engine, scenes, choreography, config
    components/  lib/  styles/
  Start_Fresh.bat
  Backup_Fresh.bat
```

Required one click files:

* `Start_Fresh.bat`: changes to its own folder with `cd /d "%~dp0"`, opens `http://localhost:3100` in the browser, then runs `npm run dev`
* `Backup_Fresh.bat`: runs `npm run backup`

Required npm scripts: `dev`, `build`, `start`, `seed`, `placeholders`, `import:products`, `import:showrooms`, `backup`, `export:content`, `check` (type check, lint, smoke tests).

First run: `npm run seed` creates an admin user from `ADMIN_EMAIL` and `ADMIN_PASSWORD` in an uncommitted `.env`, creates all reference data (finishes, sizes, spaces), and generates placeholder content. It prints one plain sentence reminding the owner to change the password.

---

## 6. Brand and design system

### 6.1 Colour

Logo colours are fixed (CMYK in the deck: Deep Grey K63, Grey K30, Red M100 Y100). For all other uses any shade of the three may be used, provided it does not match a competitor.

Provisional screen values. The agent must sample the red from the vector logo if available and update the tokens:

```css
:root {
  --fresh-red: #E30613;     /* provisional, sample from logo vector */
  --deep-grey: #5E5E5E;     /* from K63 */
  --grey: #B3B3B3;          /* from K30 */
  --ember: #3B0A10;         /* darkest allowed ground, a shade of red */
  --ember-soft: #5A1219;
  --stone: #454548;         /* darkest allowed grey ground */
  --mist: #F3F3F3;
  --paper: #FFFFFF;
  --text: #4A4A4A;
}
```

Rules:

* The darkest background anywhere is `--ember` or `--stone`. Never `#000` and never a near black.
* Competitor colours to avoid as flat colour fields: orange, dark slate blue, lime green, royal blue, near black, magenta, bronze brown. Photography is not restricted by this rule, but no graphic panel, button or background may use those hues. The owner should confirm this reading with the brand team.
* Dark scenes are built from ember and stone, lit warm. Light scenes use paper and mist with deep grey text.

### 6.2 Typography and layout

* Display: Montserrat 300 for the large line, 600 for the emphasised words (emphasis words may be red). Fluid scale: `clamp(2.4rem, 6vw, 6.5rem)` for hero titles, `clamp(1.6rem, 3.2vw, 3rem)` for chapter titles, 1rem to 1.125rem for body with line height 1.6.
* Bengali text uses Noto Sans Bengali with line height 1.75 and the same sizes plus 6%.
* Small caps style kickers: 0.75rem, letter spacing 0.18em, uppercase for English only.
* Corners are square everywhere (radius 0). It echoes the squared tile and the "Fine Squaring" idea in the logo rationale.
* 12 column grid, 8 pixel base unit, generous space. Full bleed imagery.
* Every image and video has a required alt text or an explicit "decorative" flag.

### 6.3 Logo rules (from the brand deck)

1. The logo is a combination mark. Never redraw it. Use the supplied SVG or PNG.
2. Light grounds use the full colour logo. Red, dark grey and mid grey grounds use the all white logo.
3. Never place the logo on a busy, vague or complex background.
4. Bengali versions exist (ফ্রেশ সিরামিকস). The Bengali locale shows the Bengali lockup.
5. Alternative wordmark only layouts enlarge the word "Ceramics" by 40 to 45 percent.

Implementation: the header logo always sits on a solid red plate with the white logo, so it is legal over any video. The footer uses the full colour logo on paper. No chapter scene may place a logo directly on moving imagery.

### 6.4 Brand motifs

* **The window.** The logo's tilted squares are a window onto a new horizon. Chapter transitions are a "window wipe": the next scene is revealed through a slightly rotated square that grows from the centre of the screen to full size, using an SVG `clipPath` animated by GSAP. Rotation about minus 12 degrees; tune to match the logo.
* **The red box.** The central red square of the logo is the progress marker. A slim vertical rail on the right edge shows ten small squares, one per chapter, filling red as the visitor advances. Clicking a square jumps to that chapter.
* **The tile grid.** Catalogue page transitions use a staggered tile grid fade.

### 6.5 Motion language

* One easing family: `power3.inOut` for transitions, `expo.out` for reveals.
* Every beat has three parts: arrive (about 0.6 time units), hold (1.0), depart (0.6). The hold is where the scene "stops in motion": the text and layout stand still while the background video keeps playing and a slow parallax drift continues. This is the effect the owner asked for. Do not skip holds.
* Parallax depth: background layer moves 0.15x scroll speed, mid layer 0.4x, foreground 0.8x.
* Text reveals use SplitText line masks. Numbers count up once per visit.
* No sound. No autoplay audio. No custom cursor.
* Respect `prefers-reduced-motion` (section 11).

---

## 7. The Journey

### 7.1 Engine specification

The Journey lives at `/` and `/bn`. Build it as a small engine so every chapter is configuration plus a choreography file.

* Content for every chapter comes from the `Journey` global in the CMS (copy, media, links). Choreography lives in `src/journey/choreography/<slug>.ts` and is code.
* Each chapter is a `<Chapter>` wrapper holding a pinned `<Scene>`. ScrollTrigger pins the scene for `pinLengthVh` viewport heights and drives one scrubbed GSAP timeline.
* Lenis smooth scroll runs on desktop only, connected with `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker`. On touch devices use native scrolling and a pin length multiplied by 0.7.
* Each chapter has a hash anchor (`#dawn`, `#ground`, and so on) for menu links and deep links.
* Media lifecycle: a chapter's video is attached when the chapter is within 1.5 screens, plays only while within 1 screen, and is paused and detached beyond 2 screens. At most two videos play at once. Preload the next chapter's poster when the current chapter passes 50 percent.
* Every chapter exposes real text in the DOM (headings, paragraphs, links) so that search engines and screen readers read the story. Visual effects are added on top.
* A skip link at the top reads "Skip to the catalogue".
* The Journey must never trap the scroll. Provide an always visible "Catalogue" control and a keyboard way to move between chapters (page down and the rail).

Chapter configuration type:

```ts
type ChapterConfig = {
  slug: string
  pinLengthVh: number              // desktop; multiply by 0.7 on touch
  theme: 'dark' | 'light'          // decides header and rail colour
  beats: { start: number; end: number; hold: [number, number] }[]
  media: { desktopVideo?: string; mobileVideo?: string; poster: string; layers?: string[] }
}
```

Total scroll length is about 3,450 viewport heights on desktop. Keep it. The rail and chapter jumps make the length comfortable.

### 7.2 Chapter overview

| # | Slug | Chapter | Pin (vh) | Responsible thread |
|---|---|---|---|---|
| 1 | dawn | A Fresh Start | 250 | The sun on the plant roof |
| 2 | ground | Responsible before beautiful | 500 | Six choices at the plant |
| 3 | fire | Heat gives form, care gives worth | 350 | Quality that lasts |
| 4 | surface | Surfaces for every kind of life | 350 | The range, made with care |
| 5 | lighter | Lighter and cooler | 450 | Slim and Heatproof Tiles |
| 6 | reach | Within your reach | 450 | Tiles reach every town and village |
| 7 | hands | Finished by hand | 250 | The fitters who complete the work |
| 8 | home | A fresh start, room by room | 450 | The room that is lived in |
| 9 | beyond | What we owe beyond the tile | 250 | Initiatives and learning |
| 10 | horizon | Dawn again | 150 | The vision |

A short prelude plays before chapter 1: the four grey tiles of the logo turn and settle around the red square (about 1.5 seconds), skippable, never blocking the poster of chapter 1.

### 7.3 Chapter specifications

For each chapter, "Placeholder" says what to generate now. "Final media" says what the later shoot should supply (it aligns with the corporate AV shoot).

#### Chapter 1: Dawn (`dawn`, 250 vh, dark)

Purpose: arrive, set the tone, plant the sustainability thread in the first image.

Scene: an aerial view of a large factory at first light, solar panels on the roof catching the sun. The camera descends slowly toward the roof (scale 1.15 to 1.0 with a gentle vertical drift).

Beats:
1. 0 to 30 percent: the title "A Fresh Start to an Aesthetic Life" reveals by line masks. Kicker: "Meghnaghat, first light".
2. 30 to 70 percent (hold): title stands still, sun flare moves across the roof. Line: "Every surface in a home begins somewhere. Ours begins with sunlight on a rooftop in Meghnaghat."
3. 70 to 100 percent: three figures rise from the bottom edge: "Since 2021", "18.6 million sq m a year", and the claim from 3.1 ("Highest selling tiles brand in Bangladesh every year since 2023"). Window wipe into chapter 2.

Links: "Enter the Catalogue" (header), scroll cue. CMS: title, kicker, lines, three stat references to `Stats` and `Claims`.
Mobile: portrait crop of the same scene; stats stack vertically.
Placeholder: stock aerial industrial dawn if obtainable, otherwise a Ken Burns clip over a procedural sunrise still.
Final media: drone footage of the Meghnaghat plant at first light, rooftop solar in frame.

#### Chapter 2: Ground (`ground`, 500 vh, dark to light)

Purpose: the heart of the sustainability story, six choices made at the plant.

Scene: a horizontal pinned gallery of six full screen panels that slide left as the visitor scrolls. Each panel has a numeral (01 to 06), the title, a one line detail and a full bleed image whose light changes, from cool water light at 01 to warm solar light at 05 and open daylight at 06. The background colour eases from ember to paper across the six panels.

Panels (titles binding, section 3.3): 01 Use of surface water, 02 No black smoke, 03 Smart heat control, 04 Dust free workplace, 05 Use of solar energy, 06 Natural light design.

Beats: each panel arrives, holds for one beat with its image drifting, departs. The rail squares fill as normal. After panel 06 a closing line appears: "When quality and responsibility meet, the choice becomes simple." This is the first quiet hint of the vision.

Links: "See how we make responsibly" to `/sustainability`.
CMS: six `Pillar` items (title, detail, image or video, alt text).
Mobile: panels stack as full screen vertical pins with swipe free scroll.
Placeholder: six tinted stills or short loops (river light, clear sky, heat shimmer, clean workspace, solar roof, daylight through a skylight).
Final media: six short shots matching each point, filmed at the plant.

#### Chapter 3: Fire (`fire`, 350 vh, dark ember)

Purpose: craft and quality, framed as care.

Scene: a kiln glow in deep ember tones, filmed or simulated. A scrubbed video (every frame a keyframe, so scrolling plays it forward and back) shows heat building. On the left a vertical list of seven stations lights up one by one.

Stations: 1 Digital printing. 2 Automated lines. 3 Nano finish on mirror polished tiles. 4 The country's largest polishing line. 5 Ultra Fine Squaring, corners that meet. 6 Fourteen global standard tests. 7 Ninety eight percent A grade.

Beats: title "Heat gives a tile its form. Care gives it its worth." Then stations advance every 10 to 12 percent with a hold on each. At station 6 and 7 the numbers 14 and 98% count up. At the end the glow cools: the background eases from ember to calm stone grey, which is the handover to chapter 4. A small origin note appears at the end: machinery from the USA, Germany, Italy and China, materials from six countries (render as quiet text, optional pins on a world map).

Links: "Our technology and standards" to `/quality-and-technology`.
CMS: station list (title, short line), the two counters bound to `Claims`.
Mobile: stations show as a single current line at the bottom third.
Placeholder: ember glow loop with moving light streaks, generated with ffmpeg filters, plus a scrub friendly 5 second clip.
Final media: kiln, digital printer, polishing line, squaring and testing shots.

#### Chapter 4: Surface (`surface`, 350 vh, light)

Purpose: the products, and the first big door into the Catalogue.

Scene: a full screen mosaic of tiles assembles piece by piece, each tile dropping into place with a stagger, built from real published product images (24 chosen at random from the database, weighted toward finishes with images). On the final beat the camera pushes into one Double Charge tile until its surface fills the screen.

Beats:
1. Title "Surfaces for every kind of life". A Floor and Wall toggle appears; clicking it swaps the mosaic. Counts show live from the database (204 floor, 181 wall until data changes).
2. The mosaic assembles (hold).
3. Double Charge beat: "The only full Double Charge line in Bangladesh." Chips: 60 x 60, 80 x 80, 60 x 120.
4. Door row: Explore all tiles, By finish, By size, Download catalogs, and "View in your room" with a "Coming soon" tag.

Links: `/tiles`, `/tiles?finish=...`, `/tiles?size=...`, `/downloads`, `/visualizer`.
CMS: toggle labels, door row links; mosaic content is automatic.
Mobile: mosaic of 12 tiles, toggle below the title.
Placeholder: procedural stone, marble and wood look textures (section 10.3).

#### Chapter 5: Lighter and cooler (`lighter`, 450 vh, light)

Purpose: the two sustainable products, shown as ideas the visitor can feel.

Scene: a split screen. Left half is Slim Tiles, right half is Heatproof Tiles.

Slim Tiles beat: two columns of tiles stacked, one thick and one slim, with the weights from 3.4 labelled. A slider "Number of storeys" (1 to 20, default 10) and a field "Floor area per storey" (default 5,000 sq ft, editable) drive a live result: dead load removed, and Toyota Corolla equivalence.

```ts
const SQFT_TO_SQM = 0.092903
savedKg = areaSqft * storeys * SQFT_TO_SQM * (conventionalKgPerSqm - slimKgPerSqm)
cars = Math.round(savedKg / carEquivalentKg)   // carEquivalentKg = 1330, editable in admin
```

Acceptance test: Variant A at 5,000 sq ft and 10 storeys returns about 25.3 MT and 19 cars. Variant B returns about 33.5 MT and 25 cars. Both must match section 3.4 after rounding. Variant labels are editable in the admin (`slimVariants`), since the deck does not name them.

Heatproof Tiles beat: a cross section of a room. Heat gathers on one side and is held back by the tile layer, with the line "Up to 30% energy cost saving." Below it, the short list from 3.4 and the SDG 11 badge. Do not build a calculator. No data supports one.

Closing line: "Lighter on the building. Easier on the home." Links: `/slim-tiles`, `/heatproof-tiles`.
Mobile: Slim then Heatproof as two consecutive pins.
Placeholder: simple SVG illustrations drawn in the brand palette.
Final media: product close ups and short demonstration clips.

#### Chapter 6: Reach (`reach`, 450 vh, dark to light)

Purpose: the places. Tiles travel to every kind of address.

Scene and beats:
1. A boat carrying cartons across flooded village water (the "Crafting tales of aesthetics beyond the boundaries" photograph, used only with the photographer's written permission and credit; placeholder until then). Caption: "Beyond the boundaries."
2. Cut to a road and a truck, then to a showroom pylon.
3. A map of Bangladesh draws itself (outline from Natural Earth via `d3-geo`). Showroom pins light up from the data as the visitor scrolls, starting from Narayanganj and spreading outward.
4. Counters: 79 exclusive showrooms, 2 flagship display centres, more than 120 authorised dealers, all from `Stats`. Line: "Fresh Ceramics, within your reach." Add: "Delivery within 4 days from authorised and exclusive dealer showrooms."
5. Button "Find your nearest showroom" asks for browser location (with a manual division and district fallback) and opens `/showrooms` already sorted by distance.

Links: `/showrooms`, `/showrooms?type=flagship`, `/become-a-dealer`.
Mobile: map fits width, counters below.
Placeholder: river clip or still, simple road loop, map from real geometry with sample pins flagged "sample".
Final media: the boat photograph, delivery trucks, showroom pylons, flagship centre interiors.

#### Chapter 7: Hands (`hands`, 250 vh, dark)

Purpose: the fitters and professionals who finish the work. The Bengali community name appears here.

Scene: macro video of hands setting tiles, edges meeting without gaps, corner caps and protective poly wrap on cartons.

Beats:
1. Title "Finished by hand". Kicker: নান্দনিকতার কারিগর.
2. Two lines, hold: "Fitters like our tiles because corners and edges meet seamlessly." (from the brand deck). "Corner caps and protective poly wrap keep every carton ready for the site."
3. Three voices appear as cards, drawn from the `Voices` collection (a fitter, a designer, a dealer). Placeholder cards use fictional names marked "[sample]".
4. Door row: For fitters, For architects and designers, Become a dealer.

Links: `/fitters`, `/professionals`, `/become-a-dealer`.
Placeholder: stock close up of tile laying or a procedural tile grid animation.
Final media: fitters at work, nationwide fitter meet footage.

#### Chapter 8: Home (`home`, 450 vh, light)

Purpose: the finished room, shown as a day in a home, with hotspots that open real products.

Scene: full screen interiors crossfade with a slow push in: living room, bathroom, kitchen, commercial lobby, exterior. Each has two or three hotspots (small red squares) that open a product card with the tile name, size, finish and a link to its page.

Beats: title "A fresh start, room by room". Each room holds for one beat. A caption names the room and the tiles used. After the last room: "See every space" link.

Links: `/spaces`, `/spaces/[space]`, product pages.
CMS: `Interiors` collection with hotspot positions (x, y as percentages) and product references.
Placeholder: stock interior photographs, or procedural interior mock ups with tile textures.
Final media: the 100 plus interior photographs from the owner.

#### Chapter 9: Beyond the tile (`beyond`, 250 vh, light)

Purpose: the brand's initiatives, the people and learning programmes, told as one continuous story that matches the responsible theme.

Scene: a horizontal line of cards slides in, each an initiative with a year, a photograph and a short line, drawn from the `Initiatives` collection.

Initial content (owner to complete):
* The knowledge sharing series on tile history, choosing tiles and tile care (social video, source files needed)
* The nationwide fitter meets
* The Eid Express campaign
* The Fresh pod [OWNER TO SUPPLY: name, what it is, where, when, photographs]
* Community and CSR activities [OWNER TO SUPPLY]

Beats: title "What we owe beyond the tile". Cards enter one by one, hold, and the focused card expands to show its story and a link.

Links: `/initiatives`, `/learn`, `/news`.
Placeholder: sample cards flagged "[sample]".

#### Chapter 10: Horizon (`horizon`, 150 vh, dark to light)

Purpose: close the circle, state the vision quietly, and convert.

Scene: dawn again, this time in a home: light entering a room with a finished floor. The window wipe returns to the logo mark.

Beats:
1. Title "Dawn again".
2. Vision line, in two short sentences: "Fresh stands for superior quality and strong sustainability values. To choose Fresh is to choose better quality, responsible manufacturing and a more sustainable future."
3. Action row: Find a showroom, Browse all tiles, Download a catalog, Enquire.
4. The footer rises.

Placeholder: warm interior morning clip or still.
Final media: a home at first light, ideally filmed as the counterpart of chapter 1.

### 7.4 Journey checks

* The rail, the hash anchors and the skip link work on every chapter.
* Scrolling backward replays every scene correctly.
* Resize and orientation change do not break pins (`ScrollTrigger.refresh()` on resize with a debounce).
* No chapter shows layout shift as media loads (posters have fixed aspect ratio containers).

---

## 8. Catalogue and site map

Every page type on akijceramics.net has a counterpart. The right column notes the Fresh counterpart or improvement.

| Route | Page | Akij equivalent | Notes |
|---|---|---|---|
| `/` | Journey | Home | Section 7 |
| `/about` | About Fresh | About Us | Company, vision, the people, the plant |
| `/sustainability` | Sustainability | Sustainability | The six choices, Slim and Heatproof, vision |
| `/quality-and-technology` | Quality and technology | Technology | Plant technology, 14 tests, the twelve technical feature icons, standards |
| `/tiles` | All tiles | Products | Instant client side filters (below) |
| `/tiles/[slug]` | Tile page | Product page | Zoom, specs, shortlist, enquire |
| `/collections/[slug]` | Finish or series page | By surface finish | Double Charge, Mirror Polished and others |
| `/slim-tiles`, `/heatproof-tiles` | Product stories | (none) | Calculator on Slim, thermal story on Heatproof |
| `/spaces`, `/spaces/[slug]` | Inspiration by space | By application | Living, bathroom, kitchen, commercial, outdoor; admin editable |
| `/showrooms` | Showroom locator | Where to buy | Three tiers: Flagship display centres, Exclusive showrooms, Authorised dealers |
| `/downloads` | Catalogs and downloads | Brochure download | PDF catalogs with cover, size and date |
| `/learn`, `/learn/[slug]` | Learning hub | FAQ and e learning | Tile guides, care, buying advice, videos |
| `/initiatives`, `/initiatives/[slug]` | Initiatives | (none) | Fitter meets, pod, Eid Express, CSR |
| `/fitters` | For fitters | (none) | নান্দনিকতার কারিগর community page |
| `/professionals` | For architects and designers | (none) | Project enquiry, downloads, showroom support |
| `/become-a-dealer` | Dealer enquiry | Business associates | Simple form |
| `/news`, `/news/[slug]` | News and events | News and blog | Showroom openings, campaigns |
| `/faq` | Questions | FAQ | Admin editable |
| `/contact` | Contact | Contact | Hotline 16595, forms, social links |
| `/visualizer` | Coming soon | AR Studio | Reserved. See below |
| `/privacy`, `/terms` | Legal | Legal | Admin editable |
| `/search` | Search | Search | MiniSearch across tiles, pages, showrooms |

Header (persistent): logo plate, a segmented control "Journey | Catalogue", language switch (English, বাংলা), search, hotline, menu. Full screen menu lists every route group. Footer: contact, hotline, social links from `SiteSettings`, legal line, a configurable legal entity line (the owner decides whether the registered manufacturing entity name appears), and links to every route group.

### 8.1 Tile filters (instant, no page reload)

Category (floor, wall), finish, size, space, colour family, series, and the two sustainable flags. Show result counts, active filter chips, clear all, and sort (newest, code). The URL stores the filter state so a filtered view can be shared. The product grid is virtualised for smooth scrolling.

### 8.2 Tile page

* Large image with OpenSeadragon deep zoom, a gallery of room shots, and a sample strip of the tile face
* Specs: name, code, category, finish, size label, thickness and colour family if known, surface notes
* Packaging and coverage (pieces per carton, square metres per carton, carton weight) shown only when entered
* Coverage calculator, shown only when square metres per carton exists: area in sq ft or sq m, waste allowance default 10 percent (editable in `SiteSettings`), result in cartons
* Add to shortlist (stored in the browser), share the shortlist as a link, print the shortlist, and "Enquire about this tile" which sends the shortlist to the nearest showroom or the hotline
* Related tiles: same series and same size
* Reserved: a "View in room" button, hidden until the visualizer exists

### 8.3 Showroom locator

* Leaflet map with clustering, OpenStreetMap tiles, marker colours by tier
* Filters: division, district, thana or upazila, tier
* "Find nearest" through browser geolocation, computed with the haversine formula on the client; manual selection as fallback
* Cards: name, tier, address, phone, opening hours, photo, directions link, shortlist handoff
* The OpenStreetMap tile server is acceptable for a private build. For production traffic, record in `docs/DEPLOY.md` that the Group's IT team must choose a tile provider or host tiles, in line with the tile usage policy.

### 8.4 Reserved visualizer

Create `/visualizer` as a polished coming soon page with a short explanation and an enquiry hook. Add `wallOrFloor`, `widthCm`, `heightCm`, a `tileableTexture` media field and an `groutWidthMm` default to the product model now, so the tool can be added without migration pain. Hide every "View in room" button behind a feature flag `FEATURE_VISUALIZER=false`.

---

## 9. Content model and admin

### 9.1 Principles

1. Every label in the admin is plain English with a one line helper text. No technical words.
2. Alt text is required on every image.
3. Drafts, autosave and versions on products, journey and pages, with a publish button.
4. Live preview inside the admin for products, interiors and journey chapters.
5. Deleting asks for confirmation and archives first; permanent deletion is Admin only.
6. Two roles: Admin (everything) and Editor (content, no users, no settings, no permanent delete).
7. A custom dashboard panel with quick links: Add a tile, Add a showroom, Upload a catalog, Edit the Journey, Import from spreadsheet, and the latest enquiries.
8. Language tabs: English and বাংলা on every text field. Missing Bengali falls back to English.

### 9.2 Collections

| Collection | Key fields |
|---|---|
| Products | code, name, slug, category (floor or wall), finish, size (relation), series, colour family, spaces (many), images (many), zoomable flag, packaging fields, sustainable flags (Slim, Heatproof), visualizer fields, status |
| Finishes | name, category, description, hero image, order |
| Sizes | category, widthCm, heightCm, label (generated by the trade convention in 3.5) |
| Series | name, description, hero image |
| Spaces | name, description, hero image, order |
| Interiors | image, space, caption, hotspots (x, y, product), alt text |
| Catalogs | title, series, PDF, cover image, pages, date |
| Showrooms | name, tier (flagship, exclusive, dealer), division, district, thana, address, phone, hours, latitude, longitude, photo, opened date, placeholder flag |
| Initiatives | title, year, category (learning, people, community, environment), summary, story, gallery, video, link |
| Voices | name, role (fitter, dealer, designer, customer, plant team), quote, photo, video |
| Articles | title, kind (guide, news, event, FAQ), body, cover, video, date |
| Claims | key, English text, Bengali text, as of date, internal source note |
| Enquiries | type (general, project, dealer, tile), name, phone, email, message, shortlist, status |
| Media | upload, alt text, decorative flag, processing status, generated sizes |
| Users | email, role |

### 9.3 Globals

| Global | Contents |
|---|---|
| SiteSettings | hotline, email, social links, legal entity line, waste allowance, feature flags, contact details |
| Stats | exclusive showrooms (79), flagship centres (2), authorised dealers (120, labelled "more than"), design counts (calculated from products, with manual override) |
| Journey | the ten chapters with copy, media slots and links, plus the Slim variants and `carEquivalentKg` |
| Navigation | menu structure and footer groups |
| Pages | About, Sustainability, Quality and technology, Fitters, Professionals, Contact, legal pages (block based) |

### 9.4 Bulk import (required)

Four hundred rows cannot be typed by hand. Build an admin view "Import from spreadsheet" for products and another for showrooms.

* Accepts CSV (and XLSX through `exceljs` or `xlsx`). Offers a downloadable template with the exact columns.
* Dry run first: shows rows to be created, updated or rejected, with a plain reason for each rejection.
* Matches existing records by `code`.
* Matches images by file name: a file named `{code}_1.jpg` (or any extension) in `assets/inbox/products/` attaches as image 1; `_2` as image 2. Codes may contain spaces, so match case insensitively and ignore spaces and underscores.
* Reports unmatched files.

Product template columns: `code, name, category, finish, size_width_cm, size_height_cm, series, colour_family, spaces, slim, heatproof, pcs_per_carton, sqm_per_carton, carton_kg, name_bn`.
Showroom template columns: `name, tier, division, district, thana, address, phone, hours, latitude, longitude, name_bn, address_bn`.

---

## 10. Media pipelines and placeholders

### 10.1 Images

On upload, `sharp` generates WebP sizes: 400, 800, 1600 and 2400 pixels wide, plus AVIF at 800 and 1600. Pages use `srcset` with these generated files and a fixed aspect ratio box, so no runtime optimiser is needed on the host. Products flagged zoomable also get a Deep Zoom pyramid (`sharp().tile({ layout: 'dz' })`) under `media/zoom/<id>/`, read by OpenSeadragon. The original is always kept.

### 10.2 Video

On upload, `ffmpeg-static` produces, in the background:

* poster WebP at the first second
* desktop MP4, H.264, 1280 by 720, no audio, `+faststart`, constant quality about 26, target at most 3.5 MB for 8 seconds
* mobile MP4, 854 by 480 or portrait crop, target at most 1.5 MB
* for scrub scenes (Dawn, Fire), a variant encoded with every frame as a keyframe (`-g 1`), at most 6 seconds and 720p

Status field on the media record shows "processing" then "ready". The admin warns when a source file is heavy or has audio.

### 10.3 Placeholders

The owner wants the look and feel complete before real material exists. Rules:

1. `npm run placeholders` generates everything needed and records each item in `docs/PLACEHOLDERS.md` with its source and licence.
2. Product images: procedural textures made with `sharp` and SVG `feTurbulence` filters in many seeds and palettes, covering marble veining, stone, terrazzo and wood look. Each carries a small "PLACEHOLDER" stamp in a corner that is visible in development builds only.
3. Interiors: procedural room scenes or royalty free stock. If using stock, only images and videos whose licence allows commercial use without attribution (for example Pexels or Pixabay licences), downloaded without creating an account, with the page URL and licence recorded. If a download fails, fall back to procedural scenes. Never block the build on stock downloads.
4. Video: Ken Burns clips (`zoompan`) over the stills, ember glow loops and light streak loops generated with ffmpeg filters. Any real clip the owner drops into `assets/inbox/video/` named by slot (for example `dawn_desktop.mp4`) replaces the placeholder automatically on the next `npm run placeholders` run.
5. Showrooms: sample entries flagged `placeholder`, with real division and district names and clearly fake addresses prefixed "[Sample]". They never ship to production because the production build excludes placeholder flagged records.
6. The sample showrooms, voices and initiatives show a visible "[sample]" tag.

### 10.4 Slot manifest

`docs/SLOTS.md` lists every media slot (chapter, role, desktop and mobile size, duration, suggested shot) so the real shoot can be briefed from it. Generate it from the `Journey` global.

---

## 11. Performance, accessibility, SEO, languages

### 11.1 Performance budgets (mobile, throttled)

* Initial Journey transfer at most 2 MB: HTML, CSS, JavaScript at most 250 KB compressed, first poster at most 150 KB, first video at most 1.5 MB
* Each later chapter's media loads only when approached
* Lighthouse performance at least 80 on the mobile profile, accessibility at least 95
* Largest contentful paint under 3 seconds on the simulated slow 4G profile
* Only two videos playing at once. Videos pause when out of view or when the tab is hidden

### 11.2 Fallbacks

* `prefers-reduced-motion`: no pins, no scrub, chapters become normal stacked sections with posters and still images, text fully visible
* Slow connection or data saver (`navigator.connection` when available, plus a visible "Reduce motion and data" toggle in the menu): posters only, no autoplay video
* No JavaScript: server rendered text of every chapter remains readable
* Low power devices: if the frame rate falls below 30 for two seconds, switch the current chapter to its simple mode

### 11.3 Accessibility

Keyboard operable everywhere, visible focus, semantic headings per chapter, labelled controls, captions or transcripts for any video with speech, colour contrast of at least 4.5 to 1 for text, decorative videos hidden from assistive technology, no content only available through motion.

### 11.4 SEO

Server rendered text, titles and descriptions from the CMS, Open Graph images, `sitemap.xml`, `robots.txt`, structured data (Organization, Product, LocalBusiness for showrooms, BreadcrumbList), `hreflang` for English and Bengali, canonical URLs.

### 11.5 Bilingual build

Payload localisation with locales `en` (default) and `bn`. Routes under `/` and `/bn`. A language switch keeps the current page. Bengali typography rules in 6.2. All UI strings go through a dictionary file, not hard coded.

### 11.6 Privacy

No analytics and no cookies in this build. The only stored visitor data is the shortlist in the browser's local storage and submitted enquiries. Add a short privacy page. The Group's IT team can add analytics later.

---

## 12. Backup, GitHub and hosting handover

### 12.1 GitHub

Commit code, `content-export/` (JSON of all text content, produced by `npm run export:content`, excluding users and enquiries), and docs. Ignore `data/`, `media/`, `assets/inbox/`, `.env` and generated files. Do not use Git LFS for media.

### 12.2 Backup script

`npm run backup` makes a consistent copy of the database (SQLite `VACUUM INTO` through the client), mirrors `media/` to the folder named in `BACKUP_DIR` (default `E:\FreshBackups`) using `robocopy`, and writes a dated log. It prints where the backup is. Recommend a copy of that folder on a second drive.

### 12.3 Hosting by the Group's IT team

Produce `docs/DEPLOY.md` and a `Dockerfile` (optional use) containing:

* Required Node version, the build command, and the start command (use Next.js standalone output)
* Environment variables with an `.env.example` (`PAYLOAD_SECRET`, `DATABASE_URI`, `SMTP_*`, `PUBLIC_URL`, `FEATURE_VISUALIZER`, `BACKUP_DIR`)
* Persistent volumes for `data/` and `media/`, one application instance only (SQLite)
* Reverse proxy notes: HTTPS, support for HTTP range requests on video, long cache headers on `/media`, gzip or Brotli for text
* Email: forms store enquiries in the database and send mail through an SMTP service the IT team provides; until then they are only stored
* Map tile provider decision (see 8.3)
* The Postgres switch procedure if SQLite is not accepted
* A restore procedure from the backup files

---

## 13. Build phases and gates

| Phase | Work | Gate (all must pass) |
|---|---|---|
| P0 Foundations | Repository, Payload with SQLite in Next.js, Tailwind, tokens, fonts, logo components, header with logo plate, `Start_Fresh.bat`, `Backup_Fresh.bat`, `instructions.md` in place, `.gitignore` | `Start_Fresh.bat` opens the site and `/admin`; first admin can log in; type check passes |
| P1 Content model | All collections and globals, roles, admin labels and dashboard, seed, bulk import views, placeholder generators, 385 placeholder products distributed exactly as the matrix in 3.5 | Matrix counts in the database equal the matrix; admin walk through works for an Editor; import dry run and real run succeed on the templates |
| P2 Media pipelines | Image sizes, Deep Zoom, video processing, processing status, slot manifest | Upload a 24 MP image and a 30 second video; both produce all outputs in the background; zoom opens in OpenSeadragon |
| P3 Journey I | Engine, rail, window wipe, prelude, chapters 1 to 3 | Smooth scroll, pins, holds, replay backward; first recorded scroll video |
| P4 Journey II | Chapters 4 to 7 including the Slim calculator and map | Calculator acceptance test in 7.3 passes; counters read from `Stats` |
| P5 Journey III | Chapters 8 to 10, menu, Journey and Catalogue control, deep links | Full Journey recording on desktop and phone; Lighthouse mobile at least 80 on the Journey |
| P6 Catalogue core | `/tiles` filters, tile page with zoom, shortlist, collections, spaces, downloads, search | Filters respond without reload on 385 products; shortlist link round trips |
| P7 Places and forms | Showroom locator, nearest search, enquiries, contact and dealer forms | Locator works with sample showrooms; every form stores an enquiry |
| P8 Content pages | About, Sustainability, Quality and technology, Slim, Heatproof, Learn, Initiatives, Fitters, Professionals, News, FAQ, Legal, Visualizer placeholder | Every route in section 8 resolves and is editable in the admin |
| P9 Language and polish | Bengali build, SEO, accessibility, performance and fallback modes | Accessibility at least 95, performance at least 80, reduced motion and slow mode verified by tests |
| P10 Hardening and handover | Backup and restore test, content export, Playwright smoke suite, `DEPLOY.md`, `OPEN_ITEMS.md`, `PLACEHOLDERS.md`, final recordings | Restore test succeeds on a clean folder; `npm run check` passes |

### 13.1 Owner checkpoints

After P1: open `/admin`, add a tile by hand, run the import with the template, confirm it feels easy.
After P3: watch the first Journey video; judge the feeling of the holds and the window wipe.
After P5: watch the full Journey on a phone; adjust copy and pin lengths.
After P7: try the locator and the forms.
After P10: approve the handover pack.

---

## 14. Content still owed by the owner

1. The Fresh pod: name, what it is, where, when, photographs and a short line.
2. Other initiatives and community or CSR work that fit the responsible theme.
3. People stories: fitters, dealers, designers, plant team (names, roles, quotes, photographs) with permission.
4. Detail lines for the six plant choices, from the factory team.
5. The 79 exclusive showrooms and 2 flagship centres with address, phone, hours and coordinates, plus the dealer list if it should be public.
6. Product data in the template, and product images named by code.
7. Interior photographs, catalog PDFs, logo vector files, the brand PDF, and the knowledge series source videos.
8. Photographer permission and credit for the boat photograph.
9. Bengali copy for key pages, and confirmation of the three Bengali lines in 3.9.
10. Hotline, email, social links, the legal entity line, and the current authorised dealer count.
11. Real footage later, briefed from `docs/SLOTS.md`.

## 15. Decisions made in this plan (change only with the owner)

1. Bilingual from day one, English default, Bengali fallback to English.
2. Montserrat plus Noto Sans Bengali and Hind Siliguri, Ruposhi Bangla only after licence confirmation.
3. SQLite with Payload for the build; Postgres remains the documented alternative.
4. No HLS streaming. Progressive MP4 with short clips and aggressive budgets is simpler and enough.
5. No Heatproof calculator, because no data supports one.
6. Shortlist and enquiry in place of a cart or sample basket.
