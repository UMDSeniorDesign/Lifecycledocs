<?xml version="1.0" ?>

<!-- need to re-add <li> for bullets in requirements -->


<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <script>
                    function showSection(ID, title){
						var width = (document.body.offsetWidth * 0.65) - 20;
						var para = document.getElementById(ID);
						textareas = para.getElementsByTagName("textarea");
						for(var i = 0; i &lt; textareas.length; i ++){
							var height = (parseInt(textareas[i].value.length/(width/10) + 1)||1);
							textareas[i].style.width = width+"px";
							textareas[i].rows = height;
						}
						var subReqs = document.getElementById("sub"+ID).innerHTML;
						var subReqSpot = document.getElementById("sub"+ID);
						var subReqStyle = subReqSpot.style.display;
						var text = "<u>"+ID;
						text += " - ";
						text += "<i>"+title+"</i></u>";
						text += "<p>";
						text += para.innerHTML;
						text += "</p>";
						if(subReqStyle == 'none')
							subReqSpot.style.display = 'block';
						else if(subReqStyle == 'block')
							subReqSpot.style.display = 'none';
						var section = document.getElementById("view");
						section.innerHTML = text;
						if(sessvars.toggle = "1")
							sessvars.toggle = "0";
                    }
					function showRef(ID){
						var viewRefSpot = document.getElementById("view");
						var viewDivs = viewRefSpot.getElementsByTagName("div");
						for(var i = 0; i &lt; viewDivs.length; i++){
							if(viewDivs[i].id == ID){
								var openOrClose = viewDivs[i].style.display;
								if(openOrClose == 'block')
									return viewDivs[i].style.display = 'none';
								else
									return viewDivs[i].style.display = 'block';
							}
						}
					}
                </script>
                <title>Lifecycle Documents</title>
                <style type="text/css">
					#page{
					}
                    #toc {
                    position: fixed;
                    overflow-y: scroll;
                    overflow-x: auto;
                    float: left;
                    width: 30%;
                    font-size: 12pt;
                    height: 90%;
                    }
                    #view {
                    float: right;
                    width: 65%;
                    font-size: 12pt;
                    }
                    textarea {
                    overflow-y: scroll;
                    overflow-x: auto;
                    width: 100%;
                    resize: both;
                    }
                </style>
            </head>
            <body>
            	<div id="toc">
					<xsl:apply-templates select="*/Section" mode="section"/>
					<xsl:apply-templates select="*/Section" mode="para"/>
				</div>
				<div id="view">
					<!-- empty when start -->
				</div>
				<div id="refLocation">
				</div>
            </body>
        </html>
    </xsl:template>


    <xsl:template match="Section | Requirement" mode="section">
		<xsl:if test="@isNewest = 'true'">
			<xsl:variable name="vID" select="@id"/>
			<xsl:variable name="vTitle" select="Title"/>
			<button type="button" id='{$vID}button' onclick="showSection('{$vID}','{$vTitle}')" oncontextmenu="showMenu('{$vID}', '0');return false;">
			<xsl:value-of select="$vID"/></button> - <xsl:value-of select="$vTitle"/>
            <div id="{@id}Menu" style="display: none;">
            	<xsl:if test="self::Section">
                <button onclick="add('{$vID}', '0', '0')">Add Section Above</button>
            	</xsl:if>
            	<xsl:if test="self::Requirement">
            		<button onclick="add('{$vID}', '0', '1')">Add Requirement Above</button>
            	</xsl:if>
            	<xsl:if test="self::Section">
            		<button onclick="add('{$vID}', '1', '0')">Add Section Below</button>
            	</xsl:if>
            	<xsl:if test="self::Requirement">
                <button onclick="add('{$vID}', '1', '1')">Add Requirement Below</button>
            	</xsl:if>
                <br/>
				<xsl:if test="self::Section">
            		<button onclick="remove('{$vID}', '1', '0')">Remove Section</button>
            	</xsl:if>
            	<xsl:if test="self::Requirement">
                <button onclick="remove('{$vID}', '1', '1')">Remove Requirement</button>
            	</xsl:if>
                <br/>
				<button onclick="add('{$vID}', '3', '0')">Add subSection</button><button onclick="add('{$vID}', '3', '1')">Add subRequirement</button>
                <br/>
				<button onclick="changeTitle('{$vID}')">Change Title to: </button>
				<textarea id="{@id}Title" rows="1"><xsl:value-of select="$vTitle"/></textarea>
				<br/>
                <button onclick="hideMenu('{$vID}')" id="close">Cancel</button>
            </div>
			
			<div id="sub{@id}" style="display: none;">
				<xsl:apply-templates select="Section" mode="section"/>
				<xsl:apply-templates select="Requirement" mode="section"/>
			</div>
			<br/>
		</xsl:if>
    </xsl:template>
	
	
	<xsl:template match="Section | Requirement" mode="para">
		<xsl:if test="@isNewest = 'true'">
			<xsl:variable name="vID">
				<xsl:value-of select="@id"/>
			</xsl:variable>
			<div id="section">
				<div id="{@id}" style="display: none;">
					<div id="edit">
						<xsl:apply-templates select="Para"/>
						<xsl:if test="position() != last()">
							<br/>
						</xsl:if>
					</div>
					<xsl:for-each select="Image">
						<xsl:variable name="vImagePath" select="."/>
						<img oncontextmenu="showMenu('{$vID}', '4', '{$vImagePath}');return false;" height="250" width="250" src="{$vImagePath}" style="float:left"/>
						<div id="{$vID}{$vImagePath}menu" style="display: none;">
							<button onclick="remove('{$vID}', '{$vImagePath}', '4')">Remove Image</button>
							<button onclick="hideMenu()" id="close">Cancel</button>
						</div>
					</xsl:for-each>
					<xsl:if test="ancestor-or-self::TestCaseDocument">
						<xsl:if test="not(TestResult)">
