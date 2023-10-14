import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ProtectedLayout from "./Components/ProtectedLayout";
import GuestLayout from "./Components/GuestLayout";
import Inicio from "./Components/estructura/Inicio";
import Agenda from "./Components/agenda/Agenda";
import Pacientes from "./Components/pacientes/Pacientes";
import Clinica from "./Components/clinica/Clinica";
import ConfigIndex from "./Components/configuracion/Index";
import Inventario from "./Components/stock/Inventario";
import Tienda from "./Components/tienda/Tienda";
import Cuentas from "./Components/cuentas/Cuentas";
import Paciente from "./Components/pacientes/paciente/Paciente";
import Estadisticas from "./Components/estadisticas/Estadisticas";
import { EditarPaciente } from "./Components/pacientes/EditarPaciente";
import FacturaServicioEdit from "./Components/cuentas/facturaServicio/FacturaServicioEdit";
import AgregarDetalleProducto from "./Components/stock/detalleProducto/AgregarDetalleProducto";
import UsoGabinete from "./Components/stock/usoGabinete/UsoGabinete";
import AgendaControlada from "./Components/agenda/AgendaControlada";
import EditarProductoVentaProductos from "./Components/stock/cuadroVentaProductos/EditarProductoVentaProductos";
import EditarDetalleUsoGabinete from "./Components/stock/usoGabinete/EditarDetalleUsoGabinete";
import EditarProveedor from "./Components/stock/proveedores/EditarProveedor";
import EditarArea from "./Components/configuracion/gabinetes/EditarArea";
import EditarConsultorio from "./Components/configuracion/gabinetes/EditarConsultorio";
import EditarTiposConsulta from "./Components/configuracion/tipoConsultas/EditarTiposConsulta";
import EditarEstadoCitas from "./Components/configuracion/estadoCitas/EditarEstadoCitas";
import EditarLicenciado from "./Components/configuracion/licenciados/EditarLicenciado";
import EditarServicio from "./Components/configuracion/servicios/EditarServicio";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/inicio",
        element: <Inicio />,
      },
      {
        path: "/agenda/:fecha/:area/:id",
        //element: <Agenda />,
        element: <AgendaControlada />,
      },
      {
        path: "/pacientes",
        element: <Pacientes />,
      },
      {
        path: "/editarPaciente/:id",
        element: <EditarPaciente />,
      },
      {
        path: "/clinica",
        element: <Clinica />,
      },
      {
        path: "/Configuracion",
        element: <ConfigIndex />,
      },
      {
        path: "/stock",
        element: <Inventario />,
      },
      {
        path: "/actualizar_producto/:id",
        element: <AgregarDetalleProducto />,
      },
      {
        path: "/actualizar_producto_uso/:id",
        element: <UsoGabinete />,
      },
      {
        path: "/actualizar_producto_venta/:id",
        element: <EditarProductoVentaProductos />,
      },
      {
        path: "/actualizar_producto_uso_gabinete/:id",
        element: <EditarDetalleUsoGabinete />,
      },
      {
        path: "/editar_proveedor/:id",
        element: <EditarProveedor />,
      },
      {
        path: "/tienda",
        element: <Tienda />,
      },
      {
        path: "/cuentas",
        element: <Cuentas />,
      },
      {
        path: "/editar_area/:id",
        element: <EditarArea />,
      },
      {
        path: "/editar_consultorio/:id",
        element: <EditarConsultorio />,
      },
      {
        path: "/editar_tipo_consulta/:id",
        element: <EditarTiposConsulta />,
      },
      {
        path: "/editar_estado_cita/:id",
        element: <EditarEstadoCitas />,
      },
      {
        path: "/editar_profesional/:id",
        element: <EditarLicenciado />,
      },
      {
        path: "/editar_servicio/:id",
        element: <EditarServicio />,
      },
      {
        path: "/factura_edit/:id",
        element: <FacturaServicioEdit />,
      },
      {
        path: "/paciente/:id",
        element: <Paciente />,
      },
      {
        path: "/estadisticas",
        element: <Estadisticas />,
      },
    ],
  },
]);

export default router;
