import { Router } from "express";

import { ListController } from "../controllers/list.controller";
import { validateId } from "../middleware/handleValidateId";
import { validateList } from "../middleware/handleValidateList";
import { validateToken } from "../middleware/handleValidateToken";

const router = Router();

// Use Middlewares
router.use(validateToken);
router.use("/:id", validateId);
router.use("/", validateList);

// Get all lists
router.get("/", ListController.getAll);

// Get a list by ID
router.get("/:id", ListController.getById);

// Add a new list
router.post("/", ListController.add);

// Update a list
router.put("/:id", ListController.update);

// Delete a list
router.delete("/:id", ListController.delete);

export const listRoutes = router;
