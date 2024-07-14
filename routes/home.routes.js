const express = require("express");
const router = express.Router();
const data = require("../data/mydata");

router.get("/", (req, res) => {
	const cartCount = req.session.cart
		? req.session.cart.reduce((sum, item) => sum + item.quantity, 0)
		: 0;
	const currentCategory = req.session.currentCategory
		? `Trenutačno otvorena kategorija: ${req.session.currentCategory}`
		: "Trenutačno nije otvorena ni jedna kategorija!";
	res.render("home", {
		categories: data.categories,
		cartCount,
		currentCategory,
	});
});

//ruta za dohvacanje kategorija
router.get("/home/getCategories", (req, res) => {
	res.json(data.categories);
});

//ruta za dohvacanje proizvoda za odredenu kateogriju
router.get("/home/getProducts/:id", (req, res) => {
	const category = data.categories.find((cat) => cat.name === req.params.id); //nalazenje kategorije po id-u
	if (category) {
		req.session.currentCategory = category.name;
	} else {
		req.session.currentCategory =
			"Trenutačno nije otvorena ni jedna kategorija!";
	}
	res.json(category ? category.products : []);
});

module.exports = router;
