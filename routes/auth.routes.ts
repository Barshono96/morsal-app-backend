import express, { Router } from "express";
import { registerUser, loginUser, getMe } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router: Router = express.Router();

router.post("/register", registerUser as express.RequestHandler);
router.post("/login", loginUser as express.RequestHandler);
router.get("/me", protect as express.RequestHandler, getMe as express.RequestHandler);

export default router;
