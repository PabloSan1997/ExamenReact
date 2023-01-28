import React from "react";
import { Pcontexto } from "../ContextoPreguntas";
import "./index.css"
function AreaFormulario(){
    const{setEntrada1,setEntrada2,setEntrada3, enviarPregunta, agregarRespuesta, setMostrar, entrada2}=React.useContext(Pcontexto);
    function escribir1(event){
        setEntrada1(event.target.value);
    }
    function escribir2(event){
        setEntrada2(event.target.value);
    }
    function escribir3(event){
        setEntrada3(event.target.value);
    }
    function asegurar(){
        setMostrar(true);
    }
    return(
        <form onSubmit={(e)=>e.preventDefault()} className="formulario" onChange={escribir1}>
            <div className="fila">
                <label>Escriba su pregunta</label>
                <input className="entrada" id="entrada" placeholder="Pregunta"/>
            </div>
            <div className="areaboton">
                <input type="submit" className="boton" value="Agregar pregunta" onClick={enviarPregunta}/>
                <input type="submit" className="boton" value="Borrar Todo" onClick={asegurar}/>
                
            </div>
            <div className="fila fila2">
                <label>Agregar respuesta</label>
               <div className="area">
               <input className="entrada" id="num" placeholder="#" onChange={escribir2} value={entrada2}/>
                <input className="entrada" id="res" placeholder="Respuesta" onChange={escribir3}/>
               </div>
            </div>
            <div className="areaboton">
                <input type="submit" className="boton" value="Agregar respuesta" onClick={agregarRespuesta}/>
            </div>
        </form>
    );
}
export{AreaFormulario}