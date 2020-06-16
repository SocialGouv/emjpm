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
              msg: err.message,
              type: "ModelValidation",
              data: err.data,
            },
          ],
        });
        break;
      case "RelationExpression":
        res.status(400).send({
          errors: [
            {
              msg: err.message,
              type: "InvalidRelationExpression",
              data: {},
            },
          ],
        });
        break;
      case "UnallowedRelation":
        res.status(400).send({
          errors: [
            {
              msg: err.message,
              type: "UnallowedRelation",
              data: {},
            },
          ],
        });
        break;
      case "InvalidGraph":
        res.status(400).send({
          errors: [
            {
              msg: err.message,
              type: "InvalidGraph",
              data: {},
            },
          ],
        });
        break;
      default:
        res.status(400).send({
          errors: [
            {
              msg: err.message,
              type: "UnknownValidationError",
              data: {},
            },
          ],
        });
        break;
    }
  } else if (err instanceof NotFoundError) {
    res.status(404).send({
      errors: [
        {
          msg: err.message,
          type: "NotFound",
          data: {},
        },
      ],
    });
  } else if (err instanceof UniqueViolationError) {
    res.status(409).send({
      errors: [
        {
          msg: err.message,
          type: "UniqueViolation",
          data: {
            columns: err.columns,
            table: err.table,
            constraint: err.constraint,
          },
        },
      ],
    });
  } else if (err instanceof NotNullViolationError) {
    res.status(400).send({
      errors: [
        {
          msg: err.message,
          type: "NotNullViolation",
          data: {
            column: err.column,
            table: err.table,
          },
        },
      ],
    });
  } else if (err instanceof ForeignKeyViolationError) {
    res.status(409).send({
      errors: [
        {
          msg: err.message,
          type: "ForeignKeyViolation",
          data: {
            table: err.table,
            constraint: err.constraint,
          },
        },
      ],
    });
  } else if (err instanceof CheckViolationError) {
    res.status(400).send({
      errors: [
        {
          msg: err.message,
          type: "CheckViolation",
          data: {
            table: err.table,
            constraint: err.constraint,
          },
        },
      ],
    });
  } else if (err instanceof DataError) {
    res.status(400).send({
      errors: [
        {
          msg: err.message,
          type: "InvalidData",
          data: {},
        },
      ],
    });
  } else if (err instanceof DBError) {
    res.status(500).send({
      errors: [
        {
          msg: err.message,
          type: "UnknownDatabaseError",
          data: {},
        },
      ],
    });
  } else if (err.code === "23505") {
    const message = getErrorMessage(err);
    res.status(409).send({
      errors: [
        {
          msg: message,
          type: "UniqueViolation",
          data: {
            columns: err.columns,
            table: err.table,
            constraint: err.constraint,
          },
        },
      ],
    });
  } else {
    res.status(500).send({
      errors: [
        {
          msg: err.message,
          type: "UnknownError",
          data: err,
        },
      ],
    });
  }
}

module.exports = { errorHandler };
