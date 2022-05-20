const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();

const AddTraining = require('../controllers/TrainingController.js');

router.post('/addTraining', jsonParser, AddTraining);

module.exports = router;
