<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:strip-space elements="*"/>
    
    <xsl:template match="/">
        <xsl:variable name="fontSizeOffset" select="number(6)"/>
        <xsl:variable name="base" select="document(*/@xml:base)"/>
        
        <font size="7">
            <p align="center">
                <b>
                    <xsl:value-of select="*/@projectName"/>
                </b>
                
            </p>
        </font>
        <font size="4">
            <div align="center">
                <table>
                    <tr>
                        <th align="left">
                            <xsl:text>Authors:</xsl:text>
                        </th>
                        <th></th><th></th>
                    </tr>
                    <xsl:for-each select="$base/descendant-or-self::TeamMember[@isNewest = 'true']">
                        <tr>
                            <td>
                                <xsl:value-of select="UIC[@isNewest = 'true']"/>
                            </td>
                            <td>
                                <xsl:value-of select="Name[@isNewest = 'true']"/>
                            </td>
                            <td>
                                <xsl:value-of select="Role[@isNewest = 'true']"/>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </div>
            <xsl:for-each select="/*/Para[@isNewest = 'true']">
                <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
                <xsl:value-of select="/*/Para[@isNewest = 'true']"/>
            </xsl:for-each>
            <br/>
        </font>
        <xsl:choose>
            <xsl:when test="/*/Requirement[@isNewest = 'true'] != ''">
                <xsl:for-each select="/*/Requirement[@isNewest = 'true']">
                    <xsl:apply-templates select="/*/Requirement">
                        <xsl:with-param name="sizeOffset" select="$fontSizeOffset"/>
                    </xsl:apply-templates>
                </xsl:for-each>
            </xsl:when>
            <xsl:when test="/*/Section[@isNewest = 'true'] != ''">
                <xsl:apply-templates select="/*/Section">
                        <xsl:with-param name="sizeOffset" select="$fontSizeOffset"/>
                    </xsl:apply-templates>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text> eof </xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    
    <xsl:template match="Requirement">
        <xsl:param name="sizeOffset"/>
        <xsl:variable name="myID" select="@id"/>
        <xsl:variable name="base" select="document(ancestor-or-self::*/@xml:base)"/>
        
        <br/><br/>
        <xsl:if test="$sizeOffset &lt; 6">
            <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
        </xsl:if>
        <xsl:if test="$sizeOffset &lt; 5">
            <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
        </xsl:if>
        <xsl:if test="$sizeOffset &lt; 4">
            <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
        </xsl:if>
        <b><u>
        <font size="{$sizeOffset}">
            <xsl:value-of select="@id"/> -
            <xsl:if test="Title != ''">
                
            </xsl:if>
            <xsl:value-of select="Title"/>
        </font>
        </u></b>
        <p>
            <font size="4">
                <xsl:for-each select="Para">
                    <xsl:if test="$sizeOffset &lt; 6">
                        <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
                    </xsl:if>
                    <xsl:if test="$sizeOffset &lt; 5">
                        <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
                    </xsl:if>
                    <xsl:if test="$sizeOffset &lt; 4">
                        <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
                    </xsl:if>
                    <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
                    <xsl:value-of select="."/>
                    <br/>
                </xsl:for-each>
            </font>
        </p>
        <xsl:if test="TestResult != ''">
            <div align="center">
                <table border="1">
                    <tbody>
                        <tr>
                            <th style="width:100px" align="center">
                                <xsl:value-of select="@id"/>
                                <xsl:text>&#160;Result:&#160;</xsl:text>
                                <xsl:choose>
                                    <xsl:when test="(TestResult = 'false')
                                        or (TestResult = 'Fail')">
                                        <font color="red">
                                            <xsl:text>Failed</xsl:text>
                                        </font>
                                    </xsl:when>
                                    <xsl:when test="(TestResult = 'true')
                                        or (TestResult = 'Pass')">
                                        <font color="green">
                                            <xsl:text>Passed</xsl:text>
                                        </font>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:text>Invalid/Missing Data</xsl:text>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </th>
                            <th style="width:300px">
                                <xsl:text>Table of Previous Results:</xsl:text>
                            </th>
                            <th>
                                <xsl:text>Comments:</xsl:text>
                            </th>
                        </tr>
                        <xsl:if test="TestResult != ''">
                            <xsl:for-each select="ApprovedBy">
                                <tr>
                                    <td align="center">
                                        <font size="4">
                                            <xsl:choose>
                                                <xsl:when test="UIC != ''">
                                                    <xsl:value-of select="UIC"/>
                                                    <xsl:text>&#160;&#160;</xsl:text> 
                                                </xsl:when>
                                                <xsl:when test="Name[@isNewest = 'true'] != ''">
                                                    <xsl:variable name="thisName" select="Name[@isNewest = 'true']"/>
                                                    <xsl:variable name="xmlBase" select="document(ancestor::*/@xml:base)"/>
                                                    <xsl:value-of select="$xmlBase/descendant-or-self::TeamMember[@isNewest = 'true'][Name[@isNewest = 'true'] = $thisName]/UIC[@isNewest = 'true']"/>
                                                    <xsl:text>&#160;&#160;</xsl:text> 
                                                </xsl:when>
                                            </xsl:choose>
                                            <b>
                                                <xsl:value-of select="Name[@isNewest = 'true']"/>
                                            </b>
                                        </font>
                                    </td>
                                    <td align="center">
                                        <xsl:value-of select="substring-before(Date[@isNewest = 'true'], 'T')"/>
                                        <br/>
                                        <xsl:value-of select="substring-after(Date[@isNewest = 'true'], 'T')"/>
                                    </td>
                                    <td>
                                        <xsl:value-of select="Para[@isNewest = 'true']"/>
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </xsl:if>
                    </tbody>
                </table>
            </div>
        </xsl:if>
        <br/>
        <xsl:if test="Ref != ''">
            <div align="center">
                <table border="1">
                    <tbody>
                        <tr align="left">
                            <th colspan="3">
                                <xsl:value-of select="$myID"/>
                                <xsl:text>&#160;References:&#160;</xsl:text>
                            </th>
                        </tr>
                    </tbody>
                    <tbody>
                        <xsl:for-each select="Ref">
                            <xsl:variable name="myRef" select="."/>
                            <tr>
                                <td align="right">
                                    <xsl:value-of select="position()"/> -
                                </td>
                                <td>
                                    <xsl:value-of select="$myRef"/>
                                </td>
                                <td>
                                    <xsl:for-each select="$base/descendant-or-self::*/file_location">
                                        <xsl:variable name="myHREF" select="*/@href"/>
                                        <xsl:variable name="newDoc" select="document($myHREF)"/>
                                        <xsl:choose>
                                            <xsl:when test="$newDoc/descendant-or-self::*[@isNewest = 'true'][@id = $myRef]/Title[@isNewest = 'true'] = ''">
                                                <xsl:value-of select="$newDoc/descendant-or-self::*[@isNewest = 'true'][@id = $myRef]/Para[@isNewest = 'true']"/>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:value-of select="$newDoc/descendant-or-self::*[@isNewest = 'true'][@id = $myRef]/Title[@isNewest = 'true']"/>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                    </xsl:for-each>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
            </div>
        </xsl:if>
        
        <xsl:if test="Requirement[@isNewest = 'true'] != ''">
            <xsl:apply-templates select="Requirement">
                <xsl:with-param name="sizeOffset" select="($sizeOffset - 1)"/>
            </xsl:apply-templates>
        </xsl:if>
        <xsl:if test="Section[@isNewest = 'true'] != ''">
            <xsl:apply-templates select="Section">
                <xsl:with-param name="sizeOffset" select="($sizeOffset - 1)"/>
            </xsl:apply-templates>
        </xsl:if>
    </xsl:template>
    
    
    <xsl:template match="Section">
        <xsl:param name="sizeOffset"/>
        <xsl:variable name="myID" select="@id"/>
        <xsl:variable name="base" select="document(ancestor-or-self::*/@xml:base)"/>
        
        <br/><br/>
        <xsl:if test="$sizeOffset &lt; 6">
            <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
        </xsl:if>
        <xsl:if test="$sizeOffset &lt; 5">
            <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
        </xsl:if>
        <xsl:if test="$sizeOffset &lt; 4">
            <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
        </xsl:if>
        <b><u>
        <font size="{$sizeOffset}">
            <xsl:value-of select="@id"/> -
            <xsl:value-of select="Title"/>
        </font>
        </u></b>
        <p>
        <font size="4">
            <xsl:for-each select="Para">
                <xsl:if test="$sizeOffset &lt; 6">
                    <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
                </xsl:if>
                <xsl:if test="$sizeOffset &lt; 5">
                    <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
                </xsl:if>
                <xsl:if test="$sizeOffset &lt; 4">
                    <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
                </xsl:if>
                
                <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
                <xsl:value-of select="."/>
                <br/>
            </xsl:for-each>
        </font>
        </p>
        <xsl:if test="Ref = ''">
            <div align="center">
                <b>
                    <font color="red" size="4">
                        <xsl:value-of select="$myID"/>
                        <xsl:text> - has no references</xsl:text>
                    </font>
                </b>
            </div>
        </xsl:if>
        <xsl:if test="TestResult != ''">
            <div align="center">
                <table border="1">
                    <tbody>
                        <tr>
                            <th style="width:100px" align="center">
                                <xsl:value-of select="$myID"/>
                                <xsl:text>&#160;Result:&#160;</xsl:text>
                                <xsl:choose>
                                    <xsl:when test="(TestResult = 'false')
                                        or (TestResult = 'Fail')">
                                        <font color="red">
                                            <xsl:text>Failed</xsl:text>
                                        </font>
                                    </xsl:when>
                                    <xsl:when test="(TestResult = 'true')
                                        or (TestResult = 'Pass')">
                                        <font color="green">
                                            <xsl:text>Passed</xsl:text>
                                        </font>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:text>Invalid/Missing Data</xsl:text>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </th>
                            <th style="width:300px">
                                <xsl:text>Table of Previous Results:</xsl:text>
                            </th>
                            <th>
                                <xsl:text>Comments:</xsl:text>
                            </th>
                        </tr>
                        <xsl:if test="TestResult != ''">
                            <xsl:for-each select="ApprovedBy">
                                <tr>
                                    <td align="center">
                                        <font size="4">
                                            <xsl:choose>
                                                <xsl:when test="UIC != ''">
                                                    <xsl:value-of select="UIC"/>
                                                    <xsl:text>&#160;&#160;</xsl:text> 
                                                </xsl:when>
                                                <xsl:when test="Name[@isNewest = 'true'] != ''">
                                                    <xsl:variable name="thisName" select="Name[@isNewest = 'true']"/>
                                                    <xsl:variable name="xmlBase" select="document(ancestor::*/@xml:base)"/>
                                                    <xsl:value-of select="$xmlBase/descendant-or-self::TeamMember[@isNewest = 'true'][Name[@isNewest = 'true'] = $thisName]/UIC[@isNewest = 'true']"/>
                                                    <xsl:text>&#160;&#160;</xsl:text> 
                                                </xsl:when>
                                            </xsl:choose>
                                            <b>
                                                <xsl:value-of select="Name[@isNewest = 'true']"/>
                                            </b>
                                        </font>
                                    </td>
                                    <td align="center">
                                        <xsl:value-of select="substring-before(Date[@isNewest = 'true'], 'T')"/>
                                        <br/>
                                        <xsl:value-of select="substring-after(Date[@isNewest = 'true'], 'T')"/>
                                    </td>
                                    <td>
                                        <xsl:value-of select="Para[@isNewest = 'true']"/>
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </xsl:if>
                    </tbody>
                </table>
            </div>
        </xsl:if>
        <br/>
        <xsl:if test="Ref != ''">
            <div align="center">
                <table border="1">
                    <tbody>
                        <tr align="left">
                            <th colspan="3">
                                <xsl:value-of select="$myID"/>
                                <xsl:text>&#160;References:&#160;</xsl:text>
                            </th>
                        </tr>
                    </tbody>
                    <tbody>
                        <xsl:for-each select="Ref">
                            <xsl:variable name="myRef" select="."/>
                                <tr>
                                    <td align="right">
                                        <xsl:value-of select="position()"/> -
                                    </td>
                                    <td>
                                        <xsl:value-of select="$myRef"/>
                                    </td>
                                    <td>
                                        <xsl:for-each select="$base/descendant-or-self::*/file_location">
                                            <xsl:variable name="myHREF" select="*/@href"/>
                                            <xsl:variable name="newDoc" select="document($myHREF)"/>
                                            <xsl:choose>
                                                <xsl:when test="$newDoc/descendant-or-self::*[@isNewest = 'true'][@id = $myRef]/Title[@isNewest = 'true'] = ''">
                                                    <xsl:value-of select="$newDoc/descendant-or-self::*[@isNewest = 'true'][@id = $myRef]/Para[@isNewest = 'true']"/>
                                                </xsl:when>
                                                <xsl:otherwise>
                                                    <xsl:value-of select="$newDoc/descendant-or-self::*[@isNewest = 'true'][@id = $myRef]/Title[@isNewest = 'true']"/>
                                                </xsl:otherwise>
                                            </xsl:choose>
                                        </xsl:for-each>
                                     </td>
                                </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
            </div>
        </xsl:if>
        <xsl:apply-templates select="Requirement">
            <xsl:with-param name="sizeOffset" select="($sizeOffset - 1)"/>
        </xsl:apply-templates>
        <xsl:apply-templates select="Section">
            <xsl:with-param name="sizeOffset" select="($sizeOffset - 1)"/>
        </xsl:apply-templates>
    </xsl:template>
</xsl:stylesheet>