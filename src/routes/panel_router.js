import express from 'express';
import { show_journey, store_measure, delete_day } from '../controllers/panel_controllers.js';
const router = express.Router();


// Router "/panel" path.
router.get('/journeys/:id', show_journey);
router.post('/newmeasure', store_measure)
router.post('/deleteday/:journeyid/:id', delete_day)

export default router
