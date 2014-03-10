function saveXML() {
	var file_location = "../XML/"+getFromCookie("fileName")+"TestSave.xml";
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var xmlArray = sessvars.xml.split(';');
	var newFile = "<?xml version='1.0' encoding='UTF-8'?>\n";
	for(i = 1; i < xmlArray.length; i++){
		var value = xmlArray[i].split('=');
		value[0] = value[0].replace(' ','');
		newFile += "<"+value[0]+">";
		newFile += value[1];
		newFile += "</"+value[0]+">\n";
	}
	file = fs.CreateTextFile(file_location, true);
	file.write(newFile);
	file.close();
}