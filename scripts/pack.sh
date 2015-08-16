#!/usr/bin/env bash

name=phundus.spa
version=0.0.0
if [[ $TRAVIS_BUILD_NUMBER ]]
then
  version=0.0.$TRAVIS_BUILD_NUMBER
fi

dist=$(pwd)/dist
tmp=$(pwd)/.tmp
tmp_nuget=$tmp/nuget
filename=$tmp/$name.$version.nupkg


echo Generating NuGet package $filename

rm -rf $tmp_nuget
rm -f $filename

mkdir -p $tmp_nuget && cd $_
echo '<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://schemas.microsoft.com/packaging/2011/08/nuspec.xsd">
  <metadata>
    <id>phundus.spa</id>
    <version>'$version'</version>
    <authors>indr</authors>
    <owners>indr</owners>
    <requireLicenseAcceptance>false</requireLicenseAcceptance>
    <description>phundus Single Page Application (SPA)</description>
    <copyright>Copyright 2015 indr</copyright>
  </metadata>
</package>' > $name.nuspec
echo '<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default ContentType="application/vnd.openxmlformats-package.relationships+xml" Extension="rels" /><Default ContentType="application/octet" Extension="nuspec" /><Default ContentType="application/octet" Extension="html" /><Default ContentType="application/octet" Extension="eot" /><Default ContentType="application/octet" Extension="svg" /><Default ContentType="application/octet" Extension="ttf" /><Default ContentType="application/octet" Extension="woff" /><Default ContentType="application/octet" Extension="woff2" /><Default ContentType="application/octet" Extension="png" /><Default ContentType="application/octet" Extension="js" /><Default ContentType="application/octet" Extension="css" /><Default ContentType="application/vnd.openxmlformats-package.core-properties+xml" Extension="psmdcp" /></Types>' > [Content_Types].xml

mkdir -p $tmp_nuget/_rels && cd $_
echo '<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="Re0" Target="/phundus.spa.nuspec" Type="http://schemas.microsoft.com/packaging/2010/07/manifest" /><Relationship Id="Re1" Target="/package/services/metadata/core-properties/1.psmdcp" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" /></Relationships>' > .rels

mkdir -p $tmp_nuget/package/services/metadata/core-properties && cd $_
echo '<?xml version="1.0" encoding="UTF-8"?><coreProperties xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"><dc:creator>indr</dc:creator><dc:description>phundus Single Page Application (SPA)</dc:description><dc:identifier>phundus.spa</dc:identifier><keywords /><lastModifiedBy>NuGet, Version=2.8.50506.491, Culture=neutral, PublicKeyToken=null;Unix 4.1.4.200;.NET Framework 4</lastModifiedBy><version>'$version'</version></coreProperties>' > 1.psmdcp

cp -r $dist $tmp_nuget
mv $tmp_nuget/dist $tmp_nuget/content
cd $tmp_nuget
zip -r $filename * -x /content/.htaccess /content/404.html /content/favicon.ico /content/robots.txt
