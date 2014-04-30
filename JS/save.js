/////***START DOWNLOADASHTML FUNCTION***///
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
/////***START SAVEXML FUNCTION***///
function saveXML(xml) {
	var xml = loadXML(xml);
	saveParas(xml);
	//Calling loadXSLT() at the end should refresh to show changes. Currently calls getTabs() again though.
	loadXSLT(0,1);
}
/////***START SAVEFILE FUNCTION***///
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