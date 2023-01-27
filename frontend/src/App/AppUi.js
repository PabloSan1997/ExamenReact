import React from "react";
import { AreaFormulario } from "../areaformulario";
import { AreaPreguntas } from "../areapreguntas";
import { Pcontexto } from "../ContextoPreguntas";
import { Modal } from "../model";

function AppUI() {
  const {mostrar}=React.useContext(Pcontexto);
  return (
    <React.Fragment>
      <AreaFormulario />
      <AreaPreguntas />
      {mostrar ?(<Modal/>):''}
    </React.Fragment>
  );
}

export { AppUI };
