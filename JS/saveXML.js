function saveXML(xml) {
	var xml = loadXML(xml);
	var editInfo = document.getElementById("preview").innerHTML;
	var refStop = editInfo.search("<DIV id=refs>");
	if(refStop != -1){
		editInfo = editInfo.substring(-1, refStop);
		alert(editInfo);
	}
	var saveInfo = editInfo;
	//var saveInfo = document.getElementById("preview").innerHTML;
	var editedIdStart = saveInfo.search("<U>");
	var editedIdEnd = saveInfo.search(" - ");
	var editedId = saveInfo.substring(editedIdStart+3, editedIdEnd);
	var sections = xml.getElementsByTagName("Section");
	for(var i = 0; i < sections.length; i++){
		if(editedId == sections[i].getAttribute("id")){
			var editedParas = saveInfo.split("<DIV id=Para>");
			var originalParas = sections[i].getElementsByTagName("Para");
			for(var j = 0, k = 1; j < originalParas.length; j++, k++){
				while(originalParas[j].getAttribute("isNewest") != 'true')
					j++;
				var originalCheck = originalParas[j].childNodes[0].nodeValue;
				var editedEnd = editedParas[k].search("<BR>");
				var editedCheck = editedParas[k].substring(0, editedEnd);
				editedCheck = editedCheck.replace("&nbsp;", "");
				if(originalCheck != editedCheck){
					alert("You changed: "+originalCheck+"\nTo : "+editedCheck);
					originalParas[j].setAttribute("isNewest","false");
					editedPara = xml.createElement("Para");
					editedText=xml.createTextNode(editedCheck);
					editedPara.appendChild(editedText);
					editedPara.setAttribute("isNewest","true");
					sections[i].appendChild(editedPara);
					if(k == editedParas.length-1){
						while(j < originalParas.length){
							originalParas[j].setAttribute("isNewest","false");
							j++;
						}
					}
					break;
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
			break;
		}
	}
	//Calling loadXSLT() at the end should refresh to show changes. Currently calls getTabs() again though.
	loadXSLT(0,1);
}