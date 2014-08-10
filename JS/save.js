/////***START DISPLAYDOWNLOADS FUNCTION***/////
function displayDownloads(projectName) {
	var start = "<div id='downloadOptions' style='display:none;'>";
	var end = "</div>";
	var project = loadProject(projectName);
	var downloadDisplay = project.getElementsByTagName("file_location");
	var div = document.getElementById("buttons");
	var tableString = start;
	for(var i = 0; i < downloadDisplay.length; i++) {
		var filename = downloadDisplay[i].childNodes[0].getAttribute("href");
		tableString += ("<button onclick=downloadAsHTML('"+filename+"') style='width:250px'>"+"Download "+filename+"</button>");
		//tableString += ("<select id='"+filename+"'Stylesheets'>");
		//tableString += "</select>";
		tableString += ("</br>");
	}
	tableString += ("<button style='width:250px' onclick=downloadProject('"+projectName+"')>"+"Download Project"+"</button></br>");
	tableString += end;
	div.innerHTML += tableString;
	showMenu(tableString, 5);
}
/////***START DOWNLOADASHTML FUNCTION***/////
function downloadAsHTML(xml, type){
	var xmlName = xml;
	if(type != 1)
		xml = loadXML(xml);
	else if(type != -1)
		xml = loadProject(xml);
	var textVersion = xml.xml;
	var styleStringStart = textVersion.search("href=");
	var styleStringPart = textVersion.substring(styleStringStart);
	var styleStringEnd = styleStringPart.search(">");
	var styleName = styleStringPart.substring(6, styleStringEnd-2);
	//sessvars.xsl = styleName;
	xsl = loadXML(styleName);
	if(type == -1 || type == -2){
		xsl = loadXML("RTM.xsl");
		xmlName = xmlName.substring(-1,xmlName.length-4);
		xmlName += "RTM.xml";
	}
	var value = xml.transformNode(xsl);
	
	filename = xmlName.substring(-1,xmlName.length-4);
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	//If windows 7, use this line
	var f = fs.GetFolder("../Saves");
	//If windows 8, use this line
	//var f = fs.GetFolder("\XML");
	file = f.CreateTextFile(filename+".html", true, true);
	file.write(value);
	file.close();
	if (typeof type === 'undefined' || type == -2)
		alert("File saved");
}
/////***START DOWNLOADPROJECT FUNCTION***/////
function downloadProject(xml){
	var project = loadProject(xml);
	var firstFile = "";
	var fileNames = project.getElementsByTagName("file_location");
	for(var i = 0; i < fileNames.length; i++) {
		if(i == 0)
			firstFile = fileNames[i].childNodes[0].getAttribute("href");
		var filename = fileNames[i].childNodes[0].getAttribute("href");
		downloadAsHTML(filename, 0);
	}
	downloadAsHTML(xml, -1);
	downloadAsHTML(xml, 1);
	alert("Project saved");
}
/////***START PREVIEWASDOCUMENT FUNCTION***/////
function previewAsDocument(){
	var xml = loadXML(sessvars.xml);
	var xsl = loadXML("documentXSL.xsl");
	var preview = xml.transformNode(xsl);
	
	var filename = sessvars.xml.substring(-1,sessvars.xml.length-4);
	filename += "DocFormat.html";
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	//If windows 7, use this line
	var f = fs.GetFolder("../Saves");
	//If windows 8, use this line
	//var f = fs.GetFolder("\Saves");
	file = f.CreateTextFile(filename, true, true);
	file.write(preview);
	file.close();
	
	//document.location.href = ("../Saves/"+filename);
	window.open("../Saves/"+filename);
}
/////***START SAVEPARAS FUNCTION***/////

//PLEASE NOTE WE ONLY ALLOW EDITING ONE PARA PER SAVE!!!!!

