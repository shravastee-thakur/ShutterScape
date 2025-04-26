import express from "express";
import { verifyUser, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  deleteUser,
  getAllUsers,
  getMyProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/me", verifyUser, getMyProfile);
router.get("/all", verifyUser, authorizeRoles("admin"), getAllUsers);
router.delete("/:id", verifyUser, authorizeRoles("admin"), deleteUser);

export default router;
