

//we'll put executive control in here
function Business (name, title, priceTier, goals, s1,s2,s3,s4,s5,s6) {
	this.name = name;
	this.title = title;
	this.freeCash = 100000;
	
	this.available = true;
	this.assignedTo = "None";
	
	this.skills = [s1,s2,s3,s4,s5,s6];
	this.priceTier = priceTier;  //1(entry) through 3(director)
	this.billRate = this.priceTier*40 + 100;

	this.happiness = 50;
	this.respect = 50;
	this.goals = goals;
}

Business.prototype.getInfo = function() {
	console.log(this.name + ' ' + this.title);
}



//*************************************************
// Functions used by game.js
//*************************************************