function saveParas(xml){
	var found = 0;
	var xml = loadXML(xml);
	var saveMe = document.getElementById("view");
	var saveInfo = document.getElementById("view").innerHTML;
	var editedIdStart = saveInfo.search("<U>");
	var editedIdEnd = saveInfo.search(" - ");
	var editedId = saveInfo.substring(editedIdStart+3, editedIdEnd);
	var sections = xml.getElementsByTagName("Section");
	var viewParas = saveMe.getElementsByTagName("textarea");
	for(var i = 0; i < sections.length; i++){
		if(editedId == sections[i].getAttribute("id")){
			found = 1;
			var editingNode = sections[i];
		}
	}
	if(found == 0){
		var reqs = xml.getElementsByTagName("Requirement");
		for(var i = 0; i < reqs.length; i++){
			if(editedId == reqs[i].getAttribute("id")){
				found = 1;
				var editingNode = reqs[i];
			}
		}
	}
	if(found != 1)
		return alert("Save Error!");
	var cNodes = editingNode.childNodes;
	var originalParas = [];
	for(var g = 0; g < cNodes.length; g++){
		if((cNodes[g].nodeName == "Para") && (cNodes[g].getAttribute("isNewest") == "true"))
			originalParas[cNodes[g].getAttribute("index")] = cNodes[g];
			//originalParas.push(cNodes[g]);
	}
	if(originalParas[0] != null)
		var index = parseInt(originalParas[0].getAttribute("index"));
	/* just picked 99 random, so it's not 0-10
	alert("originalParas length=" + originalParas.length);
	for(var j = 0, k = 0; j < originalParas.length; j++, k++){
		while(j < originalParas.length && (originalParas[j].nodeName != "Para" || originalParas[j].getAttribute("isNewest") != 'true')){
			j++;
			index = j;
			}
	}*/
	
	for(var m = 0; m < viewParas.length; m++){
		//This is where we check to make sure we are comparing the correct textarea to the xml
		//var nodeIndex = originalParas[m].childNodes[0].getAttribute("index");
		if(originalParas[m] == null)
			continue;
		var nodeVal = originalParas[m].childNodes[0].nodeValue;
		var viewVal = viewParas[m].value;
		
		/*
		this is where the error occurs.
		regardless if nodeVal and viewVal, the if statement gets executed every single time.
		the if statement doesnt seem like its evaluating the (nodeVal != viewVal)
		because its executing the index=  alert everytime in the for-loop,
		which the if statement should only execute on the newly editted para.
		*/
		
		//alert("nodeVal=" + nodeVal + " viewVal=" + viewVal);
		if(nodeVal != viewVal){
			var editedPara = viewParas[m].value;
			index = m; //Index should be position of updated para
			//alert("index=" + index);
			//alert("editedPara=" + editedPara);
			//alert(originalParas[m].childNodes[0].nodeValue + " viewPara value = " + viewParas[m].value);
		}
		
		
		
	}

	var originalCheck = originalParas[index].childNodes[0].nodeValue;
	var editedCheck = editedPara;//.replace("&nbsp;", "");
	
	//alert(originalCheck + " and " + editedCheck);
	if((originalCheck != editedCheck) && (editedCheck != undefined) && (editedCheck != "")){
		alert("You changed "+editingNode.getAttribute("id")+" : "+originalCheck+"\nTo "+editedId+" : "+editedCheck);
		
		
		/*this index here doesnt match the stuff in the index below when we setAttribute index
		the index for original paras is no longer the index in xml?
		*/
		originalParas[index].setAttribute("isNewest","false");
		
		editedPara = xml.createElement("Para");
		editedText=xml.createTextNode(editedCheck);
		editedPara.appendChild(editedText);
		editedPara.setAttribute("isNewest","true");
		editedPara.setAttribute("index", index);
		editingNode.appendChild(editedPara);
		originalParas.length = 0; //Trying to reset array here
		
		//This originalParas needs to be refreshed with the editted text
		/*for(var z = 0; z < cNodes.length; z++){
			//alert(cNodes[z].getAttribute("isNewest") == "true");
			if((cNodes[z].nodeName == "Para") && (cNodes[z].getAttribute("isNewest") == "true")){
				originalParas.push(cNodes[z]);
				alert("myString1");
			}
			//alert("originalCheck=" + originalCheck); // originalParas[g].childNodes[0].nodeValue);
		
		}*/
			
		//This alert should be the updated para after it was changed
		//alert("last index= " + index);
		return saveFile(xml, "File Saved!", editedId);
	}
}
/////***START SAVEFILE FUNCTION***/////
function saveFile(xml, alertText, ID){
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	//If windows 7, use this line
	var f = fs.GetFolder("../XML");
	//If windows 8, use this line
	//var f = fs.GetFolder("\XML");
	file = f.CreateTextFile(sessvars.xml, true, true);
	file.write(xml.xml);
	file.close();
	if(alertText != -1){
		alert(alertText);
		loadXSLT(0,1, ID);
	}
}