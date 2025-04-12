import { Schema, model } from "mongoose";

const PublicacionSchema = new Schema([
    
    {
        titulo: { 
            type: String, 
            required: true 
        }
    },
    
    {
        descripcion:{
            type:String,
            required:true
        } 
    },

    {
        imagen: { type: String }
    }
    

]);

export const PublicacionModelo = model("Publicacion",PublicacionSchema)