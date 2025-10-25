const Telegram = require('node-telegram-bot-api');
require('dotenv').config();

const bot = new Telegram(process.env.BOT_API, {polling: true})

module.exports = { bot }

require('./message');
require('./query');