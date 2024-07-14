async function addToCart(productName) {
	try {
		const response = await fetch(`/cart/add/${productName}`, {
			method: "POST",
		});
		const cart = await response.json();
		location.reload();
	} catch (error) {
		console.error("Error adding to cart:", error);
	}
}

async function removeFromCart(productName) {
	try {
		const response = await fetch(`/cart/remove/${productName}`, {
			method: "POST",
		});
		const cart = await response.json();
		location.reload();
	} catch (error) {
		console.error("Error removing from cart:", error);
	}
}

async function loadCart() {
	try {
		const response = await fetch("/cart/getAll");
		const cartItems = await response.json();
		const cartTable = document.getElementById("cartItems");

		cartTable.innerHTML = `
			  <thead>
					<tr>
						 <th class="imena">NAZIV PROIZVODA</th>
						 <th class="imena">KOLIČINA</th>
					</tr>
			  </thead>
			  <tbody></tbody>
		 `;

		cartItems.forEach((item) => {
			const row = cartTable.insertRow();
			const cell1 = row.insertCell(0);
			const cell2 = row.insertCell(1);
			cell1.innerHTML = item.name;
			cell2.innerHTML = `
					<button class="add-btn" onclick="addToCart('${item.name}')">+</button>
					${item.quantity}
					<button class="remove-btn" onclick="removeFromCart('${item.name}')">-</button>
			  `;
		});
	} catch (error) {
		console.error("Error fetching cart items:", error);
	}
}

window.addEventListener("pageshow", () => {
	loadCart();
});

document.addEventListener("DOMContentLoaded", () => {
	loadCart();
});
