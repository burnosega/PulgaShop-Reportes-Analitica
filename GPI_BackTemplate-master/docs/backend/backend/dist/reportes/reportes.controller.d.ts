import { ReportesService } from './reportes.services';
import { FiltroReporteDto } from './schemas/dto/filtro-reporte.dto';
import { Response } from 'express';
export declare class ReportesController {
    private readonly reportesService;
    constructor(reportesService: ReportesService);
    obtenerDatos(): Promise<{
        _id: number;
        nombre: string;
        precio: number;
        categoria: string;
        stock: number;
        veces_vendido: number;
        veces_buscado: number;
        fecha_creacion: Date;
    }[]>;
    obtenerDatosConFiltros(filtros: FiltroReporteDto): Promise<{
        _id: number;
        nombre: string;
        precio: number;
        categoria: string;
        stock: number;
        veces_vendido: number;
        veces_buscado: number;
        fecha_creacion: Date;
    }[]>;
    generarReportePDF(filtros: FiltroReporteDto, res: Response): Promise<void>;
}
