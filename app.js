require('dotenv').config()
const bot = require('./config/botConfig')
const { getWeatherData } = require('./helpers/weather')
const { getTimeData } = require('./helpers/time')
const { getUserData, resetUserData } = require('./helpers/userData')

// Listen for the start command
bot.onText(/^start$/, (msg) => {
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

// Helper function to get time data for a city

// Helper function to get user data from storage or create new data if it doesn't exist

// Helper function to reset user data

// Listen for the /stop command
bot.onText(/stop/, (msg) => {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, 'You have stopped the current operation.')

  // Reset the user data
  resetUserData(chatId)
})

// Initialize storage
const storage = {}

// Listen for the start command
// bot.onText(/start/, (msg) => {
//   const chatId = msg.chat.id
//   bot.sendMessage(
//     chatId,
//     'Hello! This bot can show you the weather and time for any city. To use it, please choose an option below:',
//     {
//       reply_markup: {
//         inline_keyboard: [
//           [{ text: 'Get Weather', callback_data: 'get_weather' }],
//           [{ text: 'Get Time', callback_data: 'get_time' }],
//         ],
//       },
//     }
//   )
// })

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
        'Please enter the name of the city or send stop to cancel:'
      )
      break
    default:
      break
  }
})
