function saveXML() {
	var fs = new ActiveXObject("Scripting.FileSystemObject");
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
	alert("File saved");
}