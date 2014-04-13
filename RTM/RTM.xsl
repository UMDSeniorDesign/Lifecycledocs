<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:template match="SoftwareRequirementsDocument">
    <html>
        <head>
            <script>
                function showRef(ID){
                var refSpot = document.getElementById("ref");
                var infoSpot = document.getElementById(ID);
                infoSpot.style.display = 'block';
                }
            </script>
            <title>Lifecycle Documents</title>
            <xsl:apply-templates select="/*/*/*/Requirement"/>
            


            <br></br>
            <xsl:value-of select="document('NotionalUseCase.xml')/*/*/Requirement/@id"/>
            <xsl:value-of select="document('NotionalUseCase.xml')/UseCaseDocument/Section/Requirement/Title"/>
            <br></br>
            <xsl:value-of select="document('NotionalUseCase.xml')/UseCaseDocument/Section/*/Requirement/@id"/>
            <xsl:value-of select="document('NotionalUseCase.xml')/UseCaseDocument/Section/*/Requirement/Title"/>
            <br></br>
            <xsl:value-of select="document('NotionalUseCase.xml')/*/*/Requirement/@id"/>
            <xsl:value-of select="document('NotionalUseCase.xml')/UseCaseDocument/Section/Requirement/Title"/>
            <br></br>

        </head>
    </html>
    </xsl:template>
    
    <xsl:template match="Requirement">

        <xsl:variable name="vID">
            <xsl:value-of select="@id"/>
        </xsl:variable>
        <xsl:variable name="vTitle">
            <xsl:text> Title: </xsl:text>
            <xsl:value-of select="Title"/>
            <xsl:text> Description: </xsl:text>
            <xsl:value-of select="Para"/>
        </xsl:variable>
        
        
        <button type="button" onclick="showRef('{$vID}')">
            <xsl:value-of select="$vID"/>
        </button>
        <xsl:value-of select="$vTitle"/>
        
        <xsl:for-each select="Ref">
            <br/>
            <button type="button" onclick="showRef('{$vID}')">
                <xsl:value-of select="."/>
            </button>
            <xsl:copy-of select="document('NotionalUseCase.xml')/UseCaseDocument/*/Requirement[@id=$vID]/Title"/>
            <xsl:value-of select="document('NotionalTestCase.xml')/TestCaseDocument/*/Requirement/Title"/>
            
            <xsl:text>doggy</xsl:text>
        </xsl:for-each>
        <br/><br/>

        <xsl:apply-templates select="Requirement"/>        
    </xsl:template>
</xsl:stylesheet>