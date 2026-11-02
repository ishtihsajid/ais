import urllib.request
import re
import json
import os
import sys
import time

def fetch_folder_items(folder_id):
    url = f'https://drive.google.com/drive/folders/{folder_id}?usp=sharing'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error fetching folder {folder_id}: {e}", file=sys.stderr)
        return []

    callbacks = re.findall(r'AF_initDataCallback\((\{.*?\})\);', html, re.DOTALL)
    for cb in callbacks:
        key_match = re.search(r'key:\s*\'([^\']+)\'', cb)
        if not key_match or key_match.group(1) != 'ds:3':
            continue
        data_match = re.search(r'data:\s*(.*?)\s*,\s*sideChannel:', cb, re.DOTALL)
        if not data_match:
            continue
        try:
            val = json.loads(data_match.group(1).strip())
            items_list = None
            try:
                items_list = val[27][7][0][0]
            except Exception:
                pass
            if items_list and isinstance(items_list, list):
                results = []
                for it in items_list:
                    fid = it[0][1] if (len(it) > 0 and isinstance(it[0], list) and len(it[0]) > 1) else None
                    mime = it[4] if len(it) > 4 else ''
                    name = None
                    try:
                        name = it[35][0][0][0]
                    except Exception:
                        pass
                    if not name:
                        try:
                            name = it[24][2][0][2][1][0][0][0]
                        except Exception:
                            pass
                    if fid and name:
                        results.append({
                            'id': fid,
                            'name': name.strip(),
                            'isFolder': mime == 'application/vnd.google-apps.folder',
                            'mime': mime
                        })
                return results
        except Exception as e:
            print(f"Error parsing ds:3 for {folder_id}: {e}", file=sys.stderr)
    return []

def crawl(folder_id, current_path=[]):
    items = fetch_folder_items(folder_id)
    time.sleep(0.1) # polite delay
    collected = []
    for it in items:
        item_path = current_path + [it['name']]
        if it['isFolder']:
            print(f"Directory: {'/'.join(item_path)}")
            sub_items = crawl(it['id'], item_path)
            collected.extend(sub_items)
        else:
            file_record = {
                'id': it['id'],
                'name': it['name'],
                'path': '/'.join(item_path),
                'dir_path': '/'.join(current_path),
                'mime': it['mime']
            }
            collected.append(file_record)
            print(f"  File: {file_record['path']}")
    return collected

if __name__ == '__main__':
    root_id = '1zsyX8OYB31-F7F4CVEjBHXL4TngTT6nD'
    print(f"Starting crawl from root {root_id}...")
    all_files = crawl(root_id, [])
    print(f"\nCrawled total {len(all_files)} files.")
    os.makedirs('data', exist_ok=True)
    with open('data/drive_catalog_manifest.json', 'w', encoding='utf-8') as f:
        json.dump(all_files, f, indent=2, ensure_ascii=False)
    print("Saved manifest to data/drive_catalog_manifest.json")
