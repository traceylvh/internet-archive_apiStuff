myApp.controller("AddController", ["$scope", "$http", "MovieService", function($scope, $http, MovieService){
    $scope.movies = {};
    $scope.data = [];

    $scope.search = function(data){
      console.log("We are going to go look for ", data);
      // $http.get("http://www.omdbapi.com/?t=" + data.name + "&y=&plot=full&r=json").then(function(response){
      $http.get("https://archive.org/advancedsearch.php?q=" + data.name + "&fl%5B%5D=creator&fl%5B%5D=description&fl%5B%5D=format&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=10&page=1&output=json&callback=callback&save=yes#raw").then(function(response){
        //use Allow-Control-Allow-Origin extension for chrome 

          console.log(response.data);
          $scope.data = [];
          $scope.data.push(response.data);
      });
    };

    $scope.addMovie = function(data){
        console.log(data);

        var postObject = {};
        postObject.Title = data.Title;
        postObject.Runtime = data.Runtime;
        postObject.Rated = data.Rated;
        postObject.Actors = data.Actors;
        postObject.Plot = data.Plot;

        MovieService.postMovie(postObject);
    };
}]);

myApp.controller("ShowController", ["$scope", "MovieService", function($scope, MovieService){
    MovieService.getMovies();

    $scope.data = MovieService.data;
}]);
