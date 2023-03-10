import React from "react";

const Pcontexto = React.createContext();

function useLlamar(){
    const [datoss, setDatoss]=React.useState(2);
    React.useEffect(
       ()=>{
        (async function(){
            try{
                const archivo = await fetch('http://localhost:4120/api/v1/preguntas');
                const texto = await archivo.json();
                setDatoss(texto);
            }catch(err){
                setDatoss(3);
            }
        })();
       }
        ,[]);
        return {datoss};
}


function Proveedor(props){
    const {datoss}=useLlamar();
    const [entrada1, setEntrada1]=React.useState('');
    const [entrada2, setEntrada2]=React.useState('');
    const [entrada3, setEntrada3]=React.useState('');
    const [mostrar, setMostrar]=React.useState(false);
    const [datos, setdatos] =React.useState(datoss);
    
    async function enviarPregunta(){
        try{
            let soliditud = {
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(
                    {
                        preg:!entrada1?'':entrada1,
                        respuestas:[]
                    }
                )
            }
            const mandar = await fetch('http://localhost:4120/api/v1/preguntas', soliditud);
            const estados = await mandar.json();
            if(estados.statusCode===400){
                throw estados.message
            }
            alert(estados.message);
            window.location.reload();
        }
        catch(error){
            alert(error);
        }
    }
async function agregarRespuesta(){
    try {
        const soliditud = {
            method:"PATCH",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(
                {
                    respuestas:[entrada3]
                }
            )
        }
        const enviar = await fetch(`http://localhost:4120/api/v1/preguntas/${entrada2}`,soliditud);
        const estados = await enviar.json();
        if(estados.statusCode===404 || estados.statusCode===400){
            throw estados.message;
        }
        window.location.reload();
    } catch (error) {
        alert(error);
    }
}
async function borrarTodo(){
    try {
        const soliditud = {
            method:"DELETE",
            headers:{'Content-Type':'application/json'},
        }
        const enviar = await fetch('http://localhost:4120/api/v1/preguntas?borrar=si', soliditud);
        const estados = await enviar.json();
        if(estados.statusCode===404){
            throw estados.message;
        }
        window.location.reload();
    } catch (error) {
        alert(error);
    }
}
async function estadoPregunta(num, ver){
    try {
        const soliditud = {
            method:"PATCH",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(
                {
                   estado:ver
                }
            )
        }
        const enviar = await fetch(`http://localhost:4120/api/v1/preguntas/estado/${num}`,soliditud);
        const estados = await enviar.json();
        if(estados.statusCode===404 || estados.statusCode===400){
            throw estados.message;
        }
        window.location.reload();
    } catch (error) {
        alert(error);
    }
}
async function borrarUno(num){
    try {
        const soliditud = {
            method:"DELETE",
            headers:{'Content-Type':'application/json'},
        }
        const enviar = await fetch(`http://localhost:4120/api/v1/preguntas/${num}`, soliditud);
        const estados = await enviar.json();
        if(estados.statusCode===404){
            throw estados.message;
        }
        alert(estados.message);
        window.location.reload();
    } catch (error) {
        alert(error);
    }
}

React.useEffect(
    ()=>{
        if(datoss!=2 && datoss!=3 && datoss.statusCode!=404){
            if(entrada2===''){
                setdatos(datoss);
            }
            else if(datoss.message!=404){
                let nose = datoss;
                let indice = nose.findIndex(elemento=>elemento.id==entrada2);
                if(indice===-1){
                    setdatos(nose);
                }else{
                    setdatos([nose[indice]]);
                }
            }
        }else{
            setdatos(datoss);
        }
        
    }
    ,[entrada2, datoss, datoss.statusCode]);
    return (
        <Pcontexto.Provider
        value={{
            datos,
            entrada1,
            entrada2,
            entrada3,
            setEntrada1,
            setEntrada2,
            setEntrada3,
            enviarPregunta,
            agregarRespuesta,
            borrarTodo,
            estadoPregunta,
            borrarUno,
            mostrar, 
            setMostrar,
            datoss
        }}
        >
            {props.children}
        </Pcontexto.Provider>
    );
}
export{
    Proveedor,
    Pcontexto
}