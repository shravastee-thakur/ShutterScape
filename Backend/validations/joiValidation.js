import joi from "joi";

export const registerSchema = joi.object({
  name: joi.string().trim().min(3).max(30).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name cannot be more than 30 characters",
  }),

  email: joi.string().trim().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
  }),

  password: joi.string().min(6).max(14).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),

  role: joi.string(),
});

export const loginSchema = joi.object({
  email: joi.string().trim().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
  }),
  password: joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});
