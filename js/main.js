document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const productCards = document.querySelectorAll('.product-card');

    const modal = document.getElementById('product-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const viewProductBtns = document.querySelectorAll('.view-product-btn');

    const modalName = document.getElementById('modal-name');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const modalOptions = document.getElementById('modal-options');

    // Funcionalidad de búsqueda y filtro
    const filterProducts = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const priceOrder = priceFilter.value;

        let filteredProducts = Array.from(productCards);

        if (searchTerm) {
            filteredProducts = filteredProducts.filter(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                return title.includes(searchTerm) || description.includes(searchTerm);
            });
        }

        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(card => {
                return card.dataset.category === category;
            });
        }

        if (priceOrder === 'low-to-high') {
            filteredProducts.sort((a, b) => {
                return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
            });
        } else if (priceOrder === 'high-to-low') {
            filteredProducts.sort((a, b) => {
                return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
            });
        }

        productCards.forEach(card => card.style.display = 'none');
        filteredProducts.forEach(card => card.style.display = 'block');
    };

    // Funcionalidad de la ventana modal
    const showModal = (product) => {
        modalName.textContent = product.dataset.name;
        modalImage.src = product.dataset.image;
        modalDescription.textContent = product.dataset.description;
        
        const options = JSON.parse(product.dataset.options);
        modalOptions.innerHTML = '';
        
        options.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('flex', 'items-center', 'space-x-2');
            optionDiv.innerHTML = `
                <input type="radio" name="product-option" id="${option.name.replace(/\s/g, '-')}" class="text-sage-green focus:ring-sage-green" checked>
                <label for="${option.name.replace(/\s/g, '-')}" class="text-gray-800">${option.name}</label>
                <span class="ml-auto text-dark-green font-semibold">$${option.price}</span>
            `;
            modalOptions.appendChild(optionDiv);
        });

        // Asegurarse de que el primer precio se muestre por defecto
        if(options.length > 0) {
            modalPrice.textContent = `$${options[0].price}`;
        }

        modal.classList.remove('hidden');
    };

    viewProductBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productCard = e.target;
            showModal(productCard);
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Event listeners para filtros y búsqueda
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
});