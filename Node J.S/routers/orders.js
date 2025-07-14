import { Router } from "express";
import { getAllOrders, getOrderById, AllUnshippedOrders, updateStatusOrder, addOrder } from "../controllers/orders.js"
import { checkAdmin } from "../Utils/AccessPermissions.js";

const router = Router();

router.get("/", checkAdmin, getAllOrders);
router.get("/unshipped", checkAdmin, AllUnshippedOrders);
router.get("/:id", checkAdmin, getOrderById);
router.put("/:id", checkAdmin, updateStatusOrder);
router.post("/", addOrder);

export default router;