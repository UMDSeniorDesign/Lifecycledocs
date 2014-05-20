function showProjectInfo() {
	if(document.getElementById("browse").value != "" ) {
		var varray = document.getElementById("browse").value.split("\\");
		sessvars.projectName = varray[varray.length-1];
		document.location.href = 'view.hta';
	}
	else if(document.getElementById("projectName").value != "") {
		var projectName = document.getElementById("projectName").value;
		save(projectName);
		//document.getElementById("new").innerHTML += "<br><br><button onclick='proceed()'>Proceed to Project</button>";
		getProjectInfo(1, projectName+".xml");
		//sessvars.p = projectName+".xml";
		//document.location.href = 'view.hta';
	}
}

function proceed() {
	if(document.getElementById("browse").value != "" ) {
		var varray = document.getElementById("browse").value.split("\\");
		sessvars.projectName = varray[varray.length-1];
		document.location.href = 'view.hta';
	}
	else 
		document.location.href = 'view.hta';
}
	
function saveFiletoProject(xml, file){
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	//If windows 7, use this line
	var f = fso.GetFolder("../Projects");
	var a = fso.CreateTextFile(f+"/"+xml, true);
	//If windows 8, use this line
	//var f = fso.GetFolder("\Projects");
	//var a = fso.CreateTextFile(f+"\\"+xml, true);
	
	a.Write(file.xml);
	a.Close();
	
	var fso2 = new ActiveXObject("Scripting.FileSystemObject");
	//If windows 7, use this line
	var f2 = fso.GetFolder("../XML");
	var a2 = fso.CreateTextFile(f2+"/"+xml, true);
	//If windows 8, use this line
	//var f = fso.GetFolder("\XML");
	//var a = fso.CreateTextFile(f+"\\"+xml, true);
	
	a2.Write(file.xml);
	a2.Close();
}
	
function saveFiletoXML(xml, file){
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	//If windows 7, use this line
	var f = fso.GetFolder("../XML");
	var a = fso.CreateTextFile(f+"/"+xml+".xml", true);
	//If windows 8, use this line
	//var f = fso.GetFolder("\XML");
	//var a = fso.CreateTextFile(f+"\\"+xml, true);
	
	a.Write(file.xml);
	a.Close();
}

function save(projectName) {
	var f = new ActiveXObject("Scripting.FileSystemObject");
	var project = projectName+".xml";
	var file = loadProject(project);
	for(var j = 0; file.getElementsByTagName("file_location").length > j; j++) {
		var attr = file.getElementsByTagName("file_location")[j].childNodes[0].getAttribute("href");
		var xmlFile = loadXML(attr);
		xmlFile.documentElement.setAttribute("xml:base",project)
		xmlFile.documentElement.setAttribute("projectName", projectName);
		file.getElementsByTagName("file_location")[j].childNodes[0].setAttribute("href", getName(j)+".xml");
		//Windows 7
		f.CopyFile("../XML/"+attr, "../XML/"+getName(j)+".xml", 1);
		//windows 8
		//f.CopyFile("../Lifecycledocs/XML/"+attr, "../Lifecycledocs/XML/"+getName(j)+".xml", 1);
		
		saveFiletoXML(getName(j), xmlFile);
	}
	saveFiletoProject(project, file);
}
			
function getName(j) {	// Gets names of files to saveAs													
	return document.getElementById(j).value;
}

function load(projectName) {
	var project = projectName+".xml";
	var file = loadProject(project);
	for(var j = 0; file.getElementsByTagName("file_location").length > j; j++) {
		var attr = file.getElementsByTagName("file_location")[j].childNodes[0].getAttribute("href");
		document.getElementById("new").innerHTML += "<p style='font-size:24px'>" + attr + "</p>" + ": <input type='text' style='width: 200px' id="+j+"> <br /><br />";	
	}
	//Change projectName
	file.documentElement.setAttribute("projectName", projectName);
	saveFiletoProject(project, file)
}

function setProject() {
	document.getElementById("new").style.visibility="visible";
	document.getElementById("images").style.visibility="hidden";
}
	
function createProject() {
	document.getElementById("make").style.visibility="hidden";
	var projectName = document.getElementById("projectName").value;
	if(projectName.substr(projectName.length - 4) == ".xml") {
			projectName = projectName.substring(0, projectName.length - 4);
		} 

	var fso = new ActiveXObject("Scripting.FileSystemObject");
	
	//windows 7 
	if(fso.FileExists("../Projects/"+projectName+".xml")) {
		var r = confirm("Overwrite?")
		if(r == true) 
			alert("Overwritten");
		else
			return window.location.reload();
	}
	fso.CopyFile("../Projects/template.xml", "../Projects/"+projectName+".xml", 1);
	//windows 8
	/*if(fso.FileExists("../Lifecycledocs/Projects/"+projectName+".xml")) {
		var r = confirm("Overwrite?")	
		if(r == true) 
			alert("Overwriten");
		else
			return window.location.reload();
	}
	fso.CopyFile("../Lifecycledocs/Projects/template.xml", "../Lifecycledocs/Projects/"+projectName+".xml", 1);
	*/
	
	load(projectName);
	sessvars.projectName = projectName+".xml";
}

function getProjectInfo(i, project) {
	if(i==0) {
		var b = document.getElementById("browse").value;
		var varray = b.split("\\");
		var projectName = varray[varray.length-1];
		var image = document.getElementById("images");
	} else if(i == 1){
		var projectName = project;
		var image = document.getElementById("new");
	}
	image.innerHTML = "";
	var y = loadProject(projectName);
	var z = loadXML("ProjectInfoXSL.xsl");
	var x = y.transformNode(z);
	image.innerHTML = x;
	document.getElementById("add").style.visibility="visible";
	document.getElementById("button").style.visibility="visible";
}

