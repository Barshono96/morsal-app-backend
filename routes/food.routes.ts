import express, { Router } from "express";
import {
  createCollection,
  getCollection,
  updateCollection,
  deleteCollection,
} from "../controllers/foods.controller";
import { protect } from "../middleware/auth.middleware";
import { admin } from "../middleware/auth.middleware";
import { upload } from "../config/multer.config";

const router: Router = express.Router();

router.get(
  "/getCollection",
  protect as express.RequestHandler,
  admin as express.RequestHandler,
  getCollection as express.RequestHandler
);

router.post(
  "/createCollection",
  protect as express.RequestHandler,
  admin as express.RequestHandler,
  upload.single("image"),
  createCollection as express.RequestHandler
);

router.put(
  "/updateCollection/:id",
  protect as express.RequestHandler,
  admin as express.RequestHandler,
  upload.single("image"),
  updateCollection as express.RequestHandler
);

router.delete(
  "/deleteCollection/:id",
  admin as express.RequestHandler,
  protect as express.RequestHandler,
  deleteCollection as express.RequestHandler
);

export default router;
