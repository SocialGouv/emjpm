const fs = require("fs");

// split cp + ville
const RE_CP = /(\w+)\s+(.*)/;
const parseCpVille = cpVille => {
  const matches = cpVille.match(RE_CP);
  if (matches) {
    return [matches[1], matches[2]];
  }
  return ["", cpVille];
};

// read given input
const data = fs.readFileSync(process.argv[2], "latin1").toString();

// map to simpler format
const data2 = rows
  .map(row => {
    const [
      x,
      y,
      id,
      nom1,
      nom,
      xx,
      xxx,
      num,
      voie,
      rue,
      zz,
      zzz,
      zzzz,
      zzzzz,
      zzzzzz,
      cpVille,
      tel,
      fax,
      mft,
      libellemft,
      sph,
      libelleSph,
      siret,
      ape,
      ...blabla
    ] = row.split(";");
    if (x === "geolocalisation") {
      return;
    }
    const [cp, ville] = parseCpVille(cpVille);
    return [
      id,
      nom || nom1,
      `${num} ${voie} ${rue}`.trim(),
      cp,
      ville,
      tel,
      fax
    ].join(";");
  })
  .filter(Boolean);

const rows = data.split("\n").slice(1);
console.log("id_finess;nom;adresse;code_postal;ville;tel;fax");
console.log(data2.join("\n"));
