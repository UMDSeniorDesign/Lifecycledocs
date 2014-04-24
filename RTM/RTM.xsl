<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:output method="html" indent="yes"/>
    <xsl:strip-space elements="*"/>
    
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
            <table border="3">
                <tbody>
                    <tr style="height:50px">
                        <th style="width:120px">Requirement ID</th>
                        <th style="width:200px">Requirement Title</th>
                        <th style="width:300px">Use Case Locations</th>
                        <th style="width:300px">Test Case Locations</th>
                        <th style="width:100px">Last Result</th>
                        <th style="width:100px">Tested By</th>
                        <th style="width:100px">Date</th>
                        <th style="width:200px">Comment</th>
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
                    <xsl:when test="Para != ''">
                        <xsl:text> Paragraph: </xsl:text>
                        <xsl:value-of select="Para"/>    
                    </xsl:when>
                    <xsl:otherwise>
                        <font color="red">
                            <xsl:text>DNE</xsl:text>
                        </font>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:variable>        
            <xsl:variable name="vID" select="@id"/>
            <xsl:variable name="vDocumentUC" select="document('NotionalUseCase.xml')"/>
            <xsl:variable name="vDocumentTC" select="document('NotionalTestCase.xml')"/>
            <xsl:variable name="UCCount" select="count(Ref[substring(.,1,2) = 'UC'][@isNewest='true'])"/>
            <xsl:variable name="TCCount" select="count(Ref[substring(.,1,2) = 'TC'][@isNewest='true'])"/>
            <xsl:variable name="spanRow">
                <xsl:choose>
                    <xsl:when test="number($TCCount) &gt; number($UCCount)">
                        <xsl:value-of select="number($TCCount)"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="number($UCCount)"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:variable>
            
            <td rowspan="{$spanRow + 1}">
                <button type="button" onclick="showRef('{$vID2}')">
                    <xsl:value-of select="$vID2"/>
                </button>
            </td>
            <td rowspan="{$spanRow + 1}">
                <xsl:value-of select="$vTitle2"/>
            </td>
            <td rowspan="{$spanRow + 1}">
                <xsl:choose>
                    <xsl:when test="$UCCount &lt; 1">
                        <b>
                            <font color="green">
                                <xsl:text>No Use Cases</xsl:text>
                            </font>
                        </b>
                    </xsl:when>
                    <xsl:otherwise>
                        <table>
                            <xsl:for-each select="Ref[@isNewest='true']">
                                <xsl:variable name="myRef" select="."/>
                                <xsl:if test="contains(., 'UC')">
                                    <button type="button" onclick="showRef('{$vID}')">
                                        <xsl:value-of select="."/>
                                    </button>
                                </xsl:if>
                                <xsl:value-of select="$vDocumentUC/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"/>
                                <xsl:value-of select="$vDocumentUC/*/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"/>
                                <xsl:if test="position() != last()">
                                    <br/>    
                                </xsl:if>
                            </xsl:for-each>
                        </table>
                    </xsl:otherwise>
                </xsl:choose>
            </td>
            <xsl:choose>
                <xsl:when test="$TCCount = 0">
                    <td rowspan="{$spanRow + 1}" colspan="5">
                        <b>
                            <font color="blue">
                                <xsl:text>No Test Cases</xsl:text>
                            </font>
                        </b>
                    </td>
                    <xsl:call-template name="addRow">
                        <xsl:with-param name="num" select="$spanRow"/>
                    </xsl:call-template>
                </xsl:when>
                <xsl:when test="$TCCount = 1">
                    <xsl:call-template name="testCase">
                        <xsl:with-param name="i">0</xsl:with-param>
                        <xsl:with-param name="rows" select="$spanRow"/>
                    </xsl:call-template> 
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="testCase">
                        <xsl:with-param name="i">2</xsl:with-param>
                        <xsl:with-param name="rows" select="$spanRow"/>
                    </xsl:call-template> 
                </xsl:otherwise>
            </xsl:choose>
        </tr>
        <xsl:apply-templates select="Requirement"/>
    </xsl:template>
    
    <xsl:template name="addRow">
        <xsl:param name="num"/>
        <xsl:if test="$num &gt; 0">
            <tr></tr>
        </xsl:if>
        <xsl:if test="$num &gt; 0">
            <xsl:call-template name="addRow">
                <xsl:with-param name="num">
                    <xsl:value-of select="$num - 1"/>
                </xsl:with-param>
            </xsl:call-template>
        </xsl:if>
    </xsl:template>
    
    <xsl:template name="testResults">
        <xsl:param name="myRef"/>
        <xsl:variable name="vDocumentUC" select="document('NotionalUseCase.xml')"/>
        <xsl:variable name="vDocumentTC" select="document('NotionalTestCase.xml')"/>
        
        <td>
            <xsl:choose>
                <xsl:when test="(($vDocumentTC/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/TestResult) = 'false') 
                    or (($vDocumentTC/*/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/TestResult) = 'false')
                    or (($vDocumentTC/*/*[@isNewest='true']/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/TestResult) = 'false')">
                    <font color="red">
                        <xsl:text>Failed</xsl:text>
                    </font>
                </xsl:when>
                <xsl:when test="(($vDocumentTC/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/TestResult) = 'true')
                    or (($vDocumentTC/*/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/TestResult) = 'true')
                    or (($vDocumentTC/*/*[@isNewest='true']/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/TestResult) = 'true')">
                    <font color="green">
                        <xsl:text>Passed</xsl:text>
                    </font>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:text>Invalid/Missing Data</xsl:text>
                </xsl:otherwise>
            </xsl:choose>
        </td>
        <td>
            <xsl:value-of select="$vDocumentTC/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Name"/>
            <xsl:value-of select="$vDocumentTC/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Name"/>
            <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Name"/>
            <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Name"/>
        </td>
        <td>
            
            <xsl:text>the date</xsl:text>        
            
        </td>
        <td>
            <xsl:value-of select="$vDocumentTC/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Para[@isNewest='true']"/>
            <xsl:value-of select="$vDocumentTC/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Para[@isNewest='true']"/>
            <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Para[@isNewest='true']"/>
            <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Para[@isNewest='true']"/>
        </td>
    </xsl:template>
    
    <xsl:template name="testCase">
        <xsl:param name="i"/>
        <xsl:param name="rows"/>
        <xsl:variable name="vDocumentUC" select="document('NotionalUseCase.xml')"/>
        <xsl:variable name="vDocumentTC" select="document('NotionalTestCase.xml')"/>
        
        <xsl:if test="$i &lt; $rows">
            <xsl:for-each select="Ref[@isNewest='true'][substring(.,1,2) = 'TC']">
                <xsl:variable name="myRef" select="."/>
                <tr>
                    <td>
                        <button type="button" onclick="">
                            <xsl:value-of select="."/>
                        </button>
                        <xsl:value-of select="$vDocumentTC/*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"/>
                        <xsl:value-of select="$vDocumentTC/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"/>
                        <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"/>
                        <xsl:value-of select="$vDocumentTC/*/*[@isNewest='true']/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"/>
                    </td>
                    <xsl:choose>
                        <xsl:when test="(($vDocumentTC/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/TestResult) != '')
                                    or (($vDocumentTC/*/*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/TestResult) != '')">
                            <xsl:call-template name="testResults">
                                <xsl:with-param name="myRef">
                                    <xsl:value-of select="$myRef"/>
                                </xsl:with-param>
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <td colspan="4">
                                <b>
                                    <font color="red">
                                        <xsl:text>Not Tested</xsl:text>
                                    </font>
                                </b>
                            </td>
                        </xsl:otherwise>
                    </xsl:choose>
                </tr>
            </xsl:for-each>
        </xsl:if>
        
        <xsl:if test="$i &lt; $rows">
            <xsl:call-template name="testCase">
                <xsl:with-param name="i">
                    <xsl:value-of select="$i + 1"></xsl:value-of>
                </xsl:with-param>
                <xsl:with-param name="rows">
                    <xsl:value-of select="$rows"></xsl:value-of>
                </xsl:with-param>
            </xsl:call-template>
        </xsl:if>
    </xsl:template>
</xsl:stylesheet>