// src/db/services/reportesService.ts
import { api } from "../config/api";

export interface VentaBackend {
  _id: string;
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
  veces_vendido: number;
  veces_buscado: number;
  fecha_creacion: string;
}

export interface FiltrosReporte {
  nombre?: string;
  categoria?: string;
  minPrecio?: number;
  maxPrecio?: number;
  fechaInicio?: string;
  fechaFin?: string;
  ordenarPor?: string;
  orden?: 'asc' | 'desc';
}

export const reportesService = {
  // Obtener todos los productos SIN filtros - usa /reportes/productos
  obtenerProductos: async (): Promise<VentaBackend[]> => {
    const { data } = await api.get<VentaBackend[]>("/reportes/productos");
    return data;
  },

  // Obtener productos CON filtros - usa /reportes/productos/filtrados
  obtenerProductosFiltrados: async (filtros: FiltrosReporte): Promise<VentaBackend[]> => {
    // Limpiar filtros vacíos antes de enviar
    const filtrosLimpios: Partial<FiltrosReporte> = {};
    
    if (filtros.nombre) filtrosLimpios.nombre = filtros.nombre;
    if (filtros.categoria) filtrosLimpios.categoria = filtros.categoria;
    if (filtros.minPrecio !== undefined && filtros.minPrecio !== null) filtrosLimpios.minPrecio = filtros.minPrecio;
    if (filtros.maxPrecio !== undefined && filtros.maxPrecio !== null) filtrosLimpios.maxPrecio = filtros.maxPrecio;
    if (filtros.fechaInicio) filtrosLimpios.fechaInicio = filtros.fechaInicio;
    if (filtros.fechaFin) filtrosLimpios.fechaFin = filtros.fechaFin;
    if (filtros.ordenarPor) filtrosLimpios.ordenarPor = filtros.ordenarPor;
    if (filtros.orden) filtrosLimpios.orden = filtros.orden;
 
    console.log("Enviando filtros al backend:", filtrosLimpios);
 
    const { data } = await api.get<VentaBackend[]>("/reportes/productos/filtrados", {
      params: filtrosLimpios,
    });
    return data;
  },

  // Generar PDF con filtros - usa /reportes/productos/pdf
  generarPDF: async (filtros: FiltrosReporte): Promise<Blob> => {
    // Limpiar filtros vacíos antes de enviar
    const filtrosLimpios: Partial<FiltrosReporte> = {};
    
    if (filtros.nombre) filtrosLimpios.nombre = filtros.nombre;
    if (filtros.categoria) filtrosLimpios.categoria = filtros.categoria;
    if (filtros.minPrecio !== undefined && filtros.minPrecio !== null) filtrosLimpios.minPrecio = filtros.minPrecio;
    if (filtros.maxPrecio !== undefined && filtros.maxPrecio !== null) filtrosLimpios.maxPrecio = filtros.maxPrecio;
    if (filtros.fechaInicio) filtrosLimpios.fechaInicio = filtros.fechaInicio;
    if (filtros.fechaFin) filtrosLimpios.fechaFin = filtros.fechaFin;
    if (filtros.ordenarPor) filtrosLimpios.ordenarPor = filtros.ordenarPor;
    if (filtros.orden) filtrosLimpios.orden = filtros.orden;
 
    const response = await api.get("/reportes/productos/pdf", {
      params: filtrosLimpios,
      responseType: 'blob'
    });
    return response.data;
  }
};