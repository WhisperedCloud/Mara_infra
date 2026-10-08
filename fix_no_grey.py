import os
import re

def process_file(filepath):
    with open(filepath, "r") as f:
        content = f.read()

    # Replace pure black shadows/borders with maroon shadows/borders
    # rgba(0,0,0,x) or rgba(0, 0, 0, x) -> rgba(128, 0, 0, x)
    content = re.sub(r'rgba\(\s*0\s*,\s*0\s*,\s*0\s*,', 'rgba(128, 0, 0,', content)
    
    # Replace the remaining dark greys with pure black or maroon
    content = content.replace("#1d1d1f", "#800000")
    content = content.replace("#f5f5f7", "#ffffff")
    content = content.replace("#86868b", "rgba(128, 0, 0, 0.7)")
    content = content.replace("#a1a1a6", "rgba(128, 0, 0, 0.5)")
    content = content.replace("#d2d2d7", "rgba(128, 0, 0, 0.2)")

    # Also fix some specific rgba colors in components.css
    content = content.replace("rgba(10, 25, 47,", "rgba(77, 0, 0,") # Dark blue/grey -> Dark Maroon
    content = content.replace("rgba(6, 14, 26,", "rgba(77, 0, 0,")
    
    with open(filepath, "w") as f:
        f.write(content)

process_file("css/components.css")
process_file("css/style.css")
process_file("index.html")
process_file("js/app.js")
print("Removed all grey successfully!")
