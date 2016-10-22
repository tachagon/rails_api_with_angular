var app = angular.module('raffleApp', ['ngResource']);

app.factory('Entry', ["$resource", function ($resource) {
  return $resource("http://localhost:3000/entries/:id", {id: "@id"}, {update: {method: "PUT"}});
}]);


app.controller('RaffleCtrl', ["$scope", "Entry", function ($scope, Entry) {

  $scope.entries = Entry.query();

  $scope.addEntry = function () {
    var entry = Entry.save($scope.newEntry)
    $scope.entries.push(entry);
    $scope.newEntry = {};
  };

  $scope.drawWinner = function () {
    var pool = [];
    angular.forEach($scope.entries, function (entry) {
      if (!entry.winner) {
        pool.push(entry);
      }
    });
    if (pool.length > 0) {
      var entry = pool[Math.floor(Math.random()*pool.length)];
      entry.winner = true;
      // Entry.update(entry);
      entry.$update();
      $scope.lastWinner = entry;
    }
  };

}]);
