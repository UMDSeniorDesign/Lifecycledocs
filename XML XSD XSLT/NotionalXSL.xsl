<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="ProjectLifecycleDocuments/SoftwareRequirementsDocument">
        <html>
            <head>
                <title>Lifecycle Documents</title>
                <style type="text/css">
                    h1 {
                    float: right;
                    width: 60%;
                    }
                    h2 {
                    float: left;
                    width: 40%;
                    font-size: 12pt;

                    }
                    
                </style>

            </head>
            <body>

                <h2>
                    <xsl:apply-templates select="Section">
                        
                    </xsl:apply-templates>
                </h2>
            </body>
        </html>
    </xsl:template>
    <xsl:template match="Section">

            <br/>
            <a>
            <xsl:attribute name="href"/>
              
                <xsl:value-of select="@id"/></a> - 
            <xsl:value-of select="Title"/> 
            <xsl:apply-templates select="Section"/>
            <xsl:apply-templates select="Requirement"/>
            
        
    
    </xsl:template>
    <xsl:template match="Requirement">

        <br/>
            <a>
                <xsl:attribute name="href"/>
                <xsl:value-of select="@id"/></a> - 
            <xsl:value-of select="Title"/> 
            <xsl:apply-templates select="Section"/>
            <xsl:apply-templates select="Requirement"/>
        
    </xsl:template>

    
</xsl:stylesheet>