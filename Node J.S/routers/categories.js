import { Router } from "express";
import {getAllCategories} from "../controllers/categories.js"
import { checkAdmin } from "../Utils/AccessPermissions.js";

const router = Router();
router.get("/", checkAdmin, getAllCategories);

export default router;