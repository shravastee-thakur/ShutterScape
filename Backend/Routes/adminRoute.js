import express from "express";
import { deleteUser, getUsers } from "../Controllers/adminController.js";
import { allowRole } from "../Middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/get-user", allowRole("admin"), getUsers);
router.delete("/delete-user/:id", allowRole("admin"), deleteUser);

export default router;
