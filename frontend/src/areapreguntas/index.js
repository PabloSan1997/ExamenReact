import React from "react";
import { Pcontexto } from "../ContextoPreguntas";
import "./index.css"
function AreaPreguntas() {
  const { datos } = React.useContext(Pcontexto);
  return (
    <div className="contenedor">
      <h1 className="titulo">Examen</h1>
      {(datos.statusCode === 404 && (
        <p className="mensaje">{datos.message}</p>
      )) ||
        (datos == 3 && (
          <p className="mensaje">Problemas con conectar con el servidor</p>
        )) ||
        (datos === 2 && <p className="mensaje">Cargando...</p>)}

        {(datos!=2 && datos!=3 && datos.statusCode!=404)?
          datos.map((elemento) => (
            <Filas
              key={elemento.id}
              preguntas={elemento.preg}
              respuestas={elemento.respuestas}
              numero={elemento.id}
              estado={elemento.estado}
            />
          ))
        
        :''}
    </div>
  );
}
function Filas(props) {
  let mira = 0;
  const {estadoPregunta, borrarUno}=React.useContext(Pcontexto);
  function cambiar(){
    estadoPregunta(props.numero,!props.estado);
  }
  function borrar(){
    borrarUno(props.numero);
  }

  return (
    <div className={props.estado?'filaP rojo':'filaP'}>
      <div className="caja cajaP">
        <p className="Pregunta">{`${props.numero}.- ${props.preguntas}`}</p>
        <div className="areaboton2">
        <button className="boton" onClick={cambiar}>{props.estado?'Bien':'Mal'}</button>
        <button className="boton" onClick={borrar}>X</button>
        </div>
      </div>
      <div className="caja cajaR">
        {props.respuestas.length > 0 &&
          props.respuestas.map((elemento) => {
            mira++;
            return <p key={mira}>{elemento}</p>;
          })}
      </div>
    </div>
  );
}

export { AreaPreguntas };
