import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import NavBar from "../../estructura/NavBar";
import DetallesPaciente from "./detalles/DetallesPaciente";
import Filiacion from "./detalles/Filiacion";
import Contabilidad from "./detalles/Contabilidad";
import Bonos from "./detalles/Bonos";
import Documentos from "./detalles/Documentos";
import Historial from "./detalles/Historial";
import { enlace } from "../../../scripts/Enlace.js";
import Descuentos from "./detalles/Descuentos.jsx";

const Paciente = () => {
  const { id, ubicacion } = useParams();
  const [paciente, setPaciente] = useState({});
  const [profesionales, setProfesionales] = React.useState({});
  const [profesionalesAsignados, setProfesionalesAsignados] = useState([]);
  const [medicosAsignados, setMedicosAsignados] = useState([]);
  const [key, setKey] = useState(ubicacion);

  useEffect(() => {
    getPaciente();
    getProfesionalACargo();
    getProfesionalesAsignados();
    getMedicosAsignados();
  }, []);

  const getProfesionalesAsignados = async () => {
    const response = await axios.get(`${enlace}/profesionales_pacientes/${id}`);
    setProfesionalesAsignados(response.data);
  };

  const getMedicosAsignados = async () => {
    const response = await axios.get(`${enlace}/medicos_pacientes/${id}`);
    setMedicosAsignados(response.data);
  };

  const getProfesionalACargo = async () => {
    const response = await axios.get(
      `${enlace}/paciente/profesionales/${paciente.id}`
    );
    setProfesionales(response.data);
  };

  const getPaciente = async () => {
    const response = await axios.get(`${enlace}/paciente/${id}`);
    setPaciente(response.data);
  };

  return (
    <NavBar>
      <h4>
        {paciente.nombres} {paciente.apellidos}
      </h4>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        //onSelect={(k) => setKey(k)}
        onSelect={(k) => (window.location.href = `/paciente/${id}/${k}`)}
        className="mb-3"
      >
        <Tab
          eventKey="paciente"
          title="Detalle del paciente"
          active={ubicacion == "paciente" ? true : false}
        >
          <DetallesPaciente
            diagnosticos={paciente.diagnosticos}
            paciente_id={paciente.id}
            profesionales={profesionalesAsignados}
            descuentos={paciente.descuentos}
            medicos={medicosAsignados}
          />
        </Tab>
        <Tab
          eventKey="filiacion"
          title="Filiacion"
          active={ubicacion == "filiacion" ? true : false}
        >
          <Filiacion
            id={paciente.id}
            nombres={paciente.nombres}
            apellidos={paciente.apellidos}
            ci={paciente.ci}
            telefono={paciente.telefono}
            sexo={paciente.sexo}
            direccion={paciente.direccion}
            fecha_nacimiento={paciente.fecha_nacimiento}
          />
        </Tab>
        <Tab
          eventKey="contabilidad"
          title="Contabilidad"
          active={ubicacion == "contabilidad" ? true : false}
        >
          <Contabilidad citas={paciente.citas} />
        </Tab>
        <Tab
          eventKey="bonos"
          title="Bonos"
          active={ubicacion == "bonos" ? true : false}
        >
          <Bonos bonos={paciente.bonos} />
        </Tab>
        <Tab
          eventKey="documentos"
          title="Documentos"
          active={ubicacion == "documentos" ? true : false}
        >
          <Documentos citas={paciente.citas} id={paciente.id} />
        </Tab>
        <Tab
          eventKey="historial"
          title="Historial Clinico"
          active={ubicacion == "historial" ? true : false}
        >
          <Historial
            citas={paciente.citas}
            diagnosticos={paciente.diagnosticos}
            profesionales={profesionales}
          />
        </Tab>
        <Tab
          eventKey="descuentos"
          title="Descuentos"
          active={ubicacion == "descuentos" ? true : false}
        >
          <Descuentos descuentos={paciente.descuentos} />
        </Tab>
      </Tabs>
    </NavBar>
  );
};

export default Paciente;
