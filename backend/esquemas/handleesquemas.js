const boom = require('@hapi/boom');

function validatorHandle(schema, propierty){
  return (req, res ,next)=>{
    const data = req[propierty];
    const {error} = schema.validate(data);
    if(error){
      next(boom.badRequest(error));
    }
    next();
  }
}
module.exports={validatorHandle};