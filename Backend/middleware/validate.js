// export const validate = (schema) => (req, res, next) => {
//     const { error } = schema.validate(req.body, { abortEarly: false });
//     if (error) {
//       const errors = error.details.map((err) => err.message);
//       return res.status(400).json({ message: errors.join(", ") });
//     }
//     next();
//   };

export const validate = (schema) => (req, res, next) => {
  const toValidate = { ...req.body }; // ✅ Shallow copy to avoid internal mutations
  const { error, value } = schema.validate(toValidate, { abortEarly: false });

  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({ message: errors.join(", ") });
  }

  req.body = value; // ✅ safe to assign sanitized data
  next();
};
