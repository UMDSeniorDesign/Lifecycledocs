function rtmHTMLtable(){
    //Init xmlhttp for appropriate browser
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
        
/*
This is where we need a schema. Right now there is not dynamic ability to this
Tags are hard coded, Okay for now however we have no ability to handle documents
that may have extra information or incorrect, differently tagged elements
*/

    //Get Requirements XML -> store in x
    xmlhttp.open("GET","/Lifecycledocs/XML/requirements.xml",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 
    var x=xmlDoc.getElementsByTagName("Requirement");
        
    //Get useCase XML -> store in y
    xmlhttp.open("GET","/Lifecycledocs/XML/useCase.xml",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 
    var y=xmlDoc.getElementsByTagName("Section");
        
    //Get testCase XML -> store in z
    xmlhttp.open("GET","/Lifecycledocs/XML/testCase.xml",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 
    var z=xmlDoc.getElementsByTagName("Section");
        
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

jQuery.fn.downloadTableAsCSV = function(filename) {
//Function to convert HTML row to CSV
    function row2CSV(tableRow, rowIndex) {
        var emptyRow = tableRow.join('') 
    // to check for any blank rows
        if (tableRow.length >= 0 && emptyRow != '') {
            if (rowIndex > 0)
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
        var regexp = new RegExp(/\<[^\<]+\>/g);
        var output = output.replace(regexp, "");
        if (output == "") return '';
        return '"' + output + '"';
    }
//Function to download RTM.csv file
    function download(filename, text) {
    var dl= document.createElement('a');
    dl.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));
    dl.setAttribute('download', filename);
    dl.click();
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
}