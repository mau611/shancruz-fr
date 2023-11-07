import React, { useEffect, useState } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import NavBar from "../estructura/NavBar";
import axios from "axios";
import { enlace } from "../../scripts/Enlace.js";
import { Button } from "@mui/material";
import * as FileServer from "file-saver";
import XLSX from "sheetjs-style";

const columnas = [
  { field: "id", headerName: "Historia", width: 70 },
  { field: "nombres", headerName: "Nombres", width: 200 },
  { field: "apellidos", headerName: "Apellidos", width: 200 },
  { field: "telefono", headerName: "Telefono", width: 130 },
  { field: "fecha_nacimiento", headerName: "Fecha de nacimiento", width: 160 },
  { field: "ci", headerName: "Carnet", width: 130 },
  { field: "sexo", headerName: "Sexo", width: 130 },
  { field: "direccion", headerName: "Direccion", width: 400 },
  { field: "referencia", headerName: "Como nos conocio?", width: 400 },
];

export const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  useEffect(() => {
    getPacientes();
  }, []);

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const getPacientes = async () => {
    const response = await axios.get(`${enlace}/pacientes`);
    setPacientes(response.data);
  };

  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  const exportarExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(pacientes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pacientes");
    var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    FileServer.saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      "pacientes.xlsx"
    );
  };

  return (
    <NavBar>
      <h1>Lista de Pacientes</h1>
      <br />
      <Button
        color="success"
        variant="contained"
        onClick={(e) => exportarExcel()}
      >
        Exportar pacientes
      </Button>
      <div style={{ height: 1000, width: "100%" }}>
        <DataGrid
          onRowClick={(e) =>
            window.open(`/paciente/${e.row.id}/paciente`, "_blank")
          }
          rows={pacientes}
          columns={columnas}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </NavBar>
  );
};

export default Pacientes;
