import json
import os
import re
import sqlite3
import hashlib
from datetime import datetime

def now_iso():
    return datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ')

def clean_model_name(filename):
    base, _ = os.path.splitext(filename)
    return base.strip()

def detect_size(path_parts, category):
    # Search for \d+x\d+
    for p in path_parts:
        m = re.search(r'(\d+)\s*[xX]\s*(\d+)', p)
        if m:
            dim1, dim2 = int(m.group(1)), int(m.group(2))
            if category == 'floor':
                return f"{dim1}x{dim2}", dim1, dim2
            else:
                # Wall: Height x Width
                # If folder says 30x60, height is 30, width is 60
                return f"{dim1}x{dim2}", dim2, dim1 # width_cm, height_cm
    # Default fallback
    if category == 'floor':
        return "60x60", 60, 60
    return "30x60", 60, 30

def detect_finish_and_series(path_parts, category):
    sub = path_parts[1].lower() if len(path_parts) > 1 else ''
    path_full = '/'.join(path_parts).lower()

    series = None
    finish = 'Polished'

    if 'candy' in sub or 'candy' in path_full:
        series = 'Candy'
        finish = 'Polished'
    elif 'dew drop' in sub or 'dewdrop' in sub or 'dew drop' in path_full:
        series = 'Dew Drop'
        finish = 'Polished'
    elif 'mattestic' in sub or 'mattestic' in path_full:
        series = 'Mattestic'
        finish = 'Matte'
    elif 'double charge' in sub or 'double charge' in path_full:
        finish = 'Double Charge'
    elif 'matte carving' in sub or 'carving' in path_full:
        finish = 'Matte Carving Plank'
    elif 'rustic' in sub or 'rustic' in path_full:
        finish = 'Rustic'
    elif 'stair' in sub or 'stair' in path_full:
        finish = 'Stair'
    elif 'matte' in sub or 'matt' in path_full:
        finish = 'Matte'
    elif 'zaynamaj' in path_full or 'zainamaj' in path_full:
        finish = 'Zainamaj'
    else:
        finish = 'Polished'

    return finish, series

def detect_wall_set_and_role(path_parts, filename):
    model = clean_model_name(filename)
    upper_model = model.upper()
    upper_path = '/'.join(path_parts).upper()

    # Look for set folder in path_parts
    set_name = None
    if len(path_parts) >= 4:
        # Check parts between size and filename
        for p in path_parts[3:-1]:
            if 'SET' in p.upper() or 'SERIES' in p.upper() or re.search(r'^\d{4}$', p.strip()) or p.startswith('W ') or p.startswith('WP ') or p.startswith('W P '):
                set_name = p.strip()
                break
        if not set_name:
            parent = path_parts[-2]
            if not re.search(r'^\d+[xX]\d+', parent) and parent not in ['Floor Tiles', 'Wall Tiles']:
                set_name = parent.strip()

    # If still no set_name, try to derive from model name (e.g. "W P 6032 LBE" -> "W P 6032 Set")
    if not set_name:
        m = re.search(r'(W[D\s]*P?\s*\d{4})', upper_model)
        if m:
            set_name = f"{m.group(1)} Set"

    # Detect role
    role = 'general'
    if '-02' in upper_model or 'KITCHEN' in upper_model or '-02' in upper_path:
        role = 'decor-02' # Kitchen decor
    elif '-01' in upper_model or 'WASHROOM' in upper_model or '-01' in upper_path:
        role = 'decor-01' # Washroom / Living decor
    elif re.search(r'\b(LBE|LGR|LGY|LBR|LIV|LBL|LWH|LY|LG|LIGHT|L)\b', upper_model) or upper_model.endswith(' L') or ' LBE' in upper_model or ' LGY' in upper_model or ' LBR' in upper_model or ' LIV' in upper_model or ' LGR' in upper_model:
        role = 'light'
    elif re.search(r'\b(DBE|DGR|DGY|DBR|DIV|DBL|DY|DG|DEEP|D|BK)\b', upper_model) or upper_model.endswith(' D') or ' DBE' in upper_model or ' DGY' in upper_model or ' DBR' in upper_model or ' DIV' in upper_model or ' DGR' in upper_model:
        role = 'deep'
    elif upper_model.startswith('WD'):
        role = 'decor-01'

    return set_name, role

