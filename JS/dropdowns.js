function addEditValues(ID){
	if(sessvars.toggle == "1"){
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
}
function selectBoxChange(ID, type, value) {
	if(type == 0)
		alert("TestResult "+ID+" Changed to: "+value);
	else if(type == 1){
		if(value == '999'){
			var otherSpot = document.getElementById("Other");
			otherSpot.style.display = "block";
		}
		alert("ApprovedBy "+ID+" Changed to: "+value);
	}
}
function changeApprovedBy(ID){
	var otherBox = document.getElementById("OtherText");
	if(otherBox.innerHTML != "Other")
		alert("Other changed to: "+otherBox.innerHTML);
}