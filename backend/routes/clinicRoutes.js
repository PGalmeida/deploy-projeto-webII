import express from "express";
import { clinicControllers } from "../controllers/clinicControllers.js";
import { isAuthenticated } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.post("/", isAuthenticated,  clinicControllers.create);
router.get("/", clinicControllers.list);
router.get("/:id", clinicControllers.getById);
router.put("/:id", isAuthenticated, isAdmin, clinicControllers.update);
router.delete("/:id", isAuthenticated, isAdmin, clinicControllers.delete);

export default router;
