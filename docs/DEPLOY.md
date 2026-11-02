# Fresh Ceramics Deployment Guide

Audience: Meghna Group of Industries (MGI) IT team and site administrators.

## 1. Overview
The Fresh Ceramics website is a Next.js (App Router) application with Payload CMS 3 embedded, using SQLite via `@payloadcms/db-sqlite`. It is designed to run self-contained with no external runtime dependencies other than map tiles.

## 2. System Requirements
- **Node.js**: v20 LTS or v22 LTS (check compatibility with installed Payload release; currently tested on Node 22/24).
- **Architecture**: Linux x64 or Windows Server.
- **Disk**: SSD with persistent storage for:
  - SQLite database file: `data/fresh.db`
  - Uploaded and processed media: `media/`
- **Memory**: Minimum 2 GB RAM (4 GB recommended for video/sharp processing).
- **Process Model**: Single server process (SQLite requires a single active writer).

## 3. Environment Variables (.env)
```env
# Required for Payload session security
PAYLOAD_SECRET=your-random-32-byte-hex-secret

# Database connection
DATABASE_URI=file:./data/fresh.db

# Public URL (canonical)
PUBLIC_URL=https://freshceramics.net

# Port
PORT=3100

# Feature flags
FEATURE_VISUALIZER=false

# Optional SMTP configuration for enquiry notification emails
SMTP_HOST=smtp.freshceramics.net
SMTP_PORT=587
SMTP_USER=no-reply@freshceramics.net
SMTP_PASS=secret
SMTP_FROM="Fresh Ceramics" <no-reply@freshceramics.net>

# Backup location
BACKUP_DIR=E:\FreshBackups
```

## 4. Reverse Proxy & Web Server (Nginx / Caddy)
- **HTTPS**: TLS 1.3 certificate (Let's Encrypt or corporate SSL).
- **HTTP Range Requests**: Must be enabled to support video scrubbing and seeking in the Journey narrative.
- **Static Asset Caching**: 
  - `/_next/static/` -> Cache-Control: `public, max-age=31536000, immutable`
  - `/media/` -> Cache-Control: `public, max-age=86400, stale-while-revalidate=604800`
- **Compression**: Enable gzip or Brotli for HTML, CSS, JS, JSON, and SVG. Do not re-compress WebP, AVIF, or MP4.

## 5. Map Tiles
The private build uses OpenStreetMap default tile servers (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`). For enterprise production traffic, the MGI IT team must configure an approved tile service provider (e.g., Mapbox, Stadia Maps, or a self-hosted OSM tile server) per OSM Tile Usage Policies.

## 6. Migration to PostgreSQL (Optional)
If MGI IT infrastructure mandates PostgreSQL rather than SQLite:
1. Replace `@payloadcms/db-sqlite` with `@payloadcms/db-postgres` in `payload.config.ts`.
2. Configure `DATABASE_URI=postgres://user:password@pg-host:5432/fresh_ceramics`.
3. Run Payload database push / migrations.
4. Payload's Local API abstraction preserves all queries and business logic without code changes.

## 7. Backup and Restore
- Automated nightly backups use `npm run backup` (or `Backup_Fresh.bat`), invoking SQLite `VACUUM INTO` and mirroring `media/`.
- To restore: copy `fresh_backup_<date>.db` to `data/fresh.db` and restore `media/` directory.
