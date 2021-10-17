// TMDB
const API_KEY = "api_key=d89f7b73bbeda5fbfabb118ebb31a69c";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL =
  BASE_URL +
  "/discover/movie?sort_by=popularity.desc&" +
  API_KEY +
  "&sort_by=popularity.desc";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY + "&query=";

const thumbnail = document.getElementById("thumbnail");

const getMovies = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovie(data.results.slice(0, 10));
      console.log(data.results.slice(0, 10));
    });
};

const showMovie = (data) => {
  thumbnail.innerHTML = "";
  data.forEach((movie) => {
    const { title, overview, vote_average, poster_path } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("thumbnail");
    movieElement.innerHTML = `
            <a href="#trending">
                <div class="thumbnail-img">
                    <img src="${IMG_URL + poster_path}" alt="${title}" />
                    <h3>${title}</h3>
                    <p>
                        ${overview}
                    </p>
                </div>
            </a>
        `;
    thumbnail.appendChild(movieElement);
  });
};

getMovies(API_URL);

const arrows = document.querySelectorAll(".arrow");
const thumbnails = document.querySelectorAll(".thumbnail");

arrows.forEach((arrow, i) => {
  const itemNumber = thumbnails[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    clickCounter++;
    if (clickCounter <= itemNumber) {
      thumbnails[i].style.transform = `translateX(${
        thumbnails[i].computedStyleMap().get("transform")[0].x.value - 270
      }px)`;
    } else {
      thumbnails[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });
});
