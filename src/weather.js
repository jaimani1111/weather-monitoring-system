const axios = require('axios');

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeatherData = async (city) => {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}`);
    return response.data;
};

const convertKelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
};

module.exports = { getWeatherData, convertKelvinToCelsius };
const dailySummaries = {};

const recordWeatherData = (city, temp, condition) => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    if (!dailySummaries[today]) {
        dailySummaries[today] = {
            total_temp: 0,
            max_temp: -Infinity,
            min_temp: Infinity,
            count: 0,
            conditions: {}
        };
    }

    dailySummaries[today].total_temp += temp;
    dailySummaries[today].max_temp = Math.max(dailySummaries[today].max_temp, temp);
    dailySummaries[today].min_temp = Math.min(dailySummaries[today].min_temp, temp);
    dailySummaries[today].count += 1;
    dailySummaries[today].conditions[condition] = (dailySummaries[today].conditions[condition] || 0) + 1;
};

const calculateDailySummary = (date) => {
    const summary = dailySummaries[date];
    if (summary) {
        const avg_temp = summary.total_temp / summary.count;
        const dominant_condition = Object.keys(summary.conditions).reduce((a, b) => summary.conditions[a] > summary.conditions[b] ? a : b);
        return { date, avg_temp, max_temp: summary.max_temp, min_temp: summary.min_temp, dominant_condition };
    }
};

module.exports = { getWeatherData, convertKelvinToCelsius, recordWeatherData, calculateDailySummary };
