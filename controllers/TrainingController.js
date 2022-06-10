const crypto = require('node:crypto');
const TrainingDB = require('../models/TrainingDB');
const trainingDB = new TrainingDB();

const AddTraining = (req, res) => {
    let trainingHead = {
        "uuid": crypto.randomUUID(),
        "trainingCategory": req.body.trainingCategory,
        "date": req.body.date,
        "weekday": req.body.weekday,
        "duration": req.body.duration
    }
    let trainingBody = req.body.trainingBody;
    trainingDB.addTraining(trainingHead, trainingBody).then(() => {
        res.status(201).json({msg: "Data successfully stored in database"});
    });
}

const GetTrainings = (req, res) => {
    trainingDB.getTrainings().then(() => {
        res.status(200).json(trainingDB.getResponseTrainingJSON());
    });
}

const DeleteTraining = (req, res) => {
    trainingDB.deleteTraining(req.params['id']).then(() => {
        res.status(200).json({msg: "Data successfully deleted from database"});
    });
}

module.exports = { AddTraining, GetTrainings, DeleteTraining }
