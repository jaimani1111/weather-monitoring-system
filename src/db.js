const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./weather.db');

const createTable = () => {
    db.run(`CREATE TABLE IF NOT EXISTS weather (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        avg_temp REAL,
        max_temp REAL,
        min_temp REAL,
        dominant_condition TEXT
    )`);
};

const insertSummary = (summary) => {
    db.run(`INSERT INTO weather (date, avg_temp, max_temp, min_temp, dominant_condition) VALUES (?, ?, ?, ?, ?)`, 
        [summary.date, summary.avg_temp, summary.max_temp, summary.min_temp, summary.dominant_condition]);
};

const getWeatherData = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM weather ORDER BY date DESC', [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports = { createTable, insertSummary, getWeatherData }; // Export the new function


