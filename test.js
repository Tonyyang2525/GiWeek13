const axios = require("axios");

const movieName = "batman";
const options = {
  method: "GET",
  url: `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`,
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0N2EyNTk3ZjIyNTBiMDY3Mjg2YTI4ODY5ZWI4MGZmYyIsInN1YiI6IjY2NjcwYTI4ZGQzYTMzZDdhZjg1YTAzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TpoDJA-qXr70yQw1nWUATtO_xRIsbZpQsR4s9FOdDHc",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
