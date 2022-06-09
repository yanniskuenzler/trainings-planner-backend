const mysql = require('mysql');
const FormatTraining = require('../utils/FormatTraining');
require('dotenv').config();

const formatTraining = new FormatTraining();

class TrainingDB {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD
        });

        this.connection.connect((err) => {
            if (err) throw err;
            console.log("Connected successfully to database!");
            this.connection.query('USE trainings_planner_db', (err, result) => {
                if (err) throw err;
            });
        });
    }

    async addTraining(header, body) {
        let sqlInsertTraining = 'INSERT INTO table_training (training_ID, date, weekday, duration, totalDistance, trainingCategory_fk) VALUES ' +
        `('${header.uuid}', '${header.date}', '${header.weekday}', '${body.duration}', '${body.distance}', ` +
        `(SELECT trainingCategory_ID FROM table_trainingCategory WHERE trainingCategoryName = '${header.trainingCategory}'))`;

        this.connection.query(sqlInsertTraining, (err, result) => {
            if (err) throw err;

            body.content.forEach((item) => {
                let sqlInsertSection = 'INSERT INTO table_section (sectionContent, training_fk, sectionCategory_fk) VALUES ' +
                    `('${item.value}', '${header.uuid}', ` +
                    `(SELECT sectionCategory_ID FROM table_sectioncategory WHERE sectionCategoryName = '${item.sectionCategory}'))`;

                this.connection.query(sqlInsertSection, (err, result) => {
                    if (err) throw err;
                });
            });
        });
    }

    getTrainings(req, res) {
        let sqlSelectTraining = "SELECT t.training_ID, t.date, t.weekday, tc.trainingCategoryName, t.duration, t.totalDistance FROM table_training t JOIN table_trainingcategory tc ON t.trainingCategory_fk=tc.trainingCategory_ID ORDER BY t.date;";

        this.connection.query(sqlSelectTraining, (err, trainingResults) => {
            if (err) throw err;

            Promise.all(trainingResults.map((trainingResult) => {
                let sqlSelectSections = `SELECT sc.sectionCategoryName, s.sectionContent FROM table_section s JOIN table_sectioncategory sc ON s.sectionCategory_fk=sc.sectionCategory_ID WHERE training_fk='${trainingResult.training_ID}' ORDER BY s.section_ID;`
                formatTraining.resetJSON();
                return new Promise((resolve, reject) => {
                    this.connection.query(sqlSelectSections, (err, sectionResult) => {
                        if (err) reject(err);

                        formatTraining.addTrainingToJSON(trainingResult, sectionResult);
                        resolve();
                    });
                });
            })).then(() => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.status(200).json(formatTraining.getTrainingJSON());
            });
        });
    }

    deleteTraining(id) {
        let sqlDeleteSections = `DELETE FROM table_section WHERE training_fk='${id}';`
        let sqlDeleteTraining = `DELETE FROM table_training WHERE training_ID='${id}';`

        this.connection.query(sqlDeleteSections, (err, result) => {
            if (err) throw err;

            this.connection.query(sqlDeleteTraining, (err, result) => {
                if (err) throw err;

            });
        });
    }

}


module.exports = TrainingDB;