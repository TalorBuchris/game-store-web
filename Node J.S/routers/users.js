import { Router } from "express";
import { getAllUsers, getUserByPassword, updateDetailsUser, addUser } from "../controllers/users.js"
import { checkAdmin, checkToken } from "../Utils/AccessPermissions.js";

const router = Router();

router.get("/", checkAdmin, getAllUsers);
router.put("/:id", checkToken, updateDetailsUser);
router.post("/", addUser);
router.post("/login", getUserByPassword);

export default router;
