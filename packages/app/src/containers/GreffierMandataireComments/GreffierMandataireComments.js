import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Text } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { Button } from "~/components";

import { GreffierMandataireComment } from "./GreffierMandataireComment";
import { GreffierMandataireCommentForm } from "./GreffierMandataireCommentForm";
import { MANDATAIRE_COMMENTS } from "./queries";

function GreffierMandataireComments(props) {
  const { tiId, serviceId, mandataireId } = props;
  const { data, error, loading } = useQuery(MANDATAIRE_COMMENTS, {
    variables: {
      mandataire_id: mandataireId,
      service_id: serviceId,
    },
  });

  const [isOpen, toggleCommentForm] = useState(false);
  const [isEditOpen, toggleEditCommentForm] = useState(false);
  const [currentComment, setCurrentComment] = useState(false);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { commentaires } = data;
  return (
    <>
      {commentaires.length > 0 ? (
        <Box width="100%">
          {commentaires.map((commentaire) => {
            return (
              <GreffierMandataireComment
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
      ) : (
        <Text mt="2">
          Aucune observation, cliquer sur ajouter une observation pour en créer
          un nouvelle
        </Text>
      )}
      {isOpen ? (
        <GreffierMandataireCommentForm
          toggleCommentForm={toggleCommentForm}
          tiId={tiId}
          serviceId={serviceId}
          mandataireId={mandataireId}
        />
      ) : (
        <>
          {!isEditOpen && (
            <Box width="100%" mt="3">
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
        </>
      )}
    </>
  );
}

GreffierMandataireComments.propTypes = {
  mandataireId: PropTypes.number,
  serviceId: PropTypes.number,
  tiId: PropTypes.number,
};

export { GreffierMandataireComments };
