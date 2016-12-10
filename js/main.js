var app1 = angular.module('app1',[]);

// Example of dependency injection, angularjs sees that we need scope so it injects it
app1.controller('gameCtrl', function($scope, $filter){

    $scope.daysOfWeek = ['Mon','Tues','Wed','Thurs','Fri'];
    $scope.listOfHabits = [
      {
        habit:'Wakup at sunrise',
        isDone: [false,false,false,false,false],
        max:15,
        current: 0,
        difficulty: 5
      },
      {
        habit:'Work on side project',
        isDone: [false,false,false,false,false],
        max:12,
        current: 0,
        difficulty: 3
      },
      {
        habit:'Go into the office',
        isDone: [false,false,false,false,false],
        max:15,
        current: 0,
        difficulty: 5
      }
    ];

    $scope.changeState = function(rowIndex){
      console.log(rowIndex);
      var done = $filter("filter")($scope.listOfHabits[rowIndex].isDone, true);
      $scope.listOfHabits[rowIndex].current = done.length *  $scope.listOfHabits[rowIndex].difficulty;
    }

    $scope.weeksPlayingGame = [1];
    $scope.updateTotal = function(){
      emptyArray = Array(parseInt($scope.num));
      emptyArray.fill(1);
      $scope.weeksPlayingGame = emptyArray;
    }
});
