/**
 * MARA INFRA SOLUTIONS - NAVIGATION MODULE
 * Sticky navbar, compact scroll behavior, mobile menu toggle with accessibility support.
 */

export function initNavigation() {
    const header = document.querySelector('.site-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!header) return;

    // Sticky Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Hamburger Menu Toggle
    if (mobileToggle && navMenu) {
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

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // A menu belongs to the header; close it as the header scrolls away.
        window.addEventListener('scroll', () => {
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
        setActiveNav(currentPath);
    } else {
        setActiveNav('index.html');

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
            const triggerPoint = headerHeight + 120;

            if (scrollY < 200) {
                setActiveNav('index.html');
                ticking = false;
                return;
            }

            if ((window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 80)) {
                setActiveNav('contact.html');
                ticking = false;
                return;
            }

            const whatWeProvide = document.getElementById('what-we-provide');
            if (whatWeProvide) {
                const wwpRect = whatWeProvide.getBoundingClientRect();
                if (wwpRect.top <= triggerPoint && wwpRect.bottom > triggerPoint) {
                    const isMobile = window.innerWidth <= 768;
                    if (isMobile) {
                        const colConstruction = document.getElementById('construction');
                        const colServices = document.getElementById('services');

                        if (colConstruction && colConstruction.getBoundingClientRect().top <= triggerPoint) {
                            setActiveNav('construction.html');
                        } else if (colServices && colServices.getBoundingClientRect().top <= triggerPoint) {
                            setActiveNav('services.html');
                        } else {
                            setActiveNav('products.html');
                        }
                    } else {
                        const progress = (triggerPoint - wwpRect.top) / wwpRect.height;
                        if (progress < 0.35) {
                            setActiveNav('products.html');
                        } else if (progress < 0.70) {
                            setActiveNav('services.html');
                        } else {
                            setActiveNav('construction.html');
                        }
                    }
                    ticking = false;
                    return;
                }
            }

            const primarySections = [
                { id: 'contact', href: 'contact.html' },
                { id: 'resources', href: 'resources.html' },
                { id: 'process', href: 'about.html' },
                { id: 'why-choose-us', href: 'about.html' },
                { id: 'about', href: 'about.html' },
                { id: 'solutions', href: 'solutions.html' }
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

            if (whatWeProvide && whatWeProvide.getBoundingClientRect().top > triggerPoint) {
                setActiveNav('index.html');
            }

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollSpy);
                ticking = true;
            }
        }, { passive: true });

        updateScrollSpy();
    }
}
