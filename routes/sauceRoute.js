const express = require("express");
const router = express.Router();

const sauceCtrl = require("../controllers/sauceCtrl");
const authorize = require("../middleware/authorize");
const multer = require("../middleware/multerConfig");

router.post("/", authorize, multer, sauceCtrl.createSauce);
router.put("/:id", authorize, multer, sauceCtrl.modifySauce);
router.delete("/:id", authorize, multer, sauceCtrl.deleteSauce);
router.post("/:id/like", authorize, sauceCtrl.likeSauce);
// etc ....
router.get("/", authorize, sauceCtrl.showAll);
router.get("/:id", authorize, sauceCtrl.showOne);

module.exports = router;
