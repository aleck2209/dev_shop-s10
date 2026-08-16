// Variables
const baseUrl = "https://fakestoreapi.com";
const sectionProducts = document.getElementById("products");
// Bouton categorie
const allProducts = document.getElementById('all')
const menClothe = document.getElementById("mens-clothes");
const womenClothe = document.getElementById("womens-clothes");
const jewel = document.getElementById("jewels");
const electronic = document.getElementById("electronics");
// Input recherche
const inputSearch = document.getElementById("input-search");
// Compteur
const compteur = document.getElementById('compteur')
// Tableau cart
let cart = [];

// Recupérer les produits
const getProducts = async () => {
  const response = await fetch(`${baseUrl}/products`);
  if (!response.ok) {
    throw new Error(`Erreur HTTP : ${response.status}`);
  }

  const data = response.json();
  return data;
};

// Mettre à jour le compteur
const updateCompteur = () => {
  compteur.textContent = cart.length;
}

// Ajouter un produit à la cart
const addToCart = (product) => {
  cart.push(product);

  updateCompteur();

  console.log(cart);
}

// Affichage des produit
const displayProducts = (products) => {
  sectionProducts.classList.replace("block", "products");
  sectionProducts.innerHTML = products
    .map(
      (item) =>
        `
          <article class="card-product">
              <figure class="img-container">
                  <img class="img-article" src="${item.image}" alt="${item.title}"/>
              </figure>
              <div class="text-container-product">
                  <div class="price-category-container">
                      <p class="price-card">$${item.price}</p>
                      <span class="category-card">${item.category}</span>
                  </div>
                  <p class="title-card">${item.title}</p>
                  <p class="description-card">${item.description.substring(0, 100)}...</p>
              <div/>
              <button type="button" class="btn-add-cart" data-id="${item.id}">Ajouter au panier</button>
          </article>
        `,
    )
    .join("");

    // Evenement pour ajouter produit à la carte
    const cartButtons = document.querySelectorAll('.btn-add-cart');
    cartButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const buttonId = Number(event.target.dataset.id);
        const product = products.find(item => item.id === buttonId);

        addToCart(product);
      });
    });
}

// Fonction filtre des produits par categories
const filterProducts = (products, category) => {
  return products.filter(item => item.category === category)
}

// Recherche des produits par titres
const searchProducts = (products, searchValue) => {
  return products.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
}

// Chargement des produits
const loadProducts = async () => {
  try {
    // Chargement...
    sectionProducts.innerHTML = `
      <p class="loader">
        Chargement en cours...
      </p>
    `;
    
    //Recuperer les produits
    const data = await getProducts();
    
    // Affichage initial
    displayProducts(data);

    // Filtre par category
    allProducts.addEventListener('click', () => {
      displayProducts(data);
    })

    menClothe.addEventListener('click', (event) => {
      const category = event.target.name;
      const products = filterProducts(data, category);
      
      displayProducts(products);
    });

    womenClothe.addEventListener('click', (event) => {
      const category = event.target.name;
      const products = filterProducts(data, category);
      
      displayProducts(products);
    });

    jewel.addEventListener('click', (event) => {
      const category = event.target.name;
      const products = filterProducts(data, category);
      
      displayProducts(products);
    });

    electronic.addEventListener('click', (event) => {
      const category = event.target.name;
      const products = filterProducts(data, category);
      
      displayProducts(products);
    });

    // Recherche par titre
    inputSearch.addEventListener('input', (event) => {
      const searchValue = event.target.value.trim()
      const products = searchProducts(data, searchValue);

      displayProducts(products);
    });

  } catch (error) {
    console.log(error);

    sectionProducts.innerHTML = `<p class="error">Impossible de charger les produits.<br>Veuillez vérifier votre connexion et réessayer.</p>`;
  }
}

loadProducts()