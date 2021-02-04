import Fuse from "fuse.js";

function filter({
  enqueteReponseResumesIndex: fuse,
  enqueteReponseResumes,
  criteria,
}) {
  const items = criteria.searchText
    ? fuse.search(criteria.searchText).map((x) => x.item)
    : enqueteReponseResumes;

  if (
    items &&
    (criteria.userType ||
      criteria.selectedDepartement ||
      criteria.responseStatus)
  ) {
    return items.filter((r) => {
      if (
        criteria.userType &&
        criteria.userType.value &&
        criteria.userType.value !== r.user_type
      ) {
        return false;
      }
      if (
        criteria.responseStatus &&
        criteria.responseStatus.value &&
        criteria.responseStatus.value !== r.status
      ) {
        return false;
      }
      if (
        criteria.selectedDepartement &&
        criteria.selectedDepartement.value &&
        (!r.departement ||
          criteria.selectedDepartement.value !== r.departement.code)
      ) {
        return false;
      }

      return true;
    });
  }
  return items;
}

function buildIndex(items) {
  // https://fusejs.io/api/options.html
  const options = {
    includeScore: false,
    keys: [
      {
        name: "etablissement",
        weight: 2,
      },
      {
        name: "user.nom",
        weight: 2,
      },
      {
        name: "user.prenom",
        weight: 1,
      },
      {
        name: "ville",
        weight: 0.5,
      },
    ],
  };
  // https://fusejs.io/api/indexing.html
  const index = Fuse.createIndex(options.keys, items);
  const fuse = new Fuse(items, options, index);

  return fuse;
}

export const enqueteReponseResumesFilter = {
  buildIndex,
  filter,
};
