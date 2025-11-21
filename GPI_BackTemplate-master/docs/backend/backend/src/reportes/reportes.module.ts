// reportes.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportesController } from './reportes.controller';
import { ReportesService } from './reportes.services';
import { Producto, ProductoSchema } from './schemas/productos.schema';
import { FiltrosService } from './filtros.services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Producto.name, schema: ProductoSchema }])
  ],
  controllers: [ReportesController],
  providers: [ReportesService, FiltrosService],
})
export class ReportesModule {}