import express from 'express';
import { show_createGoal, create_goal } from '../controllers/goal_controllers.js';
const router = express.Router();

// Routes "/goals" path.
router.get('/goal/:id', show_createGoal)
router.post('/newgoal', create_goal)

export default router
