import Fuse from "fuse.js";

function filter({ enqueteReponseResumes, criteria }) {
  if (
    enqueteReponseResumes &&
    (criteria.userType ||
      criteria.searchText ||
      criteria.selectedDepartement ||
      criteria.responseStatus)
  ) {
    const items = enqueteReponseResumes.filter((r) => {
      if (criteria.userType && criteria.userType.value && criteria.userType.value !== r.user_type) {
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
        (!r.departement || criteria.selectedDepartement.value !== r.departement.code)
      ) {
        return false;
      }

      return true;
    });

    if (criteria.searchText) {
      const options = {
        includeScore: false,
        // Search in `author` and in `tags` array
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

      const fuse = new Fuse(items, options);

      const result = fuse.search(criteria.searchText);
      return result.map((x) => x.item);
    }

    return items;
  }
  return enqueteReponseResumes;
}

export const enqueteReponseResumesFilter = {
  filter,
};
