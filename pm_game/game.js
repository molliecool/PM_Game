var Game = {};

var MAXPROJECTS = 1;
var GAMEDAYS = 0;
var DAYDELAY = 300;

var PROJECTPHASELENGTH = 3;
var DAYSINWEEK = 5;

var menuOpen = false;
var showingProjects = false;
var showingEmployees = false;
var currentTab = 0;
var activeProjects = 0;

var Player;

var projIndex = 0;  //project that game uses to init
var editProject = 0; //ProjectList ID that is being edited. 
var EmployeeList = [];  //global this is ALL employees in the company
var ProjectList = [];	//global this is ALL potential projects
var ClientList = [];
var ProjectEventsList = [];
var BusinessEventsList = [];
var alertQueue = [];

var stuffToDraw = [];

var BusinessEventProbability = .95;
var ProjectEventProbability = .99;
var NewProjectProbability = .80;

var dayIntervalID, blinkIntervalID;

Game.fps = 50;


//lock scrolling hopefully
$('body').on({
'mousewheel': function(e) {
    if (e.target.id == 'el') return;
    e.preventDefault();
    e.stopPropagation();
    }
})

Game.initialize = function() {
	
		initEmployees();
		initClients();
		initProjects();
		initEvents();
	
	dayIntervalID = setInterval(dayGoesBy, DAYDELAY);
	
	Player = new PlayerCharacter("Scythe Whitman", 14,12,10,13,8,15);
	
	//scrolling on mobile:  $('body').bind('touchmove', function(e){e.preventDefault()})
	
	//problemSolving();

}


function dayGoesBy() {
	console.log("**************************** day "+GAMEDAYS+" ****************************");
	GAMEDAYS++;  //increase game counter
	
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
			//activeProjects++; //get a count of active projects
			
			if(Math.random()>ProjectEventProbability) {
				//apply event that affects the individual project
				ProjectList[i].projectEvent();
				console.log("project event");
			}
		}
	}

	
	if(Math.random()>BusinessEventProbability) {
	//apply event that affects the entire company
		console.log("business event");
		//newBusinessEvent();
	}
	
	//check and see if a new project comes in	
	if(Math.random()>NewProjectProbability && activeProjects < MAXPROJECTS) { 
		alertQueue.push("new_project");
		activeProjects++;
		newAlert();
	//if so, create and add project to the list
		//newProjectNotification();
	}
}

function pauseDays() {
	clearInterval(dayIntervalID);
}
function resumeDays() {
	dayIntervalID = setInterval(dayGoesBy, DAYDELAY);
}


Game.update = function() {
	//ask tavern if anything is changing
	//ask character if they are moving around 
	//move them

	//do all the sprite updates
	
	for(var i in SpriteList) {
		SpriteList[i].update();
	}
};

Game.draw = function() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	//draw tavern
	//draw characters
	for(var i in SpriteList) {
		if(SpriteList[i].draw) {
			SpriteList[0].render();
		}
	}
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
    
    if(loops) Game.draw();
  };
})();

(function() {
  var onEachFrame;
  if (window.webkitRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); webkitRequestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(Game.run);

Game.initialize();

