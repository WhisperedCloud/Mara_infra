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
                                        <label class="form-label" for="enquiry-email">Email Address *</label>
                                        <input type="email" id="enquiry-email" class="form-input" placeholder="Enter your email address" autocomplete="email" required>
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
            if (!email || !email.includes('@')) {
                document.querySelector('#error-email').textContent = 'Please enter a valid email.';
                valid = false;
            }
            if (!req || req.length < 5) {
                document.querySelector('#error-req').textContent = 'Please enter requirement details.';
                valid = false;
            }
            if (!valid || submitBtn.disabled) return;

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
                .then(response => response.json())
                .then(data => {
                    if (!data.success) throw new Error('Form submission failed');
                    showStatus('fa-check', 'Enquiry Submitted', `Thank you, ${name}! Our team will contact you shortly.`);
                })
                .catch(error => {
                    console.warn('Web3Forms API failed, falling back to mailto:', error);
                    const emailSubject = encodeURIComponent(`New Project Enquiry - ${product}`);
                    const emailBody = encodeURIComponent(
                        `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nRequirement Details:\n${req}`
                    );
                    window.location.href = `mailto:admin@marainfra.co.in?subject=${emailSubject}&body=${emailBody}`;
                    showStatus('fa-envelope-open-text', 'Opening Email App...',
                        'Our automated system is currently unreachable (this can happen due to ad-blockers). We are opening your default email application to send this enquiry directly to admin@marainfra.co.in.');
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
                        <div class="form-status" role="status">
                            <div class="form-status-icon"><i class="fa-solid fa-check" aria-hidden="true"></i></div>
                            <h3>Message Sent Successfully!</h3>
                            <p>Thank you for reaching out. Our team will get back to you shortly.</p>
                        </div>
                    `;
                } catch (error) {
                    if (btn) {
                        btn.disabled = false;
                        btn.innerHTML = originalBtnText;
                    }
                    alert('Something went wrong. Please try again later.');
                }
            });
        });
    });

})();
