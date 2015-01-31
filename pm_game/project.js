//projReqmnt = [chr,cons,dex,int,str,wis]


function Project(name,budget,weeks,rqmt) {
	/*CONSTANT*/this.name = name;
	/*CONSTANT*/this.budget = budget;
	this.currentProjCost = 0;
	
	this.startDate = 0;
	/*CONSTANT*/this.LENGTH = 10;
	this.client = "temp";

	this.projPercent = [];
	this.currentPhase = 0;
	this.projActive = false;
	this.projComplete = false;
	
	/*CONSTANT*/this.ProjectRqmt = [0,0,0,0,0,0];
	for(var i in rqmt) {
		/*CONSTANT*/this.ProjectRqmt[i] = weeks*DAYSINWEEK*rqmt[i];  
	}
	
	//this.phaseRqmt = [[],[],[]];  //preProd, Prod, QA
	this.preProdRqmt = [];
	this.prodRqmt = [];
	this.qaRqmt = [];
	
	//current project progress stats
	this.currentProjStatus = [0,0,0,0,0,0];
	this.projStatusForPercentage = [0,0,0,0,0,0];
	
	//resources assigned to project
	this.resources = [];
	
	//combined stats of individual employees
	this.assignedEmployeeTotals = [0,0,0,0,0,0];
	this.assignedEmployeeCost = 0;
	
}

Project.prototype.getInfo = function() {
	var percentages = [0,0,0,0,0,0];
	for(var i in this.currentProjStatus) {
		percentages[i] = (this.projStatusForPercentage[i]/this.ProjectRqmt[i]).toFixed(2);
	}
	console.log(this.name+", phase: "+this.currentPhase+", cost: "+this.currentProjCost+", percent complete: "+percentages);
}

Project.prototype.returnInfo = function() {
	var percentages = [0,0,0,0,0,0];
	for(var i in this.currentProjStatus) {
		percentages[i] = (this.projStatusForPercentage[i]/this.ProjectRqmt[i]).toFixed(2);
	}
	var rString = this.name+", phase: "+this.currentPhase+", cost: "+this.currentProjCost+", percent complete: "+percentages;
	return rString;
}

Project.prototype.editProject = function() {
	console.log("in edit mode");
}

Project.prototype.projectEvent = function() {
	var whichEvent = Math.random()*ProjectEventsList.length;
	//ProjectEvents[whichEvent] - apply to project
	
}


Project.prototype.resetProject = function() {
	this.currentProjCost = 0;
	this.startDate = 0;
	this.projPercent = [];
	this.currentPhase = 0;
	this.preProdRqmt = []; 
	this.prodRqmt = [];
	this.qaRqmt = [];
	this.currentProjStatus = [0,0,0,0,0,0];
	this.projStatusForPercentage = [0,0,0,0,0,0];
	this.resources = [];
	this.assignedEmployeeTotals = [0,0,0,0,0,0];
	this.assignedEmployeeCost = 0;
}

Project.prototype.projectPlan = function(percent,employees) {

	//calculate your resource pool contributions
	this.employeeTotals();
	
	//calculate the resource allocation to your project phases
	this.projectPhasesCalculation();
}

//*****************************************
//this calculates the requirements of each phase
//*****************************************
Project.prototype.projectPhasesCalculation = function(percent) {
	this.projPercent = percent;
	this.preProdRqmt = [];
	this.prodRqmt = [];
	this.qaRqmt = [];
	
	for(var i in this.ProjectRqmt) {
		this.preProdRqmt[i] = this.ProjectRqmt[i] * this.projPercent[0];
		this.prodRqmt[i] = this.ProjectRqmt[i] * this.projPercent[1];
		this.qaRqmt[i] = this.ProjectRqmt[i] * this.projPercent[2];
	}
	
	console.log("preProd: "+this.preProdRqmt);
	console.log("prod: "+this.prodRqmt);
	console.log("qa: "+this.qaRqmt);
}

//*****************************************
//Save time and add the employee skills 
//together for future calculations
//*****************************************
//Reuse this for changes to the resource pool
//*****************************************
Project.prototype.employeeTotals = function() {

	this.assignedEmployeeTotals = [0,0,0,0,0,0];
	this.assignedEmployeeCost = 0;
	
	for(var j in this.resources) {
		for(var i in this.assignedEmployeeTotals) {
			this.assignedEmployeeTotals[i] += this.resources[j].skills[i];  //add the skills together
		}
		this.assignedEmployeeCost += this.resources[j].billRate; //add employee cost together
	}
	//console.log("total employee: "+this.assignedEmployeeTotals+" cost per day: "+this.assignedEmployeeCost);
}

