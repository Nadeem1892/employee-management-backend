const validate = (schema) => (req, res, next) => {
  // For multipart/form-data, you need to validate req.body
  // and for files, req.file or req.files will be used

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      status: "ERROR",
      msg: error.details.map((err) => err.message).join(', '), // Return all error messages
    });
  }
  next();
};

module.exports = validate;
