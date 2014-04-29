<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:strip-space elements="*"/>
    
    <xsl:template match="/">
        <xsl:variable name="fontSizeOffset" select="number(6)"/>
        <!-- print title -->
        <font size="7">
            <p align="center">
                <xsl:value-of select="/*/*/Title[@isNewest = 'true']"/>
            </p>
        </font>
        <font size="4">
            <xsl:for-each select="/*/*/Para[@isNewest = 'true']">
                <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
                <xsl:value-of select="/*/*/Para[@isNewest = 'true']"/>
            </xsl:for-each>
            <br/>
        </font>
        <xsl:choose>
            <xsl:when test="(/*/Section[@isNewest = 'true'] != '')
                or (/*/Requirement[@isNewest = 'true'] != '')">
                
                <xsl:for-each select="/*/Section[@isNewest = 'true']">
                    <xsl:call-template name="Section">
                        <xsl:with-param name="sizeOffset" select="$fontSizeOffset"/>
                    </xsl:call-template>
                </xsl:for-each>
            </xsl:when>
            
            <xsl:otherwise>
                <xsl:text> eof </xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template name="Section">
        <xsl:param name="sizeOffset"/>
        
        <xsl:for-each select="Section[@isNewest = 'true']">
            <br/> <br/>
            <xsl:if test="$sizeOffset &lt; 6">
                <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
            </xsl:if>
            <font size="{$sizeOffset}">
                <xsl:value-of select="@id"/> -
                <xsl:value-of select="Title"/>
            </font>
            <p>
                <font size="4">
                    <xsl:for-each select="Para">
                        <xsl:if test="$sizeOffset &lt; 6">
                            <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
                        </xsl:if>
                        <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
                        <xsl:value-of select="."/>
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
            
            <xsl:if test="Section[@isNewest = 'true'] != ''">
                <xsl:call-template name="Section">
                    <xsl:with-param name="sizeOffset" select="($sizeOffset - 1)"/>
                </xsl:call-template>
            </xsl:if>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>