<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

	<xsl:template match="/">
		<html>
			<head>
				<title>Customer List</title>
				<style type="text/css">
					h2 {
						font-family : cursive;
						margin-bottom : 0pt;
					}
					h5 {
						margin-top : 0pt;
					}
				  </style>
			</head>
			<body>
				<h1 align="center">List of Customers</h1>
				<table align="Center" border="2" cellspacing="4" cellpadding="5" width="50%">
					<xsl:for-each select="Customers/Customer">
						<xsl:sort select="Address/City"/>
						<xsl:sort select="Name/LastName"/>
						<xsl:sort select="Name/FirstName"/>
						<xsl:apply-templates select="."/>
					</xsl:for-each>
				</table>
			</body>
		</html>
	</xsl:template>
	<xsl:template match="Customer">
		<tr>
			<td align="center">
				<h2>
					<xsl:value-of select="Name"/>
				</h2>
				<xsl:apply-templates select="Address"/>
				<b>Telephone: <xsl:value-of select="Telephone"/>
				</b>
				<a>
					<xsl:attribute name="href">mailto:<xsl:value-of select="EMail"/></xsl:attribute>
					<h3>
						<xsl:value-of select="EMail"/>
					</h3>
				</a>
				<xsl:apply-templates select="Account"/>
			</td>
		</tr>
	</xsl:template>
	<xsl:template match="Address">
		<h3>
			<xsl:value-of select="Street"/>
			<br/>
			<xsl:value-of select="City"/>, <xsl:value-of select="State"/>
			<xsl:text>&#160;&#160;</xsl:text>
			<xsl:value-of select="ZipCode"/>
		</h3>
	</xsl:template>
	<xsl:template match="Account">
		<hr width="50%"/>
		<xsl:call-template name="CheckAccounts">
			<xsl:with-param name="Name" select="ancestor::Customer/Name"/>
			<xsl:with-param name="AccountID" select="@id"/>
		</xsl:call-template>
		<p>Account Type: <xsl:value-of select="@type"/>
			<br/>
     Account Number: <xsl:value-of select="@id"/>
			<br/>
     Date Opened: <xsl:value-of select="@opened"/>
			<br/>
     Balance:  $<xsl:value-of select="Balance"/>
			<br/>
		</p>
	</xsl:template>
	<xsl:template name="CheckAccounts">
		<xsl:param name="Name"/>
		<xsl:param name="AccountID"/>
		<xsl:if test="count(//Account[@id=$AccountID])>1">
			<p>Account shared with
      <xsl:for-each select="//Account[@id=$AccountID]">
					<xsl:if test="ancestor::Customer/Name != $Name">
						<xsl:value-of select="ancestor::Customer/Name"/>
					</xsl:if>
				</xsl:for-each>
			</p>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>
