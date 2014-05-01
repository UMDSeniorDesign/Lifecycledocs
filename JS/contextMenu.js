function showMenu(ID, type, paraCount) {
	if(sessvars.xml.length > 0){
		if(type == 1 && sessvars.toggle == 1){//If Reference menu and in edit mode
			var rightClickMenu = document.getElementById(ID+"Menu");
			var popup = document.createElement("div");
			popup.style.display = 'none';
			popup.innerHTML = rightClickMenu.innerHTML;
			//rightClickMenu.style.display = 'block';
			var buttons = rightClickMenu.getElementsByTagName("button");
			var popupButtons = popup.getElementsByTagName("button");
			for(var i = 0; i < popupButtons.length; i++){
				popupButtons[i].setAttribute('onclick', 'closePopup('+i+')');
				if(popupButtons[i].id == "close")
					popupButtons[i].setAttribute('onclick', 'closePopup(-1)');
			}
			var popupString = ("<center>"+popup.innerHTML+"</center>");
			var popObject = {html:popupString, id:ID};
			var pop = window.showModalDialog("popup.hta", popObject, "dialogWidth:215px;dialogHeight: 65px");
			if(pop != -1 && pop != undefined){
				buttons[pop].click();
			}
		}
		else if(type == 2 && sessvars.toggle == 1){//If Para and in edit mode
			var rightClickMenu = document.getElementById(ID+"ParaMenu"+paraCount);
			var popup = document.createElement("div");
			popup.style.display = 'none';
			popup.innerHTML = rightClickMenu.innerHTML;
			//rightClickMenu.style.display = 'block';
			var buttons = rightClickMenu.getElementsByTagName("button");
			var popupButtons = popup.getElementsByTagName("button");
			for(var i = 0; i < popupButtons.length; i++){
				popupButtons[i].setAttribute('onclick', 'closePopup('+i+')');
				if(popupButtons[i].id == "close")
					popupButtons[i].setAttribute('onclick', 'closePopup(-1)');
			}
			var popupString = ("<center>"+popup.innerHTML+"</center>");
			var popObject = {html:popupString, id:ID};
			var pop = window.showModalDialog("popup.hta", popObject, "dialogWidth:175px;dialogHeight: 125px");
			if(pop != -1 && pop != undefined){
				buttons[pop].click();
			}
		}
		else if(type < 1){//If other type of menu, doesn't need to be in edit mode
			var rightClickMenu = document.getElementById(ID+"Menu");
			var popup = document.createElement("div");
			popup.style.display = 'none';
			popup.innerHTML = rightClickMenu.innerHTML;
			//rightClickMenu.style.display = 'block';
			var buttons = rightClickMenu.getElementsByTagName("button");
			var popupButtons = popup.getElementsByTagName("button");
			for(var i = 0; i < popupButtons.length; i++){
				popupButtons[i].setAttribute('onclick', 'closePopup('+i+')');
				if(popupButtons[i].id == "close")
					popupButtons[i].setAttribute('onclick', 'closePopup(-1)');
			}
			var popupString = ("<center>"+popup.innerHTML+"</center>");
			var popObject = {html:popupString, id:ID};
			var pop = window.showModalDialog("popup.hta", popObject, "dialogWidth:425px;dialogHeight: 125px");
			if(pop != -1 && pop != undefined){
				buttons[pop].click();
			}
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
function closePopup(index){
	window.returnValue = index;
	window.close();
}