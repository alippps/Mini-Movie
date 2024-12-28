$(".search-button").on("click", function () {
  $.ajax({
    url:
      "http://www.omdbapi.com/?apikey=95e0ddf&s=" + $(".input-keyword").val(),
    success: (result) => {
      if (result.Response === "True") {
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
      } else {
        $(".movie-container").html("<h2>Movie not found</h2>");
      }
    },
    error: (err) => {
      console.log(err.responseText);
      $(".movie-container").html("<h2>Error: " + err.responseText + "</h2>");
    },
  });
});
