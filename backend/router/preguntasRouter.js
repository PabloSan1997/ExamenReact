const express = require("express");
const {
  agregarPregunta,
  agregarRespuesta,
  agregarEstado,
} = require("../esquemas/esquemapreguntas.js");
const { validatorHandle } = require("../esquemas/handleesquemas.js");
const { PreguntaServicio } = require("../servicios/servicioPreguntas.js");
const pregRouter = express.Router();
const servicio = new PreguntaServicio();
// ----------Solicitudes Get---------------------
pregRouter.get("/", async (req, res, next) => {
  try {
    const datos = await servicio.leer();
    res.json(datos);
  } catch (error) {
    next(error);
  }
});
pregRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const dato = await servicio.leerUno(id);
    res.json(dato);
  } catch (error) {
    next(error);
  }
});
// ------------------------------------------

// -------------------Solicitud POST-----------------
pregRouter.post(
  "/",
  validatorHandle(agregarPregunta, "body"),
  async (req, res, next) => {
    const cuerpo = req.body;
    try {
      const mandar = await servicio.agregar(cuerpo);
      res.status(201).json(mandar);
    } catch (error) {
      next(error);
    }
  }
);
//----------------------------------------------------

//-------------------------Delete-----------------------
pregRouter.delete("/", async (req, res, next) => {
  const direc = req.query.borrar;
  try {
    const borrar = await servicio.borrarTodo(direc);
    res.status(201).json(borrar);
  } catch (error) {
    next(error);
  }
});

pregRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const borrar = await servicio.borrarUno(id);
    res.status(201).json(borrar);
  } catch (error) {
    next(error);
  }
});

//---------------------------------------------------------

//---------patch-------------------------------
pregRouter.patch('/estado/:id',validatorHandle(agregarEstado, 'body'),async(req, res, next)=>{
  const {id}=req.params;
  const cuerpo = req.body;
  try {
      const cambiar = await servicio.cEstado(id, cuerpo);
      res.status(201).json(cambiar);
  } catch (error) {
    next(error);
  }
});
pregRouter.patch(
  "/:id",
  validatorHandle(agregarRespuesta, "body"),
  async (req, res, next) => {
    const { id } = req.params;
    const respuesta = req.body;
    try {
      const mandar = await servicio.editar(id, respuesta);
      res.status(201).json(mandar);
    } catch (error) {
      next(error);
    }
  }
);

//-----------------------------------------------
module.exports = { pregRouter };
