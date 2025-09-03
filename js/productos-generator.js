/**
 * ========================================
 * GENERADOR AUTOMÁTICO DE PRODUCTOS
 * Velas Starlight - Products Generator
 * ========================================
 */

class ProductGenerator {
    constructor() {
        this.container = null;
        this.products = [];
    }

    /**
     * Inicializar el generador
     */
    init(containerId, productsData) {
        this.container = document.getElementById(containerId);
        this.products = productsData || window.productosData || [];
        
        if (!this.container) {
            console.error('❌ Contenedor no encontrado:', containerId);
            return;
        }

        this.generateAllProducts();
        console.log('✅ Generador de productos inicializado');
        console.log(`📦 ${this.products.length} productos generados`);
    }

    /**
     * Generar todos los productos
     */
    generateAllProducts() {
        this.container.innerHTML = '';
        
        this.products.forEach((product, index) => {
            if (product.available !== false) { // Solo mostrar productos disponibles
                const productCard = this.createProductCard(product, index);
                this.container.appendChild(productCard);
            }
        });
    }

    /**
     * Crear tarjeta de producto individual
     */
    createProductCard(product, index) {
        const card = document.createElement('div');
        card.className = 'product-card bg-white rounded-2xl shadow-lg hover-lift overflow-hidden cursor-pointer';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', index * 100);
        card.setAttribute('data-product', JSON.stringify(product));

        // Calcular precio mínimo
        const minPrice = Math.min(...product.sizes.map(s => s.price));
        
        // Generar badges
        const badges = this.generateBadges(product);
        
        // Generar HTML
        card.innerHTML = `
            <div class="relative overflow-hidden">
                <img src="${product.image}" alt="${product.title}" 
                     class="w-full h-64 object-cover"
                     onerror="this.src='../images/placeholder-vela.jpg'">
                
                <!-- Badges -->
                <div class="absolute top-3 left-3 flex flex-col space-y-2">
                    ${badges}
                </div>

                <!-- Categoría -->
                <div class="absolute top-3 right-3">
                    <span class="bg-sage-green text-white px-3 py-1 rounded-full text-xs font-semibold">
                        ${product.category}
                    </span>
                </div>
            </div>

            <div class="p-6">
                <h3 class="font-serif text-xl font-bold text-dark-green mb-4">
                    ${product.title}
                </h3>
                

                
                <!-- Precio -->
                <div class="mb-3">
                    <div class="price-badge text-white px-4 py-2 rounded-lg inline-block">
                        <span class="text-sm opacity-90">desde</span>
                        <div class="text-lg font-bold">$${minPrice} MXN</div>
                    </div>
                </div>
                
                <!-- Tamaños disponibles -->
                <div class="mb-3">
                    <div class="flex items-center text-sm text-gray-600">
                        <i class="fas fa-weight mr-2 text-sage-green"></i>
                        <span class="font-medium">${product.sizes.map(s => s.label).join(', ')}</span>
                    </div>
                </div>
                
                <!-- Info adicional -->
                <div class="product-info-section space-y-2 text-sm text-gray-600 mb-6">
                    <div class="flex items-center">
                        <i class="fas fa-palette mr-2 text-sage-green"></i>
                        <span>${product.fragrances.length} fragancias disponibles</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-leaf mr-2 text-green-500"></i>
                        <span>${product.types.join(', ')}</span>
                    </div>
                </div>
                
                <button class="ver-detalles w-full bg-gradient-to-r from-dark-green to-sage-green text-white py-3 px-4 rounded-xl hover:from-sage-green hover:to-dark-green transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
                    <i class="fas fa-eye mr-2"></i>Ver Detalles
                </button>
            </div>
        `;

        // Agregar event listener
        card.addEventListener('click', () => {
            if (window.openModal && typeof window.openModal === 'function') {
                window.openModal(product);
            } else {
                console.warn('⚠️ Función openModal no disponible');
            }
        });

        return card;
    }

    /**
     * Generar badges del producto
     */
    generateBadges(product) {
        let badges = '';
        
        if (product.featured) {
            badges += '<span class="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">⭐ Destacado</span>';
        }
        
        if (product.new) {
            badges += '<span class="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">🆕 Nuevo</span>';
        }
        
        if (product.discount) {
            badges += `<span class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">🔥 -${product.discount}%</span>`;
        }

        return badges;
    }

    /**
     * Filtrar productos por categoría
     */
    filterByCategory(category) {
        const filteredProducts = category === 'all' 
            ? this.products 
            : this.products.filter(p => p.category === category);
        
        this.renderProducts(filteredProducts);
    }

    /**
     * Buscar productos
     */
    searchProducts(searchTerm) {
        const term = searchTerm.toLowerCase();
        const filteredProducts = this.products.filter(product => 
            product.title.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term) ||
            product.fragrances.some(f => f.toLowerCase().includes(term)) ||
            product.category.toLowerCase().includes(term)
        );
        
        this.renderProducts(filteredProducts);
    }

    /**
     * Renderizar productos filtrados
     */
    renderProducts(products) {
        this.container.innerHTML = '';
        
        products.forEach((product, index) => {
            const productCard = this.createProductCard(product, index);
            this.container.appendChild(productCard);
        });

        // Actualizar contador
        this.updateResultsCount(products.length);

        // Mostrar/ocultar mensaje de no resultados
        const noResults = document.getElementById('no-results');
        if (noResults) {
            if (products.length === 0) {
                noResults.classList.remove('hidden');
            } else {
                noResults.classList.add('hidden');
            }
        }
    }

    /**
     * Agregar nuevo producto dinámicamente
     */
    addProduct(newProduct) {
        // Asignar ID automático
        const maxId = Math.max(...this.products.map(p => p.id), 0);
        newProduct.id = maxId + 1;
        
        // Agregar a la lista
        this.products.push(newProduct);
        
        // Regenerar productos
        this.generateAllProducts();
        
        console.log('✅ Producto agregado:', newProduct.title);
    }

    /**
     * Actualizar contador de resultados
     */
    updateResultsCount(count) {
        const resultsElement = document.getElementById('results-count');
        if (resultsElement) {
            resultsElement.textContent = count;
        }
    }

    /**
     * Obtener estadísticas
     */
    getStats() {
        return {
            total: this.products.length,
            available: this.products.filter(p => p.available !== false).length,
            featured: this.products.filter(p => p.featured).length,
            new: this.products.filter(p => p.new).length,
            categories: [...new Set(this.products.map(p => p.category))],
            fragrances: [...new Set(this.products.flatMap(p => p.fragrances))]
        };
    }
}

// Exportar
if (typeof window !== 'undefined') {
    window.ProductGenerator = ProductGenerator;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductGenerator;
}