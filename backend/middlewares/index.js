const boom = require('@hapi/boom');

function boomErrorHandle(err, req, res, next){
    if(err.isBoom){
      const {output}=err;
      res.status(output.statusCode).json(output.payload);
    }
    next(err);
  }
module.exports={boomErrorHandle};