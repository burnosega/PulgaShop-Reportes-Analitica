// reportes.services.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from './schemas/productos.schema';
import { FiltroReporteDto } from './schemas/dto/filtro-reporte.dto';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';
import { FiltrosService } from './filtros.services';

@Injectable()
export class ReportesService {
  constructor(
    @InjectModel(Producto.name) private productoModel: Model<Producto>,
    private filtrosService: FiltrosService
  ) {}

  // Obtener todos los datos sin filtros
  async obtenerDatos() {
    const productos = await this.productoModel.find().sort({ precio: 1 }).exec();

    // Estructura final del reporte
    return productos.map((p) => ({
      _id: p.id_producto,
      nombre: p.nombre,
      precio: p.precio,
      categoria: p.categoria,
      stock: p.cantidad,
      veces_vendido: p.veces_vendido,
      veces_buscado: p.veces_buscado,
      fecha_creacion: p.fecha_creacion,
    }));
  }

  // Obtener filtros del frontend
  async obtenerDatosConFiltros(filtros: FiltroReporteDto) {
    const { query, sort } = this.filtrosService.construirQuery(filtros);

    // Ejecutar consulta
    const productos = await this.productoModel.find(query).sort(sort).exec();

    // Estructura final del reporte
    return productos.map((p) => ({
      _id: p.id_producto,
      nombre: p.nombre,
      precio: p.precio,
      categoria: p.categoria,
      stock: p.cantidad,
      veces_vendido: p.veces_vendido,
      veces_buscado: p.veces_buscado,
      fecha_creacion: p.fecha_creacion,
    }));
  }

 // reportes.services.ts (función generarReportePDF)
  async generarReportePDF(filtros: FiltroReporteDto, res: Response) {
    const productos = await this.obtenerDatosConFiltros(filtros);

    const doc = new PDFDocument({ margin: 50, size: 'A4' });

    // Función para formatear precios con puntos
    const formatearPrecio = (precio: number) => {
      return new Intl.NumberFormat('es-CL').format(precio);
    };

    // Cabeceras de respuesta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte_ventas.pdf');
    doc.pipe(res);

    // Encabezado
    doc
      .fontSize(22)
      .fillColor('#003366')
      .text('Reporte de ventas', { align: 'center' })
      .moveDown(0.5);

    doc
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .strokeColor('#003366')
      .lineWidth(1)
      .stroke()
      .moveDown(1);

    // Agrupar productos por categoría
    const productosPorCategoria: { [categoria: string]: any[] } = {};
    productos.forEach(p => {
      if (!productosPorCategoria[p.categoria]) {
        productosPorCategoria[p.categoria] = [];
      }
      productosPorCategoria[p.categoria].push(p);
    });

    // Ordenar productos dentro de cada categoría por precio
    Object.keys(productosPorCategoria).forEach(categoria => {
      productosPorCategoria[categoria].sort((a, b) => a.precio - b.precio);
    });

    // ===== TABLA =====
    const startX = 50;
    let y = doc.y;

    Object.keys(productosPorCategoria).forEach(categoria => {
      // Nueva página si se necesita
      if (y > 700) {
        doc.addPage();
        y = 70;

        // Repetir título y línea azul
        doc
          .fontSize(22)
          .fillColor('#003366')
          .text('Reporte de Productos', { align: 'center' })
          .moveDown(0.5);

        doc
          .moveTo(50, doc.y)
          .lineTo(550, doc.y)
          .strokeColor('#003366')
          .lineWidth(1)
          .stroke()
          .moveDown(1);

        y = doc.y;
      }

      // Título de categoría
      doc
        .font('Helvetica-Bold')
        .fontSize(14)
        .fillColor('#003366')
        .text(`Categoría: ${categoria}`, startX, y);
      y += 25;

      const tablaY = y;

      // Encabezados de tabla
      doc
        .font('Helvetica-Bold')
        .fontSize(12)
        .fillColor('white')
        .rect(startX, y, 500, 20)
        .fill('#003366');
      doc
        .fillColor('white')
        .text('Nombre', startX + 5, y + 5, { width: 150 })
        .text('Precio', startX + 160, y + 5, { width: 100 })
        .text('Stock', startX + 270, y + 5, { width: 60 })
        .text('Vendidos', startX + 335, y + 5, { width: 80 })
        .text('Buscados', startX + 420, y + 5, { width: 80 });
      y += 25;

      // Filas de productos
      doc.font('Helvetica').fontSize(11).fillColor('black');
      productosPorCategoria[categoria].forEach((p, index) => {
        if (y > 750) {
          doc.addPage();
          y = 50;
        }

        // Línea horizontal separadora (excepto la primera fila)
        if (index > 0) {
          doc
            .moveTo(startX, y - 1)
            .lineTo(startX + 500, y - 1)
            .strokeColor('#000000')
            .lineWidth(1)
            .stroke();
        }

        // Fondo alterno de fila
        if (index % 2 === 0) {
          doc.save(); // guardar estado
          doc.rect(startX, y, 500, 20).fill('#f2f2f2');
          doc.restore(); // restaurar para que la línea no se borre
        }

        // Datos de la fila
        doc.text(p.nombre, startX + 5, y + 5, { width: 150 });
        doc.text(`$${formatearPrecio(p.precio)}`, startX + 160, y + 5, { width: 100 });
        doc.text(p.stock.toString(), startX + 270, y + 5, { width: 60 });
        doc.text(p.veces_vendido.toString(), startX + 335, y + 5, { width: 80 });
        doc.text(p.veces_buscado.toString(), startX + 420, y + 5, { width: 80 });

        y += 20;
      });

      // Marco negro alrededor de la tabla
      const tablaAltura = y - tablaY;
      doc
        .rect(startX, tablaY, 500, tablaAltura)
        .lineWidth(2)
        .strokeColor('black')
        .stroke();

      y += 25; // espacio entre categorías
    });

    // Pie de página
    doc
      .fontSize(10)
      .fillColor('gray')
      .text(`Generado el: ${new Date().toLocaleString()}`, 50, 780, { align: 'right', width: 500 });

    doc.end();
  }
}