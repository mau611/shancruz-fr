import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { enlace } from "../../../../scripts/Enlace";
import { useEffect } from "react";
import { useState } from "react";

const Descuentos = ({ descuentos }) => {
  const [servicios, setServicios] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getServicios();
    getProductos();
  }, []);
  const getServicios = async () => {
    const response = await axios.get(`${enlace}/servicios`);
    setServicios(response.data);
  };
  const getProductos = async () => {
    const response = await axios.get(`${enlace}/productos`);
    setProductos(response.data);
  };

  return (
    <>
      <Typography variant="h5">Descuentos de servicios</Typography>
      <div>
        {descuentos?.map((descuento) =>
          descuento.servicio === 1 ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ backgroundColor: "#155E30", color: "white" }}
              >
                <Typography>{descuento.descripcion}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  <li>
                    Servicio:{" "}
                    {
                      servicios.find(
                        (servicio) => servicio.id === descuento.serv_o_prod_id
                      ).servicio
                    }
                  </li>
                  <li>
                    Tipo descuento:{" "}
                    {descuento.porcentaje === 1
                      ? "Descuento de porcentaje"
                      : "Descuento con cambio de precio"}
                  </li>
                  <li>
                    {descuento.porcentaje === 1
                      ? descuento.cantidad_descuento + "% de descuento"
                      : "Cambio de precio: " +
                        descuento.cantidad_descuento +
                        "Bs"}
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>
          ) : (
            <></>
          )
        )}
      </div>
      <hr />
      <Typography variant="h5">Descuentos de productos</Typography>
      <div>
        {descuentos?.map((descuento) =>
          descuento.producto === 1 ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ backgroundColor: "#155E30", color: "white" }}
              >
                <Typography>{descuento.descripcion}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  <li>
                    Producto:{" "}
                    {
                      productos.find(
                        (producto) => producto.id === descuento.serv_o_prod_id
                      )?.Nombre
                    }
                  </li>
                  <li>
                    Tipo descuento:{" "}
                    {descuento.porcentaje === 1
                      ? "Descuento de porcentaje"
                      : "Descuento con cambio de precio"}
                  </li>
                  <li>
                    {descuento.porcentaje === 1
                      ? descuento.cantidad_descuento + "% de descuento"
                      : "Cambio de precio: " +
                        descuento.cantidad_descuento +
                        "Bs"}
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>
          ) : (
            <></>
          )
        )}
      </div>
    </>
  );
};

export default Descuentos;
