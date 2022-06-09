const crypto = require('node:crypto');
const TrainingDB = require('../models/TrainingDB');

const trainingDB = new TrainingDB();

const AddTraining = (req, res) => {
    let trainingHead = {
        "uuid": crypto.randomUUID(),
        "trainingCategory": req.body.trainingCategory,
        "date": req.body.date,
        "weekday": req.body.weekday,
        "duration": req.body.duration,
        "distance": req.body.distance
    }
    let trainingBody = req.body.trainingBody;
    trainingDB.addTraining(trainingHead, trainingBody).then(() => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.status(201).json({});
    });
}

const GetTrainings = (req, res) => {
    trainingDB.getTrainings(req, res);
}

const DeleteTraining = (req, res) => {
    trainingDB.deleteTraining(req.params['id']).then(() => {
        res.status(200).json({});
    });
}

module.exports = { AddTraining, GetTrainings, DeleteTraining }
