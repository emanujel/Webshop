const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	const cart = req.session.cart || [];
	res.render("cart", { cart });
});

//ruta za dohvacanje proizvoda kosarice
router.get("/getAll", (req, res) => {
	const cart = req.session.cart || [];
	res.json(cart);
});

//ruta za dodavanje proizvoda
router.post("/add/:id", (req, res) => {
	const productName = req.params.id;
	let cart = req.session.cart || [];
	const productIndex = cart.findIndex((item) => item.name === productName);
	if (productIndex !== -1) {
		cart[productIndex].quantity++;
	} else {
		cart.push({ name: productName, quantity: 1 });
	}
	req.session.cart = cart;
	res.json(cart);
});

//ruta za uklananje proizvoda
router.post("/remove/:id", (req, res) => {
	const productName = req.params.id;
	let cart = req.session.cart || [];
	const productIndex = cart.findIndex((item) => item.name === productName);
	if (productIndex !== -1) {
		cart[productIndex].quantity--;
		if (cart[productIndex].quantity <= 0) {
			cart.splice(productIndex, 1);
		}
	}
	req.session.cart = cart;
	res.json(cart);
});

module.exports = router;
