const { bot } = require("../bot");
const UserModel = require("../../models/User.model");
const { MASTER_REGISTER_STATE } = require("../../config");

async function fillMasterObject(query, msg) {
    let chatId = 0;
    if (query) chatId = query.message.chat.id;
    if (msg) chatId = msg.chat.id;

    const user = await UserModel.findOne({ chatId });
    switch (user.step) {

        case 'master_register_category':
            const category = query.data.replace('category_', '');
            await UserModel.findByIdAndUpdate(user._id, {
                $set: {
                    "temp_data.category": category,
                    step: MASTER_REGISTER_STATE.ENTERING_NAME
                }
            });
            await bot.editMessageText("To'lliq ismingizni kiriting", {
                chat_id: chatId,
                message_id: query.message.message_id,
            })
            break;

        case 'master_register_name':
            await UserModel.findByIdAndUpdate(user._id, {
                $set: {
                    "temp_data.full_name": msg.text,
                    step: MASTER_REGISTER_STATE.ENTERING_PHONE
                }
            });
            bot.sendMessage(chatId, "Telefon raqamingizni kiriting");
            break;

        case 'master_register_phone':
            await UserModel.findByIdAndUpdate(user._id, {
                $set: {
                    "temp_data.phone_number": msg.text,
                    step: MASTER_REGISTER_STATE.ENTERING_SERVICE_NAME
                }
            });
            bot.sendMessage(chatId, "Xizmat nomini kiriting !");
            break;

        case 'master_register_service_name':
            await UserModel.findByIdAndUpdate(user._id, {
                $set: {
                    "temp_data.service_name": msg.text,
                    step: MASTER_REGISTER_STATE.ENTERING_ADDRESS
                }
            });
            bot.sendMessage(chatId, "Manzilingizni kiriting !");
            break;

        case 'master_register_address':
            await UserModel.findByIdAndUpdate(user._id, {
                $set: {
                    "temp_data.address": msg.text,
                    step: MASTER_REGISTER_STATE.ENTERING_LOCATION
                }
            });
            bot.sendMessage(chatId, "Lokatsiyani kiriting !");
            break;

        case 'master_register_location':
            if (!msg.location) bot.sendMessage(chatId, "Lokatsiyani kiriting !");
            await UserModel.findByIdAndUpdate(user._id, {
                $set: {
                    "temp_data.location": msg.location,
                    step: MASTER_REGISTER_STATE.ENTERING_START_TIME
                }
            });
            bot.sendMessage(chatId, "Ish boshlanish vaqtini kiriting !");
            break;

        case 'master_register_start_time':
            await UserModel.findByIdAndUpdate(user._id, {
                $set: {
                    "temp_data.start_time": msg.text,
                    step: MASTER_REGISTER_STATE.ENTERING_END_TIME
                }
            });
            bot.sendMessage(chatId, "Ish tugash vaqtini kiriting !");
            break;

        case 'master_register_end_time':
            await UserModel.findByIdAndUpdate(user._id, {
                $set: {
                    "temp_data.end_time": msg.text,
                    step: MASTER_REGISTER_STATE.ENTERING_AVG_TIME
                }
            });
            bot.sendMessage(chatId, "Ish davomiyligi vaqtini kiriting !");
            break;

        case 'master_register_avg_time':
            const newUser = await UserModel.findByIdAndUpdate(user._id, {
                $set: {
                    "temp_data.avg_service_time": msg.text,
                    step: MASTER_REGISTER_STATE.CONFIRMATION
                }
            }, { new: true });
            bot.sendMessage(chatId, `
                    Category: ${newUser.temp_data.category},
                    Full name: ${newUser.temp_data.full_name},
                    Phone number: ${newUser.temp_data.phone_number},
                    Service name: ${newUser.temp_data.service_name},
                    Address: ${newUser.temp_data.address},
                    Location: latitude: ${newUser.temp_data.location?.latitude}, longtitude: ${newUser.temp_data.location?.longitude},
                    Start time: ${newUser.temp_data.start_time},
                    End time: ${newUser.temp_data.end_time},
                    Avarage service time: ${newUser.temp_data.avg_service_time},
                `, {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Tasdiqlash', callback_data: 'noop' }, { text: 'Bekor qilish', callback_data: 'noop' }]
                    ]
                }
            });
            break;


    }




}

module.exports = { fillMasterObject }