//*****************************************
//This is a daily update
//Take the employee totals and contribute them 
//to the project totals with some randomness
//*****************************************
//Wait for all requirements to be complete in
//each phase before continuing to the next one	
Project.prototype.update = function() {
	var complete = true;

	
	//apply employee modifications to project total
	this.employeeTotals();

	//update the project cost
	this.currentProjCost += this.assignedEmployeeCost;
	
	for(var i in this.currentProjStatus) {
		//if the stats doesn't exceed the requirements, flag the skill as incomplete
		//then add increase the completed skill
		
		//this.projStatusForPercentage[i] += this.assignedEmployeeTotals[i];
		
		switch(this.currentPhase) {
			case 0:
				//console.log("phase 1");
				if(this.currentProjStatus[i] < this.preProdRqmt[i]) {	
					complete = false;	
					this.currentProjStatus[i] += this.assignedEmployeeTotals[i];
				}
				else if(this.currentProjStatus[i] > this.preProdRqmt[i]) {
					this.currentProjStatus[i] = this.preProdRqmt[i];
				}
				this.projStatusForPercentage[i] = this.currentProjStatus[i];  //keeps the percentage accurate hopefully
				break;
			case 1:
				//console.log("phase 2");
				if(this.currentProjStatus[i] < this.prodRqmt[i]) {	
					complete = false;	
					this.currentProjStatus[i] += this.assignedEmployeeTotals[i];
				}
				else if(this.currentProjStatus[i] > this.prodRqmt[i]) {
					this.currentProjStatus[i] = this.prodRqmt[i];
				}
					this.projStatusForPercentage[i] = this.preProdRqmt[i] + this.currentProjStatus[i];
				break;
			case 2:
				//console.log("phase 3");
				if(this.currentProjStatus[i] < this.qaRqmt[i]) {	
					complete = false;	
					this.currentProjStatus[i] += this.assignedEmployeeTotals[i];
				}
				else if(this.currentProjStatus[i] > this.qaRqmt[i]) {
					this.currentProjStatus[i] = this.qaRqmt[i];
				}
					this.projStatusForPercentage[i] = this.preProdRqmt[i] + this.prodRqmt[i] + this.currentProjStatus[i];
				break;
			default:
				//console.log("didn't register phase in switch");
				break;
		}
	}
	//completed phases
	if(complete && this.currentPhase < PROJECTPHASELENGTH) {
		this.currentPhase++;
		this.currentProjStatus = [0,0,0,0,0,0];
	}
	//completed projects
	else if(complete && this.currentPhase >= PROJECTPHASELENGTH) {
		this.projComplete = true;
		this.projActive = false;
		for(var i in this.resources) {
			this.resources[i].available = true;
			this.resources[i].assignedTo = "None";
		}
		
		//also reset the project requirements back to their original values
		this.resetProject();
		console.log("project complete!");
		activeProjects--;
	}
	this.getInfo();
}


//*************************************************
// Functions used by game.js
//*************************************************
function updateProjectPlanDisplay() {
	//get inputs from html
	var ppPercent = document.getElementById("pProdPrct").value/100;
	var pPercent = document.getElementById("prodPrct").value/100;
	var qaPercent = document.getElementById("qaPrct").value/100;
	var percents = [ppPercent,pPercent,qaPercent];
	//make sure these add up to 100
	
	//make sure this list isn't empty
	var resources = []; //temp 
	
	
	//these are to determine the skill that will take the longest to fulfil
	var ppLength = 0;
	var pLength = 0;
	var qaLength = 0;
	
	//calculate amount of time to complete each phase
	//calculate project phases first
	ProjectList[projIndex].projectPhasesCalculation(percents);
	ProjectList[projIndex].employeeTotals(resources);
	//that equals the project phases divided by the total resources
	//need to show the greatest quotient, because that will be the longest time
	//remember six skills we're calculating against
	
	for(var i in ProjectList[projIndex].preProdRqmt) {
		var ppLengthNEW = ProjectList[projIndex].preProdRqmt[i] / ProjectList[projIndex].assignedEmployeeTotals[i];
		if(ppLengthNEW > ppLength) 
			{ ppLength = ppLengthNEW; }
	}
	for(var i in ProjectList[projIndex].prodRqmt) {
		var pLengthNEW = ProjectList[projIndex].prodRqmt[i] / ProjectList[projIndex].assignedEmployeeTotals[i];
		if(pLengthNEW > pLength) 
			{ pLength = pLengthNEW; }
	}
	for(var i in ProjectList[projIndex].qaRqmt) {
		var qaLengthNEW = ProjectList[projIndex].qaRqmt[i] / ProjectList[projIndex].assignedEmployeeTotals[i];
		if(qaLengthNEW > qaLength) 
			{ qaLength = qaLengthNEW; }
	}
	console.log("ppLength: "+ppLength+", pLength: "+pLength+", qaLength: "+qaLength);

	//draw a rectangle to show that amount of time in a gantt
	$("#preProdRect").animate({width: ppLength*5+"%"}, 1000);
	$("#prodRect").animate({width: pLength*5+"%"}, 1000);
	$("#qaRect").animate({width: qaLength*5+"%"}, 1000);
	
}





function initProjects() {
	//temp until read in from xml
	//name, budget, weeks, [skills per week]
	var p01 = new Project("Kill a Dragon", 10000,12,[17.5,17.5,17.5,17.5,17.5,17.5]);
	var p02 = new Project("Rescue a Prince", 1000,12,[17.5,17.5,17.5,17.5,17.5,17.5]);
	var p03 = new Project("Gather 40 Giant Moth Wings", 100,12,[17.5,17.5,17.5,17.5,17.5,17.5]);
	var p04 = new Project("Grab the Foo from the Dungeon", 50000,12,[17.5,17.5,17.5,17.5,17.5,17.5]);
	var p05 = new Project("Deliver Magical Implement", 5000,12,[17.5,17.5,17.5,17.5,17.5,17.5]);
	var p06 = new Project("Escort a Bard", 1000,12,[17.5,17.5,17.5,17.5,17.5,17.5]);
	
	ProjectList = [p01,p02,p03,p04,p05,p06];

}