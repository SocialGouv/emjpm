export const menuBuilder = {
  fixMenuStatus,
};

function fixMenuStatus(menu) {
  menu
    .concat()
    .reverse()
    .reduce(
      (acc, section) => {
        if (section.steps) {
          section.steps
            .concat()
            .reverse()
            .reduce((acc, step) => {
              fixEmptyStatus(step, acc);
              return acc;
            }, acc);
        }
        fixEmptyStatus(section, acc);
        return acc;
      },
      {
        allowEmpty: true,
      }
    );
  return menu;
}

function fixEmptyStatus(section, acc) {
  if (section.status === "empty") {
    if (!acc.allowEmpty) {
      section.status = "invalid";
    }
  } else {
    acc.allowEmpty = false;
  }
}
