function getFromCookie(element){
	var name = element + "=";
	var cookiearray = document.cookie.split(';');
	for(var i=0; i<cookiearray.length; i++){
		var c = cookiearray[i];
		if (c.indexOf(name)==0){
			return c.substring(name.length,c.length);
		}
	}
	return "";
}