function loadXML(file_name) {
	var XML = new ActiveXObject("Msxml2.DOMDocument.6.0");
	XML.setProperty("AllowDocumentFunction", true);
	XML.async = false;
	XML.load("../XML/" + file_name);
	return XML;
}

function loadProject(file_name) {
	var project = new ActiveXObject("Msxml2.DOMDocument.6.0");
	project.setProperty("AllowDocumentFunction", true);
	project.async = false;
	project.load("../Projects/" + file_name);
	return project;
}