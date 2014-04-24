function showMenu(ID) {
	if(sessvars.xml.length > 0){
		var rightClickMenu = document.getElementById(ID+"Menu");
		rightClickMenu.style.display = 'block';
	}
	else{
		alert("Please open in Lifecycle Document Editor to enable this functionality");
	}
}
function hideMenu(ID) {
	var rightClickMenu = document.getElementById(ID+"Menu");
	rightClickMenu.style.display = 'none';
}
function addAbove(ID){
	//alert("Add Above: "+ID);
	if(sessvars.xml.length > 0){
		var xml = loadXML(sessvars.xml);
		var sections = xml.getElementsByTagName("Section");
		for(var i = 0; i < sections.length; i++){
			if(ID == sections[i].getAttribute("id")){
				//alert("Add Section Above: "+sections[i].getAttribute("id"));
				newNode=xml.createElement("Section");
				newNode.setAttribute("isNewest","true");
				newNode.setAttribute("id", sections[i].getAttribute("id"));
				newSectionTitleElement = xml.createElement("Title");
				newSectionTitleText = xml.createTextNode("New Section");
				newSectionTitleElement.appendChild(newSectionTitleText);
				newSectionTitleElement.setAttribute("isNewest","true");
				newNode.appendChild(newSectionTitleElement);
				newSectionParaElement = xml.createElement("Para");
				newSectionParaText = xml.createTextNode("New Para");
				newSectionParaElement.appendChild(newSectionParaText);
				newSectionParaElement.setAttribute("isNewest","true");
				newNode.appendChild(newSectionParaElement);
				var parentNode = sections[i].parentNode;
				parentNode.insertBefore(newNode, sections[i]);
				alert("Section Added");
			}
		}
		var reqs = xml.getElementsByTagName("Requirement");
		for(var i = 0; i < reqs.length; i++){
			if(ID == reqs[i].getAttribute("id")){
				//alert("Add Requirement Above: "+reqs[i].getAttribute("id"));
				newNode=xml.createElement("Requirement");
				newNode.setAttribute("isNewest","true");
				newNode.setAttribute("id", reqs[i].getAttribute("id"));
				newReqTitleElement = xml.createElement("Title");
				newReqTitleText = xml.createTextNode("New Requirement");
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
				alert("Requirement Added");
			}
		}
		var fs = new ActiveXObject("Scripting.FileSystemObject");
		//If windows 7, use this line
		var f = fs.GetFolder("../XML");
		//If windows 8, use this line
		//var f = fs.GetFolder("\XML");
		file = f.CreateTextFile("TestSave.xml", true, true);
		file.write(xml.xml);
		file.close();
		alert("File saved");
	}
	else{
		alert("Please open in Lifecycle Document Editor to enable this functionality");
		}
}
function addBelow(ID){
	//alert("Add Below: "+ID);
	if(sessvars.xml.length > 0){
		var xml = loadXML(sessvars.xml);
		var sections = xml.getElementsByTagName("Section");
		for(var i = 0; i < sections.length; i++){
			if(ID == sections[i].getAttribute("id")){
				//alert("Add Section Below: "+sections[i].getAttribute("id"));
				newNode=xml.createElement("Section");
				newNode.setAttribute("isNewest","true");
				newNode.setAttribute("id", sections[i].getAttribute("id"));
				newSectionTitleElement = xml.createElement("Title");
				newSectionTitleText = xml.createTextNode("New Section");
				newSectionTitleElement.appendChild(newSectionTitleText);
				newSectionTitleElement.setAttribute("isNewest","true");
				newNode.appendChild(newSectionTitleElement);
				newSectionParaElement = xml.createElement("Para");
				newSectionParaText = xml.createTextNode("New Para");
				newSectionParaElement.appendChild(newSectionParaText);
				newSectionParaElement.setAttribute("isNewest","true");
				newNode.appendChild(newSectionParaElement);
				var nextSibling = sections[i].nextSibling;
				if(nextSibling == null){
					var parentNode = sections[i].parentNode;
					parentNode.appendChild(newNode);
				}
				else{
					var parentNode = nextSibling.parentNode;
					parentNode.insertBefore(newNode, nextSibling);
				}
				alert("Section Added");
			}
		}
		var reqs = xml.getElementsByTagName("Requirement");
		for(var i = 0; i < reqs.length; i++){
			if(ID == reqs[i].getAttribute("id")){
				//alert("Add Requirement Below: "+reqs[i].getAttribute("id"));
				newNode=xml.createElement("Requirement");
				newNode.setAttribute("isNewest","true");
				newNode.setAttribute("id", reqs[i].getAttribute("id"));
				newReqTitleElement = xml.createElement("Title");
				newReqTitleText = xml.createTextNode("New Requirement");
				newReqTitleElement.appendChild(newReqTitleText);
				newReqTitleElement.setAttribute("isNewest","true");
				newNode.appendChild(newReqTitleElement);
				newReqParaElement = xml.createElement("Para");
				newReqParaText = xml.createTextNode("New Para");
				newReqParaElement.appendChild(newReqParaText);
				newReqParaElement.setAttribute("isNewest","true");
				newNode.appendChild(newReqParaElement);
				var nextSibling = reqs[i].nextSibling;
				if(nextSibling == null){
					var parentNode = reqs[i].parentNode;
					parentNode.appendChild(newNode);
				}
				else{
					var parentNode = nextSibling.parentNode;
					parentNode.insertBefore(newNode, nextSibling);
				}
				alert("Requirement Added");
			}
		}
		var fs = new ActiveXObject("Scripting.FileSystemObject");
		//If windows 7, use this line
		var f = fs.GetFolder("../XML");
		//If windows 8, use this line
		//var f = fs.GetFolder("\XML");
		file = f.CreateTextFile("TestSave.xml", true, true);
		file.write(xml.xml);
		file.close();
		alert("File saved");
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
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	//If windows 7, use this line
	var f = fs.GetFolder("../XML");
	//If windows 8, use this line
	//var f = fs.GetFolder("\XML");
	file = f.CreateTextFile("TestSave.xml", true, true);
	file.write(xml.xml);
	file.close();
	alert("File saved");
}