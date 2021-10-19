const express = require("express");
const router = express.Router();

// const sauceCtrl = require('../controllers/sauceCtrl');
const authorize = require("../middleware/authorize");
const multer = require("../middleware/multerConfig");

// router.post('/', authorize, multer, sauceCtrl.createSauce);
// etc ....

module.exports = router;

//! après création des route sauce : modification pour prise en compte de multer à réaliser
//! (OC : Modifiez les routes pour prendre en compte les fichiers )
