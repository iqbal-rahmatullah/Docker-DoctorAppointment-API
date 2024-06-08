const apiAdapter = require("../axios/apiAdapter")
require("dotenv").config()

const { URL_SERVICE_CHAT } = process.env

const api = apiAdapter(URL_SERVICE_CHAT)

const addChat = async (req, res) => {
  try {
    req.body.userId = req.user
    const chat = await api.post("/api/v1/chat", req.body)
    return res.status(200).json(chat.data)
  } catch (error) {
    const status = error.response ? error.response.status : 500
    const message = error.response
      ? error.response.data
      : { error: "Internal Server Error" }

    return res.status(status).json(message)
  }
}
const getChat = async (req, res) => {
  try {
    req.body.userId = req.user
    // return res.json(req.body)
    const chat = await api.get("/api/v1/chat/chat-user/" + req.user, req.body)
    return res.status(200).json(chat.data)
  } catch (error) {
    const status = error.response ? error.response.status : 500
    const message = error.response
      ? error.response.data
      : { error: "Internal Server Error" }

    return res.status(status).json(message)
  }
}
const getDetailChat = async (req, res) => {
  try {
    req.body.userId = req.user
    const doctorId = parseInt(req.params.doctorId)
    const chat = await api.get(
      "/api/v1/chat/detail/" + doctorId + "/" + req.user,
      req.body
    )
    return res.status(200).json(chat.data)
  } catch (error) {
    const status = error.response ? error.response.status : 500
    const message = error.response
      ? error.response.data
      : { error: "Internal Server Error" }

    return res.status(status).json(message)
  }
}
const getMessage = async (req, res) => {
  // return res.json('11x')
  try {
    req.body.userId = req.user
    const id = parseInt(req.params.id)
    const chat = await api.get("/api/v1/chat/message/" + id, req.body)
    return res.status(200).json(chat.data)
  } catch (error) {
    const status = error.response ? error.response.status : 500
    const message = error.response
      ? error.response.data
      : { error: "Internal Server Error" }

    return res.status(status).json(message)
  }
}

const openChat = async (req, res) => {
  try {
    req.body.userId = req.user
    const chat = await api.post("/api/v1/chat/open-chat", req.body)
    return res.status(200).json(chat.data)
  } catch (error) {
    const status = error.response ? error.response.status : 500
    const message = error.response
      ? error.response.data
      : { error: "Internal Server Error" }

    return res.status(status).json(message)
  }
}

module.exports = {
  getChat,
  addChat,
  getMessage,
  getDetailChat,
  openChat,
}
