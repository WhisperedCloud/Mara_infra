import os
import glob

# Define the color mappings
replacements = {
    "#0ea5e9": "#800000",   
    "#0284c7": "#4d0000",   
    "#e0f2fe": "#ffe5e5",   
    "#84cc16": "#990000",   
    "#65a30d": "#660000",   
    "#38bdf8": "#b30000",   
    "14, 165, 233": "128, 0, 0",   
    "132, 204, 22": "153, 0, 0",   
    "14,165,233": "128,0,0",
    "132,204,22": "153,0,0",
}

files_to_check = [
    "/Users/gowthamshanmugam/Desktop/Mara/js/app.js",
    "/Users/gowthamshanmugam/Desktop/Mara/data/products.js"
]

for filepath in files_to_check:
    if not os.path.isfile(filepath):
        continue
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    for old_c, new_c in replacements.items():
        new_content = new_content.replace(old_c, new_c)
        if old_c.startswith('#'):
            new_content = new_content.replace(old_c.upper(), new_c.upper())

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated: {filepath}")

print("Fix complete.")
