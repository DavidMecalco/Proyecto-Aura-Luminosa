/**
 * Mejoras SEO para Velas Starlight
 * Funciones para mejorar la experiencia y el SEO
 */

// Función para generar breadcrumbs dinámicos
function generateBreadcrumbs() {
    const path = window.location.pathname;
    const breadcrumbContainer = document.getElementById('breadcrumbs');
    
    if (!breadcrumbContainer) return;
    
    let breadcrumbs = '<nav aria-label="breadcrumb" class="text-sm text-gray-600 mb-4">';
    breadcrumbs += '<ol class="flex space-x-2">';
    breadcrumbs += '<li><a href="../index.html" class="hover:text-sage-green">🏠 Inicio</a></li>';
    
    if (path.includes('productos')) {
        breadcrumbs += '<li><span class="mx-2">›</span></li>';
        breadcrumbs += '<li class="text-sage-green font-semibold">🛍️ Productos</li>';
    } else if (path.includes('contacto')) {
        breadcrumbs += '<li><span class="mx-2">›</span></li>';
        breadcrumbs += '<li class="text-sage-green font-semibold">📞 Contacto</li>';
    } else if (path.includes('carrito')) {
        breadcrumbs += '<li><span class="mx-2">›</span></li>';
        breadcrumbs += '<li class="text-sage-green font-semibold">🛒 Carrito</li>';
    }
    
    breadcrumbs += '</ol></nav>';
    breadcrumbContainer.innerHTML = breadcrumbs;
}

// Función para agregar structured data de productos
function addProductStructuredData(product) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.title,
        "description": product.description,
        "image": product.image,
        "brand": {
            "@type": "Brand",
            "name": "Velas Starlight"
        },
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "MXN",
            "lowPrice": Math.min(...product.sizes.map(s => s.price)),
            "highPrice": Math.max(...product.sizes.map(s => s.price)),
            "availability": product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "seller": {
                "@type": "Organization",
                "name": "Velas Starlight"
            }
        },
        "category": product.category,
        "material": product.types.join(", "),
        "additionalProperty": [
            {
                "@type": "PropertyValue",
                "name": "Fragancias disponibles",
                "value": product.fragrances.length + " opciones"
            },
            {
                "@type": "PropertyValue",
                "name": "Tipo de cera",
                "value": product.types.join(" y ")
            }
        ]
    });
    document.head.appendChild(script);
}

// Función para mejorar el SEO de imágenes
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Agregar loading lazy si no está presente
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Mejorar alt text si está vacío o genérico
        const alt = img.getAttribute('alt');
        if (!alt || alt === 'image' || alt === 'foto') {
            const src = img.src;
            if (src.includes('vela')) {
                img.setAttribute('alt', 'Vela artesanal Starlight elaborada con cera natural');
            } else if (src.includes('logo')) {
                img.setAttribute('alt', 'Velas Starlight - Logo de velas artesanales premium');
            }
        }
    });
}

// Función para agregar FAQ structured data
function addFAQStructuredData() {
    const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "¿Qué tipos de cera utilizan en sus velas?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Utilizamos cera de soya 100% natural y parafina de alta calidad. Ambas opciones están disponibles para todos nuestros diseños."
                }
            },
            {
                "@type": "Question",
                "name": "¿Cuántas fragancias tienen disponibles?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tenemos más de 15 fragancias naturales disponibles, incluyendo Vainilla, Lavanda, Rosas Especiales, Canela, Cítricos, y muchas más."
                }
            },
            {
                "@type": "Question",
                "name": "¿Hacen envíos a toda la República Mexicana?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí, realizamos envíos a toda la República Mexicana. El envío es gratuito en compras mayores a $500 MXN."
                }
            },
            {
                "@type": "Question",
                "name": "¿Las velas son artesanales?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí, todas nuestras velas son 100% artesanales. Cada pieza está hecha a mano con amor y dedicación."
                }
            }
        ]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqData);
    document.head.appendChild(script);
}

// Función para mejorar la velocidad de carga
function optimizePageSpeed() {
    // Precargar recursos críticos
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap',
        '../images/logo.png'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.includes('.css') ? 'style' : 'image';
        document.head.appendChild(link);
    });
}

// Función para tracking de eventos SEO
function trackSEOEvents() {
    // Tracking de clics en productos
    document.addEventListener('click', function(e) {
        if (e.target.closest('.product-card')) {
            const productName = e.target.closest('.product-card').querySelector('h3')?.textContent;
            console.log('Producto clickeado:', productName);
            
            // Aquí puedes agregar Google Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'product_click', {
                    'product_name': productName,
                    'event_category': 'engagement'
                });
            }
        }
    });
    
    // Tracking de tiempo en página
    let startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        console.log('Tiempo en página:', timeSpent, 'segundos');
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_time', {
                'time_spent': timeSpent,
                'event_category': 'engagement'
            });
        }
    });
}

// Inicializar todas las mejoras SEO
document.addEventListener('DOMContentLoaded', function() {
    generateBreadcrumbs();
    optimizeImages();
    addFAQStructuredData();
    optimizePageSpeed();
    trackSEOEvents();
    
    // Agregar structured data de productos si están disponibles
    if (typeof productosData !== 'undefined') {
        productosData.forEach(product => {
            addProductStructuredData(product);
        });
    }
});

// Exportar funciones para uso global
window.SEOEnhancements = {
    generateBreadcrumbs,
    addProductStructuredData,
    optimizeImages,
    addFAQStructuredData,
    optimizePageSpeed,
    trackSEOEvents
};