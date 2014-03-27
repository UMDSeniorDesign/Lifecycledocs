<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

	<xsl:template match="/">
		<html>
			<head>
				<title>Customer List</title>
				<style type="text/css">
					#preview {
						float: right;
						width: 60%;
					}
					#tableOfContents {
						float: left;
						width: 40%;
					}
				  </style>
			</head>
			<body>
				<tableOfContents>List of Customers</tableOfContents>
				<xsl:for-each select="SoftwareRequirementsDocument/Section">
				<xsl:with-param name="Sectionid" select="@id"/>
				<br/>
				Account Number: <xsl:value-of select="@id"/>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>