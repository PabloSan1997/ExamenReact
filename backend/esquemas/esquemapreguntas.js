const Joi = require("joi");
const express = require('express');

const pregunta = Joi.string().min(1);
const respuesta = Joi.array().min(0).max(1);

const agregarPregunta=Joi.object(
    {
        preg:pregunta.required(),
        respuestas:respuesta.required()
    }
);
const respuesta2 = Joi.array().min(1).max(1);
const agregarRespuesta=Joi.object(
    {
        respuestas:respuesta2.required()
    }
);
const mira = Joi.bool();
const agregarEstado=Joi.object(
    {
        estado:mira.required()
    }
);
module.exports={agregarPregunta, agregarRespuesta, agregarEstado}