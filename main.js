$(".search-button").on("click", function () {
  $.ajax({
    url:
      "http://www.omdbapi.com/?apikey=95e0ddf&s=" + $(".input-keyword").val(),
    success: (result) => {
      const movie = result.Search;
      let cards = "";
      movie.forEach((m) => {
        cards += showcards(m);
      });
      $(".movie-container").html(cards);
      // Ketika detail di click
      $(".modal-detail").on("click", function () {
        $.ajax({
          url:
            "http://www.omdbapi.com/?apikey=95e0ddf&i=" +
            $(this).data("imdbid"),
          success: (m) => {
            const MoviesDetail = ShowMovieDetail(m);
            $(".modal-body").html(MoviesDetail);
          },
          error: (err) => {
            console.log(err.responseText);
          },
        });
      });
    },
    error: (err) => {
      console.log(err.responseText);
    },
  });
});

function showcards(m) {
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
