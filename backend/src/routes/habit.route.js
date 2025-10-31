import { Router } from "express";
import { createHabit, getHabits, updateHabit, toggleHabitCompletion, deleteHabit } from "../controllers/habit.controller.js";

const router = Router();


router.post("/", createHabit)
router.get("/", getHabits)
router.delete("/:id", deleteHabit)
router.put("/:id", updateHabit)
router.post("/:id/toggle", toggleHabitCompletion)

export default router;
