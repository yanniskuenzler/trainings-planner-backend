const TrainingDB = require("../models/TrainingDB");
const crypto = require('node:crypto');

const trainingDB = new TrainingDB();

const AddTraining = (req, res) => {
    let trainingHeader = {
        "uuid": crypto.randomUUID(),
        "date": req.body.date,
        "trainingCategory": req.trainingCategory,
    }

    console.log(trainingHeader);
    let trainingBody = {
        "duration": req.body.duration,
        "distance": req.body.distance,
        "content": req.body.content
    };
    console.log(trainingBody);
    trainingDB.addTraining(trainingHeader, trainingBody, () => {
        console.log("Done!");
        res.status(201);
        res.send("Successful");
    });
}

module.exports = AddTraining;
