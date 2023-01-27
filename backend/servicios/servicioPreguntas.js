const express=require('express');
const Boom=require('@hapi/boom');
const archivo = require('../archivo/preguntas.json');
const fs=require('fs');
class PreguntaServicio{
    constructor(){
        this.preguntas=archivo;
    }
    async leer(){
        if(this.preguntas.preguntitas.length===0){
            throw Boom.notFound('No se encontraron preguntas');
        }
        return this.preguntas.preguntitas;
    }
    async leerUno(numero){
        if(this.preguntas.preguntitas.length===0){
            throw Boom.notFound('No se encontró esa pregunta');
        }
        let indice = this.preguntas.preguntitas.findIndex(elemento=> elemento.id==numero);
        if(indice===-1){
            throw Boom.notFound("No existe la pregunta numero "+numero);
        }
       return this.preguntas.preguntitas[indice];
    }
    async agregar(cuerpo){
        let num;
        if(this.preguntas.preguntitas.length===0){
            num=1;
        }else{
            num=this.preguntas.preguntitas[this.preguntas.preguntitas.length-1].id+1;
        }
        let elemento={
            id:num,
            estado:false,
            ...cuerpo
        }
        this.preguntas.preguntitas.push(elemento);
        this.actuaizar(this.preguntas);
        return { message:'Elemento se agregó con exito'};
    }
    async borrarTodo(direc){
       if(direc!='si'){
        throw Boom.badData('no es posible borrar');
       }
       if(this.preguntas.preguntitas.length===0){
        throw Boom.notFound('No hay elementos a borrar');
       }
       this.preguntas.preguntitas=[];
       this.actuaizar(this.preguntas);
       return {message:'Todas las preguntas se borraron'}
    }

    async borrarUno(num){
        if(this.preguntas.preguntitas.length===0){
            throw Boom.notFound('No se encontró nungun elemento a borrar');
        }
        const indice=this.preguntas.preguntitas.findIndex(elemento=>elemento.id==num);
        if(indice===-1){
            throw Boom.notFound('No se encontró elemento con id: '+num);
        }
        this.preguntas.preguntitas.splice(indice, 1);
        this.actuaizar(this.preguntas);
        return {message:`Elemento ${num} borrado con exito`}
    }
    async editar(num, cuerpo){
        if(this.preguntas.preguntitas.length===0){
            throw Boom.notFound('No se encontró nungun elementos');
        }
        if(cuerpo.respuestas[0]===''){
            throw Boom.badRequest('No puedes mandar respuestas vacías');
        }
        const indice=this.preguntas.preguntitas.findIndex(elemento=>elemento.id==num);
        if(indice===-1){
            throw Boom.notFound('No se encontró elemento con id: '+num);
        }
        let objeto=this.preguntas.preguntitas[indice];
        let resp = objeto.respuestas;
        resp.push(cuerpo.respuestas[0]);
        let nuevo = {respuestas:resp}
        this.preguntas.preguntitas[indice]={
            ...objeto,
            ...nuevo
        }
        this.actuaizar(this.preguntas);
       return {message:'Respuesta agregada con exito'};
    }
    async cEstado(num, cuerpo){
        if(this.preguntas.preguntitas.length===0){
            throw Boom.notFound('No se encontró nungun elementos');
        }
        const indice=this.preguntas.preguntitas.findIndex(elemento=>elemento.id==num);
        if(indice===-1){
            throw Boom.notFound('No se encontró elemento con id: '+num);
        }
        this.preguntas.preguntitas[indice].estado=cuerpo.estado;
        this.actuaizar(this.preguntas);
        return {message:"Se cambio estado"}
    }
    async actuaizar(datos){
        fs.writeFile('./archivo/preguntas.json', JSON.stringify(datos),(error)=>{
            if(error){
                throw new Error('Hay un error');
            }
        });
    }
}
module.exports={PreguntaServicio}