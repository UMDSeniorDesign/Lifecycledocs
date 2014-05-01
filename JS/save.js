/////***START DOWNLOADASHTML FUNCTION***/////
function downloadAsHTML(xml){
	xml = loadXML(xml);
	var textVersion = xml.xml;
	var styleStringStart = textVersion.search("href=");
	var styleStringPart = textVersion.substring(styleStringStart);
	var styleStringEnd = styleStringPart.search(">");
	var styleName = styleStringPart.substring(6, styleStringEnd-2);
	sessvars.xsl = styleName;
	xsl = loadXML(sessvars.xsl);
	var value = xml.transformNode(xsl);
	
	filename = sessvars.xml.substring(-1,sessvars.xml.length-4);
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	//If windows 7, use this line
	var f = fs.GetFolder("../Saves");
	//If windows 8, use this line
	//var f = fs.GetFolder("\XML");
	file = f.CreateTextFile(filename+".html", true, true);
	file.write(value);
	file.close();
	alert("File saved");
}
/////***START SAVEPARAS FUNCTION***/////
function saveParas(xml){
	var saveInfo = document.getElementById("section").innerHTML;
	var editedIdStart = saveInfo.search("<U>");
	var editedIdEnd = saveInfo.search(" - ");
	var editedId = saveInfo.substring(editedIdStart+3, editedIdEnd);
	var sections = xml.getElementsByTagName("Section");
	for(var i = 0; i < sections.length; i++){
		if(editedId == sections[i].getAttribute("id")){
			var originalParas = sections[i].getElementsByTagName("Para");
			for(var j = 0, k = 1; j < originalParas.length; j++, k++){
				while(originalParas[j].getAttribute("isNewest") != 'true')
					j++;
				var editedPara = document.getElementById(editedId+"Para"+k).value;
				var originalCheck = originalParas[j].childNodes[0].nodeValue;
				editedCheck = editedPara.replace("&nbsp;", "");
				if(originalCheck != editedCheck){
					alert("You changed: "+originalCheck+"\nTo : "+editedCheck);
					originalParas[j].setAttribute("isNewest","false");
					editedPara = xml.createElement("Para");
					editedText=xml.createTextNode(editedCheck);
					editedPara.appendChild(editedText);
					editedPara.setAttribute("isNewest","true");
					editedPara.setAttribute("index", k);
					sections[i].appendChild(editedPara);
					return saveFile(xml, "File Saved!");
				}
			}
		}
	}
}
/////***START SAVEXML FUNCTION***/////
function saveXML(xml) {
	var xml = loadXML(xml);
	saveParas(xml);
	//Calling loadXSLT() at the end should refresh to show changes. Currently calls getTabs() again though.
	loadXSLT(0,1);
}
/////***START SAVEFILE FUNCTION***/////
function saveFile(xml, alertText){
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	//If windows 7, use this line
	var f = fs.GetFolder("../XML");
	//If windows 8, use this line
	//var f = fs.GetFolder("\XML");
	file = f.CreateTextFile("TestSave.xml", true, true);
	file.write(xml.xml);
	file.close();
	alert(alertText);
}