const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

//const UserModel = require("./models/userModel");
const userRoute = require("./routes/userRoute");
const sauceRoute = require("./routes/sauceRoute");
//* Connexion à MongoDB avec mongoose :

mongoose
  .connect(
    "mongodb+srv://julienARMAND:Bagus_database_access33@cluster0.qbney.mongodb.net/piiquante?retryWrites=true&w=majority",
    //! Modification de la connexion avec un .env pour ne pas que les codes de connexion soit disponibles !!!//
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//* Utilisation d'express :

const app = express();

//* Autorisation CORS (version openclassrooms):
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });
//* Autorisation CORS (version fromscratch):
app.use(cors());

//* Connexion pour envoi sans body-parser :
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);

//* Route Signup :

// app.post("/api/auth/signup", (req, res) => {
//   console.log(req.body);
//   const user = new UserModel({
//     ...req.body,
//   });
//   user
//     .save()
//     .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
//     .catch((err) => res.status(400).json("voici " + err));
// });
module.exports = app;
