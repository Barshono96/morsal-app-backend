import express, { Router } from "express";
import {
  getFeedbacks,
  insertFeedbacks,
  deleteFeedbacks,
} from "../controllers/feedbacks.controller";
import { protect } from "../middleware/auth.middleware";
import { admin } from "../middleware/auth.middleware";

const router: Router = express.Router();

router.get(
  "/getFeedBacks",
  protect as express.RequestHandler,
  admin as express.RequestHandler,
  getFeedbacks as express.RequestHandler
);
router.post(
  "/insertFeedbacks",
  protect as express.RequestHandler,
  admin as express.RequestHandler,
  insertFeedbacks as express.RequestHandler
);
router.delete(
  "/deleteFeedbacks/:id",
  protect as express.RequestHandler,
  admin as express.RequestHandler,
  deleteFeedbacks as express.RequestHandler
);

export default router;
