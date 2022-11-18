var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

let level = 0;

let highScore=0;

let started=false;

let reset=false;

let userClickedPattern = [];

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  //console.log(userClickedPattern);
});

function playSound(name){
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  },100);
}
//random number function 
function nextSequence() {
  userClickedPattern = [];
  if(level>=highScore && !reset){
    highScore++;
  }
  if(reset==true){
    highScore=2;
    reset=false;
  }
  level++;
  $("h1").html("Level "+level);
  $("h3").html("High-Score: "+highScore);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(document).keypress(function(){
  if(!started){
    $("h1").html("Level"+level);
    nextSequence();
    started=true;
  }
});
// $("h1").html("Level 0");

function startOver(){
  if(reset==true){
    highScore=2;
    reset=false;
  }
  level=0;
  gamePattern=[];
  started=false;
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length==gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    $("h1").html("Game Over, Press A to Restart");
    $("h3").html("High-Score: "+highScore+" Do you want to reset the High-Score then press q");
    startOver();
    console.log("fail");
  }
}

function restartGameComplete(){
  highScore=0;
  startOver();
}
//keyevent
document.addEventListener("keypress",function (event) {
  makeSound(event.key);

  animatePress(event.key);
})

//makesound
function makeSound(key){
  switch (key) {

      case "w":
          playSound("blue");
          animatePress("blue");
          userClickedPattern.push("blue");
          checkAnswer(userClickedPattern.length-1);
          break;
      case "t":
          playSound("green");
          animatePress("green");
          userClickedPattern.push("green");
          checkAnswer(userClickedPattern.length-1);
          break;
      case "s":
          playSound("red");
          animatePress("red");
          userClickedPattern.push("red");
          checkAnswer(userClickedPattern.length-1);
          break;
      case "d":
          playSound("yellow");
          animatePress("yellow");
          userClickedPattern.push("yellow");
          checkAnswer(userClickedPattern.length-1);
          break;
      case "a":
        break;
      case "r":
        startOver();
        break;
      case "q":
        reset=true;
        break;
      default: 
          var wg = new Audio("sounds/wrong.mp3");
          wg.play();
          $("h1").html("Press Right Key");
          $("h1").html("Level "+level);
          console.log("fail");
          break;
  }
}

