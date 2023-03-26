const TelegramBot = require('node-telegram-bot-api')

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true })

module.exports = bot
