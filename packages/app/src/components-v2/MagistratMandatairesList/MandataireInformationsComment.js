import { useQuery } from "@apollo/react-hooks";
import { Button, Card, Heading4, Heading5, Spinner } from "@socialgouv/emjpm-ui-core";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Box } from "rebass";

import { MagistratMandataireComment } from "./MagistratMandataireComment";
import { MagistratMandataireCommentForm } from "./MagistratMandataireCommentForm";
import { MANDATAIRE_COMMENTS } from "./queries";

function MandataireInformationsComment(props) {
  const { tiId, serviceId, mandataireId } = props;

  const { data, error, loading } = useQuery(MANDATAIRE_COMMENTS, {
    variables: {
      mandataire_id: mandataireId,
      service_id: serviceId
    }
  });

  const [isOpen, toggleCommentForm] = useState(false);
  const [isEditOpen, toggleEditCommentForm] = useState(false);
  const [currentComment, setCurrentComment] = useState(false);

  if (loading) {
    return (
      <Card width="100%">
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card width="100%">
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  const { commentaires } = data;
  return (
    <Fragment>
      {commentaires.length > 0 && (
        <Box width="100%">
          <Heading5 mt="3">Observations sur le mandataire</Heading5>
          {commentaires.map(commentaire => {
            return (
              <MagistratMandataireComment
                key={commentaire.id}
                toggleCommentForm={toggleCommentForm}
                currentComment={currentComment}
                setCurrentComment={setCurrentComment}
                isEditOpen={isEditOpen}
                toggleEditCommentForm={toggleEditCommentForm}
                id={commentaire.id}
                comment={commentaire.comment}
              />
            );
          })}
        </Box>
      )}
      {isOpen ? (
        <MagistratMandataireCommentForm
          toggleCommentForm={toggleCommentForm}
          tiId={tiId}
          serviceId={serviceId}
          mandataireId={mandataireId}
        />
      ) : (
        <Fragment>
          {!isEditOpen && (
            <Box width="100%" mt="3" mb="3">
              <Button
                variant="outline"
                onClick={() => {
                  toggleCommentForm(true);
                }}
              >
                Ajouter une observation
              </Button>
            </Box>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

MandataireInformationsComment.propTypes = {
  mandataireId: PropTypes.number,
  serviceId: PropTypes.number,
  tiId: PropTypes.number
};

export { MandataireInformationsComment };
