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

    addTraining(header, body) {
        let sqlInsertTraining = 'INSERT INTO table_training (training_ID, date, weekday, duration, totalDistance, trainingCategory_fk) VALUES ' +
        `('${header.uuid}', '${header.date}', '${header.weekday}', '${body.duration}', '${body.distance}', ` +
        `(SELECT trainingCategory_ID FROM table_trainingCategory WHERE trainingCategoryName = '${header.trainingCategory}'))`;

        this.connection.query(sqlInsertTraining, (err, result) => {
            if (err) throw err;

            body.content.forEach((item, index) => {
                let sqlInsertSection = 'INSERT INTO table_section (sectionContent, sectionIndex, training_fk, sectionCategory_fk) VALUES ' +
                    `('${item.value}', '${index}', '${header.uuid}', ` +
                    `(SELECT sectionCategory_ID FROM table_sectioncategory WHERE sectionCategoryName = '${item.sectionCategory}'))`;

                this.connection.query(sqlInsertSection, (err, result) => {
                    if (err) throw err;
                });
            });
        });
    }

    getTrainings() {
        let json = {};
        let sqlSelectTraining = "SELECT t.training_ID, t.date, t.weekday, tc.trainingCategoryName, t.duration, t.totalDistance FROM table_training t JOIN table_trainingcategory tc ON t.trainingCategory_fk=tc.trainingCategory_ID;";

        this.connection.query(sqlSelectTraining, (err, result) => {
            if (err) throw err;
            let trainingResult = result;

            trainingResult.forEach((item) => {
                let sqlSelectSections = `SELECT sc.sectionCategoryName, s.sectionContent, s.sectionIndex FROM table_section s JOIN table_sectioncategory sc ON s.sectionCategory_fk=sc.sectionCategory_ID WHERE training_fk='${item.training_ID}';`

                this.connection.query(sqlSelectSections, (err, result) => {
                    if (err) throw err;
                    formatTraining.addTrainingToJSON(trainingResult, result);

                })
            })

        });

    }


}

module.exports = TrainingDB;