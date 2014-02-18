function saveXML() {
	var file_location = "../text.txt";
	var fs = new ActiveXObject("Scripting.FileSystemObject");
				
	file = fs.CreateTextFile(file_location, true);
	file.write(document.getElementById("textInput").value);
	file.close();
}