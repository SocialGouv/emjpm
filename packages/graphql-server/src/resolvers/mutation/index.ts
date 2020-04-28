import { AuthenticationError } from "apollo-server-koa";

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
  const { mandataireId } = args;
  logger.info(
    `Calculating the total number of mesures by mandataire (id: ${mandataireId})...`
  );
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

    logger.info(`mandataire: ${updatedRows} updated rows`);

    return {
      success: true,
      updatedRows
    };
  } catch (err) {
    logger.error(err.message);
    throw new AuthenticationError("Oups, recalculate failed.");
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
      serviceId: service.id
    });

    const {
      data: {
        update_services: { affected_rows: updatedRowsServices }
      }
    } = await dataSources.serviceAPI.updateServiceMesures(
      serviceId,
      awaitingMesuresCount,
      inprogressMesuresCount
    );

    let updatedRowsServiceAntenne = 0;
    for (const antenne of service_antenne) {
      const { id, mesures_awaiting, mesures_in_progress } = antenne;
      const response = await dataSources.serviceAPI.updateAntenneServiceMesures(
        id,
        mesures_awaiting.aggregate.count,
        mesures_in_progress.aggregate.count
      );
      const {
        data: {
          update_service_antenne: { affected_rows }
        }
      } = response;
      updatedRowsServiceAntenne += affected_rows;
    }

    logger.info(
      `services: ${updatedRowsServices} updated rows | service_antenne: ${updatedRowsServiceAntenne} updated rows`
    );

    return {
      success: true,
      updatedRows: updatedRowsServices + updatedRowsServiceAntenne
    };
  } catch (err) {
    logger.error(err.message);
    throw new AuthenticationError("Oups, recalculate failed.");
  }
};
