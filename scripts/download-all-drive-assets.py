import json
import os
import sys
import urllib.request
import time
import hashlib
from concurrent.futures import ThreadPoolExecutor, as_completed

def sanitize_name(name):
    # Strip extension
    base, _ = os.path.splitext(name)
    clean = base.strip()
    return clean

def get_disk_filename(file_item):
    # Unique disk filename based on path hash to completely avoid collision
    path_str = file_item['path']
    raw_name = file_item['name']
    base, ext = os.path.splitext(raw_name)
    if not ext:
        ext = '.webp'
    h = hashlib.md5(path_str.encode('utf-8')).hexdigest()[:6]
    clean_base = "".join(c if (c.isalnum() or c in " -_.") else "_" for c in base).strip().replace(" ", "_")
    return f"{clean_base}_{h}{ext.lower()}"

def download_file(item, media_dirs):
    fid = item['id']
    target_filename = item['disk_filename']
    
    # Check if already downloaded in both dirs
    all_exist = True
    for d in media_dirs:
        dest = os.path.join(d, target_filename)
        if not os.path.exists(dest) or os.path.getsize(dest) == 0:
            all_exist = False
            break
    if all_exist:
        return True, item, 0

    urls = [
        f"https://lh3.googleusercontent.com/d/{fid}",
        f"https://drive.usercontent.google.com/download?id={fid}&export=download",
        f"https://drive.google.com/uc?export=download&id={fid}"
    ]

    data = None
    for url in urls:
        for attempt in range(2):
            try:
                req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
                with urllib.request.urlopen(req, timeout=15) as resp:
                    data = resp.read()
                    if len(data) > 100:
                        break
            except Exception:
                time.sleep(0.5)
        if data and len(data) > 100:
            break

    if not data or len(data) < 100:
        return False, item, 0

    for d in media_dirs:
        dest = os.path.join(d, target_filename)
        with open(dest, 'wb') as f:
            f.write(data)

    return True, item, len(data)

def main():
    with open('data/drive_catalog_manifest.json', 'r', encoding='utf-8') as f:
        items = json.load(f)

    media_dirs = [
        os.path.abspath('media'),
        os.path.abspath('public/media')
    ]
    for d in media_dirs:
        os.makedirs(d, exist_ok=True)

    print(f"Preparing to download {len(items)} files...")
    
    # Enrich items with disk_filename and parsed metadata
    for it in items:
        it['disk_filename'] = get_disk_filename(it)

    with open('data/drive_catalog_manifest_enriched.json', 'w', encoding='utf-8') as f:
        json.dump(items, f, indent=2, ensure_ascii=False)

    success_count = 0
    fail_count = 0
    total_bytes = 0

    with ThreadPoolExecutor(max_workers=20) as executor:
        futures = {executor.submit(download_file, it, media_dirs): it for it in items}
        for future in as_completed(futures):
            ok, item, size = future.result()
            if ok:
                success_count += 1
                total_bytes += size
                if success_count % 50 == 0 or success_count == len(items):
                    print(f"Downloaded {success_count}/{len(items)} files ({total_bytes / (1024*1024):.2f} MB)...", flush=True)
            else:
                fail_count += 1
                print(f"FAILED: {item['name']} ({item['path']})", flush=True)

    print(f"\nFinished! Success: {success_count}, Failed: {fail_count}, Total Size: {total_bytes / (1024*1024):.2f} MB")

if __name__ == '__main__':
    main()
