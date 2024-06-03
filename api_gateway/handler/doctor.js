const apiAdapter = require("../axios/apiAdapter")

require("dotenv").config()

const {
    URL_SERVICE_DOCTOR
}  = process.env

const api = apiAdapter(URL_SERVICE_DOCTOR)

const allDoctors = async (req, res) => {
    try {
        const doctors = await api.get("/api/v1/doctors") 
        return res.status(200).json(doctors.data)
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}
const getDoctor = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const doctor = await api.get("/api/v1/doctors/"+id) 
        return res.status(200).json(doctor.data)
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}
const getDoctorByCategory = async (req, res) => {
    try {
        const category = req.params.category
        const doctor = await api.get("/api/v1/doctors/category/"+category) 
        return res.status(200).json(doctor.data)
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}

module.exports={
    getDoctor,
    allDoctors,
    getDoctorByCategory
}