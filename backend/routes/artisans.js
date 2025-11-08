
const express = require("express");
const router = express.Router();
const { getAllArtisansDB, getArtisanByIdDB } = require("../controllers/artisansController");

router.get("/", getAllArtisansDB);          
router.get("/id/:id", getArtisanByIdDB);    

module.exports = router;



