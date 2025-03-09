import express from "express";
import { login, logout, signUp } from "../Controllers/userController.js";
import { loginValidation, signupValidation } from "../Middlewares/validate.js";

const router = express.Router();

router.post("/signup", signupValidation, signUp);
router.post("/login", loginValidation, login);
router.post("/logout", logout);

export default router;
