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

function downloadTableAsCSV() {
    var csvData = [];
    var headerArr = [];
    var el = this;

    //header
    var numCols = options.header.length;
    var tmpRow = []; // construct header avalible array

    if (numCols > 0) {
        for (var i = 0; i < numCols; i++) {
            tmpRow[tmpRow.length] = formatData(options.header[i]);
        }
    } else {
        $(el).filter(':visible').find('th').each(function() {
            if ($(this).css('display') != 'none') tmpRow[tmpRow.length] = formatData($(this).html());
        });
    }

    row2CSV(tmpRow);

    // actual data
    $(el).find('tr').each(function() {
        var tmpRow = [];
        $(this).filter(':visible').find('td').each(function() {
            if ($(this).css('display') != 'none') tmpRow[tmpRow.length] = formatData($(this).html());
        });
        row2CSV(tmpRow);
    });
    if (options.delivery == 'popup') {
        var mydata = csvData.join('\n');
        return popup(mydata);
    } else {
        var mydata = csvData.join('\n');
        return mydata;
    }

    function row2CSV(tmpRow) {
        var tmp = tmpRow.join('') // to remove any blank rows
        // alert(tmp);
        if (tmpRow.length > 0 && tmp != '') {
            var mystr = tmpRow.join(options.separator);
            csvData[csvData.length] = mystr;
        }
    }
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
}