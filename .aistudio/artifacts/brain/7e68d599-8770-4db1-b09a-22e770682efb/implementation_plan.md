# Rebuilding Fresh Ceramics Tile Catalog & Database from Google Drive

Rebuild the entire tile catalog, media assets, taxonomy, and database from scratch using the official Google Drive repository (`1zsyX8OYB31-F7F4CVEjBHXL4TngTT6nD`).

---

## 1. User Specifications & Confirmed Preferences

- **Source of Truth**: Google Drive folder `https://drive.google.com/drive/folders/1zsyX8OYB31-F7F4CVEjBHXL4TngTT6nD?usp=sharing`
- **Data Cleanup**: Completely purge previous products, sizes, finishes, series, and missing mock media records.
- **Hierarchy & Taxonomy**:
  - **Type**: `Floor Tiles` vs. `Wall Tiles`
  - **Surfaces / Finishes & Series**: `Polished`, `Mattestic`, `Candy`, `Dewdrop`, etc.
  - **Sizes**:
    - **Floor Tiles**: Vertical orientation, **Width x Height** (e.g., 20x120cm, 30x30cm, 60x60cm, 60x120cm, 80x80cm).
    - **Wall Tiles**: Horizontal orientation, **Height x Width** (e.g., 20x30cm, 25x40cm, 30x45cm, 30x50cm, 30x60cm).
  - **Model Naming**: Filename without extension is the exact model name (e.g., `6 PGVT 62`, `W P 6032 LBE`).
  - **Wall Sets**: Sets of 2 to 4 tiles inside dedicated set folders (e.g. `W P 6032 Set`):
    - Light: `... LBE`
    - Deep: `... DBE`
    - Decor: `WD ... -02` (strictly Kitchen) and `WD ... -01` (Washroom / Living)
- **User Confirmed UI Choices**:
  - **Wall Set Display**: Toggle between **Set View** (showing complete wall sets) and **Individual Tile View**.
  - **Dimension Visualization**: Uniform card heights on the main grid, with a **Proportional Scale & 9ft Wall Preview Modal** to compare relative real-world tile sizes.

---

## 2. Proposed Changes

### Phase A: Asset Ingestion & Optimization Pipeline
- **Google Drive Extraction Script** (`scripts/ingest-drive-catalog.ts`):
  - Download all tile images from Google Drive folder `1zsyX8OYB31-F7F4CVEjBHXL4TngTT6nD` while preserving folder path metadata.
  - Use `sharp` to process and optimize all downloaded tiles to crisp, modern `.webp` format at high visual quality while keeping total disk build footprint comfortably under the 250 MB deployment threshold.
  - Save organized assets in `public/media/tiles/...` and update `ensure-media-assets.cjs` so missing disk errors are permanently eliminated.

### Phase B: Database Schema & Complete Catalog Purge
- **Purge Existing Data**:
  - Delete all legacy mock records in `products`, `sizes`, `finishes`, `series`, and `media` from both SQLite (`data/fresh.db`) and Cloud SQL tables.
- **Update Schema & Relationships** (`src/collections/Products.ts`, `Sizes.ts`, `WallSets.ts` or set fields):
  - Add orientation metadata to sizes: `orientation: 'vertical' | 'horizontal'`, `widthCm`, `heightCm`.
  - Add Wall Set grouping fields to Products: `isWallSetPart`, `wallSetName`, `wallTileRole` (`'light' | 'deep' | 'decor-kitchen' | 'decor-general'`).
  - Automatically tag Decor `-02` tiles with Space `Kitchen` and Decor `-01` with `Washroom`.

### Phase C: Authentic Re-Seeding
- **Catalog Parser & Seeder** (`scripts/seed-authentic-drive-catalog.ts`):
  - Parse the downloaded tree:
    1. Detect `Floor Tiles` vs `Wall Tiles`.
    2. Extract Surface/Finish or Series (`Polished`, `Mattestic`, `Candy`, `Dewdrop`).
    3. Extract exact cm dimensions (e.g. `60x120cm`, `30x60cm`).
    4. For Wall Sets, detect folder `* Set` and associate the child models (`LBE`, `DBE`, `WD ... -01`, `WD ... -02`).
    5. Create Media items and link them directly to Products with exact model names.

### Phase D: Catalog Frontend & Visualizer (`src/app/(site)/[locale]/tiles`)
- **View Toggle**:
  - Clean segment switch at the top of the catalog: **"All Individual Tiles"** vs **"Wall Tile Sets"**.
  - When in "Wall Tile Sets" mode: Display set cards highlighting the combination of Light, Decor, and Deep tiles with a one-click switcher.
- **Uniform Card Grid**:
  - Consistent grid cards with elegant framing, badges for finish/series, category, and dimensions.
- **Proportional Scale & 9-Foot Wall Modal**:
  - Visualizer button on each card: "Compare Scale & Wall Layout".
  - Proportional canvas rendering the tile to scale next to human silhouette and other tile sizes (comparing 20x30cm to 60x120cm).
  - For wall sets: Display the authentic 9-foot wall pattern (4 Light tiles on top, 1 Decor in middle, 4 Deep at bottom).
- **Mobile Menu Refinement**:
  - Ensure the mobile navigation drawer (and language switch) fits seamlessly without any cut-offs on mobile screens.

---

## 3. Verification Plan

1. **Asset Pipeline Verification**: Run download & optimization script; verify all images exist on disk and total build size is <250 MB.
2. **Database Verification**: Run seed script, verify zero errors in DB logs, check that all products, finishes, sizes, and sets are populated accurately.
3. **Applet Compilation**: Run `compile_applet` to ensure full TypeScript and Next.js build compliance with zero runtime errors.
4. **Visual Inspection**: Validate catalog filtering, set toggling, dimension modal, and mobile responsive layout.
