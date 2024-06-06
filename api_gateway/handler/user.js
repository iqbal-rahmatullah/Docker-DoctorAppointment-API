const apiAdapter = require("../axios/apiAdapter")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const {
    URL_SERVICE_USER
}  = process.env

const api = apiAdapter(URL_SERVICE_USER)

const register = async(req,res)=>{
    return res.json(URL_SERVICE_USER)
    try {
        const user = await api.post("/api/v1/register",req.body)
        return res.status(200).json(user.data)
    } catch (error) {
        return res.status(500).json({
            status :"error",
            message : error.message
        })
    }
} 

const login = async(req, res)=>{
    try {
        const user = await api.post("/api/v1/login",req.body)
        const token = jwt.sign(user.data, "passwordKey")
        return res.status(200).json({token})
    } catch (error) {
        return res.status(500).json({
            status :"error",
            message : error.message
        })
    }
}

const getUser = async(req,res)=>{
    try {
        const id = req.user
        // return res.json({id})
        const user = await api.get("/api/v1/users/"+id)
        return res.status(200).json( user.data )
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}

const updateUser = async(req,res)=>{
    try {
        // return res.json(req.body)
        const id = req.user
        const user = await api.put("/api/v1/users/"+id,req.body)
        return res.status(200).json(user.data)
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}

const changePassword = async(req,res)=>{
    try {
        const id = req.user
        const user = await api.put("/api/v1/users/change-password/"+id,req.body)
        return res.status(200).json(user.data)
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}

module.exports ={
    register,
    login,
    getUser,
    updateUser,
    changePassword,
}