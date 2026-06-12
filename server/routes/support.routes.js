import express from "express";
import {
  createSupportRequest,
  getSupportRequests,
  getSupportRequestById,
  assignVolunteer,
} from "../controllers/support.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createSupportRequest);
router.get("/", protect,getSupportRequests);
router.get("/:id",protect ,getSupportRequestById);
router.patch(
  "/:id/assign",
  protect,
  assignVolunteer
);

export default router;