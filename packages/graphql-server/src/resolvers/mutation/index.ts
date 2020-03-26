import { DataSource } from "../../datasource";
import { logger } from "../../logger";
import {
  MutationRecalculateMandataireMesuresCountArgs,
  MutationRecalculateServiceMesuresCountArgs,
  UpdatedRows
} from "../../types/resolvers-types";

export const recalculateMandataireMesuresCount = async (
  _: any,
  args: MutationRecalculateMandataireMesuresCountArgs,
  { dataSources }: { dataSources: DataSource }
): Promise<UpdatedRows> => {
  logger.info(`Calculating the total number of mesures by mandataire...`);
  const { mandataireId } = args;
  try {
    const { data } = await dataSources.mesureAPI.countMandataireMesures(
      mandataireId
    );
    if (!data) {
      throw new Error("Graphql request return wrong result");
    }
    const {
      awaitingMesures: {
        aggregate: { count: awaitingMesuresCount }
      },
      inprogressMesures: {
        aggregate: { count: inprogressMesuresCount }
      },
      mandataires
    } = data;

    const [mandataire] = mandataires;

    logger.info({
      awaitingMesures: {
        actual: mandataire.mesures_en_attente,
        real: awaitingMesuresCount
      },
      inprogressMesures: {
        actual: mandataire.mesures_en_cours,
        real: inprogressMesuresCount
      },
      mandataireId
    });

    if (
      mandataire.mesures_en_attente === awaitingMesuresCount &&
      mandataire.mesures_en_cours === inprogressMesuresCount
    ) {
      return {
        success: true,
        updatedRows: 0
      };
    }

    const {
      data: {
        update_mandataires: { affected_rows: updatedRows }
      }
    } = await dataSources.mandataireAPI.updateMandataireMesures(
      mandataireId,
      awaitingMesuresCount,
      inprogressMesuresCount
    );

    return {
      success: true,
      updatedRows
    };
  } catch (err) {
    logger.error(err.message);
    return {
      success: false,
      updatedRows: 0
    };
  }
};

export const recalculateServiceMesuresCount = async (
  _: any,
  args: MutationRecalculateServiceMesuresCountArgs,
  { dataSources }: { dataSources: DataSource }
): Promise<UpdatedRows> => {
  logger.info(`Calculating the total number of mesures by service...`);
  const { serviceId } = args;
  try {
    const { data } = await dataSources.mesureAPI.countServiceMesures(serviceId);
    if (!data) {
      throw new Error("Graphql request return wrong result");
    }
    const {
      awaitingMesures: {
        aggregate: { count: awaitingMesuresCount }
      },
      inprogressMesures: {
        aggregate: { count: inprogressMesuresCount }
      },
      services,
      service_antenne
    } = data;

    const [service] = services;

    const serviceAntenneShouldBeUpdated = service_antenne.some(
      sa =>
        sa.mesures_awaiting !== awaitingMesuresCount ||
        sa.mesures_in_progress !== inprogressMesuresCount
    );

    logger.info({
      service: {
        awaitingMesures: {
          actual: service.mesures_awaiting,
          real: awaitingMesuresCount
        },
        inprogressMesures: {
          actual: service.mesures_in_progress,
          real: inprogressMesuresCount
        }
      },
      serviceAntenneShouldBeUpdated,
      serviceId: service.id
    });

    if (
      service.mesures_awaiting === awaitingMesuresCount &&
      service.mesures_in_progress === inprogressMesuresCount &&
      !serviceAntenneShouldBeUpdated
    ) {
      return {
        success: true,
        updatedRows: 0
      };
    }

    const {
      data: {
        update_services: { affected_rows: updatedRowsServices },
        update_service_antenne: { affected_rows: updatedRowsServiceAntenne }
      }
    } = await dataSources.serviceAPI.updateServiceMesures(
      serviceId,
      awaitingMesuresCount,
      inprogressMesuresCount
    );

    logger.info(
      `services: ${updatedRowsServices} updated rows | service_antenne: ${updatedRowsServiceAntenne} updated rows`
    );

    return {
      success: true,
      updatedRows: updatedRowsServices + updatedRowsServiceAntenne
    };
  } catch (err) {
    logger.error(err.message);
    return {
      success: false,
      updatedRows: 0
    };
  }
};
