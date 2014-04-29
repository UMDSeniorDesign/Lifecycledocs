<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    xmlns:ext="http://exslt.org/common"
    exclude-result-prefixes="xs ext msxsl"
    version="2.0">
    <xsl:output method="html" indent="yes"/>
    <xsl:strip-space elements="*"/>
    
    <xsl:template match="SoftwareRequirementsDocument">
    <html>
        <head>
            <title>Requirements Tracability Matrix</title>
            <table border="3">
                <tbody>
                    <tr style="height:50px">
                        <th style="width:120px">Requirement ID</th>
                        <th style="width:200px">Requirement Title</th>
                        <th style="width:300px">Use Case Locations</th>
                        <th style="width:50px">Testing Completion</th>
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
        <xsl:variable name="TCPass">
            <xsl:for-each select="Ref[substring(.,1,2) = 'TC'][@isNewest='true']">
                <xsl:variable name="myRef" select="."/>
                <xsl:choose>
                    <xsl:when test="$vDocumentTC/descendant-or-self::*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/TestResult = 'true'">
                        <count>1</count>
                    </xsl:when>
                    <xsl:when test="$vDocumentTC/descendant-or-self::*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/TestResult = 'true'">
                        <count>1</count>
                    </xsl:when>
                    <xsl:otherwise>
                        <count>0</count>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:for-each>
        </xsl:variable>
        <xsl:variable name="sumTCPass" select="sum(msxsl:node-set($TCPass)/count)"/>
        <xsl:variable name="spanRow">
            <xsl:choose>
                <xsl:when test="$TCCount &lt; 1">
                    <xsl:value-of select="number(1)"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="number($TCCount)"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
    
        <tr>
            <td rowspan="{$spanRow * 2}">
                <button type="button" >   <!--onclick="function('{$vID2}')">-->
                    <xsl:value-of select="$vID2"/>
                </button>
            </td>
            <td rowspan="{$spanRow * 2}">
                <xsl:value-of select="$vTitle2"/>
            </td>
            <td rowspan="{$spanRow * 2}">
                <xsl:choose>
                    <xsl:when test="$UCCount &lt; 1">
                        <b>
                            <font color="purple">
                                <xsl:text>No Use Cases</xsl:text>
                            </font>
                        </b>
                    </xsl:when>
                    <xsl:otherwise>
                        <table>
                            <xsl:for-each select="Ref[@isNewest='true']">
                                <xsl:variable name="myRef" select="."/>
                                <xsl:if test="contains(., 'UC')">
                                    <button type="button" >     <!--onclick="function('{$vID}')">-->
                                        <xsl:value-of select="."/>
                                    </button>
                                </xsl:if>
                                <xsl:value-of select="$vDocumentUC/descendant-or-self::*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"/>
                                <xsl:if test="position() != last()">
                                    <br/>    
                                </xsl:if>
                            </xsl:for-each>
                        </table>
                    </xsl:otherwise>
                </xsl:choose>
            </td>
            <td rowspan="{$spanRow * 2}">
                <xsl:choose>
                    <xsl:when test="$TCCount = 0">
                        <b>
                            <font color="blue">
                                <xsl:text>0%</xsl:text>
                            </font>
                        </b>
                    </xsl:when>
                    <xsl:when test="$sumTCPass = $TCCount">
                        <b>
                            <font color="green">
                                <xsl:value-of select="format-number(number($sumTCPass div $TCCount), '0%')"/>
                            </font>
                        </b>
                    </xsl:when>
                    <xsl:otherwise>
                        <b>
                            <font color="red">
                                <xsl:value-of select="format-number(number($sumTCPass div $TCCount), '0%')"/>
                            </font>
                        </b>
                    </xsl:otherwise>
                </xsl:choose>
            </td>
            <xsl:choose>
                <xsl:when test="$TCCount = 0">
                    <td rowspan="{$spanRow * 2}" colspan="5">
                        <b>
                            <font color="blue">
                                <xsl:text>No Test Cases</xsl:text>
                            </font>
                        </b>
                    </td>
                    <tr></tr>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="testCaseRow">
                        <xsl:with-param name="i">0</xsl:with-param>
                        <xsl:with-param name="rows" select="$spanRow"/>
                    </xsl:call-template>
                </xsl:otherwise>
            </xsl:choose>
        </tr>
        <xsl:apply-templates select="Requirement"/>
    </xsl:template>
    
    <xsl:template name="testCaseRow">
        <xsl:param name="i"/>
        <xsl:param name="rows"/>
        <xsl:variable name="vDocumentUC" select="document('NotionalUseCase.xml')"/>
        <xsl:variable name="vDocumentTC" select="document('NotionalTestCase.xml')"/>
        
        <xsl:if test="($i = 'no_value') or ($i = 'no_value')">
            <xsl:call-template name="testCaseRow">
                <xsl:with-param name="i">0</xsl:with-param>
                <xsl:with-param name="rows">0</xsl:with-param>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="$i &lt; $rows">
            <xsl:for-each select="Ref[@isNewest='true'][substring(.,1,2) = 'TC']">
                <xsl:variable name="myRef" select="."/>
                <td>
                    <button type="button" onclick="">
                        <xsl:value-of select="."/>
                    </button>
                    <xsl:value-of select="$vDocumentTC/descendant-or-self::*[@id=$myRef][@isNewest='true']/Title[@isNewest='true']"></xsl:value-of>
                </td>
                <xsl:choose>
                    <xsl:when test="$vDocumentTC/descendant-or-self::*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/TestResult != ''">                            
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
                
                <xsl:if test="$i &lt; $rows">
                    <tr>
                        <xsl:call-template name="testCaseRow">
                            <xsl:with-param name="i">
                                <xsl:value-of select="$i + 1"/>
                            </xsl:with-param>
                            <xsl:with-param name="rows">
                                <xsl:value-of select="$rows"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </tr>
                </xsl:if>
            </xsl:for-each>
        </xsl:if>
    </xsl:template>
    
    <xsl:template name="testResults">
        <xsl:param name="myRef"/>
        <xsl:variable name="vDocumentUC" select="document('NotionalUseCase.xml')"/>
        <xsl:variable name="vDocumentTC" select="document('NotionalTestCase.xml')"/>
        
        <td>
            <xsl:choose>
                <xsl:when test="$vDocumentTC/descendant-or-self::*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/TestResult = 'false'">
                    <font color="red">
                        <xsl:text>Failed</xsl:text>
                    </font>
                </xsl:when>
                <xsl:when test="$vDocumentTC/descendant-or-self::*/*[@isNewest='true']/*[@id=$myRef][@isNewest='true']/TestResult = 'true'">
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
            <xsl:value-of select="$vDocumentTC/descendant-or-self::*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Name"/>
        </td>
        <td>
            <xsl:choose>
                <xsl:when test="$vDocumentTC/descendant-or-self::*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Date != ''">
                    <xsl:value-of select="substring-before($vDocumentTC/descendant-or-self::*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Date, 'T')"/>
                    <br/>
                    <xsl:value-of select="substring-after($vDocumentTC/descendant-or-self::*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Date, 'T')"/>
                </xsl:when>
                <xsl:otherwise>
                    <font color="blue">
                        <xsl:text>dateTime Unavailable</xsl:text>
                    </font>
                </xsl:otherwise>
            </xsl:choose>
        </td>
        <td>
            <xsl:value-of select="$vDocumentTC/descendant-or-self::*[@id=$myRef][@isNewest='true']/ApprovedBy[@isNewest='true']/Para[@isNewest='true']"/>
        </td>
    </xsl:template>
</xsl:stylesheet>