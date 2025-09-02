# 📋 Documentación - Página de Productos

## 🎯 Descripción General
La página de productos de Velas Starlight es una aplicación web interactiva que permite a los usuarios explorar, filtrar y ver detalles de los productos disponibles. Incluye funcionalidades de búsqueda, filtrado por categoría y precio, y un modal detallado para cada producto.

## 🏗️ Estructura del Archivo

### 1. **HEAD - Configuración y Recursos**
```html
<head>
    <!-- Configuración básica -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Velas Starlight | Elegancia y Belleza</title>
    
    <!-- Tailwind CSS personalizado -->
    <!-- Font Awesome para iconos -->
    <!-- Google Fonts -->
    <!-- Estilos personalizados -->
</head>
```

**Recursos incluidos:**
- **Tailwind CSS**: Framework CSS con configuración personalizada de colores
- **Font Awesome 6.5.1**: Librería de iconos
- **Google Fonts**: Poppins (sans-serif) y Playfair Display (serif)
- **AOS**: Librería para animaciones al hacer scroll

### 2. **HEADER - Navegación**
```html
<header class="bg-white shadow-md fixed w-full z-50">
    <!-- Logo -->
    <!-- Navegación desktop -->
    <!-- Menú móvil hamburguesa -->
</header>
```

**Características:**
- **Responsive**: Navegación diferente para desktop y móvil
- **Fixed**: Header fijo en la parte superior
- **Carrito**: Icono con contador de productos
- **Menú móvil**: Desplegable con animaciones

### 3. **MAIN - Contenido Principal**

#### 3.1 Sección Hero
```html
<section class="relative">
    <!-- Imagen de fondo con overlay -->
    <!-- Título y descripción -->
</section>
```

#### 3.2 Filtros
```html
<div class="bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Campo de búsqueda -->
    <!-- Selector de categoría -->
    <!-- Selector de precio -->
</div>
```

#### 3.3 Grid de Productos
```html
<div id="product-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Las tarjetas se generan dinámicamente -->
</div>
```

### 4. **MODAL - Detalles del Producto**
```html
<div id="product-modal" class="hidden fixed inset-0 bg-black bg-opacity-50">
    <!-- Imagen con zoom -->
    <!-- Información del producto -->
    <!-- Selectores de opciones -->
    <!-- Control de cantidad -->
    <!-- Botón agregar al carrito -->
</div>
```

### 5. **FOOTER - Pie de página**
```html
<footer class="bg-dark-green text-white py-6">
    <!-- Enlaces -->
    <!-- Redes sociales -->
    <!-- Derechos reservados -->
</footer>
```

## 🎨 Sistema de Colores

| Color | Código | Uso |
|-------|--------|-----|
| `beige-almond` | #F6F1E9 | Fondo principal |
| `dark-green` | #2D3E33 | Texto y botones principales |
| `sage-green` | #3A5A40 | Hover y acentos |
| `warm-cream` | #EDE6DA | Fondos secundarios |
| `leaf-green` | #A3B18A | Elementos decorativos |
| `gray-sand` | #D6CEC3 | Texto secundario |

## 💻 JavaScript - Funcionalidades

### 1. **Datos de Productos**
```javascript
const products = [
    {
        title: "Nombre del producto",
        category: "Categoría",
        description: "Descripción detallada",
        image: "ruta/imagen.jpg",
        types: ["Soya", "Parafina"],
        sizes: [{ label: "50 gr", price: 75 }],
        fragrances: ["Fragancia1", "Fragancia2"]
    }
];
```

**Estructura de cada producto:**
- `title`: Nombre del producto
- `category`: Categoría para filtrado
- `description`: Descripción completa
- `image`: Ruta de la imagen
- `types`: Tipos disponibles (Soya/Parafina)
- `sizes`: Array de tamaños con precios
- `fragrances`: Array de fragancias disponibles

### 2. **Función de Renderizado**
```javascript
function renderProducts(productsToRender = products) {
    // 1. Obtener referencias DOM
    // 2. Limpiar contenido previo
    // 3. Verificar si hay productos
    // 4. Crear tarjetas dinámicamente
    // 5. Agregar event listeners
}
```

**Proceso:**
1. **Validación**: Verifica que el contenedor existe
2. **Limpieza**: Elimina contenido previo
3. **Generación**: Crea HTML para cada producto
4. **Eventos**: Agrega listeners para botones "Ver detalles"
5. **Inserción**: Agrega tarjetas al DOM

