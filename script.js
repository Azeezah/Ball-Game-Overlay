//some ideas:
//make bounce by growing and shrinking
//make shine with radial gradients
//make disappear by opening a hole/whirlpool and dropping the ball through
//make a play button on my webpage, incorporating my logo
//make an "I'm bored" button (or other text)

var ball = {
	id : "ball",
	friction : 0,
	acceleration : 0,
	velocity : 0,  //in px/frame
	maxVelocity : 3,
	direction : 0,  //slope
	//direction_delta = 0;
	//maybe use angles instead of slope to simplify
	framerate : 30,  //30 per second 
	y:0,
	x:0,
	setCoords : function(x, y){
		$('#'+this.id).css({'left':x+'px', 'top':y+'px'});
	},
	animate : function(){
		setInterval(function () {
				//is there any way to use avoid using "ball." or "this." in this part?
				ball.velocity += ball.acceleration - ball.friction;
				ball.y += ball.velocity * Math.sin(Math.atan(ball.direction));
				ball.x += ball.velocity * Math.cos(Math.atan(ball.direction));
				ball.setCoords(ball.x, ball.y);

				detectEndgame(ball);
			}, 
			1000/this.framerate		//I can use 'this' in tis part, but not in the above function
		);
	}
};

function detectEndgame(ball){
	// if(ball.x == $('.barrier').offset().left && bar.bottom < ball.y < bar.top){

	// }
	//if ball reaches rightside, release balloons

	//if collision or ball off screen, endgame

}

function endGame(){
	$('#ball').animate({'height':0, 'width':0}, 300,
	function(){	
	$('.barrier').animate({'height': '0%', 'width':'0%'}, 500, 
	function(){
	$('#background').removeClass('layer');
	});});
}

function startGame(){
	$('#background').addClass('layer');
	$('.barrier').animate({'height': '65%', 'width':'10%'}, 750);
	$('#ball').animate({'height':50, 'width':50}, 750);

	$('#'+ball.id).mouseover(function(e){
		xCoordMouseOnBall = e.clientX - (ball.x+25);  //ball radius = 25
		yCoordMouseOnBall = e.clientY - (ball.y+25);
		ball.direction = yCoordMouseOnBall / xCoordMouseOnBall;
		ball.velocity = ball.maxVelocity * ((xCoordMouseOnBall < 0) ? 1 : -1);
	});
	ball.animate();
	//on loss or ball leaves screen: 
	//	remove background and barriers
}

$(document).ready(startGame);