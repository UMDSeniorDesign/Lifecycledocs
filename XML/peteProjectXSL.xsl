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
                <table border="3">
                    <tbody>
                        <tr style="height:25px">
                            <th style="width:100px">Name</th>
                            <th style="width:100px">Role</th>
                        </tr>
                        <xsl:for-each select="Team/TeamMember">
                            <tr style="height:100px">
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
								<td>
								    <xsl:variable name="memberName">
								        <xsl:value-of select="Name[@isNewest='true']"/>
								    </xsl:variable>
									<button type="button" onclick="removeMember('{$memberName}')">Remove Member</button>
								</td>
                            </tr>
                        </xsl:for-each>
                        <tr>
                            <td></td><td></td>
                        </tr>
                        <tr>
                            <td>
                                <xsl:text>File count:</xsl:text>
                            </td>
                            <td>
                                <xsl:value-of select="$fileCount"/>
                            </td>
                        </tr>
                        <xsl:for-each select="file_location">
                            <tr>
                                <td>
                                    <xsl:value-of select="*/@href"/>
                                </td>
                                <td>
                                    
                                </td>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
				<button onclick="addMember()">Add Member</button>
            </head>
        </html>
    </xsl:template>
    
</xsl:stylesheet>