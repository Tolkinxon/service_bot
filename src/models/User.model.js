const { Schema, model } = require('mongoose');
const { MASTER_REGISTER_STATE } = require('../config');

const userSchema = new Schema({
    chatId: {
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String, 
        required: true,
        default: 'none',
        enum: ['client', 'master', 'none', 'admin']
    },
    step: {
        type: String,
        default: MASTER_REGISTER_STATE.NONE
    },
    temp_data: {
        type: Object,
        default: {}
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model('users', userSchema);