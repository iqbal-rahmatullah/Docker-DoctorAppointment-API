const apiAdapter = require("../axios/apiAdapter")

require("dotenv").config()

const { URL_SERVICE_APPOINTMENT } = process.env

const api = apiAdapter(URL_SERVICE_APPOINTMENT)

const addAppointment = async (req, res) => {
  try {
    const userId = req.user
    req.body.userId = userId

    // return res.json(req.body)
    const appointment = await api.post("/api/v1/appointment", req.body)
    return res.status(200).json(appointment.data)
  } catch (error) {
    const status = error.response ? error.response.status : 500
    const message = error.response
      ? error.response.data
      : { error: "Internal Server Error" }

    return res.status(status).json(message)
  }
}
const getAppointmentDoctor = async (req, res) => {
  try {
    const userId = req.user
    req.body.userId = userId
    const appointment = await api.get("/api/v1/appointment/doctor", req.body)
    return res.status(200).json(appointment.data)
  } catch (error) {
    const status = error.response ? error.response.status : 500
    const message = error.response
      ? error.response.data
      : { error: "Internal Server Error" }

    return res.status(status).json(message)
  }
}
const getAppointmentPatient = async (req, res) => {
  try {
    const userId = req.user
    req.body.userId = userId
    const appointment = await api.get("/api/v1/appointment/patient", req.body)
    return res.status(200).json(appointment.data)
  } catch (error) {
    const status = error.response ? error.response.status : 500
    const message = error.response
      ? error.response.data
      : { error: "Internal Server Error" }

    return res.status(status).json(message)
  }
}
const getDetailAppointment = async (req, res) => {
  try {
    try {
      const id = parseInt(req.params.id)
      const userId = req.user
      req.body.userId = userId

      const appointment = await api.get("/api/v1/appointment/" + id, req.body)
      return res.status(200).json(appointment.data)
    } catch (error) {
      const status = error.response ? error.response.status : 500
      const message = error.response
        ? error.response.data
        : { error: "Internal Server Error" }

      return res.status(status).json(message)
    }
  } catch (error) {
    const status = error.response ? error.response.status : 500
    const message = error.response
      ? error.response.data
      : { error: "Internal Server Error" }

    return res.status(status).json(message)
  }
}
const updateAppointment = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const userId = req.user
    req.body.userId = userId
    const appointment = await api.put("/api/v1/appointment/" + id, req.body)
    return res.status(200).json(appointment.data)
  } catch (error) {
    const status = error.response ? error.response.status : 500
    const message = error.response
      ? error.response.data
      : { error: "Internal Server Error" }

    return res.status(status).json(message)
  }
}

const getClock = async (req, res) => {
  try {
    const doctorId = parseInt(req.params.doctorId)
    const userId = req.user
    req.body.userId = userId

    const appointment = await api.get(
      "/api/v1/appointment/clock/" + doctorId + "?date=" + req.body.date
    )
    return res.status(200).json(appointment.data)
  } catch (error) {
    const status = error.response ? error.response.status : 500
    const message = error.response
      ? error.response.data
      : { error: "Internal Server Error" }

    return res.status(status).json(message)
  }
}

module.exports = {
  addAppointment,
  getAppointmentDoctor,
  getAppointmentPatient,
  getDetailAppointment,
  updateAppointment,
  getClock,
}
