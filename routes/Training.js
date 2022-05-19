const express = require('express');
const router = express.Router();

const AddTraining = require('../controllers/TrainingController.js');

router.get('/addTraining', AddTraining);

module.exports = router;
