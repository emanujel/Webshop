async function showProducts(categoryName) {
	try {
		const response = await fetch(`/home/getProducts/${categoryName}`);
		const products = await response.json();
		const cartResponse = await fetch("/cart/getAll");
		const cartItems = await cartResponse.json();

		const productsContainer = document.querySelector(".proizvodi");
		productsContainer.innerHTML = "";

		products.forEach((product) => {
			const productElement = document.createElement("div");
			productElement.classList.add("product");

			const productImage = document.createElement("img");
			productImage.src = product.image;
			productElement.appendChild(productImage);

			const productName = document.createElement("p");
			productName.textContent = product.name;
			productElement.appendChild(productName);

			const cartIcon = document.createElement("img");
			cartIcon.src = "images/shopping-cart.png";
			cartIcon.classList.add("cart-icon");
			cartIcon.onclick = () => addToCart(product.name);
			productElement.appendChild(cartIcon);

			const quantity =
				cartItems.find((item) => item.name === product.name)
					?.quantity || 0;
			const quantityElement = document.createElement("p");
			quantityElement.textContent = quantity;
			quantityElement.classList.add("cart-count");
			if (quantity > 0) productElement.appendChild(quantityElement);

			productsContainer.appendChild(productElement);
		});

		document.querySelector(
			".otvorenaKategorija .txt"
		).textContent = `Trenutačno otvorena kategorija: ${categoryName}`;
		updateCartCount();
	} catch (error) {
		console.error("Error fetching products:", error);
	}
}

async function addToCart(productName) {
	try {
		const response = await fetch(`/cart/add/${productName}`, {
			method: "POST",
		});
		const cart = await response.json();
		updateCartCount(cart);
		showProducts(
			document
				.querySelector(".otvorenaKategorija .txt")
				.textContent.split(": ")[1]
		);
	} catch (error) {
		console.error("Error adding to cart:", error);
	}
}

async function updateCartCount(cart) {
	if (!cart) {
		const response = await fetch("/cart/getAll");
		cart = await response.json();
	}
	const cartCountElement = document.querySelector(".cart-count");
	const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
	if (cartCount > 0) {
		cartCountElement.textContent = cartCount;
		cartCountElement.style.display = "flex";
	} else {
		cartCountElement.style.display = "none";
	}
}

window.addEventListener("pageshow", () => {
	const currentCategory = document
		.querySelector(".otvorenaKategorija .txt")
		.textContent.split(": ")[1];
	if (currentCategory) {
		showProducts(currentCategory);
	}
	updateCartCount();
});

document.addEventListener("DOMContentLoaded", () => {
	updateCartCount();
});
