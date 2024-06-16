import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = 3000;
dotenv.config();

app.use(cors());

app.get("/movie/:id", async (req, res) => {
  let movieId = req.params.id;
  let movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  let movie = await findMovie(movieUrl);
  res.send(movie);
});

app.get("/similar/:id", async (req, res) => {
  let movieId = req.params.id;
  let movieUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US`;

  let movie = await findMovie(movieUrl);
  res.send(movie);
});

app.get("/:movieName", async (req, res) => {
  let movieName = req.params.movieName;
  console.log(process.env.DBMOVIE_ACCESS_TOKEN);
  let movieUrl = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
  let movie = await findMovie(movieUrl);
  res.send(movie);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// 47a2597f2250b067286a28869eb80ffc

async function findMovie(movieUrl) {
  const options = {
    method: "GET",
    url: movieUrl,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.DBMOVIE_ACCESS_TOKEN}`,
    },
  };

  return await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
}
