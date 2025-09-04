/**
 * ========================================
 * SISTEMA DE CARRITO DE COMPRAS
 * Velas Starlight - Cart System
 * ========================================
 */

/**
 * Clase principal para manejar el carrito de compras
 */
class CartManager {
    constructor() {
        this.storageKey = 'starlight_cart';
        this.items = this.loadFromStorage();
        this.init();
    }

    /**
     * Inicializar el sistema de carrito
     */
    init() {
        this.updateCartCount();
        console.log('🛒 Sistema de carrito inicializado');
        console.log('📦 Productos en carrito:', this.items.length);
    }

    /**
     * Cargar carrito desde localStorage
     */
    loadFromStorage() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('❌ Error cargando carrito:', error);
            return [];
        }
    }

    /**
     * Guardar carrito en localStorage
     */
    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
            console.log('💾 Carrito guardado en localStorage');
        } catch (error) {
            console.error('❌ Error guardando carrito:', error);
        }
    }

    /**
     * Agregar producto al carrito
     * @param {Object} product - Producto base
     * @param {Object} options - Opciones seleccionadas (tipo, tamaño, fragancia, cantidad)
     */
    addProduct(product, options) {
        console.log('🛍️ Agregando producto al carrito:', product.title);
        console.log('⚙️ Opciones:', options);
        console.log('💰 Precio recibido:', options.price);

        // Validar precio
        let finalPrice = options.price;
        if (!finalPrice || finalPrice <= 0 || isNaN(finalPrice)) {
            console.warn('⚠️ Precio inválido, usando precio por defecto');
            finalPrice = product.sizes && product.sizes[0] ? product.sizes[0].price : 75;
        }

        // Crear objeto del producto para el carrito
        const cartItem = {
            id: this.generateId(),
            title: product.title,
            image: product.image,
            category: product.category,
            description: product.description,
            type: options.type || product.types[0],
            size: options.size || (product.sizes && product.sizes[0] ? product.sizes[0].label : '50 gr'),
            price: finalPrice,
            fragrance: options.fragrance || product.fragrances[0],
            quantity: options.quantity || 1,
            addedAt: new Date().toISOString()
        };

        console.log('🛒 Producto final para carrito:', cartItem);

        // Verificar si el producto ya existe con las mismas opciones
        const existingIndex = this.findExistingProduct(cartItem);
        
        if (existingIndex !== -1) {
            // Si existe, incrementar cantidad
            this.items[existingIndex].quantity += cartItem.quantity;
            console.log('📈 Cantidad actualizada para producto existente');
        } else {
            // Si no existe, agregar nuevo
            this.items.push(cartItem);
            console.log('✅ Nuevo producto agregado al carrito');
        }

        this.saveToStorage();
        this.updateCartCount();
        this.showNotification(`${product.title} agregado al carrito`, 'success');

        return cartItem;
    }

    /**
     * Buscar si un producto ya existe en el carrito con las mismas opciones
     */
    findExistingProduct(newItem) {
        return this.items.findIndex(item => 
            item.title === newItem.title &&
            item.type === newItem.type &&
            item.size === newItem.size &&
            item.fragrance === newItem.fragrance
        );
    }

    /**
     * Generar ID único para productos del carrito
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Obtener todos los productos del carrito
     */
    getItems() {
        return this.items;
    }

    /**
     * Obtener cantidad total de productos
     */
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    /**
     * Obtener subtotal del carrito
     */
    getSubtotal() {
        return this.items.reduce((total, item) => total + ((item.price || 0) * item.quantity), 0);
    }

    /**
     * Actualizar contador del carrito en el header
     */
    updateCartCount() {
        const totalItems = this.getTotalItems();
        const countElements = document.querySelectorAll('#cart-count, #cart-count-mobile');
        
        countElements.forEach(element => {
            if (element) {
                element.textContent = totalItems;
                
                // Animación del contador
                if (totalItems > 0) {
                    element.classList.add('animate-pulse');
                    setTimeout(() => {
                        element.classList.remove('animate-pulse');
                    }, 1000);
                }
            }
        });
    }

    /**
     * Eliminar producto del carrito
     */
    removeProduct(productId) {
        const index = this.items.findIndex(item => item.id === productId);
        if (index !== -1) {
            const removedItem = this.items.splice(index, 1)[0];
            this.saveToStorage();
            this.updateCartCount();
            this.showNotification(`${removedItem.title} eliminado del carrito`, 'info');
            return true;
        }
        return false;
    }

    /**
     * Actualizar cantidad de un producto
     */
    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeProduct(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartCount();
            }
            return true;
        }
        return false;
    }

    /**
     * Vaciar carrito completamente
     */
    clearCart() {
        this.items = [];
        this.saveToStorage();
        this.updateCartCount();
        this.showNotification('Carrito vaciado', 'info');
    }

    /**
     * Mostrar notificación toast
     */
    showNotification(message, type = 'info') {
        // Verificar si ya existe una notificación
        const existingNotification = document.querySelector('.cart-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Crear nueva notificación
        const notification = document.createElement('div');
        notification.className = 'cart-notification fixed top-24 right-6 z-50 px-6 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 translate-x-full max-w-sm';
        
        // Estilos según el tipo
        const styles = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500',
            warning: 'bg-yellow-500'
        };

        notification.classList.add(styles[type] || styles.info);

        // Iconos según el tipo
        const icons = {
            success: 'check-circle',
            error: 'exclamation-triangle',
            info: 'info-circle',
            warning: 'exclamation-triangle'
        };

        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas fa-${icons[type] || icons.info} text-lg"></i>
                <div>
                    <p class="font-semibold">${message}</p>
                    <p class="text-xs opacity-90">
                        ${this.getTotalItems()} productos en el carrito
                    </p>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Remover después de 4 segundos
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    /**
     * Obtener resumen del carrito para mostrar en modal o página
     */
    getCartSummary() {
        return {
            items: this.items,
            totalItems: this.getTotalItems(),
            subtotal: this.getSubtotal(),
            isEmpty: this.items.length === 0
        };
    }
}

