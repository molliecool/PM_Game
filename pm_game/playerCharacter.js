var COMPLETEDPROJECTEXP = 100;
var PROVIDERISKANALYSIS = 10;
var PROVIDETIMEESTIMATE = 20;
var COSTSAVINGMODIFIER = .1; //10% of each dollar saved added to experience
var CLIENTHAPPINESSMODIFIER = 2; //multiply by client's happiness with project
var STAKEHOLDERHAPPINESSMODIFIER = 2; //multiply by stake holder's happiness
//can't control employee happiness here
//what else do you earn?  does extra money go into purchasing upgrades?

/*
//Singleton code that doesn't work
var ThePlayer = (function () {
	var instance;
	
	function createPlayer() {
		var player = new PlayerCharacter("Scythe Whitman", 14,12,10,13,8,15);
		return player;
	}
	
	return {
		getPlayerCharacter: function() {
			if(!instance) {
				instance = createPlayer();
			}
			return player;
		}
	};
})();*/

function PlayerCharacter (name, s1,s2,s3,s4,s5,s6) {
	this.name = name;
	this.title = "Director of Project Management Office";
	
	this.skills = [s1,s2,s3,s4,s5,s6];
	this.billRate = 140;

	this.experience = 0;
	this.currentLevel = 1;
	
	//list of abilities and their costs(hours) and required level
	this.actions = [["test",100,1],
					["Overtime",0,1],
					["EndOvertime",0,1],
					["RiskAnalysis",8,5],
					["TeamLunch",2,1],
					["UnscheduledClientUpdate",2,1],
					["UnscheduledStakeholderUpdate",0,1],
					["AdjustTeamMeetings",0,1]];
}

PlayerCharacter.prototype.returnInfo = function() {
	var rString = "Name: "+this.name+", Experience: "+this.experience+", Level: "+this.level;
	return rString;
}

PlayerCharacter.prototype.processAction = function(action) {
	switch(action) {
		case "test": 	console.log("test works!");
						break;
		default:	console.log("Action not found");
						break;
	}
}
