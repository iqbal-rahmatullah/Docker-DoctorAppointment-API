const express = require('express')
const { register, login, getUser, updateUser, changePassword } = require('../handler/user')
const verifyToken  = require('../middleware/verifytoken')

const router = express.Router()

router.post("/login",login )
router.post("/register", register)
router.get("/users",verifyToken ,getUser),
router.put("/users",verifyToken, updateUser)
router.put("/users/password",verifyToken, changePassword)


module.exports = router