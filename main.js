const searchBtn = document.querySelector('.search-button')
searchBtn.addEventListener('click', async function () {
  try {
    const inputKeyword = document.querySelector('.input-keyword')
    const movie = await getMovie(inputKeyword.value)
    console.log(movie)
    updateUI(movie)
  } catch (err) {
    alert(err)
  }
});


function updateUiDetail(m) {
  const MoviesDetail = ShowMovieDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = MoviesDetail;

}

function getMovie(keyword) {
  return fetch("https://www.omdbapi.com/?apikey=95e0ddf&s=" + keyword)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then(response => {
      if (response.Response === 'FAILED') {
        throw new Error(response.Error)
      }
      return response.Search
      // console.log(response)
    });
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

// event binding
document.addEventListener('click', async function (e) {
  try {
    if (e.target.classList.contains('modal-detail')) {

      const imdbid = e.target.dataset.imdbid;
      const movieDetail = await getMovieDetail(imdbid)
      updateUiDetail(movieDetail)
    }
  } catch (err) {
    alert("EROR:DataBase", err)
  }
  // console.log(e.target)
});


function getMovieDetail(imdbID) {
  return fetch("https://www.omdbapi.com/?apikey=95e0ddf&i=" + imdbID)
    .then(response => {
      if (!response.ok) {
        throw new Eror(response.statusText)
      }
      return response.json()
    })
    .then(m => {
      if (m.Response === 'FAILED') {
        throw new Eror(response.Eror)
      }
      return m
    });

}


// // action <!--Maintenance Start-->
// function btnStart() {
//   alert('This website can still be used, despite maintenance. Thank You')
// }

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
