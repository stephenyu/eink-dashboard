#! /bin/bash

flavor=$1
echo "Running ${flavor} Mode"
ts-node app.ts "${flavor}"
