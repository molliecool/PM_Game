//types of impact
//employee becomes unavailable
//project budget tightens - affects visibility desire
//employee has review (improves morale)


function Event (name, type, employeeAffected, delayToStart, eventLength, modifier) {
	this.name = name;
	this.type = type;
	this.active = false;  //tells the list that the event should count days
	this.applied = false;  //tells the event to apply the modifier
	
	//this.employeeAffected = employeeAffected;
	this.delayToStart = delayToStart;  //in days modifier will be applied
	this.eventLength = eventLength;  //how long the modifier will last
	this.daysEventExists = 0;  //how long since the event was started

	this.expReward = 0;
	
	//add events to list to be checked
}
 Event.prototype.getInfo = function() {
	console.log(this.name + ' ' + this.title);
}

Event.prototype.dayGoesBy = function() {

	//if the event has been applied and has exceeded its length
	if(this.applied && this.daysEventExists >= (this.delayToStart + this.eventLength)) {
		this.applied = false;
		this.closeEvent();
	}
	//if the event has not yet been applied and has exceeded its start delay
	else if(!this.applied && this.daysEventExists >= this.delayToStart) {
		this.applied = true;
		this.applyModifier();
	}
	
	this.daysEventExists++;
	
}

Event.prototype.applyModifier = function() {
	console.log("trying to apply event");
	if(this.type == "employee") {
		for(var i in EmployeeList) {
			if(EmployeeList[i].name == this.employeeAffected) {
				//pause time to let pm's manage team?
				alert(EmployeeList[i].name+" is unavailable!");
				EmployeeList[i].ooo = true;
				this.applied = true;
				break;
			}		
		}
	}
}

Event.prototype.closeEvent = function (){
	this.active = false;
	this.applied = false;
	this.daysEventExists = 0;  
	
	//un-apply modifier
	if(this.type == "employee") {
		for(var i in EmployeeList) {
			if(EmployeeList[i].name == this.employeeAffected) {
				//pause time to let pm's manage team?
				alert(EmployeeList[i].name+" is available!");
				EmployeeList[i].ooo = false;
				break;
			}		
		}
	}

}


/*
//Inheritance
//Modify Project Constraints
ProjectEvent.prototype = new Event();
ProjectEvent.prototype.constructor = ProjectEvent;
function ProjectEvent() {
	//budget constricting
	//project cancelled
	//rejection of phase
	//extension of phase (different?)
	
	//client losing funding
	//client rejecting a phase or making a change (need to weight this with the phases and client styles)
	//executives randomly interested, want to reuse information, covered by news article
	//client contact changes
}
*/

EmployeeEvent.prototype = new Event();
EmployeeEvent.prototype.constructor = EmployeeEvent;
function EmployeeEvent(name, type, employeeAffected, delayToStart, eventLength, modifier) {
	//employee out of office
	//employee changed motivation
	this.name = name;
	this.type = type;
	this.active = false;  //tells the list that the event should count days
	this.applied = false;  //tells the event to apply the modifier
	
	this.employeeAffected = employeeAffected;
	this.delayToStart = delayToStart;  //in days modifier will be applied
	this.eventLength = eventLength;  //how long the modifier will last
	this.daysEventExists = 0;  //how long since the event was started

	this.expReward = 0;
	
	//add events to list to be checked
}

/*
BusinessEvent.prototype = new Event();
BusinessEvent.prototype.constructor = BusinessEvent;
function BusinessEvent() {
	//employee out of office
	//employee changed motivation
}
*/


//*************************************************
// Functions used by game.js
//*************************************************


function newBusinessEvent() {

	var which = Math.floor(Math.random()*BusinessEventsList.length);
	BusinessEventsList[which].active = true;
	
	if(this.type == "employee") {
		alert(BusinessEventsList[which].employeeAffected+" will be unavailable!");
	}

}

function initEvents() {
	//temporary while reading in from xml
	//(name, type, employeeAffected, delayToStart, eventLength, modifier)
	var e0 = new EmployeeEvent("Leah and Kevin are getting married!","employee","Leah",5,10,"unavailable");  //what about multiple employees

	var EventList = [e0];
	
	for(var i in EventList) {
		console.log(EventList[i].type);
		switch(EventList[i].type) {
			case "employee": 	BusinessEventsList.push(EventList[i]);
								break;
								
			case "client":		ProjectEventsList.push(EventList[i]);
								break;
								
			case "business":	BusinessEventsList.push(EventList[i]);
								break;
								
			default:			console.log("eff... project type not found");
								break;
		}
	}
}