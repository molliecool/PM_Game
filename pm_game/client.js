
function Client (name, desc, poc, busWorth, s1,s2,s3,s4,s5,s6, compProj) {
	this.name = name;
	this.description = desc;
	this.pointOfContact = poc;
	
	this.busWorth = busWorth;
	//responsiveness, need for control, involvement
	this.skills = [s1,s2,s3,s4,s5,s6];
	
	this.companyProjects = compProj;
	
}

Client.prototype.getInfo = function() {
	console.log(this.name + ' ' + this.title);
}



//*************************************************
// Functions used by game.js
//*************************************************

function initClients() {
	var c01 = new Client("Merry Old Soles", "Shoe and Magic Slipper Company", "Old King Cole", 1000000, 10,10,10,10,10,10, 
						["none"]);
	
	ClientList = [c01];
	
}