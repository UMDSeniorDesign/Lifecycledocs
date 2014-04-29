function saveParas(xml){
	var saveInfo = document.getElementById("section").innerHTML;
	var editedIdStart = saveInfo.search("<U>");
	var editedIdEnd = saveInfo.search(" - ");
	var editedId = saveInfo.substring(editedIdStart+3, editedIdEnd);
	var sections = xml.getElementsByTagName("Section");
	for(var i = 0; i < sections.length; i++){
		if(editedId == sections[i].getAttribute("id")){
			var originalParas = sections[i].getElementsByTagName("Para");
			for(var j = 0, k = 1; j < originalParas.length; j++, k++){
				while(originalParas[j].getAttribute("isNewest") != 'true')
					j++;
				var editedPara = document.getElementById(editedId+"Para"+k).value;
				var originalCheck = originalParas[j].childNodes[0].nodeValue;
				editedCheck = editedPara.replace("&nbsp;", "");
				if(originalCheck != editedCheck){
					alert("You changed: "+originalCheck+"\nTo : "+editedCheck);
					originalParas[j].setAttribute("isNewest","false");
					editedPara = xml.createElement("Para");
					editedText=xml.createTextNode(editedCheck);
					editedPara.appendChild(editedText);
					editedPara.setAttribute("isNewest","true");
					editedPara.setAttribute("count", k);
					sections[i].appendChild(editedPara);
					return saveFile(xml, "File Saved!");
				}
			}
		}
	}
}
function removePara(ID, count){
	if(sessvars.xml.length > 0){
		var xml = loadXML(sessvars.xml);
		var sections = xml.getElementsByTagName("Section");
		for(var i = 0; i < sections.length; i++){
			if(ID == sections[i].getAttribute("id")){
				var paras = sections[i].childNodes;
				for(var j = 0; j < paras.length; j++){
					if(paras[j].nodeName == "Para"){
						if(count == paras[j].getAttribute("count")){
							if(paras[j].getAttribute("isNewest") == "false")
								continue;
							paras[j].setAttribute("isNewest", "false");
							return saveFile(xml, "Para Removed");
						}
					}
				}
			}
		}
		var reqs = xml.getElementsByTagName("Requirement");
		for(var i = 0; i < reqs.length; i++){
			if(ID == reqs[i].getAttribute("id")){
				var paras = reqs[i].childNodes;
				for(var j = 0; j < paras.length; j++){
					if(paras[j].nodeName == "Para"){
						if(count == paras[j].getAttribute("count")){
							paras[j].setAttribute("isNewest", "false");
							return saveFile(xml, "Para Removed");
						}
					}
				}
			}
		}
		return alert("Error: Para Not Found!");
	}
}
function addPara(ID, aORb, count){
	if(sessvars.xml.length > 0){
		var xml = loadXML(sessvars.xml);
		var newCount = count;
		var added = 0;
		/*if(aORb == 0){//Add Above
			//alert("Add Para to section: "+ID+" Above Count: "+count);
			newCount = count;
		}
		else{//Add Below
			//alert("Add Para to section: "+ID+" Below Count: "+count);
			newCount++;
		}*/
		var sections = xml.getElementsByTagName("Section");
		for(var i = 0; i < sections.length; i++){
			if(ID == sections[i].getAttribute("id")){
				var paras = sections[i].childNodes;
				for(var j = 0; j < paras.length; j++){
					if(paras[j].nodeName == "Para"){
						if(count == paras[j].getAttribute("count")){
							if(paras[j].getAttribute("isNewest") == "false")
								continue;
							newNode = paras[j].cloneNode(true);
							//alert("New Count = "+newCount);
							newNode.setAttribute("count", newCount);
							newNode.childNodes[0].nodeValue = "New Para";
							if(aORb == 0){//If Add Above
								paras[j].setAttribute("count", ++newCount);
								sections[i].insertBefore(newNode, paras[j]);
								j++;
							}
							else if(aORb == 1){//If Add Below
								newNode.setAttribute("count", ++newCount);
								var nextSibling = paras[j].nextSibling;
								j++;
								if(nextSibling == null){
									sections[i].appendChild(newNode);
								}
								else{
									sections[i].insertBefore(newNode, nextSibling);
								}
							}
							added = 1;
							continue;
						}
						if(added == 1){
							//alert(newCount);
							paras[j].setAttribute("count", ++newCount);
						}
					}
				}
				if(added == 1)
					return saveFile(xml, "Para Added!");
			}
		}
		var reqs = xml.getElementsByTagName("Requirement");
		for(var i = 0; i < reqs.length; i++){
			if(ID == reqs[i].getAttribute("id")){
				var paras = reqs[i].childNodes;
				for(var j = 0; j < paras.length; j++){
					if(paras[j].nodeName == "Para"){
						if(count == paras[j].getAttribute("count")){
							if(paras[j].getAttribute("isNewest") == "false")
								continue;
							newNode = paras[j].cloneNode(true);
							newNode.setAttribute("count", newCount);
							newNode.childNodes[0].nodeValue = "New Para";
							if(newCount == count){//If Add Above
								reqs[i].insertBefore(newNode, paras[j]);
								paras[j].setAttribute("count", ++newCount);
							}
							else{//If Add Below
								var nextSibling = paras[j].nextSibling;
								if(nextSibling == null)
									reqs[i].appendChild(newNode);
								else
									reqs[i].insertBefore(newNode, nextSibling);
							}
							added = 1;
						}
						if(added == 1)
							paras[j].setAttribute("count", ++newCount);
					}
				}
				if(added == 1)
					return saveFile(xml, "Para Added!");
			}
		}
	}
	else{
		alert("Please open in Lifecycle Document Editor to enable this functionality");
		}
}