const { check } = require('express-validator');

const REGEX = {};

const validator = {
  isFieldExists: (field, label = null) => {
    if (!label) label = field;

    return check(field).exists().withMessage(`the ${label} is required`).bail();
  },

  isMongoId: (field, label = null, required = true) => {
    if (!label) label = field;

    if (required) {
      return check(field, `the ${label} is required`)
        .not()
        .isEmpty()
        .bail()
        .isMongoId()
        .withMessage(`the ${label} is not a valid id`);
    }

    return check(field)
      .optional()
      .bail()
      .isMongoId()
      .withMessage('not a valid id');
  },

  isObject: (field, label = null, required = true) => {
    if (!label) label = field;

    if (required) {
      return check(field, `the ${label} is required`)
        .not()
        .isEmpty()
        .bail()
        .custom((value) => {
          if (!(typeof value === 'object') || value === null)
            return Promise.reject('contents must is type of object');
          return true;
        })
        .bail();
    }

    return check(field)
      .optional()
      .bail()
      .custom((value) => {
        if (!(typeof value === 'object') || value === null)
          return Promise.reject('contents must is type of object');
        return true;
      })
      .bail();
  },

  // isUUID: (field, label = null, required = true) => {
  //   if (!label) label = field;

  //   if (required) {
  //     return check(field, `the ${label} is required`)
  //       .not()
  //       .isEmpty()
  //       .bail()
  //       .custom((value) => {
  //         if (!isValidUUID(value)) return Promise.reject(`Invalid ${label}`);
  //         return true;
  //       })
  //       .bail();
  //   }

  //   return check(field)
  //     .optional()
  //     .bail()
  //     .custom((value) => {
  //       if (!isValidUUID(value)) return Promise.reject(`Invalid ${label}`);
  //       return true;
  //     })
  //     .bail();
  // },

  isString: (field, min = 0, max = 255, label = null, required = true) => {
    if (!label) label = field;

    if (required) {
      return check(field, `the ${label} is required`)
        .not()
        .isEmpty()
        .bail()
        .isLength({ min })
        .withMessage(`must be at least ${min} characters`)
        .bail()
        .isLength({ max })
        .withMessage(`cant't be more than ${max} characters`);
    }

    return check(field)
      .trim()
      .optional()
      .bail()
      .isLength({ min })
      .withMessage(`must be at least ${min} characters long`)
      .bail()
      .isLength({ max })
      .withMessage(`must be ${max} characters long`);
  },

  isEmail: (field = 'email', label = null, required = true) => {
    if (!label) label = field;
    if (required) {
      return check(field, `the ${label} is required`)
        .not()
        .isEmpty()
        .bail()
        .isEmail()
        .withMessage('make sure email format is correct')
        .bail();
    }

    return check(field)
      .optional()
      .bail()
      .isEmail()
      .withMessage('make sure email format is correct')
      .bail();
  },

  isBoolean: (field, label = null, required = true) => {
    if (!label) label = field;

    if (required) {
      return check(field, `the ${label} is required`)
        .not()
        .isEmpty()
        .bail()
        .isIn([true, false])
        .withMessage('must be a valid boolean');
    }

    return check(field)
      .optional({ checkFalsy: true })
      .bail()
      .isIn([true, false])
      .withMessage('must be a valid boolean');
  },

  isIn: (field, arr, label = null, required = true) => {
    if (!label) label = field;

    if (required) {
      return check(field, `the ${label} is required`)
        .not()
        .isEmpty()
        .bail()
        .isIn(arr)
        .withMessage(`the ${label} is not included in the list`);
    }

    return check(field)
      .optional()
      .bail()
      .isIn(arr)
      .withMessage(`the ${label} is not included in the list`);
  },

  isNumeric: (field, label = null, required = true) => {
    if (!label) label = field;

    if (required) {
      return check(field, `the ${label} is required`)
        .not()
        .isEmpty()
        .bail()
        .isNumeric()
        .withMessage('must be numeric value')
        .bail();
    }

    return check(field)
      .optional()
      .bail()
      .isNumeric()
      .withMessage('must be numeric value');
  },

  isDecimal: (field, label = null, required = true) => {
    if (!label) label = field;

    if (required) {
      return check(field, `the ${label} is required`)
        .not()
        .isEmpty()
        .bail()
        .isDecimal()
        .withMessage('must be decimal value');
    }

    return check(field)
      .optional()
      .bail()
      .isDecimal()
      .withMessage('ust be decimal value');
  },

  isAlphanumeric: (
    field,
    min = 0,
    max = 255,
    label = null,
    required = true
  ) => {
    if (!label) label = field;

    if (required) {
      return check(field, `the ${label} is required`)
        .not()
        .isEmpty()
        .bail()
        .trim()
        .isAlphanumeric()
        .withMessage('must be an alpha-numeric value')
        .bail()
        .isLength({ min })
        .withMessage(`must be at least ${min} characters`)
        .bail()
        .isLength({ max })
        .withMessage(`must not be greater than ${max} characters`);
    }

    return check(field, `the ${label} is required`)
      .optional({ checkFalsy: true })
      .bail()
      .trim()
      .isAlphanumeric()
      .withMessage('must be an alpha-numeric value')
      .bail()
      .isLength({ min })
      .withMessage(`must be at least ${min} characters`)
      .bail()
      .isLength({ max })
      .withMessage(`must not be greater than ${max} characters`);
  },

  isMatched: (
    field,
    matchingField,
    fieldLabel = null,
    matchingFieldLabel = null
  ) => {
    if (!fieldLabel) fieldLabel = field;
    if (!matchingFieldLabel) matchingFieldLabel = matchingField;

    return check(field, `the ${fieldLabel} is required`)
      .not()
      .isEmpty()
      .bail()
      .custom((value, { req }) => {
        if (value !== req.body[`${matchingField}`]) {
          throw new Error(
            `the ${fieldLabel} does not match the ${matchingFieldLabel}`
          );
        }
        return true;
      });
  },

  isRegex: (
    field,
    regexPropName,
    errorMessage = 'Invalid format',
    required = true
  ) => {
    if (required) {
      return check(field, `the field is required`)
        .not()
        .isEmpty()
        .bail()
        .matches(REGEX[`${regexPropName}`])
        .withMessage(errorMessage);
    }

    return check(field, `the field is required`)
      .optional({ checkFalsy: true })
      .bail()
      .matches(REGEX[`${regexPropName}`])
      .withMessage(errorMessage);
  },
};

module.exports = validator;
