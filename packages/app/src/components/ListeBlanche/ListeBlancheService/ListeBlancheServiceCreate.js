import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useMutation } from "react-apollo";

import { UserContext } from "../../UserContext";
import { ListeBlancheServiceForm } from "./ListeBlancheServiceForm";
import { CREATE_LB_USER_SERVICE } from "./mutations";

export const ListeBlancheServiceCreate = () => {
  const { type } = useContext(UserContext);
  const router = useRouter();
  const [create] = useMutation(CREATE_LB_USER_SERVICE, {
    onCompleted: async () => {
      await router.push(`/${type}/liste-blanche`);
    },
  });

  return (
    <div>
      <ListeBlancheServiceForm
        handleSubmit={async (values) => {
          await create({
            variables: {
              email: values.email,
              nom: values.nom,
              siret: values.siret,
              telephone: values.telephone,
            },
          });
        }}
        editMode={false}
      />
    </div>
  );
};

export default ListeBlancheServiceCreate;
