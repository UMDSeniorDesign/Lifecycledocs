function addEditValues(ID, type, fromID){
	if(sessvars.toggle == "1"){
		if(type == '0'){//If type equals approvedBy or testResult
			var view = document.getElementById("view");
			var selects = view.getElementsByTagName("select");
			for(var i = 0; i < selects.length; i++){
				if(selects[i].id == "ApprovedBy"){
					selectSpot = selects[i];
					if(selectSpot.length < 2){
						var options = document.getElementById("options").innerHTML;
						options = options.split(',');
						for(var i = 0; i < options.length-1; i++){
							var name = document.createElement("option");
							name.text = options[i];
							name.value = options[i];
							selectSpot.add(name);
						}
						var other = document.createElement("option");
						other.text = "Other";
						other.value = "999";
						selectSpot.add(other);
					}
				}
				else if(selects[i].id == "TestResult"){
					resultSpot = selects[i];
					if(resultSpot.length < 2){
						var pass = document.createElement("option");
						pass.text = "Pass";
						pass.value = "True";
						var fail = document.createElement("option");
						fail.text = "Fail";
						fail.value = "False";
						resultSpot.add(pass);
						resultSpot.add(fail);
					}
				}
			}
		}
		if(type == '1'){//If type equals References
			//var referenceSpot = document.getElementById(ID+"References");
			var refOptionSpot = document.getElementById("refOptions");
			if(refOptionSpot.length < 2){
				var refOptions = findRefs(ID);
				var options = "";
				for(var i = 0; i < refOptions.length; i++){
					var refText = (refOptions[i][0]+refOptions[i][1]);
					options += refText;
					options += '\n';
					var ref = document.createElement("option");
					ref.text = refText;
					ref.value = refOptions[i][0];
					refOptionSpot.add(ref);
				}
			}
		}
	}
}
function findRefs(ID){
	var references = [];
	var locationPrefixEnd = ID.search(/\d+/g);
	var locationPrefix = ID.substring(-1, locationPrefixEnd);
	var xml = loadXML(sessvars.xml);
	var xmlText = xml.xml;
	var baseStart = xmlText.search("xml:base=");
	var partial = xmlText.substring(baseStart);
	var baseEnd = partial.search(".xml");
	var base = partial.substring(10, baseEnd+4);
	var baseXML = loadProject(base);
	var filesToLoad = baseXML.getElementsByTagName("file_location");
	for(var i = 0; i < filesToLoad.length; i++) {
		var filename = filesToLoad[i].childNodes[0].getAttribute("href");
		var searchXML = loadXML(filename);
		var sections = searchXML.getElementsByTagName("Section");
		var testID = sections[0].getAttribute("id");
		var xmlPrefixEnd = testID.search(/\d+/g);
		var xmlPrefix = testID.substring(-1, xmlPrefixEnd);
		if(locationPrefix == xmlPrefix)
			continue;
		for(var j = 0; j < sections.length; j++){
			var info = [2];
			var titles = sections[j].getElementsByTagName("Title");
			info[0] = sections[j].getAttribute("id");
			if(titles.length > 0)
				info[1] = (" - "+titles[0].childNodes[0].nodeValue);
			else
				info[1] = "";
			references.push(info);
		}
		var reqs = searchXML.getElementsByTagName("Requirement");
		for(var j = 0; j < reqs.length; j++){
			var info = [2];
			var titles = reqs[j].getElementsByTagName("Title");
			info[0] = reqs[j].getAttribute("id");
			if(titles.length > 0)
				info[1] = (" - "+titles[0].childNodes[0].nodeValue);
			else
				info[1] = "";
			references.push(info);
		}
	}
	return references;
}
function selectBoxChange(ID, type, value) {
	var viewDiv = document.getElementById("view");
	var xml = loadXML(sessvars.xml);
	var sectionToChange;
	var sections = xml.getElementsByTagName("Section");
	var reqs = xml.getElementsByTagName("Requirement");
	for(var i = 0; i < sections.length; i++)
		if(ID == sections[i].getAttribute("id"))
			sectionToChange = sections[i];
	for(var i = 0; i < reqs.length; i++)
		if(ID == reqs[i].getAttribute("id"))
			sectionToChange = reqs[i];
	var childs = sectionToChange.childNodes;
	if(type == 0){//If type equals TestResult
		for(var i = 0; i < childs.length; i++){
			if(childs[i].nodeName == "TestResult"){
				childs[i].childNodes[0].nodeValue = value;
			}
		}
		var returnString = "Test Result Changed to "+value;
		saveFile(xml, returnString, ID);
	}
	else if(type == 1){//If type equals ApprovedBy
		if(value == '999'){//If value is other, display input field to specify
			var divs = viewDiv.getElementsByTagName("div");
			for(var i = 0; i < divs.length; i++){
				if(divs[i].id == "Other")
					divs[i].style.display = "block";
			}
		}
		else{
			for(var i = 0; i < childs.length; i++){
				if(childs[i].nodeName == "ApprovedBy" && childs[i].getAttribute("isNewest") == 'true'){
					var newNode = childs[i].cloneNode(true);
					childs[i].setAttribute("isNewest", 'false');
					var name = newNode.getElementsByTagName("Name")[0];
					name.childNodes[0].nodeValue = value;
					var comment = newNode.getElementsByTagName("Para")[0];
					comment.childNodes[0].nodeValue = "Insert Comment";
					sectionToChange.insertBefore(newNode, childs[i]);
				}
			}
			var returnString = "Approved By Changed to: "+value;
			saveFile(xml, returnString, ID);
		}
	}
	else if(type == 2){//If type equals References
		addRef(value, ID);
	}
}
function changeApprovedBy(ID){
	var viewDiv = document.getElementById("view");
	var xml = loadXML(sessvars.xml);
	var sectionToChange;
	var sections = xml.getElementsByTagName("Section");
	var reqs = xml.getElementsByTagName("Requirement");
	for(var i = 0; i < sections.length; i++)
		if(ID == sections[i].getAttribute("id"))
			sectionToChange = sections[i];
	for(var i = 0; i < reqs.length; i++)
		if(ID == reqs[i].getAttribute("id"))
			sectionToChange = reqs[i];
	var childs = sectionToChange.childNodes;
	var divs = viewDiv.getElementsByTagName("textarea");
	for(var i = 0; i < divs.length; i++){
		if(divs[i].id == "OtherText"){
			if(divs[i].value != "Other"){
				for(var j = 0; j < childs.length; j++){
				//This needs a check for existing test cases because it currently won't create a test result or approved by if they don't exist
					if(childs[j].nodeName == "ApprovedBy" && childs[j].getAttribute("isNewest") == 'true'){
						var newNode = childs[j].cloneNode(true);
						childs[j].setAttribute("isNewest", 'false');
						var name = newNode.getElementsByTagName("Name")[0];
						name.childNodes[0].nodeValue = divs[i].value;
						var comment = newNode.getElementsByTagName("Para")[0];
						comment.childNodes[0].nodeValue = "Insert Comment";
						sectionToChange.insertBefore(newNode, childs[j]);
					}
				}
				var returnString = "Approved By Changed to "+divs[i].value;
				saveFile(xml, returnString, ID);
			}
		}
	}
}