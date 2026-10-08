with open("index.html", "r") as f:
    content = f.read()

# Replace var(--color-secondary) with var(--color-accent) in inline styles that are clearly meant to be accents
content = content.replace("border: 2px solid var(--color-secondary);", "border: 2px solid var(--color-accent);")
content = content.replace("background: var(--color-secondary-light); color: var(--color-secondary);", "background: var(--color-accent-glow); color: var(--color-accent);")
content = content.replace("color: var(--color-secondary);", "color: var(--color-accent);")
content = content.replace("var(--color-secondary-light)", "var(--color-accent-glow)")

with open("index.html", "w") as f:
    f.write(content)
print("Updated index.html accents")
