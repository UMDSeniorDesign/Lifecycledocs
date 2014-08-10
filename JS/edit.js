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
//ID	'0' = addFromTools	- If ID == 0 then the tools menu made the call
//Type 	'0' = Section		'aORb' = 0 - Add Section above
//		'1' = Requirement	'aORb' = 0 - Add Requirement above
//		'2' = Reference		
//		'3' = Para			'aORb' = 0 - add Para above
//		'4' = Image			'aORb' = 0 - add Image above
function add(ID, aORb, type, index){ 
	if(sessvars.xml.length > 0){
		var xml = loadXML(sessvars.xml);
		var newIndex = index;
		var added = 0;
		if(ID == 0){
			var div = document.getElementById("view");
			var divHTML = div.innerHTML
			var start = divHTML.search("<U>");
			var divSub = divHTML.substring(start+3);
			var idEnd = divSub.search(" - ");
			var divID = divSub.substring(-1, idEnd);
			if(aORb == 0)
				showMenu(divID, 3);
			else if(aORb == 1)
				add(divID, 1, 3, -1);
			else if(aORb == 2){
				if(index != "" && index != undefined){
					var locArray = index.split("\\");
					var imageName = locArray[locArray.length-1];
					var imagePath = "../Images/"+imageName;
					//This is where we would copy the file to the Image folder
					return add(divID, 0, 4, imagePath);
				}
				else
					add(divID, 0, 2);
			}
		}
		var sections = xml.getElementsByTagName("Section");
		for(var i = 0; i < sections.length; i++){
			if(type == 0 || type == 1 || type == 3 || type == 4){//If add Section or Requirement or Para or Image
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
									var curIndex = parseInt(paras[j].getAttribute("index"));
									if(curIndex > highestIndex)
										highestIndex = curIndex;
								}
								if(index == parseInt(paras[j].getAttribute("index"))){
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
								//if(added == 1)
									//paras[j].setAttribute("index", ++newIndex);
							}
						}
						if(index == -1){
							if(highestIndex > 0){
								//alert(highestIndex);
								return add(ID, aORb, 3, highestIndex);
								}
							else{
								var newNode = xml.createElement("Para");
								newNode.setAttribute("index", (highestIndex + 1));
								newNode.setAttribute("isNewest", "true");
								newNodeText =  xml.createTextNode("New Para");
								newNode.appendChild(newNodeText)
								sections[i].appendChild(newNode);
								return saveFile(xml, "Para Added!", ID);
							}
						}
						if(added == 1)
							return saveFile(xml, "Para Added!", ID);
						else
							continue;
					}
					else if(type == 4){
						newNode = xml.createElement("Image");
						newImagePath = xml.createTextNode(index);
						newNode.appendChild(newImagePath);
						sections[i].appendChild(newNode);
						return saveFile(xml, "Image Added!", ID);
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
					newSectionParaElement.setAttribute("index","0");
					newNode.appendChild(newSectionParaElement);
					//Add test result stuff
					newSectionTestResultElement = xml.createElement("TestResult");
					newSectionTestResultText = xml.createTextNode("false");
					newSectionTestResultElement.appendChild(newSectionTestResultText);
					newNode.appendChild(newSectionTestResultElement);
					//add approvedBy
					newSectionApprovedByElement = xml.createElement("ApprovedBy");
					newSectionApprovedByElement.setAttribute("isNewest", "true");
					newApprovedByName = xml.createElement("Name");
					newApprovedByNameText = xml.createTextNode("Insert Name");
					newApprovedByName.setAttribute("isNewest", "true");
					newApprovedByName.appendChild(newApprovedByNameText);
					newApprovedByComment = xml.createElement("Para");
					newApprovedByCommentText = xml.createTextNode("Comments");
					newApprovedByComment.setAttribute("isNewest", "true");
					newApprovedByComment.setAttribute("index", "0");
					newApprovedByComment.appendChild(newApprovedByCommentText);
					newSectionApprovedByElement.appendChild(newApprovedByName);
					newSectionApprovedByElement.appendChild(newApprovedByComment);
					newNode.appendChild(newSectionApprovedByElement)
					
					var parentNode = sections[i].parentNode;
					if(aORb == 0){//If add above
						parentNode.insertBefore(newNode, sections[i]);
						reNumber(xml, parentNode, sections[i]);
					}
					else if(aORb == 1){//If add below
						var nextSibling = sections[i].nextSibling;
						if(nextSibling == null){
							var parentNode = sections[i].parentNode;
							parentNode.appendChild(newNode);
							reNumber(xml, parentNode, sections[i]);
						}
						else{
							var parentNode = nextSibling.parentNode;
							parentNode.insertBefore(newNode, nextSibling);
							reNumber(xml, parentNode, sections[i]);
						}
					}
					else if(aORb == 3){//If add sub
						sections[i].appendChild(newNode);
						reNumber(xml, parentNode, sections[i]);
					}
					return saveFile(xml, "Added to Section", ID);
				}				
			}
			if(type == 2){
				var options = document.getElementById("refOptions");
				var value = document.getElementById("refOptions").value;
				if(ID == sections[i].getAttribute("id")){
					newRef = xml.createElement("Ref");
					newRef.setAttribute("isNewest","true");
					newRefText = xml.createTextNode(value);
					newRef.appendChild(newRefText);
					sections[i].appendChild(newRef);
					if(options.style.display == 'block')
						options.style.display = 'none';
					return saveFile(xml, "Reference Added", ID);
				}
			}
		}
		var reqs = xml.getElementsByTagName("Requirement");
		for(var i = 0; i < reqs.length; i++){
			if(type == 0 || type == 1 || type == 3 || type ==4){//If add Section or Requirement or Para
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
									var curIndex = parseInt(paras[j].getAttribute("index"));
									if(curIndex > highestIndex)
										highestIndex = curIndex;
								}
								if(index == parseInt(paras[j].getAttribute("index"))){
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
								//if(added == 1)
									//paras[j].setAttribute("index", ++newIndex);
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
								return saveFile(xml, "Para Added!", ID);
							}
						}
						if(added == 1)
							return saveFile(xml, "Para Added!", ID);
						else
							continue;
					}
					else if(type == 4){
						newNode = xml.createElement("Image");
						newImagePath = xml.createTextNode(index);
						newNode.appendChild(newImagePath);
						sections[i].appendChild(newNode);
						return saveFile(xml, "Image Added!", ID);
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
					newReqParaElement.setAttribute("index","0");
					newNode.appendChild(newReqParaElement);
					//Add test result stuff
					newSectionTestResultElement = xml.createElement("TestResult");
					newSectionTestResultText = xml.createTextNode("false");
					newSectionTestResultElement.appendChild(newSectionTestResultText);
					newNode.appendChild(newSectionTestResultElement);
					//add approvedBy
					newSectionApprovedByElement = xml.createElement("ApprovedBy");
					newSectionApprovedByElement.setAttribute("isNewest", "true");
					newApprovedByName = xml.createElement("Name");
					newApprovedByNameText = xml.createTextNode("Insert Name");
					newApprovedByName.setAttribute("isNewest", "true");
					newApprovedByName.appendChild(newApprovedByNameText);
					newApprovedByComment = xml.createElement("Para");
					newApprovedByCommentText = xml.createTextNode("Comments");
					newApprovedByComment.setAttribute("isNewest", "true");
					newApprovedByComment.setAttribute("index", "0");
					newApprovedByComment.appendChild(newApprovedByCommentText);
					newSectionApprovedByElement.appendChild(newApprovedByName);
					newSectionApprovedByElement.appendChild(newApprovedByComment);
					newNode.appendChild(newSectionApprovedByElement)
					var parentNode = reqs[i].parentNode;
					parentNode.insertBefore(newNode, reqs[i]);
					if(aORb == 0){//If add above
						parentNode.insertBefore(newNode, reqs[i]);
						reNumber(xml, parentNode, reqs[i]);
					}
					else if(aORb == 1){//If add below
						var nextSibling = reqs[i].nextSibling;
						if(nextSibling == null){
							var parentNode = reqs[i].parentNode;
							parentNode.appendChild(newNode);
							reNumber(xml, parentNode, reqs[i]);
						}
						else{
							var parentNode = nextSibling.parentNode;
							parentNode.insertBefore(newNode, nextSibling);
							reNumber(xml, parentNode, reqs[i]);
						}
					}
					else if(aORb == 3){//If add sub
						reqs[i].appendChild(newNode);
						reNumber(xml, parentNode, reqs[i]);
					}
					return saveFile(xml, "Added to Requirement", ID);
				}
			}
			if(type == 2){
				var options = document.getElementById("refOptions");
				var value = document.getElementById("refOptions").value;
				if(ID == reqs[i].getAttribute("id")){
					newRef = xml.createElement("Ref");
					newRef.setAttribute("isNewest","true");
					newRefText = xml.createTextNode(value);
					newRef.appendChild(newRefText);
					reqs[i].appendChild(newRef);
					if(options.style.display == 'block')
						options.style.display = 'none';
					return saveFile(xml, "Reference Added", ID);
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
			if(type == 0){
				if(sections[i].getAttribute("isNewest") == 'true'){
					if(ID == sections[i].getAttribute("id")){
						sections[i].setAttribute("isNewest", 'false');
						var returnString = ("Removed Section "+ID);
						var parent = sections[i].parentNode;
						var returnID = parent.getAttribute("id");
						reNumber(xml, parent, sections[i]);
						return saveFile(xml, returnString, returnID);
					}
				}
			}
			if(type == 2){
				if(fromID == sections[i].getAttribute("id")){
					var refs = sections[i].childNodes;
					for(var j = 0; j < refs.length; j++){
						if(refs[j].nodeName == "Ref"){
							if(ID == refs[j].childNodes[0].nodeValue){
								refs[j].setAttribute("isNewest", "false");
								return saveFile(xml, "Reference Removed", fromID);
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
							if(fromID == parseInt(paras[j].getAttribute("index"))){
								if(paras[j].getAttribute("isNewest") == "false")
									continue;
								paras[j].setAttribute("isNewest", "false");
								return saveFile(xml, "Para Removed", ID);
							}
						}
					}
				}
			}
			else if(type == 4){
				if(ID == sections[i].getAttribute("id")){
					var imagePaths = sections[i].childNodes;
					for(var j = 0; j < imagePaths.length; j++){
						if(imagePaths[j].nodeName == "Image"){
							if(imagePaths[j].childNodes[0].nodeValue == fromID){
								sections[i].removeChild(imagePaths[j]);
								return saveFile(xml, "Image Removed", ID);
							}
						}
					}
				}
			}
		}
		var reqs = xml.getElementsByTagName("Requirement");
		for(var i = 0; i < reqs.length; i++){
			if(type == 1){
				if(reqs[i].getAttribute("isNewest") == 'true'){
					if(ID == reqs[i].getAttribute("id")){
						reqs[i].setAttribute("isNewest", 'false');
						var returnString = ("Removed Requirement "+ID);
						var parent = reqs[i].parentNode;
						var returnID = parent.getAttribute("id");
						reNumber(xml, parent, sections[i]);
						return saveFile(xml, returnString, returnID);
					}
				}
			}
			if(type == 2){
				if(fromID == reqs[i].getAttribute("id")){
					var refs = reqs[i].childNodes;
					for(var j = 0; j < refs.length; j++){
						if(refs[j].nodeName == "Ref"){
							if(ID == refs[j].childNodes[0].nodeValue){
								refs[j].setAttribute("isNewest", "false");
								return saveFile(xml, "Reference Removed", fromID);
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
							if(fromID == parseInt(paras[j].getAttribute("index"))){
								paras[j].setAttribute("isNewest", "false");
								return saveFile(xml, "Para Removed", ID);
							}
						}
					}
				}
			}
			else if(type == 4){
				if(ID == reqs[i].getAttribute("id")){
					var imagePaths = reqs[i].childNodes;
					for(var j = 0; j < imagePaths.length; j++){
						if(imagePaths[j].nodeName == "Image"){
							if(imagePaths[j].childNodes[0].nodeValue == fromID){
								reqs[i].removeChild(imagePaths[j]);
								return saveFile(xml, "Image Removed", ID);
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
function changeTitle(ID, newName){
	var xml = loadXML(sessvars.xml);
	var newTitle = newName;
	var sections = xml.getElementsByTagName("Section");
	for(var i = 0; i < sections.length; i++){
		if(ID == sections[i].getAttribute("id")){
			var titles = sections[i].childNodes;
			for(var j = 0; j < titles.length; j++){
				if(titles[j].nodeName == "Title" && titles[j].getAttribute("isNewest") == 'true'){
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
					//alert(titles[j].childNodes[0].nodeValue+" Changed to: "+newTitle);
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
					//alert(titles[j].childNodes[0].nodeValue+" Changed to: "+newTitle);
				}
			}
		}
	}
	return saveFile(xml, "Title Changed", ID);
}
/////***START RENUMBERFUNCTION***/////
function reNumber(xml, parent, newNode){
	var parentId = parent.getAttribute("id");
	var parentIdArray = [];
	var startIndex = 0;
	var prefix = "";
	var oldIdArray = [];
	var newIdArray = [];
	if(parentId == undefined){
		var prefixArray = newNode.getAttribute("id").split(".");
		var numIndex = prefixArray[0].search(/\d+/g);
		prefix = prefixArray[0].substring(-1, numIndex);
	}
	else{
		var parentIdArray = parentId.split(".");
		if(parentIdArray[parentIdArray.length-1] == 0)
			parentIdArray.pop();
	}
	//var sections = parent.getElementsByTagName(newNode.nodeName);
	var sections = parent.getElementsByTagName("Section");
	var reqs = parent.getElementsByTagName("Requirement");
	var childs = parent.childNodes;
	var firstChild = parent.firstChild;
	for(var i = 0; i < childs.length; i++){
		if(firstChild.nodeType == 8){
			firstChild = firstChild.nextSibling;
			continue;
		}
		if(firstChild.getAttribute("isNewest") == 'false'){
			firstChild = firstChild.nextSibling;
			continue;
		}
		if(firstChild.nodeName == 'Section' || firstChild.nodeName == 'Requirement'){
			startIndex++;
			if(parentId == undefined){
				var pre = prefix+startIndex;
				parentIdArray.push(pre);
			}
			else
				parentIdArray.push(startIndex);
			var oldId = firstChild.getAttribute("id");
			oldIdArray.push(oldId);
			var newId = parentIdArray.join(".");
			if(parentId == undefined)
				newId = (newId+".0");
			newIdArray.push(newId);
			firstChild.setAttribute("id", newId);
			parentIdArray.pop();
			var sectionChildren = firstChild.getElementsByTagName("Section")
			var reqChildren = firstChild.getElementsByTagName("Requirement");
			if(sectionChildren.length > 0 || reqChildren.length > 0)
				reNumber(xml, firstChild)
		}
		firstChild = firstChild.nextSibling;
	}
	//alert("oldIdArray: "+oldIdArray+" - newIdArray: "+newIdArray);
	checkReferences(oldIdArray, newIdArray);
}
/////***START CHECKREFERENCES FUNCTION***/////
function checkReferences(oldIds, newIds){
	var originalName = sessvars.xml;
	var project = loadProject(sessvars.projectName);
	var files = project.getElementsByTagName("file_location");
	for(var i = 0; i < files.length; i++){
		var fileElement = files[i].getElementsByTagName("xi:include")[0];
		var fileName = fileElement.getAttribute("href");
		var xml = loadXML(fileName);
		var sections = xml.getElementsByTagName("Section");
		for(var j = 0; j < sections.length; j++){
			var refs = sections[j].getElementsByTagName("Ref");
			for(var k = 0; k < refs.length; k++){
				for(var n = 0; n < oldIds.length; n++){
					if(refs[k].childNodes[0].nodeValue == oldIds[n]){
						refs[k].childNodes[0].nodeValue = newIds[n];
						//alert("Changed ref: "+oldIds[n]+" in: "+fileName+" to: "+refs[k].childNodes[0].nodeValue);
					}
				}
			}
		}
		var reqs = xml.getElementsByTagName("Requirement");
		for(var j = 0; j < reqs.length; j++){
			if(reqs[i].getElementsByTagName("Ref").length > 0){
				var refs = reqs[i].getElementsByTagName("Ref");
				for(var k = 0; k < refs.length; k++){
					for(var n = 0; n < oldIds.length; n++){
						if(refs[k].childNodes[0].nodeValue == oldIds[n]){
							refs[k].childNodes[0].nodeValue = newIds[n];
							//alert("Changed ref: "+oldIds[n]+" in: "+fileName+" to: "+refs[k].childNodes[0].nodeValue);
						}
					}
				}
			}
		}
		sessvars.xml = fileName;
		saveFile(xml, -1);
	}
	sessvars.xml = originalName;
}