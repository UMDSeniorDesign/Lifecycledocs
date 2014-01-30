function rtmHTMLtable(){
	var xmlDoc = new ActiveXObject("Msxml2.DOMDocument.6.0");
	xmlDoc.async = false;
	xmlDoc.load("../XML/" + "requirements.xml");
	var x = xmlDoc.getElementsByTagName("Requirement");
	
	xmlDoc.load("../XML/" + "useCase.xml");
	var y = xmlDoc.getElementsByTagName("Section");
	
	xmlDoc.load("../XML/" + "testCase.xml");
	var z = xmlDoc.getElementsByTagName("Section");
	
	//Write Table
    var content = "<table border='1'>"
        
    content += '<tr><td>' + 'Requirement ' + '</td><td>' + 'Location' + '</td><td>' + 'ID' + '</td><td>' + 'Use Case Location' + '</td><td>' + 'Test Case Location' + '</td><td>' + 'Tested By' + '</td><td>' + 'Result' + '</td><td>' + 'Date' + '</td></tr>';
        
    for (i=0;i<x.length;i++) { 
    //Add Requirement
        content += '<tr><td>';
        content += x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
    //Add Requirement Location
        content += '</td><td>';
        content += x[i].getElementsByTagName("section")[0].childNodes[0].nodeValue;
    //Add ID
        content += '</td><td>';
        content += x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
    //Search Use case doc for current Requirement
        content += '</td><td>';
        for (j=0;j<y.length;j++) {
            if(x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue == y[j].getElementsByTagName("requirement")[0].childNodes[0].nodeValue) {
                content += y[j].getElementsByTagName("number")[0].childNodes[0].nodeValue;
            }
        }
    //Search Test case doc for current Requirement
        content += '</td><td>';
        for (j=0;j<y.length;j++) {
            if(x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue == z[j].getElementsByTagName("requirement")[0].childNodes[0].nodeValue) {
    //Write Test case location
                content += z[j].getElementsByTagName("number")[0].childNodes[0].nodeValue;
                content += '</td><td>';
                var test = z[j].getElementsByTagName("testedBy")[0].childNodes[0].nodeValue;
                if (test != '*'){
                    content += test;
                }
                content += '</td><td>';
                test = z[j].getElementsByTagName("status")[0].childNodes[0].nodeValue;
                if (test != '*'){
                    content += test;
                }
                content += '</td><td>';
                test = z[j].getElementsByTagName("date")[0].childNodes[0].nodeValue;
                if (test != '*'){
                    content += test;
                }
            }
        }
        content += '</td></tr>';
    }
        
    content += '</table>';
    return content;
}