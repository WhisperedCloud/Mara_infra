import os
import glob

# Define the color mappings
replacements = {
    # CSS variables in style.css
    "#0ea5e9": "#800000",   # Secondary
    "#0284c7": "#4d0000",   # Secondary Dark
    "#e0f2fe": "#ffe5e5",   # Secondary Light
    "#84cc16": "#990000",   # Accent
    "#65a30d": "#660000",   # Accent Dark
    "#38bdf8": "#b30000",   # Light Blue (used in gradients)

    # RGBA values found in components.css and style.css
    "14, 165, 233": "128, 0, 0",   # Cyan
    "132, 204, 22": "153, 0, 0",   # Lime Green
    
    # Sometimes written without spaces
    "14,165,233": "128,0,0",
    "132,204,22": "153,0,0",
}

# Directories and file types to process
files_to_check = glob.glob("/Users/gowthamshanmugam/Desktop/Mara/**/*.css", recursive=True) + \
                 glob.glob("/Users/gowthamshanmugam/Desktop/Mara/**/*.html", recursive=True) + \
                 glob.glob("/Users/gowthamshanmugam/Desktop/Mara/**/*.js", recursive=True)

for filepath in files_to_check:
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    for old_c, new_c in replacements.items():
        new_content = new_content.replace(old_c, new_c)
        # Also handle uppercase hex
        if old_c.startswith('#'):
            new_content = new_content.replace(old_c.upper(), new_c.upper())

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated: {filepath}")

print("Theme update complete.")
