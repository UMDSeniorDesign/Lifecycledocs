function addEditValues(ID, type, fromID){
	if(sessvars.toggle == "1"){
		if(type == '0'){//If type equals approvedBy or testResult
			var selectSpot = document.getElementById("ApprovedBy");
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
			var resultSpot = document.getElementById("TestResult");
			if(resultSpot.length < 2){
				var pass = document.createElement("option");
				pass.text = "Pass";
				pass.value = "Pass";
				var fail = document.createElement("option");
				fail.text = "Fail";
				fail.value = "Fail";
				resultSpot.add(pass);
				resultSpot.add(fail);
			}
		}
		if(type == '1'){//If type equals References
			var referenceSpot = document.getElementById(ID+"References");
			if(referenceSpot.length < 2){
				var refOptions = findRefs(fromID);
				var options = "";
				for(var i = 0; i < refOptions.length; i++){
					var refText = (refOptions[i][0]+refOptions[i][1]);
					options += refText;
					options += '\n';
					var ref = document.createElement("option");
					ref.text = refText;
					ref.value = refOptions[i][0];
					referenceSpot.add(ref);
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
	if(type == 0){//If type equals TestResult
		alert("TestResult "+ID+" Changed to: "+value);
	}
	else if(type == 1){//If type equals ApprovedBy
		if(value == '999'){//If value is other, display input field to specify
			var otherSpot = document.getElementById("Other");
			otherSpot.style.display = "block";
		}
		alert("ApprovedBy "+ID+" Changed to: "+value);
	}
	else if(type == 2){//If type equals References
		addRef(value, ID);
	}
}
function changeApprovedBy(ID){
	var otherBox = document.getElementById("OtherText");
	if(otherBox.innerHTML != "Other")
		alert("Other changed to: "+otherBox.innerHTML);
}