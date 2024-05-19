// Game variables
var gamePattern = [];
var userPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var startGame = false;

// Start the game on keypress
function startGameHandler() {
    if (!startGame) {
        nextSequence();
        startGame = true;
    }
}
$(document).keypress(startGameHandler);
$(document).on("touchstart", startGameHandler);


// Handle button clicks
$(".btn").on("click touchstart", function () {
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
   
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userPattern.length - 1);
});

// Generate the next sequence
function nextSequence() {
    // Reset user pattern for the new level
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    // Choose a random color and add to the game pattern
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Animate the chosen button and play its sound
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

// Play sound for the given color
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animate the button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Check the user's answer against the game pattern
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        // Check if the user has completed the sequence
        if (userPattern.length === gamePattern.length) {
            // Proceed to the next sequence after a delay
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

// Handle game over scenario
function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    // Reset the game variables
    level = 0;
    gamePattern = [];
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startGame = false;
}
