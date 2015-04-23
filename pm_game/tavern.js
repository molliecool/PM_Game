//where the canvas stuff happens
//animation tutorial: http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/

var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

//as of right now, the player will have minimum input to this
/* features:
- available characters will visit the bar
- characters clothes can change as they upgrade
- PM character should always be in the bar
- characters should randomly change what they want to do, assign those as states
- have possible actions based on each area of the bar

*/

//set the areas of the tavern
function setupTavern() {

//draw a grid
//make objects of each area


}

function drawTavern() {

}

function Location(name,array) {
	/*CONSTANT*/this.name = name;
	
	//[xPos, yPos, faceDir, available]
	this.spots = array;
}

Location.prototype.getInfo = function() {
	var percentages = [0,0,0,0,0,0];
	for(var i in this.currentProjStatus) {
		percentages[i] = (this.projStatusForPercentage[i]/this.ProjectRqmt[i]).toFixed(2);
	}
	console.log(this.name+", phase: "+this.currentPhase+", cost: "+this.currentProjCost+", percent complete: "+percentages);
}

//have ai ask the area for a location available - also send direction for char to face
//have char get there, confirm it has arrived, then trigger animations


function initLocations() {
	var spots = [0];
	var bar = new Location("bar", spots);
	
	tavernLocationList = [bar];
}
