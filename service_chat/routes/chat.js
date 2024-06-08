const express = require("express")
const router = express.Router()
const chatController = require("../controller/ChatController")
const { verifyToken, veryfiPasien } = require("../middleware/verifyToken")

router.get("/chat-user/:userId", chatController.getChat)
router.post("/", chatController.addChat)
router.get("/detail/:doctor_id/:userId", chatController.getDetailChat)
router.get("/message/:chat_id", chatController.getMessage)
router.post("/open-chat", chatController.openChat)

module.exports = router
