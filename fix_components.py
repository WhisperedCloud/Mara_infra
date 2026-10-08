import re

with open('/Users/gowthamshanmugam/Desktop/Mara/css/components.css', 'r') as f:
    content = f.read()

# Fix button text colors so white buttons have maroon text
content = content.replace('color: var(--color-text-white);', 'color: var(--color-background);')

# Also fix the logo gradient which might be using maroon hardcoded
# Since we want white accent, the logo should be white
content = content.replace('rgba(128, 0, 0, 0.2)', 'rgba(255, 255, 255, 0.2)')
content = content.replace('rgba(128, 0, 0, 0.3)', 'rgba(255, 255, 255, 0.3)')
content = content.replace('rgba(153, 0, 0, 0.3)', 'rgba(255, 255, 255, 0.3)')

with open('/Users/gowthamshanmugam/Desktop/Mara/css/components.css', 'w') as f:
    f.write(content)

print("Fixed components.css")
