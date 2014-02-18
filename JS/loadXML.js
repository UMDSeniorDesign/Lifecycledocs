function loadXML(file_name) {
	var XML = new ActiveXObject("Msxml2.DOMDocument.6.0");
	XML.async = false;
	XML.load("../XML/" + file_name + ".xml");
				
	return XML;
}