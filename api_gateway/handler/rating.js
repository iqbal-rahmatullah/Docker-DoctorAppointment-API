const apiAdapter = require("../axios/apiAdapter")

const api = apiAdapter("http://localhost:5000")

const addRating = async (req, res)=>{
    // return res.json(req.body)
    try {
        const userId = req.user
        req.body.userId = userId

        
        const rating = await api.post("/api/v1/ratings",req.body)
        return res.status(200).json(rating.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data);
    }
}
const getAllRating = async (req, res)=>{
    // return res.json(parseInt(req.body.doctorId))
    try {
        const doctorId = parseInt(req.params.doctorId)
        const rating = await api.get("/api/v1/doctors/" +doctorId)
        return res.status(200).json(rating.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data);
    }
}

module.exports = {
    addRating,
    getAllRating,
}