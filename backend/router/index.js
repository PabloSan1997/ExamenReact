const express = require('express');
const direc1 = express.Router();
const { pregRouter } = require('./preguntasRouter.js');

function crearApi(app){
    app.use('/api/v1' ,direc1);
    direc1.use('/preguntas', pregRouter);
}
module.exports={crearApi};