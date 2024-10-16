# Weather Monitoring Application

This application monitors weather conditions in real time using data from the OpenWeatherMap API. It processes the data to provide rollups and aggregates, and sends alerts when specific conditions are met.

## Project Structure

- `src/`: Contains the application source code
  - `db.js`: Database connection and schema
  - `weather.js`: Functions for fetching weather data and processing
  - `alerts.js`: Functions for sending alerts
  - `index.js`: Main application file
- `package.json`: Project metadata and dependencies
- `README.md`: Project documentation

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Set up your MySQL database and configure the connection in `db.js`.
5. Get an API key from OpenWeatherMap and integrate it in the `weather.js` file.
6. Run the application with `node src/index.js`.

## Usage

The application will fetch weather data every 5 minutes and log the results. Alerts will be sent via email if conditions exceed specified thresholds.
