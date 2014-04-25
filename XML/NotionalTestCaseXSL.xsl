<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="TestCaseDocument">
        <html>
            <head>
                <script>
                    function showSection(ID, title){
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
						var section = document.getElementById("section");
						section.innerHTML = text;
						if(sessvars.toggle = "1")
							sessvars.toggle = "0";
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
					function addEditValues(ID){
						if(sessvars.toggle == "1"){
							var selectSpot = document.getElementById("ApprovedBy");
								if(selectSpot.length &lt; 2){
									var options = document.getElementById("options").innerHTML;
									options = options.split(',');
									for(var i = 0; i &lt; options.length-1; i++){
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
							if(resultSpot.length &lt; 2){
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
                <button onclick="addAbove('{$vID}')">Add Test Case Above</button>
                <br/>
                <button onclick="addBelow('{$vID}')">Add Test Case Below</button>
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
			<div id="section">
				<div id="{@id}" style="display: none;">
					<div id="preview">
						<xsl:apply-templates select="Para"/>
						<br/>
					</div>
						<xsl:if test="TestResult != ''">
							<xsl:text>Test Result: </xsl:text>
							<select id="TestResult" onmouseover="addEditValues('{$vID}')" onchange="if (this.selectedIndex) selectBoxChange('{$vID}', '0', this.value);">
								<option value="-1" selected="selected">
									<xsl:value-of select="TestResult"/>
								</option>
							</select>
							<br/>
						</xsl:if>
						<xsl:variable name="vDocumentBase" select="/*/@xml:base"/>
						<xsl:variable name="vDocumentPath" select="string(concat('..//Projects//',$vDocumentBase))"/>
						<xsl:variable name="vDocumentProj" select="document($vDocumentPath)"/>
						<xsl:for-each select="ApprovedBy[@isNewest='true']">
							<xsl:text>Approved By: </xsl:text>
							<select id="ApprovedBy" onmouseover="addEditValues('{$vID}')" onchange="if (this.selectedIndex) selectBoxChange('{$vID}', '1', this.value);">
									<option value="-1" selected="selected">
										<xsl:value-of select="Name"/>
									</option>
							</select>
							<br/>
							<div id="options" style="display: none;">
								<xsl:for-each select="$vDocumentProj//*//*//TeamMember">
									<xsl:variable name="vTeamMember" select="Name"/>
										<xsl:value-of select="$vTeamMember"/>,
								</xsl:for-each>
							</div>
							<div id="Other" style="display: none;">
								<button onclick="changeApprovedBy('{$vID}')">Approved By: </button>
								<textarea id="OtherText" rows="1">Other</textarea>
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
		<xsl:variable name="vDocumentBase" select="/*/@xml:base"/>
		<xsl:variable name="vDocumentPath" select="string(concat('..//Projects//',$vDocumentBase))"/>
		<xsl:variable name="vDocumentProj" select="document($vDocumentPath)"/>
		<xsl:variable name="vTitle">
			<xsl:for-each select="$vDocumentProj//*//file_location">
				<xsl:variable name="vLocations" select="*/@href"/>
				<xsl:variable name="vDocumentNewPath" select="string(concat('..//XML//',$vLocations))"/>
				<xsl:for-each select="document($vDocumentNewPath)/descendant-or-self::*/*[@id=$vID]">
					<xsl:value-of select="Title"/>
					<br/>
				</xsl:for-each>
			</xsl:for-each>
		</xsl:variable>
		<xsl:variable name="vPara">
			<xsl:for-each select="$vDocumentProj//*//file_location">
				<xsl:variable name="vLocations" select="*/@href"/>
				<xsl:variable name="vDocumentNewPath" select="string(concat('..//XML//',$vLocations))"/>
				<xsl:for-each select="document($vDocumentNewPath)/descendant-or-self::*/*[@id=$vID]/Requirement">
					<xsl:for-each select="Para">
						<xsl:value-of select="."/> 
					</xsl:for-each>
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