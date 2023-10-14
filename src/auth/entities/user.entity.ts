import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from "mongoose";
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class User extends Document {

     @Prop({ type: String, default: uuidv4, unique: true, index: true })
    id: string; 
 /*  _id?: string;  */
    @Prop({ 
        unique:true,
        index:true,
        required: true
     }) 
    email:string;
    @Prop({ 
        
        select:false,
        required: true
     }) 
    password:string;
    @Prop()
    phone:number;
    @Prop()
    fullName:string;
    @Prop()
    lastName:string;
    @Prop({
        default:true
    })
    isActive:boolean;
    @Prop({
        default:'user'
    })
    roles: string[];

    beforeInsert(){
        this.email = this.email.toLowerCase().trim();
    }
    async beforeUpdate() {
        // Aplicar la regla a campos específicos antes de la actualización
        if (this.email) {
          this.email = this.email.toLowerCase().trim();
        }
        // Otras acciones que desees realizar antes de la actualización
      }
    

}

export const UserSchema =SchemaFactory.createForClass(User);
