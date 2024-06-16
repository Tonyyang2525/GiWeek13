//When user clicks a movie from the list, it will show details of the movie in a new tab
window.onload = async (event) => {
  //getting id from url
  var urlParams = new URLSearchParams(window.location.search);
  //storing id in variable
  //url params is an object
  const movieId = urlParams.get("id");
  //stored variable where the results will be stored
  //calling the api
  const resDetail = await axios.get(`http://localhost:3000/movie/${movieId}`);

  const resSimilar = await axios.get(
    `http://localhost:3000/similar/${movieId}`
  );
  //storing results in variables
  const movieDetails = resDetail.data;
  const movieList = resSimilar.data.results;

  //calling functions
  showMovieDetails(movieDetails);
  showSimilarMovies(movieList);
};
async function showMovieDetails(movieDetails) {
  //if poster path is null, show the image of no image
  //else show the image of the poster
  if (movieDetails.poster_path === null) {
    //if condition is true, insert my personal image from google as a no image movie
    movieDetails.poster_path = `noImage.avif`;
  } else {
    movieDetails.poster_path = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
  }
  //grabs the id from html using DOM
  //creating elemetns with DOM inside of the id
  document.getElementById("movie-details").innerHTML = `
    <img src="${movieDetails.poster_path}" alt="Avatar" style="width: 100%" />
    <div class = "container">
    <h1>${movieDetails.title}</h1>
    <h2>${movieDetails.tagline}</h2>
    <p>${movieDetails.overview}</p>
    </div>
    `;
}

async function showSimilarMovies(movieList) {
  document.getElementById("similar-movies").innerHTML = "";
  //for each movie there is in the movielist, return the properties that are choosen from the api
  for (let movie of movieList) {
    let postImage = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    if (movie.poster_path === null) {
      postImage = `noImage.avif`;
    }

    document.getElementById("similar-movies").innerHTML += `
    
    <div class="card">
    <a href="/about.html?id=${movie.id}">
    <div class="card-detail">
    <img src="${postImage}" alt="Avatar" style="width: 100%" />
    <div class="card-text">
    <h4><b>${movie.title}</b></h4>
  </div>
  </div>
  </a>
</div>
`;
  }
}
