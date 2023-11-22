import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/css/react-big-calendar.css";
import Accordion from "react-bootstrap/Accordion";
import ButtonB from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

import moment from "moment";

import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import TodayIcon from "@mui/icons-material/Today";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { enlace } from "../../scripts/Enlace.js";
require("globalize/lib/cultures/globalize.culture.es");
const DragAndDropCalendar = withDragAndDrop(Calendar);

const dias = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const cultures = ["en", "en-GB", "es", "fr", "ar-AE"];
const lang = {
  en: null,
  "en-GB": null,
  es: {
    week: "Semana",
    work_week: "Semana de trabajo",
    day: "Día",
    month: "Mes",
    previous: "Atrás",
    next: "Adelante",
    today: "Hoy",
    agenda: "Lista de citas",
    noEventsInRange: "No existen citas en este intervalo.",

    showMore: (total) => `+${total} más`,
  },
  fr: {
    week: "La semaine",
    work_week: "Semaine de travail",
    day: "Jour",
    month: "Mois",
    previous: "Antérieur",
    next: "Prochain",
    today: `Aujourd'hui`,
    agenda: "Ordre du jour",

    showMore: (total) => `+${total} plus`,
  },
  "ar-AE": {
    week: "أسبوع",
    work_week: "أسبوع العمل",
    day: "يوم",
    month: "شهر",
    previous: "سابق",
    next: "التالي",
    today: "اليوم",
    agenda: "جدول أعمال",

    showMore: (total) => `+${total} إضافي`,
  },
};

