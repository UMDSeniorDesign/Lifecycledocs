<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
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
                preview.innerHTML = text;
                if(edit > 0){
                preview.contentEditable = 'true';
                }
                }
                function showRef(ID){
                var refSpot = document.getElementById("ref");
                var infoSpot = document.getElementById(ID);
                infoSpot.style.display = 'block';
                }
            </script>
            <title>Lifecycle Documents</title>
            <xsl:apply-templates select="/*/*/*/Requirement"/>
            

<!-- these are external doc links 
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
-->
        </head>
    </html>
    </xsl:template>
    
    <xsl:template match="Requirement[@isNewest='true']">
        <xsl:variable name="vID2" select="@id"/>
        <xsl:variable name="vTitle2">
            <xsl:if test="Title != ''">
                <xsl:text> Title: </xsl:text>
                <xsl:value-of select="Title"/>
            </xsl:if>      
            <xsl:if test="Para != ''">
                <xsl:text> Paragraph: </xsl:text>
                <xsl:value-of select="Para"/>
            </xsl:if>
        </xsl:variable>        
        <xsl:variable name="vID" select="@id"/>
        <xsl:variable name="vDocumentUC" select="document('NotionalUseCase.xml')"/>
        <xsl:variable name="vDocumentTC" select="document('NotionalTestCase.xml')"/>
        
        <button type="button" onclick="showRef('{$vID2}')">
            <xsl:value-of select="$vID2"/>
        </button>
        <xsl:value-of select="$vTitle2"/>
        
        <xsl:for-each select="Ref[@isNewest='true']">
            <br/>
            <xsl:variable name="myRef" select="."/>
            <button type="button" onclick="showRef('{$vID}')">
                <xsl:value-of select="."/>
            </button>
            
            <xsl:value-of select="$vDocumentUC/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"/>
            <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"/>
            <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/TestResult"/>
            <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Name"/>
            <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Para[@isNewest='true']"/>
            
           
            <xsl:value-of select="$vDocumentUC/*/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"/>
            <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"/>
            <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/TestResult"/>
            <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Name"/>
            <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Para[@isNewest='true']"/>
            
        </xsl:for-each>
        <br/><br/>

        <xsl:apply-templates select="Requirement"/>        
    </xsl:template>
</xsl:stylesheet>