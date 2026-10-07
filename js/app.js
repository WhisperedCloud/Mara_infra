/**
 * MARA INFRA SOLUTIONS - STANDALONE COMPATIBLE APP SCRIPT
 * Compatible with local file:// protocol and web servers alike.
 * Handles Navigation, Dynamic Catalog, Filtering, Live Search, Product Detail, Modal Enquiries, and Animations.
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        // Mark document as JS ready for smooth progressive enhancement
        document.documentElement.classList.add('js-reveal-ready');

        initNavigation();
        initAnimations();
        initDiagnosticWidget();
        initEnquiryModal();

        // Catalog & Filters Page (products.html)
        const catalogContainer = document.querySelector('#product-catalog-grid');
        if (catalogContainer && window.products) {
            initCatalogAndFilters(window.products, catalogContainer);
        }

        // Product Detail Page (product-detail.html)
        const detailContainer = document.querySelector('#product-detail-container');
        if (detailContainer && window.products) {
            initProductDetail(window.products, detailContainer);
        }
    });

    /* ==========================================================================
       1. NAVIGATION MODULE
       ========================================================================== */
    function initNavigation() {
        const header = document.querySelector('.site-header');
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 30) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                const isOpen = navMenu.classList.toggle('active');
                mobileToggle.setAttribute('aria-expanded', isOpen);
                mobileToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
                document.body.style.overflow = isOpen ? 'hidden' : '';
            });

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    if (mobileToggle) mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
                });
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    if (mobileToggle) mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
                }
            });
        }

        // Highlight active link based on URL
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /* ==========================================================================
       2. SCROLL REVEAL ANIMATIONS & COUNTERS
       ========================================================================== */
    function initAnimations() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Scroll Reveals
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-fade-up, .reveal-scale-in').forEach(el => observer.observe(el));

        // Animated Counters
        const counterElements = document.querySelectorAll('.animate-counter');
        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endVal = parseInt(target.getAttribute('data-target'), 10);
                    const suffix = target.getAttribute('data-suffix') || '';
                    animateCounterValue(target, 0, endVal, 1500, suffix);
                    obs.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        counterElements.forEach(el => counterObserver.observe(el));
    }

    function animateCounterValue(obj, start, end, duration, suffix) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            obj.innerHTML = `${current.toLocaleString()}${suffix}`;
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    /* ==========================================================================
       3. HIGH-TECH DIAGNOSTIC TROUBLESHOOTER WIDGET
       ========================================================================== */
    function initDiagnosticWidget() {
        const diagContainer = document.querySelector('#diagnostic-widget-container');
        if (!diagContainer) return;

        const diagnosticKeys = ['roof', 'bathroom', 'hollow', 'wall'];
        const diagnosticData = {
            roof: {
                title: "Terrace & Roof Moisture Seepage",
                cause: "Thermal expansion cracks in concrete slab & UV breakdown of uncertified surface coatings.",
                system: "Saint-Gobain Weber Elastomeric Slurry System",
                product: "Weber Dry Protect Coating",
                productId: "weber-dry-protect",
                specs: "2-part polymer modified slurry coat with glass fiber reinforcing mesh.",
                warranty: "10-Year Water-Tightness Guarantee Certificate",
                icon: "fa-house-crack"
            },
            bathroom: {
                title: "Bathroom & Wet-Area Sub-Surface Dampness",
                cause: "Water absorption through traditional cement tile grout & unsealed floor-wall joints.",
                system: "Weber 100% Epoxy Hygienic Joint System",
                product: "Weber Color Epoxy Grout",
                productId: "weber-color-epoxy",
                specs: "3-component resinous epoxy grout. 100% non-porous and stain proof.",
                warranty: "Lifetime Zero-Stain & Mold Immunity",
                icon: "fa-shower"
            },
            hollow: {
                title: "Tile Debonding & Hollow Sound",
                cause: "Using traditional sand-cement mortar beds which shrink and lose adhesion on vitrified tiles.",
                system: "Weber High-Polymer Bed Adhesive System",
                product: "Weber Set Polymer Tile Adhesive",
                productId: "weber-set-polymer",
                specs: "Polymer modified thin-bed mortar. C2TE high bond strength for wall & floor.",
                warranty: "High Impact & Shock-Resistant Adhesion",
                icon: "fa-border-all"
            },
            wall: {
                title: "Exterior Wall Hairline Cracks",
                cause: "Atmospheric thermal stress and brittle wall putty cracking under sun exposure.",
                system: "Weberwall Finecoat Skim Mortar System",
                product: "Weberwall Finecoat Finishing Mortar",
                productId: "weberwall-finecoat",
                specs: "Polymer skim coat that replaces wall putty and eliminates shrinkage cracks.",
                warranty: "Crack-Free Smooth Exterior Finish",
                icon: "fa-spray-can-sparkles"
            }
        };

        let currentIndex = 0;
        let autoRotateTimer = null;
        let isPaused = false;
        const ROTATE_INTERVAL = 4000; // 4 seconds

        // Render skeleton layout ONCE
        diagContainer.innerHTML = `
            <div class="diagnostic-widget" id="diag-widget-wrapper">
                <div class="diag-progress-bar-wrap">
                    <div class="diag-progress-bar" id="diag-progress-bar"></div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid var(--color-border); padding-bottom: 16px; flex-wrap: wrap; gap: 12px;">
                    <div>
                        <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent); letter-spacing: 0.12em; text-transform: uppercase;">
                            AUTOMATIC ENGINEERING TROUBLESHOOTER
                        </span>
                        <h3 style="color: var(--color-text); margin-top: 4px; font-size: 1.5rem;">Structural & Waterproofing Diagnostic System</h3>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 0.75rem; color: #94a3b8; font-weight: 500;" id="diag-counter-text">Card 1 of 4</span>
                        <button type="button" id="diag-play-pause-btn" style="background: var(--color-surface-subtle); border: 1px solid var(--color-border); color: var(--color-text); padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; cursor: pointer; display: flex; align-items: center; gap: 6px;" title="Toggle Auto Switch">
                            <i class="fa-solid fa-pause" id="diag-play-pause-icon"></i> <span id="diag-play-pause-text">Auto Switching</span>
                        </button>
                    </div>
                </div>

                <div class="diagnostic-steps">
                    <div>
                        <label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 14px; color: var(--color-text-light);">
                            1. Select Issue Or Watch Auto Rotation:
                        </label>
                        <div class="diagnostic-options" id="diag-options-grid">
                            ${diagnosticKeys.map((key, idx) => {
                                const d = diagnosticData[key];
                                return `
                                    <button type="button" class="diag-opt-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}" data-key="${key}">
                                        <i class="fa-solid ${d.icon}"></i>
                                        <span>${key === 'roof' ? 'Roof Seepage' : key === 'bathroom' ? 'Bathroom Dampness' : key === 'hollow' ? 'Tile Debonding' : 'Wall Cracks'}</span>
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <div class="diagnostic-result-card" id="diag-result-card">
                        <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-secondary-dark); background: var(--color-secondary-light); padding: 4px 10px; border-radius: var(--radius-full); display: inline-block; margin-bottom: 12px;">RECOMMENDED SPECIFICATION</span>
                        <h4 style="color: var(--color-text); font-size: 1.3rem; margin-bottom: 8px;" id="diag-res-title"></h4>
                        <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: 16px; line-height: 1.5;"><strong>Root Cause:</strong> <span id="diag-res-cause"></span></p>

                        <div style="background: var(--color-surface-subtle); padding: 16px; border-radius: var(--radius-md); font-size: 0.875rem; margin-bottom: 18px; border-left: 4px solid var(--color-secondary);">
                            <div style="margin-bottom: 8px;"><strong>System Solution:</strong> <span style="color: var(--color-text); font-weight: 600;" id="diag-res-system"></span></div>
                            <div style="margin-bottom: 8px;"><strong>Primary Product:</strong> <span style="color: var(--color-secondary-dark); font-weight: 700;" id="diag-res-product"></span></div>
                            <div><strong>Warranty:</strong> <span style="color: var(--color-accent-dark); font-weight: 700;"><i class="fa-solid fa-shield-halved"></i> <span id="diag-res-warranty"></span></span></div>
                        </div>

                        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                            <a href="#" id="diag-res-link" class="btn btn-outline btn-sm">View Technical Details &rarr;</a>
                            <button type="button" id="diag-res-enquire-btn" class="btn btn-primary btn-sm btn-enquire">
                                Request Inspection
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const progressBar = diagContainer.querySelector('#diag-progress-bar');
        const counterText = diagContainer.querySelector('#diag-counter-text');
        const playPauseBtn = diagContainer.querySelector('#diag-play-pause-btn');
        const playPauseIcon = diagContainer.querySelector('#diag-play-pause-icon');
        const playPauseText = diagContainer.querySelector('#diag-play-pause-text');
        const optionBtns = diagContainer.querySelectorAll('.diag-opt-btn');
        const resultCard = diagContainer.querySelector('#diag-result-card');

        const resTitle = diagContainer.querySelector('#diag-res-title');
        const resCause = diagContainer.querySelector('#diag-res-cause');
        const resSystem = diagContainer.querySelector('#diag-res-system');
        const resProduct = diagContainer.querySelector('#diag-res-product');
        const resWarranty = diagContainer.querySelector('#diag-res-warranty');
        const resLink = diagContainer.querySelector('#diag-res-link');
        const resEnquireBtn = diagContainer.querySelector('#diag-res-enquire-btn');

        function updateCardUI(idx) {
            currentIndex = idx;
            const activeKey = diagnosticKeys[currentIndex];
            const item = diagnosticData[activeKey];

            // Update button active states
            optionBtns.forEach((btn, bIdx) => {
                if (bIdx === currentIndex) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            // Smooth fade update for content
            resultCard.style.opacity = '0.5';
            resultCard.style.transform = 'translateY(4px)';

            setTimeout(() => {
                resTitle.textContent = item.title;
                resCause.textContent = item.cause;
                resSystem.textContent = item.system;
                resProduct.textContent = item.product;
                resWarranty.textContent = item.warranty;
                resLink.href = `product-detail.html?id=${item.productId}`;
                resEnquireBtn.setAttribute('data-product-name', `${item.product} (${item.title})`);
                counterText.textContent = `Card ${currentIndex + 1} of ${diagnosticKeys.length}`;

                resultCard.style.transition = 'all 0.25s ease';
                resultCard.style.opacity = '1';
                resultCard.style.transform = 'translateY(0)';
            }, 100);

            resetProgressBar();
        }

        function resetProgressBar() {
            if (!progressBar) return;
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            void progressBar.offsetWidth; // Force reflow
            if (!isPaused) {
                progressBar.style.transition = `width ${ROTATE_INTERVAL}ms linear`;
                progressBar.style.width = '100%';
            }
        }

        function startTimer() {
            stopTimer();
            isPaused = false;
            playPauseIcon.className = 'fa-solid fa-pause';
            playPauseText.textContent = 'Auto Switching';
            resetProgressBar();
            autoRotateTimer = setInterval(() => {
                const nextIdx = (currentIndex + 1) % diagnosticKeys.length;
                updateCardUI(nextIdx);
            }, ROTATE_INTERVAL);
        }

        function stopTimer() {
            if (autoRotateTimer) {
                clearInterval(autoRotateTimer);
                autoRotateTimer = null;
            }
            isPaused = true;
            playPauseIcon.className = 'fa-solid fa-play';
            playPauseText.textContent = 'Paused';
            if (progressBar) {
                progressBar.style.transition = 'none';
            }
        }

        // Click handlers for option buttons
        optionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const newIdx = parseInt(btn.getAttribute('data-index'), 10);
                updateCardUI(newIdx);
                if (!isPaused) {
                    startTimer();
                }
            });
        });

        // Play / Pause button
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                if (isPaused) {
                    startTimer();
                } else {
                    stopTimer();
                }
            });
        }

        // Start auto-rotation immediately
        updateCardUI(0);
        startTimer();
    }

    /* ==========================================================================
       4. PRODUCT CATALOG & FILTERS (products.html)
       ========================================================================== */
    function renderProductCardHTML(product) {
        return `
            <article class="product-card" data-id="${product.id}" data-category="${product.category}">
                <span class="product-card-badge">${product.brand}</span>
                <img src="${product.image}" alt="${product.name}" class="product-card-image" loading="lazy">
                <div class="product-card-body">
                    <span class="product-card-category">${product.categoryName}</span>
                    <h3 class="product-card-title">
                        <a href="product-detail.html?id=${product.id}">${product.name}</a>
                    </h3>
                    <p class="product-card-desc">${product.shortDescription}</p>
                    <div class="product-card-footer">
                        <a href="product-detail.html?id=${product.id}" class="btn btn-outline btn-sm">View Product Details</a>
                        <button type="button" class="btn btn-primary btn-sm btn-enquire" data-product-id="${product.id}" data-product-name="${product.name}">
                            Enquire Now
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    function initCatalogAndFilters(allProducts, containerEl) {
        const countEl = document.querySelector('#product-count');
        const searchInput = document.querySelector('#product-search');
        const filterPills = document.querySelectorAll('.filter-pill');

        let activeCategory = 'all';

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('category')) activeCategory = urlParams.get('category');

        function applyFilters() {
            const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

            const filtered = allProducts.filter(p => {
                const matchCat = (activeCategory === 'all') || (p.category === activeCategory);
                const matchQuery = !query || (
                    p.name.toLowerCase().includes(query) ||
                    p.categoryName.toLowerCase().includes(query) ||
                    p.brand.toLowerCase().includes(query) ||
                    p.shortDescription.toLowerCase().includes(query)
                );
                return matchCat && matchQuery;
            });

            if (countEl) countEl.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;

            if (filtered.length === 0) {
                containerEl.innerHTML = `
                    <div class="empty-state" style="grid-column: 1 / -1;">
                        <div class="empty-state-icon"><i class="fa-solid fa-box-open"></i></div>
                        <h3>No products found</h3>
                        <p>Try searching with another keyword or select all products.</p>
                    </div>
                `;
                return;
            }

            containerEl.innerHTML = filtered.map(renderProductCardHTML).join('');
        }

        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeCategory = pill.getAttribute('data-category');
                applyFilters();
            });
        });

        if (searchInput) {
            let timer;
            searchInput.addEventListener('input', () => {
                clearTimeout(timer);
                timer = setTimeout(applyFilters, 150);
            });
        }

        // Set active pill state from URL
        filterPills.forEach(pill => {
            if (pill.getAttribute('data-category') === activeCategory) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });

        applyFilters();
    }

    /* ==========================================================================
       5. DYNAMIC PRODUCT DETAIL RENDERER (product-detail.html)
       ========================================================================== */
    function initProductDetail(allProducts, detailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = allProducts.find(p => p.id === productId);

        if (!product) {
            detailContainer.innerHTML = `
                <div class="container section text-center">
                    <h2>Product Not Found</h2>
                    <p>The product you requested does not exist or may have been updated.</p>
                    <a href="products.html" class="btn btn-primary mt-4">Explore Products Catalogue</a>
                </div>
            `;
            return;
        }

        document.title = `${product.name} | Mara Infra Solutions`;

        const specEntries = Object.entries(product.specifications || {}).filter(([k, v]) => Boolean(v));
        const specRows = specEntries.map(([key, val]) => {
            const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            return `<tr><th>${formattedKey}</th><td>${val}</td></tr>`;
        }).join('');

        const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

        detailContainer.innerHTML = `
            <section class="section section-alt">
                <div class="container">
                    <div style="display: grid; grid-template-columns: 1fr 1.1fr; gap: 48px; align-items: center;">
                        <div>
                            <img src="${product.image}" alt="${product.name}" style="border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); max-height: 420px; width: 100%; object-fit: cover;">
                        </div>
                        <div>
                            <span class="product-card-badge" style="position: static; display: inline-block; margin-bottom: 12px;">${product.brand}</span>
                            <h1 style="font-size: 2.4rem; margin-bottom: 16px;">${product.name}</h1>
                            <p style="font-size: 1.1rem; color: var(--color-text); font-weight: 600; margin-bottom: 16px;">${product.shortDescription}</p>
                            <p>${product.description}</p>
                            <div style="display: flex; gap: 16px; margin-top: 28px;">
                                <button type="button" class="btn btn-primary btn-lg btn-enquire" data-product-name="${product.name}">
                                    <i class="fa-solid fa-envelope"></i> Enquire About This Product
                                </button>
                                <a href="#specifications" class="btn btn-outline btn-lg">Technical Specs</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px;">
                        <div>
                            <h3><i class="fa-solid fa-bullseye" style="color: var(--color-secondary);"></i> Key Applications</h3>
                            <ul style="list-style: none; margin-top: 16px; display: flex; flex-direction: column; gap: 10px;">
                                ${product.applications.map(app => `<li style="display: flex; gap: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--color-accent); margin-top: 4px;"></i> <span>${app}</span></li>`).join('')}
                            </ul>
                        </div>
                        <div>
                            <h3><i class="fa-solid fa-layer-group" style="color: var(--color-secondary);"></i> Suitable Substrates</h3>
                            <ul style="list-style: none; margin-top: 16px; display: flex; flex-direction: column; gap: 10px;">
                                ${product.substrates.map(sub => `<li style="display: flex; gap: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--color-accent); margin-top: 4px;"></i> <span>${sub}</span></li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="specifications" class="section section-alt">
                <div class="container">
                    <h3 style="margin-bottom: 24px;">Technical Specifications</h3>
                    <div class="spec-table-wrapper">
                        <table class="spec-table">
                            <tbody>${specRows}</tbody>
                        </table>
                    </div>
                </div>
            </section>

            ${related.length > 0 ? `
                <section class="section">
                    <div class="container">
                        <h3 style="margin-bottom: 24px;">Related Products</h3>
                        <div class="product-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;">
                            ${related.map(renderProductCardHTML).join('')}
                        </div>
                    </div>
                </section>
            ` : ''}
        `;
    }

    /* ==========================================================================
       6. ENQUIRY MODAL SYSTEM
       ========================================================================== */
    function initEnquiryModal() {
        if (!document.querySelector('#enquiry-modal-overlay')) {
            const modalHtml = `
                <div class="modal-overlay" id="enquiry-modal-overlay">
                    <div class="modal-container">
                        <div class="modal-header">
                            <h3 class="modal-title" id="modal-title">Product Enquiry</h3>
                            <button type="button" class="modal-close" id="modal-close-btn">&times;</button>
                        </div>
                        <div class="modal-body" id="modal-body-content">
                            <form id="enquiry-form" novalidate>
                                <div class="form-group">
                                    <label class="form-label" for="enquiry-product">Selected Product / Subject</label>
                                    <input type="text" id="enquiry-product" class="form-input" readonly style="background-color: var(--color-surface-subtle); font-weight: 600;">
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="enquiry-name">Full Name *</label>
                                    <input type="text" id="enquiry-name" class="form-input" placeholder="e.g. Rajesh Kumar" required>
                                    <div class="form-error" id="error-name"></div>
                                </div>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                    <div class="form-group">
                                        <label class="form-label" for="enquiry-phone">Phone Number *</label>
                                        <input type="tel" id="enquiry-phone" class="form-input" placeholder="+91 98847 01587" required>
                                        <div class="form-error" id="error-phone"></div>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" for="enquiry-email">Email Address *</label>
                                        <input type="email" id="enquiry-email" class="form-input" placeholder="name@company.com" required>
                                        <div class="form-error" id="error-email"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="enquiry-req">Requirement Details *</label>
                                    <textarea id="enquiry-req" class="form-textarea" rows="3" placeholder="Tell us about your surface area (sq ft) or product quantity needed..." required></textarea>
                                    <div class="form-error" id="error-req"></div>
                                </div>
                                <button type="submit" class="btn btn-primary btn-block btn-lg"><i class="fa-solid fa-paper-plane"></i> Submit Enquiry</button>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }

        const overlay = document.querySelector('#enquiry-modal-overlay');
        const closeBtn = document.querySelector('#modal-close-btn');

        function openModal(pName = 'General Enquiry') {
            if (!overlay) return;
            document.querySelector('#enquiry-product').value = pName;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            if (!overlay) return;
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-enquire');
            if (btn) {
                e.preventDefault();
                const pName = btn.getAttribute('data-product-name') || 'General Enquiry';
                openModal(pName);
            }
        });

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeModal();
            });
        }

        const form = document.querySelector('#enquiry-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

                const name = document.querySelector('#enquiry-name').value.trim();
                const phone = document.querySelector('#enquiry-phone').value.trim();
                const email = document.querySelector('#enquiry-email').value.trim();
                const req = document.querySelector('#enquiry-req').value.trim();

                let valid = true;
                if (!name || name.length < 2) {
                    document.querySelector('#error-name').textContent = 'Please enter your name.';
                    valid = false;
                }
                if (!phone || phone.length < 8) {
                    document.querySelector('#error-phone').textContent = 'Please enter a valid phone number.';
                    valid = false;
                }
                if (!email || !email.includes('@')) {
                    document.querySelector('#error-email').textContent = 'Please enter a valid email.';
                    valid = false;
                }
                if (!req || req.length < 5) {
                    document.querySelector('#error-req').textContent = 'Please enter requirement details.';
                    valid = false;
                }

                if (valid) {
                    document.querySelector('#modal-body-content').innerHTML = `
                        <div style="text-align: center; padding: 24px;">
                            <div style="width: 56px; height: 56px; background: var(--color-accent-light); color: var(--color-accent-dark); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 1.5rem;">
                                <i class="fa-solid fa-check"></i>
                            </div>
                            <h3>Enquiry Submitted</h3>
                            <p style="margin-top: 8px;">Thank you ${name}! Our technical team for Hosur & Krishnagiri will contact you shortly.</p>
                            <button type="button" class="btn btn-primary mt-6" onclick="document.querySelector('#enquiry-modal-overlay').classList.remove('active'); document.body.style.overflow='';">Continue Browsing</button>
                        </div>
                    `;
                }
            });
        }
    }

})();
