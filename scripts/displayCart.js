document.addEventListener("DOMContentLoaded", function () {
	displayCart();
});

function displayCart() {
	const cartItemsTable = document.getElementById("cartItems");
	const cart = JSON.parse(localStorage.getItem("cart")) || [];

	cartItemsTable.innerHTML = "";
	const headerRow = document.createElement("tr");
	headerRow.innerHTML = `
        <th>NAZIV PROIZVODA</th>
		  <td colspan="6"></td>
        <th>KOLIČINA</th>
    `;
	cartItemsTable.appendChild(headerRow);

	cart.forEach((item) => {
		const tr = document.createElement("tr");
		tr.innerHTML = `
			  <td>${item.name.replace(".", "")}</td>
			  <td colspan="6"></td>
			  <td>
					<button onclick="decrementQuantity('${item.name}')">-</button>
					${item.quantity}
					<button onclick="incrementQuantity('${item.name}')">+</button>
			  </td>
    			<td colspan="5"></td>
		 `;
		cartItemsTable.appendChild(tr);
	});
}

function decrementQuantity(productName) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	const index = cart.findIndex((item) => item.name === productName);

	if (index !== -1) {
		cart[index].quantity--;
		if (cart[index].quantity <= 0) {
			cart.splice(index, 1);
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		displayCart();
	}
}

function incrementQuantity(productName) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	const index = cart.findIndex((item) => item.name === productName);

	if (index !== -1) {
		cart[index].quantity++;
		localStorage.setItem("cart", JSON.stringify(cart));
		displayCart();
	}
}
