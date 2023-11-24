import React from "react";
import NavBar from "../estructura/NavBar";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Asistencias from "./menus/Asistencias";
import Consultas from "./menus/Consultas";
import { Ventas } from "./menus/Ventas";
import { PacientesAsignados } from "./menus/PacientesAsignados";
import { ConsumoStock } from "./menus/ConsumoStock";
import Areas from "./menus/Areas";
import { Referidos } from "./menus/Referidos";
import DescuentosServicios from "./menus/DescuentosServicios";
import DescuentosProductos from "./menus/DescuentosProductos";

const Estadisticas = () => {
  return (
    <NavBar>
      <h4>Estadisticas</h4>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Areas</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Asistencias</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Consultas</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">Pacientes asignados</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth">Medico tratante</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sixth">Consumo stock</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="seventh">Ventas</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="eigth">Descuentos Servicios</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ninth">Descuentos Productos</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Areas />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Asistencias />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <Consultas />
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <PacientesAsignados />
              </Tab.Pane>
              <Tab.Pane eventKey="fifth">
                <Referidos />
              </Tab.Pane>
              <Tab.Pane eventKey="sixth">
                <ConsumoStock />
              </Tab.Pane>
              <Tab.Pane eventKey="seventh">
                <Ventas />
              </Tab.Pane>
              <Tab.Pane eventKey="eigth">
                <DescuentosServicios />
              </Tab.Pane>
              <Tab.Pane eventKey="ninth">
                <DescuentosProductos />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </NavBar>
  );
};

export default Estadisticas;
