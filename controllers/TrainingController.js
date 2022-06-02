const crypto = require('node:crypto');
const TrainingDB = require('../models/TrainingDB');
const APIResponse = require('../utils/APIResponse');

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
    trainingDB.addTraining(trainingHeader, trainingBody);
    const response = new APIResponse(201, {});
    res.status(response.getStatusCode()).json(response.getData());
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
