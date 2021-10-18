const movieDesc = document.getElementById("movie");
export const showDesc = (title, overview, vote_average, poster_path) => {
  const title2 = title;
  const overview2 = overview;
  const vote_average2 = vote_average;
  const poster_path2 = poster_path;
};

showDesc2(title2, overview2, vote_average2, poster_path2);

const showDesc2 = (title, overview, vote_average, poster_path) => {
  movieDesc.innerHTML = "";
  const movieElement = document.createElement("div");
  movieElement.classList.add("movie-title");
  movieElement.setAttribute("id", "movie-title");
  movieElement.innerHTML = `
                <h1>${title}</h1>
                <p>Rating: ${vote_average}/10</p>
                <p>
                  ${overview}
                </p>
            `;
  movieDesc.appendChild(movieElement);
};
