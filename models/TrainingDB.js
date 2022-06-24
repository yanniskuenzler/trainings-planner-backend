const mysql = require('mysql');
const FormatTraining = require('../utils/FormatTraining');
require('dotenv').config();

const formatTraining = new FormatTraining();

class TrainingDB {
    trainingJSON = [];

    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD
        });

        this.connection.connect((err) => {
            if (err) throw err;

            console.log("Connected successfully to database!");
            this.connection.query('USE heroku_424f7042f8e2f68', (err, result) => {
                if (err) throw err;
            });
        });
    }

    async addTraining(head, body) {
        return new Promise((resolve, reject) => {
            let sqlInsertTraining = 'INSERT INTO table_training (training_ID, date, weekday, duration, trainingCategory_fk) VALUES ' +
                `('${head.uuid}', '${head.date}', '${head.weekday}', '${head.duration}', ` +
                `(SELECT trainingCategory_ID FROM table_trainingCategory WHERE trainingCategoryName = '${head.trainingCategory}'))`;

            this.connection.query(sqlInsertTraining, (err, result) => {
                if (err) reject(err);

                body.forEach((section) => {
                    let sqlInsertSection = 'INSERT INTO table_section (sectionContent, training_fk, sectionCategory_fk) VALUES ' +
                        `('${section.sectionValue}', '${head.uuid}', ` +
                        `(SELECT sectionCategory_ID FROM table_sectioncategory WHERE sectionCategoryName = '${section.sectionCategory}'))`;

                    this.connection.query(sqlInsertSection, (err, result) => {
                        if (err) reject(err);

                        resolve();
                    });
                });
            });
        });

    }

    async getTrainings() {
        return new Promise((resolve, reject) => {
            let sqlSelectTraining = "SELECT t.training_ID, t.date, t.weekday, tc.trainingCategoryName, t.duration FROM table_training t JOIN table_trainingcategory tc ON t.trainingCategory_fk=tc.trainingCategory_ID ORDER BY t.date;";
            formatTraining.resetJSON();
            this.connection.query(sqlSelectTraining, (err, trainingResults) => {
                if (err) reject(err);

                Promise.all(trainingResults.map((trainingResult) => {
                    let sqlSelectSections = `SELECT sc.sectionCategoryName, s.sectionContent FROM table_section s JOIN table_sectioncategory sc ON s.sectionCategory_fk=sc.sectionCategory_ID WHERE training_fk='${trainingResult.training_ID}' ORDER BY s.section_ID;`
                    return new Promise((resolve, reject) => {
                        this.connection.query(sqlSelectSections, (err, sectionResult) => {
                            if (err) reject(err);

                            formatTraining.addTrainingToJSON(trainingResult, sectionResult);
                            resolve();
                        });
                    });
                })).then(() => {
                    this.trainingJSON = formatTraining.getTrainingJSON();
                    resolve();
                });
            });
        });

    }

    getResponseTrainingJSON() {
        return this.trainingJSON;
    }

    async deleteTraining(id) {
        return new Promise((resolve, reject) => {
            let sqlDeleteSections = `DELETE FROM table_section WHERE training_fk='${id}';`
            let sqlDeleteTraining = `DELETE FROM table_training WHERE training_ID='${id}';`

            this.connection.query(sqlDeleteSections, (err, result) => {
                if (err) reject(err);

                this.connection.query(sqlDeleteTraining, (err, result) => {
                    if (err) reject(err);

                    resolve();
                });
            });
        });
    }


}


module.exports = TrainingDB;