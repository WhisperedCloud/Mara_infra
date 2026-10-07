/**
 * MARA INFRA SOLUTIONS - PRODUCT COMPONENT RENDERER
 * Pure modular component renderer for Product Cards, Category Cards, and Solution Cards.
 * Strictly NO pricing elements.
 */

export function renderProductCard(product) {
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
                    <a href="product-detail.html?id=${product.id}" class="btn btn-outline btn-sm">View Product</a>
                    <button type="button" class="btn btn-primary btn-sm btn-enquire" data-product-id="${product.id}" data-product-name="${product.name}">
                        Enquire Now
                    </button>
                </div>
            </div>
        </article>
    `;
}

export function renderCategoryCard(category) {
    return `
        <div class="category-card">
            <img src="${category.image}" alt="${category.name}" class="category-card-img" loading="lazy">
            <div class="category-card-content">
                <h3 class="category-card-title">${category.name}</h3>
                <p>${category.description}</p>
                <a href="products.html?category=${category.id}" class="category-card-link">
                    Explore Category <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `;
}

export function renderSolutionCard(solution) {
    return `
        <div class="solution-card">
            <div class="solution-icon">
                <i class="fa-solid ${solution.icon}"></i>
            </div>
            <h3>${solution.title}</h3>
            <p>${solution.description}</p>
            <a href="products.html?category=${solution.category}" class="btn btn-text">
                Browse Solutions &rarr;
            </a>
        </div>
    `;
}
