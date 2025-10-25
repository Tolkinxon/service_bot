const { MASTER_REGISTER_STATE } = require("../../config");
const UserModel = require("../../models/User.model");
const { bot } = require("../bot");

const startHandler = async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const user = await UserModel.findOne({ chatId })

    if (!user) {
        await UserModel.create({ chatId });
        bot.sendMessage(chatId, "Assalomu alaykum bizning xizmatlarimizga hush kelibsiz iltimos ro'yixatdan o'ting", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "📋 Ro'yixatdan o'tish", callback_data: "register" }]
                ],
                resize_keyboard: true
            }
        })
    }
    else if (user.role == 'none') {
        bot.sendMessage(chatId, "Boshlash uchun ro'yixatda o'ting", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "📋 Ro'yixatdan o'tish", callback_data: "register" }]
                ],
                resize_keyboard: true
            }
        })
    }

    else {
        bot.sendMessage(chatId, "Siz allaqachon ro'yixatdan o'tgansiz. Asosiy menyu keyinroq qo'shiladi.")
    }
}

const registerHandler = async (query) => {
    const messageId = query.message.message_id;
    const chatId = query.message.chat.id;

    bot.editMessageText("Iltimos o'z ro'lingizni tanlang", {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
            inline_keyboard: [
                [{ text: '👷‍♀️ Usta', callback_data: 'role_master' }],
                [{ text: '👨‍💼 Mijoz', callback_data: 'role_client' }]
            ],
            resize_keyboard: true
        }
    })
}

const roleSelectionHandler = async (query) => {
    const messageId = query.message.message_id;
    const chatId = query.message.chat.id;
    const role = query.data.split('_')[1];
    const user = await UserModel.findOne({ chatId })

    if (role == 'master') {
        await UserModel.findByIdAndUpdate(user._id, {
            $set: {
                role: 'master',
                step: MASTER_REGISTER_STATE.CHOOSING_CATEGORY
            }
        })
        await bot.editMessageText("Siz 👷‍♀️ *Usta* sifatida ro'yixatdan o'tmoqdasiz", {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: {
                inline_keyboard: [
                    [{ text: "✂ Sartaroshxona", callback_data: 'category_Sartaroshxona' }],
                    [{ text: "💅 Go'zallik saloni", callback_data: "category_Go'zallik saloni" }],
                    [{ text: "💍 Zargarlik ustaxonasi", callback_data: "category_Zargarlik ustaxonasi" }],
                    [{ text: "⌚ Soatsoz", callback_data: "category_Soatsoz" }],
                    [{ text: "👞 Poyabzal ustaxonasi", callback_data: "category_Poyabzal ustaxonasi" }],
                    [{ text: "🚰 Santexnika", callback_data: "category_Poyabzal ustaxonasi" }],
                ],
                resize_keyboard: true
            }
        })
    }

}



module.exports = { startHandler, registerHandler, roleSelectionHandler }