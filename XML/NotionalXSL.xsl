<?xml version="1.0" ?>
<?xml-stylesheet type="text/css" href="Stylesheets\NotionalCSS.css"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="SoftwareRequirementsDocument">
        <html>
            <head>
                <script>
                    function test(ID, title){
					var para = document.getElementById(ID).innerHTML;
					var text = "<u>"+ID;
					text += " - ";
					text += "<i>"+title+"</i></u>";
					text += "<p>";
					text += para;
					text += "</p>";
					var preview = document.getElementById("preview");
					preview.innerHTML = text;
                    }
                </script>
                <title>Lifecycle Documents</title>
                <style type="text/css">
                    h1 {
                    float: left;
                    width: 40%;
                    font-size: 12pt;
                    }
                    h2 {
                    float: right;
                    width: 60%;
                    font-size: 12pt;
                    font-style: normal;
                    font-weight: normal;
                    }
                    h3 {
                    font-style: bold;
                    font-weight: normal;
                    }
                </style>  
            </head>
            <body>
				<xsl:apply-templates select="Section"/>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="Section">
       <br/>
	   <xsl:variable name="vID">
			<xsl:value-of select="@id"/>
		</xsl:variable>
		<xsl:variable name="vTitle">
			<xsl:value-of select="Title"/>
		</xsl:variable>
		<xsl:variable name="vPara">
			<!--<xsl:apply-templates select="Para"/>-->
			<xsl:for-each select="Para">
			<xsl:value-of select="."/>
			</xsl:for-each>
		</xsl:variable>
        <h1>
            <!--<a onclick="test('{$vID}','{$vTitle}')">
                <xsl:attribute name="href"/>
                <xsl:value-of select="$vID"/>
			</a> -
			-->
			<button type="button" onclick="test('{$vID}','{$vTitle}')">
			<xsl:value-of select="$vID"/></button> - 
        <xsl:value-of select="$vTitle"/>
        </h1>
        <h2>
			<div id="preview">
			<div id="{@id}" style="display: none;">
            <xsl:apply-templates select="Para"/>
			</div>
			<!--<xsl:value-of select="$vPara"/>-->
			</div>
        </h2>
		<h1>
        <xsl:apply-templates select="Section"/>
        <xsl:apply-templates select="Requirement"/>
		</h1>
    </xsl:template>
    <xsl:template match="Requirement">
		<br/>
		<xsl:variable name="vID">
			<xsl:value-of select="@id"/>
		</xsl:variable>
		<xsl:variable name="vTitle">
			<xsl:value-of select="Title"/>
		</xsl:variable>
		<xsl:variable name="vPara">
			<!--<xsl:apply-templates select="Para"/>-->
			<xsl:for-each select="Para">
			<xsl:value-of select="."/>
			</xsl:for-each>
		</xsl:variable>
		<h1>
            <!--<a onclick="test('{$vID}','{$vTitle}')">
                <xsl:attribute name="href"/>
                <xsl:value-of select="$vID"/>
			</a> -
			-->
			<button type="button" onclick="test('{$vID}','{$vTitle}')">
			<xsl:value-of select="$vID"/></button> - 
        <xsl:value-of select="$vTitle"/>
        </h1>
        <h2>
			<div id="preview"> 
			<div id="{@id}" style="display: none;">
            <xsl:apply-templates select="Para"/>
			</div>
            </div>
        </h2>
		<h1>
        <xsl:apply-templates select="Section"/>
        <xsl:apply-templates select="Requirement"/>
		</h1>
    </xsl:template>
    <xsl:template match="Para">
        <xsl:value-of select="."/>
        <br/>
    </xsl:template>
</xsl:stylesheet>