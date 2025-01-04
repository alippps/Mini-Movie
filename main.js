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
// menggunakan fetxh
const searchBtn = document.querySelector(".search-button");
searchBtn.addEventListener("click", function () {
  const inputKeyword = document.querySelector(".input-keyword");
  fetch("http://www.omdbapi.com/?apikey=95e0ddf&s=" + inputKeyword.value).then(
    (response) =>
      response.json().then((response) => {
        const movie = response.Search;
        let cards = "";
        movie.forEach((m) => (cards += showCards(m)));
        const movieContainer = document.querySelector(".movie-container");
        movieContainer.innerHTML = cards;
        // when DetailBtn click
        const detailBtn = document.querySelectorAll(".modal-detail");
        detailBtn.forEach((btn) => {
          btn.addEventListener("click", function () {
            const imdbid = this.dataset.imdbid;
            fetch("https://www.omdbapi.com/?apikey=95e0ddf&i=" + imdbid)
              .then((response) => response.json())
              .then((m) => {
                const MoviesDetail = ShowMovieDetail(m);
                const modalBody = document.querySelector(".modal-body");
                modalBody.innerHTML = MoviesDetail;
              });
          });
        });
      })
  );
});

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
