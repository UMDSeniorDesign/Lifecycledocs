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
function downloadAsHTML(){
	xml = loadXML(sessvars.xml);
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