<?xml version="1.0" ?>
<?xml-stylesheet type="text/css" href="Stylesheets\NotionalCSS.css"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:template match="ProjectLifecycleDocuments/SoftwareRequirementsDocument">
        <html>
            <head>
                <title>Lifecycle Documents</title>
                <style type="text/css">
                    h1 {
                    float: left;
                    width: 40%;
                    font-size: 12pt;
                    }
                    h2 {
                    float: right;
                    width: 60%;
                    font-size: 12pt;
                    font-style: normal;
                    font-weight: normal;
                    }
                    h3 {
                    font-style: bold;
                    font-weight: normal;
                    
                    }
                    
                </style>  
            </head>
            <body>
                    <xsl:apply-templates select="Section"/>
                    
            </body>
        </html>
    </xsl:template>

    <xsl:template match="Section">
       <br/>
        <h1>
        <a>
            <xsl:attribute name="href"/>
            <xsl:value-of select="@id"/></a> - 
        <xsl:value-of select="Title"/>
        </h1>
        <h2>
            <hi3> <xsl:value-of select="@id"/></hi3> - 
            <i> <xsl:value-of select="Title"/> </i>
         <br/> 
            <xsl:value-of select="Para"/>
           <br/>
        </h2>
        <xsl:apply-templates select="Section"/>
        <xsl:apply-templates select="Requirement"/>
        
        
        
        
        
    </xsl:template>
    <xsl:template match="Requirement">
        
      <br/>
            <h1>
        <a>
            <xsl:attribute name="href"/>
            <xsl:value-of select="@id"/></a> - 
        <xsl:value-of select="Title"/> 
            </h1>
        <h2>
            <hi3> <xsl:value-of select="@id"/></hi3> - 
            <i> <xsl:value-of select="Title"/> </i> 
         <br/>
            <xsl:value-of select="Para"/>
         <br/>
        </h2>
        <xsl:apply-templates select="Section"/>
        <xsl:apply-templates select="Requirement"/>
        
    </xsl:template>
    
    
</xsl:stylesheet>