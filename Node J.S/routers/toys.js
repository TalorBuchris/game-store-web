import { Router } from "express";
import { getAllToys, getToyById, getToysByCategory, addToy, removeToy, updateDetailToy, totalPages, getAllActiveToys, ProductDeactivation, totalPagesOfActiveToys } from "../controllers/toys.js"
import { checkAdmin } from "../Utils/AccessPermissions.js";

const router = Router();

router.get("/", getAllToys);
router.get("/activeToys", getAllActiveToys);
router.get("/countPages", totalPages);
router.get("/countPagesActive", totalPagesOfActiveToys);
router.get("/:id", getToyById);
router.get("/category/:id", getToysByCategory);
router.put("/deactivation/:id", checkAdmin, ProductDeactivation);
router.put("/:id", checkAdmin, updateDetailToy);
router.post("/", checkAdmin, addToy);
router.delete("/:id", checkAdmin, removeToy);

export default router;
