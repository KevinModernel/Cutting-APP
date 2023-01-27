import express from 'express'
import {show_landing, 
	create_journey, 
	show_createGoal, 
	show_journey, 
	create_goal, 
	store_measure, 
	delete_day} from '../controllers/index_controllers.js'
const router = express.Router();

// Routes "/" path.
router.get('/', show_landing);
router.post('/newjourney', create_journey);
router.get('/goal/:id', show_createGoal)
router.post('/newgoal', create_goal)
router.get('/journeys/:id', show_journey);
router.post('/newmeasure', store_measure)
router.post('/deleteday/:journeyid/:id', delete_day)

export default router
