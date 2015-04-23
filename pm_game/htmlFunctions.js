//all the html functions

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
		document.getElementById("employee-summary").appendChild(li);
	}
}


//*************************************************
// Main Menu Tab Management
//*************************************************
$(function() {
	$( "#main-menu" ).tabs({
		collapsible: true,
		active: false,
		activate: function(event,ui) {
			//refreshTabData();
			if(-1 == ui.newTab.index()) {
				menuOpen = true;
				moveDown(); 
				}
			else { moveUp(); }
		}
	});
});
function moveUp() {
	if(!menuOpen) {
		menuOpen = true;
		$( "#main-menu-container" ).animate({
		  'top': '100px',
		  'height': '100%'
		}, 1000);
	}
}
function moveUpActive(tab) {
	switch(tab) {
		case "project-summary": 	tab = 0;
									break;

		case "employee-summary": 	tab = 1;
									break;

		case "pm-actions": 			tab = 2;
									break;									
									
		case "game-options": 		tab = 3;
									break;	
									
		case "blank": 		tab = 4;
									break;	
		
		default:					console.log("tab not found");
									break;
	}
	
	if(!menuOpen) {
		menuOpen = true;
		$( "#main-menu-container" ).animate({
		  'top': '100px',
		  'height': '100%'
		}, 1000);
		$( "#main-menu" ).tabs({
			'active': tab
		});
	}
	else {
		$( "#main-menu" ).tabs({
			'active': tab
		});
	}
}

function moveDown() {
	//console.log("moveDown called");
	if(menuOpen) {
		$( "#main-menu" ).tabs({ active: false });  //close the tab
		//calculate height
		var temp = $("#main-menu-container").parent().height()-50;  //last digit is height of menu-container
		menuOpen = false;
		$( "#main-menu-container" ).animate({'top': temp, 'height': '50px'}, 1000);  //lower the container
		
	}
}

function AddAlert() {

}
