import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Simulación de autenticación
const userRole = "gerente";

const ventasPorProducto = [
  { producto: "Laptop", ventas: 1200 },
  { producto: "Mouse", ventas: 300 },
  { producto: "Teclado", ventas: 500 },
  { producto: "Monitor", ventas: 800 },
];



const Analitica: React.FC = () => {
  if (userRole !== "gerente" && userRole !== "admin") {
    return (
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          ❌ Acceso denegado. Solo gerentes o administradores pueden ver este dashboard.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
         Analíticas de Ventas
      </Typography>

      <Box sx={{ display: "grid", gap: 4, gridTemplateColumns: "1fr 1fr", mb: 4 }}>
        {/* Gráfico de barras */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Ventas por Producto
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ventasPorProducto}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="producto" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventas" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Gráfico circular */}
        
      </Box>
    </Box>
  );
};

export default Analitica;
