const express = require("express")
const userRouter = require("./routes/user")
const doctorRouter = require("./routes/doctor")
const ratingRouter = require("./routes/rating")
const appointmentRouter = require("./routes/appointment")
const chatRouter = require("./routes/chat")
const cors = require("cors")
const io = require("socket.io")(server)
var http = require("http")

const app = new express()

app.use(express.json())
app.use(cors())
app.use("/test", (req, res) => {
  return res.json("test")
})

app.use("/", userRouter)
app.use("/doctors", doctorRouter)
app.use("/ratings", ratingRouter)
app.use("/appointments", appointmentRouter)
app.use("/chats", chatRouter)
app.use("/", (req, res) => {
  console.log("tes")
})

var port = normalizePort(process.env.PORT || "3000")
app.set("port", port)

var server = http.createServer(app)

var clients = {}

io.on("connection", (socket) => {
  console.log("a user connected")

  socket.on("signin", (id) => {
    console.log("user with id: " + id + " is connected")
    clients[id] = socket
  })

  socket.on("message", (msg) => {
    let targetId = msg.receiver_id
    let senderId = msg.sender_id
    let message = msg.message
    if (clients[targetId] != undefined) {
      console.log(
        "sending message to " + targetId + "from ",
        senderId,
        "message: " + message
      )
      clients[targetId].emit("message", msg)
    }
  })
})

server.listen(port)
server.on("error", onError)
server.on("listening", onListening)

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

function onListening() {
  var addr = server.address()
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
  console.log("Listening on " + bind)
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges")
      process.exit(1)
      break
    case "EADDRINUSE":
      console.error(bind + " is already in use")
      process.exit(1)
      break
    default:
      throw error
  }
}
