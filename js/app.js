/**
 * MARA INFRA CONSTRUCTIONS - STANDALONE COMPATIBLE APP SCRIPT
 * Compatible with local file:// protocol and web servers alike.
 * Handles navigation, scroll animations, enquiry forms and homepage interactions.
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        // Mark document as JS ready for smooth progressive enhancement
        document.documentElement.classList.add('js-reveal-ready');

        initNavigation();
        initAnimations();
        initEnquiryModal();
        initStoryScroll();
        initServiceMarquee();
        initProcessSteps();
        initPageTransitions();
        initLightbox();
        initGalleryFilters();
        initReviewClamp();
        initLetterDialog();
        initAccessibilityHelpers();
        initTracking();
        initDropdowns();
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
            mobileToggle.setAttribute('aria-expanded', 'false');

            const closeMobileMenu = () => {
                navMenu.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            };

            mobileToggle.addEventListener('click', () => {
                const isOpen = navMenu.classList.toggle('active');
                mobileToggle.setAttribute('aria-expanded', isOpen);
                mobileToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
            });

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    closeMobileMenu();
                });
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            });

            // The mobile menu should never travel with the page.
            window.addEventListener('scroll', () => {
                if (navMenu.classList.contains('active')) closeMobileMenu();
            }, { passive: true });
            document.addEventListener('touchmove', () => {
                if (navMenu.classList.contains('active')) closeMobileMenu();
            }, { passive: true });
        }

        // Dynamic Active Link Navigation & Intelligent ScrollSpy
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const isHomePage = currentPath === 'index.html' || currentPath === '';

        function setActiveNav(targetHref) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === targetHref) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }

        if (!isHomePage) {
            // Static active link for dedicated subpages (about.html, contact.html, etc.)
            setActiveNav(currentPath);
        } else {
            // Intelligent ScrollSpy for Home Page
            setActiveNav('index.html');

            // Smooth scroll to top when clicking Home link while already on home page
            navLinks.forEach(link => {
                if (link.getAttribute('href') === 'index.html') {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    });
                }
            });

            let ticking = false;

            function updateScrollSpy() {
                const scrollY = window.scrollY;
                const headerHeight = header ? header.offsetHeight : 70;
                const triggerPoint = headerHeight + 120; // Visual reading line below sticky header

                // 1. If at the top of the page, always highlight Home
                if (scrollY < 200) {
                    setActiveNav('index.html');
                    ticking = false;
                    return;
                }

                // 2. If scrolled near the bottom of the page, highlight Contact
                if ((window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 80)) {
                    setActiveNav('contact.html');
                    ticking = false;
                    return;
                }

                // 3. Highlight the page that matches the section under the reading line
                const primarySections = [
                    { id: 'contact', href: 'contact.html' },
                    { id: 'projects', href: 'gallery.html' },
                    { id: 'why-choose-us', href: 'about.html' },
                    { id: 'about', href: 'about.html' },
                    { id: 'services-overview', href: 'construction.html' }
                ];

                for (const sec of primarySections) {
                    const el = document.getElementById(sec.id);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
                            setActiveNav(sec.href);
                            ticking = false;
                            return;
                        }
                    }
                }

                setActiveNav('index.html');

                ticking = false;
            }

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(updateScrollSpy);
                    ticking = true;
                }
            }, { passive: true });

            // Initial execution
            updateScrollSpy();
        }
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

        document.querySelectorAll('.reveal-fade-up, .reveal-scale-in, [data-reveal]').forEach(el => observer.observe(el));

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
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * (end - start) + start);
            obj.innerHTML = `${current.toLocaleString()}${suffix}`;
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    /* ==========================================================================
       3. ENQUIRY MODAL SYSTEM
       ========================================================================== */
    function initEnquiryModal() {
        if (!document.querySelector('#enquiry-modal-overlay')) {
            const modalHtml = `
                <div class="modal-overlay" id="enquiry-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-hidden="true">
                    <div class="modal-container">
                        <div class="modal-header">
                            <h3 class="modal-title" id="modal-title">Request a quote</h3>
                            <button type="button" class="modal-close" id="modal-close-btn" aria-label="Close">&times;</button>
                        </div>
                        <div class="modal-body" id="modal-body-content">
                            <form id="enquiry-form" novalidate>
                                <input type="checkbox" id="enquiry-botcheck" name="botcheck" style="display:none" tabindex="-1" autocomplete="off" aria-hidden="true">
                                <div class="form-group">
                                    <label class="form-label" for="enquiry-product">Project type</label>
                                    <input type="text" id="enquiry-product" class="form-input" readonly style="font-weight: 600;">
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="enquiry-name">Full Name *</label>
                                    <input type="text" id="enquiry-name" class="form-input" placeholder="Enter your full name" autocomplete="name" required>
                                    <div class="form-error" id="error-name"></div>
                                </div>
                                <div class="modal-phone-email-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                    <div class="form-group">
                                        <label class="form-label" for="enquiry-phone">Phone Number *</label>
                                        <input type="tel" id="enquiry-phone" class="form-input" placeholder="Enter your mobile number" autocomplete="tel" required>
                                        <div class="form-error" id="error-phone"></div>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" for="enquiry-email">Email Address <span class="ct-optional">(optional)</span></label>
                                        <input type="email" id="enquiry-email" class="form-input" placeholder="Enter your email address" autocomplete="email">
                                        <div class="form-error" id="error-email"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="enquiry-req">Requirement Details *</label>
                                    <textarea id="enquiry-req" class="form-textarea" rows="3" placeholder="Please provide details about your project requirements..." required></textarea>
                                    <div class="form-error" id="error-req"></div>
                                </div>
                                <button type="submit" class="btn btn-primary btn-block btn-lg"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Submit Enquiry</button>
                            </form>
                            <div class="form-status" id="enquiry-status" role="status" hidden></div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }

        const overlay = document.querySelector('#enquiry-modal-overlay');
        const closeBtn = document.querySelector('#modal-close-btn');
        const form = document.querySelector('#enquiry-form');
        const status = document.querySelector('#enquiry-status');
        if (!overlay || !form || !status) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        const submitLabel = submitBtn.innerHTML;
        let lastFocus = null;

        // Each opening starts from a clean form, even after a previous submission
        function showForm() {
            form.reset();
            form.hidden = false;
            status.hidden = true;
            status.replaceChildren();
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitLabel;
            form.querySelectorAll('.form-error').forEach(el => { el.textContent = ''; });
        }

        function showStatus(icon, title, message) {
            const iconEl = document.createElement('div');
            iconEl.className = 'form-status-icon';
            iconEl.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i>`;
            const heading = document.createElement('h3');
            heading.textContent = title;
            const text = document.createElement('p');
            text.textContent = message;
            const doneBtn = document.createElement('button');
            doneBtn.type = 'button';
            doneBtn.className = 'btn btn-primary';
            doneBtn.textContent = 'Close';
            doneBtn.addEventListener('click', closeModal);
            status.replaceChildren(iconEl, heading, text, doneBtn);
            form.hidden = true;
            status.hidden = false;
            doneBtn.focus();
        }

        function openModal(pName = 'General Enquiry') {
            showForm();
            document.querySelector('#enquiry-product').value = pName;
            lastFocus = document.activeElement;
            overlay.classList.add('active');
            overlay.setAttribute('aria-hidden', 'false');
            overlay.scrollTop = 0;
            document.body.style.overflow = 'hidden';
            const nameInput = document.querySelector('#enquiry-name');
            requestAnimationFrame(() => nameInput.focus());
            setTimeout(() => { if (document.activeElement !== nameInput) nameInput.focus(); }, 320);
        }

        function closeModal() {
            if (!overlay.classList.contains('active')) return;
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
        }

        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-enquire');
            if (btn) {
                e.preventDefault();
                openModal(btn.getAttribute('data-product-name') || 'General Enquiry');
                track('Quote form opened', { place: placeOf(btn) });
            }
        });

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay && window.innerWidth > 768) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.querySelectorAll('.form-error').forEach(el => { el.textContent = ''; });

            const product = document.querySelector('#enquiry-product').value;
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
            if (email && !email.includes('@')) {
                document.querySelector('#error-email').textContent = 'Please enter a valid email.';
                valid = false;
            }
            if (!req || req.length < 5) {
                document.querySelector('#error-req').textContent = 'Please enter requirement details.';
                valid = false;
            }
            [['#enquiry-name', '#error-name'], ['#enquiry-phone', '#error-phone'], ['#enquiry-email', '#error-email'], ['#enquiry-req', '#error-req']].forEach(([field, err]) => {
                const input = document.querySelector(field);
                const hasError = !!document.querySelector(err).textContent;
                input.setAttribute('aria-invalid', String(hasError));
                input.setAttribute('aria-describedby', err.slice(1));
            });
            if (!valid) {
                const firstBad = form.querySelector('[aria-invalid="true"]');
                if (firstBad) firstBad.focus();
                return;
            }
            if (submitBtn.disabled) return;

            // Hidden honeypot: real visitors never tick it, so a ticked box means a bot
            if (document.querySelector('#enquiry-botcheck').checked) {
                showStatus('fa-check', 'Enquiry Submitted', 'Thank you! Our team will contact you shortly.');
                return;
            }

            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Sending...';
            submitBtn.disabled = true;

            const formData = new FormData();
            formData.append('access_key', '2c0746e7-ba78-4283-9d0d-338352e27cb6');
            formData.append('subject', 'New Project Enquiry - Mara Infra');
            formData.append('Product/Subject', product);
            formData.append('Name', name);
            formData.append('Phone', phone);
            formData.append('Email', email);
            formData.append('Requirements', req);

            fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
                .then(response => response.json().catch(() => ({ success: false })), error => { throw error; })
                .then(data => {
                    if (!data.success) {
                        showStatus('fa-circle-exclamation', "We couldn't send this",
                            'Please call +91 99621 16999 or email admin@marainfra.co.in, and our team will help you right away.');
                        return;
                    }
                    showStatus('fa-check', 'Enquiry Submitted', `Thank you, ${name}! Our team will contact you shortly.`);
                    track('Enquiry sent', { form: 'quote pop-up', service: product });
                })
                .catch(error => {
                    console.warn('Web3Forms unreachable, falling back to email:', error);
                    const emailSubject = encodeURIComponent(`New Project Enquiry - ${product}`);
                    const emailBody = encodeURIComponent(
                        `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nRequirement Details:\n${req}`
                    );
                    window.location.href = `mailto:admin@marainfra.co.in?subject=${emailSubject}&body=${emailBody}`;
                    showStatus('fa-envelope-open-text', 'Opening your email app',
                        "We couldn't reach our form service, so we're opening your email app with your enquiry filled in. If nothing opens, email admin@marainfra.co.in or call +91 99621 16999.");
                });
        });
    }

    /* ==========================================================================
       4. CONSTRUCTION STORY: STICKY PHOTO FOLLOWS THE SERVICE BEING READ
       ========================================================================== */
    function initStoryScroll() {
        const story = document.querySelector('[data-cs-story]');
        if (!story || !('IntersectionObserver' in window)) return;

        const steps = Array.from(story.querySelectorAll('.cs-step'));
        const shots = Array.from(story.querySelectorAll('.cs-shot'));
        const rail = Array.from(story.querySelectorAll('.cs-rail li'));
        const captionNum = story.querySelector('.cs-caption-num');
        const captionName = story.querySelector('.cs-caption-name');
        const frame = story.querySelector('.cs-frame');
        let current = 0;

        // The frame takes the exact shape of the photo on show, so no photo is cropped
        function sizeFrame(index) {
            if (!frame || !frame.clientWidth) return;
            const [w, h] = (shots[index].dataset.ratio || '').split('/').map(Number);
            if (w && h) frame.style.height = `${(frame.clientWidth * h) / w}px`;
        }

        function setStep(index) {
            current = index;
            sizeFrame(index);
            steps.forEach((step, i) => step.classList.toggle('is-current', i === index));
            shots.forEach((shot, i) => shot.classList.toggle('is-active', i === index));
            rail.forEach((item, i) => {
                item.classList.toggle('is-active', i === index);
                item.classList.toggle('is-done', i < index);
            });
            if (captionNum) captionNum.textContent = String(index + 1).padStart(2, '0');
            if (captionName) captionName.textContent = steps[index].querySelector('h2').textContent;
        }

        // The step crossing the middle of the screen is the one being read
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setStep(steps.indexOf(entry.target));
            });
        }, { rootMargin: '-50% 0px -50% 0px' });
        steps.forEach(step => observer.observe(step));

        sizeFrame(0);
        window.addEventListener('resize', () => sizeFrame(current));
    }

    /* ==========================================================================
       5. HERO SERVICES MARQUEE (index.html)
       ========================================================================== */
    function initServiceMarquee() {
        const marquee = document.querySelector('[data-svc-marquee]');
        if (!marquee) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const track = marquee.querySelector('.svc-marquee-track');
        const group = track.querySelector('.svc-marquee-group');
        const originals = Array.from(group.children);

        function hideCopy(node) {
            node.setAttribute('aria-hidden', 'true');
            node.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '-1'));
            return node;
        }

        // Repeat the services until one group is wider than the widest screen, so the loop never shows a gap
        const minWidth = Math.max(window.innerWidth, window.screen.width);
        for (let i = 0; i < 10 && group.scrollWidth < minWidth; i++) {
            originals.forEach(item => group.appendChild(hideCopy(item.cloneNode(true))));
        }

        // Two identical groups let the track slide by half its width and restart seamlessly
        track.appendChild(hideCopy(group.cloneNode(true)));

        const pixelsPerSecond = 40;
        track.style.setProperty('--svc-marquee-duration', `${group.scrollWidth / pixelsPerSecond}s`);
        marquee.classList.add('is-running');
    }

    /* ==========================================================================
       6. HOW WE WORK: ACTIVE STEP AND ITS PHOTO
       ========================================================================== */
    function initProcessSteps() {
        const wrap = document.querySelector('[data-hw]');
        if (!wrap) return;

        const steps = Array.from(wrap.querySelectorAll('.hw2-step'));
        const buttons = steps.map(step => step.querySelector('.hw2-btn'));
        const shots = Array.from(wrap.querySelectorAll('.hw2-shot'));
        const stage = wrap.querySelector('.hw2-stage');
        const captionNum = wrap.querySelector('.hw2-caption-num');
        const captionText = wrap.querySelector('.hw2-caption-text');
        let active = 0;

        function setActive(index) {
            active = (index + steps.length) % steps.length;
            steps.forEach((step, i) => {
                step.classList.toggle('is-active', i === active);
                buttons[i].setAttribute('aria-pressed', String(i === active));
            });
            shots.forEach((shot, i) => {
                shot.classList.toggle('is-active', i === active);
                if (i === active) shot.removeAttribute('aria-hidden');
                else shot.setAttribute('aria-hidden', 'true');
            });
            // The frame takes the active photo's shape, so the photo is shown whole
            if (stage && shots[active].dataset.ratio) stage.style.aspectRatio = shots[active].dataset.ratio;
            if (captionNum) captionNum.textContent = String(active + 1).padStart(2, '0');
            if (captionText) captionText.textContent = buttons[active].textContent.trim();
        }

        // Clicking a step shows it and restarts the timer, so the steps keep advancing on their own
        steps.forEach((step, i) => {
            step.addEventListener('click', () => {
                setActive(i);
                restartTimer();
            });
        });

        function restartTimer() {
            const bar = steps[active].querySelector('.hw2-progress');
            if (!bar) return;
            bar.style.animation = 'none';
            void bar.offsetWidth;
            bar.style.animation = '';
        }

        // Advance on larger screens; phones show every step at once
        const desktopQuery = window.matchMedia('(min-width: 992px)');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

        const syncAutoplay = () => wrap.classList.toggle('is-autoplay', desktopQuery.matches);
        syncAutoplay();
        desktopQuery.addEventListener('change', syncAutoplay);
        wrap.classList.add('is-offscreen');

        wrap.addEventListener('animationend', (e) => {
            if (e.animationName === 'hw2-progress' && wrap.classList.contains('is-autoplay')) setActive(active + 1);
        });

        // Resting the pointer on a step pauses the timer while it is being read
        steps.forEach(step => {
            step.addEventListener('mouseenter', () => wrap.classList.add('is-paused'));
            step.addEventListener('mouseleave', () => wrap.classList.remove('is-paused'));
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => wrap.classList.toggle('is-offscreen', !entry.isIntersecting));
        }, { threshold: 0.35 });
        observer.observe(wrap);
    }

    /* ==========================================================================
       7. PAGE TRANSITIONS: FADE OUT BEFORE MOVING TO ANOTHER PAGE
       ========================================================================== */
    function initPageTransitions() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.setAttribute('aria-hidden', 'true');
        document.body.appendChild(loader);

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        document.addEventListener('click', (e) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const link = e.target.closest('a[href]');
            if (!link || link.hasAttribute('download')) return;
            if (link.target && link.target !== '_self') return;

            const url = new URL(link.href, window.location.href);
            if (url.protocol !== window.location.protocol || url.host !== window.location.host) return;
            // Links within the same page keep their normal scroll behaviour
            if (url.pathname === window.location.pathname) return;
            if (!/(\.html?|\/)$/.test(url.pathname)) return;

            e.preventDefault();
            if (prefersReducedMotion) {
                window.location.href = url.href;
                return;
            }
            document.documentElement.classList.add('page-leaving');
            setTimeout(() => { window.location.href = url.href; }, 280);
        });

        // Coming back with the browser's Back button shows the page again
        window.addEventListener('pageshow', (e) => {
            if (e.persisted) document.documentElement.classList.remove('page-leaving');
        });
    }

    /* ==========================================================================
       8. PHOTO VIEWER, GALLERY FILTERS AND REVIEW "READ MORE"
       ========================================================================== */
    function initLightbox() {
        const links = Array.from(document.querySelectorAll('[data-lightbox]'));
        if (!links.length) return;

        const box = document.createElement('div');
        box.className = 'lb';
        box.hidden = true;
        box.setAttribute('role', 'dialog');
        box.setAttribute('aria-modal', 'true');
        box.setAttribute('aria-label', 'Photo viewer');
        box.innerHTML = `
            <button type="button" class="lb-btn lb-close" aria-label="Close photo viewer"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
            <button type="button" class="lb-btn lb-prev" aria-label="Previous photo"><i class="fa-solid fa-chevron-left" aria-hidden="true"></i></button>
            <figure class="lb-figure"><img class="lb-img" alt=""></figure>
            <button type="button" class="lb-btn lb-next" aria-label="Next photo"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>
            <div class="lb-bar"><span class="lb-count"></span><span class="lb-caption"></span></div>`;
        document.body.appendChild(box);

        const img = box.querySelector('.lb-img');
        const caption = box.querySelector('.lb-caption');
        const count = box.querySelector('.lb-count');
        let items = [];
        let index = 0;
        let lastFocus = null;

        function show(i) {
            index = (i + items.length) % items.length;
            const link = items[index];
            const thumb = link.querySelector('img');
            img.src = link.getAttribute('href');
            img.alt = thumb ? thumb.alt : '';
            img.style.animation = 'none';
            void img.offsetWidth;
            img.style.animation = '';
            caption.textContent = link.dataset.caption || '';
            count.textContent = `${index + 1} / ${items.length}`;
            box.classList.toggle('is-single', items.length < 2);
        }

        function open(link) {
            // Step through the visible photos of the same group (a gallery filter hides some)
            const group = link.closest('[data-lightbox-group]');
            items = (group ? Array.from(group.querySelectorAll('[data-lightbox]')) : [link]).filter(a => !a.hidden && a.offsetParent !== null);
            if (!items.includes(link)) items = [link];
            lastFocus = document.activeElement;
            box.hidden = false;
            requestAnimationFrame(() => box.classList.add('is-open'));
            document.body.style.overflow = 'hidden';
            show(items.indexOf(link));
            box.querySelector('.lb-close').focus();
        }

        function close() {
            box.classList.remove('is-open');
            box.hidden = true;
            document.body.style.overflow = '';
            if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
        }

        links.forEach(link => link.addEventListener('click', (e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            open(link);
        }));

        box.querySelector('.lb-close').addEventListener('click', close);
        box.querySelector('.lb-prev').addEventListener('click', () => show(index - 1));
        box.querySelector('.lb-next').addEventListener('click', () => show(index + 1));
        box.addEventListener('click', (e) => {
            if (e.target === box || e.target.classList.contains('lb-figure')) close();
        });
        document.addEventListener('keydown', (e) => {
            if (box.hidden) return;
            if (e.key === 'Escape') close();
            else if (e.key === 'ArrowLeft') show(index - 1);
            else if (e.key === 'ArrowRight') show(index + 1);
        });

        // Swipe left or right on phones
        let startX = null;
        box.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
        box.addEventListener('touchend', (e) => {
            if (startX === null) return;
            const dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 50 && items.length > 1) show(index + (dx < 0 ? 1 : -1));
            startX = null;
        });
    }

    function initGalleryFilters() {
        const grid = document.querySelector('[data-gallery]');
        if (!grid) return;
        const chips = Array.from(document.querySelectorAll('.gl-chip'));
        const photos = Array.from(grid.querySelectorAll('.gl-item'));

        chips.forEach(chip => chip.addEventListener('click', () => {
            const filter = chip.dataset.filter;
            chips.forEach(c => {
                c.classList.toggle('is-active', c === chip);
                c.setAttribute('aria-pressed', String(c === chip));
            });
            photos.forEach(photo => {
                photo.hidden = filter !== 'all' && photo.dataset.cat !== filter;
            });
        }));
    }

    function initLetterDialog() {
        const dialog = document.querySelector('#letter-dialog');
        const openers = document.querySelectorAll('[data-letter-open]');
        if (!dialog || !openers.length) return;
        // Animated sections would otherwise position this fixed overlay relative to themselves
        document.body.appendChild(dialog);
        const closeBtn = dialog.querySelector('.lt-close');
        let lastFocus = null;

        function open() {
            lastFocus = document.activeElement;
            dialog.hidden = false;
            dialog.scrollTop = 0;
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        }

        function close() {
            if (dialog.hidden) return;
            dialog.hidden = true;
            document.body.style.overflow = '';
            if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
        }

        openers.forEach(btn => btn.addEventListener('click', open));
        closeBtn.addEventListener('click', close);
        dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    }

    function initReviewClamp() {
        document.querySelectorAll('.rv-text[data-clamp]').forEach(text => {
            const button = text.parentElement.querySelector('.rv-more');
            if (!button) return;
            // Show "Read more" only when the review is longer than the visible lines
            const check = () => {
                if (text.classList.contains('is-open')) return;
                button.hidden = text.scrollHeight <= text.clientHeight + 2;
                if (!button.hasAttribute('aria-expanded')) button.setAttribute('aria-expanded', 'false');
            };
            check();
            window.addEventListener('resize', check);
            button.addEventListener('click', () => {
                const opening = !text.classList.contains('is-open');
                text.classList.toggle('is-open', opening);
                button.textContent = opening ? 'Show less' : 'Read more';
                button.setAttribute('aria-expanded', String(opening));
            });
        });
    }

    /* ==========================================================================
       9. BACK TO TOP AND KEYBOARD FOCUS INSIDE OPEN DIALOGS
       ========================================================================== */
    function initAccessibilityHelpers() {
        // "Back to top" scrolls this page (the 404 page's base URL would otherwise send it home)
        document.querySelectorAll('.ft-top').forEach(link => link.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        }));

        // While a dialog is open, Tab and Shift+Tab cycle through its own controls only
        const openDialog = () => document.querySelector('#enquiry-modal-overlay.active, .lb:not([hidden]), #letter-dialog:not([hidden])');
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;
            const dialog = openDialog();
            if (!dialog) return;
            const items = Array.from(dialog.querySelectorAll('a[href], button:not([disabled]), input:not([type="hidden"]):not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'))
                .filter(el => el.offsetParent !== null && getComputedStyle(el).visibility !== 'hidden');
            if (!items.length) return;
            const first = items[0], last = items[items.length - 1];
            if (!dialog.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
            else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        });
    }

    /* ==========================================================================
       10. VISITOR TRACKING (CALLS, WHATSAPP, EMAIL, DIRECTIONS, ENQUIRIES)
       Sends named events to Umami when its script is on the page (see README).
       Without it, track() does nothing.
       ========================================================================== */
    function track(name, data) {
        try {
            if (window.umami && typeof window.umami.track === 'function') window.umami.track(name, data);
        } catch (err) { /* analytics must never break the page */ }
    }

    // Where on the page a link sits, so reports can tell the header from the footer or a section
    function placeOf(el) {
        if (el.closest('header, .top-info-bar, .very-top-bar')) return 'header';
        if (el.closest('.site-footer')) return 'footer';
        if (el.closest('#enquiry-modal-overlay')) return 'quote pop-up';
        const section = el.closest('section[id]');
        if (section) return section.id;
        return el.getAttribute('aria-label') === 'Chat on WhatsApp' ? 'floating button' : 'page';
    }

    function initTracking() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (!link) return;
            const href = link.getAttribute('href');
            let name = '';
            if (href.startsWith('tel:')) name = 'Call click';
            else if (href.includes('wa.me/')) name = 'WhatsApp click';
            else if (href.startsWith('mailto:')) name = 'Email click';
            else if (href.includes('google.com/maps')) name = 'Directions click';
            else if (href.includes('instagram.com')) name = 'Instagram click';
            else if (href.includes('forms.gle/')) name = 'Job application click';
            if (name) track(name, { place: placeOf(link) });
        }, true);
    }

    /* ==========================================================================
       11. PROJECT TYPE DROPDOWN
       Swaps the browser's plain menu for a styled list. The native <select> stays
       in the form (hidden), so the chosen value is still sent with the enquiry.
       ========================================================================== */
    function initDropdowns() {
        document.querySelectorAll('.ct-field select').forEach(select => {
            const label = document.querySelector(`label[for="${select.id}"]`);
            const placeholder = select.querySelector('option[value=""]');
            const options = Array.from(select.options).filter(o => o.value !== '');

            const wrap = document.createElement('div');
            wrap.className = 'dd';
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'dd-btn';
            btn.id = select.id + '-btn';
            btn.setAttribute('aria-haspopup', 'listbox');
            btn.setAttribute('aria-expanded', 'false');
            btn.innerHTML = '<span class="dd-value"></span><span class="dd-caret" aria-hidden="true"></span>';
            const valueEl = btn.querySelector('.dd-value');

            const list = document.createElement('ul');
            list.className = 'dd-list';
            list.id = select.id + '-list';
            list.setAttribute('role', 'listbox');
            list.tabIndex = -1;
            list.hidden = true;
            btn.setAttribute('aria-controls', list.id);

            if (label) {
                label.id = label.id || select.id + '-label';
                label.htmlFor = btn.id;
                btn.setAttribute('aria-labelledby', label.id + ' ' + btn.id);
                list.setAttribute('aria-labelledby', label.id);
            }

            const items = options.map((opt, i) => {
                const li = document.createElement('li');
                li.id = `${select.id}-opt-${i}`;
                li.setAttribute('role', 'option');
                if (opt.dataset.icon) {
                    li.innerHTML = `<span class="dd-ico" aria-hidden="true"><i class="fa-solid ${opt.dataset.icon}"></i></span>`;
                }
                const text = document.createElement('span');
                text.className = 'dd-text';
                text.textContent = opt.textContent;
                li.appendChild(text);
                li.insertAdjacentHTML('beforeend', '<i class="fa-solid fa-check dd-tick" aria-hidden="true"></i>');
                list.appendChild(li);
                return li;
            });

            select.classList.add('dd-native');
            select.tabIndex = -1;
            select.setAttribute('aria-hidden', 'true');
            wrap.append(btn, list);
            select.after(wrap);

            let active = 0;

            function render() {
                const chosen = options.findIndex(o => o.value === select.value);
                valueEl.textContent = chosen >= 0 ? options[chosen].textContent : (placeholder ? placeholder.textContent : '');
                btn.classList.toggle('is-placeholder', chosen < 0);
                items.forEach((li, k) => li.setAttribute('aria-selected', String(k === chosen)));
            }

            function setActive(i) {
                active = Math.max(0, Math.min(items.length - 1, i));
                items.forEach((li, k) => li.classList.toggle('is-active', k === active));
                list.setAttribute('aria-activedescendant', items[active].id);
                const li = items[active];
                if (li.offsetTop < list.scrollTop) list.scrollTop = li.offsetTop;
                else if (li.offsetTop + li.offsetHeight > list.scrollTop + list.clientHeight) {
                    list.scrollTop = li.offsetTop + li.offsetHeight - list.clientHeight;
                }
            }

            function open() {
                if (!list.hidden) return;
                list.hidden = false;
                btn.setAttribute('aria-expanded', 'true');
                // Open upwards when there isn't room below
                wrap.classList.remove('dd--up');
                const room = window.innerHeight - btn.getBoundingClientRect().bottom;
                if (room < list.offsetHeight + 12 && btn.getBoundingClientRect().top > list.offsetHeight + 12) wrap.classList.add('dd--up');
                const chosen = options.findIndex(o => o.value === select.value);
                setActive(chosen >= 0 ? chosen : 0);
                list.focus({ preventScroll: true });
            }

            function close(refocus) {
                if (list.hidden) return;
                list.hidden = true;
                btn.setAttribute('aria-expanded', 'false');
                if (refocus) btn.focus();
            }

            function choose(i) {
                select.value = options[i].value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
                render();
                close(true);
            }

            // Keep focus on the open list while the button is pressed, so a click can close it
            btn.addEventListener('mousedown', (e) => e.preventDefault());
            btn.addEventListener('click', () => (list.hidden ? open() : close(true)));
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); open(); }
            });

            list.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
                else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
                else if (e.key === 'Home') { e.preventDefault(); setActive(0); }
                else if (e.key === 'End') { e.preventDefault(); setActive(items.length - 1); }
                else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(active); }
                else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(true); }
                else if (e.key === 'Tab') { close(false); }
                else if (e.key.length === 1) {
                    // Jump to the option that starts with the typed letter
                    const k = options.findIndex(o => o.textContent.trim().toLowerCase().startsWith(e.key.toLowerCase()));
                    if (k >= 0) setActive(k);
                }
            });
            list.addEventListener('focusout', (e) => {
                if (!wrap.contains(e.relatedTarget)) close(false);
            });
            items.forEach((li, i) => {
                li.addEventListener('click', () => choose(i));
                li.addEventListener('mousemove', () => { if (active !== i) setActive(i); });
            });

            select.addEventListener('change', render);
            if (select.form) select.form.addEventListener('reset', () => setTimeout(render));
            render();
        });
    }

    // Web3Forms AJAX Submission Handler (page forms)
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll("form[action^='https://api.web3forms.com']").forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn = form.querySelector("button[type='submit']");
                if (btn && btn.disabled) return;
                const originalBtnText = btn ? btn.innerHTML : '';
                if (btn) {
                    btn.disabled = true;
                    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Sending...';
                }

                try {
                    const response = await fetch(form.action, { method: 'POST', body: new FormData(form) });
                    if (!response.ok) throw new Error('Failed to send');
                    form.innerHTML = `
                        <div class="form-status" role="status" tabindex="-1">
                            <div class="form-status-icon"><i class="fa-solid fa-check" aria-hidden="true"></i></div>
                            <h3>Message Sent Successfully!</h3>
                            <p>Thank you for reaching out. Our team will get back to you shortly.</p>
                        </div>
                    `;
                    form.querySelector('.form-status').focus();
                    track('Enquiry sent', { form: location.pathname.includes('contact') ? 'contact page' : 'homepage' });
                } catch (error) {
                    if (btn) {
                        btn.disabled = false;
                        btn.innerHTML = originalBtnText;
                    }
                    let msg = form.querySelector('.form-error-msg');
                    if (!msg) {
                        msg = document.createElement('p');
                        msg.className = 'form-error-msg';
                        msg.setAttribute('role', 'alert');
                        (btn || form.lastElementChild).insertAdjacentElement('beforebegin', msg);
                    }
                    msg.textContent = "We couldn't send your message. Please try again, or call +91 99621 16999.";
                }
            });
        });
    });

})();
