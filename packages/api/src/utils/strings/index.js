function ucfirst(str) {
  const firstLetter = str.substr(0, 1);
  return firstLetter.toUpperCase() + str.substr(1);
}

function capitalizeName(name) {
  const names = name.split(" ");
  const namesUpper = [];
  for (const n of names) {
    namesUpper.push(ucfirst(n.toLowerCase()));
  }
  return namesUpper.join(" ");
}

module.exports = {
  capitalizeName,
  ucfirst,
};
