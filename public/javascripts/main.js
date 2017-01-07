var app1 = angular.module('app1',['ngMessages']);


displayTable = false;
displayStartMenu = true;

habitsList = [{
  habit: 'Default',
  difficulty: 0,
  goal: 0
},{
  habit: 'Default',
  difficulty: 0,
  goal: 0
},{
  habit: 'Default',
  difficulty: 0,
  goal: 0
}];

app1.controller('setup',function($scope,$rootScope,$http){
  $scope.totalHabits = [1,2,3];
  $scope.habitModels = [];
  $scope.diffModels = [];
  $scope.daysModels = [];
  console.log($scope.habitModels);
  $scope.displayStartMenu = true;
  $scope.createHabits = function(){
    habitsList = [];
    habitsList.push(addHabit($scope.habitModels[0],$scope.diffModels[0],$scope.daysModels[0]))
    habitsList.push(addHabit($scope.habitModels[1],$scope.diffModels[1],$scope.daysModels[1]))
    habitsList.push(addHabit($scope.habitModels[2],$scope.diffModels[2],$scope.daysModels[2]))
    displayTable = true;
    $scope.displayStartMenu = false;

    $http({
      method: 'POST',
      url: '/saveHabits',
      data: angular.toJson(habitsList),
      headers: {'Content-type': 'application/json'}
    }).then(function successCallback(response){
    }, function errorCallback(response){;

    });
  }

  function addHabit(habit,difficulty,daysAWeek){
    return {
      habit: habit,
      goal: parseInt(difficulty) * parseInt(daysAWeek),
      difficulty: difficulty,
    }
  }
});

app1.controller('parent',function($scope){

  var initialIncrement = 0;
  $scope.weeksPlayingGame = [];
  $scope.currentSelected = 0;
  var maxNumberOfWeeks = 36;
  // Fill array with values from 0 -> maxNumberOfWeeks
  $scope.weekOptions = Array.apply(null, {length: maxNumberOfWeeks}).map(Number.call, Number)//new Array(maxNumberOfWeeks);

  $scope.incrementWeek = function(){
    $('#intro').hide();
    $scope.weeksPlayingGame.push(1);
  }

  $scope.decrementWeek = function(){
    $scope.weeksPlayingGame.pop();

  }

  // each time the dropdown is updated this runs
  $scope.updateTotal = function(){
    // TO DO : Has to be a better way to do this than filling an array with the current selected number
    amountOfTablesToDisplay = Array(parseInt($scope.currentSelected));
    amountOfTablesToDisplay.fill(1);
    $scope.weeksPlayingGame = amountOfTablesToDisplay;
  }

  $scope.isVisible = function(){
    return displayTable;
  }
});
// Example of dependency injection, angularjs sees that we need scope so it injects it
app1.controller('gameCtrl', function($scope, $filter){
    $scope.daysOfWeek = ['Mon','Tues','Wed','Thurs','Fri','Sat','Sun'];
    $scope.listOfHabits = [
      {
        habit: habitsList[0].habit,
        isDone: [false,false,false,false,false],
        goal: habitsList[0].goal,
        current: 0,
        difficulty: habitsList[0].difficulty,
        color: ''
      },
      {
        habit: habitsList[1].habit,
        isDone: [false,false,false,false,false],
        goal: habitsList[1].goal,
        current: 0,
        difficulty: habitsList[1].difficulty,
        color: ''
      },
      {
        habit: habitsList[2].habit,
        isDone: [false,false,false,false,false],
        goal: habitsList[2].goal,
        current: 0,
        difficulty: habitsList[2].difficulty,
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
