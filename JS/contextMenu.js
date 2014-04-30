function showMenu(ID, type, paraCount) {
	if(sessvars.xml.length > 0){
		if(type == 1 && sessvars.toggle == 1){//If Reference menu and in edit mode
			var rightClickMenu = document.getElementById(ID+"Menu");
			rightClickMenu.style.display = 'block';
		}
		else if(type == 2 && sessvars.toggle == 1){//If Para and in edit mode
			var rightClickMenu = document.getElementById(ID+"ParaMenu"+paraCount);
			rightClickMenu.style.display = 'block';
		}
		else if(type < 1){//If other type of menu, doesn't need to be in edit mode
			var rightClickMenu = document.getElementById(ID+"Menu");
			rightClickMenu.style.display = 'block';
		}
	}
	else{
		alert("Please open in Lifecycle Document Editor to enable this functionality");
	}
}
function hideMenu(ID, type, paraCount) {
	if(type == 1){
		var rightClickMenu = document.getElementById(ID+"ParaMenu"+paraCount);
		rightClickMenu.style.display = 'none';
		return;
	}
	var rightClickMenu = document.getElementById(ID+"Menu");
	rightClickMenu.style.display = 'none';
}
function removeRef(ID, fromID){
	if(sessvars.xml.length > 0){
		var xml = loadXML(sessvars.xml);
		var sections = xml.getElementsByTagName("Section");
		for(var i = 0; i < sections.length; i++){
			if(fromID == sections[i].getAttribute("id")){
				var refs = sections[i].childNodes;
				for(var j = 0; j < refs.length; j++){
					if(refs[j].nodeName == "Ref"){
						if(ID == refs[j].childNodes[0].nodeValue){
							refs[j].setAttribute("isNewest", "false");
							return saveFile(xml, "Reference Removed");
						}
					}
				}
			}
		}
		var reqs = xml.getElementsByTagName("Requirement");
		for(var i = 0; i < reqs.length; i++){
			if(fromID == reqs[i].getAttribute("id")){
				var refs = reqs[i].childNodes;
				for(var j = 0; j < refs.length; j++){
					if(refs[j].nodeName == "Ref"){
						if(ID == refs[j].childNodes[0].nodeValue){
							refs[j].setAttribute("isNewest", "false");
							return saveFile(xml, "Reference Removed");
						}
					}
				}
			}
		}
		return alert("Error: Reference Not Found!");
	}
}