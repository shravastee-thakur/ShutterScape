import express from "express";
import { verifyUser, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  deleteUser,
  getAllUsers,
  getMyProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/myProfile", verifyUser, getMyProfile);
router.get("/allUsers", verifyUser, authorizeRoles("admin"), getAllUsers);
router.delete(
  "/deleteUser/:id",
  verifyUser,
  authorizeRoles("admin"),
  deleteUser
);

export default router;
