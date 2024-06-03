const express = require('express');
const { allDoctors, getDoctorByCategory, getDoctor } = require('../handler/doctor');

const router = express.Router();

router.get('/', allDoctors)
router.get('/category/:category', getDoctorByCategory)
router.get("/:id", getDoctor)

module.exports = router