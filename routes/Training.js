const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();

const { AddTraining, GetTrainings, DeleteTraining } = require('../controllers/TrainingController.js');

router.post('/addTraining', jsonParser, AddTraining);
router.get('/getTrainings', GetTrainings);
router.delete('/deleteTraining/:id', DeleteTraining);

router.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    return res.status(200).end();
})

module.exports = router;
