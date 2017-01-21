var app1 = angular.module('app1',['ngMessages','ngCookies']);

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

// console.log($('.intro').css('background','url(../img/intro-bg3.jpg) no-repeat bottom center scroll'))

// I know this is a bad function name will refactor...
function hideIntroMenuAndShowLoggedInMenu(){
  $('#aboutNav').hide();
  $('#resetButton').css('display','block');
  $('#start').hide();
}

app1.controller('navigation', function($scope,$cookies,$window){
  $scope.resetHabits = function(){
    $cookies.remove("defaultHabits");
    $cookies.remove("totalWeeksTracked");
    var cookies = $cookies.getAll();
    angular.forEach(cookies, function (v, k) {
        $cookies.remove(k);
    });
    $window.location.reload();
  }
});

app1.controller('tutorial', function($scope,$cookies){
  // TODO: Find a more angular way to do this
    $scope.hasEnteredHabits = function(){
      return hasCompletedStartMenu;
    }
});

app1.controller('setup', function($scope,$rootScope,$cookies){
  $scope.totalHabits = [1,2,3];
  $scope.habitModels = [];
  $scope.diffModels = [];
  $scope.daysModels = [];

  if($cookies.getObject('defaultHabits')){
    hasCompletedStartMenu = true;
  }

  $scope.createHabits = function(){
    habitsList = [];
    for(var i=0;i<3;i++)
      habitsList.push(addHabit($scope.habitModels[i],$scope.diffModels[i],$scope.daysModels[i]))

    $cookies.putObject('defaultHabits',habitsList);
    hasCompletedStartMenu = true;

    hideIntroMenuAndShowLoggedInMenu();
  }

  function addHabit(habit,difficulty,daysAWeek){
    return {
      habit: habit,
      goal: parseInt(difficulty) * parseInt(daysAWeek),
      difficulty: difficulty,
    }
  }

  // TODO: Find a more angular way to do this
    $scope.hasEnteredHabits = function(){
      return hasCompletedStartMenu;
    }

});

app1.controller('parent',function($scope,$cookies){
  var currentNum = 1;
  $scope.weeksPlayingGame = [];

  if($cookies.getObject('defaultHabits')){
    hideIntroMenuAndShowLoggedInMenu();
  }

  $scope.incrementWeek = function(){
    $('#intro').hide();
    $cookies.putObject('totalWeeksTracked',currentNum);
    $scope.weeksPlayingGame.push(currentNum++);
  }

  $scope.decrementWeek = function(){
    $scope.weeksPlayingGame.pop();
    currentNum--;
    currentWeek = parseInt($cookies.getObject('totalWeeksTracked')) - 1;
    if(currentWeek >= 0)
      $cookies.putObject('totalWeeksTracked',currentWeek);
  }

  if($cookies.getObject('totalWeeksTracked')){
    var totalWeeksTracked = parseInt($cookies.getObject('totalWeeksTracked'));
    for(var i=0;i<totalWeeksTracked;i++){
      $scope.incrementWeek();
    }
  }

// TODO: Find a more angular way to do this
  $scope.hasEnteredHabits = function(){
    return hasCompletedStartMenu;
  }
});

var counter = 1;
app1.controller('gameCtrl', function($scope, $filter, $cookies){
    $scope.daysOfWeek = ['Mon','Tues','Wed','Thurs','Fri','Sat','Sun'];
    currentController = $scope.weeksPlayingGame.length;

    if ($cookies.getObject(counter)){
      $scope.listOfHabits = [$cookies.getObject(counter)[0],
      $cookies.getObject(counter)[1],$cookies.getObject(counter)[2]];
    }
    else{
      if($cookies.getObject('defaultHabits')){
        for(var i = 0;i<3;i++){
          habitsList[i].habit = $cookies.getObject('defaultHabits')[i].habit;
          habitsList[i].goal = $cookies.getObject('defaultHabits')[i].goal;
          habitsList[i].difficulty = $cookies.getObject('defaultHabits')[i].difficulty;
        }
      }

      $scope.listOfHabits = []
      for(var i = 0;i<3;i++){
        $scope.listOfHabits.push({
          habit: habitsList[i].habit,
          isDone: [false,false,false,false,false],
          goal: habitsList[i].goal,
          current: 0,
          difficulty: habitsList[i].difficulty,
          color: ''
        });
      }
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

    $cookies.putObject(week,$scope.listOfHabits);
    }
    counter++;
});
