/**
* ========================================
* BASE DE DATOS DE PRODUCTOS
* Velas Starlight - Products Database
* ========================================
*/

// 🛍️ AQUÍ AGREGAS NUEVOS PRODUCTOS FÁCILMENTE
const productosData = [
    {
        id: 1,
        title: "Flor Escondida",
        category: "Vela",
        description: "Una elegante vela con un diseño de flor de loto, perfecta para ambientar tu hogar con una sensación de paz y tranquilidad. Ideal para un momento de relajación o meditación.",
        image: "../images/vela-starlight-rosas.jpeg",
        types: ["Soya", "Parafina"],
        sizes: [
            { label: "50 gr", price: 75 },
            { label: "100 gr", price: 120 },
            { label: "150 gr", price: 180 }
        ],
        fragrances: [
            "Rosas Especiales", "Lavanda", "Vainilla", "Canela",
            "Fresa", "Frutos Rojos", "Blue Berry", "Cereza",
            "Manzana-Canela", "Pitaya", "Flores Hawaianas",
            "Citricos", "Coco", "Menta", "Sandalo"
        ],
        featured: true,
        new: false,
        available: true
    },
    {
        id: 2,
        title: "Ángel de la Calma",
        category: "Vela",
        description: "Una delicada vela con la figura de un angelito en su base, que brinda un aroma puro y etéreo. Perfecta para crear un ambiente celestial y sereno en cualquier espacio de tu hogar.",
        image: "../images/vela-starlight-angeles.jpeg",
        types: ["Soya", "Parafina"],
        sizes: [
            { label: "50 gr", price: 75 },
            { label: "80 gr", price: 95 }
        ],
        fragrances: [
            "Lavanda", "Vainilla", "Canela", "Fresa", "Frutos Rojos",
            "Blue Berry", "Cereza", "Manzana-Canela", "Pitaya",
            "Rosas Especiales", "Flores Hawaianas", "Citricos",
            "Coco", "Menta", "Sandalo"
        ],
        featured: false,
        new: false,
        available: true
    },
    {
        id: 3,
        title: "Vela Pino Navideño",
        category: "Vela",
        description: "Una vela con forma de pino navideño, perfecta para crear un ambiente festivo y acogedor durante las fiestas. Su aroma a pino te transportará a un bosque nevado.",
        image: "../images/vela-starlight-pino.jpeg",
        types: ["Soya", "Parafina"],
        sizes: [
            { label: "100 gr", price: 120 },
            { label: "150 gr", price: 180 },
            { label: "200 gr", price: 220 }
        ],
        fragrances: ["Pino Fresco", "Canela", "Manzana-Canela", "Menta", "Sándalo"],
        featured: true,
        new: false,
        available: true
    },
    {
        id: 4,
        title: "Vela Muela",
        category: "Vela",
        description: "Una vela con un diseño único en forma de muela, perfecta para celebrar a dentistas, estudiantes de odontología o a cualquier persona del sector. Ideal como regalo original para decorar un consultorio o simplemente para añadir un toque divertido a cualquier espacio.",
        image: "../images/vela-starlight-muela.jpeg",
        types: ["Soya", "Parafina"],
        sizes: [
            { label: "150 gr", price: 150 },
            { label: "200 gr", price: 190 }
        ],
        fragrances: ["Menta", "Eucalipto", "Vainilla", "Lavanda", "Frutos Rojos"],
        featured: false,
        new: true,
        available: true
    },
    {
        id: 5,
        title: "Vela Flor de Cempasúchil",
        category: "Vela",
        description: "Celebra el Día de Muertos con esta hermosa vela en forma de flor de Cempasúchil, símbolo de la tradición. Ideal para altares y decoración festiva.",
        image: "../images/vela-flor-cempasuchil.jpeg",
        types: ["Soya", "Parafina"],
        sizes: [
            { label: "50 gr", price: 80 },
            { label: "75 gr", price: 110 }
        ],
        fragrances: ["Cempasúchil", "Incienso", "Copal"],
        featured: false,
        new: false,
        available: true
    },

    // Productos de Belleza
    {
        id: 6,
        title: "Vela Aromaterapia Relajante",
        category: "belleza",
        description: "Vela especialmente diseñada para aromaterapia y relajación. Con aceites esenciales naturales que ayudan a reducir el estrés y crear un ambiente de spa en tu hogar.",
        image: "../images/vela-starlight-rosas.jpeg", // Usando imagen existente como placeholder
        types: ["Soya"],
        sizes: [
            { label: "75 gr", price: 95 },
            { label: "150 gr", price: 165 }
        ],
        fragrances: ["Eucalipto", "Menta", "Lavanda", "Té Verde", "Hierba Buena", "Aloe Vera"],
        featured: false,
        new: true,
        available: true
    },
    {
        id: 7,
        title: "Vela Masaje Corporal",
        category: "belleza",
        description: "Vela de masaje que se derrite en aceite tibio para masajes relajantes. Perfecta para tratamientos de spa caseros y momentos íntimos de relajación.",
        image: "../images/vela-starlight-angeles.jpeg", // Usando imagen existente como placeholder
        types: ["Soya"],
        sizes: [
            { label: "100 gr", price: 145 },
            { label: "200 gr", price: 245 }
        ],
        fragrances: ["Vainilla Sensual", "Ylang Ylang", "Jazmín", "Rosa Búlgara", "Sándalo"],
        featured: true,
        new: false,
        available: true
    }

    // 📝 PLANTILLA PARA AGREGAR NUEVOS PRODUCTOS:
    /*
    {
        id: 6, // ⚠️ IMPORTANTE: Usar el siguiente número disponible
        title: "Nombre de tu Vela",
        category: "Vela", // o "Decoracion", "Belleza", etc.
        description: "Descripción detallada de tu producto...",
        image: "../images/tu-imagen.jpeg", // ⚠️ Asegúrate de que la imagen exista
        types: ["Soya", "Parafina"], // Tipos de cera disponibles
        sizes: [
            { label: "50 gr", price: 75 },
            { label: "100 gr", price: 120 },
            { label: "150 gr", price: 180 }
            // Agrega todos los tamaños que tengas
        ],
        fragrances: [
            "Fragancia 1", "Fragancia 2", "Fragancia 3"
            // Lista todas las fragancias disponibles
        ],
        featured: false, // true si quieres que aparezca como "Destacado"
        new: true, // true si es un producto nuevo
        available: true // false si está agotado temporalmente
    },
    */
];

