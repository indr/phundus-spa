#!/usr/bin/env bash

name=phundus.spa
version=0.0.0
if [[ $TRAVIS_BUILD_NUMBER ]]
then
  version=0.0.$TRAVIS_BUILD_NUMBER
fi

tmp=$(pwd)/.tmp
filename=$tmp/$name.$version.nupkg


echo Uploading NuGet package $filename

curl -T $filename -u $FTP_USER:$FTP_PASSWORD ftp://nuget.phundus.ch/packages/
