const express = require('express');
const router = express.Router();
const SensorController = require('../controllers/SensorController');
const ReportController = require("../controllers/ReportController");

router.post('/data', SensorController.collectData);
router.get('/stats', SensorController.getStats);
router.get("/report", ReportController.getReport);

module.exports = router;