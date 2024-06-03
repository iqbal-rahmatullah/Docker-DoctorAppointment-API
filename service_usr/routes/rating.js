const express = require('express');
const { createRating, getRating, getAllRating } = require('../controller/RatingController');
const router = express.Router();
/* GET home page. */
router.post('/',()=>{
    return res.json(req.body)
});
router.get('/:doctorId',getAllRating);

module.exports = router;
