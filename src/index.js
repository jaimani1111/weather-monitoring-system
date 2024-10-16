require('dotenv').config();
const nodemailer = require('nodemailer');

const express = require('express'); 
const db = require('./db');
const { getWeatherData, convertKelvinToCelsius, recordWeatherData, calculateDailySummary } = require('./weather');
const path = require('path');

const app = express(); 
const PORT = process.env.PORT || 3000; 


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
db.createTable();

const updateInterval = 5 * 60 * 1000; 

const alertThresholds = {
    temperature: 35 // in Celsius
};

const checkAlerts = (temp) => {
    if (temp > alertThresholds.temperature) {
        console.log(`Alert: Temperature exceeded ${alertThresholds.temperature}°C!`);
        // email notifications here using nodemailer if desired
    }
};

const processWeatherData = (city, temp, feels_like, condition) => {
    recordWeatherData(city, temp, condition);
    checkAlerts(temp);
    
    const today = new Date().toISOString().split('T')[0];
    const summary = calculateDailySummary(today);
    
    if (summary) {
        db.insertSummary(summary);
        console.log(`Daily Summary for ${today}:`, summary);
    }
};

const fetchWeatherUpdates = async () => {
    for (const city of CITIES) {
        const weatherData = await getWeatherData(city);
        const temp = convertKelvinToCelsius(weatherData.main.temp);
        const feels_like = convertKelvinToCelsius(weatherData.main.feels_like);
        const condition = weatherData.weather[0].main;
        const timestamp = new Date(weatherData.dt * 1000); e

        console.log(`Weather in ${city} at ${timestamp}: ${temp}°C, feels like ${feels_like}°C, condition: ${condition}`);
    }
};

// Fetch weather updates at regular intervals
setInterval(fetchWeatherUpdates, updateInterval);


fetchWeatherUpdates();

// API endpoint to fetch weather data
app.get('/api/weather-data', async (req, res) => {
    try {
        const weatherData = await db.getWeatherData(); // This will now work
        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file on the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'EMAIL_SENDER_ADD_FROM_ENV', 
        pass: EMAIL_PASS, 
    },
});


