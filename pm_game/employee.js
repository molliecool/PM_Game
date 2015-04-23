
var HAPPINESSWEIGHT = 0.1;
var HAPPINESSFLUXFREQ = 0.1; //a little over 60 days

function Employee (name, title, image, priceTier, goals, s1,s2,s3,s4,s5,s6) {
	this.name = name;
	this.title = title;
	this.available = true;  //employee on other project
	this.ooo = false;  //employee out of office, not available to be assigned
	this.assignedTo = "None";
	
	//add the image stuff
	this.image = new Sprite();
	
	this.BASESKILLS = [s1,s2,s3,s4,s5,s6];
	this.skills = [s1,s2,s3,s4,s5,s6];
	this.priceTier = priceTier;  //1(entry) through 3(director)
	this.billRate = (this.priceTier*this.priceTier)*10 + 100;  //110, 140, 190

	this.emotionalVariance = 3;  //lower means less variance
	this.happiness = 5;  //how happy the employee is from 1 to 10
	this.happiOffset = Math.random()*60; //hopefully that phase shifts between day 0 and 3 months
	//this.respect = 50;  //maybe add this in when the employees get more complex
	this.goals = goals;  //add this in later too
}

Employee.prototype.getInfo = function() {
	console.log(this.name + ' ' + this.title);
}

Employee.prototype.returnInfo = function() {
	
	var rString = this.name+", title: "+this.title+", Available?: "+this.available+", Project: "+this.assignedTo;
	return rString;
}

//*************************************************
//Does calculation for fluctuation in employee's performance
Employee.prototype.employeeHappinessMod = function(days) {
	for (var i in this.BASESKILLS) {
		this.skills[i] = this.emotionalVariance * Math.sin(HAPPINESSFLUXFREQ*days - this.happiOffset) 
						+ this.happiness*HAPPINESSWEIGHT + this.BASESKILLS[i]; 
		this.skills[i] = this.skills[i].toFixed(2)*1; 
	}
}


//*************************************************
// Functions used by game.js
//*************************************************


//*************************************************
// Modifying the HTML display
//*************************************************
function addEmployeeToProject(e) {
	for(var i in EmployeeList) {  
		if(EmployeeList[i].name == e.innerHTML) {
			
			//make a new list item to push to currently added employees
			var li = document.createElement('li');
			li.innerHTML = EmployeeList[i].name;
			li.setAttribute('onclick', 'removeEmployeeFromProject(this); return false;');
			document.getElementById("added_employee").appendChild(li);
			
			//add to project resources list
			ProjectList[projIndex].resources.push(EmployeeList[i]);
			
			//remove from currently free employees
			console.log("found in EmployeeList");
			EmployeeList[i].available = false;
			
			//remove from view
			e.parentNode.removeChild(e);
		}
	}
}

function removeEmployeeFromProject(e) {
	for(var i in EmployeeList) {  
		if(EmployeeList[i].name == e.innerHTML) {
			
			//make a new list item to push back to list
			var li = document.createElement('li');
			li.innerHTML = EmployeeList[i].name;
			li.setAttribute('onclick', 'addEmployeeToProject(this); return false;');
			document.getElementById("employee_list").appendChild(li);
			
			//remove from project resources list
			for(var i in ProjectList[projIndex].resources) {
				if(ProjectList[projIndex].resources[i].name == e.innerHTML){
					ProjectList[projIndex].resources.splice(i,1);
					console.log(ProjectList[projIndex].resources);
				}
			}
			
			//add to currently free employees
			console.log("found in added employees");
			EmployeeList[i].available = true;
			
			//remove from view
			e.parentNode.removeChild(e);
		}
	}
}


function displayEmployeeList() {
	for(var i in EmployeeList) {
		if(EmployeeList[i].available == true && EmployeeList[i].ooo == false) {
			var li = document.createElement('li');
			//next line is for setting attributes
			//li.setAttribute('class', 'namethisclass');
			li.setAttribute('onclick', 'addEmployeeToProject(this); return false;');
			li.innerHTML = EmployeeList[i].name;
			document.getElementById('employee_list').appendChild(li);
		}
	}
}


//*************************************************
// Init
//*************************************************

function initEmployees() {
	//temporary while reading in from xml
	
	//load employee xml   chr,const,dex,int,str,wis
	//lvl 1 employee = 54 pts, lvl 2 = 72, lvl 3 = 108
	var emp01 = new Employee("Mollie", "Warlock", 2, "Rule the world!", 14,12,10,13,8,15);
	var emp02 = new Employee("Philip", "Paladin", 2, "Save the world!", 13,15,8,10,14,12);
	var emp03 = new Employee("Leah", "Monk", 3, "Be awesome!", 14,20,19,16,21,18);
	var emp04 = new Employee("Kevin", "Warlock", 3, "Change the world!", 16,14,18,21,20,19);
	var emp05 = new Employee("Rich", "Rogue", 2, "Win at everything!", 15,12,14,13,8,10);
	var emp06 = new Employee("Jess", "Cleric", 1, "Help the world!", 7,11,9,10,5,12);
	var emp07 = new Employee("Will", "Ranger", 1, "Travel the world!", 9,10,12,11,7,5);
	var emp08 = new Employee("Matt", "Barbarian", 1, "Destroy the world!", 9,11,10,5,12,7);
	var emp09 = new Employee("Elsida", "Bard", 1, "Fix the world!", 12,7,10,9,5,11);
	var emp10 = new Employee("Scott", "Druid", 1, "Commune with nature!", 5,9,7,11,10,12);
	
	//also cheating cause these are global
	EmployeeList = [emp01,emp02,emp03,emp04,emp05,emp06,emp07,emp08,emp09,emp10];

}