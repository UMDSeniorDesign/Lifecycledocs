/////***START GETTABS FUNCTION***///
function getTabs() {
	var table = "<table border='2' border-style='groove' border-color='black'>";
	var endtable="</table>";
	var tr = "<tr>";
	var td = "<td>";
	var etr = "</tr>";
	var etd = "</td>";
	var tableString = "";
	var project = loadProject(sessvars.projectName);
	var filesToLoad = project.getElementsByTagName("file_location");
	var div = document.getElementById("head1");
	
	tableString += table;
	tableString +=tr;
	for(var i = 0; i < filesToLoad.length; i++) {
		var filename = filesToLoad[i].childNodes[0].getAttribute("href");
		if(i == 0){
			sessvars.first = filename;
		}
		
		tableString += td;
		tableString += ("<button onclick=loadXSLT(0,0,'"+filename+"')>"+filename+"</button>");
		tableString += etd;
		
		
	}
	tableString +=etr;
	tableString += endtable;
	div.innerHTML += tableString;
}
/////***START LOADXSLT FUNCTION***///
function loadXSLT(withTabs, withCurrent, xmlToLoad){
	var xml;
	var xsl;
	//Load tabs from project file
	if(withTabs == 1){
		getTabs();
		xmlToLoad = sessvars.first;
	}
	
	//Load XML and XSL '0' = loadnew '1' = reload with current
	if(withCurrent == 0){
		sessvars.xml = xmlToLoad;
		xml = loadXML(sessvars.xml);
		var textVersion = xml.xml;
		var styleStringStart = textVersion.search("href=");
		var styleStringPart = textVersion.substring(styleStringStart);
		var styleStringEnd = styleStringPart.search(">");
		var styleName = styleStringPart.substring(6, styleStringEnd-2);
		sessvars.xsl = styleName;
		xsl = loadXML(sessvars.xsl);
	}
	
	if(withCurrent == 1){
		xml = loadXML(sessvars.xml);
		xsl = loadXML(sessvars.xsl);
	}
	
	//Transform XML to HTML
	var value = xml.transformNode(xsl);
	
	//Search for script in generated HTML, this should be put into a loop in case of multiple scripts
	var scriptStart = value.search("<script>");
	var scriptEnd = value.search("<"+'/'+"script>");
	
	//Create substring that is the script, offset start because script tag is inserted with createElement method
	var xsltScript = value.substring(scriptStart+8, scriptEnd);
	var editScript = xsltScript;//.replace("edit = 0", "edit=1");
	//Find the head so we know where to append
	var head = document.getElementsByTagName('head')[0];
	
	//Create our new script object
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.text = editScript;
	
	//Append it to the head
	head.appendChild(script);
	
	//Search for the style in generated HTML
	var styleStart = value.search('<style type="text'+'/'+'css">');
	var styleEnd = value.search("<"+'/'+"style>");
	//Create substring that is the style
	var xsltStyle = value.substring(styleStart+23, styleEnd);
	
	//Find Style insert location
	var styleSpot = head.getElementsByTagName('style')[0];
	var sheet = document.styleSheets[0];
	//Append new styling
	sheet.cssText += xsltStyle;
	
	//Append our generated HTML to the newly formatted page
	value += "<button onclick=toggleEdit()>Edit On/Off</button>";
	value += "<div id='tools' style='display: none;'>";
	value += "<br><button onclick='saveXML(sessvars.xml)'>Save</button>";
	value += "<button onclick='add(0, 0)'>Add Reference</button>";
	value += "<button onclick='add(0, 1)'>Add Para</button>";
	value += "<button onclick='add(0, 2)'>Add Image</button>";
	value += "</div>";
	document.getElementById("xsltDiv").innerHTML = value;
	var edit = document.getElementById("edit");
	
	if(edit.isContentEditable == true) {
		edit.style.border = "dashed";
		sessvars.toggle = "1";
	}
	if(edit.isContentEditable == false) { 
		edit.style.border = "none";
		sessvars.toggle = "0";
	}
}
/////***START LOADXML FUNCTION***///
function loadXML(file_name) {
	var XML = new ActiveXObject("Msxml2.DOMDocument.6.0");
	XML.setProperty("AllowDocumentFunction", true);
	XML.async = false;
	XML.load("../XML/" + file_name);
	return XML;
}
/////***START LOADPROJECT FUNCTION***///
function loadProject(file_name) {
	var project = new ActiveXObject("Msxml2.DOMDocument.6.0");
	project.setProperty("AllowDocumentFunction", true);
	project.async = false;
	project.load("../Projects/" + file_name);
	return project;
}
/////***START LOADRTM FUNCTION***///
function loadRTM(){
	var rtmLocation = document.getElementById("RTM");
	var xml = loadXML("NotionalSRS.xml");
	var xsl = loadXML("RTM.xsl");
	var rtm = xml.transformNode(xsl);
	rtmLocation.innerHTML = rtm;
}