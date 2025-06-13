import express from "express";
import {
  verifyOtpLogin,
  loginStepOne,
  logout,
  refreshTokenhandler,
  register,
  changePassword,
  forgetPassword,
  resetPassword,
} from "../Controllers/userController.js";
import {
  registerSchema,
  loginSchema,
  otpVerificationSchema,
  resetPasswordSchema,
  forgetPasswordSchema,
} from "../validation/joiValidation.js";
import  authenticate  from "../Middlewares/authMiddleware.js";

const router = express.Router();

// register
router.post("/register", registerSchema, register);

// login
router.post("/login", loginSchema, loginStepOne);

// verify otp
router.post("/login/verify", otpVerificationSchema, verifyOtpLogin);

// change password
router.post("/change-password", authenticate, changePassword);

// forget password
router.post("/forget-password", forgetPasswordSchema, forgetPassword);

// reset password
router.post("/reset-password", resetPasswordSchema, resetPassword);

// refresh handler
router.post("/refresh", refreshTokenhandler);

// logout
router.post("/logout", authenticate, logout);

export default router;
