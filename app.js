//opp.js

require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose"); 

const userRouter = require('./routes/userRouter')

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASWD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}`;
mongoose.connect(url)
.then(() => console.log("Conectado do MongoDB"))
.catch((err) => {
        console.log("Erro ao concetar no MongoDB", err.message);
        process.exit(1);
    }
);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use ('/users', userRouter)

module.exports = app;

