const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();

const { AddTraining, GetTraining } = require('../controllers/TrainingController.js');

router.post('/addTraining', jsonParser, AddTraining);
router.get('/getTraining/:id', GetTraining);

module.exports = router;
