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
            <head>
                <title>Team Member List</title>
                <br/><br/>
                <table border="3" bgcolor="white">
                    <tbody>
                        <tr>
                            <td rowspan="{number($fileCount) + 1}" colspan="2" align="center">
                                <b>
                                    <font size="5">
                                        <xsl:value-of select="ancestor-or-self::*/@projectName"/>
                                    </font>
                                </b>
                            </td>
                            <td>
                                <b><u>
                                    <xsl:text>File count:&#160;</xsl:text>
                                    <xsl:value-of select="$fileCount"/>
                                </u></b>
                            </td>
                        </tr>
                        <xsl:for-each select="file_location">
                            <tr>
                                <td>
                                    <xsl:value-of select="*/@href"/>
                                </td>
                            </tr>
                        </xsl:for-each>
                        <tr>
                            <td></td><td></td>
                        </tr>
                        <tr>
                            <td></td><td></td>
                        </tr>
                        <tr style="height:25px">
                            <th style="width:100px">Member</th>
                            <th style="width:100px">Role</th>
                            <th style="width:100px">Remove</th>
                        </tr>
                        <xsl:for-each select="Team/TeamMember[@isNewest='true']">
                            <tr style="height:50px">
                                <td style="width:auto">
                                    <xsl:choose>
                                        <xsl:when test="count(Name[@isNewest='true']) = 0">
                                            <font color="red">
                                                <xsl:text>DNE</xsl:text>
                                            </font>
											
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <xsl:value-of select="Name[@isNewest='true']"/>
                                            <xsl:text>&#160;&#160;</xsl:text>
                                            <br/>
                                            <xsl:value-of select="UIC[@isNewest = 'true']"/>
											
											
                                        </xsl:otherwise>
                                    </xsl:choose>
									<br />
									<xsl:variable name="memberName">
								        <xsl:value-of select="Name[@isNewest='true']"/>
								    </xsl:variable>
									<button style="width:auto" type="button" onclick="changeMemberName('{$memberName}')">Change Member Name</button>
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
									<br />
									<xsl:variable name="memberName">
								        <xsl:value-of select="Name[@isNewest='true']"/>
								    </xsl:variable>
									<button type="button" onclick="changeRole('{$memberName}')">Change Role</button>
                                </td>
								<td>
								    <xsl:variable name="memberName">
								        <xsl:value-of select="Name[@isNewest='true']"/>
								    </xsl:variable>
									<button type="button" onclick="removeMember('{$memberName}')">Remove Member</button>
								</td>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
				<!-- <button onclick="addMember()">Add Member</button> -->
            </head>
        </html>
    </xsl:template>
    
</xsl:stylesheet>