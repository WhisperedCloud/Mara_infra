/**
 * MARA INFRA SOLUTIONS - MAIN ENTRY POINT
 * Initializes Navigation, Filters, Search, Product Detail, Enquiry Modals, and Scroll Animations.
 */

import { initNavigation } from './navigation.js';
import { initFilters } from './filters.js';
import { initSearch } from './search.js';
import { initProductDetail } from './product-detail.js';
import { initEnquiryModal } from './enquiry.js';
import { initAnimations } from './animations.js';

// Access product dataset
const productDataset = window.products || [];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation
    initNavigation();

    // 2. Product Catalogue Filtering & Search (on products.html)
    const catalogContainer = document.querySelector('#product-catalog-grid');
    const catalogCount = document.querySelector('#product-count');
    if (catalogContainer) {
        initFilters(productDataset, catalogContainer, catalogCount);
        initSearch(() => {
            // Trigger filter update when search input changes
            const searchInput = document.querySelector('#product-search');
            if (searchInput) {
                searchInput.dispatchEvent(new Event('input-processed'));
            }
        });
    }

    // 3. Product Detail Rendering (on product-detail.html)
    initProductDetail(productDataset);

    // 4. Enquiry Modal
    initEnquiryModal();

    // 5. Scroll Animations
    initAnimations();
});
