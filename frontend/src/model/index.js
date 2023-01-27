import React from 'react';
import ReactDOM from 'react-dom';
import { Pcontexto } from '../ContextoPreguntas';
import "./index.css";
function Confirmado(){
    const {mostrar,  setMostrar, borrarTodo}=React.useContext(Pcontexto);
    return(
       <div className='ventana'>
         <div className='cuadro'>
            <p className='textito'>¿Seguro que desea borrar todo?</p>
            <div className='areas'>
                <button className='boton' onClick={borrarTodo}>Aceptar</button>
                <button className='boton' onClick={()=>setMostrar(false)}>Cancelar</button>
            </div>
        </div>
       </div>
    );
}


function Modal({children}){
    return ReactDOM.createPortal(
      <Confirmado/> ,
        document.getElementById('modal')
    );
}
export{Modal}