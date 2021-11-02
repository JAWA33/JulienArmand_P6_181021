require("dotenv").config({ path: "../.env" });
const UserModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  if (validEmail(req.body.email) && validPassword(req.body.password)) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new UserModel({
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur Créé !" }))
          .catch((err) => res.status(400).json({ err }));
      })
      .catch((err) => res.status(500).json({ err }));
    //next();
  } else if (!validEmail(req.body.email)) {
    return res.status(401).json({
      message:
        "E-mail non valide : doit contenir une adresse de type : monadresse@site.com ",
    });
  } else if (!validPassword(req.body.password)) {
    return res.status(402).json({
      message:
        "Votre mot de passe doit contenir au minimum : un nombre, une lettre minuscule, une lettre majuscule et avoir entre 8 et 16 caractères",
    });
  }
};

//! REGEX : validation des données de la requête ----------------------------------
//* Test Email :*****************/
const validEmail = (checkMail) => {
  let regexEmail = new RegExp(
    "^[A-Za-z0-9.-_--]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,3}$",
    "g"
  );
  let testEmail = regexEmail.test(checkMail);

  if (testEmail) {
    return true;
  } else {
    return false;
  }
};

//* Test Password:*****************/
const validPassword = (checkPass) => {
  let regexPass = new RegExp(
    "^(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^wds:])([^s]){8,16}$",
    "g"
  );
  let testPass = regexPass.test(checkPass);

  if (testPass) {
    return true;
  } else {
    return false;
  }
};
//! Fin REGEX : validation des données de la requête----------------------------------

exports.login = (req, res, next) => {
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
  //next();
};
