const express = require('express');
const router = express.Router();
const SensorController = require('../controllers/SensorController');

router.post('/data', SensorController.collectData);
router.get('/stats', SensorController.getStats);

module.exports = router;