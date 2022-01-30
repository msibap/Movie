const API_URL = "https://imdb-api.com";
const TOP250_URL = API_URL + "/en/API/Top250Movies/k_rd431iza";
const POPULAR_URL = API_URL + "/en/API/MostPopularMovies/k_rd431iza";

// getMovie(POPULAR_URL);

async function getMovie(url) {
  let response = await fetch(url);
  let data = await response.json();

  console.log(data);
}
