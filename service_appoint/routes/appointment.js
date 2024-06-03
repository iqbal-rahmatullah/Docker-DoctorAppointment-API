const express = require("express")
const router = express.Router()
const AppointmentController = require("../controller/AppointmentController")
const { verifyToken } = require("../middleware/verifyToken")

router.get("/patient", AppointmentController.getAppointmentPatient)
router.get("/doctor", AppointmentController.getAppointmentDoctor)
router
  .route("/:id")
  .get( AppointmentController.getDetailAppointmet)
  .put( AppointmentController.updateAppointment)
router.route("/").post( AppointmentController.addAppointment)
router.get(
  "/clock/:doctor_id",
  
  AppointmentController.getClockAppointment
)

module.exports = router
