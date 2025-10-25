const UserModel = require("../models/User.model");
const { bot } = require("./bot");
const { startHandler } = require("./handlers.js/start.handler");

bot.on('message', async (msg)=>{
    try {
        const chatType = msg.chat.type; 
        if(chatType !== 'private') return;
        const chatId = msg.chat.id;
        const user = await UserModel.findOne({ chatId })
        const text = msg.text;

        if(text == '/start') startHandler(msg);
        if(user){
            

        }  
    } catch (error) {
        console.log(error);
    }
})