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
        mobileToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', isOpen);
            mobileToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
            
            // Prevent body scroll when mobile menu is open
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                if (mobileToggle) {
                    mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
                }
            });
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                if (mobileToggle) {
                    mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
                }
            }
        });
    }

    // Highlight Active Link based on current page URL
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