/**
 * Función para integrar el carrito con el modal de productos
 */
function setupCartIntegration() {
    console.log('🔗 Configurando integración del carrito');

    // Buscar el botón "Agregar al Carrito" en el modal
    const addToCartBtn = document.querySelector('#product-modal button[class*="bg-dark-green"]');
    
    if (addToCartBtn) {
        // Remover event listeners previos
        const newBtn = addToCartBtn.cloneNode(true);
        addToCartBtn.parentNode.replaceChild(newBtn, addToCartBtn);

        // Agregar nuevo event listener
        newBtn.addEventListener('click', function() {
            handleAddToCart();
        });

        console.log('✅ Botón "Agregar al Carrito" configurado');
    }
}

/**
 * Manejar la acción de agregar al carrito desde el modal
 */
function handleAddToCart() {
    console.log('🛒 Procesando agregar al carrito...');

    // Obtener información del producto actual del modal
    const modal = document.getElementById('product-modal');
    if (!modal || modal.classList.contains('hidden')) {
        console.error('❌ Modal no está abierto');
        return;
    }

    // Extraer información del modal
    const title = document.getElementById('modal-title').textContent;
    const description = document.getElementById('modal-description').textContent;
    const image = document.getElementById('modal-image').src;
    
    // Obtener opciones seleccionadas
    const selectedType = document.querySelector('.type-btn.bg-dark-green')?.textContent || 'Soya';
    const selectedSizeBtn = document.querySelector('.size-btn.bg-dark-green');
    const selectedSize = selectedSizeBtn ? selectedSizeBtn.textContent.split(' - ')[0] : '50 gr';
    const selectedPrice = selectedSizeBtn ? parseFloat(selectedSizeBtn.textContent.split(' - ')[1]) : 75;
    const selectedFragrance = document.getElementById('modal-fragrance').value;
    const quantity = parseInt(document.getElementById('modal-quantity').value) || 1;

    // Crear objeto producto
    const product = {
        title: title,
        description: description,
        image: image,
        category: 'Vela',
        types: [selectedType],
        sizes: [{ label: selectedSize, price: selectedPrice }],
        fragrances: [selectedFragrance]
    };

    // Opciones seleccionadas
    const options = {
        type: selectedType,
        size: selectedSize,
        price: selectedPrice,
        fragrance: selectedFragrance,
        quantity: quantity
    };

    // Agregar al carrito
    if (window.cartManager) {
        window.cartManager.addProduct(product, options);
        
        // Cerrar modal después de agregar
        setTimeout(() => {
            document.getElementById('product-modal').classList.add('hidden');
        }, 1000);
    } else {
        console.error('❌ CartManager no está disponible');
    }
}

/**
 * Inicializar el sistema de carrito
 */
function initCartSystem() {
    console.log('🚀 Inicializando sistema de carrito');
    
    // Crear instancia global del carrito
    window.cartManager = new CartManager();
    
    // Configurar integración cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupCartIntegration);
    } else {
        setupCartIntegration();
    }
}

// Auto-inicializar si el script se carga directamente
if (typeof window !== 'undefined') {
    initCartSystem();
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CartManager, setupCartIntegration, handleAddToCart };
}