//where the canvas stuff happens

var theCanvas = document.getElementById("mycanvas");
var ctx = theCanvas.getContext("2d");

//as of right now, the player will have minimum input to this
/* features:
- available characters will visit the bar
- characters clothes can change as they upgrade
- PM character should always be in the bar
- characters should randomly change what they want to do, assign those as states
- have possible actions based on each area of the bar

*/

//set the areas of the tavern
setupTavern() {

//make objects of each area


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


initLocations(){
	var spots[];
	var bar = new Location("bar", spots);
	
	tavernLocationList = [bar];
}