
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var gameLevel = 0;

//start the game when a keyboard key is pressed 
$(document).keydown(function(){
  if (!gameStarted){
    $("#level-title").text("Level" + gameLevel);
    nextSequence();
    gameStarted = true; //trigger
  }
});

//event handler for what happens when a click is done on the button 
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});

//check the answer if user clicked the correct buttton
function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length){
     
      //timeout before the game begins again on new level
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
      //if user selected the wrong button
  } else {

    playSound("wrong");
    // my original idea for the code below, but its not working for some reason 

    // $("body").addClass("game-over").delay(200).removeClass("game-over");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

      //change the heading or h1
    $("#level-title").text("Game over, Press any key to restart");


    startOver();

  }
}
function nextSequence(){
    //empty array savng the users patte for the game
  userClickedPattern = [];
  // game level changes which change the title below 
  gameLevel++;

  $("#level-title").text("Level " + gameLevel);
    // random number generator between 0-3
   var randomNumber = Math.random()*4;
   randomNumber = Math.floor(randomNumber);

   //add random number to game pattern array created at the top of document
   var randomChosenColor = buttonColors[randomNumber];
   gamePattern.push(randomChosenColor);
    //changes the color for 1sec
$("#"+ randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColor);
}


//playing the various sounds,creating a function to make sounds to the website
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
  //animates the buttons by changing the class for 1sec
function animatePress(currentColour){
    $( "#" + currentColour).click(function() {
        $( "#" + currentColour).addClass( "pressed" ).delay(100).removeClass("pressed");
      });
}

//function to start over the game
function startOver(){
  
  gameLevel = 0;
  gamePattern = [];
  gameStarted = false;

}