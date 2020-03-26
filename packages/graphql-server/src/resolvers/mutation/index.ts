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
  const { userId } = args;
  try {
    const { data } = await dataSources.mesureAPI.countMandataireMesures(userId);
    if (!data) {
      throw new Error("graphql request return wrong result");
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

    if (
      mandataire.mesures_awaiting === awaitingMesuresCount &&
      mandataire.mesures_in_progress === inprogressMesuresCount
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
      userId,
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
  const { serviceId } = args;
  try {
    const { data } = await dataSources.mesureAPI.countServiceMesures(serviceId);
    if (!data) {
      throw new Error("graphql request return wrong result");
    }

    const {
      awaitingMesures: {
        aggregate: { count: awaitingMesuresCount }
      },
      inprogressMesures: {
        aggregate: { count: inprogressMesuresCount }
      },
      services
    } = data;

    const [service] = services;

    if (
      service.mesures_awaiting === awaitingMesuresCount &&
      service.mesures_in_progress === inprogressMesuresCount
    ) {
      return {
        success: true,
        updatedRows: 0
      };
    }

    const {
      data: {
        update_services: { affected_rows: updatedRows }
      }
    } = await dataSources.serviceAPI.updateServiceMesures(
      serviceId,
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
