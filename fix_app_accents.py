with open("js/app.js", "r") as f:
    content = f.read()

content = content.replace("var(--color-secondary)", "var(--color-accent)")

with open("js/app.js", "w") as f:
    f.write(content)
print("Updated js/app.js accents")
