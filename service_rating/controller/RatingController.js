const { where } = require("sequelize")
const { Rating } = require("../models")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const Validator = require("fastest-validator")
const { optional } = require("joi")
const { app } = require("cli")

const validator = new Validator()

const createRating = async (req, res) => {
  try {
    const schema = {
      rating: {
        type: "number",
        positive: true,
        integer: true,
        min: 1,
        max: 5,
        optional: false,
      },
      appointment_id: { type: "number", optional: false, integer: true },
    }

    const check = validator.compile(schema)
    const validationResult = check(req.body)

    if (validationResult !== true) {
      return res.status(400).json({
        status: "error",
        message: validationResult,
      })
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: req.body.appointment_id },
    })

    if (appointment.patient_id !== req.body.userId) {
      return res.status(401).json({
        status: "error",
        message: "hanya yang sudah membuat janji yang bisa memberikan rating ",
      })
    }

    if (!appointment) {
      return res.status(401).json({
        status: "error",
        message: "hanya yang sudah membuat janji yang bisa memberikan rating ",
      })
    }

    if (appointment.status !== "done") {
      return res.status(401).json({
        status: "error",
        message: "hanya janji yang sudah selesai yang bisa melakukan rating",
      })
    }

    const { rating } = req.body

    const savedRating = await prisma.rating.create({
      data: {
        doctor_id: appointment.doctor_id,
        rating: rating,
        appointment_id: appointment.id,
      },
    })

    return res.status(200).json({
      status: "success",
      data: savedRating,
    })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    })
  }
}

const getRating = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      where: {
        doctor_id: req.params.doctorId,
      },
    })

    let rating = 0
    for (let i = 0; i < ratings.length; i++) {
      rating += ratings[i].rating
    }

    rating = rating / ratings.length

    return res.status(200).json({
      status: "success",
      data: rating,
    })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    })
  }
}

const getAllRating = async (req, res) => {
  try {
    const doctorId = parseInt(req.params.doctorId)

    // return res.json(doctorId)
    const ratings = await prisma.rating.findMany({
      where: {
        doctor_id: doctorId,
      },
      include: {
        appointment: {
          include: {
            doctor: true,
            patient: true,
          },
        },
      },
    })

    if(ratings.length == 0){ 
      return res.status(404).json({
        status: "not found",
        data: "Data tidak ditemukan",
      })
    }


    return res.status(200).json({
      status: "success",
      data: rating
    })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    })
  }
}

const checkRating = async (req, res) => {
  try {
    const appointmentId = parseInt(req.params.appointmentId)

    const rating = await prisma.rating.findFirst({
      where: {
        appointment_id: appointmentId,
      },
    })

    if (rating == null) {
      return res.status(200).json(false)
    }

    return res.status(200).json(true)
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    })
  }
}

module.exports = {
  createRating,
  getRating,
  getAllRating,
  checkRating,
}
