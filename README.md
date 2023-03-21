# Telegram Bot(JavaScript) - Weather and Time Telegram Bot

This is a simple Telegram bot that provides weather and time information for a given city using the OpenWeatherMap API and the Moment Timezone library.

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Usage](#usage)
4. [Environment Variables](#environment-variables)
5. [Dependencies](#dependencies)
6. [License](#license)

## Features

- Retrieve weather information for a given city.
- Retrieve the current time for a given city.

## Getting Started

To get started with this project, follow the steps below:

1. Clone the repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Set up the required environment variables (see [Environment Variables](#environment-variables)).
4. Run the bot with `node index.js`.

## Usage

To use the bot, follow these steps:

1. Start the bot by sending the `/start` command.
2. Choose an option by clicking either 'Get Weather' or 'Get Time'.
3. Enter the name of the city when prompted.
4. The bot will return the weather or time information for the requested city.
5. To cancel the current operation, send the `/stop` command.

## Environment Variables

This project requires the following environment variables:

- `TELEGRAM_BOT_TOKEN`: The token received from the BotFather on Telegram.
- `OPENWEATHERMAP_API_KEY`: The API key for the OpenWeatherMap API.

Create a `.env` file in the root of the project and add the required environment variables.

## Dependencies

This project relies on the following dependencies:

- `dotenv`: To load environment variables from the `.env` file.
- `node-telegram-bot-api`: For creating and managing the Telegram bot.
- `axios`: For making API requests to the OpenWeatherMap API.
- `moment-timezone`: For handling time and timezone information.

## License

This project is licensed under the MIT License.
