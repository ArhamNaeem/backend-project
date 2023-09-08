const express = require('express')
const router = express.Router()
const {getUserVIPLevel,getUserPoints, getUserBalance,getUserTicketsBought,getUserTrialBonus} = require('../controllers/rewards')



router.get('/points/:userID/',getUserPoints)
router.get('/VIPLevel/:userID/',getUserVIPLevel)
router.get('/balance/:userID/',getUserBalance)
router.get('/ticketsBought/:userID/',getUserTicketsBought)
router.get('/trialBonus/:userID/',getUserTrialBonus)


module.exports = router
