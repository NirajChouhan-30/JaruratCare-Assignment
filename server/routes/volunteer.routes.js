import express from "express";
import {
  createVolunteer,
  getVolunteers,
} from "../controllers/volunteer.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createVolunteer);
router.get("/", protect,getVolunteers);

export default router;