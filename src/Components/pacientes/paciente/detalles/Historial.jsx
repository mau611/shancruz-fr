import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Historial = ({ citas, diagnosticos }) => {
  console.log(citas);
  return (
    <div style={{ textAlign: "justify" }}>
      <h5>Historial</h5>
      <strong>Diagnostico Medico:</strong> <br />
      {diagnosticos?.map((diagnostico) => diagnostico.diagnostico + "; ")}
      <br />
      {citas?.map((cita) => (
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ backgroundColor: "#155E30", color: "white" }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    Paciente atendido en: {cita.consultorio.nombre} -{" "}
                    {cita.historias.length > 0
                      ? "Con Ficha"
                      : "La cita no cuenta con una historia"}{" "}
                    - {cita.tipo_consulta.nombre}
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: "right" }}>
                    Fecha:{" "}
                    {new Date("" + cita.start).toLocaleDateString("en-GB")}
                  </Grid>
                </Grid>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <strong>Detalle de consulta:</strong> {cita.title}
              <Typography>
                {cita.historias?.map((h) => (
                  <div>
                    <ul>
                      {[...new Map(Object.entries(JSON.parse(h.historia)))].map(
                        ([clave, valor]) => (
                          <li>
                            <strong>{clave}: </strong> {valor}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Historial;
