import React, { useState, useMemo } from "react"; 
import { 
  Box, Grid, Paper, Typography, Card, CardContent,  
  Divider, Chip, Stack, Button, Tabs, Tab,
  List, ListItem, ListItemAvatar, ListItemText, Avatar 
} from "@mui/material"; 
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, 
  Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts";
import SearchIcon from '@mui/icons-material/Search';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ConstructionIcon from '@mui/icons-material/Construction'; // Icono para "En Construcción"
// Iconos para el widget de productos
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

import { EnviosPorRegion, IngresosMensuales, EstadoCarrito, TendenciaProductos } from "../../../db/services/analiticasServices";

interface DashboardProps {
  kpis: {
    ingresos: number;
    porcentajeIngresos: number;
    mejorRegion: string;
    porcentajeRegion: number;
  };
  dataIngresosMensuales: IngresosMensuales[];
  dataRegiones: EnviosPorRegion[];
  dataEstadosCarrito: EstadoCarrito[]; 
  dataProductos: TendenciaProductos;
  onSearchClick: () => void;
}

// 1. PALETA DE RESPALDO (Por si salen regiones nuevas no mapeadas)
const COLORES_PALETA = [
  "#1F4D5D", "#FF8042", "#00C49F", "#FFBB28", "#E91E63",
  "#8B5CF6", "#06B6D4", "#84CC16", "#F97316", "#EC4899",
  "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#6366F1",
  "#A855F7", "#14B8A6", "#84CC16", "#F43F5E", "#0EA5E9",
  "#64748B", "#8B5CF6", "#06B6D4", "#D946EF", "#22D3EE"
];

// 2. MAPEO MANUAL: Asigna colores específicos a tus regiones clave
const MAPA_COLORES_REGIONES: Record<string, string> = {
  "Metropolitana": "#1F4D5D", // Azul oscuro corporativo
  "Valparaíso": "#FF8042",     // Naranja
  "Biobío": "#00C49F",         // Verde Azulado
  "Araucanía": "#FFBB28",      // Amarillo
  "Maule": "#E91E63",          // Rosa oscuro
  "Los Lagos": "#8B5CF6",      // Violeta
  "Antofagasta": "#06B6D4",    // Cian
  "Coquimbo": "#84CC16",       // Lima
  "O'Higgins": "#F97316",      // Naranja fuerte
};

const COLORES_ESTADOS: Record<string, string> = {
  "Completado": "#2e7d32",
  "Abandonado": "#ed6c02",
  "Cancelado": "#d32f2f",
};

const formatearDineroEje = (valor: number) => {
  if (valor >= 1000000) return `$${(valor / 1000000).toFixed(1)}M`;
  if (valor >= 1000) return `$${(valor / 1000).toFixed(0)}k`;
  return `$${valor}`;
};

const formatearTooltip = (valor: number) => 
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);

const obtenerMesActual = () => 
  new Date().toLocaleString('es-CL', { month: 'long' });

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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
        <Box sx={{ pt: 2, height: '100%' }}> 
          {children}
        </Box>
      )}
    </div>
  );
}

