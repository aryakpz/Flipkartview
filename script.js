let productsApi = "products.json"
  

document.addEventListener("DOMContentLoaded", function() {
  const priceRange = document.getElementById("priceRange");
  const priceValue = document.getElementById("priceValue");
  const productsDiv = document.getElementById("products");
  // const productDetailsDiv = document.getElementById("selectedProduct");

  let products;

  // Load products from JSON
  fetch(productsApi)
      .then(response => response.json())  
      .then(data => {
          products = data;
          loadProducts();
      })
      .catch(error => console.error('Error loading products:', error));



  // Update price value display
  priceValue.textContent = "Price: $" + priceRange.value;
  priceRange.addEventListener("input", function() {
      priceValue.textContent = "Price: $" + this.value;
      displayProducts(filterProductsByPrice(this.value));
  });

  // Function to load products
  function loadProducts() {
      displayProducts(products);
  }

  // Function to display products
  function displayProducts(products) {
      productsDiv.innerHTML = "";
      products.forEach(product => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("product");
          productDiv.innerHTML = `
              <div class="product-item">
                  <div class="product-image">
                      <img src="${product.image}" alt="${product.name}">
                  </div>
                  <div class="product-description">
                      <h4>${product.name}</h4>
                      <p>${product.details}</p>
                  </div>
                  <div class="product-price">
                      <h2>Price: $${product.price}</h2>
                  </div>
              </div>
          `;


          // Add click event to display product details
          productDiv.addEventListener("click", function() {
              displayProductDetails(product);
          });
          productsDiv.appendChild(productDiv);
      });
  }

  // Function to display product details
  function displayProductDetails(product) {
      productDetailsDiv.innerHTML = `
          <h3>${product.name}</h3>
          <p>Price: $${product.price}</p>
          <h1>${product.details}</h1>
      `;
  }

  // Function to filter products by price


  function filterProductsByPrice(price) {
      return products.filter(product => product.price <= price);
  }
});
