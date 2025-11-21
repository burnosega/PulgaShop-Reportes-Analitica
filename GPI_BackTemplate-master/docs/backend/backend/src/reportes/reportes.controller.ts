// reportes.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportesService } from './reportes.services';
import { FiltroReporteDto } from './schemas/dto/filtro-reporte.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { Res } from '@nestjs/common';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  // obtener todos los datos sin filtros
  @UseGuards(JwtAuthGuard)
  @Get('productos')
  async obtenerDatos() {
    return this.reportesService.obtenerDatos();
  }

  @UseGuards(JwtAuthGuard)
  @Get('productos/filtrados')
  async obtenerDatosConFiltros(@Query() filtros: FiltroReporteDto) {
    return this.reportesService.obtenerDatosConFiltros(filtros);
  }

  // Obtener reporte pdf de ventas con filtros
  @UseGuards(JwtAuthGuard)
  @Get('productos/pdf')
  async generarReportePDF(@Query() filtros: FiltroReporteDto, @Res() res: Response) {
    return this.reportesService.generarReportePDF(filtros, res);
  }
}