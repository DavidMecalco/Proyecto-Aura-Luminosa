/**
 * ========================================
 * CORRECCIONES PARA EL CARRITO DE COMPRAS
 * Velas Starlight - Cart Fixes
 * ========================================
 */

/**
 * Clase mejorada para manejar el carrito de compras
 */
class ImprovedShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.shippingMethod = 'standard'; // 'standard' o 'express'
        this.shippingCosts = {
            standard: 50,
            express: 120
        };
        this.freeShippingThreshold = 1200; // Envío gratis si subtotal > $1200
        this.discountAmount = 0;
        this.discountCodes = {
            'NUEVOSITIO15': 15, // 15% de descuento
        };
        this.currentStep = 'cart';
        this.init();
    }

    /**
     * Inicializar el carrito
     */
    init() {
        this.updateCartDisplay();
        this.updateCartCount();
        this.setupEventListeners();
        this.showStep('cart');
        console.log('🛒 Carrito mejorado inicializado con', this.items.length, 'productos');
    }

    /**
     * Cargar carrito desde localStorage
     */
    loadCart() {
        try {
            const saved = localStorage.getItem('starlight_cart');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error cargando carrito:', error);
            return [];
        }
    }

    /**
     * Guardar carrito en localStorage
     */
    saveCart() {
        try {
            localStorage.setItem('starlight_cart', JSON.stringify(this.items));
            console.log('💾 Carrito guardado');
        } catch (error) {
            console.error('Error guardando carrito:', error);
        }
    }

    /**
     * Actualizar contador del carrito en el header
     */
    updateCartCount() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const countElements = document.querySelectorAll('#cart-count, #cart-count-mobile');
        countElements.forEach(el => {
            if (el) el.textContent = totalItems;
        });
    }

    /**
     * Actualizar visualización del carrito
     */
    updateCartDisplay() {
        const container = document.getElementById('cart-items-container');
        const emptyMessage = document.getElementById('empty-cart-message');
        const itemsCount = document.getElementById('cart-items-count');

        if (this.items.length === 0) {
            if (container) container.style.display = 'none';
            if (emptyMessage) emptyMessage.style.display = 'block';
            if (itemsCount) itemsCount.textContent = '0';
        } else {
            if (container) container.style.display = 'block';
            if (emptyMessage) emptyMessage.style.display = 'none';
            if (itemsCount) itemsCount.textContent = this.items.length;
            this.renderCartItems();
        }

        this.updateTotals();
        
        // También actualizar el resumen final si estamos en el paso de pago
        if (this.currentStep === 'payment') {
            this.updateFinalOrderSummary();
        }
    }

    /**
     * Renderizar productos en el carrito
     */
    renderCartItems() {
        const container = document.getElementById('cart-items-container');
        if (!container) return;
        
        container.innerHTML = '';

        this.items.forEach((item, index) => {
            const itemElement = this.createCartItemElement(item, index);
            container.appendChild(itemElement);
        });
    }

    /**
     * Crear elemento HTML para un producto del carrito
     */
    createCartItemElement(item, index) {
        const div = document.createElement('div');
        div.className = 'cart-item bg-white rounded-xl shadow-md p-6 mb-4';

        // Asegurar que el precio sea un número válido
        const price = parseFloat(item.price) || 75; // Precio por defecto si no existe
        const quantity = parseInt(item.quantity) || 1;
        const total = price * quantity;

        div.innerHTML = `
            <div class="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <!-- Imagen del producto -->
                <div class="flex-shrink-0">
                    <img src="${item.image || '../images/vela-default.jpg'}" alt="${item.title}" 
                         class="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border-2 border-gray-100">
                </div>

                <!-- Información del producto -->
                <div class="flex-grow">
                    <h3 class="font-bold text-lg text-dark-green mb-2">${item.title}</h3>
                    <div class="space-y-1 text-sm text-gray-600">
                        <p><span class="font-semibold">Tipo:</span> ${item.type || 'Soya'}</p>
                        <p><span class="font-semibold">Tamaño:</span> ${item.size || '50 gr'}</p>
                        <p><span class="font-semibold">Fragancia:</span> ${item.fragrance || 'Vainilla'}</p>
                        <p><span class="font-semibold">Precio unitario:</span> $${price.toFixed(2)} MXN</p>
                    </div>
                </div>

                <!-- Controles de cantidad y precio -->
                <div class="flex flex-col items-end space-y-3">
                    <!-- Control de cantidad -->
                    <div class="flex items-center space-x-2">
                        <button onclick="improvedCart.updateQuantity(${index}, ${quantity - 1})" 
                                class="quantity-btn bg-gray-200 hover:bg-gray-300 text-dark-green w-8 h-8 rounded-full flex items-center justify-center transition">
                            <i class="fas fa-minus text-xs"></i>
                        </button>
                        <span class="w-12 text-center font-semibold">${quantity}</span>
                        <button onclick="improvedCart.updateQuantity(${index}, ${quantity + 1})" 
                                class="quantity-btn bg-gray-200 hover:bg-gray-300 text-dark-green w-8 h-8 rounded-full flex items-center justify-center transition">
                            <i class="fas fa-plus text-xs"></i>
                        </button>
                    </div>

                    <!-- Precio total del producto -->
                    <div class="text-right">
                        <p class="text-lg font-bold text-dark-green">$${total.toFixed(2)} MXN</p>
                    </div>

                    <!-- Botón eliminar -->
                    <button onclick="improvedCart.removeItem(${index})" 
                            class="text-red-500 hover:text-red-700 transition text-sm">
                        <i class="fas fa-trash mr-1"></i>
                        Eliminar
                    </button>
                </div>
            </div>
        `;

        return div;
    }

    /**
     * Actualizar cantidad de un producto
     */
    updateQuantity(index, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItem(index);
        } else {
            this.items[index].quantity = newQuantity;
            this.saveCart();
            this.updateCartDisplay();
            this.updateCartCount();
            
            // Actualizar resumen final si estamos en el paso de pago
            if (this.currentStep === 'payment') {
                this.updateFinalOrderSummary();
            }
        }
    }

    /**
     * Eliminar producto del carrito
     */
    removeItem(index) {
        const removedItem = this.items[index];
        this.items.splice(index, 1);
        this.saveCart();
        this.updateCartDisplay();
        this.updateCartCount();

        // Actualizar resumen final si estamos en el paso de pago
        if (this.currentStep === 'payment') {
            this.updateFinalOrderSummary();
        }

        // Mostrar notificación
        this.showNotification(`${removedItem.title} eliminado del carrito`, 'info');
    }

    /**
     * Vaciar carrito completamente
     */
    clearCart() {
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            this.items = [];
            this.saveCart();
            this.updateCartDisplay();
            this.updateCartCount();
            this.showNotification('Carrito vaciado', 'info');
        }
    }

    /**
     * Calcular subtotal
     */
    getSubtotal() {
        return this.items.reduce((sum, item) => {
            const price = parseFloat(item.price) || 75; // Precio por defecto
            const quantity = parseInt(item.quantity) || 1;
            return sum + (price * quantity);
        }, 0);
    }

    /**
     * Calcular costo de envío
     */
    getShippingCost() {
        const subtotal = this.getSubtotal();
        
        // Si no hay productos, no hay envío
        if (this.items.length === 0) {
            return 0;
        }
        
        // Envío gratis si el subtotal es mayor a $1200
        if (subtotal >= this.freeShippingThreshold) {
            return 0;
        }
        
        // Retornar costo según el método seleccionado
        return this.shippingCosts[this.shippingMethod] || this.shippingCosts.standard;
    }

    /**
     * Cambiar método de envío
     */
    setShippingMethod(method) {
        if (this.shippingCosts[method]) {
            this.shippingMethod = method;
            console.log(`📦 Método de envío cambiado a: ${method}`);
            
            // Actualizar todos los resúmenes
            this.updateTotals();
            this.updateOrderSummary();
            
            if (this.currentStep === 'payment') {
                this.updateFinalOrderSummary();
            }
        }
    }

    /**
     * Aplicar código de descuento
     */
    applyDiscount(code) {
        const upperCode = code.toUpperCase();
        if (this.discountCodes[upperCode]) {
            const percentage = this.discountCodes[upperCode];
            const subtotal = this.getSubtotal();
            this.discountAmount = (subtotal * percentage) / 100;
            this.updateTotals();
            this.showNotification(`¡Descuento del ${percentage}% aplicado!`, 'success');
            return true;
        } else {
            this.showNotification('Código de descuento inválido', 'error');
            return false;
        }
    }

    /**
     * Actualizar totales en el resumen
     */
    updateTotals() {
        const subtotal = this.getSubtotal();
        const shipping = this.getShippingCost();
        const total = subtotal + shipping - this.discountAmount;

        const subtotalEl = document.getElementById('subtotal');
        const shippingEl = document.getElementById('shipping');
        const discountEl = document.getElementById('discount');
        const totalEl = document.getElementById('total');

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)} MXN`;
        
        // Mostrar información especial para envío gratis
        if (shippingEl) {
            if (shipping === 0 && subtotal >= this.freeShippingThreshold) {
                shippingEl.innerHTML = `<span class="text-green-600">GRATIS</span> <span class="text-xs text-gray-500">(envío estándar)</span>`;
            } else if (shipping === 0 && this.items.length === 0) {
                shippingEl.textContent = `$0.00 MXN`;
            } else {
                const methodText = this.shippingMethod === 'express' ? ' (Express)' : ' (Estándar)';
                shippingEl.textContent = `$${shipping.toFixed(2)} MXN${methodText}`;
            }
        }
        
        if (discountEl) discountEl.textContent = `-$${this.discountAmount.toFixed(2)} MXN`;
        if (totalEl) totalEl.textContent = `$${total.toFixed(2)} MXN`;
    }

    /**
     * Proceder al paso de envío
     */
    proceedToShipping() {
        if (this.items.length === 0) {
            this.showNotification('Tu carrito está vacío', 'error');
            return;
        }
        this.showStep('shipping');
        this.updateOrderSummary();
    }

    /**
     * Proceder al paso de pago
     */
    proceedToPayment() {
        // Validar formulario de envío
        const form = document.getElementById('shipping-form');
        if (form && !form.checkValidity()) {
            form.reportValidity();
            return;
        }
        this.showStep('payment');
        this.updateOrderSummary();
        // Asegurar que el resumen final se actualice
        setTimeout(() => {
            console.log('🔄 Actualizando resumen final del pedido...');
            this.updateFinalOrderSummary();
        }, 100);
    }

    /**
     * Volver al carrito
     */
    backToCart() {
        this.showStep('cart');
    }

    /**
     * Mostrar paso específico del checkout
     */
    showStep(step) {
        // Ocultar todos los pasos
        document.querySelectorAll('.checkout-step').forEach(el => {
            el.classList.add('hidden');
        });

        // Mostrar paso seleccionado
        const stepElement = document.getElementById(`${step}-step`);
        if (stepElement) {
            stepElement.classList.remove('hidden');
        }

        // Actualizar indicadores
        this.updateStepIndicators(step);
        this.currentStep = step;

        // Si es el paso de pago, actualizar el resumen final
        if (step === 'payment') {
            console.log('📄 Mostrando paso de pago, actualizando resumen final...');
            setTimeout(() => {
                this.updateFinalOrderSummary();
            }, 50);
        }
    }

    /**
     * Actualizar indicadores de pasos
     */
    updateStepIndicators(currentStep) {
        const steps = ['cart', 'shipping', 'payment'];
        const stepMap = { cart: 1, shipping: 2, payment: 3 };
        const currentStepNumber = stepMap[currentStep];

        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            const indicator = document.getElementById(`step-${stepNumber}`);
            if (!indicator) return;

            const circle = indicator.querySelector('div');
            const text = indicator.querySelector('span');

            if (stepNumber <= currentStepNumber) {
                circle.classList.remove('bg-gray-300', 'text-gray-600');
                circle.classList.add('bg-sage-green', 'text-white');
                text.classList.remove('text-gray-500');
                text.classList.add('text-dark-green');
                indicator.classList.add('active');
            } else {
                circle.classList.remove('bg-sage-green', 'text-white');
                circle.classList.add('bg-gray-300', 'text-gray-600');
                text.classList.remove('text-dark-green');
                text.classList.add('text-gray-500');
                indicator.classList.remove('active');
            }
        });
    }

    /**
     * Actualizar resumen del pedido
     */
    updateOrderSummary() {
        const container = document.getElementById('order-summary');
        if (!container) return;

        const subtotal = this.getSubtotal();
        const shipping = this.getShippingCost();
        const total = subtotal + shipping - this.discountAmount;

        container.innerHTML = `
            <div class="space-y-4 mb-6">
                <div class="flex justify-between">
                    <span class="text-gray-600">Subtotal:</span>
                    <span class="font-semibold">$${subtotal.toFixed(2)} MXN</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Envío:</span>
                    <span class="font-semibold">$${shipping.toFixed(2)} MXN</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Descuento:</span>
                    <span class="font-semibold text-green-600">-$${this.discountAmount.toFixed(2)} MXN</span>
                </div>
                <hr class="border-gray-200">
                <div class="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span class="text-dark-green">$${total.toFixed(2)} MXN</span>
                </div>
            </div>
            <div class="space-y-2 text-sm text-gray-600">
                <p><strong>${this.items.length}</strong> productos en tu pedido</p>
                <p><strong>${this.items.reduce((sum, item) => sum + item.quantity, 0)}</strong> unidades totales</p>
            </div>
        `;
    }

    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        // Vaciar carrito
        const clearCartBtn = document.getElementById('clear-cart');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                this.clearCart();
            });
        }

        // Aplicar descuento
        const applyDiscountBtn = document.getElementById('apply-discount');
        if (applyDiscountBtn) {
            applyDiscountBtn.addEventListener('click', () => {
                const code = document.getElementById('discount-code').value.trim();
                if (code) {
                    this.applyDiscount(code);
                    document.getElementById('discount-code').value = '';
                }
            });
        }

        // Continuar al envío
        const continueToShippingBtn = document.getElementById('continue-to-shipping');
        if (continueToShippingBtn) {
            continueToShippingBtn.addEventListener('click', () => {
                this.proceedToShipping();
            });
        }

        // Continuar al pago
        const continueToPaymentBtn = document.getElementById('continue-to-payment');
        if (continueToPaymentBtn) {
            continueToPaymentBtn.addEventListener('click', () => {
                this.proceedToPayment();
            });
        }

        // Volver al carrito
        const backToCartBtn = document.getElementById('back-to-cart');
        if (backToCartBtn) {
            backToCartBtn.addEventListener('click', () => {
                this.backToCart();
            });
        }

        // Volver al envío desde pago
        const backToShippingBtn = document.getElementById('back-to-shipping');
        if (backToShippingBtn) {
            backToShippingBtn.addEventListener('click', () => {
                this.showStep('shipping');
            });
        }

        // Descargar cotización PDF
        const downloadQuoteBtn = document.getElementById('download-quote');
        if (downloadQuoteBtn) {
            downloadQuoteBtn.addEventListener('click', () => {
                this.downloadQuote();
            });
        }

        // Enter en el campo de descuento
        const discountCodeInput = document.getElementById('discount-code');
        if (discountCodeInput) {
            discountCodeInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const code = e.target.value.trim();
                    if (code) {
                        this.applyDiscount(code);
                        e.target.value = '';
                    }
                }
            });
        }

        // Event listeners para métodos de envío
        const shippingMethods = document.querySelectorAll('input[name="shipping-method"]');
        shippingMethods.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.setShippingMethod(e.target.value);
            });
        });
    }

    /**
     * Mostrar notificación
     */
    showNotification(message, type = 'info') {
        // Remover notificación existente
        const existingNotification = document.querySelector('.cart-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `cart-notification fixed top-24 right-6 z-50 px-6 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 translate-x-full max-w-sm`;

        // Colores según el tipo
        switch (type) {
            case 'success':
                notification.classList.add('bg-green-500');
                break;
            case 'error':
                notification.classList.add('bg-red-500');
                break;
            case 'warning':
                notification.classList.add('bg-yellow-500');
                break;
            default:
                notification.classList.add('bg-blue-500');
        }

        const icons = {
            success: 'check-circle',
            error: 'exclamation-triangle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };

        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas fa-${icons[type] || icons.info} text-lg"></i>
                <div>
                    <p class="font-semibold">${message}</p>
                    <p class="text-xs opacity-90">
                        ${this.items.reduce((sum, item) => sum + item.quantity, 0)} productos en el carrito
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
     * Actualizar resumen final del pedido
     */
    updateFinalOrderSummary() {
        const container = document.getElementById('final-order-summary');
        if (!container) {
            console.warn('⚠️ Contenedor final-order-summary no encontrado');
            return;
        }

        const subtotal = this.getSubtotal();
        const shipping = this.getShippingCost();
        const total = subtotal + shipping - this.discountAmount;
        
        console.log('📊 Actualizando resumen final:', {
            subtotal: subtotal,
            shipping: shipping,
            discount: this.discountAmount,
            total: total
        });

        let itemsHtml = '';
        this.items.forEach(item => {
            const price = parseFloat(item.price) || 75;
            const quantity = parseInt(item.quantity) || 1;
            const itemTotal = price * quantity;

            itemsHtml += `
                <div class="flex justify-between items-center py-2 border-b border-gray-100">
                    <div class="flex-1">
                        <p class="font-semibold text-dark-green">${item.title}</p>
                        <p class="text-sm text-gray-600">
                            ${item.type || 'Soya'} • ${item.size || '50 gr'} • ${item.fragrance || 'Vainilla'}
                        </p>
                    </div>
                    <div class="text-right">
                        <p class="font-semibold">${quantity} x $${price.toFixed(2)}</p>
                        <p class="text-sm text-gray-600">$${itemTotal.toFixed(2)} MXN</p>
                    </div>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="space-y-4">
                <!-- Productos -->
                <div class="space-y-2">
                    ${itemsHtml}
                </div>
                
                <!-- Totales -->
                <div class="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Subtotal:</span>
                        <span class="font-semibold">$${subtotal.toFixed(2)} MXN</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Envío:</span>
                        <span class="font-semibold">$${shipping.toFixed(2)} MXN</span>
                    </div>
                    ${this.discountAmount > 0 ? `
                    <div class="flex justify-between">
                        <span class="text-gray-600">Descuento:</span>
                        <span class="font-semibold text-green-600">-$${this.discountAmount.toFixed(2)} MXN</span>
                    </div>
                    ` : ''}
                    <hr class="border-gray-200">
                    <div class="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span class="text-dark-green">$${total.toFixed(2)} MXN</span>
                    </div>
                </div>
                
                <!-- Información adicional -->
                <div class="text-sm text-gray-600 space-y-1">
                    <p><strong>${this.items.length}</strong> productos diferentes</p>
                    <p><strong>${this.items.reduce((sum, item) => sum + item.quantity, 0)}</strong> unidades totales</p>
                </div>
            </div>
        `;
    }

    /**
     * Descargar cotización en PDF
     */
    downloadQuote() {
        if (!window.quotePDFGenerator) {
            this.showNotification('Error: Generador de PDF no disponible', 'error');
            return;
        }

        // Obtener datos del carrito con el cálculo correcto del envío
        const cartData = {
            items: this.items,
            subtotal: this.getSubtotal(),
            shipping: this.getShippingCost(), // Usar la función correcta
            discount: this.discountAmount
        };

        // Obtener datos de envío
        const shippingData = window.quotePDFGenerator.getShippingData();

        // Validar que hay datos mínimos
        if (this.items.length === 0) {
            this.showNotification('No hay productos en el carrito', 'error');
            return;
        }

        if (!shippingData.fullName || !shippingData.email) {
            this.showNotification('Por favor, completa los datos de envío antes de descargar la cotización', 'warning');
            this.showStep('shipping');
            return;
        }

        // Mostrar mensaje de generación
        this.showNotification('Generando cotización PDF...', 'info');

        // Generar PDF
        try {
            window.quotePDFGenerator.generateQuotePDF(cartData, shippingData);
            this.showNotification('¡Cotización descargada exitosamente!', 'success');
        } catch (error) {
            console.error('Error generando PDF:', error);
            this.showNotification('Error generando la cotización. Inténtalo de nuevo.', 'error');
        }
    }
}

/**
 * Inicializar el carrito mejorado cuando el DOM esté listo
 */
let improvedCart;
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Inicializando carrito mejorado');
    improvedCart = new ImprovedShoppingCart();
    
    // Hacer disponible globalmente para debugging
    window.improvedCart = improvedCart;
    
    // Debug: Función para inspeccionar carrito
    window.debugCart = function() {
        console.log('🔍 Debug del carrito mejorado:');
        console.log('📦 Productos:', improvedCart.items);
        console.log('💰 Subtotal:', improvedCart.getSubtotal());
        console.log('🔢 Total items:', improvedCart.items.reduce((sum, item) => sum + item.quantity, 0));
        
        improvedCart.items.forEach((item, index) => {
            console.log(`Producto ${index + 1}:`, {
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                total: (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1)
            });
        });
    };
});