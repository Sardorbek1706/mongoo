export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ result: result.error.errors });
    }
    req.validatedData = result.data;
    next();
  };
}
