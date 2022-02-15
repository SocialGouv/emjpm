export const ariaLiveMessages = {
  guidance: (props) => {
    const { isSearchable, isMulti, isDisabled, tabSelectsValue, context } =
      props;
    switch (context) {
      case "menu":
        return `Utilisez les touches Haut et Bas pour choisir les options${
          isDisabled
            ? ""
            : ", appuyez sur Entrée pour sélectionner l'option actuellement en cours"
        }, appuyez sur Échap pour quitter le menu${
          tabSelectsValue
            ? ", appuyez sur Tab pour sélectionner l'option et quitter le menu"
            : ""
        }.`;
      case "input":
        return `${props["aria-label"] || "selection"} en cours ${
          isSearchable ? ",tapez pour affiner la liste" : ""
        }, appuyez vers sur la touche bas pour ouvrir le menu, ${
          isMulti
            ? " appuyez à gauche pour cibler les valeurs sélectionnées"
            : ""
        }`;
      case "value":
        return "Utilisez la touche gauche et et la touche droite pour basculer entre les valeurs ciblées, appuyez sur Retour arrière pour supprimer la valeur actuellement en cours";
      default:
        return "";
    }
  },

  onChange: (props) => {
    const { action, label = "", labels, isDisabled } = props;
    switch (action) {
      case "deselect-option":
      case "pop-value":
      case "remove-value":
        return `le choix ${label} est décochée.`;
      case "clear":
        return "Toutes les options sélectionnées ont été effacées.";
      case "initial-input-focus":
        return `${labels.length > 1 ? "les choix" : "le choix"} ${labels.join(
          ","
        )}, ${labels.length > 1 ? "sont sélectionnés" : "est sélectionné"}.`;
      case "select-option":
        return isDisabled
          ? `le choix ${label} est désactivé. Sélectionnez une autre option.`
          : `le choix ${label}, sélectionné.`;
      default:
        return "";
    }
  },

  onFocus: (props) => {
    const {
      context,
      focused,
      options,
      label = "",
      selectValue,
      isDisabled,
      isSelected,
    } = props;

    const getArrayIndex = (arr, item) =>
      arr && arr.length ? `${arr.indexOf(item) + 1} of ${arr.length}` : "";

    if (context === "value" && selectValue) {
      return `la valeur ${label} est en cours, ${getArrayIndex(
        selectValue,
        focused
      )}.`;
    }

    if (context === "menu") {
      const disabled = isDisabled ? " désactivé" : "";
      const status = `${isSelected ? "sélectionné" : "en cours"}${disabled}`;
      return `le choix ${label} ${status}, ${getArrayIndex(options, focused)}.`;
    }
    return "";
  },

  onFilter: (props) => {
    const { inputValue, resultsMessage } = props;
    return `${resultsMessage}${
      inputValue ? " pour le terme de recherche " + inputValue : ""
    }.`;
  },
};
