// Variables
const baseUrl = "https://fakestoreapi.com";
const sectionProducts = document.getElementById("products");

// Recupérer les produits
const getProducts = async () => {
    const response = await fetch(`${baseUrl}/products`);
    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
    }

    const data = response.json();
    return data;
};

const displayProducts = async () => {
  try {
    // Etat de chargement
    sectionProducts.innerHTML = `<p class="loader">Chargement en cours...</p>`;
    const data = await getProducts();

    // Chargement reussi
    if (data) {
      sectionProducts.classList.replace('block', 'products');
      sectionProducts.innerHTML = data
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
            </article>
        `,
        )
        .join("");
    }
  } catch (error) {
    sectionProducts.innerHTML = `<p class="error">Impossible de charger les produits.<br>Veuillez vérifier votre connexion et réessayer.</p>`;
  }
};

displayProducts();