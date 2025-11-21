import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() // Se elimina {_id: false} para permitir que Mongo maneje el ID interno, o se configura según preferencia
export class Producto extends Document {
  
  @Prop({ required: true, unique: true }) // Es recomendable unique si es un ID producto
  id_producto: number; 

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  categoria: string;

  @Prop({ required: true })
  precio: number;

  @Prop({ required: true }) // Asumo required basado en tus datos
  cantidad: number; // Antes era 'stock'

  @Prop()
  veces_vendido: number;

  @Prop()
  veces_buscado: number;

  @Prop({ default: Date.now }) // Mongoose parsea automáticamente el string ISO "2024-12-09..." a Date
  fecha_creacion: Date;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);