const Agenda = ({ fecha, valueCalendar, area, areaId }) => {
  const [culture, setCulture] = useState("es");
  const [gabinetes, setGabinetes] = useState([]);
  const [myEvents, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [tipoConsultas, setTipoConsultas] = useState([]);
  const [estadoCitas, setEstadoCitas] = useState([]);
  const [paciente, setPaciente] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");
  const [estadoCita, setEstadoCita] = useState("1 -  Por llegar");
  const [detalleTratamiento, setDetalleTratamiento] = useState("");
  const [detalleEvento, setDetalleEvento] = useState("");
  const dataFetchedRef = useRef(false);
  const [openDetallePaciente, setOpenDetallePaciente] = useState(false);
  const [auxPaciente, setAuxPaciente] = useState({});
  const [auxFacturas, setAuxFacturas] = useState([]);
  const [auxEstado, setAuxEstado] = useState({});
  const [auxTratamiento, setAuxTratamiento] = useState("");
  const [auxTelefono, setAuxTelefono] = useState("");
  const [cobroTratamientos, setCobroTratamientos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [cobro, setCobro] = useState(0);
  const [estadoPago, setEstadoPago] = useState("");
  const [detallesPago, setDetallesPago] = useState("");
  const [tipoDePago, setTipoDePago] = useState("");
  const [selectEventId, setSelectEventId] = useState(0);
  const [profesionales, setProfesionales] = useState([]);
  const [profesionalId, setProfesionalId] = useState("");
  const [numerosTarjeta, setNumerosTarjeta] = useState(null);
  const [pagoTarjeta, setPagoTarjeta] = useState(true);
  const [ultimosPagos, setUltimosPagos] = useState([]);
  //variables creacion pacientes
  const [state, setState] = React.useState({
    nombres: "",
    apellidos: "",
    telefono: "",
    fecha_nacimiento: "",
    ci: "",
    sexo: "",
    direccion: "",
    referencia: "",
  });
  const [nombresError, setNombresError] = React.useState(null);
  const [apellidosError, setApellidosError] = React.useState(null);
  const [telefonoError, setTelefonoError] = React.useState(null);
  const [nacimientoError, setNacimientoError] = React.useState(null);
  const [ciError, setCiError] = React.useState(null);
  const [sexoError, setSexoError] = React.useState(null);
  const [direccionError, setDireccionError] = React.useState(null);
  const [referenciaError, setReferenciaError] = React.useState(null);

  //variables de bonos
  const [nombreBono, setNombreBono] = useState("");
  const [sesionesBono, setSesionesBono] = useState(0);
  const [costoBono, setCostoBono] = useState(0);
  //variables de errores
  const [pacienteError, setPacienteError] = useState("");
  const [tipoConsultaError, setTipoConsultaError] = useState("");
  const [detallesError, setDetallesError] = useState("");
  const [estadoCitaError, setEstadoCitaError] = useState("");
  const [agendadoPorError, setAgendadoPorError] = useState("");
  //variables cobros con descuentos
  const [descuentos, setDescuentos] = useState([]);
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);

  const setValoresBono = (value, variable) => {
    if (variable == "nombreBono") {
      setNombreBono(value);
    } else if (variable == "sesionesBono") {
      setSesionesBono(value);
    } else if (variable == "costoBono") {
      setCostoBono(value);
    }
  };

  const crearBono = async () => {
    await axios.post(`${enlace}/bono`, {
      nombre: nombreBono,
      sesiones: sesionesBono,
      precio: costoBono,
      restantes: sesionesBono,
      paciente_id: auxPaciente.id,
    });
    handleCloseDetallePaciente();
    getEventosBD();
  };

  const consumirBono = async (bonoId) => {
    await axios.put(`${enlace}/descontarBono/${bonoId}`, {
      bono_id: bonoId,
      consulta_id: selectEventId,
    });
    handleCloseDetallePaciente();
    getEventosBD();
  };
  //fin bono

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...(event.estado.estado === "Por llegar" && {
        style: {
          backgroundColor: "#8fbc91",
        },
      }),
      ...(event.estado.estado === "En espera" && {
        style: {
          backgroundColor: "#f1ec7a",
          color: "#2a2a2a",
        },
      }),
      ...(event.estado.estado === "En consulta" && {
        style: {
          backgroundColor: "#f6a7b8",
          color: "#2a2a2a",
        },
      }),
      ...(event.estado.estado === "Finalizada" && {
        style: {
          backgroundColor: "#1d4d9f",
        },
      }),
      ...(event.estado.estado === "No asistencia" && {
        style: {
          background:
            "repeating-linear-gradient(45deg,#6991c7,#a3bded 1%,#6991c7 10%)",
          color: "#2a2a2a",
        },
      }),
      ...(event.estado.estado === "Reprogramada" && {
        style: {
          backgroundColor: "#f08838",
          color: "#2a2a2a",
        },
      }),
    }),
    []
  );

  const navigate = useNavigate();
  const clickRef = useRef(null);

  const handleChange = (value, name) => {
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const borrarCita = async () => {
    await axios.delete(`${enlace}/consulta/${selectEventId}`);
    handleCloseDetallePaciente();
    getEventosBD();
  };

  const handleClickOpen = (detallesEvento) => {
    setDetalleEvento(detallesEvento);
    setOpen(true);
  };
  const handleClickOpenDetallePaciente = (
    pacienteEvento,
    eventoId,
    estado,
    facturas,
    tratamiento,
    telefono
  ) => {
    setSelectEventId(eventoId);
    getPacienteCita(pacienteEvento);
    setOpenDetallePaciente(true);
    setAuxEstado(estado);
    setAuxFacturas(facturas);
    setAuxTratamiento(tratamiento);
    setAuxTelefono(telefono);
    getUltimasFacturas(pacienteEvento.id);
    setDescuentos(pacienteEvento.descuentos);
  };

  const getUltimasFacturas = async (pacId) => {
    const response = await axios.get(`${enlace}/ultimasFacturas/${pacId}`);
    setUltimosPagos(response.data);
  };

  const cambiarEstadoCita = async (estadoId) => {
    await axios.put(`${enlace}/consulta/${selectEventId}/${estadoId}`, {
      eId: estadoId,
    });
    getEventosBD();
  };

  const handleCloseDetallePaciente = () => {
    setOpenDetallePaciente(false);
    setAuxPaciente({});
    setCobroTratamientos([]);
    setCobro(0);
    setEstadoPago("");
    setDetallesPago("");
    setTipoDePago("");
    setSelectEventId(0);
    setPagoTarjeta(true);
    setNumerosTarjeta(null);
    setAuxTratamiento("");
    setAuxTelefono("");
    setUltimosPagos([]);
    setDescuentos([]);
  };

  const getPacienteCita = (paciente) => {
    setAuxPaciente(paciente);
  };

  const handleClose = () => {
    setPaciente("");
    setTipoConsulta("");
    setEstadoCita("1 -  Por llegar");
    setDetalleTratamiento("");
    setDetalleEvento("");
    setAuxPaciente([]);
    setCobroTratamientos([]);
    setOpen(false);
    setProfesionalId("");
    setAuxFacturas([]);
    setPacienteError("");
    setTipoConsultaError("");
    setDetallesError("");
    setEstadoCitaError("");
    setAgendadoPorError("");
    setTabAgendar(0);
    setNombresError("");
    setApellidosError("");
    setTelefonoError("");
    setNacimientoError("");
    setCiError("");
    setSexoError("");
    setDireccionError("");
    setReferenciaError("");
    setState({
      nombres: "",
      apellidos: "",
      telefono: "",
      fecha_nacimiento: "",
      ci: "",
      sexo: "",
      direccion: "",
      referencia: "",
    });
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    const auxDescuentos = [];
    descuentos.map(function (desc) {
      if (desc.servicio == 1 && desc.activo == 1) {
        auxDescuentos.push(desc);
      }
    });
    var valor = 0;
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
        // eslint-disable-next-line no-loop-func, array-callback-return
        servicios.map((serv) => {
          // eslint-disable-next-line eqeqeq
          if (serv.id == options[i].value) {
            const aux = auxDescuentos.find(
              (auxDesc) => auxDesc.serv_o_prod_id === serv.id
            );
            if (aux === undefined) {
              valor = valor + serv.costo;
            } else {
              if (aux.porcentaje == 0) {
                valor = valor + aux.cantidad_descuento;
              } else if (aux.porcentaje == 1) {
                valor =
                  valor +
                  (serv.costo - serv.costo * (aux.cantidad_descuento / 100));
              }
              setDescuentoAplicado(true);
            }
          }
        });
      }
    }
    setCobroTratamientos(value);
    setCobro(valor);
  };

  const getGabinetes = async () => {
    const response = await axios.get(`${enlace}/consultoriosArea/${areaId}`);
    setGabinetes(response.data);
  };
  const getTipoConsultas = async () => {
    const response = await axios.get(`${enlace}/tipoConsultas`);
    setTipoConsultas(response.data);
  };
  const getPacientes = async () => {
    const response = await axios.get(`${enlace}/pacientes`);
    setPacientes(response.data);
  };
  const getEstadoCitas = async () => {
    const response = await axios.get(`${enlace}/estadoCitas`);
    setEstadoCitas(response.data);
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getGabinetes();
    getPacientes();
    getTipoConsultas();
    getEstadoCitas();
    getEventosBD();
    getServicios();
    getProfesionales();
    window.clearTimeout(clickRef?.current);
  }, []);

  const getProfesionales = async () => {
    const response = await axios.get(`${enlace}/profesionales`);
    setProfesionales(response.data);
  };

  const getServicios = async () => {
    const response = await axios.get(`${enlace}/servicios`);
    setServicios(response.data);
  };
  const getEventosBD = async () => {
    setEvents([]);
    const response = await axios.get(`${enlace}/consultas_por_dia/${fecha}`);
    response.data.map((ev) => {
      let nombre = setearNombreEvento(ev);
      setEvents((prev) => [
        ...prev,
        {
          start: new Date(ev.start),
          end: new Date(ev.end),
          title: ev.tipo_consulta.nombre + ": " + nombre,
          resourceId: ev.consultorio_id,
          paciente: ev.paciente,
          evId: ev.id,
          facturas: ev.facturas,
          estado: ev.estado_cita,
          tratamiento: ev.title,
          telefono: ev.paciente.telefono,
        },
      ]);
    });
  };

  const setearNombreEvento = (ev) => {
    let aux = "";
    if (ev.facturas.length != 0) {
      aux = "$. " + ev.paciente.nombres + " " + ev.paciente.apellidos;
    } else {
      aux = ev.paciente.nombres + " " + ev.paciente.apellidos;
    }
    return aux;
  };

  const localizer = momentLocalizer(moment);
  const handleSelectSlot = useCallback(
    ({ start, end, title, resourceId, facturas }) => {
      handleClickOpen({ start, end, resourceId, facturas });
    }
  );

  const { defaultDate, scrollToTime, messages } = useMemo(
    () => ({
      defaultDate: new Date(valueCalendar),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  const onSelectEvent = useCallback((calEvent) => {
    /**
     * Here we are waiting 250 milliseconds (use what you want) prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    handleClickOpenDetallePaciente(
      calEvent.paciente,
      calEvent.evId,
      calEvent.estado,
      calEvent.facturas,
      calEvent.tratamiento,
      calEvent.telefono
    );
  }, []);

  const realizarCobro = async () => {
    await axios.post(`${enlace}/factura`, {
      total: cobro,
      estado_pago: estadoPago,
      forma_pago: tipoDePago,
      detalles_pago: descuentoAplicado
        ? "Se aplico un descuento asociado. " + detallesPago
        : detallesPago,
      consulta_id: selectEventId,
      tratamientos: cobroTratamientos,
      digitos_tarjeta: numerosTarjeta,
    });
    handleCloseDetallePaciente();
    getEventosBD();
  };

  const handleGuardar = async () => {
    if (tabAgendar == 1) {
      try {
        const p = "" + paciente;
        const tc = "" + tipoConsulta;
        const ec = "" + estadoCita;
        const pi = "" + profesionalId;
        const resp = await axios.post(`${enlace}/consulta_paciente`, {
          nombres: state.nombres,
          apellidos: state.apellidos,
          telefono: state.telefono,
          fecha_nacimiento: state.fecha_nacimiento,
          ci: state.ci,
          sexo: state.sexo,
          direccion: state.direccion,
          referencia: state.referencia,
          fecha_registro:
            new Date().getFullYear() +
            "/" +
            (new Date().getMonth() + 1) +
            "/" +
            new Date().getDate(),
          title: "" + detalleTratamiento,
          start: "" + new Date(detalleEvento.start).toISOString(),
          end: "" + new Date(detalleEvento.end).toISOString(),
          estado: estadoCita,
          id: detalleEvento.resourceId,
          tipoConsulta_id: tc.split(" ")[0],
          estadoConsulta_id: ec.split(" ")[0],
          profesional_id: pi.split(" ")[0],
        });
        handleClose();
        getPacientes();
        getEventosBD();
      } catch (error) {
        if (error.response.status === 422) {
          if (error.response.data.errors.nombres) {
            setNombresError(error.response.data.errors.nombres[0]);
          } else {
            setNombresError("");
          }
          if (error.response.data.errors.apellidos) {
            setApellidosError(error.response.data.errors.apellidos[0]);
          } else {
            setApellidosError("");
          }
          if (error.response.data.errors.telefono) {
            setTelefonoError(error.response.data.errors.telefono[0]);
          } else {
            setTelefonoError("");
          }
          if (error.response.data.errors.fecha_nacimiento) {
            setNacimientoError(error.response.data.errors.fecha_nacimiento[0]);
          } else {
            setNacimientoError("");
          }
          if (error.response.data.errors.ci) {
            setCiError(error.response.data.errors.ci[0]);
          } else {
            setCiError("");
          }
          if (error.response.data.errors.sexo) {
            setSexoError(error.response.data.errors.sexo[0]);
          } else {
            setSexoError("");
          }
          if (error.response.data.errors.direccion) {
            setDireccionError(error.response.data.errors.direccion[0]);
          } else {
            setDireccionError("");
          }
          if (error.response.data.errors.referencia) {
            setReferenciaError(error.response.data.errors.referencia[0]);
          } else {
            setReferenciaError("");
          }
          if (error.response.data.errors.tipoConsulta_id) {
            setTipoConsultaError(error.response.data.errors.tipoConsulta_id[0]);
          } else {
            setTipoConsultaError("");
          }
          if (error.response.data.errors.title) {
            setDetallesError(error.response.data.errors.title[0]);
          } else {
            setDetallesError("");
          }
          if (error.response.data.errors.estadoConsulta_id) {
            setEstadoCitaError(error.response.data.errors.estadoConsulta_id[0]);
          } else {
            setEstadoCitaError("");
          }
          if (error.response.data.errors.profesional_id) {
            setAgendadoPorError(error.response.data.errors.profesional_id[0]);
          } else {
            setAgendadoPorError("");
          }
        }
      }
    } else {
      const p = "" + paciente;
      const tc = "" + tipoConsulta;
      const ec = "" + estadoCita;
      const pi = "" + profesionalId;
      try {
        await axios.post(`${enlace}/consulta`, {
          title: "" + detalleTratamiento,
          start: "" + new Date(detalleEvento.start).toISOString(),
          end: "" + new Date(detalleEvento.end).toISOString(),
          estado: estadoCita,
          id: detalleEvento.resourceId,
          paciente_id: p.split(" ")[0],
          tipoConsulta_id: tc.split(" ")[0],
          estadoConsulta_id: ec.split(" ")[0],
          profesional_id: pi.split(" ")[0],
        });
        handleClose();
        getEventosBD();
      } catch (error) {
        if (error.response.status === 422) {
          if (error.response.data.errors.paciente_id) {
            setPacienteError(error.response.data.errors.paciente_id[0]);
          } else {
            setPacienteError("");
          }
          if (error.response.data.errors.tipoConsulta_id) {
            setTipoConsultaError(error.response.data.errors.tipoConsulta_id[0]);
          } else {
            setTipoConsultaError("");
          }
          if (error.response.data.errors.title) {
            setDetallesError(error.response.data.errors.title[0]);
          } else {
            setDetallesError("");
          }
          if (error.response.data.errors.estadoConsulta_id) {
            setEstadoCitaError(error.response.data.errors.estadoConsulta_id[0]);
          } else {
            setEstadoCitaError("");
          }
          if (error.response.data.errors.profesional_id) {
            setAgendadoPorError(error.response.data.errors.profesional_id[0]);
          } else {
            setAgendadoPorError("");
          }
        }
      }
    }
  };

  const resizeEvent = useCallback(({ event, start, end }) => {}, []);
  const modificarEvento = async ({ event, start, end, resourceId }) => {
    await axios.put(`${enlace}/consulta/${event.evId}`, {
      start: "" + new Date(start).toISOString(),
      end: "" + new Date(end).toISOString(),
      resourceId: resourceId,
    });
    getEventosBD();
  };
  const moveEvent = useCallback(({ event, start, end, resourceId }) => {
    if (event.estado_cita == "Por llegar") {
      modificarEvento({ event, start, end, resourceId });
    } else {
      window.alert("No es posible modificar la cita");
    }
  }, []);

  const [tabAgendar, setTabAgendar] = React.useState(0);

  const handleChangeTabAgendar = (event, newValue) => {
    setPacienteError("");
    setTipoConsultaError("");
    setDetallesError("");
    setEstadoCitaError("");
    setAgendadoPorError("");
    setNombresError("");
    setApellidosError("");
    setTelefonoError("");
    setNacimientoError("");
    setCiError("");
    setSexoError("");
    setDireccionError("");
    setReferenciaError("");
    setTabAgendar(newValue);
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item xs="auto" sm="4" md="4">
          <Button
            variant="outlined"
            startIcon={<TodayIcon />}
            sx={{ color: "#155E30", borderColor: "#155E30" }}
            onClick={() =>
              (window.location = `/agenda/${
                new Date().getFullYear() +
                "-" +
                (new Date().getMonth() + 1) +
                "-" +
                new Date().getDate()
              }/${area}/${areaId}`)
            }
          >
            Hoy
          </Button>
        </Grid>
        <Grid item xs="auto" sm="4" md="4" className="text-center">
          <h1>{dias[new Date("" + fecha + "GMT-4").getDay()]}</h1>
        </Grid>
        <Grid item xs="auto" sm="4" md="4"></Grid>
      </Grid>
      <DragAndDropCalendar
        views={{
          month: false,
          week: false,
          day: true,
          agenda: true,
          action: false,
          navigate: false,
        }}
        toolbar={false}
        dayLayoutAlgorithm={"no-overlap"}
        min={new Date(2010, 0, 1, 8, 0, 0, 0)}
        max={new Date(0, 0, 1, 21, 0, 0, 0)}
        step={60}
        messages={messages}
        culture={culture}
        resourceTitleAccessor={"nombre"}
        resources={gabinetes}
        events={myEvents}
        defaultDate={defaultDate}
        defaultView={Views.DAY}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
        onSelectEvent={onSelectEvent}
        style={{ height: 1500, width: "100%" }}
        eventPropGetter={eventPropGetter}
        onEventDrop={moveEvent}
        selectable
        popup
        resourceIdAccessor="id"
        timeslots={1}
      />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle style={{ backgroundColor: "#155E30", color: "white" }}>
          {"Agendar cita"}
        </DialogTitle>
        <DialogContent>
          <Tabs
            value={tabAgendar}
            onChange={handleChangeTabAgendar}
            aria-label="icon position tabs example"
          >
            <Tab
              icon={<PermContactCalendarIcon />}
              iconPosition="start"
              label="Paciente existente"
              {...a11yProps(0)}
            />
            <Tab
              icon={<PersonAddAlt1Icon />}
              iconPosition="start"
              label="Nuevo paciente"
              {...a11yProps(1)}
            />
          </Tabs>
          <CustomTabPanel value={tabAgendar} index={0}>
            <Autocomplete
              required
              freeSolo
              id="pacientes"
              value={paciente}
              onChange={(e, value) => setPaciente(value)}
              disableClearable
              options={pacientes.map(
                (option) =>
                  option.id +
                  " -  " +
                  option.nombres +
                  " " +
                  option.apellidos +
                  " - " +
                  option.telefono
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Paciente"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
            {pacienteError && (
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  color: "#DC2626",
                }}
              >
                {pacienteError}
              </p>
            )}
            <br />
            <Autocomplete
              required
              freeSolo
              id="TipoConsulta"
              value={tipoConsulta}
              onChange={(e, value) => setTipoConsulta(value)}
              disableClearable
              options={tipoConsultas.map(
                (option) => option.id + " -  " + option.nombre
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tipo consulta"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
            {tipoConsultaError && (
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  color: "#DC2626",
                }}
              >
                {tipoConsultaError}
              </p>
            )}
            <br />
            <TextField
              required
              onChange={(e) => setDetalleTratamiento(e.target.value)}
              value={detalleTratamiento}
              id="detallesTratamiento"
              name="detalles"
              label="Procedimiento a realizar"
              multiline
              fullWidth
            />
            {detallesError && (
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  color: "#DC2626",
                }}
              >
                {detallesError}
              </p>
            )}
            <br />
            <br />
            <Autocomplete
              required
              freeSolo
              id="estadoCita"
              value={estadoCita}
              onChange={(e, value) => setEstadoCita(value)}
              disableClearable
              options={estadoCitas.map(
                (option) => option.id + " -  " + option.estado
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Estado de la cita"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
            {estadoCitaError && (
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  color: "#DC2626",
                }}
              >
                {estadoCitaError}
              </p>
            )}
            <br />
            <Autocomplete
              required
              freeSolo
              id="agendadoPor"
              value={profesionalId}
              onChange={(e, value) => setProfesionalId(value)}
              disableClearable
              options={profesionales.map(
                (option) => option.id + " -  " + option.nombre
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Agendado por:"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
            {agendadoPorError && (
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  color: "#DC2626",
                }}
              >
                {agendadoPorError}
              </p>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={tabAgendar} index={1}>
            <Box sx={{ flexGrow: 0, marginTop: -5 }}>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    helperText={nombresError}
                    error={nombresError ? true : false}
                    autoFocus
                    margin="dense"
                    id="nombres"
                    name="nombres"
                    label="Nombres"
                    type="text"
                    fullWidth
                    required
                    variant="standard"
                    onChange={(e) => handleChange(e.target.value, "nombres")}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    helperText={apellidosError}
                    error={apellidosError ? true : false}
                    autoFocus
                    margin="dense"
                    id="apellidos"
                    name="apellidos"
                    label="Apellidos"
                    type="text"
                    fullWidth
                    required
                    variant="standard"
                    onChange={(e) => handleChange(e.target.value, "apellidos")}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    helperText={telefonoError}
                    error={telefonoError ? true : false}
                    autoFocus
                    margin="dense"
                    id="telefono"
                    name="telefono"
                    label="telefono"
                    type="text"
                    fullWidth
                    required
                    variant="standard"
                    onChange={(e) => handleChange(e.target.value, "telefono")}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    helperText={nacimientoError}
                    error={nacimientoError ? true : false}
                    label="fecha de nacimiento"
                    autoFocus
                    margin="dense"
                    id="fecha_nacimiento"
                    name="fecha_nacimiento"
                    type="date"
                    className="date"
                    fullWidth
                    required
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                      handleChange(e.target.value, "fecha_nacimiento")
                    }
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    helperText={ciError}
                    error={ciError ? true : false}
                    autoFocus
                    margin="dense"
                    id="ci"
                    name="ci"
                    label="Carnet de Identidad"
                    type="text"
                    fullWidth
                    required
                    variant="standard"
                    onChange={(e) => handleChange(e.target.value, "ci")}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    helperText={sexoError}
                    error={sexoError ? true : false}
                    id="sexo"
                    type={"select"}
                    fullWidth
                    select
                    label="Sexo"
                    value={state.sexo}
                    onChange={(e) => handleChange(e.target.value, "sexo")}
                  >
                    <MenuItem value={"masculino"}>Masculino</MenuItem>
                    <MenuItem value={"femenino"}>Femenino</MenuItem>
                  </TextField>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    helperText={direccionError}
                    error={direccionError ? true : false}
                    autoFocus
                    margin="dense"
                    id="direccion"
                    name="direccion"
                    label="Direccion"
                    type="text"
                    fullWidth
                    required
                    variant="standard"
                    onChange={(e) => handleChange(e.target.value, "direccion")}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    helperText={referenciaError}
                    error={referenciaError ? true : false}
                    autoFocus
                    margin="dense"
                    id="referencia"
                    name="referencia"
                    label="Como nos conoció"
                    type="text"
                    fullWidth
                    required
                    variant="standard"
                    onChange={(e) => handleChange(e.target.value, "referencia")}
                  />
                </Grid>
              </Grid>
            </Box>
            <hr />
            <Autocomplete
              required
              freeSolo
              id="TipoConsulta"
              value={tipoConsulta}
              onChange={(e, value) => setTipoConsulta(value)}
              disableClearable
              options={tipoConsultas.map(
                (option) => option.id + " -  " + option.nombre
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tipo consulta"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
            {tipoConsultaError && (
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  color: "#DC2626",
                }}
              >
                {tipoConsultaError}
              </p>
            )}
            <br />
            <TextField
              required
              onChange={(e) => setDetalleTratamiento(e.target.value)}
              value={detalleTratamiento}
              id="detallesTratamiento"
              name="detalles"
              label="Procedimiento a realizar"
              multiline
              fullWidth
            />
            {detallesError && (
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  color: "#DC2626",
                }}
              >
                {detallesError}
              </p>
            )}
            <br />
            <br />
            <Autocomplete
              required
              freeSolo
              id="estadoCita"
              value={estadoCita}
              onChange={(e, value) => setEstadoCita(value)}
              disableClearable
              options={estadoCitas.map(
                (option) => option.id + " -  " + option.estado
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Estado de la cita"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
            {estadoCitaError && (
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  color: "#DC2626",
                }}
              >
                {estadoCitaError}
              </p>
            )}
            <br />
            <Autocomplete
              required
              freeSolo
              id="agendadoPor"
              value={profesionalId}
              onChange={(e, value) => setProfesionalId(value)}
              disableClearable
              options={profesionales.map(
                (option) => option.id + " -  " + option.nombre
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Agendado por:"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
            {agendadoPorError && (
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  color: "#DC2626",
                }}
              >
                {agendadoPorError}
              </p>
            )}
          </CustomTabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleGuardar}>Guardar Cita</Button>
        </DialogActions>
      </Dialog>
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={openDetallePaciente}
          onClose={handleCloseDetallePaciente}
        >
          <DialogTitle>
            <Container>
              <Row>
                <Col xs={9}>
                  <a
                    href={`/paciente/${auxPaciente.id}/paciente`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {auxPaciente.nombres} {auxPaciente.apellidos}
                  </a>
                  <p style={{ fontSize: 15 }}>
                    Detalle de cita: {auxTratamiento} <br />
                    Telefono: {auxTelefono}
                  </p>
                </Col>
                <Col xs={3}>
                  <ButtonB
                    variant="danger"
                    style={{ width: "100px", fontSize: 12 }}
                    onClick={() => borrarCita()}
                  >
                    Eliminar Cita
                  </ButtonB>
                </Col>
              </Row>
            </Container>

            <hr />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Estado cita:
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="estado"
                value={auxEstado.id}
                onChange={(e) => cambiarEstadoCita(e.target.value)}
              >
                {estadoCitas.map((option) => (
                  <MenuItem value={option.id}>{option.estado}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogTitle>
          <DialogContent>
            <Accordion style={{ width: "500px" }}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Cobrar Servicio</Accordion.Header>
                <Accordion.Body>
                  <br />
                  <FormControl
                    fullWidth={true}
                    sx={{ m: 1, minWidth: 120, maxWidth: 400 }}
                  >
                    <InputLabel shrink htmlFor="select-multiple-native">
                      Servicios
                    </InputLabel>
                    <Select
                      multiple
                      native
                      value={cobroTratamientos}
                      onChange={handleChangeMultiple}
                      label="Servicios"
                      inputProps={{
                        id: "select-multiple-native",
                      }}
                    >
                      {servicios.map((servicio) => (
                        <option key={servicio.id} value={servicio.id}>
                          {servicio.servicio}
                        </option>
                      ))}
                    </Select>
                    <br />
                    <div>
                      <TextField
                        disabled
                        id="outlined-basic"
                        label="Costo de la Sesion"
                        variant="outlined"
                        style={{ width: 100 }}
                        value={cobro}
                      />
                      <FormControl style={{ width: 200 }}>
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
                      <br />
                      <FormControl fullWidth style={{ paddingTop: 10 }}>
                        <InputLabel id="forma-pago">Tipo de Pago</InputLabel>
                        <Select
                          labelId="forma-pago"
                          id="forma-pago"
                          label="Tipo Pago"
                          value={tipoDePago}
                          onChange={(e) => {
                            setTipoDePago(e.target.value);
                            e.target.value == "Tarjeta"
                              ? setPagoTarjeta(false)
                              : setPagoTarjeta(true);
                          }}
                        >
                          <MenuItem value={"Efectivo"}>Efectivo</MenuItem>
                          <MenuItem value={"Transferencia"}>
                            Transferencia
                          </MenuItem>
                          <MenuItem value={"Qr"}>Pago Qr</MenuItem>
                          <MenuItem value={"Tarjeta"}>Tarjeta</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          hidden={pagoTarjeta}
                          value={numerosTarjeta}
                          id="numTarjeta"
                          label="4 ultimos digitos de la tarjeta"
                          onChange={(e) => setNumerosTarjeta(e.target.value)}
                          fullWidth
                        />
                      </FormControl>
                      <TextField
                        value={detallesPago}
                        id="detalles-pago"
                        label="Detalles del pago"
                        onChange={(e) => setDetallesPago(e.target.value)}
                        fullWidth
                      />

                      <IconButton
                        aria-label="add to favorites"
                        onClick={realizarCobro}
                      >
                        <PriceCheckIcon />
                        Realizar cobro
                      </IconButton>
                    </div>
                  </FormControl>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Bonos</Accordion.Header>
                <Accordion.Body>
                  <br />
                  <div>
                    {auxPaciente.bonos == undefined ? (
                      "nada"
                    ) : (
                      <Container>
                        Sesiones paciente:
                        {auxPaciente.bonos.map((bono) => (
                          <Row>
                            <Col>
                              {bono.nombre} x{bono.sesiones}
                            </Col>
                            <Col>Restantes: {bono.restantes}</Col>
                            {bono.restantes > 0 ? (
                              <Col>
                                <ButtonB
                                  style={{ width: "70%" }}
                                  size="sm"
                                  variant="link"
                                  onClick={() => consumirBono(bono.id)}
                                >
                                  Consumir
                                </ButtonB>
                              </Col>
                            ) : (
                              <Col>
                                <ButtonB
                                  style={{ width: "100%" }}
                                  size="sm"
                                  variant="outline-secondary"
                                  disabled
                                >
                                  Bono consumido
                                </ButtonB>
                              </Col>
                            )}
                            <hr />
                          </Row>
                        ))}
                      </Container>
                    )}
                    <br />
                  </div>
                  <div>
                    <Select
                      labelId="Nombre"
                      id="nombre"
                      variant="outlined"
                      style={{ width: 200 }}
                      value={nombreBono}
                      label="Nombre"
                      onChange={(e) =>
                        setValoresBono(e.target.value, "nombreBono")
                      }
                    >
                      <MenuItem value={"Paquete post quirurgico"}>
                        Paquete post quirurgico
                      </MenuItem>
                      <MenuItem value={"Sesiones"}>Sesiones</MenuItem>
                      <MenuItem value={"Pago adelantado"}>
                        Pago adelantado
                      </MenuItem>
                    </Select>
                    <TextField
                      id="outlined-basic"
                      label="Sesiones"
                      type={"number"}
                      variant="outlined"
                      style={{ width: 110 }}
                      value={sesionesBono}
                      onChange={(e) =>
                        setValoresBono(e.target.value, "sesionesBono")
                      }
                    />
                    <TextField
                      id="outlined-basic"
                      label="Monto"
                      variant="outlined"
                      style={{ width: 100 }}
                      value={costoBono}
                      onChange={(e) =>
                        setValoresBono(e.target.value, "costoBono")
                      }
                    />
                    <IconButton aria-label="add to favorites">
                      <PriceCheckIcon onClick={crearBono} />
                    </IconButton>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Cobros de la cita</Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Factura No (Ver)</th>
                        <th>Total</th>
                        <th>Estado pago</th>
                        <th>Detalles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auxFacturas.map((factura) => (
                        <tr>
                          <td>
                            <Link to={`/factura_edit/${factura.id}`}>
                              {factura.numero}
                            </Link>
                          </td>
                          <td>{factura.total} Bs</td>
                          <td>{factura.estado_pago}</td>
                          <td>{factura.detalles_pago}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Historial de pagos</Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Factura No (Ver)</th>
                        <th>Total</th>
                        <th>Fecha</th>
                        <th>Detalles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ultimosPagos.map((factura) => (
                        <tr>
                          <td>
                            <Link to={`/factura_edit/${factura.id}`}>
                              {factura.numero}
                            </Link>
                          </td>
                          <td>{factura.total} Bs</td>
                          <td>{factura.fecha}</td>
                          <td>{factura.detalles_pago}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetallePaciente}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  );
};

export default Agenda;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
