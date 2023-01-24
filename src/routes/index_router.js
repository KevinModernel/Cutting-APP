import express from 'express'
const router = express.Router();
import {show_landing, create_journey, show_journey, create_goal, store_measure, edit_day, delete_day} from '../controllers/index_controllers.js'

// Routes "/"
router.get('/', show_landing);
router.post('/newjourney', create_journey);
router.get('/journeys/:id', show_journey);
router.post('/newgoal', create_goal)
router.post('/newmeasure', store_measure)

// Route PUT not accessible by now
router.put('/editday/:id', edit_day) // El problema es que tendria que volver a hacer el POST para recalcular los otros campos de la table DailyProgress. Si modularizar bien el "store_measure" podrias volver a llamar a los servicios y editarlo dentro del "edit_day" y chau.
router.post('/deleteday/:id', delete_day)

export default router
