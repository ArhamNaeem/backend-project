const express = require('express')
const router = express.Router()
const {getUserVIPLevel,getUserPoints, getUserBalance,getUserTicketsBought} = require('../controllers/rewards')



router.get('/points/:userID/',getUserPoints)
router.get('/VIPLevel/:userID/',getUserVIPLevel)
router.get('/balance/:userID/',getUserBalance)
router.get('/ticketsBought/:userID/',getUserTicketsBought)



module.exports = router
