import express, { Router } from "express";
import {
  createCollection,
  getCollection,
  updateCollection,
  deleteCollection,
} from "../controllers/foods.controller";
import { upload } from "../config/multer.config";

const router: Router = express.Router();

router.get("/getCollection", getCollection as express.RequestHandler);

router.post(
  "/createCollection",
  upload.single("image"),
  createCollection as express.RequestHandler
);

router.put(
  "/updateCollection/:id",
  upload.single("image"),
  updateCollection as express.RequestHandler
);

router.delete(
  "/deleteCollection/:id",
  deleteCollection as express.RequestHandler
);

export default router;
