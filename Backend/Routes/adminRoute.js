import express from "express";
import { deleteUser, getUser } from "../Controllers/adminController.js";
import { verifyToken } from "../Middlewares/authCheck.js";

const router = express.Router();

router.get("/getUser", verifyToken, getUser);
router.delete("/deleteUser/:id", verifyToken, deleteUser);

export default router;
