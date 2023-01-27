import React from "react";
import { Proveedor } from "../ContextoPreguntas";
import { AppUI } from "./AppUi";

function App() {
  return (
    <Proveedor>
      <AppUI/>
    </Proveedor>
  );
}

export default App;
