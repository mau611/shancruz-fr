import "react-big-calendar/lib/css/react-big-calendar.css";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "dayjs/locale/es";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import NavBar from "../estructura/NavBar";
import dayjs from "dayjs";
import { DateCalendar, LocalizationProvider, esES } from "@mui/x-date-pickers";
import { useParams } from "react-router-dom";
import Agenda from "./Agenda";
import { enlace } from "../../scripts/Enlace.js";

const AgendaControlada = () => {
  const { fecha, area, id } = useParams();
  const [valueCalendar, setValueCalendar] = useState(dayjs("" + fecha));
  const setFecha = (newValue) => {
    var yyyy = newValue.$y;
    var mm = newValue.$M + 1;
    var dd = newValue.$D;
    var fe = "" + yyyy + "-" + mm + "-" + dd;
    console.log(fecha, dayjs(fe));
    setValueCalendar(dayjs("" + fe));
    window.location = `/agenda/${fe}/${area}/${id}`;
  };

  const [areas, setAreas] = useState([]);

  const getAreas = async () => {
    const response = await axios.get(`${enlace}/areas`);
    setAreas(response.data);
  };

  useEffect(() => {
    getAreas();
  }, []);

  return (
    <NavBar>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs="auto" sm="auto" md="auto" sx={[{ zoom: "80%" }]}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DateCalendar
              value={valueCalendar}
              onChange={(newValue) => setFecha(newValue)}
            />
          </LocalizationProvider>
          {areas.map((area) => (
            <div>
              {" "}
              <Button
                sx={{
                  color: "#162B4E",
                  borderColor: "#162B4E",
                  ...(area.id == id && {
                    color: "white",
                    backgroundColor: "#162B4E",
                  }),
                }}
                onClick={() =>
                  (window.location = `/agenda/${fecha}/${area.nombre}/${area.id}`)
                }
              >
                {area.nombre}
              </Button>
              <br />
            </div>
          ))}
        </Grid>
        <Grid item xs="auto" sm="9" md="9">
          <Agenda
            fecha={fecha}
            valueCalendar={valueCalendar}
            area={area}
            areaId={id}
          />
        </Grid>
      </Grid>
    </NavBar>
  );
};

export default AgendaControlada;
