<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="SoftwareRequirementsDocument">
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
					function addSection(ID){
						//alert("Right Clicked"+ID);
						window.open('addSection.hta','AddSection');
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
			
			<button type="button" onclick="showSection('{$vID}','{$vTitle}')" oncontextmenu="addSection('{$vID}');return false;">
			<xsl:value-of select="$vID"/></button> - 
			<xsl:value-of select="$vTitle"/>
		</xsl:if>
		<div id="sub{@id}" contenteditable="false">
		<div contenteditable="false">
			<xsl:apply-templates select="Section" mode="section"/>
			<xsl:apply-templates select="Requirement" mode="section"/>
		</div>	
		</div>
    </xsl:template>
	
	<xsl:template match="Requirement" mode="section">
		<xsl:if test="@isNewest = 'true'">
			<br/>
			<xsl:variable name="vID">
				<xsl:value-of select="@id"/>
			</xsl:variable>
			<xsl:variable name="vTitle">
				<xsl:value-of select="Title"/>
			</xsl:variable>
			<li>
			<button type="button" onclick="showSection('{$vID}','{$vTitle}')" oncontextmenu="addSection('{$vID}');return false;">
			<xsl:value-of select="$vID"/></button>
			</li>
		</xsl:if>
		<div id="sub{@id}" style="display: none;">
		<div contenteditable="false">
			<xsl:apply-templates select="Section" mode="section"/>
			<xsl:apply-templates select="Requirement" mode="section"/>
		</div>
		</div>
    </xsl:template>
	
    <xsl:template match="Requirement" mode="para">
		<xsl:if test="@isNewest = 'true'">
			<div id="preview">
				<div id="{@id}" style="display: none;">
					<xsl:apply-templates select="Para"/>
					<br/>
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
	
	<xsl:template match="Section" mode="para">
		<xsl:if test="@isNewest = 'true'">
			<div id="preview">
				<div id="{@id}" style="display: none;">
					<xsl:apply-templates select="Para"/>
					<br/>
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
              <xsl:for-each select="Para">
                  <xsl:apply-templates select="Para"/>
                    <xsl:value-of select="."/> 
                </xsl:for-each>
            </xsl:for-each>
        </xsl:variable>
        <xsl:variable name="vPara">
            <xsl:for-each select="document('NotionalUseCase.xml')//UseCaseDocument//Section//Requirement[@id=$vID]//Requirement">  
                <xsl:for-each select="Para">
                    <xsl:value-of select="."/>
                </xsl:for-each> 
            </xsl:for-each>
        </xsl:variable>
		<div contenteditable="false">
			<button type="button" onclick="showRef('{$vID}')">
				<xsl:value-of select="$vID"/></button>
			<div id="ref">
				<div id="{.}" style="display: none;">
					<xsl:value-of select="$vTitle"/>
					<br/>
					<xsl:value-of select="$vPara"/>
				</div>
			</div>
		</div>
		<xsl:apply-templates select="Ref" mode="para"/>
		<br/>
    </xsl:template>
</xsl:stylesheet>