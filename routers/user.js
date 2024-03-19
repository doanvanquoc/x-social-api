import express from "express";
import userController from "../controllers/user.js";
import verifyToken from "../middleware/verify_token.js";
const router = express.Router();

router.post("/follow", verifyToken, userController.followUser);
router.get("/:id", verifyToken, userController.getUser);
router.get("/:id/follower", verifyToken, userController.getUserFollower);

export default router;