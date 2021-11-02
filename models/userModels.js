const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//* création du schéma Utilisateur : --------------------------------------//

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//* email unique :

userSchema.plugin(uniqueValidator);

//* Fonction de hachage du mot de passe (salage) avant enregistrement dans la base de données -----//

// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// userSchema.statics.login = async function (email, password) {
//   const user = await this.findOne({ email });
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       //console.log(user);
//       return user;
//     }
//     throw Error("Mot de passe incorrect !");
//   }
//   throw Error("Email non valide !");
// };

//* Export du schéma en tant que modèle :--------------------------//
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
