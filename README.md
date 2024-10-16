# Weather Monitoring Application

This application monitors weather conditions in real time using data from the OpenWeatherMap API. It processes the data to provide rollups and aggregates, and sends alerts when specific conditions are met.

## Features

- **Real-time Weather Monitoring:** Fetches current weather data for specified cities.
- **Email Alerts:** Sends email notifications when specific weather thresholds are exceeded.
- **Daily Rollups:** Logs and summarizes weather data daily.

## Project Structure

- `src/`: Contains the application source code
  - `db.js`: Database connection and schema
  - `weather.js`: Functions for fetching weather data and processing
  - `alerts.js`: Functions for sending alerts (including email alerts)
  - `index.js`: Main application file
- `package.json`: Project metadata and dependencies
- `README.md`: Project documentation

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Set up your MySQL database and configure the connection in `db.js`.
5. Get an API key from OpenWeatherMap and integrate it into the `weather.js` file.
6. Configure email notifications:
   - If using Gmail, ensure you have allowed "Less secure app access" or use an App Password.
   - Update the email credentials in the `.env` file.
7. Run the application with `node src/index.js`.

## Usage

The application will fetch weather data every 5 minutes and log the results. Alerts will be sent via email if conditions exceed specified thresholds. 

### Alert Thresholds

- Temperature: Set to **19°C** for testing purposes. Alerts will trigger if the temperature exceeds this value.

## Email Configuration

The application uses SMTP to send email alerts. Here’s a brief overview of the configuration:

- **SMTP Service:** Gmail (can be replaced with another service)
- **Sender Email:** Your email address (e.g., `jaimanichoudhary446@gmail.com`)
- **Receiver Email:** The email address to receive alerts (e.g., `nikhchy5@gmail.com`)
- **Authentication:** Use your email password or App Password (recommended if 2FA is enabled).

Ensure your email settings allow the application to send alerts without blocking them.

## Contributing

Feel free to fork the repository and submit pull requests with improvements or additional features.

## License

This project is licensed under the MIT License.