def run():
    print("=== Rebuilding Database & Catalog from Drive Manifest ===")
    
    with open('data/drive_catalog_manifest_enriched.json', 'r', encoding='utf-8') as f:
        items = json.load(f)

    db_path = 'data/fresh.db'
    conn = sqlite3.connect(db_path)
    c = conn.cursor()

    # 1. Purge existing catalog data safely
    print("Purging existing products and associated relations...")
    c.execute("DELETE FROM products_rels")
    c.execute("DELETE FROM products_locales")
    c.execute("DELETE FROM products")
    c.execute("DELETE FROM media WHERE mime_type LIKE 'image/%' AND (filename LIKE '%webp' OR filename LIKE '%jpg' OR filename LIKE '%png')")
    c.execute("DELETE FROM sizes")
    c.execute("DELETE FROM finishes_locales")
    c.execute("DELETE FROM finishes")
    c.execute("DELETE FROM series_locales")
    c.execute("DELETE FROM series")
    conn.commit()

    # 2. Seed authentic Sizes
    # Floor: 60x120, 80x80, 60x60, 40x40, 30x30, 20x120, 30x60 (Stair)
    # Wall: 30x60, 30x50, 30x45, 25x40, 20x30 (All horizontal: Height x Width)
    SIZES_DATA = [
        # Floor sizes
        {'id': 1, 'category': 'floor', 'width_cm': 60, 'height_cm': 120, 'label': '60x120 cm', 'slug': '60x120'},
        {'id': 2, 'category': 'floor', 'width_cm': 80, 'height_cm': 80, 'label': '80x80 cm', 'slug': '80x80'},
        {'id': 3, 'category': 'floor', 'width_cm': 60, 'height_cm': 60, 'label': '60x60 cm', 'slug': '60x60'},
        {'id': 4, 'category': 'floor', 'width_cm': 40, 'height_cm': 40, 'label': '40x40 cm', 'slug': '40x40'},
        {'id': 5, 'category': 'floor', 'width_cm': 30, 'height_cm': 30, 'label': '30x30 cm', 'slug': '30x30'},
        {'id': 6, 'category': 'floor', 'width_cm': 20, 'height_cm': 120, 'label': '20x120 cm (Plank)', 'slug': '20x120'},
        {'id': 7, 'category': 'floor', 'width_cm': 30, 'height_cm': 60, 'label': '30x60 cm (Stair)', 'slug': '30x60-floor'},
        # Wall sizes (Height x Width)
        {'id': 11, 'category': 'wall', 'width_cm': 60, 'height_cm': 30, 'label': '30x60 cm', 'slug': '30x60'},
        {'id': 12, 'category': 'wall', 'width_cm': 50, 'height_cm': 30, 'label': '30x50 cm', 'slug': '30x50'},
        {'id': 13, 'category': 'wall', 'width_cm': 45, 'height_cm': 30, 'label': '30x45 cm', 'slug': '30x45'},
        {'id': 14, 'category': 'wall', 'width_cm': 40, 'height_cm': 25, 'label': '25x40 cm', 'slug': '25x40'},
        {'id': 15, 'category': 'wall', 'width_cm': 30, 'height_cm': 20, 'label': '20x30 cm', 'slug': '20x30'},
    ]

    size_map = {}
    for s in SIZES_DATA:
        c.execute("""
            INSERT INTO sizes (id, category, width_cm, height_cm, label, slug, updated_at, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (s['id'], s['category'], s['width_cm'], s['height_cm'], s['label'], s['slug'], now_iso(), now_iso()))
        size_map[(s['category'], s['slug'])] = s['id']
        # also map generic code
        clean_code = s['slug'].replace('-floor', '').replace('-wall', '')
        size_map[(s['category'], clean_code)] = s['id']

    print(f"Inserted {len(SIZES_DATA)} authentic sizes.")

    # 3. Seed Finishes
    FINISHES_DATA = [
        {'id': 1, 'slug': 'polished', 'category': 'floor', 'order': 1, 'name_en': 'Polished', 'name_bn': 'পলিশড গ্লেজড ভিটিফাইড (PGVT)', 'desc': 'Diamond nano-polished glazed porcelain surface delivering glass-like reflection and optical clarity.'},
        {'id': 2, 'slug': 'double-charge', 'category': 'floor', 'order': 2, 'name_en': 'Double Charge', 'name_bn': 'ডাবল চার্জ', 'desc': 'Dual layer porcelain body engineered with heavy-duty pressed granules for maximum high-traffic longevity.'},
        {'id': 3, 'slug': 'matte', 'category': 'floor', 'order': 3, 'name_en': 'Matte', 'name_bn': 'ম্যাট ফিনিশ', 'desc': 'Micro-textured tactile matte finish engineered for natural warmth, anti-slip safety, and architectural elegance.'},
        {'id': 4, 'slug': 'rustic', 'category': 'wall', 'order': 4, 'name_en': 'Rustic', 'name_bn': 'রাস্টিক টেক্সচার', 'desc': 'Earthy stone-carved textures for character walls, facades, and dramatic feature panels.'},
        {'id': 5, 'slug': 'matte-carving-plank', 'category': 'floor', 'order': 5, 'name_en': 'Matte Carving Plank', 'name_bn': 'ম্যাট কার্ভিং প্ল্যাঙ্ক', 'desc': 'Realistic timber and stone grain carving planks in elongated format for contemporary spaces.'},
        {'id': 6, 'slug': 'stair', 'category': 'floor', 'order': 6, 'name_en': 'Stair & Step', 'name_bn': 'স্টেয়ার ও স্টেপ টাইলস', 'desc': 'Integrated bullnose profile and anti-slip safety tread designed for staircases.'},
        {'id': 7, 'slug': 'zainamaj', 'category': 'floor', 'order': 7, 'name_en': 'Zainamaj', 'name_bn': 'জায়নামাজ টাইলস', 'desc': 'Specialized sacred prayer mat motif tiles crafted with acoustic comfort.'},
    ]

    finish_map = {}
    for f in FINISHES_DATA:
        c.execute("""
            INSERT INTO finishes (id, slug, category, "order", updated_at, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (f['id'], f['slug'], f['category'], f['order'], now_iso(), now_iso()))
        
        c.execute("""
            INSERT INTO finishes_locales (id, _locale, _parent_id, name, description)
            VALUES (?, 'en', ?, ?, ?)
        """, (f['id'] * 2 - 1, f['id'], f['name_en'], f['desc']))
        c.execute("""
            INSERT INTO finishes_locales (id, _locale, _parent_id, name, description)
            VALUES (?, 'bn', ?, ?, ?)
        """, (f['id'] * 2, f['id'], f['name_bn'], f['desc']))
        finish_map[f['name_en'].lower()] = f['id']

    print(f"Inserted {len(FINISHES_DATA)} finishes.")

    # 4. Seed Series
    SERIES_DATA = [
        {'id': 1, 'slug': 'mattestic', 'name_en': 'Mattestic Series', 'name_bn': 'ম্যাটেস্টিক সিরিজ', 'desc': 'Architectural matte wall sets with coordinated light, deep, and decor compositions.'},
        {'id': 2, 'slug': 'candy', 'name_en': 'Candy Series', 'name_bn': 'ক্যান্ডি সিরিজ', 'desc': 'Luminous crystalline wall tiles with gloss punches and cheerful color harmony.'},
        {'id': 3, 'slug': 'dew-drop', 'name_en': 'Dew Drop Series', 'name_bn': 'ডিউ ড্রপ সিরিজ', 'desc': 'Delicate water-droplet luster punch glaze creating three-dimensional tactile light play.'},
    ]

    series_map = {}
    for s in SERIES_DATA:
        c.execute("""
            INSERT INTO series (id, slug, updated_at, created_at)
            VALUES (?, ?, ?, ?)
        """, (s['id'], s['slug'], now_iso(), now_iso()))
        c.execute("""
            INSERT INTO series_locales (id, _locale, _parent_id, name, description)
            VALUES (?, 'en', ?, ?, ?)
        """, (s['id'] * 2 - 1, s['id'], s['name_en'], s['desc']))
        c.execute("""
            INSERT INTO series_locales (id, _locale, _parent_id, name, description)
            VALUES (?, 'bn', ?, ?, ?)
        """, (s['id'] * 2, s['id'], s['name_bn'], s['desc']))
        series_map[s['slug']] = s['id']
        series_map[s['name_en'].lower()] = s['id']

    print(f"Inserted {len(SERIES_DATA)} series.")

    # 5. Insert Media and Products
    products_export = []
    wall_sets_export = {}

    media_id = 1000
    prod_id = 1000
    locale_id = 2000
    rel_id = 1000
    media_id_by_filename = {}

    seen_codes = set()
    seen_slugs = set()

    for idx, it in enumerate(items):
        path_parts = it['path'].split('/')
        cat = 'floor' if path_parts[0] == 'Floor Tiles' else 'wall'
        model_name = clean_model_name(it['name'])
        
        # Unique code and slug
        raw_code = model_name
        h = hashlib.md5(it['path'].encode('utf-8')).hexdigest()[:5]
        code = raw_code
        if code in seen_codes:
            code = f"{raw_code}-{h}"
        seen_codes.add(code)

        base_slug = re.sub(r'[^a-zA-Z0-9]+', '-', code).strip('-').lower() or f"tile-{idx}"
        slug = base_slug
        if slug in seen_slugs:
            slug = f"{base_slug}-{h}"
        seen_slugs.add(slug)

        # Detect size
        size_code, width_cm, height_cm = detect_size(path_parts, cat)
        size_id = size_map.get((cat, size_code), 1 if cat == 'floor' else 11)

        # Detect finish and series
        finish_name, series_name = detect_finish_and_series(path_parts, cat)
        finish_id = finish_map.get(finish_name.lower(), 1)
        series_id = series_map.get(series_name.lower(), None) if series_name else None

        # Wall set & role
        wall_set_name = None
        wall_role = 'general'
        if cat == 'wall':
            wall_set_name, wall_role = detect_wall_set_and_role(path_parts, it['name'])

        # Media insert
        disk_filename = it['disk_filename']
        if disk_filename in media_id_by_filename:
            cur_media_id = media_id_by_filename[disk_filename]
        else:
            media_id += 1
            cur_media_id = media_id
            filesize = 15000
            media_path = os.path.join('media', disk_filename)
            if os.path.exists(media_path):
                filesize = os.path.getsize(media_path)

            c.execute("""
                INSERT INTO media (id, alt, decorative, processing_status, url, filename, mime_type, filesize, width, height, updated_at, created_at)
                VALUES (?, ?, 0, 'ready', ?, ?, 'image/webp', ?, 800, 800, ?, ?)
            """, (cur_media_id, model_name, f"/media/{disk_filename}", disk_filename, filesize, now_iso(), now_iso()))
            media_id_by_filename[disk_filename] = cur_media_id

        # Determine spaces
        # Spaces: 1 = Living Room, 2 = Bathroom, 3 = Kitchen, 4 = Commercial, 5 = Outdoor
        tile_spaces = []
        if wall_role == 'decor-02':
            tile_spaces = [3] # Kitchen
        elif wall_role == 'decor-01':
            tile_spaces = [2] # Bathroom
        elif cat == 'wall':
            tile_spaces = [2, 3] # Bath & Kitchen
        elif finish_name == 'Double Charge':
            tile_spaces = [1, 4] # Living & Commercial
        else:
            tile_spaces = [1, 4]

        # Insert product
        prod_id += 1
        c.execute("""
            INSERT INTO products (
                id, code, slug, category, finish_id, size_id, series_id, colour_family,
                zoomable, pcs_per_carton, sqm_per_carton, carton_kg, slim, heatproof,
                wall_or_floor, width_cm, height_cm, grout_width_mm, status, updated_at, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, 'white', 1, 4, 1.44, 28, 0, 0, ?, ?, ?, 2, 'published', ?, ?)
        """, (prod_id, code, slug, cat, finish_id, size_id, series_id, cat, width_cm, height_cm, now_iso(), now_iso()))

        # Insert product locales (en and bn)
        locale_id += 1
        c.execute("""
            INSERT INTO products_locales (id, _locale, _parent_id, name)
            VALUES (?, 'en', ?, ?)
        """, (locale_id, prod_id, model_name))
        
        locale_id += 1
        c.execute("""
            INSERT INTO products_locales (id, _locale, _parent_id, name)
            VALUES (?, 'bn', ?, ?)
        """, (locale_id, prod_id, model_name))

        # Insert relations (media and spaces)
        rel_id += 1
        c.execute("""
            INSERT INTO products_rels (id, "order", parent_id, path, media_id)
            VALUES (?, 1, ?, 'images', ?)
        """, (rel_id, prod_id, cur_media_id))

        for s_idx, sp_id in enumerate(tile_spaces):
            rel_id += 1
            c.execute("""
                INSERT INTO products_rels (id, "order", parent_id, path, spaces_id)
                VALUES (?, ?, ?, 'spaces', ?)
            """, (rel_id, s_idx + 1, prod_id, sp_id))

        # Record for static export JSON
        prod_record = {
            'id': str(prod_id),
            'code': code,
            'name': model_name,
            'slug': slug,
            'category': cat,
            'finishName': finish_name,
            'finishSlug': finish_name.lower().replace(' ', '-'),
            'sizeName': f"{size_code} cm",
            'sizeCode': size_code,
            'widthCm': width_cm,
            'heightCm': height_cm,
            'seriesName': series_name,
            'wallSetName': wall_set_name,
            'wallTileRole': wall_role,
            'imageUrl': f"/media/{disk_filename}",
            'imageAlt': model_name,
            'isSlim': False,
            'isHeatproof': False,
            'waterAbsorption': '< 0.5%' if cat == 'floor' else '10-15%',
            'mor': '≥ 35 N/mm²' if cat == 'floor' else '≥ 15 N/mm²',
            'sqftPerBox': 15.5,
            'spaces': tile_spaces
        }
        products_export.append(prod_record)

        if wall_set_name:
            if wall_set_name not in wall_sets_export:
                wall_sets_export[wall_set_name] = {
                    'setName': wall_set_name,
                    'finishName': finish_name,
                    'sizeName': f"{size_code} cm",
                    'widthCm': width_cm,
                    'heightCm': height_cm,
                    'tiles': []
                }
            wall_sets_export[wall_set_name]['tiles'].append(prod_record)

    conn.commit()
    conn.close()

    print(f"Successfully inserted {len(products_export)} products into data/fresh.db!")
    print(f"Organized into {len(wall_sets_export)} Wall Sets!")

    # Write export files
    os.makedirs('content-export', exist_ok=True)
    with open('content-export/products.json', 'w', encoding='utf-8') as f:
        json.dump(products_export, f, indent=2, ensure_ascii=False)
    with open('content-export/wall_sets.json', 'w', encoding='utf-8') as f:
        json.dump(list(wall_sets_export.values()), f, indent=2, ensure_ascii=False)

    print("Saved content-export/products.json and content-export/wall_sets.json!")

if __name__ == '__main__':
    run()