<!-- put blank test case here -->
							<xsl:text>Test Result: </xsl:text>
							<select id="TestResult" onmouseover="addEditValues('{$vID}', '0')" onchange="if (this.selectedIndex) selectBoxChange('{$vID}', '0', this.value);">
								<option value="-1" selected="selected">
									<xsl:value-of select="TestResult"/>
								</option>
							</select>
							<br/>
							<xsl:variable name="vDocumentBase" select="/*/@xml:base"/>
							<xsl:variable name="vDocumentPath" select="string(concat('..//Projects//',$vDocumentBase))"/>
							<xsl:variable name="vDocumentProj" select="document($vDocumentPath)"/>
							<xsl:text>Approved By: </xsl:text>
							<select id="ApprovedBy" onmouseover="addEditValues('{$vID}', '0')" onchange="if (this.selectedIndex) selectBoxChange('{$vID}', '1', this.value);">
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
							<xsl:variable name="vIndex" select="@index"/>
							<xsl:value-of select="Name"/>
							<xsl:text>'s Comment: </xsl:text>
							<textarea id="{$vID}Para{$vIndex}" rows='(parseInt(this.value.length/this.cols)+2||1)' oncontextmenu="showMenu('{$vID}', '2', '{$vIndex}');return false;">
								<xsl:text>Enter Comment Here.</xsl:text></textarea>
							<br/>
							
							
						</xsl:if>
					</xsl:if>
					<xsl:if test="TestResult">
						<xsl:text>Test Result: </xsl:text>
						<select id="TestResult" onmouseover="addEditValues('{$vID}', '0')" onchange="if (this.selectedIndex) selectBoxChange('{$vID}', '0', this.value);">
							<option value="-1" selected="selected">
								<xsl:value-of select="TestResult"/>
							</option>
						</select>
						<br/>
						<xsl:variable name="vDocumentBase" select="/*/@xml:base"/>
						<xsl:variable name="vDocumentPath" select="string(concat('..//Projects//',$vDocumentBase))"/>
						<xsl:variable name="vDocumentProj" select="document($vDocumentPath)"/>
						<xsl:if test="not(ApprovedBy)">
							<xsl:text>Approved By: </xsl:text>
							<select id="ApprovedBy" onmouseover="addEditValues('{$vID}', '0')" onchange="if (this.selectedIndex) selectBoxChange('{$vID}', '1', this.value);">
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
						</xsl:if>
						<xsl:for-each select="ApprovedBy[@isNewest='true']">
							<xsl:text>Approved By: </xsl:text>
							<select id="ApprovedBy" onmouseover="addEditValues('{$vID}', '0')" onchange="if (this.selectedIndex) selectBoxChange('{$vID}', '1', this.value);">
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
					</xsl:if>
					<div id="refs">
					<xsl:apply-templates select="Ref"/>
						<xsl:if test="position() != last()">
							<br/>
						</xsl:if>
					</div>
				</div>
			</div>
		</xsl:if>
		<xsl:apply-templates select="Section" mode="para"/>
        <xsl:apply-templates select="Requirement" mode="para"/>
    </xsl:template>


	<xsl:template match="Para">
		<xsl:if test="@isNewest = 'true'">
			<xsl:variable name="vID">
				<xsl:value-of select="../@id"/>
			</xsl:variable>
			<xsl:variable name="vIndex">
				<xsl:value-of select="@index"/>
			</xsl:variable>
			<div id="Para">
				
				<textarea id="{$vID}Para{$vIndex}" oncontextmenu="showMenu('{$vID}', '2', '{$vIndex}');return false;">
				<xsl:value-of select="."/></textarea>
				<br/>
				<div id="{$vID}ParaMenu{$vIndex}" style="display: none;">
					<button onclick="add('{$vID}', '0', '3', '{$vIndex}')">Add Para Above</button>
					<br/>
					<button onclick="add('{$vID}', '1', '3', '{$vIndex}')">Add Para Below</button>
					<br/>
					<button onclick="remove('{$vID}', '{$vIndex}', '3')">Remove Para</button>
					<br/>
					<button onclick="hideMenu('{$vID}', '1', '{$vIndex}')" id="close">Cancel</button>
				</div>
				<br/>
			</div>
		</xsl:if>
    </xsl:template>
	
	
	<xsl:template match="Ref">
		<xsl:if test="@isNewest = 'true'">
			<xsl:variable name="vID" select="."/>
			<xsl:variable name="vfromID" select="../@id"/>
			<xsl:variable name="vDocumentBase" select="ancestor-or-self::*/@xml:base"/>
			<xsl:variable name="vDocumentPath" select="string(concat('..//Projects//',$vDocumentBase))"/>
			<xsl:variable name="vDocumentProj" select="document($vDocumentPath)"/>
			<xsl:variable name="vTitle">
				<xsl:for-each select="$vDocumentProj//*//file_location">
					<xsl:variable name="vLocations" select="*/@href"/>
					<xsl:variable name="vDocumentNewPath" select="string(concat('..//XML//',$vLocations))"/>
					<xsl:for-each select="document($vDocumentNewPath)/descendant-or-self::*/*[@id=$vID]">
						<xsl:value-of select="Title"/>
						<xsl:if test="position() != last()">
							<br/>
						</xsl:if>
					</xsl:for-each>
				</xsl:for-each>
			</xsl:variable>
			<xsl:variable name="vPara">
				<xsl:for-each select="$vDocumentProj//*//file_location">
					<xsl:variable name="vLocations" select="*/@href"/>
					<xsl:variable name="vDocumentNewPath" select="string(concat('..//XML//',$vLocations))"/>
					<xsl:for-each select="document($vDocumentNewPath)/descendant-or-self::*/*[@id=$vID]/*">
						<xsl:for-each select="Para">
							<xsl:value-of select="."/> 
						</xsl:for-each>
					</xsl:for-each>
				</xsl:for-each>
			</xsl:variable>
			<xsl:variable name="vTestResult">
				<xsl:for-each select="$vDocumentProj//*//file_location">
					<xsl:variable name="vLocations" select="*/@href"/>
					<xsl:variable name="vDocumentNewPath" select="string(concat('..//XML//',$vLocations))"/>
					<xsl:for-each select="document($vDocumentNewPath)/descendant-or-self::*/*[@id=$vID]">
						<xsl:value-of select="TestResult"/>
						<xsl:if test="position() != last()">
							<br/>
						</xsl:if>
					</xsl:for-each>
				</xsl:for-each>
			</xsl:variable>
			
			<button type="button" onclick="showRef('{$vID}')" oncontextmenu="showMenu('{$vID}', '1');return false;">
				<xsl:value-of select="$vID"/></button>
			<xsl:text>&#160;&#160;</xsl:text>
			<xsl:choose>
				<xsl:when test="contains($vID, 'UC')">
					- <xsl:value-of select="$vTitle"/>
				</xsl:when>
				<xsl:when test="$vTestResult = ''">
					<b>
						<font color="red">
							<xsl:text>UNTESTED</xsl:text>
						</font>
					</b>
				</xsl:when>
				<xsl:when test="$vTestResult = 'true'">
					<b>
						<font color="green">
							<xsl:text>Passed</xsl:text>
						</font>
					</b>
					- <xsl:value-of select="$vTitle"/>
				</xsl:when>
				<xsl:when test="$vTestResult = 'false'">
					<b>
						<font color="red">
							<xsl:text>Failed</xsl:text>
						</font>
					</b>
					- <xsl:value-of select="$vTitle"/>
				</xsl:when>
			</xsl:choose>
			<div id="ref">
				<div id="{.}" style="display: none;">
					<xsl:value-of select="$vPara"/>
				</div>
				<div id="{$vID}Menu" style="display: none;">
					<button onclick="remove('{$vID}', '{$vfromID}', '2', sessvars.xml)">Remove this Reference</button>
					<br/>
					<button onclick="hideMenu('{$vID}')" id="close">Cancel</button>
				</div>
			</div>
			<xsl:apply-templates select="Ref" mode="para"/>
			<xsl:if test="position() != last()">
				<br/>
			</xsl:if>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>