const crypto = require('node:crypto');
const TrainingDB = require('../models/TrainingDB');

const trainingDB = new TrainingDB();

const AddTraining = (req, res) => {
    let trainingHeader = {
        "uuid": crypto.randomUUID(),
        "date": req.body.date,
        "weekday": req.body.weekday,
        "trainingCategory": req.body.trainingCategory
    }
    let trainingBody = {
        "duration": req.body.duration,
        "distance": req.body.distance,
        "content": req.body.content
    };
    trainingDB.addTraining(trainingHeader, trainingBody).then(() => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.status(201).json({});
    });
}

const GetTrainings = (req, res) => {
    trainingDB.getTrainings(req, res);
}

const DeleteTraining = (req, res) => {
    trainingDB.deleteTraining(req.params['id']);
    const response = new APIResponse(200, {});
    res.status(response.getStatusCode()).json(response.getData());
}

module.exports = { AddTraining, GetTrainings, DeleteTraining }
