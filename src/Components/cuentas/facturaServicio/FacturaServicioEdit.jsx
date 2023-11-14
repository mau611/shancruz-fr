import React, { useEffect, useState } from "react";
import NavBar from "../../estructura/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { enlace } from "../../../scripts/Enlace";
import {
  Button,
  Select,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const FacturaServicioEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [factura, setFactura] = useState({});
  const [servicios, setServicios] = useState([]);
  const [paciente, setPaciente] = useState({});
  const [estadoPago, setEstadoPago] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const [detallePago, setDetallePago] = useState("");
  const [formData, setFormData] = useState({
    concepto: "",
    cantidad: "",
    precio: "",
  });

  const [itemsConceptos, setItemsConceptos] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChange2 = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      precio: servicios.find((servicio) => servicio.servicio === value).costo,
    });
  };
  const formaPagoChange = (event) => {
    const { name, value } = event.target;
    setFormaPago(value);
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
    const newItem = {
      concepto: formData.concepto,
      cantidad: formData.cantidad,
      precio: formData.precio,
    };
    setItemsConceptos([...itemsConceptos, newItem]);
    setFormData({ concepto: "", cantidad: "", precio: "" });
  };

  const handleDeleteItem = (index) => {
    const actualizarConcepto = [...itemsConceptos];
    actualizarConcepto.splice(index, 1);
    setItemsConceptos(actualizarConcepto);
  };
  useEffect(() => {
    getFactura();
    getServicios();
  }, []);

  const getServicios = async () => {
    const response = await axios.get(`${enlace}/servicios`);
    setServicios(response.data);
  };

  const getFactura = async () => {
    const response = await axios.get(`${enlace}/factura/${id}`);
    setFactura(response.data);
    setPaciente(response.data["consulta"].paciente);
    var aux = [];
    response.data["conceptos"].map((c) => {
      aux.push({
        concepto: c.nombre,
        cantidad: c.cantidad,
        precio: c.precio,
      });
    });
    setItemsConceptos(aux);
    setFormaPago(response.data.forma_pago);
    setEstadoPago(response.data.estado_pago);
    setDetallePago(response.data.detalles_pago);
  };
  const obtenerTotal = () => {
    var total = 0;
    itemsConceptos.map((item) => {
      total = total + item.cantidad * item.precio;
    });
    return total;
  };
  const handleSubmit = async () => {
    try {
      await axios.put(`${enlace}/factura/${factura.id}`, {
        conceptos: itemsConceptos,
        total: obtenerTotal(),
        estado_pago: estadoPago,
        forma_pago: formaPago,
        detalles_pago: detallePago,
      });
      navigate(-1);
    } catch (error) {
      window.alert("hubo un error");
    }
  };

  return (
    <NavBar>
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Formulario de Factura
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="nombre-form"
                label="Nombre del paciente"
                disabled
                fullWidth
                value={paciente.nombres + " " + paciente.apellidos}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Fecha de la factura"
                fullWidth
                disabled
                value={factura.fecha}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Factura Nro:"
                fullWidth
                type="number"
                value={factura.numero}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Conceptos
              </Typography>
              <hr />
            </Grid>
            <Grid item xs={12}>
              <Container>
                <Paper elevation={3} style={{ padding: "20px" }}>
                  <form>
                    <FormControl sx={{ width: "25%" }}>
                      <InputLabel id="demo-simple-select-label">
                        Concepto
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.concepto}
                        label="Concepto"
                        name="concepto"
                        onChange={handleChange2}
                      >
                        {servicios.map((servicio) => (
                          <MenuItem key={servicio.id} value={servicio.servicio}>
                            {servicio.servicio}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      label="Cantidad"
                      name="cantidad"
                      value={formData.cantidad}
                      onChange={handleChange}
                    />
                    <TextField
                      label="Precio"
                      name="precio"
                      value={formData.precio}
                      onChange={handleChange}
                      disabled
                    />
                    <hr />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit2}
                    >
                      Agregar Concepto
                    </Button>
                  </form>
                  <List>
                    {itemsConceptos.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`${item.concepto} - Cantidad: ${item.cantidad} - Precio: ${item.precio}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteItem(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                  <p>
                    <strong style={{ fontSize: 18 }}>Total:</strong>{" "}
                    {obtenerTotal()}
                  </p>
                </Paper>
              </Container>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Estado Pago
              </Typography>
              <hr />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="estado-pago">Estado Pago</InputLabel>
                <Select
                  labelId="estado-pago"
                  id="estado-pago"
                  label="Age"
                  value={estadoPago}
                  onChange={(e) => setEstadoPago(e.target.value)}
                >
                  <MenuItem value={"pagado"}>Pagado</MenuItem>
                  <MenuItem value={"no pagado"}>No pagado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="forma-pago">Forma de pago</InputLabel>
                <Select
                  labelId="forma-pago"
                  id="forma-pago"
                  label="Forma de Pago"
                  value={formaPago}
                  onChange={formaPagoChange}
                >
                  <MenuItem value={"Efectivo"}>Efectivo</MenuItem>
                  <MenuItem value={"Transferencia"}>Transferencia</MenuItem>
                  <MenuItem value={"Qr"}>Pago Qr</MenuItem>
                  <MenuItem value={"Tarjeta"}>Tarjeta</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                fullWidth
                value={detallePago}
                onChange={(e) => setDetallePago(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Guardar Factura
              </Button>
            </Grid>
          </Grid>
          <hr />
          <Button
            variant="contained"
            color="warning"
            type="submit"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
        </Paper>
      </Container>
    </NavBar>
  );
};

export default FacturaServicioEdit;
