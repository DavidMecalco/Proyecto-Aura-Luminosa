# 🚀 Guía de Optimización SEO - Velas Starlight

## ✅ Optimizaciones Implementadas

### 1. **Meta Tags Mejorados**
- ✅ Título optimizado con palabras clave
- ✅ Meta description atractiva y descriptiva
- ✅ Keywords relevantes
- ✅ Open Graph para redes sociales
- ✅ Twitter Cards
- ✅ Canonical URLs

### 2. **Structured Data (Schema.org)**
- ✅ LocalBusiness markup
- ✅ Product catalog
- ✅ Contact information
- ✅ Opening hours
- ✅ Price range

### 3. **Archivos Técnicos**
- ✅ sitemap.xml creado
- ✅ robots.txt optimizado
- ✅ Favicon configurado

## 📈 Próximos Pasos para Mejorar el SEO

### 1. **Contenido y Palabras Clave**

#### Palabras clave principales a usar más:
- "velas artesanales México"
- "velas de soya naturales"
- "velas aromáticas premium"
- "decoración con velas"
- "aromaterapia hogar"
- "regalos originales México"

#### Agregar más contenido:
```html
<!-- En index.html, agregar sección de blog/consejos -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-serif text-center mb-12">Consejos de Aromaterapia</h2>
        <div class="grid md:grid-cols-3 gap-8">
            <article>
                <h3>Cómo elegir la fragancia perfecta</h3>
                <p>Descubre qué aroma se adapta mejor a cada momento del día...</p>
            </article>
            <!-- Más artículos -->
        </div>
    </div>
</section>
```

### 2. **Optimización de Imágenes**

#### Renombrar imágenes con palabras clave:
```
galeria-1.jpg → velas-artesanales-soya-starlight.jpg
vela-starlight-rosas.jpeg → vela-artesanal-rosas-cemento.jpg
vela-starlight-angeles.jpeg → vela-suspiro-angel-artesanal.jpg
```

#### Agregar alt text descriptivo:
```html
<img src="images/vela-artesanal-rosas-cemento.jpg" 
     alt="Vela artesanal Flor en Cemento con fragancia de rosas, elaborada con cera de soya natural">
```

### 3. **Velocidad de Carga**

#### Optimizar imágenes:
- Convertir a WebP
- Comprimir sin perder calidad
- Usar lazy loading

#### Minificar archivos:
```html
<!-- Cargar CSS crítico inline -->
<style>
/* CSS crítico aquí */
</style>

<!-- CSS no crítico con defer -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### 4. **Enlaces Internos**

#### Agregar más enlaces internos:
```html
<!-- En index.html -->
<p>Descubre nuestra <a href="pages/productos.html">colección completa de velas artesanales</a> 
   o <a href="pages/contacto.html">contáctanos para pedidos personalizados</a>.</p>
```

### 5. **Local SEO**

#### Agregar información de ubicación:
```html
<!-- En contacto.html -->
<div itemscope itemtype="http://schema.org/LocalBusiness">
    <h1 itemprop="name">Velas Starlight</h1>
    <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
        <span itemprop="addressLocality">Ciudad de México</span>,
        <span itemprop="addressRegion">CDMX</span>
        <span itemprop="addressCountry">México</span>
    </div>
    <span itemprop="telephone">+52-XXX-XXX-XXXX</span>
</div>
```

## 📱 Optimización para Móviles

### Core Web Vitals:
- ✅ Responsive design implementado
- ⚠️ Optimizar LCP (Largest Contentful Paint)
- ⚠️ Mejorar CLS (Cumulative Layout Shift)

## 🔗 Link Building

### Estrategias recomendadas:
1. **Directorios locales**: Registrarse en directorios de negocios mexicanos
2. **Redes sociales**: Instagram, Facebook, Pinterest (ideal para velas)
3. **Blog colaborativo**: Escribir sobre decoración y aromaterapia
4. **Reseñas**: Google My Business, Facebook Reviews

## 📊 Herramientas de Monitoreo

### Configurar:
1. **Google Analytics 4**
2. **Google Search Console**
3. **Google My Business**
4. **Facebook Pixel** (para remarketing)

### Código para Google Analytics:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 Métricas a Monitorear

### Palabras clave objetivo:
- "velas artesanales" (posición actual: ?)
- "velas de soya México" (posición actual: ?)
- "velas aromáticas" (posición actual: ?)
- "decoración con velas" (posición actual: ?)

### KPIs importantes:
- Tráfico orgánico mensual
- Posición promedio en Google
- Tasa de conversión
- Tiempo en página
- Tasa de rebote

## 🚀 Acciones Inmediatas (Esta Semana)

1. ✅ **Implementado**: Meta tags optimizados
2. ✅ **Implementado**: Sitemap.xml
3. ✅ **Implementado**: Robots.txt
4. 🔄 **Pendiente**: Registrar en Google Search Console
5. 🔄 **Pendiente**: Crear Google My Business
6. 🔄 **Pendiente**: Optimizar imágenes
7. 🔄 **Pendiente**: Agregar más contenido de valor

## 📈 Resultados Esperados

### En 1-2 semanas:
- Mejor apariencia en resultados de búsqueda
- Indexación más rápida de páginas nuevas

### En 1-3 meses:
- Aumento del 20-40% en tráfico orgánico
- Mejor posicionamiento para palabras clave objetivo
- Más clics desde resultados de búsqueda

### En 3-6 meses:
- Posicionamiento en primera página para términos locales
- Aumento significativo en conversiones orgánicas