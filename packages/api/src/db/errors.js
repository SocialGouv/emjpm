const { ValidationError, NotFoundError } = require("objection");

const {
  DBError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError,
} = require("objection-db-errors");

const getErrorMessage = (err) => {
  switch (err.constraint) {
    case "users_email_unique":
      return "Cet email est déjà utilisé.";
    case "users_username_unique":
      return "Ce nom d'utilisateur est déjà utilisé.";
    default:
      return "Une erreur est arrivé";
  }
};

// In this example `res` is an express response object.

function errorHandler(err, res) {
  if (err instanceof ValidationError) {
    switch (err.type) {
      case "ModelValidation":
        res.status(400).send({
          errors: [
            {
              data: err.data,
              msg: err.message,
              type: "ModelValidation",
            },
          ],
        });
        break;
      case "RelationExpression":
        res.status(400).send({
          errors: [
            {
              data: {},
              msg: err.message,
              type: "InvalidRelationExpression",
            },
          ],
        });
        break;
      case "UnallowedRelation":
        res.status(400).send({
          errors: [
            {
              data: {},
              msg: err.message,
              type: "UnallowedRelation",
            },
          ],
        });
        break;
      case "InvalidGraph":
        res.status(400).send({
          errors: [
            {
              data: {},
              msg: err.message,
              type: "InvalidGraph",
            },
          ],
        });
        break;
      default:
        res.status(400).send({
          errors: [
            {
              data: {},
              msg: err.message,
              type: "UnknownValidationError",
            },
          ],
        });
        break;
    }
  } else if (err instanceof NotFoundError) {
    res.status(404).send({
      errors: [
        {
          data: {},
          msg: err.message,
          type: "NotFound",
        },
      ],
    });
  } else if (err instanceof UniqueViolationError) {
    res.status(409).send({
      errors: [
        {
          data: {
            columns: err.columns,
            constraint: err.constraint,
            table: err.table,
          },
          msg: err.message,
          type: "UniqueViolation",
        },
      ],
    });
  } else if (err instanceof NotNullViolationError) {
    res.status(400).send({
      errors: [
        {
          data: {
            column: err.column,
            table: err.table,
          },
          msg: err.message,
          type: "NotNullViolation",
        },
      ],
    });
  } else if (err instanceof ForeignKeyViolationError) {
    res.status(409).send({
      errors: [
        {
          data: {
            constraint: err.constraint,
            table: err.table,
          },
          msg: err.message,
          type: "ForeignKeyViolation",
        },
      ],
    });
  } else if (err instanceof CheckViolationError) {
    res.status(400).send({
      errors: [
        {
          data: {
            constraint: err.constraint,
            table: err.table,
          },
          msg: err.message,
          type: "CheckViolation",
        },
      ],
    });
  } else if (err instanceof DataError) {
    res.status(400).send({
      errors: [
        {
          data: {},
          msg: err.message,
          type: "InvalidData",
        },
      ],
    });
  } else if (err instanceof DBError) {
    res.status(500).send({
      errors: [
        {
          data: {},
          msg: err.message,
          type: "UnknownDatabaseError",
        },
      ],
    });
  } else if (err.code === "23505") {
    const message = getErrorMessage(err);
    res.status(409).send({
      errors: [
        {
          data: {
            columns: err.columns,
            constraint: err.constraint,
            table: err.table,
          },
          msg: message,
          type: "UniqueViolation",
        },
      ],
    });
  } else {
    res.status(500).send({
      errors: [
        {
          data: err,
          msg: err.message,
          type: "UnknownError",
        },
      ],
    });
  }
}

module.exports = { errorHandler };
