const express = require("express")
const { addRating, getAllRating, checkRating } = require("../handler/rating")
const verifyToken = require("../middleware/verifytoken")

const router = express.Router()

router.post("/", verifyToken, addRating)
router.get("/:doctorId", getAllRating)
router.get("/check/:appointmentId", verifyToken, checkRating)

module.exports = router
