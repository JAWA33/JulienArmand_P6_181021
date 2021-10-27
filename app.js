require("dotenv").config({ path: "./.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const userRoute = require("./routes/userRoute");
const sauceRoute = require("./routes/sauceRoute");
//* Connexion à MongoDB avec mongoose :

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@cluster0.qbney.mongodb.net/piiquante",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));

//* Utilisation d'express :

const app = express();

//* Autorisation CORS (version fromscratch):
app.use(cors());

//* Connexion pour envoi sans body-parser :
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);

module.exports = app;
