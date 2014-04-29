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
function addRef(ID, toID){
	if(sessvars.xml.length > 0){
		var xml = loadXML(sessvars.xml);
		var sections = xml.getElementsByTagName("Section");
		for(var i = 0; i < sections.length; i++){
			if(toID == sections[i].getAttribute("id")){
				newRef = xml.createElement("Ref");
				newRef.setAttribute("isNewest","true");
				newRefText = xml.createTextNode(ID);
				newRef.appendChild(newRefText);
				sections[i].appendChild(newRef);
				return saveFile(xml, "Reference Added");
			}
		}
		var reqs = xml.getElementsByTagName("Requirement");
		for(var i = 0; i < reqs.length; i++){
			if(toID == reqs[i].getAttribute("id")){
				newRef = xml.createElement("Ref");
				newRef.setAttribute("isNewest","true");
				newRefText = xml.createTextNode(ID);
				newRef.appendChild(newRefText);
				reqs[i].appendChild(newRef);
				return saveFile(xml, "Reference Added");
			}
		}
		return alert("Error: Reference Could Not Be Added!");
	}
}
function add(ID, aORb, type){
	if(sessvars.xml.length > 0){
		var xml = loadXML(sessvars.xml);
		var sections = xml.getElementsByTagName("Section");
		for(var i = 0; i < sections.length; i++){
			if(ID == sections[i].getAttribute("id")){
				//alert("Add Section Above: "+sections[i].getAttribute("id"));
				if(type == 0){//If add Section
					newNode = xml.createElement("Section");
					newSectionTitleText = xml.createTextNode("New Section");
				}
				else if(type == 1){//If add Requirement
					newNode = xml.createElement("Requirement");
					newSectionTitleText = xml.createTextNode("New Requirement");
				}
				newNode.setAttribute("isNewest","true");
				newNode.setAttribute("id", sections[i].getAttribute("id"));
				newSectionTitleElement = xml.createElement("Title");
				newSectionTitleElement.appendChild(newSectionTitleText);
				newSectionTitleElement.setAttribute("isNewest","true");
				newNode.appendChild(newSectionTitleElement);
				newSectionParaElement = xml.createElement("Para");
				newSectionParaText = xml.createTextNode("New Para");
				newSectionParaElement.appendChild(newSectionParaText);
				newSectionParaElement.setAttribute("isNewest","true");
				newNode.appendChild(newSectionParaElement);
				var parentNode = sections[i].parentNode;
				if(aORb == 0)//If add above
					parentNode.insertBefore(newNode, sections[i]);
				else if(aORb == 1){//If add below
					var nextSibling = sections[i].nextSibling;
					if(nextSibling == null){
						var parentNode = sections[i].parentNode;
						parentNode.appendChild(newNode);
					}
					else{
						var parentNode = nextSibling.parentNode;
						parentNode.insertBefore(newNode, nextSibling);
					}
				}
				else if(aORb == 3){//If add sub
					sections[i].appendChild(newNode);
				}
				return saveFile(xml, "Added to Section");
			}
		}
		var reqs = xml.getElementsByTagName("Requirement");
		for(var i = 0; i < reqs.length; i++){
			if(ID == reqs[i].getAttribute("id")){
				if(type == 0){//If add Section
					newNode = xml.createElement("Section");
					newReqTitleText = xml.createTextNode("New Section");
				}
				else if(type == 1){//If add Requirement
					newNode = xml.createElement("Requirement");
					newReqTitleText = xml.createTextNode("New Requirement");
				}
				newNode.setAttribute("isNewest","true");
				newNode.setAttribute("id", reqs[i].getAttribute("id"));
				newReqTitleElement = xml.createElement("Title");
				newReqTitleElement.appendChild(newReqTitleText);
				newReqTitleElement.setAttribute("isNewest","true");
				newNode.appendChild(newReqTitleElement);
				newReqParaElement = xml.createElement("Para");
				newReqParaText = xml.createTextNode("New Para");
				newReqParaElement.appendChild(newReqParaText);
				newReqParaElement.setAttribute("isNewest","true");
				newNode.appendChild(newReqParaElement);
				var parentNode = reqs[i].parentNode;
				parentNode.insertBefore(newNode, reqs[i]);
				if(aORb == 0)//If add above
					parentNode.insertBefore(newNode, reqs[i]);
				else if(aORb == 1){//If add below
					var nextSibling = reqs[i].nextSibling;
					if(nextSibling == null){
						var parentNode = reqs[i].parentNode;
						parentNode.appendChild(newNode);
					}
					else{
						var parentNode = nextSibling.parentNode;
						parentNode.insertBefore(newNode, nextSibling);
					}
				}
				else if(aORb == 3){//If add sub
					reqs[i].appendChild(newNode);
				}
				return saveFile(xml, "Added to Requirement");
			}
		}
	}
	else{
		alert("Please open in Lifecycle Document Editor to enable this functionality");
		}
}
function changeTitle(ID){
	var xml = loadXML(sessvars.xml);
	var newTitle = document.getElementById(ID+"Title").value;
	var sections = xml.getElementsByTagName("Section");
	for(var i = 0; i < sections.length; i++){
		if(ID == sections[i].getAttribute("id")){
			var titles = sections[i].getElementsByTagName("Title");
			for(var j = 0; j < titles.length; j++){
				if(titles[j].getAttribute("isNewest") == 'true'){
					if(titles[j].childNodes[0].nodeValue == newTitle){
						alert("Title not changed!");
						return;
					}
					var parentNode = titles[j].parentNode;
					titles[j].setAttribute("isNewest", "false");
					newTitleElement = xml.createElement("Title");
					newTitleText = xml.createTextNode(newTitle);
					newTitleElement.appendChild(newTitleText);
					newTitleElement.setAttribute("isNewest","true");
					parentNode.insertBefore(newTitleElement, titles[j]);
					alert(titles[j].childNodes[0].nodeValue+" Changed to: "+newTitle);
				}
			}
		}
	}
	var reqs = xml.getElementsByTagName("Requirement");
	for(var i = 0; i < reqs.length; i++){
		if(ID == reqs[i].getAttribute("id")){
			var titles = reqs[i].getElementsByTagName("Title");
			for(var j = 0; j < titles.length; j++){
				if(titles[j].getAttribute("isNewest") == 'true'){
					if(titles[j].childNodes[0].nodeValue == newTitle){
						alert("Title not changed!");
						return;
					}
					var parentNode = titles[j].parentNode;
					titles[j].setAttribute("isNewest", "false");
					newTitleElement = xml.createElement("Title");
					newTitleText = xml.createTextNode(newTitle);
					newTitleElement.appendChild(newTitleText);
					newTitleElement.setAttribute("isNewest","true");
					parentNode.insertBefore(newTitleElement, titles[j]);
					alert(titles[j].childNodes[0].nodeValue+" Changed to: "+newTitle);
				}
			}
		}
	}
	return saveFile(xml, "Title Changed");
}