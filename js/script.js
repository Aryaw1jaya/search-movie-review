function searchMovies() {
  $("#movie-list").html("");
  $.ajax({
    url: "http://www.omdbapi.com/",
    type: "get",
    dataType: "json",
    data: {
      apikey: "2d92dcaa",
      s: $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;

        $.each(movies, function (i, data) {
          $("#movie-list").append(
            `
          <div class="col-md-3 mb-2">
              <div class="card">
                  <img src="` +
              data.Poster +
              `" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">` +
              data.Title +
              `</h5>
                    <p class="card-text">` +
              data.Year +
              `</p>
                    <a href="#" id="see-details" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+data.imdbID+`">See Details</a>
                  </div>
              </div>
          </div>
                  `
          );
        });

        $("#search-input").val("");
      } else {
        $("#movie-list").html(
          `
                  <h1 class="text-center">` +
            result.Error +
            `</h1>
              `
        );
      }
    },
  });
};

$("#search-button").on("click", function () {
  searchMovies();
});

$("#search-input").on("keyup", function(e) {
  if (e.which === 13) {
    searchMovies();
  }
});

$('#movie-list').on('click', '#see-details', function() {
  $.ajax({
    url: "http://www.omdbapi.com/",
    type: "get",
    dataType: "json",
    data: {
      apikey: "2d92dcaa",
      i: $(this).data('id'),
    },
    success: function (movie) {
      if ( movie.Response === "True"){
        $('.modal-title').html(movie.Title)
        $('.modal-body').html(`
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                  <img src="`+movie.Poster+`" width="100%">
              </div>
              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item">Title : `+ movie.Title+`</li>
                  <li class="list-group-item">Release year : `+ movie.Released+`</li>
                  <li class="list-group-item">Genre : `+ movie.Genre+`</li>
                  <li class="list-group-item">Genre : `+ movie.Actors+`</li>
                  <li class="list-group-item">Director : `+ movie.Director+`</li>
                  <li class="list-group-item">IMDB Ratings : `+ movie.Ratings[0].Value+`</li>
                </ul>
              </div>
            </div>
          </div>
        `);
      }
    }
  });
});