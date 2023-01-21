import express from 'express'
const router = express.Router();
import {show_landing, create_journey, show_journey} from '../controllers/index_controllers.js'

// Routes "/"
router.get('/', show_landing);
router.post('/newjourney', create_journey);
router.get('/showjourney', show_journey)

export default router
