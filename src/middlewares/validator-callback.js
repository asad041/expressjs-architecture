const { validationResult } = require('express-validator');

module.exports = (validationRules) => async (req, res, next) => {
  await validationRules(req);

  const validationErrors = validationResult(req).array({
    onlyFirstError: true,
  });

  if (Array.isArray(validationErrors) && validationErrors.length > 0) {
    const extractedErrors = {};
    validationErrors.map((err) => (extractedErrors[err.param] = err.msg));
    return res.status(400).json({
      success: false,
      errors: extractedErrors,
      message:
        'The submitted data has errors, please verify the submitted form/data',
    });
  }

  next();
};
