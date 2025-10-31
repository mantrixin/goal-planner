import { Router } from "express";
import { createGoal, deleteGoal, getGoals, updateGoal, updateGoalProgress } from "../controllers/goal.controller.js";
const router = Router();

router.post("/", createGoal);
router.get("/", getGoals);

router.put('/:id', updateGoal);

router.put('/:id/progress', updateGoalProgress);
router.delete('/:id', deleteGoal);

export default router;
