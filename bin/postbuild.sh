#!/bin/bash

rm -rf ./.amplify-hosting

mkdir -p ./.amplify-hosting/compute

#rm -rf node_modules/@aws-amplify
#rm -rf node_modules/@aws-sdk
#rm -rf node_modules/@aws-cdk
#rm -rf node_modules/aws-cdk-lib
#rm -rf node_modules/@babel
#rm -rf node_modules/typescript

cp -r ./dist ./.amplify-hosting/compute/default
cp -r ./node_modules ./.amplify-hosting/compute/default/node_modules

cp deploy-manifest.json ./.amplify-hosting/deploy-manifest.json