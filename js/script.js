// TMDB
const API_KEY = "api_key=d89f7b73bbeda5fbfabb118ebb31a69c";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL =
  BASE_URL +
  "/discover/movie?sort_by=popularity.desc&" +
  API_KEY +
  "&sort_by=popularity.desc";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;

const thumbnail = document.getElementById("thumbnail");
const thumbnail2 = document.getElementById("thumbnail2");
const form = document.getElementById("form");
const search = document.getElementById("search");

const getMovies = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showTrending(data.results.slice(0, 10));
      showMovie(data.results);
      console.log(data.results.slice(0, 10));
    });
};

const hero = document.getElementById("hero");

const showDesc = (title, overview, vote_average, poster_path) => {
  hero.style.backgroundImage =
    "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgb(0, 0, 0)), url('" +
    IMG_URL +
    poster_path +
    "')";
  hero.style.display = "block";
  document.getElementById("hero-title").innerHTML = `
  <h1>${title}</h1>
  <p>Rating: ${vote_average} / 10</p><br>
  <p>
  ${overview}
  </p>
  `;
};

const showTrending = (data) => {
  thumbnail.innerHTML = "";
  data.forEach((movie) => {
    const { title, overview, vote_average, poster_path } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("thumbnail");
    movieElement.setAttribute("id", "thumbnail");
    movieElement.innerHTML = `
            <a href="#hero">
                <div class="thumbnail-img">
                    <img src="${IMG_URL + poster_path}" alt="${title}" />
                    <h3>${title}</h3>
                    <p>
                        ${overview.split(".").slice(0, 1)} ...
                    </p>
                </div>
            </a>
        `;
    thumbnail.appendChild(movieElement);
  });
};

const showMovie = (data) => {
  thumbnail2.innerHTML = "";
  data.forEach((movie, i) => {
    const { title, overview, vote_average, poster_path } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("thumbnail2-item");
    movieElement.setAttribute("id", "thumbnail2-item");
    movieElement.innerHTML = `
            <a href="#hero" onclick="${showDesc(
              title,
              overview,
              vote_average,
              poster_path
            )}">
                <div class="thumbnail-img">
                    <img src="${IMG_URL + poster_path}" alt="${title}" />
                    <h3>${title}</h3>
                    <p>
                        ${overview.split(".").slice(0, 1)} ...
                    </p>
                </div>
            </a>
        `;
    thumbnail2.appendChild(movieElement);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCH_URL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});

getMovies(API_URL);

const arrows = document.querySelectorAll(".arrow");
const thumbnails = document.querySelectorAll(".thumbnail");

arrows.forEach((arrow, i) => {
  // const itemNumber = thumbnails[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    clickCounter++;
    if (clickCounter < 9) {
      thumbnails[i].style.transform = `translateX(${
        thumbnails[i].computedStyleMap().get("transform")[0].x.value - 270
      }px)`;
    } else {
      thumbnails[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });
});
