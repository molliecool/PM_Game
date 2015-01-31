

function newProjectNotification() {
	//delay and test project creation
	clickedAlert();
	moveUpActive("blank");
	
	//picking the project here
	//make sure it isn't already active
	do {
		projIndex = Math.floor(Math.random()*ProjectList.length);
	} while(ProjectList[projIndex].active == false);
	
	
	$('#newProjectBtn').removeClass('hidden');
	
}


function createProjectPlan() {
	//show the proper html stuff
	$('#newProjectBtn').addClass('hidden');
	$('#createProject').removeClass('hidden');
	
	updateProjectPlanDisplay();  //does calculations - in project.js
	displayEmployeeList();
}


//Final step - resume game play
//This gets called by the submit button on screen
function submitProjectPlan() {
	//add project to update list
	ProjectList[projIndex].projActive = true;
	
	//reset display stuff
	var node = document.getElementById("added_employee");
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
	node = document.getElementById("employee_list");
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
	
	$('#createProject').addClass('hidden');
	moveDown();
	resumeDays();
}