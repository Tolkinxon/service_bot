
const { Schema, model } = require("mongoose");


const masterSchema = new Schema({
    chatId: {
        type: Number,
        required: true,
        unique: true
    },
    full_name: { type: String, required: true },
    phone_number: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    service_name: { type: String },
    address: { type: String },
    location: {
        latitude: Number,
        longitude: Number,
    },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    avg_service_time: { type: Number, required: true },
    is_approved: { type: Boolean, default: false },
    rating: { type: Number, default: 0},
    rating_count: { type: Number, default: 0}
}, {
    versionKey: false,
    timestamps: true
});

module.exports = model("masters", masterSchema);
