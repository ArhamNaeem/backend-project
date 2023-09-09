const express = require('express')
const router = express.Router()
const {updateUserDayEarn,getUserDayEarn} = require('../controllers/dayEarn')



router.patch('/update-user-day-earn/:userId/',updateUserDayEarn)
router.get('/get-user-day-earn/:userId/',getUserDayEarn)

module.exports = router
