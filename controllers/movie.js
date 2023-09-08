const Movie = require('../models/Movie'); 
const StatusCodes = require('http-status-codes')
const addMovie = async (req, res) => {
  const { title,product,price } = req.body;

  try {
    // Create a new movie instance
    const newMovie = new Movie({
      title,
      product,
      price,
      VIPLevel
    });

    await newMovie.save();

    res.status(StatusCodes.CREATED).json({ message: 'Movie added successfully', newMovie });
  } catch (error) {
    console.error('Error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};

const deleteAllMovies = async(req,res)=>{
  try {
    await Movie.deleteMany({})

    res.status(StatusCodes.OK).json({ message: 'Movies successfully deleted!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
}


const getAllMovies = async (req,res)=>{
  try {
  const movies = await Movie.find({})
    res.status(StatusCodes.OK).json({ message: 'Successfully retrieved movie data',movies });
  } catch (error) {
    console.error('Error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
}

module.exports = {
addMovie,
deleteAllMovies,getAllMovies
}