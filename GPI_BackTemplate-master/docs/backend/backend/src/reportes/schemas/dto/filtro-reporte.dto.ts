import { IsOptional, IsIn, IsString, IsDateString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FiltroReporteDto {
  @IsOptional()
  @IsString()
  nombre?: string; // Filtrar por nombre del producto

  @IsOptional()
  @IsString()
  categoria?: string; // Filtrar por categoría

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrecio?: number; // Precio mínimo

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrecio?: number; // Precio máximo

  @IsOptional()
  @IsDateString()
  fechaInicio?: string; // Fecha de inicio del rango de creación

  @IsOptional()
  @IsDateString()
  fechaFin?: string; // Fecha de fin del rango de creación

  @IsOptional()
  @IsIn(['precio', 'nombre', 'categoria', 'stock', 'fecha_creacion'])
  ordenarPor?: string; // Campo para ordenar el reporte (por defecto: precio)

  @IsOptional()
  @IsIn(['asc', 'desc'])
  orden?: 'asc' | 'desc'; // Dirección del orden (por defecto: descendente)
}
