const SauceModel = require("../models/sauceModel");
const fs = require("fs");

//* voir toutes les sauces :
exports.showAll = (req, res, next) => {
  SauceModel.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
  //next();
};

//* voir une seule sauce :
exports.showOne = (req, res, next) => {
  SauceModel.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
  //next();
};

//* Créer une nouvelle sauce :
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  //console.log(req.body);
  delete sauceObject._id;
  const sauce = new SauceModel({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  console.log(sauce),
    sauce
      .save()
      .then(() => res.status(201).json({ message: "Sauce enregistree" }))
      .catch((error) => res.status(400).json({ error }));
};

//* Modifier une sauce existante :

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  SauceModel.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce mise à jour !" }))
    .catch((error) => res.status(400).json({ error }));
  //next();
};

//* Supprimer une sauce existante :

exports.deleteSauce = (req, res, next) => {
  SauceModel.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        SauceModel.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));

  //next();
};
