<?xml version="1.0" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="TestCaseDocument">
        <html>
            <head>
                <script>
                    function test(ID, title){
						var edit = 0;
						var para = document.getElementById(ID).innerHTML;
						var text = "<u>"+ID;
                        text += " - ";
                        text += "<i>"+title+"</i></u>";
						text += "<p>";
                        text += para;
                        text += "</p>";
						var preview = document.getElementById("preview");
						//preview.innerHTML = text;
						if(edit == 0){
							preview.innerHTML = text;
						}
						if(edit > 0){
							var editLocation = document.getElementById("edit");
							editLocation.innerHTML = text;
							editLocation.style.display = 'block';
						}
                    }
					function showRef(ID){
						var refSpot = document.getElementById("ref");
						var infoSpot = document.getElementById(ID);
						infoSpot.style.display = "block";
					}
				</script>
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
				<div id="edit" contenteditable="true" style="display: none;">
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
			<button type="button" onclick="test('{$vID}','{$vTitle}')">
				<xsl:value-of select="$vID"/></button> - 
			<xsl:value-of select="$vTitle"/>
		</xsl:if>
        <xsl:apply-templates select="Section" mode="section"/>
        <xsl:apply-templates select="Requirement" mode="section"/>
    </xsl:template>
	
    <xsl:template match="Section" mode="para">
		<xsl:if test="@isNewest = 'true'">
			<div id="preview">
				<div id="{@id}" style="display: none;">
					<xsl:apply-templates select="Para"/>
					<xsl:text>Test Result: </xsl:text>
					<xsl:apply-templates select="TestResult"/>
					<xsl:text>Approved by: </xsl:text>                
					<xsl:apply-templates select="ApprovedBy"/>
					<xsl:apply-templates select="Ref"/>                
					<br/>
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
	
    <xsl:template match="TestResult">
		<xsl:if test="@isNewest = 'true'">
			<div id="Para">
				<xsl:value-of select="."/>
				<br/>
			</div>
		</xsl:if>
    </xsl:template>
	
    <xsl:template match="ApprovedBy" mode="section">
        <xsl:apply-templates select="Name"/>
        <xsl:apply-templates select="Para"/>
        <xsl:apply-templates select="ApprovedBy" mode="section"/>        
    </xsl:template>
	
    <xsl:template match="Name">
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
            <!--<xsl:for-each select="document('NotionalSRS2ns.xml')//SoftwareRequirementsDocument//Section//Requirement[@id=$vID]">
                <xsl:value-of select="Title"/>
              <xsl:for-each select="Para">
                  <xsl:apply-templates select="Para"/>
                    <xsl:value-of select="."/> 
                </xsl:for-each>
            </xsl:for-each>
           -->
        </xsl:variable>
        <xsl:variable name="vPara">
           <!-- <xsl:for-each select="document('NotionalSRS2ns.xml')//SoftwareRequirementsDocument//Section//Requirement[@id=$vID]">  
                <xsl:for-each select="Para">
                    <xsl:value-of select="."/> . 
                </xsl:for-each> 
            </xsl:for-each>-->
        </xsl:variable>
        <button type="button" onclick="showRef('{$vID}')">
			<xsl:value-of select="$vID"/></button>
		<div id="ref">
            <div id="{.}" style="display: none;">
				<xsl:value-of select="$vTitle"/>
			</div>
		</div>
        <xsl:apply-templates select="Ref" mode="para"/>
        <br/>
    </xsl:template>
</xsl:stylesheet>