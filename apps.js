const TelegramBot = require('node-telegram-bot-api')

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.TOKEN, {
  polling: true
});

bot.onText(/\/version/, function (msg, match) {
    bot.sendMessage(msg.chat.id, process.env.VERSION)
})

bot.onText(/^[^\/].*/, function (msg, match) {
    bot.sendMessage(msg.chat.id, "let's search <" + match + ">")
})
