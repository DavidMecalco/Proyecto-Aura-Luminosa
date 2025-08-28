// /js/productos.js
document.addEventListener('DOMContentLoaded', () => {
    // ====== SELECTORES ======
    const searchInput      = document.getElementById('search-input');
    const categoryFilter   = document.getElementById('category-filter');
    const priceFilter      = document.getElementById('price-filter');
    const cardsContainer   = document.getElementById('product-list');
    const cards            = Array.from(cardsContainer?.querySelectorAll('.product-card') || []);
  
    const modal            = document.getElementById('product-modal');
    const closeModalBtn    = document.getElementById('close-modal');
    const modalName        = document.getElementById('modal-name');
    const modalImage       = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice       = document.getElementById('modal-price');
    const modalOptions     = document.getElementById('modal-options');
    const modalFragances   = document.getElementById('modal-fragances');
    const noResultsMessage = document.getElementById('no-results-message');
  
    if (!cardsContainer || cards.length === 0) return; // nada que hacer si no hay grilla
  
    // ====== HELPERS ======
    const normalize = (s = '') => s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  
    const showCards = (list) => {
      // ocultar todo
      cards.forEach(c => c.classList.add('hidden'));
      // mostrar solo filtrados
      list.forEach(c => c.classList.remove('hidden'));
    };
  
    const applySortAndReflow = (list) => {
      // Reordenar DOM para que el orden visual coincida con el sort
      list.forEach(c => cardsContainer.appendChild(c));
    };
  
    // ====== FILTRO ======
    const filterProducts = () => {
      const searchTerm = normalize(searchInput?.value || '');
      const category   = categoryFilter?.value || 'all';
      const priceOrder = priceFilter?.value || 'default';
  
      let result = [...cards];
  
      // 1) Búsqueda por nombre/descr
      if (searchTerm) {
        result = result.filter(card => {
          const name = normalize(card.dataset.name || '');
          const desc = normalize(card.dataset.description || '');
          return name.includes(searchTerm) || desc.includes(searchTerm);
        });
      }
  
      // 2) Categoría
      if (category !== 'all') {
        result = result.filter(card => (card.dataset.category || '') === category);
      }
  
      // 3) Orden por precio
      if (priceOrder === 'low-to-high') {
        result.sort((a, b) => (parseFloat(a.dataset.price) || 0) - (parseFloat(b.dataset.price) || 0));
      } else if (priceOrder === 'high-to-low') {
        result.sort((a, b) => (parseFloat(b.dataset.price) || 0) - (parseFloat(a.dataset.price) || 0));
      }
  
      // 4) Mostrar/Ocultar + reflow
      if (result.length === 0) {
        showCards([]);
        noResultsMessage?.classList.remove('hidden');
      } else {
        noResultsMessage?.classList.add('hidden');
        showCards(result);
        applySortAndReflow(result);
      }
    };
  
    // ====== MODAL ======
    const openModal = () => {
      modal?.classList.remove('hidden');
      document.documentElement.style.overflow = 'hidden'; // bloquear scroll
    };
    const closeModal = () => {
      modal?.classList.add('hidden');
      document.documentElement.style.overflow = '';
    };
  
    const currency = (n) => `$${Number(n).toFixed(2)}`;
  
    const renderOptions = (options = []) => {
      modalOptions.innerHTML = '';
      if (!options.length) return;
  
      options.forEach((opt, i) => {
        const id = `opt-${String(opt.name).replace(/\s+/g,'-')}`;
        const row = document.createElement('div');
        row.className = 'flex items-center gap-2 py-1';
        row.innerHTML = `
          <input type="radio" name="product-option" id="${id}" class="text-sage-green focus:ring-sage-green" ${i===0 ? 'checked' : ''} data-price="${opt.price}">
          <label for="${id}" class="text-gray-800">${opt.name}</label>
          <span class="ml-auto text-dark-green font-semibold">${currency(opt.price)}</span>
        `;
        modalOptions.appendChild(row);
      });
  
      // precio inicial
      const first = modalOptions.querySelector('input[name="product-option"]:checked');
      if (first) modalPrice.textContent = currency(first.dataset.price);
  
      // escuchar cambios para actualizar precio
      modalOptions.addEventListener('change', (e) => {
        if (e.target && e.target.name === 'product-option') {
          modalPrice.textContent = currency(e.target.dataset.price);
        }
      }, { once: true });
    };
  
    const renderFragances = (fragances = []) => {
      modalFragances.innerHTML = '';
      if (!fragances.length) return;
  
      const title = document.createElement('h3');
      title.className = 'font-semibold text-lg mb-2';
      title.textContent = 'Selecciona tu fragancia:';
      modalFragances.appendChild(title);
  
      const wrap = document.createElement('div');
      wrap.className = 'flex flex-wrap gap-2';
      fragances.forEach((f, i) => {
        const id = `frag-${String(f).replace(/\s+/g,'-')}`;
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'product-fragance';
        input.id = id;
        input.className = 'hidden peer';
        if (i === 0) input.checked = true;
  
        const label = document.createElement('label');
        label.htmlFor = id;
        label.className = 'px-4 py-2 bg-white text-dark-green rounded-full border border-gray-300 cursor-pointer peer-checked:bg-sage-green peer-checked:text-white peer-checked:border-sage-green transition-colors duration-200';
        label.textContent = f;
  
        wrap.appendChild(input);
        wrap.appendChild(label);
      });
      modalFragances.appendChild(wrap);
    };
  
    const showModal = (card) => {
      if (!card) return;
  
      // Datos desde data-*
      const name        = card.dataset.name || '';
      const img         = card.dataset.image || '';
      const description = card.dataset.description || '';
      const options     = card.dataset.options ? JSON.parse(card.dataset.options) : [];
      const fragances   = card.dataset.fragances ? JSON.parse(card.dataset.fragances) : [];
  
      // Pinta modal
      modalName.textContent        = name;
      modalImage.src               = img;
      modalImage.alt               = name;
      modalDescription.textContent = description;
  
      renderOptions(options);
      renderFragances(fragances);
  
      openModal();
    };
  
    // ====== EVENTOS ======
    // Abrir modal (delegado)
    document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('.view-product-btn');
      if (btn) {
        const card = btn.closest('.product-card');
        showModal(card);
      }
    });
  
    // Cerrar modal por botón
    closeModalBtn?.addEventListener('click', closeModal);
    // Cerrar modal clic fuera del contenido
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });
  
    // Filtros
    searchInput?.addEventListener('input', filterProducts);
    categoryFilter?.addEventListener('change', filterProducts);
    priceFilter?.addEventListener('change', filterProducts);
  
    // Inicial
    filterProducts();
  });
  