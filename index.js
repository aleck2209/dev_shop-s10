// Variables
const baseUrl = 'https://fakestoreapi.com'
const sectionProducts = document.getElementById('products')

// Recupérer les produits
const getProducts = async () => {
    try {
        const response = await fetch(`${baseUrl}/products`);
        const data = response.json();
        return data;
    } catch (error) {
        console.log(error);
        return 'Chargement des données'
    }   
}

const displayProducts = async () => {
    const data = await getProducts();
    console.log(data);
    sectionProducts.innerHTML = data.map(item => 
    `
        <article class="card-product">
            <figure class="img-container">
                <img class="img-article" src="${item.image}" alt="${item.title}"/>
            </figure>
            <div class="text-container-product">
                <div class="price-category-container">
                    <p class="price-card">${item.price}</p>
                    <span class="category-card">${item.category}</span>
                </div>
                <p class="title-card">${item.title}</p>
                <p class="description-card">${item.description}</p>
            <div/>
        </article>
    `).join('')
}

displayProducts();