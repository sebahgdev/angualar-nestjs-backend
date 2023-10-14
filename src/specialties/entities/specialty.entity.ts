import {CreateDateColumn,UpdateDateColumn,DeleteDateColumn,Column,PrimaryGeneratedColumn} from 'typeorm';
import {Document} from "mongoose";
import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Specialty extends Document {
    @Prop({ 
        unique:true,
        index:true,
        required: true
     }) // No es necesario especificar _id aquí
    name: string;
  
    @Prop()
    description: string;
  
    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
  
    @Prop({ type: Date, default: null })
    updatedAt: Date | null;
  
    @Prop({ type: Date, default: null })
    deletedAt: Date | null;
}

export const SpecialtySchema =SchemaFactory.createForClass(Specialty);
