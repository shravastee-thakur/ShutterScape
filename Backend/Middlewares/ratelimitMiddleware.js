import { rateLimit } from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { message: "Too many login/register attempts. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
