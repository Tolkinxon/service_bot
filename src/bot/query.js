const UserModel = require("../models/User.model");
const { bot } = require("./bot");
const { fillMasterObject } = require("./handlers.js/master.handler");
const { registerHandler, roleSelectionHandler } = require("./handlers.js/start.handler");

bot.on('callback_query', async (query)=>{
    const queryData = query.data;
    const chatId = query.message.chat.id;
    const user = await UserModel.findOne({ chatId })
    if(!user) return;

    if(queryData == 'register') registerHandler(query);
    if(queryData.startsWith('role_')) roleSelectionHandler(query);
    if(queryData.startsWith('category_')) fillMasterObject(query);
})