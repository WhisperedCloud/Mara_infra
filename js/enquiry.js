/**
 * MARA INFRA SOLUTIONS - ENQUIRY & MODAL MODULE
 * Handles enquiry modal lifecycle, dynamic product pre-selection, inline validation, and success state.
 */

export function initEnquiryModal() {
    let activeModal = null;

    // Inject Enquiry Modal HTML dynamically into body if not present
    if (!document.querySelector('#enquiry-modal-overlay')) {
        const modalHtml = `
            <div class="modal-overlay" id="enquiry-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="enquiry-modal-title">
                <div class="modal-container">
                    <div class="modal-header">
                        <h3 class="modal-title" id="enquiry-modal-title">Product Enquiry</h3>
                        <button type="button" class="modal-close" id="modal-close-btn" aria-label="Close modal">&times;</button>
                    </div>
                    <div class="modal-body" id="modal-body-content">
                        <form id="enquiry-form" novalidate>
                            <div class="form-group">
                                <label class="form-label" for="enquiry-product">Selected Product</label>
                                <input type="text" id="enquiry-product" class="form-input" readonly style="background-color: var(--color-surface-subtle); font-weight: 600;">
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label" for="enquiry-name">Full Name *</label>
                                <input type="text" id="enquiry-name" class="form-input" placeholder="e.g. Rajesh Kumar" required>
                                <div class="form-error" id="error-name"></div>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="enquiry-company">Company / Firm Name (Optional)</label>
                                <input type="text" id="enquiry-company" class="form-input" placeholder="e.g. Prime Developers">
                            </div>

                            <div class="grid-2-col gap-4">
                                <div class="form-group">
                                    <label class="form-label" for="enquiry-phone">Phone Number *</label>
                                    <input type="tel" id="enquiry-phone" class="form-input" placeholder="+91 98765 43210" required>
                                    <div class="form-error" id="error-phone"></div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="enquiry-email">Email Address *</label>
                                    <input type="email" id="enquiry-email" class="form-input" placeholder="name@company.com" required>
                                    <div class="form-error" id="error-email"></div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="enquiry-requirement">Requirement Details *</label>
                                <textarea id="enquiry-requirement" class="form-textarea" rows="3" placeholder="Specify your surface area (sq ft), project location, or product quantity..." required></textarea>
                                <div class="form-error" id="error-requirement"></div>
                            </div>

                            <button type="submit" class="btn btn-primary btn-block btn-lg" id="submit-enquiry-btn">
                                <i class="fa-solid fa-paper-plane"></i> Submit Enquiry
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    const overlay = document.querySelector('#enquiry-modal-overlay');
    const closeBtn = document.querySelector('#modal-close-btn');
    const form = document.querySelector('#enquiry-form');
    const modalBody = document.querySelector('#modal-body-content');

    function openModal(productName = 'General Product Inquiry') {
        if (!overlay) return;
        document.querySelector('#enquiry-product').value = productName;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        activeModal = overlay;
    }

    function closeModal() {
        if (!overlay) return;
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        activeModal = null;

        // Reset Form after closing
        setTimeout(() => {
            if (form) form.reset();
            clearErrors();
        }, 300);
    }

    // Global Event Listener for Enquiry Buttons (Delegation)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-enquire');
        if (btn) {
            e.preventDefault();
            const pName = btn.getAttribute('data-product-name') || 'General Product Inquiry';
            openModal(pName);
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeModal) closeModal();
    });

    // Inline Form Validation
    function clearErrors() {
        document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
        document.querySelectorAll('.form-input, .form-textarea').forEach(el => el.classList.remove('error'));
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors();

            let isValid = true;
            const name = document.querySelector('#enquiry-name');
            const phone = document.querySelector('#enquiry-phone');
            const email = document.querySelector('#enquiry-email');
            const req = document.querySelector('#enquiry-requirement');

            // Name validation
            if (!name.value.trim() || name.value.trim().length < 2) {
                document.querySelector('#error-name').textContent = 'Please enter your full name.';
                name.classList.add('error');
                isValid = false;
            }

            // Phone validation
            const phoneRegex = /^[0-9+\s-]{8,15}$/;
            if (!phoneRegex.test(phone.value.trim())) {
                document.querySelector('#error-phone').textContent = 'Please enter a valid phone number.';
                phone.classList.add('error');
                isValid = false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                document.querySelector('#error-email').textContent = 'Please enter a valid email address.';
                email.classList.add('error');
                isValid = false;
            }

            // Requirement validation
            if (!req.value.trim() || req.value.trim().length < 5) {
                document.querySelector('#error-requirement').textContent = 'Please enter your project details (min 5 chars).';
                req.classList.add('error');
                isValid = false;
            }

            if (isValid) {
                // Future Backend Endpoint connection point
                /*
                fetch('/api/enquiry', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...data })
                });
                */

                // Simulated Success State
                modalBody.innerHTML = `
                    <div style="text-align: center; padding: 24px 12px;">
                        <div style="width: 60px; height: 60px; background-color: var(--color-accent-light); color: var(--color-accent-dark); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 1.75rem;">
                            <i class="fa-solid fa-check"></i>
                        </div>
                        <h3>Enquiry Received</h3>
                        <p style="margin-top: 8px;">Thank you for contacting Mara Infra Solutions. Our technical specialists will get in touch with you shortly.</p>
                        <button type="button" class="btn btn-primary mt-6" id="continue-btn">Continue Browsing</button>
                    </div>
                `;

                document.querySelector('#continue-btn')?.addEventListener('click', closeModal);
            }
        });
    }
}
