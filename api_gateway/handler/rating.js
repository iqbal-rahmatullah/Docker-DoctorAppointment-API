const apiAdapter = require("../axios/apiAdapter")

require("dotenv").config()

const { URL_SERVICE_RATING } = process.env

const api = apiAdapter(URL_SERVICE_RATING)

const addRating = async (req, res) => {
  // return res.json(req.body)
  try {
    const userId = req.user
    req.body.userId = userId

    const rating = await api.post("/api/v1/ratings", req.body)
    return res.status(200).json(rating.data)
  } catch (error) {
    const status = error.response ? error.response.status : 500
    const message = error.response
      ? error.response.data
      : { error: "Internal Server Error" }

    return res.status(status).json(message)
  }
}
const getAllRating = async (req, res) => {
  // return res.json(parseInt(req.body.doctorId))
  try {
    const doctorId = parseInt(req.params.doctorId)
    const rating = await api.get("/api/v1/ratings/" + doctorId)
    return res.status(200).json(rating.data)
  } catch (error) {
    const status = error.response ? error.response.status : 500
    const message = error.response
      ? error.response.data
      : { error: "Internal Server Error" }

    return res.status(status).json(message)
  }
}

const checkRating = async (req, res) => {
  try {
    const appointmentId = parseInt(req.params.appointmentId)
    const rating = await api.get("/api/v1/ratings/check/" + appointmentId)
    return res.status(200).json(rating.data)
  } catch (error) {
    const status = error.response ? error.response.status : 500
    const message = error.response
      ? error.response.data
      : { error: "Internal Server Error" }

    return res.status(status).json(message)
  }
}

module.exports = {
  addRating,
  getAllRating,
  checkRating,
}
