const express = require('express');
const userRouter = require('./routes/user');
const doctorRouter = require('./routes/doctor')
const ratingRouter = require('./routes/rating');
const appointmentRouter = require('./routes/appointment');
const chatRouter = require('./routes/chat')
const cors = require('cors');

const app = new express();

app.use(express.json())
app.use(cors())

app.use("/", userRouter)
app.use("/doctors", doctorRouter)
app.use("/ratings", ratingRouter)
app.use("/appointments", appointmentRouter)
app.use("/chats", chatRouter)
app.use("/", (req,res)=>{
    console.log("tes")
})

app.listen(3000, ()=>{
    console.log('listening on port 3000');
    // console.log(userRouter)
});