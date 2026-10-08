/**
 * MARA INFRA SOLUTIONS - ANIMATIONS & HIGH-TECH INTERACTIVE MODULE
 * Scroll reveal triggers, animated number counters, and interactive diagnostic widget.
 */

export function initAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        initScrollReveals();
        initNumberCounters();
    }
    
    initDiagnosticWidget();
}

// IntersectionObserver Scroll Reveals
function initScrollReveals() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-fade-up, .reveal-scale-in').forEach(el => {
        observer.observe(el);
    });
}

// Animated Number Counter
function initNumberCounters() {
    const counterElements = document.querySelectorAll('.animate-counter');
    if (counterElements.length === 0) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endVal = parseInt(target.getAttribute('data-target'), 10);
                const suffix = target.getAttribute('data-suffix') || '';
                animateValue(target, 0, endVal, 1500, suffix);
                obs.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => observer.observe(el));
}

function animateValue(obj, start, end, duration, suffix) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        obj.innerHTML = `${current.toLocaleString()}${suffix}`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Interactive High-Tech Diagnostic Troubleshooter Widget
function initDiagnosticWidget() {
    const diagContainer = document.querySelector('#diagnostic-widget-container');
    if (!diagContainer) return;

    const diagnosticData = {
        roof: {
            title: "Terrace & Roof Moisture Seepage",
            cause: "Thermal expansion cracks in concrete slab & UV breakdown of uncertified surface coatings.",
            system: "Weber Elastomeric Slurry System",
            product: "Weber Dry Protect Coating",
            productId: "weber-dry-protect",
            specs: "2-part polymer modified slurry coat with glass fiber reinforcing mesh.",
            warranty: "10-Year Water-Tightness Guarantee Certificate"
        },
        bathroom: {
            title: "Bathroom & Wet-Area Sub-Surface Dampness",
            cause: "Water absorption through traditional cement tile grout & unsealed floor-wall joints.",
            system: "Weber 100% Epoxy Hygienic Joint System",
            product: "Weber Color Epoxy Grout",
            productId: "weber-color-epoxy",
            specs: "3-component resinous epoxy grout. 100% non-porous and stain proof.",
            warranty: "Lifetime Zero-Stain & Mold Immunity"
        },
        hollow: {
            title: "Tile Debonding & Hollow Sound",
            cause: "Using traditional sand-cement mortar beds which shrink and lose adhesion on low-porosity vitrified tiles.",
            system: "Weber High-Polymer Bed Adhesive System",
            product: "Weber Set Polymer Tile Adhesive",
            productId: "weber-set-polymer",
            specs: "Polymer modified thin-bed mortar. C2TE high bond strength for wall & floor.",
            warranty: "High Impact & Shock-Resistant Adhesion"
        },
        wall: {
            title: "Exterior Wall Hairline Cracks",
            cause: "Atmospheric thermal stress and brittle wall putty cracking under sun exposure.",
            system: "Weberwall Finecoat Skim Mortar System",
            product: "Weberwall Finecoat Finishing Mortar",
            productId: "weberwall-finecoat",
            specs: "Polymer skim coat that replaces wall putty and eliminates shrinkage cracks.",
            warranty: "Crack-Free Smooth Exterior Finish"
        }
    };

    let activeKey = 'roof';

    function renderDiagnosticUI() {
        const item = diagnosticData[activeKey];
        diagContainer.innerHTML = `
            <div class="diagnostic-widget">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid var(--color-border); padding-bottom: 16px;">
                    <div>
                        <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent); letter-spacing: 0.1em; text-transform: uppercase;">ENGINEERING TROUBLESHOOTER</span>
                        <h3 style="color: var(--color-text); margin-top: 4px;">Structural & Waterproofing Diagnostic System</h3>
                    </div>
                    <div style="font-size: 0.8rem; background: rgba(128, 0, 0, 0.2); border: 1px solid var(--color-secondary); color: var(--color-secondary-light); padding: 4px 12px; border-radius: var(--radius-full);">
                        <i class="fa-solid fa-microscope"></i> Live Technical Diagnostic
                    </div>
                </div>

                <div class="diagnostic-steps">
                    <div>
                        <label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 12px; color: var(--color-text-light);">
                            1. Select Your Building Structural Issue:
                        </label>
                        <div class="diagnostic-options">
                            <button type="button" class="diag-opt-btn ${activeKey === 'roof' ? 'active' : ''}" data-key="roof">
                                <i class="fa-solid fa-house-crack"></i>
                                <span>Roof Seepage</span>
                            </button>
                            <button type="button" class="diag-opt-btn ${activeKey === 'bathroom' ? 'active' : ''}" data-key="bathroom">
                                <i class="fa-solid fa-shower"></i>
                                <span>Bathroom Dampness</span>
                            </button>
                            <button type="button" class="diag-opt-btn ${activeKey === 'hollow' ? 'active' : ''}" data-key="hollow">
                                <i class="fa-solid fa-border-all"></i>
                                <span>Tile Debonding</span>
                            </button>
                            <button type="button" class="diag-opt-btn ${activeKey === 'wall' ? 'active' : ''}" data-key="wall">
                                <i class="fa-solid fa-spray-can-sparkles"></i>
                                <span>Wall Cracks</span>
                            </button>
                        </div>
                    </div>

                    <div class="diagnostic-result-card">
                        <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-secondary-dark); background: var(--color-secondary-light); padding: 4px 10px; border-radius: var(--radius-full); display: inline-block; margin-bottom: 12px;">RECOMMENDED ENGINEERING SPECIFICATION</span>
                        <h4 style="color: var(--color-text); font-size: 1.25rem; margin-bottom: 8px;">${item.title}</h4>
                        <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 16px;"><strong>Root Cause:</strong> ${item.cause}</p>

                        <div style="background: var(--color-surface-subtle); padding: 16px; border-radius: var(--radius-md); font-size: 0.875rem; margin-bottom: 16px; border-left: 3px solid var(--color-secondary);">
                            <div style="margin-bottom: 6px;"><strong>System Solution:</strong> ${item.system}</div>
                            <div style="margin-bottom: 6px;"><strong>Primary Product:</strong> ${item.product}</div>
                            <div><strong>Warranty:</strong> <span style="color: var(--color-accent-dark); font-weight: 700;">${item.warranty}</span></div>
                        </div>

                        <div style="display: flex; gap: 12px;">
                            <a href="product-detail.html?id=${item.productId}" class="btn btn-outline btn-sm">View Technical Details</a>
                            <button type="button" class="btn btn-primary btn-sm btn-enquire" data-product-name="${item.product} (${item.title})">
                                Request Inspection
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Attach click handlers to problem buttons
        diagContainer.querySelectorAll('.diag-opt-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                activeKey = btn.getAttribute('data-key');
                renderDiagnosticUI();
            });
        });
    }

    renderDiagnosticUI();
}
