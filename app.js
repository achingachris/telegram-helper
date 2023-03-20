require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')
const moment = require('moment-timezone')

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY

// replace the value below with the Telegram token you receive from @BotFather
const token = TELEGRAM_BOT_TOKEN

// Create a bot instance
const bot = new TelegramBot(token, { polling: true })

// Listen for the /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id
  bot.sendMessage(
    chatId,
    'Hello! This bot can show you the weather and time for any city. To use it, please choose an option below:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Get Weather', callback_data: 'get_weather' }],
          [{ text: 'Get Time', callback_data: 'get_time' }],
        ],
      },
    }
  )
})

// Listen for inline keyboard button presses
bot.on('callback_query', async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id
  const data = callbackQuery.data

  switch (data) {
    case 'get_weather':
      // Ask user for the city name
      bot.sendMessage(chatId, 'Please enter the name of the city:')
      break
    case 'get_time':
      // Ask user for the city name
      bot.sendMessage(chatId, 'Please enter the name of the city:')
      break
    default:
      break
  }
})

// Listen for user input
bot.on('message', async (msg) => {
  const chatId = msg.chat.id
  const text = msg.text

  // Check if the user is responding to a weather or time request
  const userData = getUserData(chatId)
  if (userData && userData.waitingForCity) {
    // Get the weather or time data for the requested city
    const city = text
    let messageText = ''
    if (userData.waitingForWeather) {
      messageText = await getWeatherData(city)
    } else if (userData.waitingForTime) {
      messageText = await getTimeData(city)
    }

    // Send the weather or time data back to the user
    bot.sendMessage(chatId, messageText)

    // Reset the user data
    resetUserData(chatId)
  }
})

// Helper function to get weather data for a city
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

// Helper function to get time data for a city
async function getTimeData(city) {
  // Get the current time for the requested city
  const timezone = moment.tz.guess()
  const time = moment().tz(timezone).format('h:mm A')

  // Log the retrieved time data
  console.log(`Time data retrieved: Time: ${time}`)

  // Format the time data as a string message
  const messageText = `The current time in ${city} is ${time}.`

  // Log the time data message sent to the user
  console.log(`Time data message sent to user: ${messageText}`)

  // Return the time data message
  return messageText
}

// Helper function to get user data from storage or create new data if it doesn't exist
function getUserData(chatId) {
  let userData = storage[chatId]
  if (!userData) {
    userData = {
      waitingForCity: false,
      waitingForWeather: false,
      waitingForTime: false,
    }
    storage[chatId] = userData
  }
  return userData
}

// Helper function to reset user data
function resetUserData(chatId) {
  const userData = getUserData(chatId)
  userData.waitingForCity = false
  userData.waitingForWeather = false
  userData.waitingForTime = false
}

// Listen for the /stop command
bot.onText(/\/stop/, (msg) => {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, 'You have stopped the current operation.')

  // Reset the user data
  resetUserData(chatId)
})

// Initialize storage
const storage = {}

// Listen for the /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id
  bot.sendMessage(
    chatId,
    'Hello! This bot can show you the weather and time for any city. To use it, please choose an option below:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Get Weather', callback_data: 'get_weather' }],
          [{ text: 'Get Time', callback_data: 'get_time' }],
        ],
      },
    }
  )
})

// Listen for inline keyboard button presses
bot.on('callback_query', async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id
  const data = callbackQuery.data

  switch (data) {
    case 'get_weather':
      // Set user data to request weather data for a city
      const userDataWeather = getUserData(chatId)
      userDataWeather.waitingForCity = true
      userDataWeather.waitingForWeather = true

      // Ask user for the city name
      bot.sendMessage(
        chatId,
        'Please enter the name of the city or send /stop to cancel:'
      )
      break
    case 'get_time':
      // Set user data to request time data for a city
      const userDataTime = getUserData(chatId)
      userDataTime.waitingForCity = true
      userDataTime.waitingForTime = true

      // Ask user for the city name
      bot.sendMessage(
        chatId,
        'Please enter the name of the city or send /stop to cancel:'
      )
      break
    default:
      break
  }
})
