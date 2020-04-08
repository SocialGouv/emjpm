const {resolve} = require('path');
const [, ,file] = process.argv;
const pkgFile = resolve(file);
const pkg = require(pkgFile);
delete pkg.devDependencies;
require("fs").writeFileSync(pkgFile, JSON.stringify(pkg, null, 2));
