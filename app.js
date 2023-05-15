require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')
const moment = require('moment-timezone')

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true })

const storage = {}

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

bot.on('callback_query', async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id
  const data = callbackQuery.data

  switch (data) {
    case 'get_weather':
      const userDataWeather = getUserData(chatId)
      userDataWeather.waitingForCity = true
      userDataWeather.waitingForWeather = true
      bot.sendMessage(
        chatId,
        'Please enter the name of the city or send /stop to cancel:'
      )
      break
    case 'get_time':
      const userDataTime = getUserData(chatId)
      userDataTime.waitingForCity = true
      userDataTime.waitingForTime = true
      bot.sendMessage(
        chatId,
        'Please enter the name of the city or send /stop to cancel:'
      )
      break
    default:
      break
  }
})

bot.on('message', async (msg) => {
  const chatId = msg.chat.id
  const text = msg.text

  const userData = getUserData(chatId)
  if (userData && userData.waitingForCity) {
    const city = text
    let messageText = ''
    try {
      if (userData.waitingForWeather) {
        messageText = await getWeatherData(city)
      } else if (userData.waitingForTime) {
        messageText = await getTimeData(city)
      }
      bot.sendMessage(chatId, messageText)
    } catch (error) {
      bot.sendMessage(chatId, `Sorry, an error occurred. ${error.message}`)
    }
    resetUserData(chatId)
  }
})

bot.onText(/\/stop/, (msg) => {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, 'You have stopped the current operation.')
  resetUserData(chatId)
})

async function getWeatherData(city) {
  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API_KEY}`
  )
  const weatherData = response.data
  const temperature = Math.round(weatherData.main.temp - 273.15)
  const messageText = `The weather in ${city} is currently ${weatherData.weather[0].description} with a temperature of ${temperature}°C.`
  return messageText
}

async function getTimeData(city) {
  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API_KEY}`
  )
  const timezone = response.data.timezone
  const time = moment()
    .utcOffset(timezone / 60)
    .format('h:mm A')
  const messageText = `The current time in ${city} is ${time}.`
  return messageText
}

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

function resetUserData(chatId) {
  const userData = getUserData(chatId)
  userData.waitingForCity = false
  userData.waitingForWeather = false
  userData.waitingForTime = false
}
