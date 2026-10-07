/**
 * MARA INFRA SOLUTIONS - PRODUCT DETAIL MODULE
 * Renders individual product view dynamically from URL query parameters.
 */

import { renderProductCard } from './products.js';

export function initProductDetail(productsData) {
    const detailContainer = document.querySelector('#product-detail-container');
    if (!detailContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const product = productsData.find(p => p.id === productId);

    if (!product) {
        detailContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
                <h2>Product Not Found</h2>
                <p>The product you are looking for may have been moved or does not exist.</p>
                <a href="products.html" class="btn btn-primary mt-4">Explore All Products</a>
            </div>
        `;
        return;
    }

    // Set page title dynamically
    document.title = `${product.name} | Mara Infra Solutions`;

    // Render Specs Table (Only fields that exist)
    const specEntries = Object.entries(product.specifications || {}).filter(([key, val]) => Boolean(val));
    const specRowsHtml = specEntries.map(([key, val]) => {
        const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        return `
            <tr>
                <th>${formattedKey}</th>
                <td>${val}</td>
            </tr>
        `;
    }).join('');

    // Render Related Products (Same category, max 3)
    const related = productsData
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    const relatedHtml = related.length > 0 ? `
        <section class="section">
            <div class="container">
                <h3 class="section-title mb-6">Related Products</h3>
                <div class="product-grid">
                    ${related.map(renderProductCard).join('')}
                </div>
            </div>
        </section>
    ` : '';

    detailContainer.innerHTML = `
        <!-- Product Hero Section -->
        <section class="section section-alt">
            <div class="container">
                <div class="grid-2-col gap-8 align-center">
                    <div class="product-detail-media">
                        <img src="${product.image}" alt="${product.name}" class="product-detail-img" style="border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); max-height: 420px; width: 100%; object-fit: cover;">
                    </div>
                    <div class="product-detail-info">
                        <span class="product-card-badge mb-2">${product.brand}</span>
                        <h1 class="mb-3">${product.name}</h1>
                        <p class="product-detail-lead font-weight-bold" style="font-size: 1.15rem; color: var(--color-text);">${product.shortDescription}</p>
                        <p>${product.description}</p>
                        <div class="detail-actions mt-6" style="display: flex; gap: 16px;">
                            <button type="button" class="btn btn-primary btn-lg btn-enquire" data-product-id="${product.id}" data-product-name="${product.name}">
                                <i class="fa-solid fa-envelope"></i> Enquire About This Product
                            </button>
                            <a href="#specifications" class="btn btn-outline btn-lg">View Technical Specs</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Key Applications & Features -->
        <section class="section">
            <div class="container">
                <div class="grid-2-col gap-8">
                    <div>
                        <h3><i class="fa-solid fa-bullseye text-secondary"></i> Key Applications</h3>
                        <ul class="checklist mt-4" style="list-style: none; display: flex; flex-direction: column; gap: 12px;">
                            ${product.applications.map(app => `
                                <li style="display: flex; gap: 10px; align-items: flex-start;">
                                    <i class="fa-solid fa-circle-check text-accent" style="margin-top: 4px;"></i>
                                    <span>${app}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div>
                        <h3><i class="fa-solid fa-layer-group text-secondary"></i> Suitable Substrates</h3>
                        <ul class="checklist mt-4" style="list-style: none; display: flex; flex-direction: column; gap: 12px;">
                            ${product.substrates.map(sub => `
                                <li style="display: flex; gap: 10px; align-items: flex-start;">
                                    <i class="fa-solid fa-circle-check text-accent" style="margin-top: 4px;"></i>
                                    <span>${sub}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Technical Specifications Table -->
        <section id="specifications" class="section section-alt">
            <div class="container">
                <h3 class="mb-4">Technical Specifications</h3>
                ${specEntries.length > 0 ? `
                    <div class="spec-table-wrapper">
                        <table class="spec-table">
                            <tbody>
                                ${specRowsHtml}
                            </tbody>
                        </table>
                    </div>
                ` : '<p>Detailed technical specification sheet available upon request.</p>'}
                
                ${product.documents && product.documents.length > 0 ? `
                    <div class="documents-block mt-6">
                        <h4>Technical Documentation</h4>
                        <div class="doc-links mt-3" style="display: flex; gap: 16px; flex-wrap: wrap;">
                            ${product.documents.map(doc => `
                                <a href="${doc.url}" class="btn btn-outline btn-sm" download>
                                    <i class="fa-solid fa-file-pdf text-orange"></i> ${doc.name} (${doc.fileSize})
                                </a>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </section>

        ${relatedHtml}
    `;
}
