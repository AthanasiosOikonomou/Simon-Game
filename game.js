var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;
var newChanges = 'Hello from the other side ';

$(document).keydown(function(){
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    };
});

$(".btn").click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});

function nextSequence(){
    userClickedPattern = [];
    level ++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
};

function playSound(name){
    let selectedSong = `sounds/${name}.mp3`;
    var audio = new Audio(selectedSong);
    audio.play();
};

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {$("#"+currentColour).removeClass("pressed");}, 100);
};

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(() =>{ nextSequence(); }, 1000);
        }

    } else  {
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong")
        setTimeout(() => {$("body").removeClass("game-over");}, 200);
        startOver()
    };
};

function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
};
