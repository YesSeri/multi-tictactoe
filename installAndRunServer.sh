#!/bin/bash
# A sample Bash script, by Henrik Zenkert
# Needs npm package concurrently installed globally

BASEDIR=${PWD}

cd multi-tictactoe
yarn install
cd ${BASEDIR}/multi-tictactoe-client
yarn install
concurrently "cd ${BASEDIR}/multi-tictactoe && yarn run server" "cd ${BASEDIR}/multi-tictactoe-client && yarn start"
