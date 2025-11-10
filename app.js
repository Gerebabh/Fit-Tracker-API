//opp.js

require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose"); 
const atletaRouter = require('./routes/atletaRouter'); 
const treinoRouter = require('./routes/treinoRouter'); 
const authRouter = require('./routes/authRouter'); 
const apiDocsRouter = require('./routes/apidocs');
const cors = require('cors');


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
app.use(cors());


// 1. ROTA DE STATUS (Deve vir antes das rotas específicas)
app.get('/', (req, res) => {
    res.status(200).json({
        service: "Fit-Tracker API",
        status: "Online",
        version: "1.0.0",
        documentation: "/api-docs"
    });
});

app.use('/atletas', atletaRouter); 
app.use('/treinos', treinoRouter); 
app.use('/auth', authRouter);

app.use('/api-docs', apiDocsRouter);

module.exports = app;

