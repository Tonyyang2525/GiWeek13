window.onload = async (event) => {
  var urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  const resDetail = await axios.get(`http://localhost:3000/movie/${movieId}`);

  const resSimilar = await axios.get(
    `http://localhost:3000/similar/${movieId}`
  );

  const movieDetails = resDetail.data;
  const movieList = resSimilar.data.results;
  console.log("movieDetails", movieDetails);
  if (movieDetails.poster_path === null) {
    movieDetails.poster_path = `noImage.avif`;
  } else {
    movieDetails.poster_path = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
  }
  document.getElementById("movie-details").innerHTML = `
    <img src="${movieDetails.poster_path}" alt="Avatar" style="width: 100%" />
    <div class = "container">
    <h1>${movieDetails.title}</h1>
    <h2>${movieDetails.tagline}</h2>
    <p>${movieDetails.overview}</p>
    </div>
   

    `;

  document.getElementById("similar-movies").innerHTML = "";
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
};

async function clickSearch() {
  const movieName = document.getElementById("movie-name").value;

  if (movieName.trim() === "") {
    //this does not work, node usess process. argv
    return alert("Please enter a movie name");
  }
  const response = await axios.get(`http://localhost:3000/${movieName}`);

  const movieList = response.data.results;

  document.getElementById("movies").innerHTML = "";
  for (let movie of movieList) {
    document.getElementById("movie-").innerHTML += `
    <a href="/about.html?id=${movie.id}">
    <div class="card">
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Avatar" style="width: 100%" />
<div class="container">
  <h4><b>${movie.title}</b></h4>
</div>
</div>
</a>`;
    document.getElementById("movie-details").innerHTML = "";
    for (let movie of movieList) {
      document.getElementById("movie-details").innerHTML += `
    <h1>${movie.title}</h1>
    <p>${movie.overview}</p>
    `;
    }
  }
}
