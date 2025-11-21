// filtros.service.ts
import { Injectable } from '@nestjs/common';
import { FiltroReporteDto } from './schemas/dto/filtro-reporte.dto';

@Injectable()
export class FiltrosService {
  
  construirQuery(filtros: FiltroReporteDto): { query: any; sort: any } {
    const query: any = {};
    let categorias: string[] = [];

    // Filtrar por nombre
    if (filtros.nombre) {
      query.nombre = { $regex: new RegExp(filtros.nombre, 'i') };
    }

    // Filtrar por categoría
    if (filtros.categoria) {
      categorias = filtros.categoria.split(',').map(cat => cat.trim());
    }

    if (categorias.length > 0) {
      query.$or = categorias.map(cat => ({
        categoria: { $regex: new RegExp(cat, 'i') }
      }));
    }

    // Filtrar por rango de precios
    if (filtros.minPrecio || filtros.maxPrecio) {
      query.precio = {};
      if (filtros.minPrecio) query.precio.$gte = filtros.minPrecio;
      if (filtros.maxPrecio) query.precio.$lte = filtros.maxPrecio;
    }

    // Filtrar por rango de fechas
    if (filtros.fechaInicio || filtros.fechaFin) {
      query.fecha_creacion = {};
      if (filtros.fechaInicio) query.fecha_creacion.$gte = new Date(filtros.fechaInicio);
      if (filtros.fechaFin) query.fecha_creacion.$lte = new Date(filtros.fechaFin);
    }

    // Ordenamiento
    const sort: any = {};
    if (filtros.ordenarPor) {
      sort[filtros.ordenarPor] = filtros.orden === 'desc' ? -1 : 1;
    } else {
      sort.precio = 1;
    }

    return { query, sort };
  }
}