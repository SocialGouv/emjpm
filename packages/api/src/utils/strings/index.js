function ucfirst(str) {
  const firstLetter = str.substr(0, 1);
  return firstLetter.toUpperCase() + str.substr(1);
}

function capitalizeName(name) {
  const names = name.split(" ");
  const namesUpper = [];
  for (const n of names) {
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  return namesUpper.join(" ");
}

module.exports = {
  capitalizeName,
  ucfirst,
};
