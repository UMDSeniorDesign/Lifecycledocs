<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="TestCaseDocument">
        <html>
            <head>
                <script>
                    function showSection(ID, title){
						var edit = 0;
						var para = document.getElementById(ID).innerHTML;
						var subReqs = document.getElementById("sub"+ID).innerHTML;
						var subReqSpot = document.getElementById("sub"+ID);
						var subReqStyle = subReqSpot.style.display;
						var text = "<u>"+ID;
						text += " - ";
						text += "<i>"+title+"</i></u>";
						text += "<p>";
						text += para;
						text += "</p>";
						if(subReqs.length > 33){
							if(subReqStyle == 'none'){
								text += "<p>";
								text += "<u>Sub Requirements</u><br/>";
								text += subReqs;
								text += "</p>";
							}
						}
						var preview = document.getElementById("preview");
						preview.innerHTML = text;
						if(edit > 0){
							preview.contentEditable = 'true';
						}
                    }
					function showMenu(ID) {
                        if(sessvars.xml.length > 0){
                            var rightClickMenu = document.getElementById(ID+"Menu");
                            rightClickMenu.style.display = 'block';
                        }
                        else{
                            alert("Please open in Lifecycle Document Editor to enable this functionality");
                        }
                    }
                    function hideMenu(ID) {
                        var rightClickMenu = document.getElementById(ID+"Menu");
                        rightClickMenu.style.display = 'none';
                    }
                    function addAbove(ID){
                        //alert("Add Above: "+ID);
                        if(sessvars.xml.length > 0){
                            var xml = loadXML(sessvars.xml);
                            var sections = xml.getElementsByTagName("Section");
                            for(var i = 0; i &lt; sections.length; i++){
                                if(ID == sections[i].getAttribute("id")){
                                    //alert("Add Section Above: "+sections[i].getAttribute("id"));
                                    newNode=xml.createElement("Section");
                                    newNode.setAttribute("isNewest","true");
                                    newNode.setAttribute("id", sections[i].getAttribute("id"));
                                    newSectionTitleElement = xml.createElement("Title");
                                    newSectionTitleText = xml.createTextNode("New Section");
                                    newSectionTitleElement.appendChild(newSectionTitleText);
                                    newSectionTitleElement.setAttribute("isNewest","true");
                                    newNode.appendChild(newSectionTitleElement);
                                    newSectionParaElement = xml.createElement("Para");
                                    newSectionParaText = xml.createTextNode("New Para");
                                    newSectionParaElement.appendChild(newSectionParaText);
                                    newSectionParaElement.setAttribute("isNewest","true");
                                    newNode.appendChild(newSectionParaElement);
									var parentNode = sections[i].parentNode;
                                    parentNode.insertBefore(newNode, sections[i]);
                                    alert("Section Added");
                                }
                            }
                            var reqs = xml.getElementsByTagName("Requirement");
                            for(var i = 0; i &lt; reqs.length; i++){
                                if(ID == reqs[i].getAttribute("id")){
                                    //alert("Add Requirement Above: "+reqs[i].getAttribute("id"));
                                    newNode=xml.createElement("Requirement");
                                    newNode.setAttribute("isNewest","true");
                                    newNode.setAttribute("id", reqs[i].getAttribute("id"));
                                    newReqTitleElement = xml.createElement("Title");
                                    newReqTitleText = xml.createTextNode("New Requirement");
                                    newReqTitleElement.appendChild(newReqTitleText);
                                    newReqTitleElement.setAttribute("isNewest","true");
                                    newNode.appendChild(newReqTitleElement);
                                    newReqParaElement = xml.createElement("Para");
                                    newReqParaText = xml.createTextNode("New Para");
                                    newReqParaElement.appendChild(newReqParaText);
                                    newReqParaElement.setAttribute("isNewest","true");
                                    newNode.appendChild(newReqParaElement);
									var parentNode = reqs[i].parentNode;
                                    parentNode.insertBefore(newNode, reqs[i]);
                                    alert("Requirement Added");
                                }
                            }
                            var fs = new ActiveXObject("Scripting.FileSystemObject");
                            //If windows 7, use this line
                            var f = fs.GetFolder("../XML");
                            //If windows 8, use this line
                            //var f = fs.GetFolder("\XML");
                            file = f.CreateTextFile("TestSave.xml", true, true);
                            file.write(xml.xml);
                            file.close();
                            alert("File saved");
                        }
                        else{
                            alert("Please open in Lifecycle Document Editor to enable this functionality");
                            }
                    }
                    function addBelow(ID){
                        //alert("Add Below: "+ID);
                        if(sessvars.xml.length > 0){
                            var xml = loadXML(sessvars.xml);
                            var sections = xml.getElementsByTagName("Section");
                            for(var i = 0; i &lt; sections.length; i++){
                                if(ID == sections[i].getAttribute("id")){
                                    //alert("Add Section Below: "+sections[i].getAttribute("id"));
                                    newNode=xml.createElement("Section");
                                    newNode.setAttribute("isNewest","true");
                                    newNode.setAttribute("id", sections[i].getAttribute("id"));
                                    newSectionTitleElement = xml.createElement("Title");
                                    newSectionTitleText = xml.createTextNode("New Section");
                                    newSectionTitleElement.appendChild(newSectionTitleText);
                                    newSectionTitleElement.setAttribute("isNewest","true");
                                    newNode.appendChild(newSectionTitleElement);
                                    newSectionParaElement = xml.createElement("Para");
                                    newSectionParaText = xml.createTextNode("New Para");
                                    newSectionParaElement.appendChild(newSectionParaText);
                                    newSectionParaElement.setAttribute("isNewest","true");
                                    newNode.appendChild(newSectionParaElement);
									var nextSibling = sections[i].nextSibling;
									if(nextSibling == null){
										var parentNode = sections[i].parentNode;
										parentNode.appendChild(newNode);
									}
									else{
										var parentNode = nextSibling.parentNode;
										parentNode.insertBefore(newNode, nextSibling);
									}
                                    alert("Section Added");
                                }
                            }
                            var reqs = xml.getElementsByTagName("Requirement");
                            for(var i = 0; i &lt; reqs.length; i++){
                                if(ID == reqs[i].getAttribute("id")){
                                    //alert("Add Requirement Below: "+reqs[i].getAttribute("id"));
                                    newNode=xml.createElement("Requirement");
                                    newNode.setAttribute("isNewest","true");
                                    newNode.setAttribute("id", reqs[i].getAttribute("id"));
                                    newReqTitleElement = xml.createElement("Title");
                                    newReqTitleText = xml.createTextNode("New Requirement");
                                    newReqTitleElement.appendChild(newReqTitleText);
                                    newReqTitleElement.setAttribute("isNewest","true");
                                    newNode.appendChild(newReqTitleElement);
                                    newReqParaElement = xml.createElement("Para");
                                    newReqParaText = xml.createTextNode("New Para");
                                    newReqParaElement.appendChild(newReqParaText);
                                    newReqParaElement.setAttribute("isNewest","true");
                                    newNode.appendChild(newReqParaElement);
									var nextSibling = reqs[i].nextSibling;
									if(nextSibling == null){
										var parentNode = reqs[i].parentNode;
										parentNode.appendChild(newNode);
									}
									else{
										var parentNode = nextSibling.parentNode;
										parentNode.insertBefore(newNode, nextSibling);
									}
                                    alert("Requirement Added");
                                }
                            }
                            var fs = new ActiveXObject("Scripting.FileSystemObject");
                            //If windows 7, use this line
                            var f = fs.GetFolder("../XML");
                            //If windows 8, use this line
                            //var f = fs.GetFolder("\XML");
                            file = f.CreateTextFile("TestSave.xml", true, true);
                            file.write(xml.xml);
                            file.close();
                            alert("File saved");
                        }
                        else{
                            alert("Please open in Lifecycle Document Editor to enable this functionality");
                        }
                    }
					function changeTitle(ID){
						var xml = loadXML(sessvars.xml);
						var newTitle = document.getElementById(ID+"Title").value;
                        var sections = xml.getElementsByTagName("Section");
                        for(var i = 0; i &lt; sections.length; i++){
							if(ID == sections[i].getAttribute("id")){
								var titles = sections[i].getElementsByTagName("Title");
								for(var j = 0; j &lt; titles.length; j++){
									if(titles[j].getAttribute("isNewest") == 'true'){
										if(titles[j].childNodes[0].nodeValue == newTitle){
											alert("Title not changed!");
											return;
										}
										var parentNode = titles[j].parentNode;
										titles[j].setAttribute("isNewest", "false");
										newTitleElement = xml.createElement("Title");
										newTitleText = xml.createTextNode(newTitle);
										newTitleElement.appendChild(newTitleText);
										newTitleElement.setAttribute("isNewest","true");
										parentNode.insertBefore(newTitleElement, titles[j]);
										alert(titles[j].childNodes[0].nodeValue+" Changed to: "+newTitle);
									}
								}
							}
						}
						var reqs = xml.getElementsByTagName("Requirement");
                        for(var i = 0; i &lt; reqs.length; i++){
							if(ID == reqs[i].getAttribute("id")){
								var titles = reqs[i].getElementsByTagName("Title");
								for(var j = 0; j &lt; titles.length; j++){
									if(titles[j].getAttribute("isNewest") == 'true'){
										if(titles[j].childNodes[0].nodeValue == newTitle){
											alert("Title not changed!");
											return;
										}
										var parentNode = titles[j].parentNode;
										titles[j].setAttribute("isNewest", "false");
										newTitleElement = xml.createElement("Title");
										newTitleText = xml.createTextNode(newTitle);
										newTitleElement.appendChild(newTitleText);
										newTitleElement.setAttribute("isNewest","true");
										parentNode.insertBefore(newTitleElement, titles[j]);
										alert(titles[j].childNodes[0].nodeValue+" Changed to: "+newTitle);
									}
								}
							}
						}
						var fs = new ActiveXObject("Scripting.FileSystemObject");
                        //If windows 7, use this line
                        var f = fs.GetFolder("../XML");
                        //If windows 8, use this line
                        //var f = fs.GetFolder("\XML");
                        file = f.CreateTextFile("TestSave.xml", true, true);
                        file.write(xml.xml);
                        file.close();
                        alert("File saved");
					}
					function showRef(ID){
						var refSpot = document.getElementById("ref");
						var infoSpot = document.getElementById(ID);
						var openOrClose = infoSpot.style.display;
						if(openOrClose == 'block')
							infoSpot.style.display = 'none';
						else
							infoSpot.style.display = 'block';
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
                </script>
                <title>Lifecycle Documents</title>
                <style type="text/css">
					#page{
					}
                    #toc {
                    float: left;
                    width: 40%;
                    font-size: 12pt;
                    }
                    #view {
                    float: right;
                    width: 60%;
                    font-size: 12pt;
                    }
                </style>  
            </head>
            <body>
				<div id="toc">
					<xsl:apply-templates select="Section" mode="section"/>
				</div>
				<div id="view">
					<xsl:apply-templates select="Section" mode="para"/>
				</div>
				<div id="refLocation">
				</div>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="Section" mode="section">
		<xsl:if test="@isNewest = 'true'">
			<br/>
			<xsl:variable name="vID">
				<xsl:value-of select="@id"/>
			</xsl:variable>
			<xsl:variable name="vTitle">
				<xsl:value-of select="Title"/>
			</xsl:variable>
            
			<button type="button" onclick="showSection('{$vID}','{$vTitle}')" oncontextmenu="showMenu('{$vID}');return false;">
			<xsl:value-of select="$vID"/></button> - 
			<xsl:value-of select="$vTitle"/>
            <div id="{@id}Menu" style="display: none;">
                <button onclick="addAbove('{$vID}')">Add Section Above</button>
                <br/>
                <button onclick="addBelow('{$vID}')">Add Section Below</button>
                <br/>
				<button onclick="changeTitle('{$vID}')">Change Title to: </button>
				<textarea id="{@id}Title" rows="1"><xsl:value-of select="$vTitle"/></textarea>
				<br/>
                <button onclick="hideMenu('{$vID}')">Cancel</button>
            </div>
		</xsl:if>
		<div id="sub{@id}" contenteditable="false">
		<div contenteditable="false">
			<xsl:apply-templates select="Section" mode="section"/>
			<xsl:apply-templates select="Requirement" mode="section"/>
		</div>	
		</div>
    </xsl:template>
	
	<xsl:template match="Section" mode="para">
		<xsl:variable name="vID">
            <xsl:value-of select="@id"/>
        </xsl:variable>
		<xsl:if test="@isNewest = 'true'">
			<div id="preview">
				<div id="{@id}" style="display: none;">
					<xsl:apply-templates select="Para"/>
					<br/>
					<xsl:if test="TestResult != ''">
						<xsl:text>Test Result: </xsl:text>
						<select id="TestResult" onchange="if (this.selectedIndex) selectBoxChange('{$vID}', '0', this.value);">
							<option value="-1" selected="selected">
								<xsl:value-of select="TestResult"/>
							</option>
							<option value="Pass">
								Pass
							</option>
							<option value="Fail">
								Fail
							</option>
						</select>
						<br/>
					</xsl:if>
					<xsl:variable name="vDocumentBase" select="."/>
					<xsl:variable name="vDocumentProj" select="document('..//Projects//TestProject.xml')"/>
					<xsl:for-each select="ApprovedBy[@isNewest='true']">
						<xsl:text>Approved By: </xsl:text>
						<select id="ApprovedBy" onchange="if (this.selectedIndex) selectBoxChange('{$vID}', '1', this.value);">
							<option value="-1" selected="selected">
								<xsl:value-of select="Name"/>
							</option>
							<xsl:for-each select="$vDocumentProj//*//*//TeamMember">
								<xsl:variable name="vTeamMember" select="Name"/>
								<option value="{$vTeamMember}">
									<xsl:value-of select="$vTeamMember"/>
								</option>
							</xsl:for-each>
							<option value="999">
								Other
							</option>
						</select>
						<br/>
						<div id="{@id}Other" style="display: none;">
							<button onclick="changeTitle('{$vID}')">Approved By: </button>
							<textarea id="{@id}OtherText" rows="1">Other</textarea>
							<br/>
						</div>
						<xsl:value-of select="Name"/>
						<xsl:text>'s Comment: </xsl:text>
						<xsl:apply-templates select="Para"/>
						<xsl:apply-templates select="ApprovedBy"/>
					</xsl:for-each>
					<br/><br/>
					<div id="refs">
						<xsl:apply-templates select="Ref"/>
						<br/>
					</div>
				</div>
			</div>
		</xsl:if>
        <xsl:apply-templates select="Section" mode="para"/>
        <xsl:apply-templates select="Requirement" mode="para"/>
    </xsl:template>
	
	<xsl:template match="Para">
		<xsl:if test="@isNewest = 'true'">
			<div id="Para">
				<xsl:value-of select="."/>
				<br/>
			</div>
		</xsl:if>
    </xsl:template>
	
	<xsl:template match="Ref">
		<xsl:variable name="vID">
			<xsl:value-of select="."/>
		</xsl:variable>
		<xsl:variable name="vTitle">
			<xsl:for-each select="document('NotionalUseCase.xml')//UseCaseDocument//Section//Requirement[@id=$vID]">
				<xsl:value-of select="Title"/>
				<br/>
				<!-- <xsl:for-each select="Para">
                  <xsl:apply-templates select="Para"/>
                    <xsl:value-of select="."/> 
                </xsl:for-each> -->
			</xsl:for-each>
			<xsl:for-each select="document('NotionalSRS.xml')//SoftwareRequirementsDocument//Section//Requirement[@id=$vID]">
				<xsl:value-of select="Title"/>
				<!--    <xsl:for-each select="Para">
                  <xsl:apply-templates select="Para"/>
                    <xsl:value-of select="."/> 
                </xsl:for-each> -->
			</xsl:for-each>
		</xsl:variable>
		<xsl:variable name="vPara">
			<xsl:for-each select="document('NotionalUseCase.xml')//UseCaseDocument//Section//Requirement[@id=$vID]//Requirement">  
				<xsl:for-each select="Para">
					<xsl:value-of select="."/> 
				</xsl:for-each> 
			</xsl:for-each>
			<xsl:for-each select="document('NotionalSRS.xml')//SoftwareRequirementsDocument//Section//Requirement[@id=$vID]//Requirement">  
				<xsl:for-each select="Para">
					<xsl:value-of select="."/>
				</xsl:for-each> 
			</xsl:for-each>
		</xsl:variable>
		<div contenteditable="false">
			<button type="button" onclick="showRef('{$vID}')">
				<xsl:value-of select="$vID"/></button>  - <xsl:value-of select="$vTitle"/>
			<div id="ref">
				<div id="{.}" style="display: none;">
					<xsl:value-of select="$vPara"/>
				</div>
			</div>
		</div>
		<xsl:apply-templates select="Ref" mode="para"/>
		<br/>
	</xsl:template>
</xsl:stylesheet>