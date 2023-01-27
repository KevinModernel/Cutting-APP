import express from 'express';
import {show_landing, create_journey } from '../controllers/index_controllers.js';
const router = express.Router();

// Routes "/" path.
router.get('/', show_landing);
router.post('/newjourney', create_journey);

export default router
