import "./App.css";
import Inicio from "./Components/estructura/Inicio";
import Agenda from "./Components/agenda/Agenda";
import Pacientes from "./Components/pacientes/Pacientes";
import Clinica from "./Components/clinica/Clinica";
import ConfigIndex from "./Components/configuracion/Index";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inventario from "./Components/stock/Inventario";
import Tienda from "./Components/tienda/Tienda";
import Cuentas from "./Components/cuentas/Cuentas";
import Paciente from "./Components/pacientes/paciente/Paciente";
import Estadisticas from "./Components/estadisticas/Estadisticas";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/clinica" element={<Clinica />} />
          <Route path="/configuracion" element={<ConfigIndex />} />
          <Route path="/stock" element={<Inventario />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/cuentas" element={<Cuentas />} />
          <Route path="/paciente/:id" element={<Paciente />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
