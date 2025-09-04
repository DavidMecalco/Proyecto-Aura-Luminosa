/**
 * Sistema de Control de Versiones para Velas Starlight
 * Genera automáticamente números de versión para evitar problemas de caché
 */

// Generar versión basada en timestamp
function generateVersion() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    
    return `${year}${month}${day}${hour}${minute}`;
}

// Función para cargar scripts con versión automática
function loadScriptWithVersion(src, callback) {
    const script = document.createElement('script');
    const version = generateVersion();
    script.src = `${src}?v=${version}`;
    script.onload = callback || function() {};
    script.onerror = function() {
        console.error(`Error cargando script: ${src}`);
    };
    document.head.appendChild(script);
}

// Función para forzar recarga de datos de productos
function reloadProductData() {
    // Eliminar script anterior si existe
    const oldScript = document.querySelector('script[src*="productos-data.js"]');
    if (oldScript) {
        oldScript.remove();
    }
    
    // Cargar nueva versión
    loadScriptWithVersion('../js/productos-data.js', function() {
        console.log('Datos de productos recargados exitosamente');
        // Disparar evento personalizado para notificar la recarga
        window.dispatchEvent(new CustomEvent('productDataReloaded'));
    });
}

// Exportar funciones
window.VersionControl = {
    generateVersion,
    loadScriptWithVersion,
    reloadProductData
};