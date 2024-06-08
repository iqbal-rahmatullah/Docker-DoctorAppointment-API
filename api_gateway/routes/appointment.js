const express = require("express")
const {
  getAppointmentDoctor,
  getAppointmentPatient,
  getClock,
  updateAppointment,
  getDetailAppointment,
  addAppointment,
} = require("../handler/appointment")
const verifyToken = require("../middleware/verifytoken")

const router = express.Router()

router.get("/doctor", verifyToken, getAppointmentDoctor)
router.get("/patient", verifyToken, getAppointmentPatient)
router.get("/clock/:doctorId", verifyToken, getClock)
router.put("/update/:id", verifyToken, updateAppointment)
router.get("/detail/:id", verifyToken, getDetailAppointment)
router.post("/", verifyToken, addAppointment)

module.exports = router
