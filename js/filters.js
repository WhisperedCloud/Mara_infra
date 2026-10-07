/**
 * MARA INFRA SOLUTIONS - FILTERS MODULE
 * Handles category and keyword filtering, product counts, and empty states.
 */

import { renderProductCard } from './products.js';

export function initFilters(productsData, containerElement, countElement) {
    if (!containerElement) return;

    let activeCategory = 'all';

    // Check URL parameters for pre-selected category
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        activeCategory = categoryParam;
    }

    const filterPills = document.querySelectorAll('.filter-pill');

    function applyFilters() {
        const query = document.querySelector('#product-search')?.value.toLowerCase() || '';

        const filtered = productsData.filter(product => {
            const matchesCategory = (activeCategory === 'all') || (product.category === activeCategory);
            const matchesSearch = !query || (
                product.name.toLowerCase().includes(query) ||
                product.categoryName.toLowerCase().includes(query) ||
                product.brand.toLowerCase().includes(query) ||
                product.shortDescription.toLowerCase().includes(query) ||
                product.applications.some(app => app.toLowerCase().includes(query))
            );
            return matchesCategory && matchesSearch;
        });

        renderFilteredResults(filtered);
    }

    function renderFilteredResults(items) {
        if (countElement) {
            countElement.textContent = `Showing ${items.length} product${items.length === 1 ? '' : 's'}`;
        }

        if (items.length === 0) {
            containerElement.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon"><i class="fa-solid fa-box-open"></i></div>
                    <h3>No products found</h3>
                    <p>Try adjusting your search criteria or explore our other product categories.</p>
                    <button type="button" class="btn btn-outline btn-sm mt-3" id="reset-filters-btn">Reset All Filters</button>
                </div>
            `;
            document.querySelector('#reset-filters-btn')?.addEventListener('click', () => {
                activeCategory = 'all';
                const searchInput = document.querySelector('#product-search');
                if (searchInput) searchInput.value = '';
                updatePillStates();
                applyFilters();
            });
            return;
        }

        containerElement.innerHTML = items.map(renderProductCard).join('');
    }

    function updatePillStates() {
        filterPills.forEach(pill => {
            const pillCat = pill.getAttribute('data-category');
            if (pillCat === activeCategory) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });
    }

    // Attach click events to category filter pills
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            activeCategory = pill.getAttribute('data-category');
            updatePillStates();
            applyFilters();
        });
    });

    // Initial render
    updatePillStates();
    applyFilters();
}
