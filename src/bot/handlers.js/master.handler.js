const { text } = require("express");
const { bot } = require("../bot");

function showMasterCategories(chatId){
    bot.sendMessage(chatId, "Kerakli yo'nalishni tanlang !", {
        reply_markup: {
            inline_keyboard: [
                [ { text: "Sartarosh", callback_data: ""} ],
            ]
        }
    })
}