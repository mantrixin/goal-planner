import { Router } from "express";
import { getMoodLogs, createMood, deleteMoodLog } from "../controllers/mood.controller.js";

const router = Router()

router.get("/", getMoodLogs)
router.post("/", createMood)
router.delete("/:id", deleteMoodLog)

export default router;