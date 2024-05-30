import { Router } from "express";

import { UserController } from "../controllers/user.controller";

const router = Router();

// Register a user
router.post("/register", UserController.register);

// Login a user
router.post("/login", UserController.login);

// Logout a user
router.post("/logout", UserController.logout);

export const userRoutes = router;
