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
/*function downloadTableAsCSV(filename) {
//Function to convert HTML row to CSV
	function row2CSV(tableRow, rowIndex){
		var emptyRow = tableRow.join('');
		//check for any blank rows
		if(tableRow.length >= 0 && emptyRow != ''){
			if(rowIndex > 0)
				var mystr = '\n';
			else
				var mystr = '';
			mystr += tableRow.join(',');
			csvData[csvData.length] = mystr;
		}
	}
	//Function to remove HTML characters and replace them with CSV ones
    function formatData(input) {
        // replace " with â€œ
        var regexp = new RegExp(/["]/g);
        var output = input.replace(regexp, "â€œ");
        //HTML
        var regelement('a')
    dl.setAttribute('href', 'data:text/text;charset=utf-8,' + encodeURIComponent(text));
    dl.setAttribute('download', filename);
    dl.click();xp = new RegExp(/\<[^\<]+\>/g);
        var output = output.replace(regexp, "");
        if (output == "") return '';
        return '"' + output + '"';
    }
//Function to download RTM.csv file
    function download(filename, text) {
    var dl= document.createE
    }
    
//Array for CSV data
    var csvData = [];

// Convert each row from html to CSV
    $(this).find('tr').each(function(i) {
        var tableDataRow = [];
        $(this).filter(':visible').find('td').each(function() {
            if ($(this).css('display') != 'none') tableDataRow[tableDataRow.length] = formatData($(this).html());
        });
        row2CSV(tableDataRow, i);
    });
    
//And finally, Download the file
    download(filename, csvData);
}*/