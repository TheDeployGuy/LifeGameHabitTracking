var app1 = angular.module('app1',[]);

// Example of dependency injection, angularjs sees that we need scope so it injects it
app1.controller('gameCtrl', function($scope, $filter){

    $scope.daysOfWeek = ['Mon','Tues','Wed','Thurs','Fri','Sat','Sun'];
    $scope.listOfHabits = [
      {
        habit:'Wakup at sunrise',
        isDone: [false,false,false,false,false],
        goal:15,
        current: 0,
        difficulty: 5,
        color: ''
      },
      {
        habit:'Work on side project',
        isDone: [false,false,false,false,false],
        goal:12,
        current: 0,
        difficulty: 3,
        color: ''
      },
      {
        habit:'Go into the office',
        isDone: [false,false,false,false,false],
        goal:15,
        current: 0,
        difficulty: 5,
        color: ''
      }
    ];

    $scope.changeState = function(rowIndex){
      var done = $filter("filter")($scope.listOfHabits[rowIndex].isDone, true);
      $scope.listOfHabits[rowIndex].current = done.length *  $scope.listOfHabits[rowIndex].difficulty;
      if ($scope.listOfHabits[rowIndex].current >= $scope.listOfHabits[rowIndex].goal){
        if ($scope.listOfHabits[rowIndex].current == $scope.listOfHabits[rowIndex].difficulty*7)
          $scope.listOfHabits[rowIndex].color = 'gold';
        else
          $scope.listOfHabits[rowIndex].color = 'green';
      }
      else{
        $scope.listOfHabits[rowIndex].color = '';
      }
    }

    $scope.weeksPlayingGame = [1];
    $scope.updateTotal = function(){
      emptyArray = Array(parseInt($scope.num));
      emptyArray.fill(1);
      $scope.weeksPlayingGame = emptyArray;
    }
});
