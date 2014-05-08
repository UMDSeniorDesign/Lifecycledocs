<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/css" href="Stylesheets\NotionalCSS.css"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:output method="html" indent="yes"/>
    <xsl:strip-space elements="*"/>
    
    <xsl:template match="ProjectLifecycleDocuments">
        <xsl:variable name="fileCount" select="count(file_location)"/>
        
        <html>
            <style type="text/css">
                #projectName {
                align: center;
                font-size: 24pt;
                }
            </style>  
            <div id="projectName" align="center">
            <xsl:value-of select="ancestor-or-self::*/@projectName"/>
            </div>
            <head>
                <table align="center">
                    <tr>
                        <td>
                            <br/>
                            <br/>
                            <font size="4">
                            <xsl:text >Project Employees</xsl:text>
                            </font>
                        </td>
                    </tr>
                </table>
                <table align="center">
                    <tbody align="center">
                        <tr style="height:25px">
                            <th style="width:20px" align="center">Name</th>
                            <th style="width:20px" align="center">Role</th>
                        </tr>
                        <xsl:for-each select="Team/TeamMember[@isNewest='true']">
                            <tr style="height:20px">
                                <td>
                                    <xsl:choose>
                                        <xsl:when test="count(Name[@isNewest='true']) = 0">
                                            <font color="red">
                                                <xsl:text>DNE</xsl:text>
                                            </font>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <xsl:value-of select="Name[@isNewest='true']"/>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </td>
                                <td>
                                    <xsl:choose>
                                        <xsl:when test="count(Role[@isNewest='true']) = 0">
                                            <font color="red">
                                                <xsl:text>DNE</xsl:text>
                                            </font>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <xsl:value-of select="Role[@isNewest='true']"/>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </td>
                            </tr>
                        </xsl:for-each>
                        <tr rowspan="6">
                            <td>
                                <br/><br/><br/>
                            </td>
                            <td>
                                <!-- empty box -->
                            </td>
                        </tr>
                        <tr>
                            <!-- empty row -->
                        </tr>
                        <xsl:for-each select="file_location">
                            <xsl:variable name="vhref" select="*/@href"/>
                            <xsl:variable name="vhrefLength" select="string-length($vhref)"/>
                            <xsl:variable name="vHTMLconcat" select="concat(substring($vhref,1,($vhrefLength - 3)),'html')"/>
                                
                            <tr>
                                <td colspan="2">
                                    <button onclick="parent.location='{$vHTMLconcat}'">
                                        <xsl:value-of select="$vHTMLconcat"/>
                                    </button>
                                </td>
                                <td>
                                    <!-- empty box -->
                                </td>
                            </tr>
                        </xsl:for-each>
                        <tr>
                            <td colspan="2">
                            <button onclick="parent.location='RTM.html'">View RTM</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </head>
        </html>
    </xsl:template>
</xsl:stylesheet>