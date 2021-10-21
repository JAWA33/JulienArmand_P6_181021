const express = require("express");
const router = express.Router();

const sauceCtrl = require("../controllers/sauceCtrl");
const authorize = require("../middleware/authorize");
const multer = require("../middleware/multerConfig");

router.get("/", authorize, sauceCtrl.showAll);
router.get("/:id", authorize, sauceCtrl.showOne);
router.post("/", authorize, multer, sauceCtrl.createSauce);
router.put("/:id", authorize, multer, sauceCtrl.modifySauce);
router.delete("/:id", authorize, multer, sauceCtrl.deleteSauce);
router.post("/:id/like", authorize, sauceCtrl.likeSauce);
// etc ....

module.exports = router;

//! après création des route sauce : modification pour prise en compte de multer à réaliser
//! (OC : Modifiez les routes pour prendre en compte les fichiers )
