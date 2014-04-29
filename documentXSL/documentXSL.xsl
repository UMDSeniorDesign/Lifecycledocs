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
            <xsl:when test="/*/Section[@isNewest = 'true'] != ''">
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
            
            
            <xsl:for-each select="descendant-or-self::Section[@isNewest = 'true']">
                <xsl:call-template name="Section">
                    <xsl:with-param name="sizeOffset" select="($sizeOffset - 1)"/>
                </xsl:call-template>
            </xsl:for-each>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>