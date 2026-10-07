/**
 * MARA INFRA SOLUTIONS - SEARCH MODULE
 * Live search input listener with debounce for smooth user experience.
 */

export function initSearch(onSearchCallback) {
    const searchInput = document.querySelector('#product-search');
    if (!searchInput) return;

    let debounceTimer;

    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            if (typeof onSearchCallback === 'function') {
                onSearchCallback(searchInput.value);
            }
        }, 200);
    });
}
