const express = require("express")
const {
  createRating,
  getRating,
  getAllRating,
  checkRating,
} = require("../controller/RatingController")
const { veryfiPasien, verifyToken } = require("../middleware/verifyToken")
const router = express.Router()
/* GET home page. */
router.post("/", createRating)
router.get("/:doctorId", getAllRating)
router.get("/check/:appointmentId", checkRating)

module.exports = router
