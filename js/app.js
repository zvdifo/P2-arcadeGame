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
};

// Update the enemy's position, required method for game *
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	this.x += this.speed*dt;	
	if (this.x > 500){
		this.x = -60;
		this.speed = Math.floor((Math.random()*5 + 1))*60;
	}
};

// Draw the enemy on the screen, required method for game *
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var playerInitialX = 200;
var playerInitialY = 400;

// initiates the Player.
var Player = function() {
	this.x = playerInitialX;
	this.y = playerInitialY;
	this.score = 0;
    this.level = 0;
    this.lifes = 3;
	this.sprite = 'images/char-horn-girl.png';
	this.speed = 100;
};

//Draw the player on the screen, required method for game *
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//empty, what really works is the handleInput methods.*
Player.prototype.update = function() {
    if (this.y < 60) {
        this.y = playerInitialY;
        this.x = playerInitialX;
        this.score += 100;
    }

    this.level = Math.floor(this.score/400);	
};

Player.prototype.changeColor = function() {
	if (this.level == 1) {
		document.body.style.background = "#d4e157";
	}
	if (this.level == 2) {
		document.body.style.background = "#ffca28";
	}
	if (this.level == 3) {
		document.body.style.background = "#F08080";
	}
	if (this.level == 4) {
		document.body.style.background = "#BA55D3";
	}		
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
		if(this.y > -20){
			this.y -= 80;			
		}
	}
	else {
		if(this.y < 380){
			this.y += 80;				
		}
	}	
};


//check collisions.*
Player.prototype.checkCollisions = function() {
	for (var enemy in allEnemies) {
		if (Math.sqrt((this.x - allEnemies[enemy].x)*(this.x - allEnemies[enemy].x)+
						(this.y - allEnemies[enemy].y)*(this.y - allEnemies[enemy].y)) < 60) {
			this.x = playerInitialX;
			this.y = playerInitialY;
			this.lifes -=1;
		}
	} 
    if (Math.sqrt((this.x - gem.x)*(this.x - gem.x)+
              (this.y - gem.y+40)*(this.y - gem.y+40)) < 60) {
		gem.sprite = gem_choices[Math.floor(Math.random()*3)];
		gem.x = x_choices[Math.floor(Math.random()*5)];
		gem.y = y_choices[Math.floor(Math.random()*3)];;
		gem.show = false;
		this.score += 200;
	} 
};


var gem_choices = ['images/GemBlue.png','images/GemGreen.png', 'images/GemOrange.png'];
var x_choices = [30,130,230,335,440];
var y_choices = [130,220,290]; 
var Gem = function() {
    this.sprite = gem_choices[Math.floor(Math.random()*3)];
    this.x = x_choices[Math.floor(Math.random()*5)];
    this.y = y_choices[Math.floor(Math.random()*3)];;
    this.show = false;
}

Gem.prototype.render = function() {
    if (this.show) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 40, 70);
    }
}

Gem.prototype.update = function() {
    if (Math.random() < 0.001) {
            this.show = true; 
        }
}



// Now instantiate the objects.*
// Place the player object in a variable called player
var player = new Player();
var gem = new Gem();


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



