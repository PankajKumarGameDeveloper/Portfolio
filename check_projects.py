import os
import re

projects_dir = r"c:\Users\panka\Downloads\Resume\Projects"
folders = [f for f in os.listdir(projects_dir) if os.path.isdir(os.path.join(projects_dir, f)) and re.match(r'^\d+_', f)]
folders.sort(key=lambda x: int(x.split('_')[0]))

def has_content(filepath):
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return len(f.read().strip()) > 0
        except Exception:
            return False
    return False

total_projects = len(folders)
print(f"Total Projects found: {total_projects}\n")

for folder in folders:
    base_path = os.path.join(projects_dir, folder)
    name = folder.split('_', 1)[1].replace('_', ' ')
    
    has_desc = has_content(os.path.join(base_path, 'Description.txt'))
    has_url = has_content(os.path.join(base_path, 'Url.txt'))
    has_tech = has_content(os.path.join(base_path, 'Tech.txt'))
    has_role = has_content(os.path.join(base_path, 'Role.txt'))
    
    media_dir = os.path.join(base_path, 'Media')
    has_images = False
    has_videos = False
    
    if os.path.exists(media_dir):
        files = os.listdir(media_dir)
        for m in files:
            m_lower = m.lower()
            if m_lower.endswith(('.mp4', '.webm', '.mov')):
                has_videos = True
            if m_lower.endswith(('.png', '.jpg', '.jpeg', '.webp')):
                has_images = True
                
    print(f"[{name}]")
    
    has_list = []
    missing_list = []
    
    if has_desc: has_list.append("Description") 
    else: missing_list.append("Description")
        
    if has_url: has_list.append("URL") 
    else: missing_list.append("URL")
        
    if has_tech: has_list.append("Techs") 
    else: missing_list.append("Techs")
        
    if has_role: has_list.append("Role") 
    else: missing_list.append("Role")
        
    if has_images: has_list.append("Images") 
    else: missing_list.append("Images")
        
    if has_videos: has_list.append("Videos") 
    else: missing_list.append("Videos")
        
    print(f"Has: {', '.join(has_list)}")
    if missing_list:
        print(f"Does NOT have: {', '.join(missing_list)}")
    print("-" * 40)
