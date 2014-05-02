/////***START TOGGLEEDIT FUNCTION***/////
function toggleEdit(){
	var edit = document.getElementById("edit");
	var tools = document.getElementById("tools");
	if(sessvars.toggle == "1") {
		sessvars.toggle = "0";
		edit.style.border = "none";
		tools.style.display = "none";
	}
	else if(sessvars.toggle == "0") {
		sessvars.toggle = "1";
		edit.style.border = "dashed thin";
		tools.style.display = "block";
	}
}
/////***START ADD FUNCTION***/////
//Type 	'0' = Section		'aORb' = 0 - Add Section above
//		'1' = Requirement	'aORb' = 0 - Add Requirement above
//		'2' = Reference		
//		'3' = Para			'aORb' = 0 - add Para above
function add(ID, aORb, type, index){ 
	if(sessvars.xml.length > 0){
		var xml = loadXML(sessvars.xml);
		var newIndex = index;
		var added = 0;
		if(ID == 0){
			var div = document.getElementById("section");
			var divHTML = div.innerHTML
			var start = divHTML.search("<U>");
			var divSub = divHTML.substring(start+3);
			var idEnd = divSub.search(" - ");
			var divID = divSub.substring(-1, idEnd);
			if(aORb == 0)
				showMenu(divID, 3);
			if(aORb == 1)
				add(divID, 1, 3, -1);
		}
		var sections = xml.getElementsByTagName("Section");
		for(var i = 0; i < sections.length; i++){
			if(type == 0 || type == 1 || type == 3){//If add Section or Requirement or Para
				if(ID == sections[i].getAttribute("id")){
					if(type == 0){//If add Section
						newNode = xml.createElement("Section");
						newSectionTitleText = xml.createTextNode("New Section");
					}
					else if(type == 1){//If add Requirement
						newNode = xml.createElement("Requirement");
						newSectionTitleText = xml.createTextNode("New Requirement");
					}
					else if(type == 3){
						var paras = sections[i].childNodes;
						var highestIndex = 0;
						for(var j = 0; j < paras.length; j++){
							if(paras[j].nodeName == "Para"){
								if(index == -1){
									var curIndex = paras[j].getAttribute("index");
									if(curIndex > highestIndex)
										highestIndex = curIndex;
								}
								if(index == paras[j].getAttribute("index")){
									if(paras[j].getAttribute("isNewest") == "false")
										continue;
									var newNode = paras[j].cloneNode(true);
									newNode.setAttribute("index", newIndex);
									newNode.childNodes[0].nodeValue = "New Para";
									if(aORb == 0){//If Add Above
										paras[j].setAttribute("index", ++newIndex);
										sections[i].insertBefore(newNode, paras[j]);
										j++;
									}
									else if(aORb == 1){//If Add Below
										newNode.setAttribute("index", ++newIndex);
										var nextSibling = paras[j].nextSibling;
										j++;
										if(nextSibling == null)
											sections[i].appendChild(newNode);
										else
											sections[i].insertBefore(newNode, nextSibling);
									}
									added = 1;
									continue;
								}
								if(added == 1)
									paras[j].setAttribute("index", ++newIndex);
							}
						}
						if(index == -1){
							if(highestIndex > 0)
								return add(ID, aORb, 3, highestIndex);
							else{
								var newNode = xml.createElement("Para");
								newNode.setAttribute("index", 0);
								newNode.setAttribute("isNewest", "true");
								newNodeText =  xml.createTextNode("New Para");
								newNode.appendChild(newNodeText)
								sections[i].appendChild(newNode);
								return saveFile(xml, "Para Added!");
							}
						}
						if(added == 1)
							return saveFile(xml, "Para Added!");
						else
							continue;
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
			if(type == 2){
				var options = document.getElementById(ID+"options");
				var value = document.getElementById(ID+"References").value;
				if(ID == sections[i].getAttribute("id")){
					newRef = xml.createElement("Ref");
					newRef.setAttribute("isNewest","true");
					newRefText = xml.createTextNode(value);
					newRef.appendChild(newRefText);
					sections[i].appendChild(newRef);
					if(options.style.display == 'block')
						options.style.display = 'none';
					return saveFile(xml, "Reference Added");
				}
			}
		}
		var reqs = xml.getElementsByTagName("Requirement");
		for(var i = 0; i < reqs.length; i++){
			if(type == 0 || type == 1 || type == 3){//If add Section or Requirement or Para
				if(ID == reqs[i].getAttribute("id")){
					if(type == 0){//If add Section
						newNode = xml.createElement("Section");
						newReqTitleText = xml.createTextNode("New Section");
					}
					else if(type == 1){//If add Requirement
						newNode = xml.createElement("Requirement");
						newReqTitleText = xml.createTextNode("New Requirement");
					}
					else if(type == 3){
						var paras = reqs[i].childNodes;
						for(var j = 0; j < paras.length; j++){
							if(paras[j].nodeName == "Para"){
								if(index == -1){
									var curIndex = paras[j].getAttribute("index");
									if(curIndex > highestIndex)
										highestIndex = curIndex;
								}
								if(index == paras[j].getAttribute("index")){
									if(paras[j].getAttribute("isNewest") == "false")
										continue;
									var newNode = paras[j].cloneNode(true);
									newNode.setAttribute("index", newIndex);
									newNode.childNodes[0].nodeValue = "New Para";
									if(aORb == 0){//If Add Above
										paras[j].setAttribute("index", ++newIndex);
										reqs[i].insertBefore(newNode, paras[j]);
										j++;
									}
									else if(aORb == 1){//If Add Below
										newNode.setAttribute("index", ++newIndex);
										var nextSibling = paras[j].nextSibling;
										j++;
										if(nextSibling == null)
											reqs[i].appendChild(newNode);
										else
											reqs[i].insertBefore(newNode, nextSibling);
									}
									added = 1;
								}
								if(added == 1)
									paras[j].setAttribute("index", ++newIndex);
							}
						}
						if(index == -1){
							if(highestIndex > 0)
								return add(ID, aORb, 3, highestIndex);
							else{
								var newNode = xml.createElement("Para");
								newNode.setAttribute("index", 0);
								newNode.setAttribute("isNewest", "true");
								newNodeText =  xml.createTextNode("New Para");
								newNode.appendChild(newNodeText)
								reqs[i].appendChild(newNode);
								return saveFile(xml, "Para Added!");
							}
						}
						if(added == 1)
							return saveFile(xml, "Para Added!");
						else
							continue;
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
		}
	}
	else{
		alert("Please open in Lifecycle Document Editor to enable this functionality");
		}
}
/////***START REMOVE FUNCTION***/////
//Type 	'0' = Section		
//		'1' = Requirement	
//		'2' = Reference		'fromID' = ID of section to remove Ref[ID] from
//		'3' = Para			'fromID' = Index of Para to remove
//		'4' = Image			'fromID' = Image path to remove
function remove(ID, fromID, type){
	if(sessvars.xml.length > 0){
		var xml = loadXML(sessvars.xml);
		var sections = xml.getElementsByTagName("Section");
		for(var i = 0; i < sections.length; i++){
			if(type == 2){
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
			else if(type ==3){
				if(ID == sections[i].getAttribute("id")){
					var paras = sections[i].childNodes;
					for(var j = 0; j < paras.length; j++){
						if(paras[j].nodeName == "Para"){
							if(fromID == paras[j].getAttribute("index")){
								if(paras[j].getAttribute("isNewest") == "false")
									continue;
								paras[j].setAttribute("isNewest", "false");
								return saveFile(xml, "Para Removed");
							}
						}
					}
				}
			}
		}
		var reqs = xml.getElementsByTagName("Requirement");
		for(var i = 0; i < reqs.length; i++){
			if(type == 2){
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
			else if(type == 3){
				if(ID == reqs[i].getAttribute("id")){
					var paras = reqs[i].childNodes;
					for(var j = 0; j < paras.length; j++){
						if(paras[j].nodeName == "Para"){
							if(fromID == paras[j].getAttribute("index")){
								paras[j].setAttribute("isNewest", "false");
								return saveFile(xml, "Para Removed");
							}
						}
					}
				}
			}
		}
		return alert("Error: Reference Not Found!");
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