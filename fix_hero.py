import re

with open('index.html', 'r') as f:
    content = f.read()

new_hero = """<!-- Modern Marquee Hero Section -->
        <section class="hero-modern" style="padding: 100px 0 60px 0; background: var(--color-background); overflow: hidden; position: relative;">
            
            <div class="container" style="text-align: center; max-width: 800px; margin: 0 auto 60px;">
                <span class="reveal-fade-up" style="display: inline-block; padding: 6px 16px; background: var(--color-secondary-light); color: var(--color-accent); border-radius: 20px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px;">Saint-Gobain Weber Official Distributor</span>
                <h1 class="reveal-fade-up reveal-delay-1" style="font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 24px; color: var(--color-text); letter-spacing: -0.03em;">Premium Construction & Glazing Solutions</h1>
                <p class="reveal-fade-up reveal-delay-2" style="font-size: 1.15rem; color: var(--color-text); line-height: 1.6; margin-bottom: 40px;">Supplying high-grade construction chemicals, tile adhesives, epoxy grouts, and structural glazing systems in Hosur & Krishnagiri.</p>
                <div class="reveal-fade-up reveal-delay-3" style="display: flex; gap: 16px; justify-content: center;">
                    <a href="#product-catalog-grid" class="btn btn-primary" style="padding: 16px 32px; font-size: 1.1rem; border-radius: 12px; box-shadow: 0 10px 20px rgba(179, 0, 0, 0.2);">Explore Catalog</a>
                    <a href="contact.html" class="btn btn-outline" style="padding: 16px 32px; font-size: 1.1rem; border-radius: 12px; border: 2px solid var(--color-border); color: var(--color-text);">Contact Sales</a>
                </div>
            </div>

            <!-- Infinite Scrolling Product Marquee -->
            <div class="marquee-wrapper reveal-fade-up reveal-delay-4" style="width: 100vw; overflow: hidden; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; padding: 20px 0;">
                
                <style>
                    .marquee-track {
                        display: flex;
                        gap: 30px;
                        width: max-content;
                        animation: scroll-left 25s linear infinite;
                    }
                    .marquee-track:hover {
                        animation-play-state: paused;
                    }
                    @keyframes scroll-left {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-50% - 15px)); }
                    }
                    .marquee-item {
                        width: 250px;
                        height: 250px;
                        background: var(--color-surface);
                        border: 1px solid var(--color-border);
                        border-radius: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 30px;
                        box-shadow: 0 10px 30px rgba(179, 0, 0, 0.05);
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                        cursor: pointer;
                    }
                    .marquee-item:hover {
                        transform: translateY(-10px);
                        box-shadow: 0 20px 40px rgba(179, 0, 0, 0.15);
                        border-color: var(--color-accent);
                    }
                    .marquee-item img {
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: contain;
                    }
                </style>

                <div class="marquee-track">
                    <!-- Original -->
                    <div class="marquee-item"><img src="assets/images/weber_tile_adhesive.png" alt="Tile Adhesive"></div>
                    <div class="marquee-item"><img src="assets/images/epoxy_grout.png" alt="Epoxy Grout"></div>
                    <div class="marquee-item"><img src="assets/images/waterproofing.png" alt="Waterproofing"></div>
                    <div class="marquee-item"><img src="assets/images/addon_chem.png" alt="Addon Chem"></div>
                    <div class="marquee-item"><img src="assets/images/weberwall_finecoat.png" alt="Finecoat"></div>
                    <div class="marquee-item"><img src="assets/images/glazing.png" alt="Glazing"></div>
                    <div class="marquee-item"><img src="assets/images/hero.png" alt="Glazing Systems"></div>
                    <!-- Duplicate for infinite loop -->
                    <div class="marquee-item"><img src="assets/images/weber_tile_adhesive.png" alt="Tile Adhesive"></div>
                    <div class="marquee-item"><img src="assets/images/epoxy_grout.png" alt="Epoxy Grout"></div>
                    <div class="marquee-item"><img src="assets/images/waterproofing.png" alt="Waterproofing"></div>
                    <div class="marquee-item"><img src="assets/images/addon_chem.png" alt="Addon Chem"></div>
                    <div class="marquee-item"><img src="assets/images/weberwall_finecoat.png" alt="Finecoat"></div>
                    <div class="marquee-item"><img src="assets/images/glazing.png" alt="Glazing"></div>
                    <div class="marquee-item"><img src="assets/images/hero.png" alt="Glazing Systems"></div>
                </div>
            </div>
            
        </section>"""

pattern = re.compile(r'<!-- Full-Width Hero Slider Section -->.*?</section>', re.DOTALL)
content = pattern.sub(new_hero, content)

with open('index.html', 'w') as f:
    f.write(content)

print("Updated Hero Section.")
