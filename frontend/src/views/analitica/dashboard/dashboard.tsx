import React from "react";
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Divider,
  Chip
} from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
// Nota: Ajusta la cantidad de '../' según donde esté tu carpeta hooks realmente.
// Si estás en views/analitica/dashboard/, probablemente necesites subir 3 niveles.
import { useAuth } from "../../../hooks/useAuth"; 

// --- DATOS SIMULADOS (MOCK DATA) ---
// Estos datos cumplen con el Criterio de Aceptación 2: Visualización de tendencias
const dataTendencias = [
  { mes: "Ene", ventas: 4000, meta: 2400 },
  { mes: "Feb", ventas: 3000, meta: 1398 },
  { mes: "Mar", ventas: 2000, meta: 9800 },
  { mes: "Abr", ventas: 2780, meta: 3908 },
  { mes: "May", ventas: 1890, meta: 4800 },
  { mes: "Jun", ventas: 2390, meta: 3800 },
];

// Estos datos cumplen con el Criterio de Aceptación 2: Agrupación por región
const dataRegiones = [
  { name: "Norte", value: 4500 },
  { name: "Sur", value: 3200 },
  { name: "Centro", value: 2100 },
  { name: "Occidente", value: 1800 },
];

const COLORES_REGIONES = ["#1F4D5D", "#FF8042", "#00C49F", "#FFBB28"];

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // --- POLÍTICA DE SEGURIDAD ---
  // Solo gerentes o admins pueden ver este dashboard.
  const tienePermiso = user && (user.role === "gerente" || user.role === "admin");

  if (!tienePermiso) {
    return (
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
         <Typography variant="h5" color="error" gutterBottom>
             Acceso Restringido
         </Typography>
         <Typography variant="body1">
            Este dashboard es exclusivo para la Gerencia de Ventas.
         </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      
      {/* Encabezado */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1F4D5D' }}>
          Analíticas de Ventas
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Visualización de rendimiento global y regional en tiempo real.
        </Typography>
      </Box>

      {/* --- CRITERIO 1: KPIs para interpretación fácil --- */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="overline">Ingresos Totales</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>$11,600</Typography>
              <Chip label="+5.4%" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="overline">Pedidos Activos</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>86</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                12 pendientes de envío
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="overline">Mejor Región</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Norte</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                38% del total de ventas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* --- CRITERIO 2: Gráficos de Tendencias y Regiones --- */}
      <Grid container spacing={3}>
        
        {/* Gráfico de Barras: Tendencia Temporal */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, height: 450, borderRadius: 2 }} elevation={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Tendencia de Ventas (Último Semestre)
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={dataTendencias} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="ventas" fill="#1F4D5D" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Gráfico Circular: Distribución Regional */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, height: 450, borderRadius: 2 }} elevation={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Ventas por Región
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ height: '85%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataRegiones}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dataRegiones.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORES_REGIONES[index % COLORES_REGIONES.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Tabla de Detalles */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }} elevation={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Detalle de Rendimiento Regional
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Región</TableCell>
                    <TableCell align="right">Ventas Totales</TableCell>
                    <TableCell align="right">Objetivo Cumplido</TableCell>
                    <TableCell align="right">Tendencia</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataRegiones.map((row) => (
                    <TableRow key={row.name} hover>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
                        {row.name}
                      </TableCell>
                      <TableCell align="right">${row.value}</TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={row.value > 3000 ? "Superado" : "En Proceso"} 
                          color={row.value > 3000 ? "success" : "warning"} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">↗ 4.2%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;