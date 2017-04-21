const net = require('net')
const TelegramBot = require('node-telegram-bot-api')

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.TOKEN, {
  polling: true
});

bot.onText(/\/version/, function (msg, match) {
    bot.sendMessage(msg.chat.id, process.env.VERSION)
})

bot.onText(/^[^\/].*/, function (msg, match) {
    // bot.sendMessage(msg.chat.id, "let's search <" + match + ">")
    const search = match[0]

    const client = new net.Socket()
    client.connect(process.env.MEMENTO_PORT, process.env.MEMENTO_HOST, function() {
	    console.log('connected')
	    client.write(search + "\n")
    })

    client.on('data', function(data) {
	    //console.log('received: ' + data)
        bot.sendMessage(msg.chat.id, data)
    })

    client.on('close', function() {
	    console.log('connection closed')
    })
})
