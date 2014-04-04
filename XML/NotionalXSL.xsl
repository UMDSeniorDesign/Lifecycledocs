<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="SoftwareRequirementsDocument">
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
				<div id="edit" contenteditable="true" style="display: none;">
				</div>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="Section" mode="section">
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
		<xsl:apply-templates select="Section" mode="section"/>
        <xsl:apply-templates select="Requirement" mode="section"/>
    </xsl:template>
	<xsl:template match="Requirement" mode="section">
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
		<xsl:apply-templates select="Section" mode="section"/>
        <xsl:apply-templates select="Requirement" mode="section"/>
    </xsl:template>
    <xsl:template match="Requirement" mode="para">
		<div id="preview">
			<div id="{@id}" style="display: none;">
				<xsl:apply-templates select="Para"/>
				<br/>
			</div>
		</div>
        <xsl:apply-templates select="Section" mode="para"/>
        <xsl:apply-templates select="Requirement" mode="para"/>
    </xsl:template>
	<xsl:template match="Section" mode="para">
        <div id="preview">
			<div id="{@id}" style="display: none;">
				<xsl:apply-templates select="Para"/>
				<br/>
			</div>
		</div>
		<xsl:apply-templates select="Section" mode="para"/>
        <xsl:apply-templates select="Requirement" mode="para"/>
    </xsl:template>
	<xsl:template match="Para">
		<div id="Para">
			<xsl:value-of select="."/>
			<br/>
		</div>
    </xsl:template>
</xsl:stylesheet>