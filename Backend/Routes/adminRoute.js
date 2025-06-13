import express from "express";
import { deleteUser, getUsers } from "../Controllers/adminController.js";
import allowRole from "../Middlewares/roleMiddleware.js";
import authenticate from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-user", authenticate, allowRole("admin"), getUsers);
router.delete("/delete-user/:id", authenticate, allowRole("admin"), deleteUser);

export default router;
