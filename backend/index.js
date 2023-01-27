const express = require('express');
const app = express();
const cors = require('cors');
const { crearApi } = require('./router');
const { boomErrorHandle } = require('./middlewares');
const PUERTO = 4120;
app.use(cors());
app.use(express.json());

crearApi(app);
app.use(boomErrorHandle);
app.get('/', (req, res)=>{
    res.json({mensaje:'Bienvenido a mi server :)'});
});
app.listen(PUERTO);

