import express from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  verifyOtp,
} from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../validations/joiValidation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", validate(loginSchema), loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", logoutUser);

export default router;
