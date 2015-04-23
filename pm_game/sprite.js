//charImage

var SpriteList = [];
var animationList = [];

function Sprite() {
	initSpriteAnimations();
	this.draw = true;
	
	this.image = new Image();
	this.image.src = "images/char_chocobo_all.gif";
	this.ctx = canvas.getContext("2d");

	this.curFrame = 0;
	this.prevFrame = 1;
	
	this.height = 25;
	this.width = 25;
	this.scale = .25;
	
	this.curPos = {x:0, y:100};
	this.velocity = 5;
	this.dir = "right";
	this.anim = "walk";
	this.tickPerFrame = 10;  //speed of the animation
	this.tickCounter = 0;
	
	this.sheetX = 0;
	this.sheetY = 0;
	this.sheetH = 30;
	this.sheetW = 30;
	
	SpriteList.push(this);

}

Sprite.prototype.update = function () {
	if(this.tickCounter <= this.tickPerFrame) {
		this.tickCounter++;
		return;
	}
	
	this.tickCounter = 0;  //reset counter

	//update direction
	if(this.curPos.x > canvas.width-this.width) {
		this.velocity *= -1;
		this.dir = "left";
	}
	if(this.curPos.x < 0) {
		this.velocity *= -1;
		this.dir = "right";
	}
	
	//update sprite frame
	
	//unique case of 3 frames repeating middle frame
	if(this.curFrame == 0) {
		this.prevFrame = this.curFrame;
		this.curFrame = 1;
	}
	else if(this.curFrame == 1 && this.prevFrame == 0) {
		this.prevFrame = this.curFrame;
		this.curFrame = 2;
	}
	else if(this.curFrame == 1 && this.prevFrame == 2) {
		this.prevFrame = this.curFrame;
		this.curFrame = 0;
	}
	else {
		this.prevFrame = this.curFrame;
		this.curFrame = 1;
	}
	
	//find grid spot
	for(var i in animationList) {
		
		if(animationList[i][0] == this.anim && animationList[i][1] == this.dir) {  //find the correct animation type and direction
			this.sheetX = (animationList[i][3]+this.curFrame)*this.sheetW;  //animation column start * animation width - moves horizontally
			this.sheetY = animationList[i][2]*this.sheetH;  //animation row start * animation height - moves vertically
		}
	}
	
	//update position
	this.curPos.x += this.velocity;
	
}

Sprite.prototype.render = function() {
	this.ctx.drawImage(this.image, 
						this.sheetX,this.sheetY,this.sheetW,this.sheetH,  //select frame on sheet
						this.curPos.x,this.curPos.y,this.width,this.height);  //select position and size on canvas

}

function initSpriteAnimations() {
	//name, start row, start column, length of animation
	//each sprite may have different sizes when optimizing
	animationList = [["walk","left",0,0,3],
					["walk","right",1,0,3]];
	
	
}