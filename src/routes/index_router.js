import express from 'express'
const router = express.Router();
import {show_landing, create_journey, show_createGoal, show_journey, create_goal, store_measure, delete_day} from '../controllers/index_controllers.js'

// Routes "/"
router.get('/', show_landing);
router.post('/newjourney', create_journey);
router.get('/goal/:id', show_createGoal)
router.get('/journeys/:id', show_journey);
router.post('/newgoal', create_goal)
router.post('/newmeasure', store_measure)
router.post('/deleteday/:journeyid/:id', delete_day)

export default router
