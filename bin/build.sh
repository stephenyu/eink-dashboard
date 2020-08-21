#! /bin/bash

flavor=$1

echo "Running ${flavor} Mode"

rm -rf build
mkdir build
npx node app.js "${flavor}"