### 3. **Sistema de Filtros**
```javascript
function filterProducts() {
    // 1. Obtener valores de filtros
    // 2. Aplicar filtros simultáneamente
    // 3. Renderizar resultados
}
```

**Tipos de filtro:**
- **Búsqueda**: Por título y descripción (case-insensitive)
- **Categoría**: Filtro exacto por categoría
- **Precio**: Por rangos de precio basados en precio mínimo

### 4. **Modal de Producto**
```javascript
function openModal(product) {
    // 1. Establecer información básica
    // 2. Generar opciones dinámicamente
    // 3. Configurar event listeners
    // 4. Mostrar modal
}
```

**Funcionalidades del modal:**
- **Zoom**: Ampliar/reducir imagen del producto
- **Selección**: Tipo, tamaño y fragancia
- **Cantidad**: Control de cantidad con botones +/-
- **Precio dinámico**: Se actualiza según el tamaño seleccionado

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (1 columna)
- **Tablet**: 768px - 1024px (2 columnas)
- **Desktop**: > 1024px (4 columnas)

### Adaptaciones
- **Header**: Menú hamburguesa en móvil
- **Grid**: Columnas adaptativas
- **Modal**: Layout vertical en móvil, horizontal en desktop
- **Filtros**: Stack vertical en móvil

## 🔧 Event Listeners

### Inicialización
```javascript
document.addEventListener("DOMContentLoaded", function() {
    renderProducts();
    // Configurar filtros
    searchInput.addEventListener("input", filterProducts);
    categorySelect.addEventListener("change", filterProducts);
    priceSelect.addEventListener("change", filterProducts);
});
```

### Modal
- **Abrir**: Click en "Ver detalles"
- **Cerrar**: Click en botón X
- **Zoom**: Botones +/- para imagen
- **Cantidad**: Botones +/- para cantidad
- **Selección**: Click en opciones de tipo y tamaño

### Menú Móvil
- **Toggle**: Click en botón hamburguesa

## 🎯 Funcionalidades Principales

### ✅ Implementadas
1. **Renderizado dinámico** de productos
2. **Filtros en tiempo real** (búsqueda, categoría, precio)
3. **Modal interactivo** con opciones de producto
4. **Zoom de imágenes** en modal
5. **Control de cantidad** con validación
6. **Responsive design** completo
7. **Navegación móvil** con menú hamburguesa

### 🔄 Posibles Mejoras
1. **Carrito de compras** funcional
2. **Persistencia** de filtros en URL
3. **Lazy loading** de imágenes
4. **Animaciones** con AOS
5. **Paginación** para muchos productos
6. **Ordenamiento** (precio, nombre, popularidad)
7. **Favoritos** y wishlist
8. **Comparación** de productos

## 🐛 Debugging

### Console Logs Incluidos
- `🔥 Iniciando renderProducts`: Inicio del renderizado
- `✅ Elemento grid encontrado`: Validación DOM
- `🛍️ Creando tarjeta X`: Creación de cada tarjeta
- `🎉 Renderizado completado`: Finalización exitosa
- `❌ No se encontró elemento`: Errores de DOM

### Problemas Comunes
1. **Productos no se muestran**: Verificar console.log y DOM
2. **Filtros no funcionan**: Revisar IDs de elementos
3. **Modal no abre**: Verificar event listeners
4. **Imágenes no cargan**: Verificar rutas relativas

## 📁 Estructura de Archivos
```
proyecto/
├── pages/
│   ├── productos.html          # Archivo principal
│   └── productos-documentado.html  # Versión documentada
├── images/
│   ├── vela-starlight-*.jpeg   # Imágenes de productos
│   ├── hero-banner.png         # Imagen hero
│   └── logo.png               # Logo
├── css/                       # Estilos adicionales
├── js/                        # Scripts adicionales
└── DOCUMENTACION_PRODUCTOS.md  # Esta documentación
```

## 🚀 Deployment

### Requisitos
- Servidor web (Apache, Nginx, etc.)
- Soporte para archivos estáticos
- HTTPS recomendado para producción

### Optimizaciones
- Minificar CSS/JS
- Optimizar imágenes (WebP, compresión)
- Configurar cache headers
- CDN para recursos estáticos

---

**Autor**: Kiro AI Assistant  
**Fecha**: Febrero 2025  
**Versión**: 1.0