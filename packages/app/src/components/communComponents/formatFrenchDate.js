import eoLocale from "date-fns/locale/fr";
import { format } from "date-fns";

const formatFrenchDate = date => {
  return format(new Date(date.date), "DD MMMM YYYY", { locale: eoLocale });
};

export default formatFrenchDate;
