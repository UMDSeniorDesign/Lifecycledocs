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
	else
		xml = loadProject(xml);
	var textVersion = xml.xml;
	var styleStringStart = textVersion.search("href=");
	var styleStringPart = textVersion.substring(styleStringStart);
	var styleStringEnd = styleStringPart.search(">");
	var styleName = styleStringPart.substring(6, styleStringEnd-2);
	//sessvars.xsl = styleName;
	xsl = loadXML(styleName);
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
	if (typeof type === 'undefined')
		alert("File saved");
}
/////***START DOWNLOADPROJECT FUNCTION***/////
function downloadProject(xml){
	var project = loadProject(xml);
	var fileNames = project.getElementsByTagName("file_location");
	for(var i = 0; i < fileNames.length; i++) {
		var filename = fileNames[i].childNodes[0].getAttribute("href");
		downloadAsHTML(filename, 0);
	}
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
function saveParas(xml){
	var xml = loadXML(xml);
	var saveInfo = document.getElementById("section").innerHTML;
	var editedIdStart = saveInfo.search("<U>");
	var editedIdEnd = saveInfo.search(" - ");
	var editedId = saveInfo.substring(editedIdStart+3, editedIdEnd);
	var sections = xml.getElementsByTagName("Section");
	for(var i = 0; i < sections.length; i++){
		if(editedId == sections[i].getAttribute("id")){
			var originalParas = sections[i].getElementsByTagName("Para");
			for(var j = 0, k = 0; j < originalParas.length; j++, k++){
				while(originalParas[j].getAttribute("isNewest") != 'true')
					j++;
				var editedPara = document.getElementById(editedId+"Para"+k).value;
				var originalCheck = originalParas[j].childNodes[0].nodeValue;
				editedCheck = editedPara.replace("&nbsp;", "");
				if(originalCheck != editedCheck){
					//alert("You changed: "+originalCheck+"\nTo : "+editedCheck);
					originalParas[j].setAttribute("isNewest","false");
					editedPara = xml.createElement("Para");
					editedText=xml.createTextNode(editedCheck);
					editedPara.appendChild(editedText);
					editedPara.setAttribute("isNewest","true");
					editedPara.setAttribute("index", k);
					sections[i].appendChild(editedPara);
					return saveFile(xml, "File Saved!", editedId);
				}
			}
		}
	}
}
/////***START SAVEFILE FUNCTION***/////
function saveFile(xml, alertText, ID){
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	//If windows 7, use this line
	var f = fs.GetFolder("../XML");
	//If windows 8, use this line
	//var f = fs.GetFolder("\XML");
	file = f.CreateTextFile("testSave.xml", true, true);
	file.write(xml.xml);
	file.close();
	alert(alertText);
	loadXSLT(0,1, ID);
}