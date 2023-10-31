import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NavBar from "../estructura/NavBar";
import CrearGabinetes from "../configuracion/gabinetes/CrearGabinetes";
import CrearTipoConsulta from "./tipoConsultas/CrearTipoConsultas";
import CrearEstadoCita from "./estadoCitas/CrearEstadoCita";
import Licenciados from "./licenciados/Licenciados";
import Servicios from "./servicios/Servicios";
import ImportarDatos from "./importarDatos/ImportarDatos";
import Areas from "./gabinetes/Areas";
import FichasClinicas from "./fichasClinicas/FichasClinicas";
import { useParams } from "react-router-dom";
import { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Index = () => {
  const { ubicacion } = useParams();
  const theme = useTheme();
  const [value, setValue] = useState(
    ubicacion == "areas"
      ? 0
      : ubicacion == "gabinetes"
      ? 1
      : ubicacion == "tipo_consultas"
      ? 2
      : ubicacion == "estado_citas"
      ? 3
      : ubicacion == "licenciados"
      ? 4
      : ubicacion == "servicios"
      ? 5
      : ubicacion == "fichas"
      ? 6
      : ubicacion == "importar_datos"
      ? 7
      : ""
  );

  const handleChange = (event, newValue) => {
    if (newValue == 0) {
      window.location.href = `/configuracion/areas`;
    } else if (newValue == 1) {
      window.location.href = `/configuracion/gabinetes`;
    } else if (newValue == 2) {
      window.location.href = `/configuracion/tipo_consultas`;
    } else if (newValue == 3) {
      window.location.href = `/configuracion/estado_citas`;
    } else if (newValue == 4) {
      window.location.href = `/configuracion/licenciados`;
    } else if (newValue == 5) {
      window.location.href = `/configuracion/servicios`;
    } else if (newValue == 6) {
      window.location.href = `/configuracion/fichas`;
    } else if (newValue == 7) {
      window.location.href = `/configuracion/importar_datos`;
    }
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <NavBar>
      <h1>Configuracion</h1>
      <hr />
      <Box sx={{ flexGrow: 1, bgcolor: "background.paper" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="inherit"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            style={{ backgroundColor: "#155E30" }}
          >
            <Tab label="Areas" {...a11yProps(0)} />
            <Tab label="Gabinetes" {...a11yProps(1)} />
            <Tab label="Tipos de Consulta" {...a11yProps(2)} />
            <Tab label="Estado Citas" {...a11yProps(3)} />
            <Tab label="Licenciados de turno" {...a11yProps(4)} />
            <Tab label="Servicios" {...a11yProps(5)} />
            <Tab label="Fichas Clinicas" {...a11yProps(6)} />
            <Tab label="Importacion de datos" {...a11yProps(7)} />
          </Tabs>
        </AppBar>
        <div>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Areas />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <CrearGabinetes />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <CrearTipoConsulta />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <CrearEstadoCita />
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            <Licenciados />
          </TabPanel>
          <TabPanel value={value} index={5} dir={theme.direction}>
            <Servicios />
          </TabPanel>
          <TabPanel value={value} index={6} dir={theme.direction}>
            <FichasClinicas />
          </TabPanel>
          <TabPanel value={value} index={7} dir={theme.direction}>
            <ImportarDatos />
          </TabPanel>
        </div>
      </Box>
    </NavBar>
  );
};

export default Index;
