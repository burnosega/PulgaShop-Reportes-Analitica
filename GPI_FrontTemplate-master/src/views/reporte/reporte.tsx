import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Paper,
  Divider,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Papa from "papaparse";

// --- Definiciones y Datos Iniciales ---

interface Venta {
  id: number;
  fecha: string; // Usamos YYYY-MM-DD para facilitar la comparación
  producto: string;
  cantidad: number;
  precio: number;
  total: number;
}

const productosDisponibles = [
  "Laptop",
  "Mouse",
  "Teclado",
  "Monitor",
  "Impresora",
];

const ventasIniciales: Venta[] = [
  { id: 1, fecha: "2025-10-10", producto: "Laptop", cantidad: 2, precio: 800, total: 1600 },
  { id: 2, fecha: "2025-10-11", producto: "Mouse", cantidad: 5, precio: 20, total: 100 },
  { id: 3, fecha: "2025-10-12", producto: "Teclado", cantidad: 3, precio: 50, total: 150 },
  { id: 4, fecha: "2025-10-15", producto: "Monitor", cantidad: 1, precio: 200, total: 200 },
  { id: 5, fecha: "2025-10-16", producto: "Impresora", cantidad: 1, precio: 300, total: 300 },
  { id: 6, fecha: "2025-10-17", producto: "Laptop", cantidad: 1, precio: 800, total: 800 },
  { id: 7, fecha: "2025-10-18", producto: "Mouse", cantidad: 10, precio: 20, total: 200 },
];

// --- Columnas para el DataGrid ---

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "fecha", headerName: "Fecha", width: 130 },
  { field: "producto", headerName: "Producto", width: 150 },
  { field: "cantidad", headerName: "Cantidad", width: 100, type: "number" },
  { field: "precio", headerName: "Precio", width: 100, type: "number" },
  { field: "total", headerName: "Total", width: 120, type: "number" },
];

// --- Componente React ---

const ReporteVentas: React.FC = () => {
  // Estado para la lista *completa* de ventas (podría venir de una API)
  const [ventas] = useState<Venta[]>(ventasIniciales);
  
  // ✅ NUEVO: Estado para la lista *filtrada* que se mostrará en la tabla
  const [ventasFiltradas, setVentasFiltradas] = useState<Venta[]>(ventas);

  // Estados para los valores de los filtros
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [producto, setProducto] = useState("");

  // ✅ NUEVO: useEffect para aplicar los filtros
  // Se ejecuta cada vez que cambia la lista maestra (ventas) o uno de los filtros
  useEffect(() => {
    let dataFiltrada = [...ventas];

    // 1. Filtrar por producto
    if (producto) {
      dataFiltrada = dataFiltrada.filter((v) => v.producto === producto);
    }

    // 2. Filtrar por fecha de inicio
    // (Compara strings en formato YYYY-MM-DD, que es seguro)
    if (fechaInicio) {
      dataFiltrada = dataFiltrada.filter((v) => v.fecha >= fechaInicio);
    }

    // 3. Filtrar por fecha de fin
    if (fechaFin) {
      dataFiltrada = dataFiltrada.filter((v) => v.fecha <= fechaFin);
    }

    // 4. Actualizar el estado de las ventas filtradas
    setVentasFiltradas(dataFiltrada);
    
  }, [fechaInicio, fechaFin, producto, ventas]);

  // ✅ NUEVO: Función para limpiar los filtros
  const limpiarFiltros = () => {
    setFechaInicio("");
    setFechaFin("");
    setProducto("");
    // setVentasFiltradas(ventas) // Opcional, el useEffect ya lo hará
  };

  // ✅ MODIFICADO: Exportar solo los datos filtrados
  const exportarCSV = () => {
    // Usamos 'ventasFiltradas' en lugar de 'ventas'
    const csv = Papa.unparse(ventasFiltradas);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reporte_ventas.csv";
    a.click();
    URL.revokeObjectURL(url); // Limpiar
  };

  return (
    <Box sx={{ p: 4, maxWidth: 900, margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
         Reporte de Ventas
      </Typography>

      {/* Filtros */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filtros
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
          <TextField
            label="Desde"
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />
          <TextField
            label="Hasta"
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />
          <TextField
            select
            label="Producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="">
              <em>Todos los productos</em>
            </MenuItem>
            {productosDisponibles.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ flexGrow: 1 }} /> {/* Espaciador */}

          {/* ✅ NUEVO: Botón para limpiar filtros */}
          <Button variant="outlined" color="secondary" onClick={limpiarFiltros}>
            Limpiar
          </Button>

          <Button variant="contained" onClick={exportarCSV}>
            Exportar CSV
          </Button>
        </Box>
      </Paper>

      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Resultados ({ventasFiltradas.length})
      </Typography>

      {/* Tabla */}
      <Paper sx={{ height: 420, width: "100%" }}>
        <DataGrid
          // ✅ MODIFICADO: Usar 'ventasFiltradas'
          rows={ventasFiltradas}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          pagination
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
        />
      </Paper>
    </Box>
  );
};


export default ReporteVentas;