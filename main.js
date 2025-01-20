// $(".search-button").on("click", function () {
//   $.ajax({
//     url:
//       "https://www.omdbapi.com/?apikey=95e0ddf&s=" + $(".input-keyword").val(),
//     success: (result) => {
//       const movie = result.Search;
//       let cards = "";
//       movie.forEach((m) => {
//         cards += showCards(m);
//       });
//       $(".movie-container").html(cards);

//       // Ketika detail di click
//       $(".modal-detail").on("click", function () {
//         $.ajax({
//           url:
//             "https://www.omdbapi.com/?apikey=95e0ddf&i=" +
//             $(this).data("imdbid"),
//           success: (m) => {
//             const MoviesDetail = ShowMovieDetail(m);
//             $(".modal-body").html(MoviesDetail);
//           },
//           error: (e) => {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });
// menggunakan fetch
// const searchBtn = document.querySelector(".search-button");
// searchBtn.addEventListener("click", function () {
//   const inputKeyword = document.querySelector(".input-keyword");
//   fetch("https://www.omdbapi.com/?apikey=95e0ddf&s=" + inputKeyword.value).then(
//     (response) =>
//       response.json().then((response) => {
//         const movie = response.Search;
//         let cards = "";
//         movie.forEach((m) => (cards += showCards(m)));
//         const movieContainer = document.querySelector(".movie-container");
//         movieContainer.innerHTML = cards;
//         // when DetailBtn click
//         const detailBtn = document.querySelectorAll(".modal-detail");
//         detailBtn.forEach((btn) => {
//           btn.addEventListener("click", function () {
//             const imdbid = this.dataset.imdbid;
//             fetch("https://www.omdbapi.com/?apikey=95e0ddf&i=" + imdbid)
//               .then((response) => response.json())
//               .then((m) => {
//                 const MoviesDetail = ShowMovieDetail(m);
//                 const modalBody = document.querySelector(".modal-body");
//                 modalBody.innerHTML = MoviesDetail;
//               });
//           });
//         });
//       })
//   );
// });
// fetch  Refactor

const searchBtn = document.querySelector('.search-button')
searchBtn.addEventListener('click', async function () {
  const inputKeyword = document.querySelector('.input-keyword')
  const movie = await getMovie(inputKeyword.value)
  console.log(movie)
  updateUI(movie)
});

// event binding
document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('modal-detail')) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid)
    updateUiDetail(movieDetail)
  }
  // console.log(e.target)
});


function getMovieDetail(imdbID) {
  return fetch("https://www.omdbapi.com/?apikey=95e0ddf&i=" + imdbID)
    .then(response => response.json())
    .then(m => m);

}

function updateUiDetail(m) {
  const MoviesDetail = ShowMovieDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = MoviesDetail;

}

function getMovie(keyword) {
  return fetch("https://www.omdbapi.com/?apikey=95e0ddf&s=" + keyword)
    .then(response => response.json())
    .then(response => response.Search);
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}
// action <!--Maintenance Start-->
function btnStart() {
  alert('This website can still be used, despite maintenance. Thank You')
}

// function untuk menampilkan data 
function showCards(m) {
  return ` <div class="col-md-4 my-3">
          <div class="card">
            <img src="${m.Poster}" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${m.Title}</h5>
              <span class="type">Type: ${m.Type} </span>
              <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
              <a href="#" class="btn btn-primary modal-detail" data-bs-toggle="modal"
             data-bs-target="#MovieDetail" data-imdbid="${m.imdbID}">Details</a>
            </div>
          </div>
        </div>`;
}
function ShowMovieDetail(m) {
  return `<div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <img src="${m.Poster}" class="img-fluid" />
                </div>
                <div class="col-md">
                  <ul class="list-group">
                    <li class="list-group-item">
                      <h4>${m.Title} ${m.Year}</h4>
                    </li>
                    <li class="list-group-item">
                      <strong>Director: </strong> ${m.Director}
                    </li>
                    <li class="list-group-item">
                      <strong>Actors:</strong> ${m.Actors}
                    </li>
                    <li class="list-group-item">
                      <strong>Writer:</strong> ${m.Writer}
                    </li>
                    <li class="list-group-item">
                      <strong>Plot:</strong>${m.Plot}
                    </li>
                  </ul>
                </div>
              </div>
            </div>`;
}