function removeMember(memberName) {
	var b = document.getElementById("browse").value;
	if(b.value == undefined)
		var projectName = sessvars.projectName;
	if (b.split("\\")[b.split("\\").length-1] != ""){
		var varray = b.split("\\");
		var projectName = varray[varray.length-1];
	}
	var xmlDoc = loadProject(projectName);
	for(var i = 0; i < xmlDoc.getElementsByTagName("TeamMember").length; i++) {
		if(xmlDoc.getElementsByTagName("Name")[i].childNodes[0].nodeValue == memberName)	
			var n = xmlDoc.getElementsByTagName("TeamMember")[i];
	}
	n.setAttribute("isNewest","false");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	
	//If windows 7, use this line
	var f = fs.GetFolder("../Projects");
	//If windows 8, use this line
	//var f = fs.GetFolder("\Projects");

	file = f.CreateTextFile(projectName, true);
	file.write(xmlDoc.xml);
	file.close();		
	if(b.value == undefined)
		getProjectInfo(1, projectName);
	if (b.split("\\")[b.split("\\").length-1] != "")
		getProjectInfo(0, projectName);
}
		
function addMember() {
	var b = document.getElementById("browse").value;
	if(b.value == undefined)
		var projectName = sessvars.projectName;
	if (b.split("\\")[b.split("\\").length-1] != ""){
		var varray = b.split("\\");
		var projectName = varray[varray.length-1];
	}
	var xmlDoc = loadProject(projectName);
	for(var i = 0; i < xmlDoc.getElementsByTagName("TeamMember").length; i++) {
		if(xmlDoc.getElementsByTagName("TeamMember")[i].getAttribute("isNewest") == "true")	
			var oldNode = xmlDoc.getElementsByTagName("TeamMember")[i];
			var newNode = oldNode.cloneNode(true);
			for(var k = 0; k < newNode.childNodes.length; k++) {
				newNode.childNodes[k].childNodes[0].nodeValue = "";
			}
			break;
	}
	var m = xmlDoc.getElementsByTagName("Team")[0];
	m.appendChild(newNode);
	var newM = document.getElementById("member").value;
	var newR = document.getElementById("role").value;
	if(newM == undefined || newR == undefined){
		alert("Please specify Name and Role before attempting to add!");
		return window.location.reload();
	}
	for(var k = 0; k < newNode.childNodes.length; k++) {
		if((newNode.childNodes[k].nodeName == "Name") && (newNode.childNodes[k].childNodes[0].nodeValue == ""))
			newNode.childNodes[k].childNodes[0].nodeValue = newM;
		else if((newNode.childNodes[k].nodeName == "Role") && (newNode.childNodes[k].childNodes[0].nodeValue == ""))
			newNode.childNodes[k].childNodes[0].nodeValue = newR;
	}
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	
	//If windows 7, use this line
	var f = fs.GetFolder("../Projects");
	//If windows 8, use this line
	//var f = fs.GetFolder("\Projects");

	file = f.CreateTextFile(projectName, true);
	file.write(xmlDoc.xml);
	file.close();		
	if(b.value == undefined) {
		getProjectInfo(1, projectName);
	}
	if (b.split("\\")[b.split("\\").length-1] != ""){
		getProjectInfo(0, projectName);
	}
}

function changeMemberName(memberName) {
	var b = document.getElementById("browse").value;
	if(b.value == undefined)
		var projectName = sessvars.projectName;
	if (b.split("\\")[b.split("\\").length-1] != ""){
		var varray = b.split("\\");
		var projectName = varray[varray.length-1];
	}
	var xmlDoc = loadProject(projectName);			
	for(var i = 0; i < xmlDoc.getElementsByTagName("TeamMember").length; i++) {
		if(xmlDoc.getElementsByTagName("Name")[i].childNodes[0].nodeValue == memberName)	
			var n = xmlDoc.getElementsByTagName("Name")[i].childNodes[0];
	}
	var newMemberName = prompt("New Member Name: ", "");
	n.nodeValue = newMemberName;
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	
	//If windows 7, use this line
	var f = fs.GetFolder("../Projects");
	//If windows 8, use this line
	//var f = fs.GetFolder("\Projects");

	file = f.CreateTextFile(projectName, true);
	file.write(xmlDoc.xml);
	file.close();		
	if(b.value == undefined)
		getProjectInfo(1, projectName);
	if (b.split("\\")[b.split("\\").length-1] != ""){
		getProjectInfo(0, projectName);
	}
}
		
function changeRole(memberName) {
	var b = document.getElementById("browse").value;
	if(b.value == undefined)
		var projectName = sessvars.projectName;
	if (b.split("\\")[b.split("\\").length-1] != ""){
		var varray = b.split("\\");
		var projectName = varray[varray.length-1];
	}
	var xmlDoc = loadProject(projectName);			
	for(var i = 0; i < xmlDoc.getElementsByTagName("TeamMember").length; i++) {
		if(xmlDoc.getElementsByTagName("Name")[i].childNodes[0].nodeValue == memberName)	
			var n = xmlDoc.getElementsByTagName("Role")[i].childNodes[0];
	}
	var newRole = prompt("New Member Role: ", "");
	n.nodeValue = newRole;
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	
	//If windows 7, use this line
	var f = fs.GetFolder("../Projects");
	//If windows 8, use this line
	//var f = fs.GetFolder("\Projects");

	file = f.CreateTextFile(projectName, true);
	file.write(xmlDoc.xml);
	file.close();		
	if(b.value == undefined)
		getProjectInfo(1, projectName);
	if (b.split("\\")[b.split("\\").length-1] != "")
		getProjectInfo(0, projectName);
}