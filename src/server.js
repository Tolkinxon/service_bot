const express = require('express');
const mongoose = require('mongoose');
const connectionDB = require('./lib/connectionDB');
require('dotenv').config();

const app = express();
app.use(express.json());

connectionDB().catch((err)=>{
    console.log(err);
    process.exit(1);
})

require('./bot/bot');

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server running on PORT = ${PORT}`))