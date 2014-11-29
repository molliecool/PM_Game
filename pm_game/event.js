//types of impact
//employee becomes unavailable
//project budget tightens - affects visibility desire
//employee has review (improves morale)


function Event (name, type, employeeAffected, delayToStart, eventLength, modifier) {
	this.name = name;
	//this.type = type;
	this.active = false;  //tells the list that the event should count days
	this.applied = false;  //tells the event to apply the modifier
	
	//this.employeeAffected = employeeAffected;
	this.delayToStart = delayToStart;  //in days modifier will be applied
	this.eventLength = eventLength;  //how long the modifier will last
	this.delayCount = 0;

	this.expReward = 0;
	
	//add events to list to be checked
}
 Event.prototype.getInfo = function() {
	console.log(this.name + ' ' + this.title);
}

Event.prototype.checkDelayDays = function() {
	if(this.delayCount >= (this.delayCount + this.eventLength)) {
		this.applied = false;
		this.closeEvent();
	}
	else if(this.delayCount >= this.delayCount) {
		this.applied = true;
		this.applyModifier();
	}
	
	this.delayCount++;
	
}

Event.prototype.closeEvent = function (){
	this.active = false;
	//what else?

}

//Inheritance
//Modify Project Constraints
ProjectEvent.prototype = new Event();
ProjectEvent.prototype.constructor = ProjectEvent;
function ProjectEvent() {
	//budget constricting
	//project cancelled
	//rejection of phase
	//extension of phase (different?)
}

EmployeeEvent.prototype = new Event();
EmployeeEvent.prototype.constructor = EmployeeEvent;
function EmployeeEvent() {
	//employee out of office
	//employee changed motivation
}

BusinessEvent.prototype = new Event();
BusinessEvent.prototype.constructor = BusinessEvent;
function BusinessEvent() {

}



EmployeeEvent.prototype.applyModifier = function() {
	for(var i in EmployeeList) {
		if(EmployeeList[i].name == this.employeeAffected) {
			//pause time to let pm's manage team?
			alert(EmployeeList[i].name+" is going to be unavailable!");
			EmployeeList[i].ooo = true;
		}		
	}

}

//*************************************************
// Functions used by game.js
//*************************************************


function newEvent() {
	

}

function initEvents() {
	//temporary while reading in from xml
	//(name, type, employeeAffected, delayToStart, eventLength, modifier)
	var e0 = new EmployeeEvent("Leah and Kevin are getting married!","employee","Leah",5,10,"unavailable");  //what about multiple employees

	var EventList = [e0];

		
	//
	
	
	
}