// 🎨 CONFIGURACIÓN DE CATEGORÍAS
const categorias = [
    { id: "all", name: "Todos", icon: "fa-th-large" },
    { id: "Vela", name: "Velas", icon: "fa-fire" },
    { id: "Decoracion", name: "Decoración", icon: "fa-home" },
    { id: "Belleza", name: "Belleza", icon: "fa-spa" }
];

// 🌸 FRAGANCIAS POPULARES (para la sección especial)
const fraganciasPopulares = [
    { name: "Vainilla", emoji: "🍦", description: "Dulce y relajante" },
    { name: "Lavanda", emoji: "💜", description: "Calmante y floral" },
    { name: "Rosas Especiales", emoji: "🌹", description: "Romántico y elegante" },
    { name: "Canela", emoji: "🍂", description: "Cálido y acogedor" },
    { name: "Citricos", emoji: "🍊", description: "Fresco y energizante" }
];

// 📊 CONFIGURACIÓN GENERAL
const configuracion = {
    moneda: "MXN",
    simboloMoneda: "$",
    mostrarDescuentos: true,
    mostrarStock: false, // Cambiar a true si quieres mostrar disponibilidad
    animaciones: true
};

// 🚀 EXPORTAR DATOS
if (typeof window !== 'undefined') {
    window.productosData = productosData;
    window.categorias = categorias;
    window.fraganciasPopulares = fraganciasPopulares;
    window.configuracion = configuracion;
}

// Para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        productosData,
        categorias,
        fraganciasPopulares,
        configuracion
    };
}