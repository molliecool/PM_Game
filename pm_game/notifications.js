
var blinkAlert = function(){
     $('#smallalert').toggle();
};


function newAlert(type) {
	if(alertQueue.length > 0) { 
		$('#smallalert').removeClass('hidden'); //this is inconsistent - manage by display after this, should fix
		blinkIntervalID = setInterval(blinkAlert, 1000);
	}
	
	//need to push onto an array and then pop off one at a time per click
	var note = document.getElementById("notification");
	switch(alertQueue.shift()) {
		case "new_project":		note.setAttribute('onclick', 'newProjectNotification();');
								console.log("new project queued");
								break;
							
		default:				console.log("alert type not found");
								break;
	}
}


function clickedAlert() {

	clearInterval(blinkIntervalID);  //stop blink
	$('#smallalert').hide(); //reset hidden
	pauseDays();
	
	document.getElementById("notification").removeAttribute("onclick");  //remove click event
}