const express = require('express');
const { addRating, getAllRating } = require('../handler/rating');
const verifyToken = require('../middleware/verifytoken');

const router = express.Router();

router.post("/",verifyToken ,addRating)
router.get("/:doctorId",getAllRating)

module.exports = router