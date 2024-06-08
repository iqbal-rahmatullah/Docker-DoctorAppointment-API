const express = require("express")
const verifyToken = require("../middleware/verifytoken")
const {
  getChat,
  addChat,
  getDetailChat,
  getMessage,
  openChat,
} = require("../handler/chat")
const { route } = require("./user")
// const { getMessage } = require('../../service_user/controller/ChatController')

const router = express.Router()

router.get("/", verifyToken, getChat)
router.post("/", verifyToken, addChat)
router.get("/message/:id", verifyToken, getMessage)
router.get("/detail/:doctorId", verifyToken, getDetailChat)
router.post("/open-chat", verifyToken, openChat)

module.exports = router
