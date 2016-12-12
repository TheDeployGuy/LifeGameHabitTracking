var app1 = angular.module('app1',[]);

app1.controller('parent',function($scope){

  $scope.weeksPlayingGame = [1];
  $scope.currentSelected = 1;
  var maxNumberOfWeeks = 36;
  // Fill array with values from 0 -> maxNumberOfWeeks
  $scope.weekOptions = Array.apply(null, {length: maxNumberOfWeeks}).map(Number.call, Number)//new Array(maxNumberOfWeeks);
  
  // each time the dropdown is updated this runs
  $scope.updateTotal = function(){
    // TO DO : Has to be a better way to do this than filling an array with the current selected number
    amountOfTablesToDisplay = Array(parseInt($scope.currentSelected));
    amountOfTablesToDisplay.fill(1);
    $scope.weeksPlayingGame = amountOfTablesToDisplay;
  }
});
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
      var completedDays = $filter("filter")($scope.listOfHabits[rowIndex].isDone, true).length;
      var habit = $scope.listOfHabits[rowIndex];

      var currentScore = completedDays * habit.difficulty;
      habit.current = currentScore;

      var maxScore = habit.difficulty*7;
      if (currentScore >= habit.goal){
        if (currentScore == maxScore)
          habit.color = 'gold';
        else
          habit.color = 'green';
      }
      else{
        habit.color = '';
      }
    }
});
