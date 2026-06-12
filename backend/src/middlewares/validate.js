const validate = (schema) => (req, res, next) => {
  try {
    // Zod's .parse() throws on error, causing catch to fire. Use .safeParse() to avoid thrown error and handle validation result.
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.errors,
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,

      errors: error.errors,
    });
  }
};

module.exports = validate;
