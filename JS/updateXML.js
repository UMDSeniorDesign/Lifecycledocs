function updateXML() {
	var XML = loadXML("SoftwareRequirements");
	var y = XML.documentElement.childNodes;
				
	var text = document.getElementById("textInput");
	
	var x = XML.getElementsByTagName(y[1].nodeValue)[0];
				
	alert(x.nodeName);
}