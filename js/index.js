// SPEED SLIDER //
// variables
var slider = document.getElementById("speed-slider");
var output = document.getElementById("speed");
var speed = slider.value;


// display slider value next to 'speed:'
output.innerHTML = slider.value;

slider.oninput = function() {
	output.innerHTML = this.value;
};


// DOTS //
// dot size randomizer function
function randomDot(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

// dot generator
function generateDot() {
	var speed = slider.value;
  var dotSize = randomDot(10, 100); 
  var position = randomDot(10, $(".game-field").width() - 100); // placement randomizer function avoiding dots hanging off edges
	var fallTime = 575 / speed * 1000; // screen height divided by value from slider multiplied by 1000 for ms
	var dot = $("<div></div>", {
		class: "dot",
		style: "width:" + dotSize + "px; height:" + dotSize + "px; left:" + position + "px; animation-duration:" + fallTime + "ms;"
	});
	console.log(speed);

	// Put dots in game field
	$(".game-field").append(dot);
  
  // Remove dots from DOM after animation completes
	dot.one(
		"webkitAnimationEnd oAnimationEnd msAnimationEnd animationend",
		function(event) {
			$(this).remove();
		}
	);
}


// GAME FUNCTIONS //
//variables
var score = 0;

// dot click function + add score based on dot size
$(document).on("click", ".dot", function() {
	if ($(this).width() >= 10 && $(this).width() <= 30) {
		console.log("10 points");
		$(".score").html((score += 10));
	} else if ($(this).width() >= 31 && $(this).width() <= 50) {
		console.log("7 points");
		$(".score").html((score += 7));
	} else if ($(this).width() >= 51 && $(this).width() <= 75) {
		console.log("4 points");
		$(".score").html((score += 5));
	} else if ($(this).width() >= 76 && $(this).width() <= 100) {
		console.log("1 point");
		$(".score").html((score += 1));
	}
  
  var dotPop = $(this);
	// pop/fade animation
	$(dotPop).addClass('pop');
  $(dotPop).prop('disabled', false);

  // timeout for pop/fade animation then remove from DOM
  setTimeout(function() { 
    $(dotPop).remove();
    $(dotPop).prop('disabled', true);
  }, 200);

});


// START/PAUSE FUNCTIONS //
//variables
var runGame;
var i;

// start game - run dot creation loop (1 dot per second) + make dots fall
$("#start-btn, #initialize-game").on("click", function() {
	runGame = setInterval(function() {
		for (i = 0; i < 1; i++) {
			generateDot();
			$(".dot").addClass("inplay");
		}
	}, 1000);
  
  $("#start-btn").addClass('btn-state-inactive');
  $("#pause-btn").removeClass('btn-state-inactive');
  
	// remove paused state styles
	$(".game-field").removeClass("paused");
});

// Pause game
$("#pause-btn").on("click", function() {
	clearInterval(runGame);
	$(".dot").removeClass("inplay");
	$(".game-field").addClass("paused");

	$(this).removeClass("active");
  $("#start-btn").removeClass('btn-state-inactive');
  $("#pause-btn").addClass('btn-state-inactive');
});

