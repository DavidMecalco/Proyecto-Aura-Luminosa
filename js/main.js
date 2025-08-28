document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const productCardsContainer = document.getElementById('product-list');
    const productCardsData = Array.from(productCardsContainer.querySelectorAll('.product-card'));

    const modal = document.getElementById('product-modal');
    const closeModalBtn = document.getElementById('close-modal');

    const modalName = document.getElementById('modal-name');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const modalOptions = document.getElementById('modal-options');
    const modalFragances = document.getElementById('modal-fragances');
    const noResultsMessage = document.getElementById('no-results-message');

    const filterProducts = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const priceOrder = priceFilter.value;
    
        productCardsData.forEach(card => card.style.display = 'none');
        noResultsMessage.classList.add('hidden');
    
        let filteredProducts = productCardsData;
    
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                return title.includes(searchTerm) || description.includes(searchTerm);
            });
        }
    
        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(card => card.dataset.category === category);
        }
    
        if (priceOrder === 'low-to-high') {
            filteredProducts.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
        } else if (priceOrder === 'high-to-low') {
            filteredProducts.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
        }
    
        if (filteredProducts.length > 0) {
            noResultsMessage.classList.add('hidden');
            productCardsData.forEach(card => card.style.display = 'none');
            filteredProducts.forEach(card => card.style.display = 'block');
        } else {
            productCardsData.forEach(card => card.style.display = 'none');
            noResultsMessage.classList.remove('hidden');
        }
        
    };
    
    const showModal = (product) => {
        modalName.textContent = product.dataset.name;
        modalImage.src = product.dataset.image;
        modalDescription.textContent = product.dataset.description;
    
        const options = JSON.parse(product.dataset.options);
        modalOptions.innerHTML = '';
        options.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.innerHTML = `<div class="flex items-center space-x-2"><input type="radio" name="product-option" id="${option.name.replace(/\s/g, '-')}" class="text-sage-green focus:ring-sage-green" checked><label for="${option.name.replace(/\s/g, '-')}" class="text-gray-800">${option.name}</label><span class="ml-auto text-dark-green font-semibold">$${option.price}</span></div>`;
            modalOptions.appendChild(optionDiv);
        });
        modalPrice.textContent = `$${options[0].price}`;
    
        modalFragances.innerHTML = '';
        const fragancesData = product.dataset.fragances ? JSON.parse(product.dataset.fragances) : [];
        if (fragancesData.length > 0) {
            const fragancesTitle = document.createElement('h3');
            fragancesTitle.classList.add('font-semibold', 'text-lg', 'mb-2');
            fragancesTitle.textContent = "Selecciona tu fragancia:";
            modalFragances.appendChild(fragancesTitle);
    
            const fragancesContainer = document.createElement('div');
            fragancesContainer.classList.add('flex', 'flex-wrap', 'gap-2');
            fragancesData.forEach((fragance, index) => {
                const fraganceRadio = document.createElement('input');
                fraganceRadio.type = 'radio';
                fraganceRadio.name = 'product-fragance';
                fraganceRadio.id = `fragance-${fragance.replace(/\s/g, '-')}`;
                fraganceRadio.classList.add('hidden', 'peer');
                if (index === 0) fraganceRadio.checked = true;
    
                const fraganceLabel = document.createElement('label');
                fraganceLabel.setAttribute('for', `fragance-${fragance.replace(/\s/g, '-')}`);
                fraganceLabel.classList.add('px-4', 'py-2', 'bg-white', 'text-dark-green', 'rounded-full', 'border', 'border-gray-300', 'cursor-pointer', 'peer-checked:bg-sage-green', 'peer-checked:text-white', 'peer-checked:border-sage-green', 'transition-colors', 'duration-200');
                fraganceLabel.textContent = fragance;
                fragancesContainer.appendChild(fraganceRadio);
                fragancesContainer.appendChild(fraganceLabel);
            });
            modalFragances.appendChild(fragancesContainer);
        } else {
            modalFragances.innerHTML = ''; // Limpiar si no hay fragancias
        }
    
        modal.classList.remove('hidden');
    };
    
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-product-btn')) {
            const productButton = e.target;
            showModal(productButton); // <--- en vez de productCard
        }
        
    });
    
    closeModalBtn.addEventListener('click', () => { modal.classList.add('hidden'); });
    
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    
    filterProducts();
});

