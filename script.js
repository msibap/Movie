"use strict";

const API_URL = "https://imdb-api.com";
const TOP250_URL = API_URL + "/en/API/Top250Movies/k_rd431iza";
const POPULAR_URL = API_URL + "/en/API/MostPopularMovies/k_rd431iza";
const SEARCH_API = API_URL + "/en/API/SearchMovie/k_rd431iza/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const cover = document.getElementById("cover");
// const searchBtn = document.getElementById("search-btn");

let requestOptions = {
  method: "GET",
  redirect: "follow",
};

getMovie(POPULAR_URL);

async function getMovie(url) {
  let response = await fetch(url, requestOptions);
  let data = await response.json();

  if (data.items) {
    showMovies(data.items);
  } else {
    showMovies(data.results);
  }
}

// FOR SEARCHING MOVIES
// async function searchMovie(url) {
//   let response = await fetch(url, requestOptions);
//   let data = await response.json();

//   showMovies(data.results);
// }

function showMovies(movies) {
  // Clearing the page
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { crew, fullTitle, imDbRating, image, title, year, description } =
      movie;

    const movieElement = document.createElement("div");
    movieElement.classList.add("card");

    if (year) {
      movieElement.innerHTML = `<img src="${image}" alt="test" srcset="" class="card__image" /><div class="card__rate"> ${imDbRating} </div><div class="card__name"> ${
        title + " (" + year + ")"
      } </div>`;
    } else {
      movieElement.innerHTML = `<img src="${image}" alt="test" srcset="" class="card__image" /><div class="card__name"> ${
        title + " " + description
      } </div>`;
    }

    main.appendChild(movieElement);
  });
}

form.addEventListener("submit", function (event) {
  // Doesn't submit to the page
  event.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovie(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});
