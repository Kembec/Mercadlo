import express, { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

// Register a user
router.post("/register", UserController.register);

// Login a user
router.post("/login", UserController.login);

export const userRoutes = router;
