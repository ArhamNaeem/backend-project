const express = require('express')
const router = express.Router()
const { addMovie,deleteAllMovies,getAllMovies } = require('../controllers/movie')
router.post('/addMovie', addMovie)
router.get('/deleteMovies',deleteAllMovies )
router.get('/getMovies', getAllMovies)

module.exports = router
