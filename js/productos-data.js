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
        title: "Flor en Cemento",
        category: "Vela",
        description: "El aroma del jardín y la calma de la tierra se encuentran en nuestra Vela Flor en Cemento. Cada pieza es una escultura de paz, con una delicada flor que emerge de su sólido recipiente de yeso. Más que una vela, es un momento de pausa, un pequeño refugio para el alma. Ideal para aquellos que aprecian la belleza en la quietud.",
        image: "../images/vela-starlight-rosas.jpeg",
        types: ["Soya", "Parafina"],
        sizes: [
            { label: "45 gr", price: 60 },
        ],
        fragrances: [
            "Rosas Especiales", "Lavanda", "Vainilla", "Canela",
            "Fresa", "Frutos Rojos", "Blue Berry", "Cereza",
            "Manzana-Canela", "Pitaya", "Flores Hawaianas",
            "Citricos", "Coco", "Menta", "Sandalo"
        ],
        featured: false,
        new: false,
        available: true
    },
    {
        id: 2,
        title: "Suspiro de Ángel",
        category: "Vela",
        description: "Deja que un Suspiro de Ángel ilumine tus momentos. Esta exquisita vela artesanal, con su delicada forma de querubín acunado entre suaves alas, es una invitación a la calma y la serenidad. Más que una luz, es una presencia que infunde paz, consuelo y pureza en cualquier rincón. Perfecta para honrar un recuerdo, celebrar un nuevo comienzo o simplemente rodearte de una atmósfera celestial. ",
        image: "../images/vela-starlight-angeles.jpeg",
        types: ["Soya", "Parafina"],
        sizes: [
            { label: "120 gr", price: 65 }
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
        title: "Bosque Encantado",
        category: "Vela",
        description: "Trae la magia de las fiestas a tu hogar con nuestra Vela Bosque Encantado. Esta encantadora vela artesanal captura la esencia de la Navidad en un diseño exquisito: un pequeño árbol festivo que se alza majestuosamente dentro de un elegante vaso de cristal. Perfecta para evocar la alegría de la temporada, su sutil brillo y aroma (personalizable con fragancias navideñas) transformarán cualquier espacio en un refugio festivo.",
        image: "../images/vela-starlight-pino.jpeg",
        types: ["Soya", "Parafina"],
        sizes: [
            { label: "140 gr", price: 120 }
        ],
        fragrances: ["Pino Fresco", "Canela", "Manzana-Canela", "Menta", "Sándalo"],
        featured: true,
        new: false,
        available: true
    },
    {
        id: 4,
        title: "Sonrisa Eterna",
        category: "Vela",
        description: "Ilumina tu espacio con un toque de originalidad y buen humor con nuestra Vela Sonrisa Eterna. Diseñada con una silueta impecable de muela, esta vela artesanal es el detalle perfecto para profesionales de la odontología, estudiantes, o cualquier persona que aprecie un diseño único y divertido. Colócala en tu consultorio, estudio o en tu hogar para añadir un punto focal inesperado que seguramente iniciará una conversación. Es el regalo ideal para graduaciones, aniversarios de práctica o simplemente para celebrar la pasión por una profesión que trae sonrisas al mundo. ",
        image: "../images/vela-starlight-muela.jpeg",
        types: ["Soya", "Parafina"],
        sizes: [
            { label: "120 gr", price: 75 }
        ],
        fragrances: ["Menta", "Eucalipto", "Vainilla", "Lavanda", "Frutos Rojos"],
        featured: false,
        new: true,
        available: true
    },
    {
        id: 5,
        title: "Flor de Cempasúchil",
        category: "Vela",
        description: "Enciende la luz de la tradición con nuestra Vela Flor del Sol, una pieza artesanal que captura la esencia vibrante de la flor de Cempasúchil. Su diseño detallado, con cada pétalo cuidadosamente formado, evoca la calidez y el resplandor de los caminos que guían a nuestros seres queridos de regreso a casa.",
        image: "../images/vela-flor-cempasuchil.jpeg",
        types: ["Parafina"],
        sizes: [
            { label: "90 gr", price: 55 }
        ],
        fragrances: ["Cempasúchil", "Incienso", "Copal"],
        featured: true,
        new: false,
        available: true
    },
    {
        id: 6,
        title: "Vela de Soya",
        category: "Vela",
        description: " Sumérgete en un oasis de calma con nuestra Vela de Soya. Diseñada para aquellos que buscan serenidad y un toque de naturaleza en su hogar, esta vela artesanal es la esencia pura de la relajación. Elaborada con cera de soya de alta calidad y fragancias auténticas, cada encendido libera un aroma suave y reconfortante, ideal para aliviar el estrés, mejorar el sueño o simplemente crear un ambiente de paz. Su elegante envase de vidrio con tapa de madera complementa cualquier decoración, aportando calidez y un estilo minimalista.",
        image: "../images/vela-soya.jpeg",
        types: ["Soya"],
        sizes: [
            { label: "50 gr", price: 80 },
            { label: "100 gr", price: 120 },
            { label: "150 gr", price: 180 },
            { label: "200 gr", price: 210 }
        ],
        fragrances: [
            "Lavanda", "Vainilla", "Canela", "Fresa", "Frutos Rojos",
            "Blue Berry", "Cereza", "Manzana-Canela", "Pitaya",
            "Rosas Especiales", "Flores Hawaianas", "Citricos",
            "Coco", "Menta", "Sandalo"
        ],
        featured: true,
        new: true,
        available: true
    },
    {
        id: 7,
        title: "Vela de Parafina",
        category: "Vela",
        description: "Despierta tus sentidos con nuestra Vela de Parafina. Si buscas una fragancia que llene tu hogar de alegría y vitalidad, esta vela artesanal es la elección perfecta para ti. Elaborada con cera de parafina de alta calidad, esta vela ofrece una combustión constante y una liberación intensa de deliciosos aromas. El elegante envase de vidrio con tapa de madera complementa su diseño, haciéndola ideal para cualquier estilo decorativo.",
        image: "../images/vela-parafina.jpeg",
        types: ["Soya"],
        sizes: [
            { label: "50 gr", price: 80 },
            { label: "100 gr", price: 120 },
            { label: "150 gr", price: 180 },
            { label: "200 gr", price: 210 }
        ],
        fragrances: [
            "Lavanda", "Vainilla", "Canela", "Fresa", "Frutos Rojos",
            "Blue Berry", "Cereza", "Manzana-Canela", "Pitaya",
            "Rosas Especiales", "Flores Hawaianas", "Citricos",
            "Coco", "Menta", "Sandalo"
        ],
        featured: true,
        new: true,
        available: true
    },

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