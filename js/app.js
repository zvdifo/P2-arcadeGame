// Enemies our player must avoid *
var Enemy = function(initialX,initialY,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x = initialX;
	this.y = initialY;
	this.speed = Math.floor((Math.random()*5 + 1))*60;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';	
}

// Update the enemy's position, required method for game *
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.speed*dt;	
	if (this.x > 500){
		this.x = -60;
		this.speed = Math.floor((Math.random()*5 + 1))*60;
	}
}

// Draw the enemy on the screen, required method for game *
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var playerInitialX = 200;
var playerInitialY = 400;

// initiates the Player.
var Player = function(){
	this.x = playerInitialX;
	this.y = playerInitialY;
	this.sprite = 'images/char-horn-girl.png';
	this.speed = 100;
}

//empty, what really works is the handleInput methods.*
Player.prototype.update = function(dt) {	
}

//Draw the player on the screen, required method for game *
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


//handleInput for player,responsing for keyboard movements.*
Player.prototype.handleInput = function(keyCode) {
	if ( keyCode === 'left'){
		if (this.x > 0){
			this.x -= 100;			
		}
	}
	else if ( keyCode === 'right'){
		if (this.x < 400){
			this.x += 100;
		}
	}
	else if ( keyCode === 'up'){
		if(this.y > 0){
			this.y -= 80;			
		}
		player.resetPlayer();
	}
	else {
		if(this.y < 400){
			this.y += 80;				
		}
	}	
}

//reset player if reach the river.*
Player.prototype.resetPlayer = function(){
	if (this.y < 80){
		this.x = playerInitialX;
        this.y = playerInitialY;
	}	
}

//check collisions.*
Player.prototype.checkCollisions = function() {
    for (enemy in allEnemies) {
        if (Math.sqrt((this.x - allEnemies[enemy].x)*(this.x - allEnemies[enemy].x)+
                      (this.y - allEnemies[enemy].y)*(this.y - allEnemies[enemy].y)) < 60) {
            this.x = playerInitialX;
            this.y = playerInitialY;
        }
    }  
}



// Now instantiate the objects.*
// Place the player object in a variable called player
var player = new Player();


// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(-60, 60 + 80 *i ));
}


// This listens for key presses and sends the keys to your *
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
	var keyCode = allowedKeys[e.keyCode];
    player.handleInput(allowedKeys[e.keyCode]);
});
