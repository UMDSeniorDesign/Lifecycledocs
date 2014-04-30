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
		else if(type == 3){
			var refOptions = document.getElementById(ID+"options");
			refOptions.style.display = 'block';
			addEditValues(ID, 1);
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