const axios = require('axios')
const moment = require('moment-timezone')

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY

async function getWeatherData(city) {
  // Log the request to retrieve weather data
  console.log(`Requesting weather data for ${city}...`)

  // Get the weather data for the requested city from the OpenWeatherMap API
  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API_KEY}`
  )
  const weatherData = response.data

  // Get the current time for the requested city
  const timezone = moment.tz.guess()
  const time = moment().tz(timezone).format('h:mm A')

  // Log the retrieved weather data
  console.log(
    `Weather data retrieved: ${JSON.stringify(weatherData)}, Time: ${time}`
  )

  // Format the weather data as a string message
  const weatherDescription = weatherData.weather[0].description
  const temperature = Math.round(weatherData.main.temp - 273.15)
  const messageText = `The weather in ${city} is currently ${weatherDescription} with a temperature of ${temperature}°C. The current time is ${time}.`
  // Log the weather data message sent to the user
  console.log(`Weather data message sent to user: ${messageText}`)

  // Return the weather data message
  return messageText
}

module.exports = {
  getWeatherData,
}