const Dashboard: React.FC<DashboardProps> = ({ 
    kpis, 
    dataIngresosMensuales, 
    dataRegiones, 
    dataEstadosCarrito, 
    dataProductos, 
    onSearchClick 
}) => {
  
  const [tabValue, setTabValue] = useState(0);
  const [productTabValue, setProductTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleProductTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setProductTabValue(newValue);
  };

  // --- LÓGICA DE ORDENAMIENTO PARA EL GRÁFICO ---
  const dataEstadosOrdenados = useMemo(() => {
    const ordenDeseado = ["Completado", "Cancelado", "Abandonado"];
    return [...(dataEstadosCarrito || [])].sort((a, b) => {
        const indexA = ordenDeseado.indexOf(a.name);
        const indexB = ordenDeseado.indexOf(b.name);
        return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
    });
  }, [dataEstadosCarrito]);

  // --- LÓGICA DEL WIDGET DE PRODUCTOS ---
  const getProductList = () => {
    if (!dataProductos) return [];
    switch (productTabValue) {
      case 0: return dataProductos.completado || [];
      case 1: return dataProductos.cancelado || [];
      case 2: return dataProductos.abandonado || [];
      default: return [];
    }
  };

  const getProductColor = () => {
    switch (productTabValue) {
      case 0: return "#2e7d32";
      case 1: return "#d32f2f";
      case 2: return "#ed6c02";
      default: return "grey";
    }
  };

  const getProductIcon = () => {
    switch (productTabValue) {
      case 0: return <CheckCircleIcon />;
      case 1: return <CancelIcon />;
      case 2: return <RemoveShoppingCartIcon />;
      default: return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* --- ENCABEZADO --- */}
      <Box sx={{ flexShrink: 0 }}> 
        <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center" 
            sx={{ mb: 1 }} 
        >
            <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1F4D5D', lineHeight: 1.2 }}>
                    Analíticas de Ventas
                </Typography>
            </Box>
        </Stack>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                sx={{ minHeight: '40px' }}
            >
                <Tab icon={<BarChartIcon fontSize="small"/>} iconPosition="start" label="Ventas" sx={{ minHeight: '40px', py: 0 }} />
                <Tab icon={<ShoppingCartIcon fontSize="small"/>} iconPosition="start" label="Carritos" sx={{ minHeight: '40px', py: 0 }} />
                <Tab icon={<SearchIcon fontSize="small"/>} iconPosition="start" label="Búsqueda y Descubrimiento" sx={{ minHeight: '40px', py: 0 }} />
            </Tabs>
        </Box>
      </Box>

      {/* --- CONTENIDO SCROLLABLE --- */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', pb: 2 }}>
        
        {/* --- PESTAÑA 0: FINANCIERO --- */}
        <TabPanel value={tabValue} index={0}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                    <Card elevation={3} sx={{ borderRadius: 2 }}>
                        <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                                <Box>
                                    <Typography color="textSecondary" variant="caption">INGRESOS ({obtenerMesActual().toUpperCase()})</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>${kpis.ingresos.toLocaleString()}</Typography>
                                </Box>
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                                    <Chip 
                                        label={`${kpis.porcentajeIngresos > 0 ? '+' : ''}${kpis.porcentajeIngresos}%`} 
                                        color={kpis.porcentajeIngresos >= 0 ? "success" : "error"} 
                                        size="small" 
                                    />
                                    <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem' }}>
                                        Respecto al mes anterior
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card elevation={3} sx={{ borderRadius: 2 }}>
                        <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
                             <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                                <Box>
                                    <Typography color="textSecondary" variant="caption">MEJOR REGIÓN DE DISTRIBUCIÓN</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{kpis.mejorRegion}</Typography>
                                </Box>
                                <Typography variant="caption" color="textSecondary" sx={{ mb: 0.5 }}>{kpis.porcentajeRegion}% volumen.</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} lg={8}>
                    <Paper sx={{ p: 2, height: 380, borderRadius: 2 }} elevation={2}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Ingresos Mensuales 2025</Typography>
                        <Divider sx={{ mb: 1 }} />
                        <ResponsiveContainer width="100%" height="90%">
                            <BarChart data={dataIngresosMensuales}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#9e9e9e" />
                                <XAxis 
                                    dataKey="mes" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#666', fontSize: 11 }}
                                    interval={0}
                                    tickFormatter={(value) => value.substring(0, 3)} 
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    width={50} 
                                    tickFormatter={formatearDineroEje} 
                                    tick={{ fill: '#666', fontSize: 11 }} 
                                />
                                <Tooltip cursor={{ fill: 'transparent' }} formatter={(value: number) => [formatearTooltip(value), "Ventas"]} />
                                <Bar dataKey="ventas" fill="#1F4D5D" radius={[4, 4, 0, 0]} barSize={35} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, height: 380, borderRadius: 2 }} elevation={2}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Cantidad de Envios por Región</Typography>
                        <Divider sx={{ mb: 1 }} />
                        <ResponsiveContainer width="100%" height="90%">
                            <PieChart>
                                <Pie 
                                  data={dataRegiones || []} 
                                  cx="50%" 
                                  cy="50%" 
                                  innerRadius={50} 
                                  outerRadius={70} 
                                  paddingAngle={2} 
                                  dataKey="value"
                                >
                                    {(dataRegiones || []).map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={MAPA_COLORES_REGIONES[entry.name] || COLORES_PALETA[index % COLORES_PALETA.length]} 
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '10px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </TabPanel>

        {/* --- PESTAÑA 1: PEDIDOS --- */}
        <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={8}>
                    <Paper sx={{ p: 2, height: 410, borderRadius: 2 }} elevation={2}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Distribución de Estados de Carritos</Typography>
                        <Divider sx={{ mb: 1 }} />
                        <ResponsiveContainer width="100%" height="90%">
                            <BarChart data={dataEstadosOrdenados} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#9e9e9e" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 500 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                                <Tooltip cursor={{ fill: 'transparent' }} formatter={(value) => [value, "Cantidad"]} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={50}>
                                    {dataEstadosOrdenados.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORES_ESTADOS[entry.name] || "#8884d8"} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Paper sx={{ height: 410, borderRadius: 2, display: 'flex', flexDirection: 'column', overflow: 'hidden' }} elevation={2}>
                        
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f5f5f5' }}>
                            <Typography 
                                variant="subtitle2" 
                                align="center" 
                                sx={{ pt: 0.2 , pb: 0.2, fontWeight: 'bold', color: '#000000' }}
                            >
                                Top Productos
                            </Typography>
                          
                            <Tabs 
                                value={productTabValue} 
                                onChange={handleProductTabChange} 
                                variant="fullWidth"
                                TabIndicatorProps={{ sx: { backgroundColor: getProductColor() } }}
                                sx={{ minHeight: 42 }}
                            >
                                <Tab label="Completados" sx={{ fontSize: '0.7rem', fontWeight: 'bold', minHeight: 42, color: productTabValue===0? getProductColor():'inherit' }} />
                                <Tab label="Cancelados" sx={{ fontSize: '0.7rem', fontWeight: 'bold', minHeight: 42, color: productTabValue===1? getProductColor():'inherit' }} />
                                <Tab label="Abandonados" sx={{ fontSize: '0.7rem', fontWeight: 'bold', minHeight: 42, color: productTabValue===2? getProductColor():'inherit' }} />
                            </Tabs>
                        </Box>

                        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
                            {getProductList().length > 0 ? (
                                <List dense>
                                    {getProductList().map((prod, index) => (
                                        <React.Fragment key={index}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: getProductColor(), width: 30, height: 30, fontSize: '0.8rem' }}>
                                                        {index + 1}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText 
                                                    primary={prod.name} 
                                                    primaryTypographyProps={{ fontWeight: 500, fontSize: '0.85rem' }}
                                                    secondary={`${prod.value} unid.`} 
                                                />
                                                <Box sx={{ color: getProductColor(), opacity: 0.5 }}>
                                                    {getProductIcon()}
                                                </Box>
                                            </ListItem>
                                            {index < getProductList().length - 1 && <Divider variant="inset" component="li" />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            ) : (
                                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="body2" color="textSecondary">Sin datos</Typography>
                                </Box>
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </TabPanel>

        {/* --- PESTAÑA 2: BÚSQUEDA Y DESCUBRIMIENTO (EN CONSTRUCCIÓN) --- */}
        <TabPanel value={tabValue} index={2}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '60vh',
                opacity: 0.7
              }}
            >
                <ConstructionIcon sx={{ fontSize: 80, color: '#1F4D5D', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1F4D5D', mb: 1 }}>
                    En Construcción
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Estamos trabajando en nuevas métricas de búsqueda y descubrimiento.
                </Typography>
            </Box>
        </TabPanel>

      </Box>
    </Box>
  );
};

export default Dashboard;