/////***START TOGGLEEDIT FUNCTION***/////
function toggleEdit(){
	var edit = document.getElementById("edit");
	if(sessvars.toggle == "1") {
		sessvars.toggle = "0";
		edit.style.border = "none";
	}
	else if(sessvars.toggle == "0") {
		sessvars.toggle = "1";
		edit.style.border = "dashed thin";
	}
}
/////***START ADD FUNCTION***/////
//Type 	'0' = Section		'aORb' = 0 - Add Section above
//		'1' = Requirement	'aORb' = 0 - Add Requirement above
//		'2' = Reference		'aORb' = ID of section you want to add the on
function add(ID, aORb, type){ 
	if(sessvars.xml.length > 0){
		var xml = loadXML(sessvars.xml);
		var sections = xml.getElementsByTagName("Section");
		for(var i = 0; i < sections.length; i++){
			if(type == 2){
				var value = document.getElementById(ID+"References").value;
				if(aORb == sections[i].getAttribute("id")){
					newRef = xml.createElement("Ref");
					newRef.setAttribute("isNewest","true");
					newRefText = xml.createTextNode(value);
					newRef.appendChild(newRefText);
					sections[i].appendChild(newRef);
					return saveFile(xml, "Reference Added");
				}
			}
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
			if(type == 2){
				var value = document.getElementById(ID+"References").value;
				if(aORb == reqs[i].getAttribute("id")){
					newRef = xml.createElement("Ref");
					newRef.setAttribute("isNewest","true");
					newRefText = xml.createTextNode(value);
					newRef.appendChild(newRefText);
					reqs[i].appendChild(newRef);
					return saveFile(xml, "Reference Added");
				}
			}
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
/////***START CHANGETITLE FUNCTION***/////
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