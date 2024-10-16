# Weather Monitoring Application

This application monitors weather conditions in real time using data from the OpenWeatherMap API. It processes the data to provide rollups and aggregates, and sends alerts when specific conditions are met.

## Project Structure

- `src/`: Contains the application source code
  - `db.js`: Database connection and schema (uses SQLite for data storage)
  - `weather.js`: Functions for fetching weather data and processing it
  - `alerts.js`: Functions for sending alerts via email
  - `index.js`: Main application file
- `public/`: Contains static files
  - `index.html`: The main HTML file served to users
- `package.json`: Project metadata and dependencies
- `README.md`: Project documentation

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Set up your SQLite database (the application automatically manages the database schema).
5. Get an API key from OpenWeatherMap and integrate it in the `weather.js` file.
6. Update your `.env` file with your email credentials for sending alerts.
7. Run the application with `node src/index.js`.

## Usage

The application will fetch weather data every 5 minutes and log the results. If the temperature exceeds the specified threshold (default is set to **19°C** for testing purposes), an email alert will be sent to the specified email address.

### Workflow

1. The application fetches weather data for predefined cities from the OpenWeatherMap API.
2. It processes the data to convert temperature from Kelvin to Celsius.
3. The application checks if the temperature exceeds the threshold. If it does, an email alert is triggered.
4. Daily summaries of the weather data are recorded in the SQLite database.

### Diagram

 flowchart that illustrates the workflow of the Weather Monitoring Application:

```plaintext
 +-------------------+
 | Fetch Weather Data|
 +-------------------+
          |
          v
 +-------------------+
 | Process Data      |
 | (Convert Units)   |
 +-------------------+
          |
          v
 +-------------------+
 | Check Thresholds  |
 +-------------------+
          |
     +----+-----+
     |          |
     v          v
  +---------+   +----------------+
  | Send    |   | Log Data to DB |
  | Email   |   +----------------+
  +---------+

