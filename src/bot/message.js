const UserModel = require("../models/User.model");
const { bot } = require("./bot");
const { fillMasterObject } = require("./handlers.js/master.handler");
const { startHandler } = require("./handlers.js/start.handler");

bot.on('message', async (msg)=>{
    try {
        const chatType = msg.chat.type; 
        if(chatType !== 'private') return;
        const chatId = msg.chat.id;
        const user = await UserModel.findOne({ chatId })
        const text = msg.text;

        console.log(msg.location);
        

        if(text == '/start') startHandler(msg);
        if(user){
            if(user.step.startsWith('master_register_')) fillMasterObject(undefined, msg);
            

        }  
    } catch (error) {
        console.log(error);
    }
})