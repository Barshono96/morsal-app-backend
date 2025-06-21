import express, { Router } from "express";
import {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  updateProfilePicture,
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import { admin } from "../middleware/auth.middleware";
import { upload } from "../config/multer.config";

const router: Router = express.Router();

router.post("/register", registerUser as express.RequestHandler);
router.post("/login", loginUser as express.RequestHandler);

router.get(
  "/me",
  protect as express.RequestHandler,
  admin as express.RequestHandler,
  getMe as express.RequestHandler
);
router.post(
  "/logout",
  protect as express.RequestHandler,

  logoutUser as express.RequestHandler
);
router.patch(
  "/profile-picture",
  protect as express.RequestHandler,
  admin as express.RequestHandler,
  upload.single("image") as express.RequestHandler,
  updateProfilePicture as express.RequestHandler
);

export default router;
