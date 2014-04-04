function getElementsById(id) {
  return [document.getElementById(id)];
}

function saveXML(xml) {
	var saveInfo = document.getElementById("edit").innerHTML;
	alert(saveInfo);
	var editedIdStart = saveInfo.search("<U>");
	var editedIdEnd = saveInfo.search(" - ");
	var editedId = saveInfo.substring(editedIdStart+3, editedIdEnd);
	var sections = xml.getElementsByTagName("Section");
	for(var i = 0; i < sections.length; i++){
		if(editedId == sections[i].getAttribute("id")){
			var editedParas = saveInfo.split("<DIV id=Para>");
			var originalParas = sections[i].getElementsByTagName("Para");
			//alert("Original Para 1: "+originalParas[0].childNodes[0].nodeValue);
			//editedParas[1] = editedParas[1].substring(0, editedParas[1].length-12);
			//alert("Edited Para 1: "+editedParas[1]);
			for(var j = 0; j < originalParas.length; j++){
				var originalCheck = originalParas[j].childNodes[0].nodeValue;
				var editedEnd = editedParas[j+1].search("<BR>");
				var editedCheck = editedParas[j+1].substring(0, editedEnd);
				if(originalCheck != editedCheck){
					alert("You changed: "+originalCheck+"\nTo : "+editedCheck);
					originalParas[j].setAttribute("isNewest","false");
					editedPara = xml.createElement("Para");
					editedText=xml.createTextNode(editedCheck);
					editedPara.appendChild(editedText);
					editedPara.setAttribute("isNewest","true");
					sections[i].appendChild(editedPara);
					//break;
					}
			}
			//var para = sections[i].getElementsByTagName("Para");
			//var paraClone = para[0].cloneNode(true);
			
			//editedPara = xml.createElement("Para");
			//editedText=xml.createTextNode(saveInfo);
			//editedPara.appendChild(editedText);
			//sections[i].appendChild(editedPara);
			//loadXSLT();
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
	}
	
	/*var fs = new ActiveXObject("Scripting.FileSystemObject");
	var xmlArray = sessvars.xml.split(';');
	var newFile = "<?xml version='1.0' encoding='UTF-8'?>\n";
	function writeChild(index){
		var increment = index
		var childValue = xmlArray[index].split('=');
		childValue[0] = childValue[0].replace(' ','');
		newFile += "<"+childValue[0]+">";
		if(childValue[1] == "null"){
			writeChild(increment++);
		}
		else{
			newFile += childValue[1];
		}
		newFile += childValue[1];
		newFile += "</"+childValue[0]+">\n";
	}
	for(var i = 1; i < xmlArray.length; i++){
		var value = xmlArray[i].split('=');
		value[0] = value[0].replace(' ','');
		newFile += "<"+value[0]+">";
		if(value[1] == "null"){
			writeChild(++i);
		}
		else{
			newFile += value[1];
		}
		newFile += "</"+value[0]+">\n";
	}
	//If windows 7, use this line
	//var f = fs.GetFolder("../XML");
	//If windows 8, use this line
	var f = fs.GetFolder("\XML");
	file = f.CreateTextFile(getFromSessvar("fileName")+"TestSave.xml", true, true);
	file.write(newFile);
	file.close();
	alert("File saved");*/
}