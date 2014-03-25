function getFromSessvar(element){
	var name = element + "=";
	if(sessvars.xml == null) 
		return "";
	var xmlArray = sessvars.xml.split(';');
	for(var i=0; i<xmlArray.length; i++){
		var c = xmlArray[i];
		if (c.indexOf(name)==0){
			return c.substring(name.length,c.length);
		}
	}
	return "";
}