import { Router } from "express";

import { ProductController } from "../controllers/product.controller";
import { validateId } from "../middleware/handleValidateId";
import { validateList } from "../middleware/handleValidateList";
import { validateToken } from "../middleware/handleValidateToken";

const router = Router();

// Use Middlewares
router.use(validateToken);
router.use("/:list_id/:id", validateId);
router.use("/:list_id", validateList);

// Get all products
router.get("/:list_id/", ProductController.getAll);

// Get a product by ID
router.get("/:list_id/:id", ProductController.getById);

// Add a new product
router.post("/:list_id/", ProductController.add);

// Update a product
router.put("/:list_id/:id", ProductController.update);

// Delete a product
router.delete("/:list_id/:id", ProductController.delete);

export const productRoutes = router;
