/**
 * ========================================
 * INTEGRACIÓN ENTRE SISTEMAS DE CARRITO
 * Velas Starlight - Cart Integration
 * ========================================
 */

/**
 * Sincronizar los dos sistemas de carrito
 */
function syncCartSystems() {
    // Esperar a que ambos sistemas estén listos
    if (typeof window.cartManager !== 'undefined' && typeof window.improvedCart !== 'undefined') {
        console.log('🔄 Sincronizando sistemas de carrito');
        
        // Usar los datos del cartManager (más actualizado) si existen
        if (window.cartManager.items.length > 0) {
            window.improvedCart.items = window.cartManager.items;
            window.improvedCart.saveCart();
            window.improvedCart.updateCartDisplay();
            window.improvedCart.updateCartCount();
            console.log('✅ Carrito sincronizado desde cartManager');
        }
        
        // Sobrescribir métodos del cartManager para mantener sincronización
        const originalAddProduct = window.cartManager.addProduct.bind(window.cartManager);
        window.cartManager.addProduct = function(product, options) {
            const result = originalAddProduct(product, options);
            // Sincronizar con el carrito mejorado
            if (window.improvedCart) {
                window.improvedCart.items = this.items;
                window.improvedCart.updateCartDisplay();
                window.improvedCart.updateCartCount();
            }
            return result;
        };
        
        const originalRemoveProduct = window.cartManager.removeProduct.bind(window.cartManager);
        window.cartManager.removeProduct = function(productId) {
            const result = originalRemoveProduct(productId);
            // Sincronizar con el carrito mejorado
            if (window.improvedCart) {
                window.improvedCart.items = this.items;
                window.improvedCart.updateCartDisplay();
                window.improvedCart.updateCartCount();
            }
            return result;
        };
        
        const originalUpdateQuantity = window.cartManager.updateQuantity.bind(window.cartManager);
        window.cartManager.updateQuantity = function(productId, newQuantity) {
            const result = originalUpdateQuantity(productId, newQuantity);
            // Sincronizar con el carrito mejorado
            if (window.improvedCart) {
                window.improvedCart.items = this.items;
                window.improvedCart.updateCartDisplay();
                window.improvedCart.updateCartCount();
            }
            return result;
        };
        
        const originalClearCart = window.cartManager.clearCart.bind(window.cartManager);
        window.cartManager.clearCart = function() {
            originalClearCart();
            // Sincronizar con el carrito mejorado
            if (window.improvedCart) {
                window.improvedCart.items = this.items;
                window.improvedCart.updateCartDisplay();
                window.improvedCart.updateCartCount();
            }
        };
        
    } else {
        // Reintentar después de un breve delay
        setTimeout(syncCartSystems, 100);
    }
}

/**
 * Inicializar integración cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔗 Inicializando integración de carritos');
    syncCartSystems();
});

/**
 * También intentar sincronizar cuando la página esté completamente cargada
 */
window.addEventListener('load', function() {
    syncCartSystems();
});