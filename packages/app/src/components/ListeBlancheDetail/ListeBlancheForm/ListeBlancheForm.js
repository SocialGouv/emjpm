import { Button, Heading4 } from "@emjpm/ui";
import { useFormik } from "formik";
import React, { useMemo, useState } from "react";
import { useMutation } from "react-apollo";
import { Box, Card, Flex } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { formatFormInput } from "../../../util";
import { DepartementFormUtil } from "../../../util/departements";
import { FormGroupInput } from "../../AppForm";
import {
  CREATE_LB_DEPARTEMENT,
  DELETE_LB_DEPARTEMENT,
  UPDATE_LB_DEPARTEMENT,
  UPDATE_LB_USER,
} from "../mutations";
import { ListeBlancheFormDepartementAjout } from "./ListeBlancheFormDepartementAjout";
import { ListeBlancheFormDepartementFinanceur } from "./ListeBlancheFormDepartementFinanceur";

const validationSchema = yup.object().shape({
  nom: yup.string().required(),
  prenom: yup.string().required(),
  email: yup.string().required(),
  siret: yup.string().nullable(),
});
export const ListeBlancheForm = (props) => {
  const { handleCancel, handleSubmit, data: lb_user } = props;
  const initialValues = useMemo(() => {
    return {
      nom: formatFormInput(lb_user.nom),
      prenom: formatFormInput(lb_user.prenom),
      email: formatFormInput(lb_user.email),
      siret: formatFormInput(lb_user.siret),
    };
  }, [lb_user]);

  const [lbDepartements, setLbDepartements] = useState(
    lb_user.lb_departements
      ? lb_user.lb_departements.map((lb_departement) => ({
          ...lb_departement,
          label: DepartementFormUtil.formatDepartementLabel(lb_departement.departement),
        }))
      : []
  );

  const {
    updateLbUser,
    createLbDepartement,
    updateLbDepartement,
    deleteLbDepartement,
  } = useMutations();

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await updateLbUser({
        variables: {
          id: lb_user.id,
          ...values,
          siret: values.siret || null,
        },
      });
      const departementsOperations = lbDepartements.reduce((acc, lbDepartement) => {
        if (!lbDepartement.id) {
          acc.push(
            createLbDepartement({
              variables: {
                lb_user_id: lb_user.id,
                departement_id: lbDepartement.departement.id,
                departement_financeur: lbDepartement.departement_financeur,
                individuel: lbDepartement.individuel,
                service: lbDepartement.service,
                prepose: lbDepartement.prepose,
                ti: lbDepartement.ti,
              },
            })
          );
        } else {
          acc.push(
            updateLbDepartement({
              variables: {
                id: lbDepartement.id,
                departement_financeur: lbDepartement.departement_financeur,
              },
            })
          );
        }
        return acc;
      }, []);
      const departementsCodes = lbDepartements.map(
        (lbDepartement) => lbDepartement.departement.code
      );
      const lb_departementsToRemove = lb_user.lb_departements.filter(
        (x) => !departementsCodes.includes(x.departement.code)
      );
      lb_departementsToRemove.forEach((lbDepartement) => {
        departementsOperations.push(
          deleteLbDepartement({
            variables: {
              id: lbDepartement.id,
            },
          })
        );
      });
      if (departementsOperations.length) {
        await Promise.all(departementsOperations);
      }

      setSubmitting(false);
      props.handleSubmit();
    },
    validationSchema,
    initialValues,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box mt={4}>
        <Flex pr={2} flexDirection="column">
          <Flex flexDirection="row">
            <Flex pr={2} flex={1 / 2} flexDirection="column">
              <FormGroupInput
                placeholder="Nom"
                id="nom"
                formik={formik}
                validationSchema={validationSchema}
              />
              <FormGroupInput
                placeholder="Adresse e-mail"
                id="email"
                formik={formik}
                validationSchema={validationSchema}
              />
            </Flex>
            <Flex flex={1 / 2} flexDirection="column">
              <FormGroupInput
                placeholder="Prénom"
                id="prenom"
                formik={formik}
                validationSchema={validationSchema}
              />
              <FormGroupInput
                placeholder="Siret"
                id="siret"
                formik={formik}
                validationSchema={validationSchema}
              />
            </Flex>
          </Flex>
        </Flex>

        <Card>
          <Heading4 mb={1}>{"Départements"}</Heading4>
          <ListeBlancheFormDepartementFinanceur
            lbDepartements={lbDepartements}
            setLbDepartements={setLbDepartements}
          />
          <ListeBlancheFormDepartementAjout
            lb_user={lb_user}
            lbDepartements={lbDepartements}
            setLbDepartements={setLbDepartements}
          />
        </Card>

        <Flex mt={4} justifyContent="flex-end">
          {handleCancel && (
            <Box>
              <Button type="button" mr="2" variant="outline" onClick={handleCancel}>
                Annuler
              </Button>
            </Box>
          )}
          <Box>
            <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
              Enregistrer
            </Button>
          </Box>
        </Flex>
      </Box>
    </form>
  );
  function useMutations() {
    const [updateLbUser] = useMutation(UPDATE_LB_USER);
    const [createLbDepartement] = useMutation(CREATE_LB_DEPARTEMENT, {
      onCompleted: () => {
        if (handleSubmit) {
          handleSubmit();
        }
      },
    });
    const [updateLbDepartement] = useMutation(UPDATE_LB_DEPARTEMENT, {
      onCompleted: () => {
        if (handleSubmit) {
          handleSubmit();
        }
      },
    });
    const [deleteLbDepartement] = useMutation(DELETE_LB_DEPARTEMENT, {
      onCompleted: () => {
        if (handleSubmit) {
          handleSubmit();
        }
      },
    });

    return {
      updateLbUser,
      createLbDepartement,
      updateLbDepartement,
      deleteLbDepartement,
    };
  }
};
