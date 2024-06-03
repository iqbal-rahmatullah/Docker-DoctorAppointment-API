const apiAdapter = require("../axios/apiAdapter")

require("dotenv").config()

const {
    URL_SERVICE_APPOINTMENT
}  = process.env

const api = apiAdapter(URL_SERVICE_APPOINTMENT)

const addAppointment = async (req,res)=>{
    try {
        const userId = req.user
        req.body.userId = userId

        // return res.json(req.body)
        const appointment = await api.post("/api/v1/appointment",req.body)
        return res.status(200).json(appointment.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data);
    }
}
const getAppointmentDoctor = async (req,res)=>{
    try {
        const userId = req.user
        req.body.userId = userId
        const appointment = await api.get("/api/v1/appointment/doctor",req.body)
        return res.status(200).json(appointment.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data);
    }
}
const getAppointmentPatient = async (req,res)=>{
    try {
        const userId = req.user
        req.body.userId = userId
        const appointment = await api.get("/api/v1/appointment/patient",req.body)
        return res.status(200).json(appointment.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data);
    }
}
const getDetailAppointment = async (req,res)=>{
    try {
        try {
            const id = parseInt(req.params.id)
            const userId = req.user
            req.body.userId = userId
            const appointment = await api.get("/api/v1/appointment/patient/"+id,req.body)
            return res.status(200).json(appointment.data)
        } catch (error) {
            return res.status(error.response.status).json(error.response.data);
        }
    } catch (error) {
        return res.status(error.response.status).json(error.response.data);
    }
}
const updateAppointment = async (req,res)=>{
    try {
        const id = parseInt(req.params.id)
        const userId = req.user
        req.body.userId = userId
        const appointment = await api.put("/api/v1/appointment/patient/"+id,req.body)
        return res.status(200).json(appointment.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data);
    }
}

const getClock = async (req,res)=>{
    try {
        const doctorId = parseInt(req.params.doctorId)
        const userId = req.user
        req.body.userId = userId
        const appointment = await api.get("/api/v1/appointment/doctor/"+ doctorId,req.body)
        return res.status(200).json(appointment.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
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
