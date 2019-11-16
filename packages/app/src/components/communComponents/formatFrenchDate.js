import { format } from "date-fns";
import eoLocale from "date-fns/locale/fr";

const formatFrenchDate = date => {
  return format(new Date(date.date), "DD MMMM YYYY", { locale: eoLocale });
};

export default formatFrenchDate;
