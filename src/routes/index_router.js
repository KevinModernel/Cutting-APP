import express from 'express';
import {show_landing, 
	create_journey, 
	show_journey,  
	store_measure, 
	delete_day} from '../controllers/index_controllers.js';
const router = express.Router();

// Routes "/" path.
router.get('/', show_landing);
router.post('/newjourney', create_journey);

router.get('/journeys/:id', show_journey);
router.post('/newmeasure', store_measure)
router.post('/deleteday/:journeyid/:id', delete_day)

export default router
