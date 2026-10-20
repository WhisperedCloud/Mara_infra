// Vercel build step, run after the CSS is minified (see "buildCommand" in vercel.json).
// Puts the site's stylesheets directly inside each page, in their original order, so the
// browser can draw the page without waiting for separate CSS downloads. Only the deployed
// copy changes: the pages in the repository keep their <link> tags and work as they are.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const stylesheet = /<link rel="stylesheet" href="(css\/[a-z-]+\.css)">\s*/g;

for (const page of readdirSync('.').filter(f => f.endsWith('.html'))) {
    let html = readFileSync(page, 'utf8');
    const files = [...html.matchAll(stylesheet)].map(m => m[1]);
    if (!files.length) continue;

    // Paths inside the CSS are relative to css/; inside the page they are relative to the site root
    const css = files.map(f => readFileSync(f, 'utf8').replace(/url\((["']?)\.\.\//g, 'url($1')).join('\n');

    let first = true;
    html = html.replace(stylesheet, () => {
        if (!first) return '';
        first = false;
        return `<style>${css}</style>\n    `;
    });
    writeFileSync(page, html);
    console.log(`${page}: inlined ${files.join(', ')}`);
}
