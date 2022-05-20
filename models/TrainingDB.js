const mysql = require('mysql');
require('dotenv').config();

class TrainingDB {
    connection;
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

    addTraining(header, body, callback) {
        let sqlStatementHeader = 'INSERT INTO table_training (training_ID, date, duration, totalDistance, trainingFK) VALUES ' +
        `${header.uuid}, ${header.date}`;
        this.connection.query(sqlStatementHeader, (err, result) => {
            if (err) throw err;
        });

        callback();
    }
}

module.exports = TrainingDB;