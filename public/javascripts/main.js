var app1 = angular.module('app1',['ngMessages','ngCookies']);


displayStartMenu = true;
hasCompletedStartMenu = false;

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

app1.controller('setup',function($scope,$rootScope,$http,$cookies){
  $scope.totalHabits = [1,2,3];
  $scope.habitModels = [];
  $scope.diffModels = [];
  $scope.daysModels = [];
  $scope.userHasNotVisited = true;
  $scope.createHabits = function(){
    habitsList = [];
    habitsList.push(addHabit($scope.habitModels[0],$scope.diffModels[0],$scope.daysModels[0]))
    habitsList.push(addHabit($scope.habitModels[1],$scope.diffModels[1],$scope.daysModels[1]))
    habitsList.push(addHabit($scope.habitModels[2],$scope.diffModels[2],$scope.daysModels[2]))

    $cookies.putObject('defaultHabits',habitsList);
    $scope.userHasNotVisited = false;
    hasCompletedStartMenu = true;

    $http({
      method: 'POST',
      url: '/saveHabits',
      data: angular.toJson(habitsList),
      headers: {'Content-type': 'application/json'}
    }).then(function successCallback(response){
    }, function errorCallback(response){;

    });
  }

  if($cookies.getObject(1) != undefined){
    $scope.userHasNotVisited = false;
    hasCompletedStartMenu = true;
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
  currentNum = 1;
  var maxNumberOfWeeks = 36;
  // Fill array with values from 0 -> maxNumberOfWeeks
  $scope.weekOptions = Array.apply(null, {length: maxNumberOfWeeks}).map(Number.call, Number)//new Array(maxNumberOfWeeks);

  $scope.incrementWeek = function(){
    $('#intro').hide();
    $scope.weeksPlayingGame.push(currentNum++);
  }

  $scope.decrementWeek = function(){
    $scope.weeksPlayingGame.pop();
    currentNum--;

  }

  // each time the dropdown is updated this runs
  $scope.updateTotal = function(){
    // TO DO : Has to be a better way to do this than filling an array with the current selected number
    amountOfTablesToDisplay = Array(parseInt($scope.currentSelected));
    amountOfTablesToDisplay.fill(1);
    $scope.weeksPlayingGame = amountOfTablesToDisplay;
  }

  $scope.display = function(){
    return hasCompletedStartMenu;
  }
});
// Example of dependency injection, angularjs sees that we need scope so it injects it
app1.controller('gameCtrl', function($scope, $filter,$cookies){
    $scope.daysOfWeek = ['Mon','Tues','Wed','Thurs','Fri','Sat','Sun'];

    currentController = $scope.weeksPlayingGame.length;
    if ($cookies.getObject(currentController) != undefined){
      $scope.listOfHabits = [$cookies.getObject(currentController)[0],
      $cookies.getObject(currentController)[1],$cookies.getObject(currentController)[2]];
    }
    else{
      if($cookies.getObject('defaultHabits')){
        habitsList[0].habit = $cookies.getObject('defaultHabits')[0].habit;
        habitsList[0].goal = $cookies.getObject('defaultHabits')[0].goal;
        habitsList[0].difficulty = $cookies.getObject('defaultHabits')[0].difficulty;
        habitsList[1].habit = $cookies.getObject('defaultHabits')[1].habit;
        habitsList[1].goal = $cookies.getObject('defaultHabits')[1].goal;
        habitsList[1].difficulty = $cookies.getObject('defaultHabits')[1].difficulty;
        habitsList[2].habit = $cookies.getObject('defaultHabits')[2].habit;
        habitsList[2].goal = $cookies.getObject('defaultHabits')[2].goal;
        habitsList[2].difficulty = $cookies.getObject('defaultHabits')[2].difficulty;
      }
      // need to change the default habits so that when they add a new week that is not in cookies default does show up
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
  }
    $scope.changeState = function(rowIndex,week){
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

    console.log(week);
    $cookies.putObject(week,$scope.listOfHabits);
    console.log($cookies.getObject(week));
    }
});
