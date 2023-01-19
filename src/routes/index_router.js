const express = require('express');
const router = express.Router();
const { show_landing, create_journey } = require('../controllers/index_controllers.js');

// Routes "/"
router.get('/', show_landing);
router.post('/newjourney', create_journey);



module.exports = router