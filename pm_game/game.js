var Game = {};

var MAXPROJECTS = 2;
var GAMEDAYS = 0;
var DAYDELAY = 300;

var PROJECTPHASELENGTH = 3;
var DAYSINWEEK = 5;

var showingProjects = false;
var showingEmployees = false;

var Player;

var projIndex = 0;  //project that game uses to init
var editProject = 0; //ProjectList ID that is being edited. 
var EmployeeList = [];  //global this is ALL employees in the company
var ProjectList = [];	//global this is ALL potential projects
var ProjectEventsList = [];
var BusinessEventsList = [];

var BusinessEventProbability = .95;
var ProjectEventProbability = .99;
var NewProjectProbability = .80;

Game.fps = 50;

Game.initialize = function() {
	
		initEmployees();
		//initClients();
		initProjects();
		initEvents();
	
	dayIntervalID = setInterval(dayGoesBy, DAYDELAY);
	
	Player = new PlayerCharacter("Scythe Whitman", 14,12,10,13,8,15);

}


function dayGoesBy() {
	console.log("**************************** day "+GAMEDAYS+" ****************************");
	GAMEDAYS++;  //increase game counter

	var activeProjects = 0;
	
	//modify employee happiness
	for(var i in EmployeeList) {
		EmployeeList[i].employeeHappinessMod(GAMEDAYS);
	}
	//update active events
	for(var i in ProjectEventsList) {
		if(ProjectEventsList[i].active) {
			ProjectEventsList[i].dayGoesBy();
		}	
	}
	for(var i in BusinessEventsList) {
		if(BusinessEventsList[i].active) {
			BusinessEventsList[i].dayGoesBy();
		}
	}
	
	//update ongoing projects
	for(var i in ProjectList) {
		if(ProjectList[i].projActive)
		{	
			ProjectList[i].update();  
			if(showingProjects) {
				viewProjectSummary();
			}
			activeProjects++; //get a count of active projects
			
			if(Math.random()>ProjectEventProbability) {
				//apply event that affects the entire company
				ProjectList[i].projectEvent();
				console.log("project event");
			}
		}
	}

	
	if(Math.random()>BusinessEventProbability) {
	//apply event that affects the entire company
		console.log("business event");
		newBusinessEvent();
	}
	
	//check and see if a new project comes in	
	if(Math.random()>NewProjectProbability && activeProjects < MAXPROJECTS) {
	//if so, create and add project to the list
		newProjectNotification();
	}
}

function pMActionClick() {

}
function editProjectClick(e) {
	pauseDays();
	for(var i in ProjectList){
		if(ProjectList[i].name == e.name) {
			console.log("project found");
			ProjectList[i].editProject();
			editProject = i;  //instead of a pointer I'll pass the list number
		}
	}
	
	//expand the project list to include the pm actions
}

function addOvertimeClick(e) {
	/*switch(e) {
		for(var i in ProjectList[editProject].assignedEmployeeTotals
		ProjectList[editProject].assignedEmployeeTotals[i] *= 
	*/
}


function pauseDays() {
	clearInterval(dayIntervalID);
}
function resumeDays() {
	dayIntervalID = setInterval(dayGoesBy, DAYDELAY);
}
function viewProjectSummaryClick() {
	if(showingEmployees) {
		showingEmployees = false;
		closeSummary();
	}
	if(showingProjects) {
		showingProjects = false;
		closeSummary();
	}
	else { 
	showingProjects = true;
	viewProjectSummary();	
	}
}
function viewProjectSummary() {
	var node = document.getElementById("statuses");
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
	for(var i in ProjectList) {
		if(ProjectList[i].projActive)
		{
			//make a new list item 
			var li = document.createElement('li');
			li.innerHTML = ProjectList[i].returnInfo();
			var btn = document.createElement('button');
			btn.innerHTML = "Edit";
			btn.setAttribute('onclick', 'editProjectClick(this); return false;');
			btn.setAttribute('name', ProjectList[i].name);
			li.appendChild(btn);
			document.getElementById("statuses").appendChild(li);
		}
	}
}
function closeSummary() {
	var node = document.getElementById("statuses");
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}
function viewEmployeeSummaryClick() {
	if(showingProjects) {
		showingProjects = false;
		closeSummary();
	}
	if(showingEmployees) {
		showingEmployees = false;
		closeSummary();
	}
	else { 
	showingEmployees = true;
	viewEmployeeSummary();	
	}
}
function viewEmployeeSummary() {
	var node = document.getElementById("statuses");
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
	
	for(var i in EmployeeList) {
		//make a new list item to push to currently added employees
		var li = document.createElement('li');
		li.innerHTML = EmployeeList[i].returnInfo();
		//li.setAttribute('onclick', 'removeEmployeeFromProject(this); return false;');
		document.getElementById("statuses").appendChild(li);
	}
}



Game.update = function() {
	
};

Game.draw = function() {

};

//this drives the main game loop
Game.run = (function() {
  var loops = 0, skipTicks = 1000 / Game.fps,
      maxFrameSkip = 10,
      nextGameTick = (new Date).getTime();
  
  return function() {
    loops = 0;
    
    while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
      Game.update();
      nextGameTick += skipTicks;
      loops++;
    }
    
    Game.draw();
  };
})();

Game.initialize();

