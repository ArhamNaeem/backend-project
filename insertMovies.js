const axios = require('axios');
const async = require('async');

const apiUrl = 'http://localhost:5002/api/v1/movie/addMovie/';
const movieData = require('./movieData.json'); // Replace with the path to your movie data

const insertMovie = (movie, callback) => {
  axios
    .post(apiUrl, movie)
    .then((response) => {
      console.log(`Inserted movie: ${movie.title}`);
      callback(null, response.data);
    })
    .catch((error) => {
      console.error(`Error inserting movie: ${movie.title}`);
      callback(error);
    });
};

const insertAllMovies = () => {
  async.eachLimit(
    movieData,
    5, // Adjust the concurrency limit as needed
    insertMovie,
    (err) => {
      if (err) {
        console.error('Error inserting movies:', err);
      } else {
        console.log('All movies inserted successfully.');
      }
    }
  );
};

insertAllMovies();
