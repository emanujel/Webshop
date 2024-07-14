function initializeCart() {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	const cartCount = document.querySelector(".kosarica .cart-count");
	const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
	cartCount.textContent = totalCount;

	const productCounts = document.querySelectorAll(".product .cart-count");
	productCounts.forEach((productCount) => {
		const productName = productCount.previousSibling.textContent;
		const cartItem = cart.find((item) => item.name === productName);
		if (cartItem) {
			productCount.textContent = cartItem.quantity;
		} else {
			productCount.textContent = "0";
		}
	});
}

document.addEventListener("DOMContentLoaded", () => {
	initializeCart();
	showProducts("Meso");
});

function updateProductCartCount(productName, cart) {
	const productCounts = document.querySelectorAll(".product .cart-count");
	productCounts.forEach((productCount) => {
		const countProductName = productCount.previousSibling.textContent;
		if (countProductName === productName) {
			const cartItem = cart.find((item) => item.name === productName);
			if (cartItem) {
				productCount.textContent = cartItem.quantity;
			} else {
				productCount.textContent = "0";
			}
		}
	});
}

document.addEventListener("DOMContentLoaded", () => {
	initializeCart();
	showProducts("Meso");
});

function showProducts(categoryName) {
	console.log("Clickaaaa");
	const category = data.categories.find((cat) => cat.name === categoryName);
	const proizvodiDiv = document.querySelector(".proizvodi");
	const otvorenaKategorijaTxt = document.querySelector(
		".otvorenaKategorija .txt"
	);
	otvorenaKategorijaTxt.textContent = `Trenutačno otvorena kategorija: ${categoryName}`;
	proizvodiDiv.innerHTML = "";

	const cart = JSON.parse(localStorage.getItem("cart")) || [];

	category.products.forEach((product) => {
		const productDiv = document.createElement("div");
		productDiv.classList.add("product");

		const productImage = document.createElement("img");
		productImage.src = product.image;

		const cartIcon = document.createElement("img");
		cartIcon.classList.add("cart-icon");
		cartIcon.src = "images/shopping-cart.png";

		cartIcon.addEventListener("click", () => {
			const cartItem = cart.find((item) => item.name === product.name);

			if (cartItem) {
				cartItem.quantity++;
			} else {
				cart.push({ name: product.name, quantity: 1 });
			}

			localStorage.setItem("cart", JSON.stringify(cart));
			const cartCount = document.querySelector(".kosarica .cart-count");

			const totalCount = cart.reduce(
				(acc, item) => acc + item.quantity,
				0
			);
			cartCount.textContent = totalCount;
			updateProductCartCount(product.name, cart);
		});

		const productName = document.createElement("p");
		productName.textContent = product.name;

		const productCartCount = document.createElement("div");
		productCartCount.classList.add("cart-count");
		const cartItem = cart.find((item) => item.name === product.name);
		productCartCount.textContent = cartItem ? cartItem.quantity : "0";

		productDiv.appendChild(productImage);
		productDiv.appendChild(cartIcon);
		productDiv.appendChild(productName);
		productDiv.appendChild(productCartCount);
		proizvodiDiv.appendChild(productDiv);
	});
}
