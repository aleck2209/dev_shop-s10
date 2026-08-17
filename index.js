// Variables
const baseUrl = "https://fakestoreapi.com";
const sectionProducts = document.getElementById("products");
// Bouton categorie
const allProducts = document.getElementById("all");
const menClothe = document.getElementById("mens-clothes");
const womenClothe = document.getElementById("womens-clothes");
const jewel = document.getElementById("jewels");
const electronic = document.getElementById("electronics");
// Input recherche
const inputSearch = document.getElementById("input-search");
// Compteur
const compteur = document.getElementById("compteur");
// panier d'achat
const btnCart = document.getElementById("btn-cart");
const cartTiroir = document.getElementById("cart-tiroir");
const closeCart = document.getElementById("close-cart");
const cartContent = document.getElementById("cart-content");
const cartTotal = document.getElementById("cart-total");
// Tableau cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Recupérer les produits
const getProducts = async () => {
  const response = await fetch(`${baseUrl}/products`);
  if (!response.ok) {
    throw new Error(`Erreur HTTP : ${response.status}`);
  }

  const data = response.json();
  return data;
};

// Filtre active
const setActiveFilter = (button) => {
  document
    .querySelectorAll(".btn-filter button")
    .forEach((btn) => btn.classList.remove("active"));

  button.classList.add("active");
};

// Sauvegarder le panier
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Mettre à jour le compteur
const updateCompteur = () => {
  compteur.textContent = cart.reduce((total, item) => total + item.quantity, 0);
};

// Ajouter un produit à la cart
const addToCart = (product) => {
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  saveCart();
  updateCompteur();
  displayCart();
};

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
  const cartButtons = document.querySelectorAll(".btn-add-cart");
  cartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const buttonId = Number(event.target.dataset.id);
      const product = products.find((item) => item.id === buttonId);

      addToCart(product);
    });
  });
};

// Fonction filtre des produits par categories
const filterProducts = (products, category) => {
  return products.filter((item) => item.category === category);
};

// Recherche des produits par titres
const searchProducts = (products, searchValue) => {
  return products.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
  );
};

// Affichage du panier
const displayCart = () => {
  if (cart.length === 0) {
    cartContent.innerHTML = `<p>Votre panier est vide.</p>`;
    cartTotal.textContent = "$0.00";
    return;
  }

  cartContent.innerHTML = cart
    .map(
      (item) =>
        `<article class="cart-item">
      <img src="${item.image}" alt="${item.title}"/>
      <div>
        <h3>${item.title}</h3>
        <p>${item.price}</p>
        <div>
          <button type="button" class="btn-decremente" data-id="${item.id}"><i class="fa-solid fa-minus"></i></button>
          <span>${item.quantity}</span>
          <button type="button" class="btn-incremente" data-id="${item.id}"><i class="fa-solid fa-plus"></i></button>
          <button type="button" class="btn-remove" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    </article>`,
    )
    .join("");

  const incrementButtons = cartContent.querySelectorAll(".btn-incremente");

  incrementButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);
      changeQuantity(productId, 1);
    });
  });

  const decrementButtons = cartContent.querySelectorAll(".btn-decremente");

  decrementButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);
      changeQuantity(productId, -1);
    });
  });

  const removeButtons = cartContent.querySelectorAll(".btn-remove");

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);
      removeCart(productId);
    });
  });

  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  cartTotal.textContent = `$${total.toFixed(2)}`;
};

// Modifier quantité
const changeQuantity = (productId, amount) => {
  const product = cart.find((item) => item.id === productId);

  if (!product) {
    return;
  }

  product.quantity += amount;

  if (product.quantity <= 0) {
    cart = cart.filter((item) => item.id !== productId);
  }

  saveCart();
  updateCompteur();
  displayCart();
};

// Supprimer du panier
const removeCart = (productId) => {
  cart = cart.filter((item) => item.id !== productId);

  saveCart();
  updateCompteur();
  displayCart();
};

// ouverture/fermeture du tiroir
btnCart.addEventListener("click", () => {
  cartTiroir.classList.add("open");
});

closeCart.addEventListener("click", () => {
  cartTiroir.classList.remove("open");
});

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
    allProducts.addEventListener("click", () => {
      setActiveFilter(allProducts);
      displayProducts(data);
    });

    menClothe.addEventListener("click", (event) => {
      setActiveFilter(event.target);
      const category = event.target.name;
      const products = filterProducts(data, category);

      displayProducts(products);
    });

    womenClothe.addEventListener("click", (event) => {
      setActiveFilter(event.target);
      const category = event.target.name;
      const products = filterProducts(data, category);

      displayProducts(products);
    });

    jewel.addEventListener("click", (event) => {
      setActiveFilter(event.target);
      const category = event.target.name;
      const products = filterProducts(data, category);

      displayProducts(products);
    });

    electronic.addEventListener("click", (event) => {
      setActiveFilter(event.target);
      const category = event.target.name;
      const products = filterProducts(data, category);

      displayProducts(products);
    });

    // Recherche par titre
    inputSearch.addEventListener("input", (event) => {
      const searchValue = event.target.value.trim();
      const products = searchProducts(data, searchValue);

      displayProducts(products);
    });
  } catch (error) {
    console.log(error);

    sectionProducts.innerHTML = `<p class="error">Impossible de charger les produits.<br>Veuillez vérifier votre connexion et réessayer.</p>`;
  }
};

// Initialisation du panier
updateCompteur();
displayCart();

// Chargement des produits
loadProducts();
