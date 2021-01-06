import { useMutation, useQuery } from "@apollo/client";
import React from "react";

import { AdminDirectionTypeForm } from "./AdminDirectionTypeForm";
import { CHANGE_DIRECTION_AGREMENT } from "./mutations";
import { USER } from "./queries";

const AdminDirectionType = (props) => {
  const { userId } = props;

  const { data, loading, error } = useQuery(USER, {
    variables: { userId },
  });

  const [changeDirectionAgrements] = useMutation(CHANGE_DIRECTION_AGREMENT);

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error) {
    return <div>Erreur</div>;
  }

  const { users_by_pk, regions, departements, directionRoles } = data;

  const { directions } = users_by_pk;

  const [direction] = directions;

  const handleSubmit = async (values) => {
    const newDirectionRoleName =
      values.type !== "national"
        ? "direction_territoriale"
        : "direction_nationale";
    const newDirectionRole = directionRoles.find(
      (d) => d.name === newDirectionRoleName
    );
    const directionRole = directionRoles.find((d) => d.name === "direction");

    await changeDirectionAgrements({
      variables: {
        department_id: values.departement || null,
        direction_id: direction.id,
        direction_role_id: newDirectionRole.id,
        new_direction_role_id: directionRole.id,
        region_id: values.region || null,
        type: values.type,
        user_id: userId,
      },
    });
  };

  return (
    <AdminDirectionTypeForm
      onSubmit={handleSubmit}
      regions={regions}
      departements={departements}
      direction={direction}
    />
  );
};

export { AdminDirectionType };
