const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//konfiguracija sjednice
app.use(
	session({
		secret: "kljuc",
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 900000 }, //kolacici traju 15 min
	})
);

//uvoz ruta
const homeRoutes = require("./routes/home.routes");
const cartRoutes = require("./routes/cart.routes");

//postavljanje ruta za glavnu stranicu i košaricu
app.use("/", homeRoutes);
app.use("/cart", cartRoutes);

//pokretanje servera
app.listen(port, () => {
	console.log("Server radi na portu: " + port);
});
