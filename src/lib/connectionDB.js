const mongoose = require('mongoose');
require('dotenv').config();

async function connectionDB(){
        await mongoose.connect(process.env.DB_URL);
        console.log("DB successfully connected!");
}
module.exports = connectionDB;