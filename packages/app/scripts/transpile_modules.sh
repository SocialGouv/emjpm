#!/bin/sh

BABEL="yarn babel --presets=@babel/preset-env"

#

run() {
  echo "$ $1"
  eval "$1"
}

transpile () {
  run "$BABEL --out-file $1 --filename $(basename $1) < $1"
}
#


transpile "node_modules/query-string/index.js"
transpile "node_modules/split-on-first/index.js"
transpile "node_modules/strict-uri-encode/index.js"
transpile "node_modules/styled-icons/index.js"
transpile "node_modules/@styled-icons/styled-icon/dist/index.js"
transpile "node_modules/@styled-icons/styled-icon/dist/index.esm.js"
