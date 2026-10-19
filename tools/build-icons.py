"""Rebuild css/icons.css: only the Font Awesome Free 6.4.0 icons this site uses, fonts embedded.

Run from the site folder after adding or removing an icon:
    pip3 install fonttools brotli
    python3 tools/build-icons.py

It finds every fa-NAME used in the pages and js/app.js (plus icon codes written directly in the
other stylesheets), downloads Font Awesome 6.4.0 from cdnjs, checks the stylesheet against its
published hash, keeps only the needed glyphs, and embeds the two small fonts in css/icons.css so
icons also show when a page is opened straight from disk. Use fa-solid or fa-brands on the <i> tag.
"""
import base64, glob, hashlib, os, re, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CDN = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/'
CSS_SRI = 'iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=='
NOT_ICONS = {'solid', 'brands', 'regular', 'spin', 'fw'}

try:
    from fontTools.ttLib import TTFont
except ImportError:
    sys.exit('fontTools is missing: run  pip3 install fonttools brotli')


def fetch(path, dest):
    subprocess.run(['curl', '-fsSL', CDN + path, '-o', dest], check=True)
    return dest


def main():
    tmp = tempfile.mkdtemp(prefix='fa-')
    css = open(fetch('css/all.min.css', os.path.join(tmp, 'all.css')), 'rb').read()
    if base64.b64encode(hashlib.sha512(css).digest()).decode() != CSS_SRI:
        sys.exit('Font Awesome stylesheet does not match its published hash; stopping.')
    solid_font = fetch('webfonts/fa-solid-900.woff2', os.path.join(tmp, 'solid.woff2'))
    brands_font = fetch('webfonts/fa-brands-400.woff2', os.path.join(tmp, 'brands.woff2'))

    codes = {}
    for selectors, code in re.findall(r'([^{}]+)\{content:"\\([0-9a-f]+)"\}', css.decode()):
        for sel in selectors.split(','):
            m = re.fullmatch(r'\.fa-([a-z0-9-]+):before', sel.strip())
            if m:
                codes[m.group(1)] = code

    # icon names live in class attributes and in scripts (which swap icons at run time)
    text = open(os.path.join(ROOT, 'js', 'app.js'), encoding='utf-8').read()
    for f in glob.glob(os.path.join(ROOT, '*.html')):
        page = open(f, encoding='utf-8').read()
        text += ' ' + ' '.join(re.findall(r'(?:class|data-icon)="([^"]*)"', page))
        text += ' ' + ' '.join(re.findall(r'<script>(.*?)</script>', page, re.S))
    used = sorted({n for n in re.findall(r'\bfa-([a-z0-9-]+)', text) if n not in NOT_ICONS})
    unknown = [n for n in used if n not in codes]
    if unknown:
        sys.exit('Not Font Awesome 6.4.0 icons: ' + ', '.join(unknown))

    # icon codes the other stylesheets write directly (ticks, chevrons, zoom)
    extra = set()
    for f in ('style.css', 'components.css', 'responsive.css'):
        extra |= set(re.findall(r'content:\s*"\\(f[0-9a-f]{3})"', open(os.path.join(ROOT, 'css', f), encoding='utf-8').read()))

    in_solid = set(TTFont(solid_font).getBestCmap())
    brands = {n for n in used if int(codes[n], 16) not in in_solid}
    solid_codes = {codes[n] for n in used if n not in brands} | extra

    def subset(font, cps):
        out = font + '.subset.woff2'
        subprocess.run([sys.executable, '-m', 'fontTools.subset', font,
                        '--unicodes=' + ','.join('U+' + c for c in sorted(cps)), '--flavor=woff2',
                        '--layout-features=*', '--no-hinting', '--output-file=' + out],
                       check=True, capture_output=True)
        return base64.b64encode(open(out, 'rb').read()).decode()

    solid_b64 = subset(solid_font, solid_codes)
    brands_b64 = subset(brands_font, {codes[n] for n in brands})
    rules = '\n'.join('.fa-%s:before { content: "\\%s"; }' % (n, codes[n]) for n in used)

    out = '''/*!
 * Icons: a subset of Font Awesome Free 6.4.0 by @fontawesome (https://fontawesome.com)
 * License: https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT)
 * Built by tools/build-icons.py with only the icons this site uses. Don't edit by hand:
 * add the icon to a page, then run  python3 tools/build-icons.py
 */
@font-face {
    font-family: "Font Awesome 6 Free";
    font-style: normal;
    font-weight: 900;
    font-display: block;
    src: url("data:font/woff2;base64,%s") format("woff2");
}

@font-face {
    font-family: "Font Awesome 6 Brands";
    font-style: normal;
    font-weight: 400;
    font-display: block;
    src: url("data:font/woff2;base64,%s") format("woff2");
}

.fa-solid,
.fa-brands {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    line-height: 1;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.fa-solid { font-family: "Font Awesome 6 Free"; font-weight: 900; }
.fa-brands { font-family: "Font Awesome 6 Brands"; font-weight: 400; }

.fa-fw { width: 1.25em; text-align: center; }

.fa-spin { animation: fa-spin 2s linear infinite; }

@keyframes fa-spin {
    to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
    .fa-spin { animation: none; }
}

%s
''' % (solid_b64, brands_b64, rules)
    path = os.path.join(ROOT, 'css', 'icons.css')
    open(path, 'w', encoding='utf-8').write(out)
    print('css/icons.css: %d icons (%d brand), %.1f KB' % (len(used), len(brands), len(out) / 1024))


if __name__ == '__main__':
    main()
