#!/bin/bash                                                                                                                  
# A Bash script, by Henrik Zenkert                                                                                           
# Needs npm package concurrently installed globally

BASEDIR=${PWD}  
concurrently "cd ${BASEDIR}/multi-tictactoe && yarn run server" "cd ${BASEDIR}/multi-tictactoe-client && yarn start"
