const SauceModel = require("../models/sauceModel");
const fs = require("fs");

//* voir toutes les sauces :
exports.showAll = (req, res) => {
  SauceModel.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

//* voir une seule sauce :
exports.showOne = (req, res) => {
  SauceModel.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

//* Créer une nouvelle sauce :
exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  //console.log(req.body);
  delete sauceObject._id;
  const sauce = new SauceModel({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
  });
  console.log(sauce),
    sauce
      .save()
      .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
      .catch((error) => res.status(400).json({ error }));
};

//* Créer une nouvelle sauce avec image par défaut:
// exports.createSauce = (req, res, next) => {
//   const sauceObject = JSON.parse(req.body.sauce);

//   //console.log(req.body);
//   delete sauceObject._id;
//   console.log(req.file.filename);
//   if (!req.file.filename) {
//     const sauce = new SauceModel({
//       ...sauceObject,
//       imageUrl: `${req.protocol}://${req.get("host")}/images/defaultBottle.jpg`,

//       likes: 0,
//       dislikes: 0,
//     });
//     console.log(sauce),
//       sauce
//         .save()
//         .then(() =>
//           res
//             .status(201)
//             .json({ message: "Sauce enregistrée avec image par default" })
//         )
//         .catch((error) => res.status(400).json({ error }));
//   } else {
//     const sauce = new SauceModel({
//       ...sauceObject,
//       imageUrl: `${req.protocol}://${req.get("host")}/images/${
//         req.file.filename
//       }`,

//       likes: 0,
//       dislikes: 0,
//     });
//     console.log(sauce),
//       sauce
//         .save()
//         .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
//         .catch((error) => res.status(400).json({ error }));
//   }
// };

//* Modifier une sauce existante :

exports.modifySauce = (req, res, next) => {
  //* test suppression image existante
  SauceModel.findOne({ _id: req.params.id }).then((sauce) => {
    const deleteFile = sauce.imageUrl.split("/images/")[1];
    fs.unlink(`images/${deleteFile}`, () => {
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
    }).catch((error) => res.status(404).json({ error }));

    //next();
  });
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

//* Liker les sauces :

exports.likeSauce = (req, res, next) => {
  // si le like dans la requete est = a 1 //
  if (req.body.like === 1) {
    SauceModel.updateOne(
      { _id: req.params.id },
      {
        $inc: { likes: req.body.like++ },
        $push: { usersLiked: req.body.userId },
      }
    )
      .then((sauce) => res.status(200).json({ message: "Like ajouté" }))
      .catch((error) => res.status(400).json({ error }));

    // ou si le like dans la requete est = a -1 //
  } else if (req.body.like === -1) {
    SauceModel.updateOne(
      { _id: req.params.id },
      {
        $inc: { dislikes: req.body.like++ * -1 },
        $push: { usersDisliked: req.body.userId },
      }
    )
      .then((sauce) => res.status(200).json({ message: "DisLike ajouté" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    //  sinon si like = 0 on vient chercher les données de la sauce avec son id //
    SauceModel.findOne({ _id: req.params.id })
      .then((sauce) => {
        // si dans le tableau des usersLiked on a userId alors //
        if (sauce.usersLiked.includes(req.body.userId)) {
          SauceModel.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
          )
            .then((sauce) => {
              res.status(200).json({ message: "Like supprimé " });
            })
            .catch((error) => res.status(400).json({ error }));

          // ou si dans le tableau userDisliked on trouve l'userId alors //
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          SauceModel.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersDisliked: req.body.userId },
              $inc: { dislikes: -1 },
            }
          )
            .then((sauce) => {
              res.status(200).json({ message: "Dislike supprimé" });
            })
            .catch((error) => res.status(400).json({ error }));
        } else {
          throw "Utilisateur non trouvé";
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
  //next()
};
