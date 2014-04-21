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
            <title>Requirements Tracability Matrix</title>
            <table border="1">
                <tbody>
                    <tr style="height:100px">
                        <td style="width:120px">Requirement ID</td>
                        <td style="width:200px">Requirement Title</td>
                        <td style="width:300px">Use Case Locations</td>
                        <td style="width:300px">Test Case Locations</td>
                        <td style="width:100px">Result</td>
                        <td style="width:100px">Tested By</td>
                        <td style="width:100px">Date</td>
                        <td style="width:200px">Comment</td>
                    </tr>
                    <xsl:apply-templates select="/*/*/*/Requirement"/>
                </tbody>
            </table>
        </head>
    </html>
    </xsl:template>
    
    <xsl:template match="Requirement[@isNewest='true']">
        <tr>
            <xsl:variable name="vID2" select="@id"/>
            <xsl:variable name="vTitle2">
                <xsl:choose>
                    <xsl:when test="Title != ''">
                        <xsl:text> Title: </xsl:text>
                        <xsl:value-of select="Title"/>    
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text> Paragraph: </xsl:text>
                        <xsl:value-of select="Para"/>    
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:variable>        
            <xsl:variable name="vID" select="@id"/>
            <xsl:variable name="vDocumentUC" select="document('NotionalUseCase.xml')"/>
            <xsl:variable name="vDocumentTC" select="document('NotionalTestCase.xml')"/>
            <td>
                <button type="button" onclick="showRef('{$vID2}')">
                    <xsl:value-of select="$vID2"/>
                </button>
            </td>
            <td>
                <xsl:value-of select="$vTitle2"/>
            </td>
            <td>               
                <xsl:for-each select="Ref[@isNewest='true']">
                    <xsl:variable name="myRef" select="."/>
                    <xsl:if test="contains(., 'UC')">
                        <button type="button" onclick="showRef('{$vID}')">
                            <xsl:value-of select="."/>
                        </button>
                    </xsl:if>
                    <xsl:value-of select="$vDocumentUC/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"/>
                    <xsl:value-of select="$vDocumentUC/*/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"/>
                    <br/>
                </xsl:for-each>
            </td>
            <td>
                <xsl:for-each select="Ref[@isNewest='true']">
                    <xsl:variable name="myRef" select="."/>
                    <xsl:if test="contains(., 'TC')">
                        <button type="button" onclick="showRef('{$vID}')">
                            <xsl:value-of select="."/>
                        </button>
                    </xsl:if>
                    <xsl:value-of select="$vDocumentTC/*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"/>
                    <xsl:value-of select="$vDocumentTC/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"/>
                    <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"/>
                    <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"/>
                    <br/>
                </xsl:for-each>
            </td>
            <td>
                <xsl:for-each select="Ref[@isNewest='true']">
                    <xsl:variable name="myRef" select="."/>
                    <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/TestResult"/>
                    <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/TestResult"/>
                    <br/>
                </xsl:for-each>
            </td>                    
            <td>
                <xsl:for-each select="Ref[@isNewest='true']">
                    <xsl:variable name="myRef" select="."/>
                    <xsl:value-of select="$vDocumentTC/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Name"/>
                    <xsl:value-of select="$vDocumentTC/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Name"/>
                    <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Name"/>
                    <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Name"/>
                    <br/>
                </xsl:for-each>
            </td>
            <td>
                
<!-- DATE GOES HERE! -->    <xsl:text>the date</xsl:text>        
            
            </td>
            <td>
                <xsl:for-each select="Ref[@isNewest='true']">
                    <xsl:variable name="myRef" select="."/>
                    <xsl:value-of select="$vDocumentTC/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Para[@isNewest='true']"/>
                    <xsl:value-of select="$vDocumentTC/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Para[@isNewest='true']"/>
                    <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Para[@isNewest='true']"/>
                    <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Para[@isNewest='true']"/>
                    <br/>
                </xsl:for-each>
            </td>
        </tr>
        <xsl:apply-templates select="Requirement"/>
    </xsl:template>
</xsl:stylesheet>