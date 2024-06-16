async function clickSearch() {
  const movieName = document.getElementById("movie-name").value;
  // if there are no strings in the search then alert the user
  //"please enter a movie name"
  if (movieName.trim() === "") {
    return alert("Please enter a movie name");
  }
  //calling the api
  const response = await axios.get(`http://localhost:3000/${movieName}`);

  const movieList = response.data.results;

  document.getElementById("movies").innerHTML = "";
  //for each movie there is in the movielist, return the properties that are choosen from the api
  for (let movie of movieList) {
    let postImage = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    if (movie.poster_path === null) {
      postImage = `noImage.avif`;
    }
    document.getElementById("movies").innerHTML += `
    <div class="card">
    <a href="/about.html?id=${movie.id}">
    <div class="card-detail">
    <img src="${postImage}" alt="Avatar" style="width: 100%" />
    <div class="card-text">
    <h4><b>${movie.title}</b></h4>
  </div>
  </div>
  </a>
</div>`;
  }
  //this targets my id of "movie-search-container"
  //this will make it display none at the end of the search so that insed of the get stacking on each other
  //it can be replaced with another id
  document.getElementById("movie-search-container").style.display = "none";
}
