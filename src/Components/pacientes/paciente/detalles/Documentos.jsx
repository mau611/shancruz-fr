import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useState } from "react";
import axios from "axios";
import { enlace } from "../../../../scripts/Enlace";
import { Link, useNavigate } from "react-router-dom";

const Documentos = ({ citas, id }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openMultiple, setOpenMultiple] = useState(false);
  const [citaId, setCitaId] = useState(null);
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [imageURL, setImageURL] = useState("");
  console.log(citas);

  const handleClickOpen = (idCita, tipoD) => {
    console.log(citas);
    setOpen(true);
    setCitaId(idCita);
    setTipoDocumento(tipoD);
  };

  const handleClose = () => {
    setOpen(false);
    setCitaId(null);
    setTipoDocumento("");
  };

  const handleClickOpenMultiple = (idCita) => {
    setOpenMultiple(true);
    setCitaId(idCita);
  };

  const handleCloseMultiple = () => {
    setOpenMultiple(false);
    setCitaId(null);
  };

  const handleFileUpload = async (event) => {
    try {
      await axios.post(
        `${enlace}/${tipoDocumento}/${id}`,
        {
          img: event.target.files[0],
          consulta_id: citaId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Archivo seleccionado:", event.target.files[0]);
      setOpen(false);
      setCitaId(null);
      setTipoDocumento("");
      navigate(0);
    } catch (error) {
      window.alert("hubo un error");
      console.log(error);
    }
  };

  const handleFileUploadMultiple = async (event) => {
    const images = event.target.files;
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images[]", images[i]);
    }
    // Aquí puedes manejar la lógica de subir el archivo
    // Puedes acceder al archivo seleccionado usando event.target.files[0]
    try {
      await axios.post(
        `${enlace}/fotos_control/${id}`,
        {
          images: event.target.files,
          consulta_id: citaId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Archivo seleccionado:", event.target.files[0]);
      setOpenMultiple(false);
      setCitaId(null);
      navigate(0);
    } catch (error) {
      window.alert("hubo un error");
      console.log(error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Documentos</Typography>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha Cita</th>
            <th>Indicaciones medicas</th>
            <th>Fotos de control</th>
            <th>Examenes medicos</th>
            <th>Consentimientos informados</th>
            <th>Otros</th>
          </tr>
        </thead>
        <tbody>
          {citas?.map((cita) => (
            <tr>
              <td>{new Date("" + cita.start).toLocaleDateString("en-GB")}</td>
              <td>
                {cita.indicaciones_medicas?.map((indicacion) => (
                  <>
                    <Link
                      to={`/archivo/${indicacion.nombre}/indicaciones_medicas/${id}`}
                      target="_blank"
                    >
                      {indicacion.nombre}
                    </Link>
                    <br />
                  </>
                ))}
                <Tooltip title="Agregar nueva indicacion medica">
                  <IconButton
                    color="primary"
                    aria-label="Agregar nueva indicacion medica"
                    onClick={() =>
                      handleClickOpen(cita.id, "indicaciones_medicas")
                    }
                  >
                    <AddAPhotoIcon />
                  </IconButton>
                </Tooltip>
              </td>
              <td>
                {cita.fotos_control?.map((foto) => (
                  <>
                    <Link
                      to={`/archivo/${foto.nombre}/fotos_control/${id}`}
                      target="_blank"
                    >
                      {foto.nombre}
                    </Link>
                    <br />
                  </>
                ))}
                <Tooltip title="Agregar fotos de control">
                  <IconButton
                    color="primary"
                    aria-label="Agregar fotos de control"
                    onClick={() => handleClickOpenMultiple(cita.id)}
                  >
                    <AddAPhotoIcon />
                  </IconButton>
                </Tooltip>
              </td>
              <td>
                {cita.examenes_medicos?.map((examen) => (
                  <>
                    <Link
                      to={`/archivo/${examen.nombre}/examenes_medicos/${id}`}
                      target="_blank"
                    >
                      {examen.nombre}
                    </Link>
                    <br />
                  </>
                ))}
                <Tooltip title="Agregar examen medico">
                  <IconButton
                    color="primary"
                    aria-label="Agregar examen medico"
                    onClick={() => handleClickOpen(cita.id, "examenes_medicos")}
                  >
                    <AddAPhotoIcon />
                  </IconButton>
                </Tooltip>
              </td>
              <td>
                {cita.consentimientos_informados?.map((consentimiento) => (
                  <>
                    <Link
                      to={`/archivo/${consentimiento.nombre}/consentimientos_informados/${id}`}
                      target="_blank"
                    >
                      {consentimiento.nombre}
                    </Link>
                  </>
                ))}
                <Tooltip title="Agregar un consentimiento informado">
                  <IconButton
                    color="primary"
                    aria-label="Agregar un consentimiento informado"
                    onClick={() =>
                      handleClickOpen(cita.id, "consentimientos_informados")
                    }
                  >
                    <NoteAddIcon />
                  </IconButton>
                </Tooltip>
              </td>
              <td>
                {cita.documentos?.map((documento) => (
                  <Link
                    to={`/archivo/${documento.nombre}/otros_documentos/${id}`}
                    target="_blank"
                  >
                    {documento.nombre}
                  </Link>
                ))}
                <Tooltip title="Agregar otro archivo">
                  <IconButton
                    color="primary"
                    aria-label="Agregar otro archivo"
                    onClick={() => handleClickOpen(cita.id, "otros_documentos")}
                  >
                    <AddAPhotoIcon />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Agregar Archivo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Selecciona un archivo para agregar.
            </DialogContentText>
            <input
              type="file"
              accept=".pdf, .docx, .xlsx, image/*"
              onChange={handleFileUpload}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog open={openMultiple} onClose={handleCloseMultiple}>
          <DialogTitle>
            Seleccione una o mas fotos de control para la sesion
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Selecciona uno o varios archivos.
            </DialogContentText>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUploadMultiple}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMultiple}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Documentos;
