<?xml version="1.0" ?>
<?xml-stylesheet type="text/css" href="Stylesheets\NotionalCSS.css"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:template match="ProjectLifecycleDocuments/SoftwareRequirementsDocument">
        <html>
            <head>
                <script>
                    function test(ID){
                    alert(ID);
                    }
                </script>
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
            <xsl:variable name="vID"> <xsl:value-of select="@id"/> </xsl:variable>
            <a onclick="test('{$vID}')">
                <xsl:attribute name="href"/>
                <xsl:value-of select="@id"/>
           </a> -

        <xsl:value-of select="Title"/>

        </h1>
        <h2>

            <hi3> <xsl:value-of select="@id"/></hi3> - 
            <i><b> <xsl:value-of select="Title"/> </b></i>
         <br/>
            <xsl:apply-templates select="Para"/>

        </h2>
        <xsl:apply-templates select="Section"/>
        <xsl:apply-templates select="Requirement"/>
    </xsl:template>
    <xsl:template match="Requirement">
        
      <br/>
            <h1>
            <a onclick="test()">
            <xsl:attribute name="href"/>
            <xsl:value-of select="@id"/>
            </a> -
        <xsl:value-of select="Title"/> 
            </h1>
        <h2>
            <hi3> <xsl:value-of select="@id"/></hi3> - 
            <i><b> <xsl:value-of select="Title"/> </b></i>
         <br/>
            <xsl:apply-templates select="Para"/>
            
        </h2>
        <xsl:apply-templates select="Section"/>
        <xsl:apply-templates select="Requirement"/>

    </xsl:template>
    <xsl:template match="Para">
        <xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
</xsl:stylesheet>