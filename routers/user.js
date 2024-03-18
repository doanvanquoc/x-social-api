import express from "express";
import userController from "../controllers/user.js";
import { verifyToken } from "../middleware/verify_token.js";
const router = express.Router();

// router.get("/:id", userController.getUser);