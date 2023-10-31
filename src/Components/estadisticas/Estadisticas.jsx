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

const Estadisticas = () => {
  return (
    <NavBar>
      <h4>Estadisticas</h4>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Asistencias</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Consultas</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Pacientes asignados</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">Referidos</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth">Consumo stock</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sixth">Ventas</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Asistencias />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Consultas />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <PacientesAsignados />
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">Referidos</Tab.Pane>
              <Tab.Pane eventKey="fifth">
                <ConsumoStock />
              </Tab.Pane>
              <Tab.Pane eventKey="sixth">
                <Ventas />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </NavBar>
  );
};

export default Estadisticas;
