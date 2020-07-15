import { format } from 'date-fns';

import { MESURE_PROTECTION } from '../constants';

export const mesureFormatter = {
  formatChampProtection(champProtection) {
    if (!champProtection) {
      return '';
    }
    return MESURE_PROTECTION.CHAMP_PROTECTION.byKey[champProtection];
  },
  formatJudgmentDate(judgmentDate) {
    if (!judgmentDate) {
      return '';
    }
    return format(new Date(judgmentDate), 'dd/MM/yyyy');
  },
  formatNatureMesure(natureMesure) {
    if (!natureMesure) {
      return '';
    }
    return MESURE_PROTECTION.NATURE_MESURE.byKey[natureMesure];
  },
};
